import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorSocialEmotionalConcernAttributes {
  seniorId: number;
  socialEmotionalConcernId: number;
}

export interface SeniorSocialEmotionalConcernCreationAttributes
  extends Optional<SeniorSocialEmotionalConcernAttributes, never> {}

class SeniorSocialEmotionalConcern
  extends Model<SeniorSocialEmotionalConcernAttributes, SeniorSocialEmotionalConcernCreationAttributes>
  implements SeniorSocialEmotionalConcernAttributes
{
  public seniorId!: number;
  public socialEmotionalConcernId!: number;
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
