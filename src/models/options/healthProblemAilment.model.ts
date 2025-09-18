import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface HealthProblemAilmentAttributes {
  id: number;
  name: string;
}

export interface HealthProblemAilmentCreationAttributes
  extends Optional<HealthProblemAilmentAttributes, "id"> {}

class HealthProblemAilment
  extends Model<HealthProblemAilmentAttributes, HealthProblemAilmentCreationAttributes>
  implements HealthProblemAilmentAttributes
{
  public id!: number;
  public name!: string;
}

HealthProblemAilment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "HealthProblemAilment",
    tableName: "healthProblemAilments",
    timestamps: false,
  }
);

export default HealthProblemAilment;
