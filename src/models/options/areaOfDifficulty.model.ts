import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class AreaOfDifficulty extends Model<InferAttributes<AreaOfDifficulty>, InferCreationAttributes<AreaOfDifficulty>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

AreaOfDifficulty.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "AreaOfDifficulty",
    tableName: "AreaOfDifficulty",
    timestamps: false,
    underscored: false,
  }
);

export default AreaOfDifficulty;
