import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SpecializationTechnicalSkill extends Model<InferAttributes<SpecializationTechnicalSkill>, InferCreationAttributes<SpecializationTechnicalSkill>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

SpecializationTechnicalSkill.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "SpecializationTechnicalSkill",
    tableName: "SpecializationTechnicalSkill",
    timestamps: false,
    underscored: false,
  }
);

export default SpecializationTechnicalSkill;
