import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../config/db";

// Import models for associations
import Barangay from "./barangay.model";
import User from "./user.model";
import IdentifyingInformation from "./identifying-information.model";
import FamilyComposition from "./family-composition.model";
import DependencyProfile from "./dependency-profile.model";
import EducationProfile from "./education-profile.model";
import EconomicProfile from "./economic-profile.model";
import HealthProfile from "./health-profile.model";
import DeathInfo from "./death-info.model";
import SeniorStatusHistory from "./senior-status-history.model";
import HelpDeskRecord from "./help-desk-record.model";

class Senior extends Model<InferAttributes<Senior>, InferCreationAttributes<Senior>> {
  declare id: CreationOptional<number>;
  declare isDeleted: CreationOptional<boolean>;
  declare barangayId: number;
  declare photo: CreationOptional<Blob>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
  declare deletedBy: CreationOptional<number | null>;

  // Associations
  declare barangay?: NonAttribute<Barangay>;
  declare creator?: NonAttribute<User>;
  declare updater?: NonAttribute<User>;
  declare deleter?: NonAttribute<User>;

  // Profile Associations
  declare IdentifyingInformation?: NonAttribute<IdentifyingInformation>;
  declare FamilyComposition?: NonAttribute<FamilyComposition>;
  declare DependencyProfile?: NonAttribute<DependencyProfile>;
  declare EducationProfile?: NonAttribute<EducationProfile>;
  declare EconomicProfile?: NonAttribute<EconomicProfile>;
  declare HealthProfile?: NonAttribute<HealthProfile>;
  declare DeathInfo?: NonAttribute<DeathInfo>;
  declare SeniorStatusHistories?: NonAttribute<SeniorStatusHistory[]>;
  declare HelpDeskRecords?: NonAttribute<HelpDeskRecord[]>;
}

Senior.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    barangayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Barangay", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
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
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "User", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "Senior",
    tableName: "Senior",
    underscored: false,
    timestamps: true,
    paranoid: true,
  }
);

export default Senior;
