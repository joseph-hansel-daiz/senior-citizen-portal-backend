import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class Barangay extends Model<InferAttributes<Barangay>, InferCreationAttributes<Barangay>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Barangay.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "Barangay",
    tableName: "Barangay",
    underscored: false,
    timestamps: false,
  }
);

export default Barangay;
