import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorCommunityInvolvementAttributes {
  seniorId: number;
  communityInvolvementId: number;
}

export interface SeniorCommunityInvolvementCreationAttributes
  extends Optional<SeniorCommunityInvolvementAttributes, never> {}

class SeniorCommunityInvolvement
  extends Model<SeniorCommunityInvolvementAttributes, SeniorCommunityInvolvementCreationAttributes>
  implements SeniorCommunityInvolvementAttributes
{
  public seniorId!: number;
  public communityInvolvementId!: number;
}

SeniorCommunityInvolvement.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "EducationProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    communityInvolvementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "CommunityInvolvement", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorCommunityInvolvement",
    tableName: "SeniorCommunityInvolvement",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorCommunityInvolvement;
