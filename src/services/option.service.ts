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
import Vaccine from "@/models/options/vaccine.model";

export class OptionService {
  private readonly keyToModel: Record<string, any> = {
    "cohabitants": Cohabitant,
    "living-conditions": LivingCondition,
    "educational-attainments": HighestEducationalAttainment,
    "technical-skills": SpecializationTechnicalSkill,
    "community-involvements": CommunityInvolvement,
    "income-sources": IncomeAssistanceSource,
    "monthly-incomes": MonthlyIncome,
    "real-properties": RealImmovableProperty,
    "personal-properties": PersonalMovableProperty,
    "problems-needs": ProblemsNeedsCommonlyEncountered,
    "health-problems": HealthProblemAilment,
    "dental-concerns": DentalConcern,
    "visual-concerns": VisualConcern,
    "aural-concerns": AuralConcern,
    "social-emotional-concerns": SocialEmotionalConcern,
    "area-of-difficulties": AreaOfDifficulty,
    "barangays": Barangay,
    "help-desk-record-categories": HelpDeskRecordCategory,
    "vaccines": Vaccine,
  };

  private getModelByKey(key: string) {
    const model = this.keyToModel[key];
    if (!model) {
      throw new Error(`Unknown option type: ${key}`);
    }
    return model;
  }
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

  async getVaccines() {
    return this.getList(Vaccine);
  }

  async createOption(key: string, name: string) {
    const Model = this.getModelByKey(key);
    try {
      const created = await Model.create({ name });
      return created;
    } catch (err) {
      throw new Error(`Failed to create option: ${err}`);
    }
  }

  async updateOption(key: string, id: number, name: string) {
    const Model = this.getModelByKey(key);
    try {
      const record = await Model.findByPk(id);
      if (!record) {
        throw new Error("Not found");
      }
      record.name = name;
      await record.save();
      return record;
    } catch (err) {
      throw new Error(`Failed to update option: ${err}`);
    }
  }

  async deleteOption(key: string, id: number) {
    const Model = this.getModelByKey(key);
    try {
      const deleted = await Model.destroy({ where: { id } });
      return deleted; // number of rows deleted
    } catch (err) {
      throw new Error(`Failed to delete option: ${err}`);
    }
  }
}

export const optionService = new OptionService();
