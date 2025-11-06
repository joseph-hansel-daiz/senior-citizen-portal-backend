import {
  Assistance,
  Barangay,
  IdentifyingInformation,
  Senior,
  SeniorAssistance,
  SeniorVaccine,
  User,
  Vaccine,
} from "@/models";
import { FindAttributeOptions, Includeable, col, fn } from "sequelize";

export class AnalyticsService {
  private barangayInclude(barangayId?: number): Includeable[] {
    if (!barangayId) return [];
    return [
      {
        model: Senior,
        attributes: [],
        where: { barangayId },
        required: true,
      } as any,
    ];
  }

  async genderDistribution(params?: { barangayId?: number }) {
    const { barangayId } = params || {};
    const records = await IdentifyingInformation.findAll({
      attributes: [
        [col("sexAtBirth"), "sexAtBirth"],
        [fn("COUNT", col("IdentifyingInformation.seniorId")), "count"],
      ] as unknown as FindAttributeOptions,
      include: this.barangayInclude(barangayId),
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
    const items = await IdentifyingInformation.findAll({
      attributes: ["birthDate"],
      include: [
        ...(barangayId
          ? [
              {
                model: Senior,
                attributes: [],
                where: { barangayId },
                required: true,
              } as any,
            ]
          : []),
      ],
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
    ];
    if (barangayId) {
      include.push({
        model: Senior,
        attributes: [],
        where: { barangayId },
        required: true,
      } as any);
    }
    const rows = await SeniorAssistance.findAll({
      attributes: [
        [col("assistanceId"), "assistanceId"],
        [fn("COUNT", col("SeniorAssistance.id")), "totalCount"],
      ] as unknown as FindAttributeOptions,
      include,
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
    ];
    if (barangayId) {
      include.push({
        model: Senior,
        attributes: [],
        where: { barangayId },
        required: true,
      } as any);
    }
    const rows = await SeniorVaccine.findAll({
      attributes: [
        [col("vaccineId"), "vaccineId"],
        [fn("COUNT", fn("DISTINCT", col("seniorId"))), "countDistinctSeniors"],
      ] as unknown as FindAttributeOptions,
      include,
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
}

export const analyticsService = new AnalyticsService();
