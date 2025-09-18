import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorAreaOfDifficultyAttributes {
  seniorId: number;
  areaOfDifficultyId: number;
}

export interface SeniorAreaOfDifficultyCreationAttributes
  extends Optional<SeniorAreaOfDifficultyAttributes, never> {}

class SeniorAreaOfDifficulty
  extends Model<
    SeniorAreaOfDifficultyAttributes,
    SeniorAreaOfDifficultyCreationAttributes
  >
  implements SeniorAreaOfDifficultyAttributes
{
  public seniorId!: number;
  public areaOfDifficultyId!: number;
}

SeniorAreaOfDifficulty.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "seniors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    areaOfDifficultyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "areaOfDifficulties", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorAreaOfDifficulty",
    tableName: "seniorAreaOfDifficulty",
    timestamps: false,
  }
);

export default SeniorAreaOfDifficulty;
