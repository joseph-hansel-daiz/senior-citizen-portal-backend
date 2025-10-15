import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SocialEmotionalConcernAttributes {
  id: number;
  name: string;
}

export interface SocialEmotionalConcernCreationAttributes
  extends Optional<SocialEmotionalConcernAttributes, "id"> {}

class SocialEmotionalConcern
  extends Model<SocialEmotionalConcernAttributes, SocialEmotionalConcernCreationAttributes>
  implements SocialEmotionalConcernAttributes
{
  public id!: number;
  public name!: string;
}

SocialEmotionalConcern.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "SocialEmotionalConcern",
    tableName: "SocialEmotionalConcern",
    timestamps: false,
    underscored: false,
  }
);

export default SocialEmotionalConcern;
