import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorProblemsNeedsCommonlyEncounteredAttributes {
  seniorId: number;
  problemsNeedsCommonlyEncounteredId: number;
}

export interface SeniorProblemsNeedsCommonlyEncounteredCreationAttributes
  extends Optional<SeniorProblemsNeedsCommonlyEncounteredAttributes, never> {}

class SeniorProblemsNeedsCommonlyEncountered
  extends Model<SeniorProblemsNeedsCommonlyEncounteredAttributes, SeniorProblemsNeedsCommonlyEncounteredCreationAttributes>
  implements SeniorProblemsNeedsCommonlyEncounteredAttributes
{
  public seniorId!: number;
  public problemsNeedsCommonlyEncounteredId!: number;
}

SeniorProblemsNeedsCommonlyEncountered.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "seniors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    problemsNeedsCommonlyEncounteredId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "problemsNeedsCommonlyEncountered", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorProblemsNeedsCommonlyEncountered",
    tableName: "seniorProblemsNeedsCommonlyEncountered",
    timestamps: false,
  }
);

export default SeniorProblemsNeedsCommonlyEncountered;
