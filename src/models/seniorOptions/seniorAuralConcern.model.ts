import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorAuralConcern extends Model<InferAttributes<SeniorAuralConcern>, InferCreationAttributes<SeniorAuralConcern>> {
  declare seniorId: number;
  declare auralConcernId: number;
}

SeniorAuralConcern.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "HealthProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    auralConcernId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "AuralConcern", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorAuralConcern",
    tableName: "SeniorAuralConcern",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorAuralConcern;
