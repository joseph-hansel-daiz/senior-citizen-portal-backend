import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class DentalConcern extends Model<InferAttributes<DentalConcern>, InferCreationAttributes<DentalConcern>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

DentalConcern.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "DentalConcern",
    tableName: "DentalConcern",
    timestamps: false,
    underscored: false,
  }
);

export default DentalConcern;
