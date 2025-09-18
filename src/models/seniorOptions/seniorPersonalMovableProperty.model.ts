import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorPersonalMovablePropertyAttributes {
  seniorId: number;
  personalMovablePropertieId: number;
}

export interface SeniorPersonalMovablePropertyCreationAttributes
  extends Optional<SeniorPersonalMovablePropertyAttributes, never> {}

class SeniorPersonalMovableProperty
  extends Model<SeniorPersonalMovablePropertyAttributes, SeniorPersonalMovablePropertyCreationAttributes>
  implements SeniorPersonalMovablePropertyAttributes
{
  public seniorId!: number;
  public personalMovablePropertieId!: number;
}

SeniorPersonalMovableProperty.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "seniors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    personalMovablePropertieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "personalMovableProperties", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorPersonalMovableProperty",
    tableName: "seniorPersonalMovableProperty",
    timestamps: false,
  }
);

export default SeniorPersonalMovableProperty;
