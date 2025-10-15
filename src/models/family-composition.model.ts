import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class FamilyComposition extends Model<InferAttributes<FamilyComposition>, InferCreationAttributes<FamilyComposition>> {
  declare seniorId: number;
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
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
}

FamilyComposition.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    spouseLastname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    spouseFirstname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    spouseMiddlename: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    spouseExtension: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fatherLastname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fatherFirstname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fatherMiddlename: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fatherExtension: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    motherLastname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    motherFirstname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    motherMiddlename: {
      type: DataTypes.STRING(100),
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
    modelName: "FamilyComposition",
    tableName: "FamilyComposition",
    underscored: false,
    timestamps: true,
  }
);

export default FamilyComposition;
