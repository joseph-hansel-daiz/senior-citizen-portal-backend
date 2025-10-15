import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class Dependent extends Model<InferAttributes<Dependent>, InferCreationAttributes<Dependent>> {
  declare id: CreationOptional<number>;
  declare seniorId: number;
  declare name: string;
  declare occupation: CreationOptional<string>;
  declare income: CreationOptional<number>;
  declare age: number;
  declare isWorking: boolean;
}

Dependent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    income: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isWorking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Dependent",
    tableName: "Dependent",
    underscored: false,
    timestamps: false,
  }
);

export default Dependent;
