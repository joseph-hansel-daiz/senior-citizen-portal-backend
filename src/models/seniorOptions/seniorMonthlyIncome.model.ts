import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorMonthlyIncomeAttributes {
  seniorId: number;
  monthlyIncomeId: number;
}

export interface SeniorMonthlyIncomeCreationAttributes
  extends Optional<SeniorMonthlyIncomeAttributes, never> {}

class SeniorMonthlyIncome
  extends Model<SeniorMonthlyIncomeAttributes, SeniorMonthlyIncomeCreationAttributes>
  implements SeniorMonthlyIncomeAttributes
{
  public seniorId!: number;
  public monthlyIncomeId!: number;
}

SeniorMonthlyIncome.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "seniors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    monthlyIncomeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "monthlyIncomes", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorMonthlyIncome",
    tableName: "seniorMonthlyIncome",
    timestamps: false,
  }
);

export default SeniorMonthlyIncome;
