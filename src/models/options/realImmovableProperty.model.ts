import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface RealImmovablePropertyAttributes {
  id: number;
  name: string;
}

export interface RealImmovablePropertyCreationAttributes
  extends Optional<RealImmovablePropertyAttributes, "id"> {}

class RealImmovableProperty
  extends Model<RealImmovablePropertyAttributes, RealImmovablePropertyCreationAttributes>
  implements RealImmovablePropertyAttributes
{
  public id!: number;
  public name!: string;
}

RealImmovableProperty.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "RealImmovableProperty",
    tableName: "RealImmovableProperty",
    timestamps: false,
    underscored: false,
  }
);

export default RealImmovableProperty;
