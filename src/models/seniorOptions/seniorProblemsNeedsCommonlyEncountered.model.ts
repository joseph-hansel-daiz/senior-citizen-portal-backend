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
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    problemsNeedsCommonlyEncounteredId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "ProblemsNeedsCommonlyEncountered", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorProblemsNeedsCommonlyEncountered",
    tableName: "SeniorProblemsNeedsCommonlyEncountered",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorProblemsNeedsCommonlyEncountered;
