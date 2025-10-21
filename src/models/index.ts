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

import DeathInfo from "./death-info.model";
import DependencyProfile from "./dependency-profile.model";
import EconomicProfile from "./economic-profile.model";
import EducationProfile from "./education-profile.model";
import FamilyComposition from "./family-composition.model";
import HealthProfile from "./health-profile.model";
import IdentifyingInformation from "./identifying-information.model";
import SeniorStatusHistory from "./senior-status-history.model";
import HelpDeskRecord from "./help-desk-record.model";
import HelpDeskRecordCategory from "./help-desk-record-category.model";

import Children from "./children.model";
import Dependent from "./dependent.model";

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
import Vaccine from "./options/vaccine.model";
import SeniorVaccine from "./seniorOptions/seniorVaccine.model";

// Basic Associations
Barangay.hasMany(User, { foreignKey: "barangayId" });
User.belongsTo(Barangay, { foreignKey: "barangayId" });

Senior.belongsTo(Barangay, { foreignKey: "barangayId" });
Senior.belongsTo(User, { foreignKey: "createdBy", as: "creator" });
Senior.belongsTo(User, { foreignKey: "updatedBy", as: "updater" });
Senior.belongsTo(User, { foreignKey: "deletedBy", as: "deleter" });

// Senior Profile Associations
Senior.hasOne(IdentifyingInformation, { foreignKey: "seniorId" });
Senior.hasOne(FamilyComposition, { foreignKey: "seniorId" });
Senior.hasOne(DependencyProfile, { foreignKey: "seniorId" });
Senior.hasOne(EducationProfile, { foreignKey: "seniorId" });
Senior.hasOne(EconomicProfile, { foreignKey: "seniorId" });
Senior.hasOne(HealthProfile, { foreignKey: "seniorId" });
Senior.hasOne(DeathInfo, { foreignKey: "seniorId" });
Senior.hasMany(SeniorStatusHistory, { foreignKey: "seniorId" });
Senior.hasMany(HelpDeskRecord, { foreignKey: "seniorId" });

// Family Composition Associations
Senior.hasMany(Children, { foreignKey: "seniorId" });
Senior.hasMany(Dependent, { foreignKey: "seniorId" });

// Help Desk Associations
HelpDeskRecord.belongsTo(Senior, { foreignKey: "seniorId" });
HelpDeskRecord.belongsTo(HelpDeskRecordCategory, {
  foreignKey: "helpDeskRecordCategory",
});
HelpDeskRecordCategory.hasMany(HelpDeskRecord, {
  foreignKey: "helpDeskRecordCategory",
});

// Senior Vaccines Associations
Senior.belongsToMany(Vaccine, {
  through: SeniorVaccine,
  foreignKey: "seniorId",
  otherKey: "VaccineId",
});
Vaccine.belongsToMany(Senior, {
  through: SeniorVaccine,
  foreignKey: "VaccineId",
  otherKey: "seniorId",
});

// Through model direct associations for includes
SeniorVaccine.belongsTo(Vaccine, { foreignKey: "VaccineId" });
SeniorVaccine.belongsTo(Senior, { foreignKey: "seniorId" });

// Dependency Profile Associations
DependencyProfile.belongsToMany(Cohabitant, {
  through: SeniorCohabitant,
  foreignKey: "seniorId",
  otherKey: "cohabitantId",
});
Cohabitant.belongsToMany(DependencyProfile, {
  through: SeniorCohabitant,
  foreignKey: "cohabitantId",
  otherKey: "seniorId",
});

DependencyProfile.belongsToMany(LivingCondition, {
  through: SeniorLivingCondition,
  foreignKey: "seniorId",
  otherKey: "livingConditionId",
});
LivingCondition.belongsToMany(DependencyProfile, {
  through: SeniorLivingCondition,
  foreignKey: "livingConditionId",
  otherKey: "seniorId",
});

// Education Profile Associations
EducationProfile.belongsToMany(HighestEducationalAttainment, {
  through: SeniorHighestEducationalAttainment,
  foreignKey: "seniorId",
  otherKey: "highestEducationalAttainmentId",
});
HighestEducationalAttainment.belongsToMany(EducationProfile, {
  through: SeniorHighestEducationalAttainment,
  foreignKey: "highestEducationalAttainmentId",
  otherKey: "seniorId",
});

EducationProfile.belongsToMany(SpecializationTechnicalSkill, {
  through: SeniorSpecializationTechnicalSkill,
  foreignKey: "seniorId",
  otherKey: "specializationTechnicalSkillId",
});
SpecializationTechnicalSkill.belongsToMany(EducationProfile, {
  through: SeniorSpecializationTechnicalSkill,
  foreignKey: "specializationTechnicalSkillId",
  otherKey: "seniorId",
});

EducationProfile.belongsToMany(CommunityInvolvement, {
  through: SeniorCommunityInvolvement,
  foreignKey: "seniorId",
  otherKey: "communityInvolvementId",
});
CommunityInvolvement.belongsToMany(EducationProfile, {
  through: SeniorCommunityInvolvement,
  foreignKey: "communityInvolvementId",
  otherKey: "seniorId",
});

// Economic Profile Associations
EconomicProfile.belongsToMany(IncomeAssistanceSource, {
  through: SeniorIncomeAssistanceSource,
  foreignKey: "seniorId",
  otherKey: "incomeAssistanceSourceId",
});
IncomeAssistanceSource.belongsToMany(EconomicProfile, {
  through: SeniorIncomeAssistanceSource,
  foreignKey: "incomeAssistanceSourceId",
  otherKey: "seniorId",
});

EconomicProfile.belongsToMany(RealImmovableProperty, {
  through: SeniorRealImmovableProperty,
  foreignKey: "seniorId",
  otherKey: "realImmovablePropertyId",
});
RealImmovableProperty.belongsToMany(EconomicProfile, {
  through: SeniorRealImmovableProperty,
  foreignKey: "realImmovablePropertyId",
  otherKey: "seniorId",
});

EconomicProfile.belongsToMany(PersonalMovableProperty, {
  through: SeniorPersonalMovableProperty,
  foreignKey: "seniorId",
  otherKey: "personalMovablePropertieId",
});
PersonalMovableProperty.belongsToMany(EconomicProfile, {
  through: SeniorPersonalMovableProperty,
  foreignKey: "personalMovablePropertieId",
  otherKey: "seniorId",
});

EconomicProfile.belongsToMany(MonthlyIncome, {
  through: SeniorMonthlyIncome,
  foreignKey: "seniorId",
  otherKey: "monthlyIncomeId",
});
MonthlyIncome.belongsToMany(EconomicProfile, {
  through: SeniorMonthlyIncome,
  foreignKey: "monthlyIncomeId",
  otherKey: "seniorId",
});

EconomicProfile.belongsToMany(ProblemsNeedsCommonlyEncountered, {
  through: SeniorProblemsNeedsCommonlyEncountered,
  foreignKey: "seniorId",
  otherKey: "problemsNeedsCommonlyEncounteredId",
});
ProblemsNeedsCommonlyEncountered.belongsToMany(EconomicProfile, {
  through: SeniorProblemsNeedsCommonlyEncountered,
  foreignKey: "problemsNeedsCommonlyEncounteredId",
  otherKey: "seniorId",
});

// Health Profile Associations
HealthProfile.belongsToMany(HealthProblemAilment, {
  through: SeniorHealthProblemAilment,
  foreignKey: "seniorId",
  otherKey: "healthProblemAilmentId",
});
HealthProblemAilment.belongsToMany(HealthProfile, {
  through: SeniorHealthProblemAilment,
  foreignKey: "healthProblemAilmentId",
  otherKey: "seniorId",
});

HealthProfile.belongsToMany(DentalConcern, {
  through: SeniorDentalConcern,
  foreignKey: "seniorId",
  otherKey: "dentalConcernId",
});
DentalConcern.belongsToMany(HealthProfile, {
  through: SeniorDentalConcern,
  foreignKey: "dentalConcernId",
  otherKey: "seniorId",
});

HealthProfile.belongsToMany(VisualConcern, {
  through: SeniorVisualConcern,
  foreignKey: "seniorId",
  otherKey: "visualConcernId",
});
VisualConcern.belongsToMany(HealthProfile, {
  through: SeniorVisualConcern,
  foreignKey: "visualConcernId",
  otherKey: "seniorId",
});

HealthProfile.belongsToMany(AuralConcern, {
  through: SeniorAuralConcern,
  foreignKey: "seniorId",
  otherKey: "auralConcernId",
});
AuralConcern.belongsToMany(HealthProfile, {
  through: SeniorAuralConcern,
  foreignKey: "auralConcernId",
  otherKey: "seniorId",
});

HealthProfile.belongsToMany(SocialEmotionalConcern, {
  through: SeniorSocialEmotionalConcern,
  foreignKey: "seniorId",
  otherKey: "socialEmotionalConcernId",
});
SocialEmotionalConcern.belongsToMany(HealthProfile, {
  through: SeniorSocialEmotionalConcern,
  foreignKey: "socialEmotionalConcernId",
  otherKey: "seniorId",
});

HealthProfile.belongsToMany(AreaOfDifficulty, {
  through: SeniorAreaOfDifficulty,
  foreignKey: "seniorId",
  otherKey: "areaOfDifficultyId",
});
AreaOfDifficulty.belongsToMany(HealthProfile, {
  through: SeniorAreaOfDifficulty,
  foreignKey: "areaOfDifficultyId",
  otherKey: "seniorId",
});

export {
  AreaOfDifficulty,
  AuralConcern,
  Barangay,
  Children,
  Cohabitant,
  CommunityInvolvement,
  DeathInfo,
  DentalConcern,
  Dependent,
  DependencyProfile,
  EconomicProfile,
  EducationProfile,
  FamilyComposition,
  HealthProblemAilment,
  HealthProfile,
  HelpDeskRecord,
  HelpDeskRecordCategory,
  HighestEducationalAttainment,
  IdentifyingInformation,
  IncomeAssistanceSource,
  LivingCondition,
  MonthlyIncome,
  PersonalMovableProperty,
  ProblemsNeedsCommonlyEncountered,
  RealImmovableProperty,
  Senior,
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
  SeniorStatusHistory,
  SeniorVisualConcern,
  sequelize,
  SocialEmotionalConcern,
  SpecializationTechnicalSkill,
  User,
  VisualConcern,
  Vaccine,
  SeniorVaccine,
};
