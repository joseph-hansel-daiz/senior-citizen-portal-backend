import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorCommunityInvolvement extends Model<InferAttributes<SeniorCommunityInvolvement>, InferCreationAttributes<SeniorCommunityInvolvement>> {
  declare seniorId: number;
  declare communityInvolvementId: number;
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
