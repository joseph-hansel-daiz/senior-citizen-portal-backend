import { HealthProfile, HealthProblemAilment, DentalConcern, VisualConcern, AuralConcern, SocialEmotionalConcern, AreaOfDifficulty, SeniorHealthProblemAilment, SeniorDentalConcern, SeniorVisualConcern, SeniorAuralConcern, SeniorSocialEmotionalConcern, SeniorAreaOfDifficulty } from "@/models";
import type { CreationAttributes } from "sequelize";

export class HealthProfileService {
  // Helper function to set health problem ailments
  private async setHealthProblemAilments(seniorId: number, ailmentIds: number[]) {
    await SeniorHealthProblemAilment.destroy({
      where: { seniorId }
    });
    
    if (ailmentIds.length > 0) {
      await SeniorHealthProblemAilment.bulkCreate(
        ailmentIds.map(ailmentId => ({
          seniorId,
          healthProblemAilmentId: ailmentId
        }))
      );
    }
  }

  // Helper function to set dental concerns
  private async setDentalConcerns(seniorId: number, concernIds: number[]) {
    await SeniorDentalConcern.destroy({
      where: { seniorId }
    });
    
    if (concernIds.length > 0) {
      await SeniorDentalConcern.bulkCreate(
        concernIds.map(concernId => ({
          seniorId,
          dentalConcernId: concernId
        }))
      );
    }
  }

  // Helper function to set visual concerns
  private async setVisualConcerns(seniorId: number, concernIds: number[]) {
    await SeniorVisualConcern.destroy({
      where: { seniorId }
    });
    
    if (concernIds.length > 0) {
      await SeniorVisualConcern.bulkCreate(
        concernIds.map(concernId => ({
          seniorId,
          visualConcernId: concernId
        }))
      );
    }
  }

  // Helper function to set aural concerns
  private async setAuralConcerns(seniorId: number, concernIds: number[]) {
    await SeniorAuralConcern.destroy({
      where: { seniorId }
    });
    
    if (concernIds.length > 0) {
      await SeniorAuralConcern.bulkCreate(
        concernIds.map(concernId => ({
          seniorId,
          auralConcernId: concernId
        }))
      );
    }
  }

  // Helper function to set social emotional concerns
  private async setSocialEmotionalConcerns(seniorId: number, concernIds: number[]) {
    await SeniorSocialEmotionalConcern.destroy({
      where: { seniorId }
    });
    
    if (concernIds.length > 0) {
      await SeniorSocialEmotionalConcern.bulkCreate(
        concernIds.map(concernId => ({
          seniorId,
          socialEmotionalConcernId: concernId
        }))
      );
    }
  }

  // Helper function to set areas of difficulty
  private async setAreasOfDifficulty(seniorId: number, difficultyIds: number[]) {
    await SeniorAreaOfDifficulty.destroy({
      where: { seniorId }
    });
    
    if (difficultyIds.length > 0) {
      await SeniorAreaOfDifficulty.bulkCreate(
        difficultyIds.map(difficultyId => ({
          seniorId,
          areaOfDifficultyId: difficultyId
        }))
      );
    }
  }

  async getBySeniorId(seniorId: number) {
    return HealthProfile.findByPk(seniorId);
  }

  async create(data: CreationAttributes<HealthProfile> & {
    healthProblemAilments?: number[];
    dentalConcerns?: number[];
    visualConcerns?: number[];
    auralConcerns?: number[];
    socialEmotionalConcerns?: number[];
    areasOfDifficulty?: number[];
  }) {
    // If no data provided, create with default values
    const profileData = data || {};
    
    // Set default values if not provided
    const defaultData = {
      ...profileData,
      bloodType: profileData.bloodType || 'O+' as const,
      checkUp: profileData.checkUp !== undefined ? profileData.checkUp : false,
      scheduleCheckUp: profileData.scheduleCheckUp || 'Annually' as const,
    };

    if (!defaultData.bloodType || defaultData.checkUp === undefined || !defaultData.scheduleCheckUp) {
      throw new Error("Required fields: bloodType, checkUp, scheduleCheckUp");
    }

    const { 
      healthProblemAilments, 
      dentalConcerns, 
      visualConcerns, 
      auralConcerns, 
      socialEmotionalConcerns, 
      areasOfDifficulty, 
      ...otherProfileData 
    } = defaultData;
    
    const profile = await HealthProfile.create(otherProfileData);
    
    if (healthProblemAilments && healthProblemAilments.length > 0) {
      await this.setHealthProblemAilments(profile.seniorId, healthProblemAilments);
    }
    
    if (dentalConcerns && dentalConcerns.length > 0) {
      await this.setDentalConcerns(profile.seniorId, dentalConcerns);
    }
    
    if (visualConcerns && visualConcerns.length > 0) {
      await this.setVisualConcerns(profile.seniorId, visualConcerns);
    }
    
    if (auralConcerns && auralConcerns.length > 0) {
      await this.setAuralConcerns(profile.seniorId, auralConcerns);
    }
    
    if (socialEmotionalConcerns && socialEmotionalConcerns.length > 0) {
      await this.setSocialEmotionalConcerns(profile.seniorId, socialEmotionalConcerns);
    }
    
    if (areasOfDifficulty && areasOfDifficulty.length > 0) {
      await this.setAreasOfDifficulty(profile.seniorId, areasOfDifficulty);
    }
    
    return profile;
  }

  async update(seniorId: number, data: Partial<CreationAttributes<HealthProfile>> & {
    healthProblemAilments?: number[];
    dentalConcerns?: number[];
    visualConcerns?: number[];
    auralConcerns?: number[];
    socialEmotionalConcerns?: number[];
    areasOfDifficulty?: number[];
  }) {
    const healthProfile = await HealthProfile.findByPk(seniorId);
    
    if (!healthProfile) {
      throw new Error("Health profile not found");
    }

    const { 
      healthProblemAilments, 
      dentalConcerns, 
      visualConcerns, 
      auralConcerns, 
      socialEmotionalConcerns, 
      areasOfDifficulty, 
      ...profileData 
    } = data;
    
    await healthProfile.update(profileData);
    
    if (healthProblemAilments !== undefined) {
      await this.setHealthProblemAilments(seniorId, healthProblemAilments);
    }
    
    if (dentalConcerns !== undefined) {
      await this.setDentalConcerns(seniorId, dentalConcerns);
    }
    
    if (visualConcerns !== undefined) {
      await this.setVisualConcerns(seniorId, visualConcerns);
    }
    
    if (auralConcerns !== undefined) {
      await this.setAuralConcerns(seniorId, auralConcerns);
    }
    
    if (socialEmotionalConcerns !== undefined) {
      await this.setSocialEmotionalConcerns(seniorId, socialEmotionalConcerns);
    }
    
    if (areasOfDifficulty !== undefined) {
      await this.setAreasOfDifficulty(seniorId, areasOfDifficulty);
    }
    
    return healthProfile;
  }

  async delete(seniorId: number) {
    const healthProfile = await HealthProfile.findByPk(seniorId);
    
    if (!healthProfile) {
      throw new Error("Health profile not found");
    }

    await healthProfile.destroy();
    return { message: "Health profile deleted successfully" };
  }
}

export const healthProfileService = new HealthProfileService();
