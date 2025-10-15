import { EducationProfile, HighestEducationalAttainment, SpecializationTechnicalSkill, CommunityInvolvement, SeniorHighestEducationalAttainment, SeniorSpecializationTechnicalSkill, SeniorCommunityInvolvement } from "@/models";
import type { CreationAttributes } from "sequelize";

export class EducationProfileService {
  // Helper function to set highest educational attainments
  private async setHighestEducationalAttainments(seniorId: number, attainmentIds: number[]) {
    await SeniorHighestEducationalAttainment.destroy({
      where: { seniorId }
    });
    
    if (attainmentIds.length > 0) {
      await SeniorHighestEducationalAttainment.bulkCreate(
        attainmentIds.map(attainmentId => ({
          seniorId,
          highestEducationalAttainmentId: attainmentId
        }))
      );
    }
  }

  // Helper function to set specialization technical skills
  private async setSpecializationTechnicalSkills(seniorId: number, skillIds: number[]) {
    await SeniorSpecializationTechnicalSkill.destroy({
      where: { seniorId }
    });
    
    if (skillIds.length > 0) {
      await SeniorSpecializationTechnicalSkill.bulkCreate(
        skillIds.map(skillId => ({
          seniorId,
          specializationTechnicalSkillId: skillId
        }))
      );
    }
  }

  // Helper function to set community involvements
  private async setCommunityInvolvements(seniorId: number, involvementIds: number[]) {
    await SeniorCommunityInvolvement.destroy({
      where: { seniorId }
    });
    
    if (involvementIds.length > 0) {
      await SeniorCommunityInvolvement.bulkCreate(
        involvementIds.map(involvementId => ({
          seniorId,
          communityInvolvementId: involvementId
        }))
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
  }) {
    // If no data provided, create with empty profile
    const profileData = data || {};
    const { highestEducationalAttainments, specializationTechnicalSkills, communityInvolvements, ...otherProfileData } = profileData;
    
    const profile = await EducationProfile.create(otherProfileData);
    
    if (highestEducationalAttainments && highestEducationalAttainments.length > 0) {
      await this.setHighestEducationalAttainments(profile.seniorId, highestEducationalAttainments);
    }
    
    if (specializationTechnicalSkills && specializationTechnicalSkills.length > 0) {
      await this.setSpecializationTechnicalSkills(profile.seniorId, specializationTechnicalSkills);
    }
    
    if (communityInvolvements && communityInvolvements.length > 0) {
      await this.setCommunityInvolvements(profile.seniorId, communityInvolvements);
    }
    
    return profile;
  }

  async update(seniorId: number, data: Partial<CreationAttributes<EducationProfile>> & {
    highestEducationalAttainments?: number[];
    specializationTechnicalSkills?: number[];
    communityInvolvements?: number[];
  }) {
    const educationProfile = await EducationProfile.findByPk(seniorId);
    
    if (!educationProfile) {
      throw new Error("Education profile not found");
    }

    const { highestEducationalAttainments, specializationTechnicalSkills, communityInvolvements, ...profileData } = data;
    
    await educationProfile.update(profileData);
    
    if (highestEducationalAttainments !== undefined) {
      await this.setHighestEducationalAttainments(seniorId, highestEducationalAttainments);
    }
    
    if (specializationTechnicalSkills !== undefined) {
      await this.setSpecializationTechnicalSkills(seniorId, specializationTechnicalSkills);
    }
    
    if (communityInvolvements !== undefined) {
      await this.setCommunityInvolvements(seniorId, communityInvolvements);
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
