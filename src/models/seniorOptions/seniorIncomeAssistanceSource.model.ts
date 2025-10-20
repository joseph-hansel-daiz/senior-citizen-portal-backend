import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorIncomeAssistanceSource extends Model<InferAttributes<SeniorIncomeAssistanceSource>, InferCreationAttributes<SeniorIncomeAssistanceSource>> {
  declare seniorId: number;
  declare incomeAssistanceSourceId: number;
}

SeniorIncomeAssistanceSource.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "EconomicProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    incomeAssistanceSourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "IncomeAssistanceSource", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorIncomeAssistanceSource",
    tableName: "SeniorIncomeAssistanceSource",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorIncomeAssistanceSource;
