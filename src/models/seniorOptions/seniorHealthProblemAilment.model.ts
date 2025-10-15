import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorHealthProblemAilmentAttributes {
  seniorId: number;
  healthProblemAilmentId: number;
}

export interface SeniorHealthProblemAilmentCreationAttributes
  extends Optional<SeniorHealthProblemAilmentAttributes, never> {}

class SeniorHealthProblemAilment
  extends Model<SeniorHealthProblemAilmentAttributes, SeniorHealthProblemAilmentCreationAttributes>
  implements SeniorHealthProblemAilmentAttributes
{
  public seniorId!: number;
  public healthProblemAilmentId!: number;
}

SeniorHealthProblemAilment.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "HealthProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    healthProblemAilmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "HealthProblemAilment", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorHealthProblemAilment",
    tableName: "SeniorHealthProblemAilment",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorHealthProblemAilment;
