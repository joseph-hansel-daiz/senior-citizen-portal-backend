import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface AuralConcernAttributes {
  id: number;
  name: string;
}

export interface AuralConcernCreationAttributes
  extends Optional<AuralConcernAttributes, "id"> {}

class AuralConcern
  extends Model<AuralConcernAttributes, AuralConcernCreationAttributes>
  implements AuralConcernAttributes
{
  public id!: number;
  public name!: string;
}

AuralConcern.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "AuralConcern",
    tableName: "auralConcerns",
    timestamps: false,
  }
);

export default AuralConcern;
