import {
  Cohabitant,
  LivingCondition,
  HighestEducationalAttainment,
  SpecializationTechnicalSkill,
  CommunityInvolvement,
  IncomeAssistanceSource,
  MonthlyIncome,
  RealImmovableProperty,
  PersonalMovableProperty,
  ProblemsNeedsCommonlyEncountered,
  HealthProblemAilment,
  DentalConcern,
  VisualConcern,
  AuralConcern,
  SocialEmotionalConcern,
  AreaOfDifficulty,
  Barangay,
  HelpDeskRecordCategory,
} from "@/models";

export class OptionService {
  private async getList(model: any) {
    try {
      return await model.findAll();
    } catch (err) {
      throw new Error(`Failed to fetch options: ${err}`);
    }
  }

  async getCohabitants() {
    return this.getList(Cohabitant);
  }

  async getLivingConditions() {
    return this.getList(LivingCondition);
  }

  async getHighestEducationalAttainments() {
    return this.getList(HighestEducationalAttainment);
  }

  async getSpecializationTechnicalSkills() {
    return this.getList(SpecializationTechnicalSkill);
  }

  async getCommunityInvolvements() {
    return this.getList(CommunityInvolvement);
  }

  async getIncomeAssistanceSources() {
    return this.getList(IncomeAssistanceSource);
  }

  async getMonthlyIncomes() {
    return this.getList(MonthlyIncome);
  }

  async getRealImmovableProperties() {
    return this.getList(RealImmovableProperty);
  }

  async getPersonalMovableProperties() {
    return this.getList(PersonalMovableProperty);
  }

  async getProblemsNeedsCommonlyEncountered() {
    return this.getList(ProblemsNeedsCommonlyEncountered);
  }

  async getHealthProblemAilments() {
    return this.getList(HealthProblemAilment);
  }

  async getDentalConcerns() {
    return this.getList(DentalConcern);
  }

  async getVisualConcerns() {
    return this.getList(VisualConcern);
  }

  async getAuralConcerns() {
    return this.getList(AuralConcern);
  }

  async getSocialEmotionalConcerns() {
    return this.getList(SocialEmotionalConcern);
  }

  async getAreaOfDifficulties() {
    return this.getList(AreaOfDifficulty);
  }

  async getBarangays() {
    return this.getList(Barangay);
  }

  async getHelpDeskRecordCategories() {
    return this.getList(HelpDeskRecordCategory);
  }
}

export const optionService = new OptionService();
