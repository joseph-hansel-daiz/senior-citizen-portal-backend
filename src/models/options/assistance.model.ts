import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class Assistance extends Model<InferAttributes<Assistance>, InferCreationAttributes<Assistance>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Assistance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Assistance",
    tableName: "Assistance",
    underscored: false,
    timestamps: false,
  }
);

export default Assistance;
