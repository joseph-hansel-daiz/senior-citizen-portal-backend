import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorVisualConcernAttributes {
  seniorId: number;
  visualConcernId: number;
}

export interface SeniorVisualConcernCreationAttributes
  extends Optional<SeniorVisualConcernAttributes, never> {}

class SeniorVisualConcern
  extends Model<
    SeniorVisualConcernAttributes,
    SeniorVisualConcernCreationAttributes
  >
  implements SeniorVisualConcernAttributes
{
  public seniorId!: number;
  public visualConcernId!: number;
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
