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
      references: { model: "HealthProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    areaOfDifficultyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "AreaOfDifficulty", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorAreaOfDifficulty",
    tableName: "SeniorAreaOfDifficulty",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorAreaOfDifficulty;
