import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorSocialEmotionalConcern extends Model<InferAttributes<SeniorSocialEmotionalConcern>, InferCreationAttributes<SeniorSocialEmotionalConcern>> {
  declare seniorId: number;
  declare socialEmotionalConcernId: number;
}

SeniorSocialEmotionalConcern.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "HealthProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    socialEmotionalConcernId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "SocialEmotionalConcern", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorSocialEmotionalConcern",
    tableName: "SeniorSocialEmotionalConcern",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorSocialEmotionalConcern;
