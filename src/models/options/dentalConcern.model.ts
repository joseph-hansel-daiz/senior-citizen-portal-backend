import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface DentalConcernAttributes {
  id: number;
  name: string;
}

export interface DentalConcernCreationAttributes
  extends Optional<DentalConcernAttributes, "id"> {}

class DentalConcern
  extends Model<DentalConcernAttributes, DentalConcernCreationAttributes>
  implements DentalConcernAttributes
{
  public id!: number;
  public name!: string;
}

DentalConcern.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "DentalConcern",
    tableName: "DentalConcern",
    timestamps: false,
    underscored: false,
  }
);

export default DentalConcern;
