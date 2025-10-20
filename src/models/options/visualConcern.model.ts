import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class VisualConcern extends Model<InferAttributes<VisualConcern>, InferCreationAttributes<VisualConcern>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

VisualConcern.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "VisualConcern",
    tableName: "VisualConcern",
    timestamps: false,
    underscored: false,
  }
);

export default VisualConcern;
