import { EconomicProfile, IncomeAssistanceSource, RealImmovableProperty, PersonalMovableProperty, MonthlyIncome, ProblemsNeedsCommonlyEncountered, SeniorIncomeAssistanceSource, SeniorRealImmovableProperty, SeniorPersonalMovableProperty, SeniorMonthlyIncome, SeniorProblemsNeedsCommonlyEncountered } from "@/models";
import type { CreationAttributes } from "sequelize";
import { Transaction } from "sequelize";

export class EconomicProfileService {
  // Helper function to set income assistance sources
  private async setIncomeAssistanceSources(seniorId: number, sourceIds: number[], transaction?: Transaction) {
    await SeniorIncomeAssistanceSource.destroy({
      where: { seniorId },
      transaction
    });
    
    if (sourceIds.length > 0) {
      await SeniorIncomeAssistanceSource.bulkCreate(
        sourceIds.map(sourceId => ({
          seniorId,
          incomeAssistanceSourceId: sourceId
        })),
        { transaction }
      );
    }
  }

  // Helper function to set real immovable properties
  private async setRealImmovableProperties(seniorId: number, propertyIds: number[], transaction?: Transaction) {
    await SeniorRealImmovableProperty.destroy({
      where: { seniorId },
      transaction
    });
    
    if (propertyIds.length > 0) {
      await SeniorRealImmovableProperty.bulkCreate(
        propertyIds.map(propertyId => ({
          seniorId,
          realImmovablePropertyId: propertyId
        })),
        { transaction }
      );
    }
  }

  // Helper function to set personal movable properties
  private async setPersonalMovableProperties(seniorId: number, propertyIds: number[], transaction?: Transaction) {
    await SeniorPersonalMovableProperty.destroy({
      where: { seniorId },
      transaction
    });
    
    if (propertyIds.length > 0) {
      await SeniorPersonalMovableProperty.bulkCreate(
        propertyIds.map(propertyId => ({
          seniorId,
          personalMovablePropertieId: propertyId
        })),
        { transaction }
      );
    }
  }

  // Helper function to set monthly incomes
  private async setMonthlyIncomes(seniorId: number, incomeIds: number[], transaction?: Transaction) {
    await SeniorMonthlyIncome.destroy({
      where: { seniorId },
      transaction
    });
    
    if (incomeIds.length > 0) {
      await SeniorMonthlyIncome.bulkCreate(
        incomeIds.map(incomeId => ({
          seniorId,
          monthlyIncomeId: incomeId
        })),
        { transaction }
      );
    }
  }

  // Helper function to set problems needs commonly encountered
  private async setProblemsNeedsCommonlyEncountered(seniorId: number, problemIds: number[], transaction?: Transaction) {
    await SeniorProblemsNeedsCommonlyEncountered.destroy({
      where: { seniorId },
      transaction
    });
    
    if (problemIds.length > 0) {
      await SeniorProblemsNeedsCommonlyEncountered.bulkCreate(
        problemIds.map(problemId => ({
          seniorId,
          problemsNeedsCommonlyEncounteredId: problemId
        })),
        { transaction }
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
  }, transaction?: Transaction) {
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
    
    const profile = await EconomicProfile.create(otherProfileData, { transaction });
    
    if (incomeAssistanceSources && incomeAssistanceSources.length > 0) {
      await this.setIncomeAssistanceSources(profile.seniorId, incomeAssistanceSources, transaction);
    }
    
    if (realImmovableProperties && realImmovableProperties.length > 0) {
      await this.setRealImmovableProperties(profile.seniorId, realImmovableProperties, transaction);
    }
    
    if (personalMovableProperties && personalMovableProperties.length > 0) {
      await this.setPersonalMovableProperties(profile.seniorId, personalMovableProperties, transaction);
    }
    
    if (monthlyIncomes && monthlyIncomes.length > 0) {
      await this.setMonthlyIncomes(profile.seniorId, monthlyIncomes, transaction);
    }
    
    if (problemsNeedsCommonlyEncountered && problemsNeedsCommonlyEncountered.length > 0) {
      await this.setProblemsNeedsCommonlyEncountered(profile.seniorId, problemsNeedsCommonlyEncountered, transaction);
    }
    
    return profile;
  }

  async update(seniorId: number, data: Partial<CreationAttributes<EconomicProfile>> & {
    incomeAssistanceSources?: number[];
    realImmovableProperties?: number[];
    personalMovableProperties?: number[];
    monthlyIncomes?: number[];
    problemsNeedsCommonlyEncountered?: number[];
  }, transaction?: Transaction) {
    const economicProfile = await EconomicProfile.findByPk(seniorId, { transaction });
    
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
    
    await economicProfile.update(profileData, { transaction });
    
    if (incomeAssistanceSources !== undefined) {
      await this.setIncomeAssistanceSources(seniorId, incomeAssistanceSources, transaction);
    }
    
    if (realImmovableProperties !== undefined) {
      await this.setRealImmovableProperties(seniorId, realImmovableProperties, transaction);
    }
    
    if (personalMovableProperties !== undefined) {
      await this.setPersonalMovableProperties(seniorId, personalMovableProperties, transaction);
    }
    
    if (monthlyIncomes !== undefined) {
      await this.setMonthlyIncomes(seniorId, monthlyIncomes, transaction);
    }
    
    if (problemsNeedsCommonlyEncountered !== undefined) {
      await this.setProblemsNeedsCommonlyEncountered(seniorId, problemsNeedsCommonlyEncountered, transaction);
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
