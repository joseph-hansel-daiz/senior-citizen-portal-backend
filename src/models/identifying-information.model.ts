import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import sequelize from "../config/db";
import Senior from "./senior.model";
import User from "./user.model";

class IdentifyingInformation extends Model<
  InferAttributes<IdentifyingInformation>,
  InferCreationAttributes<IdentifyingInformation>
> {
  declare seniorId: number;
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
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
}

IdentifyingInformation.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    extension: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    barangay: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    residence: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    birthPlace: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    maritalStatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    religion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sexAtBirth: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    emailAddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fbMessengerName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ethnicOrigin: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    languageSpoken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    oscaIdNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    gsisSssNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tin: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    philhealthNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    scAssociationIdNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    otherGovIdNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    employmentBusiness: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    hasPension: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pensionList: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    capabilityToTravel: {
      type: DataTypes.BOOLEAN,
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
    modelName: "IdentifyingInformation",
    tableName: "IdentifyingInformation",
    underscored: false,
    timestamps: true,
  }
);

export default IdentifyingInformation;
