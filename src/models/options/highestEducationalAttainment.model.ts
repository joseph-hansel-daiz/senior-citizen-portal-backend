import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface HighestEducationalAttainmentAttributes {
  id: number;
  name: string;
}

export interface HighestEducationalAttainmentCreationAttributes
  extends Optional<HighestEducationalAttainmentAttributes, "id"> {}

class HighestEducationalAttainment
  extends Model<HighestEducationalAttainmentAttributes, HighestEducationalAttainmentCreationAttributes>
  implements HighestEducationalAttainmentAttributes
{
  public id!: number;
  public name!: string;
}

HighestEducationalAttainment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "HighestEducationalAttainment",
    tableName: "HighestEducationalAttainment",
    timestamps: false,
    underscored: false,
  }
);

export default HighestEducationalAttainment;
