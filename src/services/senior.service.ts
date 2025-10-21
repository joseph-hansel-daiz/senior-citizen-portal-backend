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
import { Transaction } from "sequelize";

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
    // Lightweight list without all profile relationships for better performance
    return Senior.findAll({
      where: { isDeleted: false },
      include: [
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
          model: IdentifyingInformation,
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        {
          model: DependencyProfile,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: LivingCondition,
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
        }
      ]
    });
  }

  async getSeniorById(id: string, transaction?: Transaction) {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false },
      include: this.getIncludeOptions(),
      transaction
    });
    if (!senior) throw new Error("Senior not found");
    return senior;
  }

  async createSenior(data: {
    barangayId: number;
    photo?: Blob;
    createdBy?: number;
  }, transaction?: Transaction) {
    const { barangayId, photo, createdBy } = data;

    if (!barangayId) {
      throw new Error("barangayId is required");
    }

    const senior = await Senior.create({
      barangayId,
      photo: photo || undefined,
      createdBy: createdBy || null,
    }, { transaction });

    // Auto-create status history with pending status
    await SeniorStatusHistory.create({
      seniorId: senior.id,
      status: "Pending",
    }, { transaction });

    return this.getSeniorById(senior.id.toString(), transaction);
  }

  async updateSenior(id: string, data: {
    barangayId?: number;
    photo?: Blob;
    updatedBy?: number;
  }, transaction?: Transaction) {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false },
      transaction
    });
    
    if (!senior) {
      throw new Error("Senior not found");
    }

    const { barangayId, photo, updatedBy } = data;

    if (barangayId !== undefined) {
      senior.barangayId = barangayId;
    }
    
    if (photo !== undefined) {
      senior.photo = photo;
    }
    
    if (updatedBy !== undefined) {
      senior.updatedBy = updatedBy;
    }

    await senior.save({ transaction });
    return this.getSeniorById(id, transaction);
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

  async approveSenior(id: string, oscaId: string, note?: string, approvedBy?: number, transaction?: Transaction) {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false },
      include: [
        {
          model: SeniorStatusHistory,
          attributes: ["id", "status"]
        },
        {
          model: IdentifyingInformation,
          attributes: ["seniorId", "oscaIdNo"]
        }
      ],
      transaction
    });
    
    if (!senior) {
      throw new Error("Senior not found");
    }

    // Check if senior is in pending status
    const statusHistory = senior.statusHistory || [];
    if (statusHistory.length !== 1 || statusHistory[0].status !== "Pending") {
      throw new Error("Senior is not in pending status");
    }

    // Update OSCA ID in IdentifyingInformation
    if (senior.identifyingInformation) {
      await senior.identifyingInformation.update(
        { oscaIdNo: oscaId, updatedBy: approvedBy },
        { transaction }
      );
    } else {
      throw new Error("Identifying information not found");
    }

    // Create new status history entry with "Active" status
    await SeniorStatusHistory.create({
      seniorId: Number(id),
      status: "Active",
      note: note || undefined,
      createdBy: approvedBy,
      updatedBy: approvedBy
    }, { transaction });

    return this.getSeniorById(id, transaction);
  }

  async declineSenior(id: string, note?: string, declinedBy?: number, transaction?: Transaction) {
    const senior = await Senior.findOne({
      where: { id, isDeleted: false },
      include: [
        {
          model: SeniorStatusHistory,
          attributes: ["id", "status"]
        }
      ],
      transaction
    });
    
    if (!senior) {
      throw new Error("Senior not found");
    }

    // Check if senior is in pending status
    const statusHistory = senior.statusHistory || [];
    console.log(statusHistory);
    if (statusHistory.length !== 1 || statusHistory[0].status !== "Pending") {
      throw new Error("Senior is not in pending status");
    }

    // Create new status history entry with "Declined" status
    await SeniorStatusHistory.create({
      seniorId: Number(id),
      status: "Declined",
      note: note || undefined,
      createdBy: declinedBy,
      updatedBy: declinedBy
    }, { transaction });

    return this.getSeniorById(id, transaction);
  }
}

export const seniorService = new SeniorService();
