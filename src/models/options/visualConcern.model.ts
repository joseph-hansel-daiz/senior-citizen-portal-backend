import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface VisualConcernAttributes {
  id: number;
  name: string;
}

export interface VisualConcernCreationAttributes
  extends Optional<VisualConcernAttributes, "id"> {}

class VisualConcern
  extends Model<VisualConcernAttributes, VisualConcernCreationAttributes>
  implements VisualConcernAttributes
{
  public id!: number;
  public name!: string;
}

VisualConcern.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "VisualConcern",
    tableName: "VisualConcern",
    timestamps: false,
    underscored: false,
  }
);

export default VisualConcern;
