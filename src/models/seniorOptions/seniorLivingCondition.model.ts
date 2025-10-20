import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorLivingCondition extends Model<InferAttributes<SeniorLivingCondition>, InferCreationAttributes<SeniorLivingCondition>> {
  declare seniorId: number;
  declare livingConditionId: number;
}

SeniorLivingCondition.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "DependencyProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    livingConditionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "LivingCondition", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorLivingCondition",
    tableName: "SeniorLivingCondition",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorLivingCondition;
