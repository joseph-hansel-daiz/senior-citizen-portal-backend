import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class Vaccine extends Model<InferAttributes<Vaccine>, InferCreationAttributes<Vaccine>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Vaccine.init(
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
    modelName: "Vaccine",
    tableName: "Vaccine",
    underscored: false,
    timestamps: false,
  }
);

export default Vaccine;
