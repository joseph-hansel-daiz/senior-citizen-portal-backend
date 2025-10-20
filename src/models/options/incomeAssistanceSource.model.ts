import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class IncomeAssistanceSource extends Model<InferAttributes<IncomeAssistanceSource>, InferCreationAttributes<IncomeAssistanceSource>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

IncomeAssistanceSource.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "IncomeAssistanceSource",
    tableName: "IncomeAssistanceSource",
    timestamps: false,
    underscored: false,
  }
);

export default IncomeAssistanceSource;
