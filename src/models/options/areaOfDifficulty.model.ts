import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface AreaOfDifficultyAttributes {
  id: number;
  name: string;
}

export interface AreaOfDifficultyCreationAttributes
  extends Optional<AreaOfDifficultyAttributes, "id"> {}

class AreaOfDifficulty
  extends Model<AreaOfDifficultyAttributes, AreaOfDifficultyCreationAttributes>
  implements AreaOfDifficultyAttributes
{
  public id!: number;
  public name!: string;
}

AreaOfDifficulty.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "AreaOfDifficulty",
    tableName: "AreaOfDifficulty",
    timestamps: false,
    underscored: false,
  }
);

export default AreaOfDifficulty;
