import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorMonthlyIncome extends Model<InferAttributes<SeniorMonthlyIncome>, InferCreationAttributes<SeniorMonthlyIncome>> {
  declare seniorId: number;
  declare monthlyIncomeId: number;
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
