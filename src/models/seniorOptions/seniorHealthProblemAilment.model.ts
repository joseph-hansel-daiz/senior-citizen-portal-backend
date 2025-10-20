import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorHealthProblemAilment extends Model<InferAttributes<SeniorHealthProblemAilment>, InferCreationAttributes<SeniorHealthProblemAilment>> {
  declare seniorId: number;
  declare healthProblemAilmentId: number;
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
