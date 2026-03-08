import {
  Senior,
  SeniorProfile,
  Barangay,
  User,
  DeathInfo,
  SeniorStatusHistory,
  HelpDeskRecord,
  Children,
  Dependent,
  HelpDeskRecordCategory,
  AreaOfDifficulty,
  AuralConcern,
  Cohabitant,
  CommunityInvolvement,
  DentalConcern,
  HealthProblemAilment,
  HighestEducationalAttainment,
  IncomeAssistanceSource,
  LivingCondition,
  MonthlyIncome,
  PersonalMovableProperty,
  ProblemsNeedsCommonlyEncountered,
  RealImmovableProperty,
  SocialEmotionalConcern,
  SpecializationTechnicalSkill,
  VisualConcern,
} from "@/models";
import type { ModelStatic } from "sequelize";
import { Transaction, where, literal, Op } from "sequelize";

export interface SeniorListDTO {
  id: number;
  barangayId: number;
  photo?: Blob;
  displayName: string;
  birthDate?: string;
  address: string;
  contactNumber?: string;
  hasPension?: boolean;
  livingConditionNames: string[];
  status: string;
  isDeceased: boolean;
  dateOfDeath?: string;
  barangay?: { id: number; name: string };
}

export interface SeniorOptionDTO {
  id: number;
  name: string;
}

async function resolveOptionIds(
  Model: ModelStatic<any>,
  ids: number[] | null | undefined
): Promise<{ id: number; name: string }[]> {
  if (!ids || ids.length === 0) return [];
  const rows = await Model.findAll({
    where: { id: { [Op.in]: ids } },
    attributes: ["id", "name"],
  });
  const orderMap = new Map(ids.map((id, i) => [id, i]));
  return rows
    .map((r) => ({ id: r.id, name: r.name }))
    .sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0));
}

export class SeniorService {
  async listSeniors(
    filter?: { barangayId?: number; birthYear?: number }
  ): Promise<SeniorListDTO[]> {
    const whereClause: any = {
      isDeleted: false,
      ...(filter?.barangayId ? { barangayId: filter.barangayId } : {}),
    };

    const seniors = await Senior.findAll({
      where: whereClause,
      attributes: ["id", "barangayId", "photo"],
      include: [
        { model: Barangay, attributes: ["id", "name"] },
        {
          model: SeniorProfile,
          attributes: [
            "firstname",
            "middlename",
            "lastname",
            "birthDate",
            "street",
            "barangay",
            "city",
            "contactNumber",
            "hasPension",
            "livingConditionIds",
          ],
          required: filter?.birthYear != null,
          ...(filter?.birthYear != null
            ? {
                where: where(
                  literal('EXTRACT(YEAR FROM "SeniorProfile"."birthDate")'),
                  filter.birthYear
                ),
              }
            : {}),
        },
        { model: DeathInfo, attributes: ["seniorId", "dateOfDeath"], required: false },
        {
          model: SeniorStatusHistory,
          attributes: ["status", "createdAt"],
        },
      ],
    });

    const livingConditionIds = new Set<number>();
    for (const s of seniors) {
      const profile = (s as any).SeniorProfile;
      if (profile?.livingConditionIds?.length) {
        profile.livingConditionIds.forEach((id: number) => livingConditionIds.add(id));
      }
    }
    const livingConditionMap = new Map<number, string>();
    if (livingConditionIds.size > 0) {
      const list = await LivingCondition.findAll({
        where: { id: { [Op.in]: Array.from(livingConditionIds) } },
        attributes: ["id", "name"],
      });
      list.forEach((r) => livingConditionMap.set(r.id, r.name));
    }

    return seniors.map((s) => {
      const sr = s.get({ plain: true }) as any;
      const profile = sr.SeniorProfile;
      const statusHistories = (sr.SeniorStatusHistories || []).slice().sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const latestStatus = statusHistories[0]?.status ?? "Pending";
      const displayName = profile
        ? [profile.firstname, profile.middlename, profile.lastname].filter(Boolean).join(" ").trim()
        : "N/A";
      const address = profile
        ? [profile.street, profile.barangay, profile.city].filter(Boolean).join(", ") || "N/A"
        : "N/A";
      const livingConditionNames = (profile?.livingConditionIds || []).map(
        (id: number) => livingConditionMap.get(id) ?? String(id)
      );
      const deathInfo = sr.DeathInfo as { dateOfDeath?: Date } | undefined;
      return {
        id: sr.id,
        barangayId: sr.barangayId,
        photo: sr.photo,
        displayName,
        birthDate: profile?.birthDate,
        address,
        contactNumber: profile?.contactNumber,
        hasPension: profile?.hasPension,
        livingConditionNames,
        status: latestStatus,
        isDeceased: !!sr.DeathInfo,
        dateOfDeath: deathInfo?.dateOfDeath
          ? new Date(deathInfo.dateOfDeath).toISOString().slice(0, 10)
          : undefined,
        barangay: sr.Barangay,
      };
    });
  }

  async getSeniorById(id: string, transaction?: Transaction): Promise<any> {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false },
      include: [
        { model: Barangay, attributes: ["id", "name"] },
        { model: User, as: "creator", attributes: ["id", "name", "username", "role"] },
        { model: User, as: "updater", attributes: ["id", "name", "username", "role"] },
        { model: User, as: "deleter", attributes: ["id", "name", "username", "role"] },
        { model: SeniorProfile, attributes: { exclude: ["createdAt", "updatedAt"] } },
        { model: DeathInfo, attributes: { exclude: ["createdAt", "updatedAt"] } },
        { model: SeniorStatusHistory, attributes: { exclude: ["createdAt", "updatedAt"] } },
        {
          model: HelpDeskRecord,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: HelpDeskRecordCategory,
              through: { attributes: [] },
              attributes: ["id", "name"],
            },
          ],
        },
        { model: Children, attributes: { exclude: ["createdAt", "updatedAt"] } },
        { model: Dependent, attributes: { exclude: ["createdAt", "updatedAt"] } },
      ],
      transaction,
    });
    if (!senior) throw new Error("Senior not found");

    const plain = senior.get({ plain: true }) as any;
    const profile = plain.SeniorProfile;
    if (!profile) {
      return plain;
    }

    const [
      Cohabitants,
      LivingConditions,
      HighestEducationalAttainments,
      SpecializationTechnicalSkills,
      CommunityInvolvements,
      IncomeAssistanceSources,
      RealImmovableProperties,
      PersonalMovableProperties,
      MonthlyIncomes,
      ProblemsNeedsCommonlyEncountereds,
      HealthProblemAilments,
      DentalConcerns,
      VisualConcerns,
      AuralConcerns,
      SocialEmotionalConcerns,
      AreaOfDifficulties,
    ] = await Promise.all([
      resolveOptionIds(Cohabitant, profile.cohabitantIds),
      resolveOptionIds(LivingCondition, profile.livingConditionIds),
      resolveOptionIds(HighestEducationalAttainment, profile.highestEducationalAttainmentIds),
      resolveOptionIds(SpecializationTechnicalSkill, profile.specializationTechnicalSkillIds),
      resolveOptionIds(CommunityInvolvement, profile.communityInvolvementIds),
      resolveOptionIds(IncomeAssistanceSource, profile.incomeAssistanceSourceIds),
      resolveOptionIds(RealImmovableProperty, profile.realImmovablePropertyIds),
      resolveOptionIds(PersonalMovableProperty, profile.personalMovablePropertyIds),
      resolveOptionIds(MonthlyIncome, profile.monthlyIncomeIds),
      resolveOptionIds(ProblemsNeedsCommonlyEncountered, profile.problemsNeedsCommonlyEncounteredIds),
      resolveOptionIds(HealthProblemAilment, profile.healthProblemAilmentIds),
      resolveOptionIds(DentalConcern, profile.dentalConcernIds),
      resolveOptionIds(VisualConcern, profile.visualConcernIds),
      resolveOptionIds(AuralConcern, profile.auralConcernIds),
      resolveOptionIds(SocialEmotionalConcern, profile.socialEmotionalConcernIds),
      resolveOptionIds(AreaOfDifficulty, profile.areaOfDifficultyIds),
    ]);

    return {
      ...plain,
      IdentifyingInformation: {
        seniorId: profile.seniorId,
        lastname: profile.lastname,
        firstname: profile.firstname,
        middlename: profile.middlename,
        extension: profile.extension,
        region: profile.region,
        province: profile.province,
        city: profile.city,
        barangay: profile.barangay,
        residence: profile.residence,
        street: profile.street,
        birthDate: profile.birthDate,
        birthPlace: profile.birthPlace,
        maritalStatus: profile.maritalStatus,
        religion: profile.religion,
        sexAtBirth: profile.sexAtBirth,
        contactNumber: profile.contactNumber,
        emailAddress: profile.emailAddress,
        fbMessengerName: profile.fbMessengerName,
        ethnicOrigin: profile.ethnicOrigin,
        languageSpoken: profile.languageSpoken,
        oscaIdNo: profile.oscaIdNo,
        gsisSssNo: profile.gsisSssNo,
        tin: profile.tin,
        philhealthNo: profile.philhealthNo,
        scAssociationIdNo: profile.scAssociationIdNo,
        otherGovIdNo: profile.otherGovIdNo,
        employmentBusiness: profile.employmentBusiness,
        hasPension: profile.hasPension,
        pensionList: profile.pensionList,
        capabilityToTravel: profile.capabilityToTravel,
        createdBy: profile.createdBy,
        updatedBy: profile.updatedBy,
      },
      FamilyComposition: {
        seniorId: profile.seniorId,
        spouseLastname: profile.spouseLastname,
        spouseFirstname: profile.spouseFirstname,
        spouseMiddlename: profile.spouseMiddlename,
        spouseExtension: profile.spouseExtension,
        fatherLastname: profile.fatherLastname,
        fatherFirstname: profile.fatherFirstname,
        fatherMiddlename: profile.fatherMiddlename,
        fatherExtension: profile.fatherExtension,
        motherLastname: profile.motherLastname,
        motherFirstname: profile.motherFirstname,
        motherMiddlename: profile.motherMiddlename,
        createdBy: profile.createdBy,
        updatedBy: profile.updatedBy,
      },
      DependencyProfile: {
        seniorId: profile.seniorId,
        LivingConditions,
        Cohabitants,
        createdBy: profile.createdBy,
        updatedBy: profile.updatedBy,
      },
      EducationProfile: {
        seniorId: profile.seniorId,
        sharedSkills: profile.sharedSkills,
        HighestEducationalAttainments,
        SpecializationTechnicalSkills,
        CommunityInvolvements,
        createdBy: profile.createdBy,
        updatedBy: profile.updatedBy,
      },
      EconomicProfile: {
        seniorId: profile.seniorId,
        IncomeAssistanceSources,
        RealImmovableProperties,
        PersonalMovableProperties,
        MonthlyIncomes,
        ProblemsNeedsCommonlyEncountereds,
        createdBy: profile.createdBy,
        updatedBy: profile.updatedBy,
      },
      HealthProfile: {
        seniorId: profile.seniorId,
        bloodType: profile.bloodType,
        physicalDisability: profile.physicalDisability,
        listMedicines: profile.listMedicines,
        checkUp: profile.checkUp,
        scheduleCheckUp: profile.scheduleCheckUp,
        HealthProblemAilments,
        DentalConcerns,
        VisualConcerns,
        AuralConcerns,
        SocialEmotionalConcerns,
        AreaOfDifficulties,
        createdBy: profile.createdBy,
        updatedBy: profile.updatedBy,
      },
      SeniorProfile: undefined,
    };
  }

  async getSeniorOptions(filters?: {
    status?: "active" | "pending" | "all";
  }): Promise<SeniorOptionDTO[]> {
    const seniors = await Senior.findAll({
      where: { isDeleted: false },
      attributes: ["id"],
      include: [
        {
          model: SeniorProfile,
          attributes: ["firstname", "middlename", "lastname"],
          required: true,
        },
        { model: DeathInfo, attributes: ["seniorId"], required: false },
        { model: SeniorStatusHistory, attributes: ["status", "createdAt"] },
      ],
    });

    let filtered = seniors;
    if (filters?.status === "active") {
      filtered = seniors.filter((s) => {
        const plain = s.get({ plain: true }) as any;
        if (plain.DeathInfo) return false;
        const histories = (plain.SeniorStatusHistories || []).slice().sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return histories[0]?.status === "Active";
      });
    } else if (filters?.status === "pending") {
      filtered = seniors.filter((s) => {
        const plain = s.get({ plain: true }) as any;
        const histories = (plain.SeniorStatusHistories || []).slice().sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return histories[0]?.status === "Pending";
      });
    }

    return filtered.map((s) => {
      const plain = s.get({ plain: true }) as any;
      const profile = plain.SeniorProfile;
      const name = profile
        ? [profile.firstname, profile.middlename, profile.lastname].filter(Boolean).join(" ").trim()
        : "N/A";
      return { id: plain.id, name };
    });
  }

  private mapBodyToSeniorProfile(
    body: any,
    seniorId: number,
    createdBy?: number,
    updatedBy?: number
  ): any {
    const ii = body.identifyingInformation || {};
    const fc = body.familyComposition || {};
    const ep = body.educationProfile || {};
    const hp = body.healthProfile || {};
    const dp = body.dependencyProfile || {};
    const ec = body.economicProfile || {};

    const toIds = (arr: { id: number }[] | number[] | undefined): number[] | null => {
      if (!arr || !Array.isArray(arr)) return null;
      return arr.map((x: any) => (typeof x === "object" && x != null && "id" in x ? x.id : x));
    };

    return {
      seniorId,
      lastname: ii.lastname ?? "",
      firstname: ii.firstname ?? "",
      middlename: ii.middlename ?? null,
      extension: ii.extension ?? null,
      region: ii.region ?? "",
      province: ii.province ?? "",
      city: ii.city ?? "",
      barangay: ii.barangay ?? "",
      residence: ii.residence ?? "",
      street: ii.street ?? null,
      birthDate: ii.birthDate ?? null,
      birthPlace: ii.birthPlace ?? "",
      maritalStatus: ii.maritalStatus ?? "",
      religion: ii.religion ?? null,
      sexAtBirth: ii.sexAtBirth ?? "",
      contactNumber: ii.contactNumber ?? null,
      emailAddress: ii.emailAddress ?? null,
      fbMessengerName: ii.fbMessengerName ?? null,
      ethnicOrigin: ii.ethnicOrigin ?? null,
      languageSpoken: ii.languageSpoken ?? null,
      oscaIdNo: ii.oscaIdNo ?? null,
      gsisSssNo: ii.gsisSssNo ?? null,
      tin: ii.tin ?? null,
      philhealthNo: ii.philhealthNo ?? null,
      scAssociationIdNo: ii.scAssociationIdNo ?? null,
      otherGovIdNo: ii.otherGovIdNo ?? null,
      employmentBusiness: ii.employmentBusiness ?? null,
      hasPension: ii.hasPension ?? null,
      pensionList: ii.pensionList ?? null,
      capabilityToTravel: ii.capabilityToTravel ?? null,
      spouseLastname: fc.spouseLastname ?? null,
      spouseFirstname: fc.spouseFirstname ?? null,
      spouseMiddlename: fc.spouseMiddlename ?? null,
      spouseExtension: fc.spouseExtension ?? null,
      fatherLastname: fc.fatherLastname ?? null,
      fatherFirstname: fc.fatherFirstname ?? null,
      fatherMiddlename: fc.fatherMiddlename ?? null,
      fatherExtension: fc.fatherExtension ?? null,
      motherLastname: fc.motherLastname ?? null,
      motherFirstname: fc.motherFirstname ?? null,
      motherMiddlename: fc.motherMiddlename ?? null,
      sharedSkills: ep.sharedSkills ?? null,
      bloodType: hp.bloodType ?? "O",
      physicalDisability: hp.physicalDisability ?? null,
      listMedicines: hp.listMedicines ?? null,
      checkUp: hp.checkUp ?? false,
      scheduleCheckUp: hp.scheduleCheckUp ?? "Annually",
      cohabitantIds: toIds(dp.Cohabitants) ?? toIds(dp.cohabitants) ?? [],
      livingConditionIds: toIds(dp.LivingConditions) ?? toIds(dp.livingConditions) ?? [],
      highestEducationalAttainmentIds:
        toIds(ep.HighestEducationalAttainments) ?? toIds(ep.highestEducationalAttainments) ?? [],
      specializationTechnicalSkillIds:
        toIds(ep.SpecializationTechnicalSkills) ?? toIds(ep.specializationTechnicalSkills) ?? [],
      communityInvolvementIds:
        toIds(ep.CommunityInvolvements) ?? toIds(ep.communityInvolvements) ?? [],
      incomeAssistanceSourceIds:
        toIds(ec.IncomeAssistanceSources) ?? toIds(ec.incomeAssistanceSources) ?? [],
      realImmovablePropertyIds:
        toIds(ec.RealImmovableProperties) ?? toIds(ec.realImmovableProperties) ?? [],
      personalMovablePropertyIds:
        toIds(ec.PersonalMovableProperties) ?? toIds(ec.personalMovableProperties) ?? [],
      monthlyIncomeIds: toIds(ec.MonthlyIncomes) ?? toIds(ec.monthlyIncomes) ?? [],
      problemsNeedsCommonlyEncounteredIds:
        toIds(ec.ProblemsNeedsCommonlyEncountereds) ??
        toIds(ec.problemsNeedsCommonlyEncountered) ??
        [],
      healthProblemAilmentIds:
        toIds(hp.HealthProblemAilments) ?? toIds(hp.healthProblemAilments) ?? [],
      dentalConcernIds: toIds(hp.DentalConcerns) ?? toIds(hp.dentalConcerns) ?? [],
      visualConcernIds: toIds(hp.VisualConcerns) ?? toIds(hp.visualConcerns) ?? [],
      auralConcernIds: toIds(hp.AuralConcerns) ?? toIds(hp.auralConcerns) ?? [],
      socialEmotionalConcernIds:
        toIds(hp.SocialEmotionalConcerns) ?? toIds(hp.socialEmotionalConcerns) ?? [],
      areaOfDifficultyIds:
        toIds(hp.AreaOfDifficulties) ??
        toIds(hp.areaOfDifficulties) ??
        toIds(hp.areasOfDifficulty) ??
        [],
      createdBy: createdBy ?? null,
      updatedBy: updatedBy ?? null,
    };
  }

  async createSenior(
    data: {
      barangayId: number;
      photo?: Blob;
      createdBy?: number;
      identifyingInformation?: any;
      familyComposition?: any;
      dependencyProfile?: any;
      educationProfile?: any;
      economicProfile?: any;
      healthProfile?: any;
      children?: any[];
      dependents?: any[];
    },
    transaction?: Transaction
  ): Promise<any> {
    const { barangayId, photo, createdBy, children, dependents } = data;
    if (!barangayId) throw new Error("barangayId is required");
    const ii = data.identifyingInformation;
    if (!ii || !ii.lastname || !ii.firstname || !ii.birthDate || !ii.region || !ii.province || !ii.city || !ii.barangay || !ii.residence || !ii.birthPlace || !ii.maritalStatus || !ii.sexAtBirth) {
      throw new Error("Required fields: lastname, firstname, birthDate, region, province, city, barangay, residence, birthPlace, maritalStatus, sexAtBirth (in identifyingInformation)");
    }
    const senior = await Senior.create(
      {
        barangayId,
        photo: photo ?? undefined,
        createdBy: createdBy ?? null,
      },
      { transaction }
    );

    await SeniorStatusHistory.create(
      { seniorId: senior.id, status: "Pending" },
      { transaction }
    );

    const profilePayload = this.mapBodyToSeniorProfile(data, senior.id, createdBy, undefined);
    await SeniorProfile.create(profilePayload, { transaction });

    if (Array.isArray(children) && children.length > 0) {
      await Children.bulkCreate(
        children.map((c: any) => ({
          seniorId: senior.id,
          name: c.name,
          occupation: c.occupation ?? null,
          income: c.income ?? null,
          age: c.age,
          isWorking: c.isWorking === true || c.isWorking === "Yes" ? "Yes" : "No",
        })),
        { transaction }
      );
    }
    if (Array.isArray(dependents) && dependents.length > 0) {
      await Dependent.bulkCreate(
        dependents.map((d: any) => ({
          seniorId: senior.id,
          name: d.name,
          occupation: d.occupation ?? null,
          income: d.income ?? null,
          age: d.age,
          isWorking: !!(d.isWorking === true || d.isWorking === "Yes"),
        })),
        { transaction }
      );
    }

    return this.getSeniorById(senior.id.toString(), transaction);
  }

  async updateSenior(
    id: string,
    data: {
      barangayId?: number;
      photo?: Blob;
      updatedBy?: number;
      identifyingInformation?: any;
      familyComposition?: any;
      dependencyProfile?: any;
      educationProfile?: any;
      economicProfile?: any;
      healthProfile?: any;
      children?: any[];
      dependents?: any[];
    },
    transaction?: Transaction
  ): Promise<any> {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false },
      include: [{ model: SeniorProfile }],
      transaction,
    });
    if (!senior) throw new Error("Senior not found");

    const seniorId = senior.id;
    const { barangayId, photo, updatedBy, children, dependents } = data;

    if (barangayId !== undefined) (senior as any).barangayId = barangayId;
    if (photo !== undefined) (senior as any).photo = photo;
    if (updatedBy !== undefined) (senior as any).updatedBy = updatedBy;
    await senior.save({ transaction });

    const profile = (senior as any).SeniorProfile;
    if (profile) {
      const profilePayload = this.mapBodyToSeniorProfile(
        data,
        seniorId,
        undefined,
        updatedBy
      );
      delete (profilePayload as any).seniorId;
      delete (profilePayload as any).createdBy;
      await profile.update(profilePayload, { transaction });
    }

    if (children !== undefined) {
      await Children.destroy({ where: { seniorId }, transaction });
      if (Array.isArray(children) && children.length > 0) {
        await Children.bulkCreate(
          children.map((c: any) => ({
            seniorId,
            name: c.name,
            occupation: c.occupation ?? null,
            income: c.income ?? null,
            age: c.age,
            isWorking: c.isWorking === true || c.isWorking === "Yes" ? "Yes" : "No",
          })),
          { transaction }
        );
      }
    }
    if (dependents !== undefined) {
      await Dependent.destroy({ where: { seniorId }, transaction });
      if (Array.isArray(dependents) && dependents.length > 0) {
        await Dependent.bulkCreate(
          dependents.map((d: any) => ({
            seniorId,
            name: d.name,
            occupation: d.occupation ?? null,
            income: d.income ?? null,
            age: d.age,
            isWorking: !!(d.isWorking === true || d.isWorking === "Yes"),
          })),
          { transaction }
        );
      }
    }

    return this.getSeniorById(id, transaction);
  }

  async deleteSenior(id: string, deletedBy?: number) {
    const senior = await Senior.findOne({ where: { id, isDeleted: false } });
    if (!senior) throw new Error("Senior not found");
    (senior as any).isDeleted = true;
    (senior as any).deletedAt = new Date();
    if (deletedBy !== undefined) (senior as any).deletedBy = deletedBy;
    await senior.save();
    return { message: "Senior deleted successfully" };
  }

  async approveSenior(
    id: string,
    oscaId: string,
    note?: string,
    approvedBy?: number,
    transaction?: Transaction
  ): Promise<any> {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false },
      include: [
        { model: SeniorStatusHistory, attributes: ["status"] },
        { model: SeniorProfile, attributes: ["seniorId", "oscaIdNo"] },
      ],
      transaction,
    });
    if (!senior) throw new Error("Senior not found");

    const statusHistory = (senior as any).SeniorStatusHistories || [];
    if (statusHistory.length !== 1 || statusHistory[0].status !== "Pending") {
      throw new Error("Senior is not in pending status");
    }

    const profile = (senior as any).SeniorProfile;
    if (!profile) throw new Error("Identifying information not found");
    await profile.update(
      { oscaIdNo: oscaId, updatedBy: approvedBy },
      { transaction }
    );

    await SeniorStatusHistory.create(
      {
        seniorId: Number(id),
        status: "Active",
        note: note ?? undefined,
        createdBy: approvedBy,
        updatedBy: approvedBy,
      },
      { transaction }
    );

    return this.getSeniorById(id, transaction);
  }

  async declineSenior(
    id: string,
    note?: string,
    declinedBy?: number,
    transaction?: Transaction
  ): Promise<any> {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false },
      include: [{ model: SeniorStatusHistory, attributes: ["status"] }],
      transaction,
    });
    if (!senior) throw new Error("Senior not found");

    const statusHistory = (senior as any).SeniorStatusHistories || [];
    if (statusHistory.length !== 1 || statusHistory[0].status !== "Pending") {
      throw new Error("Senior is not in pending status");
    }

    await SeniorStatusHistory.create(
      {
        seniorId: Number(id),
        status: "Declined",
        note: note ?? undefined,
        createdBy: declinedBy,
        updatedBy: declinedBy,
      },
      { transaction }
    );

    return this.getSeniorById(id, transaction);
  }
}

export const seniorService = new SeniorService();
