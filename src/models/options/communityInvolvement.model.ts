import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface CommunityInvolvementAttributes {
  id: number;
  name: string;
}

export interface CommunityInvolvementCreationAttributes
  extends Optional<CommunityInvolvementAttributes, "id"> {}

class CommunityInvolvement
  extends Model<CommunityInvolvementAttributes, CommunityInvolvementCreationAttributes>
  implements CommunityInvolvementAttributes
{
  public id!: number;
  public name!: string;
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
