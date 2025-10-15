import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface ProblemsNeedsCommonlyEncounteredAttributes {
  id: number;
  name: string;
}

export interface ProblemsNeedsCommonlyEncounteredCreationAttributes
  extends Optional<ProblemsNeedsCommonlyEncounteredAttributes, "id"> {}

class ProblemsNeedsCommonlyEncountered
  extends Model<ProblemsNeedsCommonlyEncounteredAttributes, ProblemsNeedsCommonlyEncounteredCreationAttributes>
  implements ProblemsNeedsCommonlyEncounteredAttributes
{
  public id!: number;
  public name!: string;
}

ProblemsNeedsCommonlyEncountered.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "ProblemsNeedsCommonlyEncountered",
    tableName: "ProblemsNeedsCommonlyEncountered",
    timestamps: false,
    underscored: false,
  }
);

export default ProblemsNeedsCommonlyEncountered;
