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
      references: { model: "seniors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    livingConditionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "livingConditions", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorLivingCondition",
    tableName: "seniorLivingCondition",
    timestamps: false,
  }
);

export default SeniorLivingCondition;
