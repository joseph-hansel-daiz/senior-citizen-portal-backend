import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface CohabitantAttributes {
  id: number;
  name: string;
}

export interface CohabitantCreationAttributes
  extends Optional<CohabitantAttributes, "id"> {}

class Cohabitant
  extends Model<CohabitantAttributes, CohabitantCreationAttributes>
  implements CohabitantAttributes
{
  public id!: number;
  public name!: string;
}

Cohabitant.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "Cohabitant",
    tableName: "Cohabitant",
    timestamps: false,
    underscored: false,
  }
);

export default Cohabitant;
