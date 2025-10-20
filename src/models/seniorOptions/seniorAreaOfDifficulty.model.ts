import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorAreaOfDifficulty extends Model<InferAttributes<SeniorAreaOfDifficulty>, InferCreationAttributes<SeniorAreaOfDifficulty>> {
  declare seniorId: number;
  declare areaOfDifficultyId: number;
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
