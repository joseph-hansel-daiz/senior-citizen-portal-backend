import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class LivingCondition extends Model<InferAttributes<LivingCondition>, InferCreationAttributes<LivingCondition>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

LivingCondition.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "LivingCondition",
    tableName: "LivingCondition",
    timestamps: false,
    underscored: false,
  }
);

export default LivingCondition;
