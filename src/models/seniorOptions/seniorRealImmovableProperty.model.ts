import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorRealImmovablePropertyAttributes {
  seniorId: number;
  realImmovablePropertyId: number;
}

export interface SeniorRealImmovablePropertyCreationAttributes
  extends Optional<SeniorRealImmovablePropertyAttributes, never> {}

class SeniorRealImmovableProperty
  extends Model<SeniorRealImmovablePropertyAttributes, SeniorRealImmovablePropertyCreationAttributes>
  implements SeniorRealImmovablePropertyAttributes
{
  public seniorId!: number;
  public realImmovablePropertyId!: number;
}

SeniorRealImmovableProperty.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "EconomicProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    realImmovablePropertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "RealImmovableProperty", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorRealImmovableProperty",
    tableName: "SeniorRealImmovableProperty",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorRealImmovableProperty;
