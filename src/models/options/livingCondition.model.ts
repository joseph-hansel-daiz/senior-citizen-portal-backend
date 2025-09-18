import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface LivingConditionAttributes {
  id: number;
  name: string;
}

export interface LivingConditionCreationAttributes
  extends Optional<LivingConditionAttributes, "id"> {}

class LivingCondition
  extends Model<LivingConditionAttributes, LivingConditionCreationAttributes>
  implements LivingConditionAttributes
{
  public id!: number;
  public name!: string;
}

LivingCondition.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "LivingCondition",
    tableName: "livingConditions",
    timestamps: false,
  }
);

export default LivingCondition;
