import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorHighestEducationalAttainment extends Model<InferAttributes<SeniorHighestEducationalAttainment>, InferCreationAttributes<SeniorHighestEducationalAttainment>> {
  declare seniorId: number;
  declare highestEducationalAttainmentId: number;
}

SeniorHighestEducationalAttainment.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "EducationProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    highestEducationalAttainmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "HighestEducationalAttainment", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorHighestEducationalAttainment",
    tableName: "SeniorHighestEducationalAttainment",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorHighestEducationalAttainment;
