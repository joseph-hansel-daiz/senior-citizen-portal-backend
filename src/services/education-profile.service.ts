import { EducationProfile, HighestEducationalAttainment, SpecializationTechnicalSkill, CommunityInvolvement, SeniorHighestEducationalAttainment, SeniorSpecializationTechnicalSkill, SeniorCommunityInvolvement } from "@/models";
import type { CreationAttributes } from "sequelize";
import { Transaction } from "sequelize";

export class EducationProfileService {
  // Helper function to set highest educational attainments
  private async setHighestEducationalAttainments(seniorId: number, attainmentIds: number[], transaction?: Transaction) {
    await SeniorHighestEducationalAttainment.destroy({
      where: { seniorId },
      transaction
    });
    
    if (attainmentIds.length > 0) {
      await SeniorHighestEducationalAttainment.bulkCreate(
        attainmentIds.map(attainmentId => ({
          seniorId,
          highestEducationalAttainmentId: attainmentId
        })),
        { transaction }
      );
    }
  }

  // Helper function to set specialization technical skills
  private async setSpecializationTechnicalSkills(seniorId: number, skillIds: number[], transaction?: Transaction) {
    await SeniorSpecializationTechnicalSkill.destroy({
      where: { seniorId },
      transaction
    });
    
    if (skillIds.length > 0) {
      await SeniorSpecializationTechnicalSkill.bulkCreate(
        skillIds.map(skillId => ({
          seniorId,
          specializationTechnicalSkillId: skillId
        })),
        { transaction }
      );
    }
  }

  // Helper function to set community involvements
  private async setCommunityInvolvements(seniorId: number, involvementIds: number[], transaction?: Transaction) {
    await SeniorCommunityInvolvement.destroy({
      where: { seniorId },
      transaction
    });
    
    if (involvementIds.length > 0) {
      await SeniorCommunityInvolvement.bulkCreate(
        involvementIds.map(involvementId => ({
          seniorId,
          communityInvolvementId: involvementId
        })),
        { transaction }
      );
    }
  }

  async getBySeniorId(seniorId: number) {
    return EducationProfile.findByPk(seniorId);
  }

  async create(data: CreationAttributes<EducationProfile> & {
    highestEducationalAttainments?: number[];
    specializationTechnicalSkills?: number[];
    communityInvolvements?: number[];
  }, transaction?: Transaction) {
    // If no data provided, create with empty profile
    const profileData = data || {};
    const { highestEducationalAttainments, specializationTechnicalSkills, communityInvolvements, ...otherProfileData } = profileData;
    
    const profile = await EducationProfile.create(otherProfileData, { transaction });
    
    if (highestEducationalAttainments && highestEducationalAttainments.length > 0) {
      await this.setHighestEducationalAttainments(profile.seniorId, highestEducationalAttainments, transaction);
    }
    
    if (specializationTechnicalSkills && specializationTechnicalSkills.length > 0) {
      await this.setSpecializationTechnicalSkills(profile.seniorId, specializationTechnicalSkills, transaction);
    }
    
    if (communityInvolvements && communityInvolvements.length > 0) {
      await this.setCommunityInvolvements(profile.seniorId, communityInvolvements, transaction);
    }
    
    return profile;
  }

  async update(seniorId: number, data: Partial<CreationAttributes<EducationProfile>> & {
    highestEducationalAttainments?: number[];
    specializationTechnicalSkills?: number[];
    communityInvolvements?: number[];
  }, transaction?: Transaction) {
    const educationProfile = await EducationProfile.findByPk(seniorId, { transaction });
    
    if (!educationProfile) {
      throw new Error("Education profile not found");
    }

    const { highestEducationalAttainments, specializationTechnicalSkills, communityInvolvements, ...profileData } = data;
    
    await educationProfile.update(profileData, { transaction });
    
    if (highestEducationalAttainments !== undefined) {
      await this.setHighestEducationalAttainments(seniorId, highestEducationalAttainments, transaction);
    }
    
    if (specializationTechnicalSkills !== undefined) {
      await this.setSpecializationTechnicalSkills(seniorId, specializationTechnicalSkills, transaction);
    }
    
    if (communityInvolvements !== undefined) {
      await this.setCommunityInvolvements(seniorId, communityInvolvements, transaction);
    }
    
    return educationProfile;
  }

  async delete(seniorId: number) {
    const educationProfile = await EducationProfile.findByPk(seniorId);
    
    if (!educationProfile) {
      throw new Error("Education profile not found");
    }

    await educationProfile.destroy();
    return { message: "Education profile deleted successfully" };
  }
}

export const educationProfileService = new EducationProfileService();
