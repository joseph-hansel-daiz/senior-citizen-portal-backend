import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface MonthlyIncomeAttributes {
  id: number;
  name: string;
}

export interface MonthlyIncomeCreationAttributes
  extends Optional<MonthlyIncomeAttributes, "id"> {}

class MonthlyIncome
  extends Model<MonthlyIncomeAttributes, MonthlyIncomeCreationAttributes>
  implements MonthlyIncomeAttributes
{
  public id!: number;
  public name!: string;
}

MonthlyIncome.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "MonthlyIncome",
    tableName: "MonthlyIncome",
    timestamps: false,
    underscored: false,
  }
);

export default MonthlyIncome;
