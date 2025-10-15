import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorDentalConcernAttributes {
  seniorId: number;
  dentalConcernId: number;
}

export interface SeniorDentalConcernCreationAttributes
  extends Optional<SeniorDentalConcernAttributes, never> {}

class SeniorDentalConcern
  extends Model<
    SeniorDentalConcernAttributes,
    SeniorDentalConcernCreationAttributes
  >
  implements SeniorDentalConcernAttributes
{
  public seniorId!: number;
  public dentalConcernId!: number;
}

SeniorDentalConcern.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "HealthProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    dentalConcernId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "DentalConcern", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorDentalConcern",
    tableName: "SeniorDentalConcern",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorDentalConcern;
