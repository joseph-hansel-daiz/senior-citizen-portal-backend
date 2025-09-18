import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorIncomeAssistanceSourceAttributes {
  seniorId: number;
  incomeAssistanceSourceId: number;
}

export interface SeniorIncomeAssistanceSourceCreationAttributes
  extends Optional<SeniorIncomeAssistanceSourceAttributes, never> {}

class SeniorIncomeAssistanceSource
  extends Model<SeniorIncomeAssistanceSourceAttributes, SeniorIncomeAssistanceSourceCreationAttributes>
  implements SeniorIncomeAssistanceSourceAttributes
{
  public seniorId!: number;
  public incomeAssistanceSourceId!: number;
}

SeniorIncomeAssistanceSource.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "seniors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    incomeAssistanceSourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "incomeAssistanceSources", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorIncomeAssistanceSource",
    tableName: "seniorIncomeAssistanceSource",
    timestamps: false,
  }
);

export default SeniorIncomeAssistanceSource;
