import { FamilyComposition } from "@/models";
import type { CreationAttributes } from "sequelize";
import { Transaction } from "sequelize";

export class FamilyCompositionService {
  async getBySeniorId(seniorId: number) {
    return FamilyComposition.findByPk(seniorId);
  }

  async create(data: CreationAttributes<FamilyComposition>, transaction?: Transaction) {
    // If no data provided, create with empty profile
    const profileData = data || {};
    return FamilyComposition.create(profileData, { transaction });
  }

  async update(seniorId: number, data: Partial<CreationAttributes<FamilyComposition>>, transaction?: Transaction) {
    const familyComposition = await FamilyComposition.findByPk(seniorId, { transaction });
    
    if (!familyComposition) {
      throw new Error("Family composition not found");
    }

    await familyComposition.update(data, { transaction });
    return familyComposition;
  }

  async delete(seniorId: number) {
    const familyComposition = await FamilyComposition.findByPk(seniorId);
    
    if (!familyComposition) {
      throw new Error("Family composition not found");
    }

    await familyComposition.destroy();
    return { message: "Family composition deleted successfully" };
  }
}

export const familyCompositionService = new FamilyCompositionService();
