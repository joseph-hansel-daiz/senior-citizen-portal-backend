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
      references: { model: "EconomicProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    monthlyIncomeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "MonthlyIncome", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorMonthlyIncome",
    tableName: "SeniorMonthlyIncome",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorMonthlyIncome;
