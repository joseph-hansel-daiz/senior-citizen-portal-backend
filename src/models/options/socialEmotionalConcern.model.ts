import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SocialEmotionalConcern extends Model<InferAttributes<SocialEmotionalConcern>, InferCreationAttributes<SocialEmotionalConcern>> {
  declare id: CreationOptional<number>;
  declare name: string;
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
