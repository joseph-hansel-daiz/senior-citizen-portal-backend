import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class RealImmovableProperty extends Model<InferAttributes<RealImmovableProperty>, InferCreationAttributes<RealImmovableProperty>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

RealImmovableProperty.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "RealImmovableProperty",
    tableName: "RealImmovableProperty",
    timestamps: false,
    underscored: false,
  }
);

export default RealImmovableProperty;
