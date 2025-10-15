import { 
  Senior, 
  Barangay, 
  User,
  IdentifyingInformation,
  FamilyComposition,
  DependencyProfile,
  EducationProfile,
  EconomicProfile,
  HealthProfile,
  DeathInfo,
  SeniorStatusHistory,
  HelpDeskRecord,
  Children,
  Dependent,
  HelpDeskRecordCategory,
  // Options
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
  VisualConcern
} from "@/models";

export class SeniorService {
  private getIncludeOptions() {
    return [
      // Basic associations
      {
        model: Barangay,
        attributes: ["id", "name"]
      },
      {
        model: User,
        as: "creator",
        attributes: ["id", "name", "username", "role"]
      },
      {
        model: User,
        as: "updater", 
        attributes: ["id", "name", "username", "role"]
      },
      {
        model: User,
        as: "deleter",
        attributes: ["id", "name", "username", "role"]
      },
      // Profile associations
      {
        model: IdentifyingInformation,
        attributes: { exclude: ["createdAt", "updatedAt"] }
      },
      {
        model: FamilyComposition,
        attributes: { exclude: ["createdAt", "updatedAt"] }
      },
      {
        model: DependencyProfile,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Cohabitant,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: LivingCondition,
            through: { attributes: [] },
            attributes: ["id", "name"]
          }
        ]
      },
      {
        model: EducationProfile,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: HighestEducationalAttainment,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: SpecializationTechnicalSkill,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: CommunityInvolvement,
            through: { attributes: [] },
            attributes: ["id", "name"]
          }
        ]
      },
      {
        model: EconomicProfile,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: IncomeAssistanceSource,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: RealImmovableProperty,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: PersonalMovableProperty,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: MonthlyIncome,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: ProblemsNeedsCommonlyEncountered,
            through: { attributes: [] },
            attributes: ["id", "name"]
          }
        ]
      },
      {
        model: HealthProfile,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: HealthProblemAilment,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: DentalConcern,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: VisualConcern,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: AuralConcern,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: SocialEmotionalConcern,
            through: { attributes: [] },
            attributes: ["id", "name"]
          },
          {
            model: AreaOfDifficulty,
            through: { attributes: [] },
            attributes: ["id", "name"]
          }
        ]
      },
      {
        model: DeathInfo,
        attributes: { exclude: ["createdAt", "updatedAt"] }
      },
      {
        model: SeniorStatusHistory,
        attributes: { exclude: ["createdAt", "updatedAt"] }
      },
      {
        model: HelpDeskRecord,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: HelpDeskRecordCategory,
            attributes: ["id", "name"]
          }
        ]
      },
      // Family composition
      {
        model: Children,
        attributes: { exclude: ["createdAt", "updatedAt"] }
      },
      {
        model: Dependent,
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }
    ];
  }

  async listSeniors() {
    return Senior.findAll({
      where: { isDeleted: false },
      include: this.getIncludeOptions()
    });
  }

  async getSeniorById(id: string) {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false },
      include: this.getIncludeOptions()
    });
    if (!senior) throw new Error("Senior not found");
    return senior;
  }

  async createSenior(data: {
    barangayId: number;
    createdBy?: number;
  }) {
    const { barangayId, createdBy } = data;

    if (!barangayId) {
      throw new Error("barangayId is required");
    }

    const senior = await Senior.create({
      barangayId,
      createdBy: createdBy || null,
    });

    return this.getSeniorById(senior.id.toString());
  }

  async updateSenior(id: string, data: {
    barangayId?: number;
    updatedBy?: number;
  }) {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false }
    });
    
    if (!senior) {
      throw new Error("Senior not found");
    }

    const { barangayId, updatedBy } = data;

    if (barangayId !== undefined) {
      senior.barangayId = barangayId;
    }
    
    if (updatedBy !== undefined) {
      senior.updatedBy = updatedBy;
    }

    await senior.save();
    return this.getSeniorById(id);
  }

  async deleteSenior(id: string, deletedBy?: number) {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false }
    });
    
    if (!senior) {
      throw new Error("Senior not found");
    }

    senior.isDeleted = true;
    senior.deletedAt = new Date();
    if (deletedBy !== undefined) {
      senior.deletedBy = deletedBy;
    }

    await senior.save();
    return { message: "Senior deleted successfully" };
  }
}

export const seniorService = new SeniorService();
