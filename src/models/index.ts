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
import SeniorProfile from "./senior-profile.model";

import DeathInfo from "./death-info.model";
import SeniorStatusHistory from "./senior-status-history.model";
import HelpDeskRecord from "./help-desk-record.model";
import HelpDeskRecordCategory from "./options/help-desk-record-category.model";
import HelpDeskRecordCategoryRecord from "./help-desk-record-category-record.model";

import Children from "./children.model";
import Dependent from "./dependent.model";

import User from "./user.model";
import PasswordResetCode from "./password-reset-code.model";
import Vaccine from "./options/vaccine.model";
import SeniorVaccine from "./seniorOptions/seniorVaccine.model";
import Assistance from "./options/assistance.model";
import SeniorAssistance from "./seniorOptions/seniorAssistance.model";
import AuditLog from "./audit-log.model";

// Basic Associations
Barangay.hasMany(User, { foreignKey: "barangayId" });
User.belongsTo(Barangay, { foreignKey: "barangayId" });

// Password Reset Code Associations
User.hasOne(PasswordResetCode, { foreignKey: "userId", onDelete: "CASCADE" });
PasswordResetCode.belongsTo(User, { foreignKey: "userId" });

// Audit Log Associations
User.hasMany(AuditLog, { foreignKey: "actorId" });
AuditLog.belongsTo(User, { foreignKey: "actorId" });

Senior.belongsTo(Barangay, { foreignKey: "barangayId" });
Senior.belongsTo(User, { foreignKey: "createdBy", as: "creator" });
Senior.belongsTo(User, { foreignKey: "updatedBy", as: "updater" });
Senior.belongsTo(User, { foreignKey: "deletedBy", as: "deleter" });

// Senior Profile (denormalized 1:1)
Senior.hasOne(SeniorProfile, { foreignKey: "seniorId" });
SeniorProfile.belongsTo(Senior, { foreignKey: "seniorId" });

Senior.hasOne(DeathInfo, { foreignKey: "seniorId" });
Senior.hasMany(SeniorStatusHistory, { foreignKey: "seniorId" });
Senior.hasMany(HelpDeskRecord, { foreignKey: "seniorId" });

// Family Composition Associations
Senior.hasMany(Children, { foreignKey: "seniorId" });
Senior.hasMany(Dependent, { foreignKey: "seniorId" });

// Help Desk Associations
HelpDeskRecord.belongsTo(Senior, { foreignKey: "seniorId" });
HelpDeskRecord.belongsToMany(HelpDeskRecordCategory, {
  through: { model: HelpDeskRecordCategoryRecord, unique: false },
  foreignKey: "helpDeskRecordId",
  otherKey: "helpDeskRecordCategoryId",
});
HelpDeskRecordCategory.belongsToMany(HelpDeskRecord, {
  through: { model: HelpDeskRecordCategoryRecord, unique: false },
  foreignKey: "helpDeskRecordCategoryId",
  otherKey: "helpDeskRecordId",
});
HelpDeskRecordCategoryRecord.belongsTo(HelpDeskRecordCategory, { foreignKey: "helpDeskRecordCategoryId" });
HelpDeskRecordCategoryRecord.belongsTo(HelpDeskRecord, { foreignKey: "helpDeskRecordId" });

// Senior Vaccines Associations
Senior.belongsToMany(Vaccine, {
  through: { model: SeniorVaccine, unique: false },
  foreignKey: "seniorId",
  otherKey: "vaccineId",
});
Vaccine.belongsToMany(Senior, {
  through: { model: SeniorVaccine, unique: false },
  foreignKey: "vaccineId",
  otherKey: "seniorId",
});
SeniorVaccine.belongsTo(Vaccine, { foreignKey: "vaccineId" });
SeniorVaccine.belongsTo(Senior, { foreignKey: "seniorId" });

// Senior Assistance Associations
Senior.belongsToMany(Assistance, {
  through: { model: SeniorAssistance, unique: false },
  foreignKey: "seniorId",
  otherKey: "assistanceId",
});
Assistance.belongsToMany(Senior, {
  through: { model: SeniorAssistance, unique: false },
  foreignKey: "assistanceId",
  otherKey: "seniorId",
});
SeniorAssistance.belongsTo(Assistance, { foreignKey: "assistanceId" });
SeniorAssistance.belongsTo(Senior, { foreignKey: "seniorId" });

// Senior ↔ Audit Log
Senior.hasMany(AuditLog, { foreignKey: "seniorId" });
AuditLog.belongsTo(Senior, { foreignKey: "seniorId" });

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
  HealthProblemAilment,
  HelpDeskRecord,
  HelpDeskRecordCategory,
  HelpDeskRecordCategoryRecord,
  HighestEducationalAttainment,
  IncomeAssistanceSource,
  LivingCondition,
  MonthlyIncome,
  PasswordResetCode,
  PersonalMovableProperty,
  ProblemsNeedsCommonlyEncountered,
  RealImmovableProperty,
  Senior,
  SeniorProfile,
  SeniorStatusHistory,
  sequelize,
  SocialEmotionalConcern,
  SpecializationTechnicalSkill,
  User,
  VisualConcern,
  Vaccine,
  SeniorVaccine,
  Assistance,
  SeniorAssistance,
  AuditLog,
};
