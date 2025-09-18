import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SpecializationTechnicalSkillAttributes {
  id: number;
  name: string;
}

export interface SpecializationTechnicalSkillCreationAttributes
  extends Optional<SpecializationTechnicalSkillAttributes, "id"> {}

class SpecializationTechnicalSkill
  extends Model<SpecializationTechnicalSkillAttributes, SpecializationTechnicalSkillCreationAttributes>
  implements SpecializationTechnicalSkillAttributes
{
  public id!: number;
  public name!: string;
}

SpecializationTechnicalSkill.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "SpecializationTechnicalSkill",
    tableName: "specializationTechnicalSkills",
    timestamps: false,
  }
);

export default SpecializationTechnicalSkill;
