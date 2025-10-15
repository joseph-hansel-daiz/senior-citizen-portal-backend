import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class EducationProfile extends Model<InferAttributes<EducationProfile>, InferCreationAttributes<EducationProfile>> {
  declare seniorId: number;
  declare sharedSkills: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
}

EducationProfile.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    sharedSkills: {
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
    modelName: "EducationProfile",
    tableName: "EducationProfile",
    underscored: false,
    timestamps: true,
  }
);

export default EducationProfile;
