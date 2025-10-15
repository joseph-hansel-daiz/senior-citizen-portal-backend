import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorAuralConcernAttributes {
  seniorId: number;
  auralConcernId: number;
}

export interface SeniorAuralConcernCreationAttributes
  extends Optional<SeniorAuralConcernAttributes, never> {}

class SeniorAuralConcern
  extends Model<
    SeniorAuralConcernAttributes,
    SeniorAuralConcernCreationAttributes
  >
  implements SeniorAuralConcernAttributes
{
  public seniorId!: number;
  public auralConcernId!: number;
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
