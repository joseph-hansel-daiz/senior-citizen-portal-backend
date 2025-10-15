import { DependencyProfile, Cohabitant, LivingCondition, SeniorCohabitant, SeniorLivingCondition } from "@/models";
import type { CreationAttributes } from "sequelize";

export class DependencyProfileService {
  // Helper function to set cohabitants
  private async setCohabitants(seniorId: number, cohabitantIds: number[]) {
    // Remove existing associations
    await SeniorCohabitant.destroy({
      where: { seniorId }
    });
    
    // Add new associations
    if (cohabitantIds.length > 0) {
      await SeniorCohabitant.bulkCreate(
        cohabitantIds.map(cohabitantId => ({
          seniorId,
          cohabitantId
        }))
      );
    }
  }

  // Helper function to set living conditions
  private async setLivingConditions(seniorId: number, livingConditionIds: number[]) {
    // Remove existing associations
    await SeniorLivingCondition.destroy({
      where: { seniorId }
    });
    
    // Add new associations
    if (livingConditionIds.length > 0) {
      await SeniorLivingCondition.bulkCreate(
        livingConditionIds.map(livingConditionId => ({
          seniorId,
          livingConditionId
        }))
      );
    }
  }

  async getBySeniorId(seniorId: number) {
    return DependencyProfile.findByPk(seniorId);
  }

  async create(data: CreationAttributes<DependencyProfile> & {
    cohabitants?: number[];
    livingConditions?: number[];
  }) {
    // If no data provided, create with empty profile
    const profileData = data || {};
    const { cohabitants, livingConditions, ...otherProfileData } = profileData;
    
    const profile = await DependencyProfile.create(otherProfileData);
    
    if (cohabitants && cohabitants.length > 0) {
      await this.setCohabitants(profile.seniorId, cohabitants);
    }
    
    if (livingConditions && livingConditions.length > 0) {
      await this.setLivingConditions(profile.seniorId, livingConditions);
    }
    
    return profile;
  }

  async update(seniorId: number, data: Partial<CreationAttributes<DependencyProfile>> & {
    cohabitants?: number[];
    livingConditions?: number[];
  }) {
    const dependencyProfile = await DependencyProfile.findByPk(seniorId);
    
    if (!dependencyProfile) {
      throw new Error("Dependency profile not found");
    }

    const { cohabitants, livingConditions, ...profileData } = data;
    
    await dependencyProfile.update(profileData);
    
    if (cohabitants !== undefined) {
      await this.setCohabitants(seniorId, cohabitants);
    }
    
    if (livingConditions !== undefined) {
      await this.setLivingConditions(seniorId, livingConditions);
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
