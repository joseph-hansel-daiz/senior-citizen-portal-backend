import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class Children extends Model<InferAttributes<Children>, InferCreationAttributes<Children>> {
  declare id: CreationOptional<number>;
  declare seniorId: number;
  declare name: string;
  declare occupation: CreationOptional<string>;
  declare income: CreationOptional<number>;
  declare age: number;
  declare isWorking: 'Yes' | 'No';
}

Children.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "FamilyComposition", key: "seniorId" },
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
      type: DataTypes.ENUM('Yes', 'No'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Children",
    tableName: "Children",
    underscored: false,
    timestamps: false,
  }
);

export default Children;
