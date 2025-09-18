import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

export interface BarangayAttributes {
  id: number;
  name: string;
}

export interface BarangayCreationAttributes
  extends Optional<BarangayAttributes, "id"> {}

class Barangay
  extends Model<BarangayAttributes, BarangayCreationAttributes>
  implements BarangayAttributes
{
  public id!: number;
  public name!: string;
}

Barangay.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "Barangay",
    tableName: "barangays",
    timestamps: false,
  }
);

export default Barangay;
