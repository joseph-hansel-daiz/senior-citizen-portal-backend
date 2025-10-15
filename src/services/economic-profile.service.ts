import { EconomicProfile, IncomeAssistanceSource, RealImmovableProperty, PersonalMovableProperty, MonthlyIncome, ProblemsNeedsCommonlyEncountered, SeniorIncomeAssistanceSource, SeniorRealImmovableProperty, SeniorPersonalMovableProperty, SeniorMonthlyIncome, SeniorProblemsNeedsCommonlyEncountered } from "@/models";
import type { CreationAttributes } from "sequelize";

export class EconomicProfileService {
  // Helper function to set income assistance sources
  private async setIncomeAssistanceSources(seniorId: number, sourceIds: number[]) {
    await SeniorIncomeAssistanceSource.destroy({
      where: { seniorId }
    });
    
    if (sourceIds.length > 0) {
      await SeniorIncomeAssistanceSource.bulkCreate(
        sourceIds.map(sourceId => ({
          seniorId,
          incomeAssistanceSourceId: sourceId
        }))
      );
    }
  }

  // Helper function to set real immovable properties
  private async setRealImmovableProperties(seniorId: number, propertyIds: number[]) {
    await SeniorRealImmovableProperty.destroy({
      where: { seniorId }
    });
    
    if (propertyIds.length > 0) {
      await SeniorRealImmovableProperty.bulkCreate(
        propertyIds.map(propertyId => ({
          seniorId,
          realImmovablePropertyId: propertyId
        }))
      );
    }
  }

  // Helper function to set personal movable properties
  private async setPersonalMovableProperties(seniorId: number, propertyIds: number[]) {
    await SeniorPersonalMovableProperty.destroy({
      where: { seniorId }
    });
    
    if (propertyIds.length > 0) {
      await SeniorPersonalMovableProperty.bulkCreate(
        propertyIds.map(propertyId => ({
          seniorId,
          personalMovablePropertieId: propertyId
        }))
      );
    }
  }

  // Helper function to set monthly incomes
  private async setMonthlyIncomes(seniorId: number, incomeIds: number[]) {
    await SeniorMonthlyIncome.destroy({
      where: { seniorId }
    });
    
    if (incomeIds.length > 0) {
      await SeniorMonthlyIncome.bulkCreate(
        incomeIds.map(incomeId => ({
          seniorId,
          monthlyIncomeId: incomeId
        }))
      );
    }
  }

  // Helper function to set problems needs commonly encountered
  private async setProblemsNeedsCommonlyEncountered(seniorId: number, problemIds: number[]) {
    await SeniorProblemsNeedsCommonlyEncountered.destroy({
      where: { seniorId }
    });
    
    if (problemIds.length > 0) {
      await SeniorProblemsNeedsCommonlyEncountered.bulkCreate(
        problemIds.map(problemId => ({
          seniorId,
          problemsNeedsCommonlyEncounteredId: problemId
        }))
      );
    }
  }

  async getBySeniorId(seniorId: number) {
    return EconomicProfile.findByPk(seniorId);
  }

  async create(data: CreationAttributes<EconomicProfile> & {
    incomeAssistanceSources?: number[];
    realImmovableProperties?: number[];
    personalMovableProperties?: number[];
    monthlyIncomes?: number[];
    problemsNeedsCommonlyEncountered?: number[];
  }) {
    // If no data provided, create with empty profile
    const profileData = data || {};
    const { 
      incomeAssistanceSources, 
      realImmovableProperties, 
      personalMovableProperties, 
      monthlyIncomes, 
      problemsNeedsCommonlyEncountered, 
      ...otherProfileData 
    } = profileData;
    
    const profile = await EconomicProfile.create(otherProfileData);
    
    if (incomeAssistanceSources && incomeAssistanceSources.length > 0) {
      await this.setIncomeAssistanceSources(profile.seniorId, incomeAssistanceSources);
    }
    
    if (realImmovableProperties && realImmovableProperties.length > 0) {
      await this.setRealImmovableProperties(profile.seniorId, realImmovableProperties);
    }
    
    if (personalMovableProperties && personalMovableProperties.length > 0) {
      await this.setPersonalMovableProperties(profile.seniorId, personalMovableProperties);
    }
    
    if (monthlyIncomes && monthlyIncomes.length > 0) {
      await this.setMonthlyIncomes(profile.seniorId, monthlyIncomes);
    }
    
    if (problemsNeedsCommonlyEncountered && problemsNeedsCommonlyEncountered.length > 0) {
      await this.setProblemsNeedsCommonlyEncountered(profile.seniorId, problemsNeedsCommonlyEncountered);
    }
    
    return profile;
  }

  async update(seniorId: number, data: Partial<CreationAttributes<EconomicProfile>> & {
    incomeAssistanceSources?: number[];
    realImmovableProperties?: number[];
    personalMovableProperties?: number[];
    monthlyIncomes?: number[];
    problemsNeedsCommonlyEncountered?: number[];
  }) {
    const economicProfile = await EconomicProfile.findByPk(seniorId);
    
    if (!economicProfile) {
      throw new Error("Economic profile not found");
    }

    const { 
      incomeAssistanceSources, 
      realImmovableProperties, 
      personalMovableProperties, 
      monthlyIncomes, 
      problemsNeedsCommonlyEncountered, 
      ...profileData 
    } = data;
    
    await economicProfile.update(profileData);
    
    if (incomeAssistanceSources !== undefined) {
      await this.setIncomeAssistanceSources(seniorId, incomeAssistanceSources);
    }
    
    if (realImmovableProperties !== undefined) {
      await this.setRealImmovableProperties(seniorId, realImmovableProperties);
    }
    
    if (personalMovableProperties !== undefined) {
      await this.setPersonalMovableProperties(seniorId, personalMovableProperties);
    }
    
    if (monthlyIncomes !== undefined) {
      await this.setMonthlyIncomes(seniorId, monthlyIncomes);
    }
    
    if (problemsNeedsCommonlyEncountered !== undefined) {
      await this.setProblemsNeedsCommonlyEncountered(seniorId, problemsNeedsCommonlyEncountered);
    }
    
    return economicProfile;
  }

  async delete(seniorId: number) {
    const economicProfile = await EconomicProfile.findByPk(seniorId);
    
    if (!economicProfile) {
      throw new Error("Economic profile not found");
    }

    await economicProfile.destroy();
    return { message: "Economic profile deleted successfully" };
  }
}

export const economicProfileService = new EconomicProfileService();
