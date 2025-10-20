import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class Cohabitant extends Model<InferAttributes<Cohabitant>, InferCreationAttributes<Cohabitant>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Cohabitant.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "Cohabitant",
    tableName: "Cohabitant",
    timestamps: false,
    underscored: false,
  }
);

export default Cohabitant;
