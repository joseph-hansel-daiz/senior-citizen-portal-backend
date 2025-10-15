import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorSpecializationTechnicalSkillAttributes {
  seniorId: number;
  specializationTechnicalSkillId: number;
}

export interface SeniorSpecializationTechnicalSkillCreationAttributes
  extends Optional<SeniorSpecializationTechnicalSkillAttributes, never> {}

class SeniorSpecializationTechnicalSkill
  extends Model<SeniorSpecializationTechnicalSkillAttributes, SeniorSpecializationTechnicalSkillCreationAttributes>
  implements SeniorSpecializationTechnicalSkillAttributes
{
  public seniorId!: number;
  public specializationTechnicalSkillId!: number;
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
