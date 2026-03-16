import {
  Assistance,
  Barangay,
  DeathInfo,
  Senior,
  SeniorProfile,
  SeniorAssistance,
  SeniorStatusHistory,
  SeniorVaccine,
  User,
  Vaccine,
} from "@/models";
import { FindAttributeOptions, Includeable, col, fn, literal, Op } from "sequelize";

export class AnalyticsService {
  private activeSeniorInclude(barangayId?: number): Includeable[] {
    return [
      {
        model: Senior,
        attributes: [],
        where: {
          isDeleted: false,
          ...(barangayId ? { barangayId } : {}),
        },
        required: true,
        include: [
          {
            model: DeathInfo,
            attributes: [],
            required: false,
          } as any,
          {
            model: SeniorStatusHistory,
            attributes: [],
            required: true,
            where: {
              status: 'Active',
            },
          } as any,
        ],
      } as any,
    ];
  }

  private barangayInclude(barangayId?: number): Includeable[] {
    return this.activeSeniorInclude(barangayId);
  }

  private async getSeniorBasicFields(options: {
    barangayId?: number;
    additionalWhere?: any;
  }) {
    const { barangayId, additionalWhere } = options;
    const include: Includeable[] = [
      {
        model: Senior,
        attributes: [],
        where: {
          isDeleted: false,
          ...(barangayId ? { barangayId } : {}),
        },
        required: true,
        include: [
          {
            model: DeathInfo,
            attributes: [],
            required: false,
          } as any,
          {
            model: SeniorStatusHistory,
            attributes: [],
            required: true,
            where: {
              status: "Active",
            },
          } as any,
          {
            model: Barangay,
            attributes: ["id", "name"],
            required: false,
          } as any,
        ],
      } as any,
    ];

    const rows = await SeniorProfile.findAll({
      attributes: [
        "seniorId",
        "firstname",
        "lastname",
        "middlename",
        "extension",
        "sexAtBirth",
        "birthDate",
      ],
      include,
      where: {
        ...additionalWhere,
        [Op.and]: literal('"Senior->DeathInfo"."seniorId" IS NULL'),
      },
      raw: true,
    });

    const now = new Date();
    const toAge = (d: Date | string | null) => {
      if (!d) return null;
      const birth = new Date(d);
      let age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
      return age;
    };

    const toFullName = (row: any) => {
      const parts = [
        row.firstname,
        row.middlename,
        row.lastname,
        row.extension,
      ].filter(Boolean);
      return parts.join(" ");
    };

    return rows.map((r: any) => ({
      id: Number(r.seniorId),
      fullName: toFullName(r),
      sexAtBirth: r.sexAtBirth ? String(r.sexAtBirth) : null,
      age: toAge(r.birthDate),
      barangayName: r["Senior.Barangay.name"]
        ? String(r["Senior.Barangay.name"])
        : "N/A",
    }));
  }

  async genderDistribution(params?: { barangayId?: number }) {
    const { barangayId } = params || {};
    const records = await SeniorProfile.findAll({
      attributes: [
        [col("sexAtBirth"), "sexAtBirth"],
        [fn("COUNT", fn("DISTINCT", col("SeniorProfile.seniorId"))), "count"],
      ] as unknown as FindAttributeOptions,
      include: this.barangayInclude(barangayId),
      where: literal('"Senior->DeathInfo"."seniorId" IS NULL'),
      group: [col("sexAtBirth")],
      raw: true,
    });
    return records.map((r) => ({
      sexAtBirth: String((r as any).sexAtBirth),
      count: Number((r as any).count),
    }));
  }

  async ageDemographics(params?: { barangayId?: number }) {
    const { barangayId } = params || {};
    const items = await SeniorProfile.findAll({
      attributes: ["birthDate"],
      include: this.activeSeniorInclude(barangayId),
      where: literal('"Senior->DeathInfo"."seniorId" IS NULL'),
      raw: true,
    });

    const now = new Date();
    const toAge = (d: Date) => {
      const birth = new Date(d);
      let age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
      return age;
    };

    const buckets = [
      { key: "60-64", min: 60, max: 64 },
      { key: "65-69", min: 65, max: 69 },
      { key: "70-74", min: 70, max: 74 },
      { key: "75-79", min: 75, max: 79 },
      { key: "80-84", min: 80, max: 84 },
      { key: "85+", min: 85, max: 200 },
    ];

    const counts: Record<string, number> = Object.fromEntries(
      buckets.map((b) => [b.key, 0])
    );
    for (const it of items) {
      const bd = (it as any).birthDate as string | Date | null;
      if (!bd) continue;
      const age = toAge(new Date(bd));
      const bucket = buckets.find((b) => age >= b.min && age <= b.max);
      if (bucket) counts[bucket.key]++;
    }

    return buckets.map((b) => ({ bucket: b.key, count: counts[b.key] }));
  }

  async assistanceTotals(params?: { barangayId?: number }) {
    const { barangayId } = params || {};
    const include: Includeable[] = [
      { model: Assistance, attributes: ["id", "name"], required: true } as any,
      ...this.activeSeniorInclude(barangayId),
    ];
    const rows = await SeniorAssistance.findAll({
      attributes: [
        [col("assistanceId"), "assistanceId"],
        [fn("COUNT", col("SeniorAssistance.id")), "totalCount"],
      ] as unknown as FindAttributeOptions,
      include,
      where: literal('"Senior->DeathInfo"."seniorId" IS NULL'),
      group: [
        col("assistanceId"),
        col("Assistance.id"),
        col("Assistance.name"),
      ],
      raw: true,
    });
    return rows.map((r) => ({
      assistanceId: Number((r as any).assistanceId),
      name: String((r as any)["Assistance.name"]).toString(),
      count: Number((r as any).totalCount),
    }));
  }

  async vaccineCoverage(params?: { barangayId?: number }) {
    const { barangayId } = params || {};
    const include: Includeable[] = [
      { model: Vaccine, attributes: ["id", "name"], required: true } as any,
      ...this.activeSeniorInclude(barangayId),
    ];
    const rows = await SeniorVaccine.findAll({
      attributes: [
        [col("vaccineId"), "vaccineId"],
        [fn("COUNT", fn("DISTINCT", col("SeniorVaccine.seniorId"))), "countDistinctSeniors"],
      ] as unknown as FindAttributeOptions,
      include,
      where: literal('"Senior->DeathInfo"."seniorId" IS NULL'),
      group: [col("vaccineId"), col("Vaccine.id"), col("Vaccine.name")],
      raw: true,
    });
    return rows.map((r) => ({
      vaccineId: Number((r as any).vaccineId),
      name: String((r as any)["Vaccine.name"]).toString(),
      count: Number((r as any).countDistinctSeniors),
    }));
  }

  async usersPerRole() {
    const records = await User.findAll({
      attributes: [
        [col("role"), "role"],
        [fn("COUNT", col("User.id")), "count"],
      ] as unknown as FindAttributeOptions,
      group: [col("role")],
      raw: true,
    });
    return records.map((r) => ({
      role: String((r as any).role),
      count: Number((r as any).count),
    }));
  }

  async usersPerBarangay() {
    const rows = await User.findAll({
      attributes: [
        [col("barangayId"), "barangayId"],
        [fn("COUNT", col("User.id")), "count"],
      ] as unknown as FindAttributeOptions,
      include: [
        {
          model: Barangay,
          attributes: ["id", "name"],
          required: false,
        } as any,
      ],
      group: [col("barangayId"), col("Barangay.id"), col("Barangay.name")],
      raw: true,
    });
    return rows.map((r) => ({
      barangayId: (r as any).barangayId ? Number((r as any).barangayId) : null,
      name: (r as any)["Barangay.name"]
        ? String((r as any)["Barangay.name"])
        : "No Barangay",
      count: Number((r as any).count),
    }));
  }

  async deadAliveCount(params?: { barangayId?: number }) {
    const { barangayId } = params || {};
    
    // Count alive seniors: not deleted, Active status, no DeathInfo
    const aliveInclude: Includeable[] = [
      {
        model: Senior,
        attributes: [],
        where: {
          isDeleted: false,
          ...(barangayId ? { barangayId } : {}),
        },
        required: true,
        include: [
          {
            model: DeathInfo,
            attributes: [],
            required: false,
          } as any,
          {
            model: SeniorStatusHistory,
            attributes: [],
            required: true,
            where: {
              status: 'Active',
            },
          } as any,
        ],
      } as any,
    ];

    const aliveCount = await SeniorProfile.count({
      include: aliveInclude,
      where: literal('"Senior->DeathInfo"."seniorId" IS NULL'),
      distinct: true,
      col: 'seniorId',
    });

    // Count dead seniors: not deleted, has DeathInfo
    const deadInclude: Includeable[] = [
      {
        model: Senior,
        attributes: [],
        where: {
          isDeleted: false,
          ...(barangayId ? { barangayId } : {}),
        },
        required: true,
        include: [
          {
            model: DeathInfo,
            attributes: [],
            required: true,
          } as any,
        ],
      } as any,
    ];

    const deadCount = await SeniorProfile.count({
      include: deadInclude,
      distinct: true,
      col: 'seniorId',
    });

    return [
      { status: "alive", count: aliveCount },
      { status: "dead", count: deadCount },
    ];
  }

  async genderDistributionDetails(params: {
    barangayId?: number;
    sexAtBirth: string;
  }) {
    const { barangayId, sexAtBirth } = params;
    if (!sexAtBirth) return [];
    const rows = await this.getSeniorBasicFields({
      barangayId,
      additionalWhere: {
        sexAtBirth,
      },
    });
    return rows;
  }

  async ageDemographicsDetails(params: {
    barangayId?: number;
    bucket: string;
  }) {
    const { barangayId, bucket } = params;
    if (!bucket) return [];

    const bucketMap: Record<string, { min: number; max: number }> = {
      "60-64": { min: 60, max: 64 },
      "65-69": { min: 65, max: 69 },
      "70-74": { min: 70, max: 74 },
      "75-79": { min: 75, max: 79 },
      "80-84": { min: 80, max: 84 },
      "85+": { min: 85, max: 200 },
    };
    const range = bucketMap[bucket];
    if (!range) return [];

    const basic = await this.getSeniorBasicFields({
      barangayId,
      additionalWhere: {},
    });
    return basic.filter(
      (r) =>
        typeof r.age === "number" &&
        r.age >= range.min &&
        r.age <= range.max
    );
  }

  async assistanceTotalsDetails(params: {
    barangayId?: number;
    assistanceId?: number;
  }) {
    const { barangayId, assistanceId } = params;
    if (!assistanceId) return [];

    const rows = await SeniorAssistance.findAll({
      attributes: ["assistanceDate"],
      where: {
        assistanceId,
      },
      include: [
        {
          model: Assistance,
          attributes: ["id", "name"],
          required: true,
        } as any,
        {
          model: Senior,
          attributes: [],
          required: true,
          where: {
            isDeleted: false,
            ...(barangayId ? { barangayId } : {}),
          },
          include: [
            {
              model: DeathInfo,
              attributes: [],
              required: false,
            } as any,
            {
              model: SeniorStatusHistory,
              attributes: [],
              required: true,
              where: {
                status: "Active",
              },
            } as any,
            {
              model: Barangay,
              attributes: ["id", "name"],
              required: false,
            } as any,
            {
              model: SeniorProfile,
              attributes: [
                "seniorId",
                "firstname",
                "lastname",
                "middlename",
                "extension",
                "birthDate",
              ],
              required: true,
            } as any,
          ],
        } as any,
      ],
      raw: true,
    });

    console.log(rows);

    const now = new Date();
    const toAge = (d: Date | string | null) => {
      if (!d) return null;
      const birth = new Date(d);
      let age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
      return age;
    };

    const toFullName = (row: any) => {
      const parts = [
        row["Senior.SeniorProfile.firstname"],
        row["Senior.SeniorProfile.middlename"],
        row["Senior.SeniorProfile.lastname"],
        row["Senior.SeniorProfile.extension"],
      ].filter(Boolean);
      return parts.join(" ");
    };

    return rows
      .filter((r: any) => r["Senior.DeathInfo.seniorId"] == null)
      .map((r: any) => ({
        id: Number(r["Senior.SeniorProfile.seniorId"]),
        fullName: toFullName(r),
        age: toAge(r["Senior.SeniorProfile.birthDate"]),
        barangayName: r["Senior.Barangay.name"]
          ? String(r["Senior.Barangay.name"])
          : "N/A",
        assistanceName: String(r["Assistance.name"]),
        assistanceDate: r["assistanceDate"]
          ? String(r["assistanceDate"])
          : null,
      }));
  }

  async vaccineCoverageDetails(params: {
    barangayId?: number;
    vaccineId?: number;
  }) {
    const { barangayId, vaccineId } = params;
    if (!vaccineId) return [];

    const rows = await SeniorVaccine.findAll({
      attributes: ["vaccineDate", "seniorId"],
      where: {
        vaccineId,
      },
      include: [
        {
          model: Vaccine,
          attributes: ["id", "name"],
          required: true,
        } as any,
        {
          model: Senior,
          attributes: [],
          required: true,
          where: {
            isDeleted: false,
            ...(barangayId ? { barangayId } : {}),
          },
          include: [
            {
              model: DeathInfo,
              attributes: [],
              required: false,
            } as any,
            {
              model: SeniorStatusHistory,
              attributes: [],
              required: true,
              where: {
                status: "Active",
              },
            } as any,
            {
              model: Barangay,
              attributes: ["id", "name"],
              required: false,
            } as any,
            {
              model: SeniorProfile,
              attributes: [
                "seniorId",
                "firstname",
                "lastname",
                "middlename",
                "extension",
                "birthDate",
              ],
              required: true,
            } as any,
          ],
        } as any,
      ],
      order: [["vaccineDate", "DESC"]],
      raw: true,
    });

    const now = new Date();
    const toAge = (d: Date | string | null) => {
      if (!d) return null;
      const birth = new Date(d);
      let age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
      return age;
    };

    const toFullName = (row: any) => {
      const parts = [
        row["Senior.SeniorProfile.firstname"],
        row["Senior.SeniorProfile.middlename"],
        row["Senior.SeniorProfile.lastname"],
        row["Senior.SeniorProfile.extension"],
      ].filter(Boolean);
      return parts.join(" ");
    };

    const seen = new Set<number>();
    const result: any[] = [];
    for (const r of rows as any[]) {
      if (r["Senior.DeathInfo.seniorId"] != null) continue;
      const id = Number(r["seniorId"]);
      if (seen.has(id)) continue;
      seen.add(id);
      result.push({
        id,
        fullName: toFullName(r),
        age: toAge(r["Senior.SeniorProfile.birthDate"]),
        barangayName: r["Senior.Barangay.name"]
          ? String(r["Senior.Barangay.name"])
          : "N/A",
        vaccineName: String(r["Vaccine.name"]),
        vaccineDate: r["vaccineDate"] ? String(r["vaccineDate"]) : null,
      });
    }
    return result;
  }

  async usersPerRoleDetails(params: { role: string }) {
    const { role } = params;
    if (!role) return [];
    const rows = await User.findAll({
      attributes: [
        "id",
        "name",
        "role",
      ],
      include: [
        {
          model: Barangay,
          attributes: ["id", "name"],
          required: false,
        } as any,
      ],
      where: { role },
      raw: true,
    });

    const toFullName = (row: any) => {
      return String(row.name);
    };

    return rows.map((r: any) => ({
      id: Number(r.id),
      fullName: toFullName(r),
      role: String(r.role),
      barangayName: r["Barangay.name"]
        ? String(r["Barangay.name"])
        : "No Barangay",
    }));
  }

  async usersPerBarangayDetails(params: { barangayId?: number }) {
    const { barangayId } = params;
    const where: any = {};
    if (typeof barangayId === "number") {
      where.barangayId = barangayId;
    } else {
      where.barangayId = null;
    }

    const rows = await User.findAll({
      attributes: [
        "id",
        "name",
        "role",
        "barangayId",
      ],
      include: [
        {
          model: Barangay,
          attributes: ["id", "name"],
          required: false,
        } as any,
      ],
      where,
      raw: true,
    });

    const toFullName = (row: any) => {
      return String(row.name);
    };

    return rows.map((r: any) => ({
      id: Number(r.id),
      fullName: toFullName(r),
      role: String(r.role),
      barangayName: r["Barangay.name"]
        ? String(r["Barangay.name"])
        : "No Barangay",
    }));
  }

  async deadAliveCountDetails(params: {
    barangayId?: number;
    status: string;
  }) {
    const { barangayId, status } = params;
    if (!status) return [];

    if (status.toLowerCase() === "alive") {
      const basic = await this.getSeniorBasicFields({ barangayId });
      return basic.map((r) => ({
        ...r,
        status: "Alive",
      }));
    }

    if (status.toLowerCase() === "dead") {
      const include: Includeable[] = [
        {
          model: Senior,
          attributes: [],
          where: {
            isDeleted: false,
            ...(barangayId ? { barangayId } : {}),
          },
          required: true,
          include: [
            {
              model: DeathInfo,
              attributes: [],
              required: true,
            } as any,
            {
              model: Barangay,
              attributes: ["id", "name"],
              required: false,
            } as any,
          ],
        } as any,
      ];

      const rows = await SeniorProfile.findAll({
        attributes: [
          "seniorId",
          "firstname",
          "lastname",
          "middlename",
          "extension",
          "birthDate",
        ],
        include,
        raw: true,
      });

      const now = new Date();
      const toAge = (d: Date | string | null) => {
        if (!d) return null;
        const birth = new Date(d);
        let age = now.getFullYear() - birth.getFullYear();
        const m = now.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
        return age;
      };

      const toFullName = (row: any) => {
        const parts = [
          row.firstname,
          row.middlename,
          row.lastname,
          row.extension,
        ].filter(Boolean);
        return parts.join(" ");
      };

      return rows.map((r: any) => ({
        id: Number(r.seniorId),
        fullName: toFullName(r),
        age: toAge(r.birthDate),
        barangayName: r["Senior.Barangay.name"]
          ? String(r["Senior.Barangay.name"])
          : "N/A",
        status: "Dead",
      }));
    }

    return [];
  }
}

export const analyticsService = new AnalyticsService();
