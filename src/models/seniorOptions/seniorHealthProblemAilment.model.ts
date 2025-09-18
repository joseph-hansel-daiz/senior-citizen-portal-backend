import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorHealthProblemAilmentAttributes {
  seniorId: number;
  seniorHealthProblemAilmentId: number;
}

export interface SeniorHealthProblemAilmentCreationAttributes
  extends Optional<SeniorHealthProblemAilmentAttributes, never> {}

class SeniorHealthProblemAilment
  extends Model<SeniorHealthProblemAilmentAttributes, SeniorHealthProblemAilmentCreationAttributes>
  implements SeniorHealthProblemAilmentAttributes
{
  public seniorId!: number;
  public seniorHealthProblemAilmentId!: number;
}

SeniorHealthProblemAilment.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "seniors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    seniorHealthProblemAilmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "seniorHealthProblemAilments", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorHealthProblemAilment",
    tableName: "seniorHealthProblemAilment",
    timestamps: false,
  }
);

export default SeniorHealthProblemAilment;
