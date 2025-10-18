import { DependencyProfile, Cohabitant, LivingCondition, SeniorCohabitant, SeniorLivingCondition } from "@/models";
import type { CreationAttributes } from "sequelize";
import { Transaction } from "sequelize";

export class DependencyProfileService {
  // Helper function to set cohabitants
  private async setCohabitants(seniorId: number, cohabitantIds: number[], transaction?: Transaction) {
    // Remove existing associations
    await SeniorCohabitant.destroy({
      where: { seniorId },
      transaction
    });
    
    // Add new associations
    if (cohabitantIds.length > 0) {
      await SeniorCohabitant.bulkCreate(
        cohabitantIds.map(cohabitantId => ({
          seniorId,
          cohabitantId
        })),
        { transaction }
      );
    }
  }

  // Helper function to set living conditions
  private async setLivingConditions(seniorId: number, livingConditionIds: number[], transaction?: Transaction) {
    // Remove existing associations
    await SeniorLivingCondition.destroy({
      where: { seniorId },
      transaction
    });
    
    // Add new associations
    if (livingConditionIds.length > 0) {
      await SeniorLivingCondition.bulkCreate(
        livingConditionIds.map(livingConditionId => ({
          seniorId,
          livingConditionId
        })),
        { transaction }
      );
    }
  }

  async getBySeniorId(seniorId: number) {
    return DependencyProfile.findByPk(seniorId);
  }

  async create(data: CreationAttributes<DependencyProfile> & {
    cohabitants?: number[];
    livingConditions?: number[];
  }, transaction?: Transaction) {
    // If no data provided, create with empty profile
    const profileData = data || {};
    const { cohabitants, livingConditions, ...otherProfileData } = profileData;
    
    const profile = await DependencyProfile.create(otherProfileData, { transaction });
    
    if (cohabitants && cohabitants.length > 0) {
      await this.setCohabitants(profile.seniorId, cohabitants, transaction);
    }
    
    if (livingConditions && livingConditions.length > 0) {
      await this.setLivingConditions(profile.seniorId, livingConditions, transaction);
    }
    
    return profile;
  }

  async update(seniorId: number, data: Partial<CreationAttributes<DependencyProfile>> & {
    cohabitants?: number[];
    livingConditions?: number[];
  }, transaction?: Transaction) {
    const dependencyProfile = await DependencyProfile.findByPk(seniorId, { transaction });
    
    if (!dependencyProfile) {
      throw new Error("Dependency profile not found");
    }

    const { cohabitants, livingConditions, ...profileData } = data;
    
    await dependencyProfile.update(profileData, { transaction });
    
    if (cohabitants !== undefined) {
      await this.setCohabitants(seniorId, cohabitants, transaction);
    }
    
    if (livingConditions !== undefined) {
      await this.setLivingConditions(seniorId, livingConditions, transaction);
    }
    
    return dependencyProfile;
  }

  async delete(seniorId: number) {
    const dependencyProfile = await DependencyProfile.findByPk(seniorId);
    
    if (!dependencyProfile) {
      throw new Error("Dependency profile not found");
    }

    await dependencyProfile.destroy();
    return { message: "Dependency profile deleted successfully" };
  }
}

export const dependencyProfileService = new DependencyProfileService();
