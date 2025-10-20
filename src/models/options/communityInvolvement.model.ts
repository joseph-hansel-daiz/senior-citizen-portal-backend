import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class CommunityInvolvement extends Model<InferAttributes<CommunityInvolvement>, InferCreationAttributes<CommunityInvolvement>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

CommunityInvolvement.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "CommunityInvolvement",
    tableName: "CommunityInvolvement",
    timestamps: false,
    underscored: false,
  }
);

export default CommunityInvolvement;
