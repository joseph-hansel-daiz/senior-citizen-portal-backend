import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorLivingConditionAttributes {
  seniorId: number;
  livingConditionId: number;
}

export interface SeniorLivingConditionCreationAttributes
  extends Optional<SeniorLivingConditionAttributes, never> {}

class SeniorLivingCondition
  extends Model<SeniorLivingConditionAttributes, SeniorLivingConditionCreationAttributes>
  implements SeniorLivingConditionAttributes
{
  public seniorId!: number;
  public livingConditionId!: number;
}

SeniorLivingCondition.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "DependencyProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    livingConditionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "LivingCondition", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorLivingCondition",
    tableName: "SeniorLivingCondition",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorLivingCondition;
