import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface IncomeAssistanceSourceAttributes {
  id: number;
  name: string;
}

export interface IncomeAssistanceSourceCreationAttributes
  extends Optional<IncomeAssistanceSourceAttributes, "id"> {}

class IncomeAssistanceSource
  extends Model<IncomeAssistanceSourceAttributes, IncomeAssistanceSourceCreationAttributes>
  implements IncomeAssistanceSourceAttributes
{
  public id!: number;
  public name!: string;
}

IncomeAssistanceSource.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "IncomeAssistanceSource",
    tableName: "IncomeAssistanceSource",
    timestamps: false,
    underscored: false,
  }
);

export default IncomeAssistanceSource;
