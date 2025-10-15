import sequelize from "@/config/db";
import Barangay from "./barangay.model";

import AreaOfDifficulty from "./options/areaOfDifficulty.model";
import AuralConcern from "./options/auralConcern.model";
import Cohabitant from "./options/cohabitant.model";
import CommunityInvolvement from "./options/communityInvolvement.model";
import DentalConcern from "./options/dentalConcern.model";
import HealthProblemAilment from "./options/healthProblemAilment.model";
import HighestEducationalAttainment from "./options/highestEducationalAttainment.model";
import IncomeAssistanceSource from "./options/incomeAssistanceSource.model";
import LivingCondition from "./options/livingCondition.model";
import MonthlyIncome from "./options/monthlyIncome.model";
import PersonalMovableProperty from "./options/personalMovableProperty.model";
import ProblemsNeedsCommonlyEncountered from "./options/problemsNeedsCommonlyEncountered.model";
import RealImmovableProperty from "./options/realImmovableProperty.model";
import SocialEmotionalConcern from "./options/socialEmotionalConcern.model";
import SpecializationTechnicalSkill from "./options/specializationTechnicalSkill.model";
import VisualConcern from "./options/visualConcern.model";
import Senior from "./senior.model";
import SeniorAreaOfDifficulty from "./seniorOptions/seniorAreaOfDifficulty.model";
import SeniorAuralConcern from "./seniorOptions/seniorAuralConcern.model";
import SeniorCohabitant from "./seniorOptions/seniorCohabitant.model";
import SeniorCommunityInvolvement from "./seniorOptions/seniorCommunityInvolvement.model";
import SeniorDentalConcern from "./seniorOptions/seniorDentalConcern.model";
import SeniorHealthProblemAilment from "./seniorOptions/seniorHealthProblemAilment.model";
import SeniorHighestEducationalAttainment from "./seniorOptions/seniorHighestEducationalAttainment.model";
import SeniorIncomeAssistanceSource from "./seniorOptions/seniorIncomeAssistanceSource.model";
import SeniorLivingCondition from "./seniorOptions/seniorLivingCondition.model";
import SeniorMonthlyIncome from "./seniorOptions/seniorMonthlyIncome.model";
import SeniorPersonalMovableProperty from "./seniorOptions/seniorPersonalMovableProperty.model";
import SeniorProblemsNeedsCommonlyEncountered from "./seniorOptions/seniorProblemsNeedsCommonlyEncountered.model";
import SeniorRealImmovableProperty from "./seniorOptions/seniorRealImmovableProperty.model";
import SeniorSocialEmotionalConcern from "./seniorOptions/seniorSocialEmotionalConcern.model";
import SeniorSpecializationTechnicalSkill from "./seniorOptions/seniorSpecializationTechnicalSkill.model";
import SeniorVisualConcern from "./seniorOptions/seniorVisualConcern.model";
import User from "./user.model";

// Associations
Barangay.hasMany(User, { foreignKey: "barangayId", as: "users" });
User.belongsTo(Barangay, { foreignKey: "barangayId", as: "barangay" });

Senior.belongsTo(Barangay, { foreignKey: "barangayId" });
Senior.belongsTo(User, { foreignKey: "createdBy", as: "creator" });
Senior.belongsTo(User, { foreignKey: "updatedBy", as: "updater" });
Senior.belongsTo(User, { foreignKey: "deletedBy", as: "deleter" });

Senior.belongsToMany(Cohabitant, {
  through: SeniorCohabitant,
  foreignKey: "seniorId",
  otherKey: "cohabitantId",
});
Cohabitant.belongsToMany(Senior, {
  through: SeniorCohabitant,
  foreignKey: "cohabitantId",
  otherKey: "seniorId",
});

Senior.belongsToMany(AreaOfDifficulty, {
  through: SeniorAreaOfDifficulty,
  foreignKey: "seniorId",
  otherKey: "areaOfDifficultyId",
});
AreaOfDifficulty.belongsToMany(Senior, {
  through: SeniorAreaOfDifficulty,
  foreignKey: "areaOfDifficultyId",
  otherKey: "seniorId",
});

Senior.belongsToMany(CommunityInvolvement, {
  through: SeniorCommunityInvolvement,
  foreignKey: "seniorId",
  otherKey: "communityInvolvementId",
});
CommunityInvolvement.belongsToMany(Senior, {
  through: SeniorCommunityInvolvement,
  foreignKey: "communityInvolvementId",
  otherKey: "seniorId",
});

Senior.belongsToMany(HighestEducationalAttainment, {
  through: SeniorHighestEducationalAttainment,
  foreignKey: "seniorId",
  otherKey: "highestEducationalAttainmentId",
});
HighestEducationalAttainment.belongsToMany(Senior, {
  through: SeniorHighestEducationalAttainment,
  foreignKey: "highestEducationalAttainmentId",
  otherKey: "seniorId",
});

Senior.belongsToMany(MonthlyIncome, {
  through: SeniorMonthlyIncome,
  foreignKey: "seniorId",
  otherKey: "monthlyIncomeId",
});
MonthlyIncome.belongsToMany(Senior, {
  through: SeniorMonthlyIncome,
  foreignKey: "monthlyIncomeId",
  otherKey: "seniorId",
});

Senior.belongsToMany(RealImmovableProperty, {
  through: SeniorRealImmovableProperty,
  foreignKey: "seniorId",
  otherKey: "realImmovablePropertyId",
});
RealImmovableProperty.belongsToMany(Senior, {
  through: SeniorRealImmovableProperty,
  foreignKey: "realImmovablePropertyId",
  otherKey: "seniorId",
});

Senior.belongsToMany(VisualConcern, {
  through: SeniorVisualConcern,
  foreignKey: "seniorId",
  otherKey: "visualConcernId",
});
VisualConcern.belongsToMany(Senior, {
  through: SeniorVisualConcern,
  foreignKey: "visualConcernId",
  otherKey: "seniorId",
});

Senior.belongsToMany(AuralConcern, {
  through: SeniorAuralConcern,
  foreignKey: "seniorId",
  otherKey: "auralConcernId",
});
AuralConcern.belongsToMany(Senior, {
  through: SeniorAuralConcern,
  foreignKey: "auralConcernId",
  otherKey: "seniorId",
});

Senior.belongsToMany(DentalConcern, {
  through: SeniorDentalConcern,
  foreignKey: "seniorId",
  otherKey: "dentalConcernId",
});
DentalConcern.belongsToMany(Senior, {
  through: SeniorDentalConcern,
  foreignKey: "dentalConcernId",
  otherKey: "seniorId",
});

Senior.belongsToMany(IncomeAssistanceSource, {
  through: SeniorIncomeAssistanceSource,
  foreignKey: "seniorId",
  otherKey: "incomeAssistanceSourceId",
});
IncomeAssistanceSource.belongsToMany(Senior, {
  through: SeniorIncomeAssistanceSource,
  foreignKey: "incomeAssistanceSourceId",
  otherKey: "seniorId",
});

Senior.belongsToMany(PersonalMovableProperty, {
  through: SeniorPersonalMovableProperty,
  foreignKey: "seniorId",
  otherKey: "personalMovablePropertyId",
});
PersonalMovableProperty.belongsToMany(Senior, {
  through: SeniorPersonalMovableProperty,
  foreignKey: "personalMovablePropertyId",
  otherKey: "seniorId",
});

Senior.belongsToMany(SocialEmotionalConcern, {
  through: SeniorSocialEmotionalConcern,
  foreignKey: "seniorId",
  otherKey: "socialEmotionalConcernId",
});
SocialEmotionalConcern.belongsToMany(Senior, {
  through: SeniorSocialEmotionalConcern,
  foreignKey: "socialEmotionalConcernId",
  otherKey: "seniorId",
});

Senior.belongsToMany(HealthProblemAilment, {
  through: SeniorHealthProblemAilment,
  foreignKey: "seniorId",
  otherKey: "healthProblemAilmentId",
});
HealthProblemAilment.belongsToMany(Senior, {
  through: SeniorHealthProblemAilment,
  foreignKey: "healthProblemAilmentId",
  otherKey: "seniorId",
});

Senior.belongsToMany(LivingCondition, {
  through: SeniorLivingCondition,
  foreignKey: "seniorId",
  otherKey: "livingConditionId",
});
LivingCondition.belongsToMany(Senior, {
  through: SeniorLivingCondition,
  foreignKey: "livingConditionId",
  otherKey: "seniorId",
});

Senior.belongsToMany(ProblemsNeedsCommonlyEncountered, {
  through: SeniorProblemsNeedsCommonlyEncountered,
  foreignKey: "seniorId",
  otherKey: "problemsNeedsCommonlyEncounteredId",
});
ProblemsNeedsCommonlyEncountered.belongsToMany(Senior, {
  through: SeniorProblemsNeedsCommonlyEncountered,
  foreignKey: "problemsNeedsCommonlyEncounteredId",
  otherKey: "seniorId",
});

Senior.belongsToMany(SpecializationTechnicalSkill, {
  through: SeniorSpecializationTechnicalSkill,
  foreignKey: "seniorId",
  otherKey: "specializationTechnicalSkillId",
});
SpecializationTechnicalSkill.belongsToMany(Senior, {
  through: SeniorSpecializationTechnicalSkill,
  foreignKey: "specializationTechnicalSkillId",
  otherKey: "seniorId",
});

export {
  AreaOfDifficulty,
  AuralConcern,
  Barangay,
  Cohabitant,
  CommunityInvolvement,
  DentalConcern,
  HealthProblemAilment,
  HighestEducationalAttainment,
  IncomeAssistanceSource,
  LivingCondition,
  MonthlyIncome,
  PersonalMovableProperty,
  ProblemsNeedsCommonlyEncountered,
  RealImmovableProperty,
  SeniorAreaOfDifficulty,
  SeniorAuralConcern,
  SeniorCohabitant,
  SeniorCommunityInvolvement,
  SeniorDentalConcern,
  SeniorHealthProblemAilment,
  SeniorHighestEducationalAttainment,
  SeniorIncomeAssistanceSource,
  SeniorLivingCondition,
  SeniorMonthlyIncome,
  SeniorPersonalMovableProperty,
  SeniorProblemsNeedsCommonlyEncountered,
  SeniorRealImmovableProperty,
  SeniorSocialEmotionalConcern,
  SeniorSpecializationTechnicalSkill,
  SeniorVisualConcern,
  sequelize,
  SocialEmotionalConcern,
  SpecializationTechnicalSkill,
  User,
  VisualConcern,
};
