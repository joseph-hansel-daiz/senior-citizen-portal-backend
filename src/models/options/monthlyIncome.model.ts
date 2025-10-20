import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class MonthlyIncome extends Model<InferAttributes<MonthlyIncome>, InferCreationAttributes<MonthlyIncome>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

MonthlyIncome.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "MonthlyIncome",
    tableName: "MonthlyIncome",
    timestamps: false,
    underscored: false,
  }
);

export default MonthlyIncome;
