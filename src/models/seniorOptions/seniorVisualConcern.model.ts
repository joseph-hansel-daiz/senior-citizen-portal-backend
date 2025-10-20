import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorVisualConcern extends Model<InferAttributes<SeniorVisualConcern>, InferCreationAttributes<SeniorVisualConcern>> {
  declare seniorId: number;
  declare visualConcernId: number;
}

SeniorVisualConcern.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "health_profiles", key: "senior_id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    visualConcernId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "visual_concerns", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorVisualConcern",
    tableName: "senior_visual_concerns",
    timestamps: false,
    underscored: true,
  }
);

export default SeniorVisualConcern;
