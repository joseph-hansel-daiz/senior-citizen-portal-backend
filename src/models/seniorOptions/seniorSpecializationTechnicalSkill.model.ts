import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorSpecializationTechnicalSkill extends Model<InferAttributes<SeniorSpecializationTechnicalSkill>, InferCreationAttributes<SeniorSpecializationTechnicalSkill>> {
  declare seniorId: number;
  declare specializationTechnicalSkillId: number;
}

SeniorSpecializationTechnicalSkill.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "EducationProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    specializationTechnicalSkillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "SpecializationTechnicalSkill", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorSpecializationTechnicalSkill",
    tableName: "SeniorSpecializationTechnicalSkill",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorSpecializationTechnicalSkill;
