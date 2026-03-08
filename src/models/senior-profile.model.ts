import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/db";

export type BloodType = "O" | "O+" | "O-" | "A" | "A+" | "A-";
export type ScheduleCheckUp = "Monthly" | "Every 3 Months" | "Every 6 Months" | "Annually";

class SeniorProfile extends Model<
  InferAttributes<SeniorProfile>,
  InferCreationAttributes<SeniorProfile>
> {
  declare seniorId: number;

  // IdentifyingInformation
  declare lastname: string;
  declare firstname: string;
  declare middlename: CreationOptional<string>;
  declare extension: CreationOptional<string>;
  declare region: string;
  declare province: string;
  declare city: string;
  declare barangay: string;
  declare residence: string;
  declare street: CreationOptional<string>;
  declare birthDate: Date;
  declare birthPlace: string;
  declare maritalStatus: string;
  declare religion: CreationOptional<string>;
  declare sexAtBirth: string;
  declare contactNumber: CreationOptional<string>;
  declare emailAddress: CreationOptional<string>;
  declare fbMessengerName: CreationOptional<string>;
  declare ethnicOrigin: CreationOptional<string>;
  declare languageSpoken: CreationOptional<string>;
  declare oscaIdNo: CreationOptional<string>;
  declare gsisSssNo: CreationOptional<string>;
  declare tin: CreationOptional<string>;
  declare philhealthNo: CreationOptional<string>;
  declare scAssociationIdNo: CreationOptional<string>;
  declare otherGovIdNo: CreationOptional<string>;
  declare employmentBusiness: CreationOptional<string>;
  declare hasPension: CreationOptional<boolean>;
  declare pensionList: CreationOptional<string>;
  declare capabilityToTravel: CreationOptional<boolean>;

  // FamilyComposition
  declare spouseLastname: CreationOptional<string>;
  declare spouseFirstname: CreationOptional<string>;
  declare spouseMiddlename: CreationOptional<string>;
  declare spouseExtension: CreationOptional<string>;
  declare fatherLastname: CreationOptional<string>;
  declare fatherFirstname: CreationOptional<string>;
  declare fatherMiddlename: CreationOptional<string>;
  declare fatherExtension: CreationOptional<string>;
  declare motherLastname: CreationOptional<string>;
  declare motherFirstname: CreationOptional<string>;
  declare motherMiddlename: CreationOptional<string>;

  // EducationProfile
  declare sharedSkills: CreationOptional<string>;

  // HealthProfile
  declare bloodType: BloodType;
  declare physicalDisability: CreationOptional<string>;
  declare listMedicines: CreationOptional<string>;
  declare checkUp: boolean;
  declare scheduleCheckUp: ScheduleCheckUp;

  // Option ID arrays (denormalized; resolve to names from option tables on read)
  declare cohabitantIds: CreationOptional<number[]>;
  declare livingConditionIds: CreationOptional<number[]>;
  declare highestEducationalAttainmentIds: CreationOptional<number[]>;
  declare specializationTechnicalSkillIds: CreationOptional<number[]>;
  declare communityInvolvementIds: CreationOptional<number[]>;
  declare incomeAssistanceSourceIds: CreationOptional<number[]>;
  declare realImmovablePropertyIds: CreationOptional<number[]>;
  declare personalMovablePropertyIds: CreationOptional<number[]>;
  declare monthlyIncomeIds: CreationOptional<number[]>;
  declare problemsNeedsCommonlyEncounteredIds: CreationOptional<number[]>;
  declare healthProblemAilmentIds: CreationOptional<number[]>;
  declare dentalConcernIds: CreationOptional<number[]>;
  declare visualConcernIds: CreationOptional<number[]>;
  declare auralConcernIds: CreationOptional<number[]>;
  declare socialEmotionalConcernIds: CreationOptional<number[]>;
  declare areaOfDifficultyIds: CreationOptional<number[]>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
}

const arrayInteger = DataTypes.ARRAY(DataTypes.INTEGER);

SeniorProfile.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    // IdentifyingInformation
    lastname: { type: DataTypes.STRING(100), allowNull: false },
    firstname: { type: DataTypes.STRING(100), allowNull: false },
    middlename: { type: DataTypes.STRING(100), allowNull: true },
    extension: { type: DataTypes.STRING(10), allowNull: true },
    region: { type: DataTypes.STRING(255), allowNull: false },
    province: { type: DataTypes.STRING(255), allowNull: false },
    city: { type: DataTypes.STRING(255), allowNull: false },
    barangay: { type: DataTypes.STRING(255), allowNull: false },
    residence: { type: DataTypes.STRING(255), allowNull: false },
    street: { type: DataTypes.STRING(255), allowNull: true },
    birthDate: { type: DataTypes.DATEONLY, allowNull: false },
    birthPlace: { type: DataTypes.STRING(255), allowNull: false },
    maritalStatus: { type: DataTypes.STRING(50), allowNull: false },
    religion: { type: DataTypes.STRING(255), allowNull: true },
    sexAtBirth: { type: DataTypes.STRING(10), allowNull: false },
    contactNumber: { type: DataTypes.STRING(15), allowNull: true },
    emailAddress: { type: DataTypes.STRING(255), allowNull: true },
    fbMessengerName: { type: DataTypes.STRING(255), allowNull: true },
    ethnicOrigin: { type: DataTypes.STRING(255), allowNull: true },
    languageSpoken: { type: DataTypes.STRING(255), allowNull: true },
    oscaIdNo: { type: DataTypes.STRING(50), allowNull: true },
    gsisSssNo: { type: DataTypes.STRING(50), allowNull: true },
    tin: { type: DataTypes.STRING(50), allowNull: true },
    philhealthNo: { type: DataTypes.STRING(50), allowNull: true },
    scAssociationIdNo: { type: DataTypes.STRING(50), allowNull: true },
    otherGovIdNo: { type: DataTypes.STRING(50), allowNull: true },
    employmentBusiness: { type: DataTypes.STRING(255), allowNull: true },
    hasPension: { type: DataTypes.BOOLEAN, allowNull: true },
    pensionList: { type: DataTypes.STRING(255), allowNull: true },
    capabilityToTravel: { type: DataTypes.BOOLEAN, allowNull: true },
    // FamilyComposition
    spouseLastname: { type: DataTypes.STRING(100), allowNull: true },
    spouseFirstname: { type: DataTypes.STRING(100), allowNull: true },
    spouseMiddlename: { type: DataTypes.STRING(100), allowNull: true },
    spouseExtension: { type: DataTypes.STRING(50), allowNull: true },
    fatherLastname: { type: DataTypes.STRING(100), allowNull: true },
    fatherFirstname: { type: DataTypes.STRING(100), allowNull: true },
    fatherMiddlename: { type: DataTypes.STRING(100), allowNull: true },
    fatherExtension: { type: DataTypes.STRING(50), allowNull: true },
    motherLastname: { type: DataTypes.STRING(100), allowNull: true },
    motherFirstname: { type: DataTypes.STRING(100), allowNull: true },
    motherMiddlename: { type: DataTypes.STRING(100), allowNull: true },
    // EducationProfile
    sharedSkills: { type: DataTypes.STRING(255), allowNull: true },
    // HealthProfile
    bloodType: {
      type: DataTypes.ENUM("O", "O+", "O-", "A", "A+", "A-"),
      allowNull: false,
    },
    physicalDisability: { type: DataTypes.STRING(255), allowNull: true },
    listMedicines: { type: DataTypes.STRING(255), allowNull: true },
    checkUp: { type: DataTypes.BOOLEAN, allowNull: false },
    scheduleCheckUp: {
      type: DataTypes.ENUM("Monthly", "Every 3 Months", "Every 6 Months", "Annually"),
      allowNull: false,
    },
    // Option ID arrays
    cohabitantIds: { type: arrayInteger, allowNull: true },
    livingConditionIds: { type: arrayInteger, allowNull: true },
    highestEducationalAttainmentIds: { type: arrayInteger, allowNull: true },
    specializationTechnicalSkillIds: { type: arrayInteger, allowNull: true },
    communityInvolvementIds: { type: arrayInteger, allowNull: true },
    incomeAssistanceSourceIds: { type: arrayInteger, allowNull: true },
    realImmovablePropertyIds: { type: arrayInteger, allowNull: true },
    personalMovablePropertyIds: { type: arrayInteger, allowNull: true },
    monthlyIncomeIds: { type: arrayInteger, allowNull: true },
    problemsNeedsCommonlyEncounteredIds: { type: arrayInteger, allowNull: true },
    healthProblemAilmentIds: { type: arrayInteger, allowNull: true },
    dentalConcernIds: { type: arrayInteger, allowNull: true },
    visualConcernIds: { type: arrayInteger, allowNull: true },
    auralConcernIds: { type: arrayInteger, allowNull: true },
    socialEmotionalConcernIds: { type: arrayInteger, allowNull: true },
    areaOfDifficultyIds: { type: arrayInteger, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "User", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "User", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "SeniorProfile",
    tableName: "SeniorProfile",
    underscored: false,
    timestamps: true,
  }
);

export default SeniorProfile;
