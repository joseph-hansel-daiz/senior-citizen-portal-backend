import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorProblemsNeedsCommonlyEncountered extends Model<InferAttributes<SeniorProblemsNeedsCommonlyEncountered>, InferCreationAttributes<SeniorProblemsNeedsCommonlyEncountered>> {
  declare seniorId: number;
  declare problemsNeedsCommonlyEncounteredId: number;
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
