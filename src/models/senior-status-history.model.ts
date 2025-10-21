import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class SeniorStatusHistory extends Model<InferAttributes<SeniorStatusHistory>, InferCreationAttributes<SeniorStatusHistory>> {
  declare id: CreationOptional<number>;
  declare seniorId: number;
  declare status: 'Pending' | 'Active' | 'Declined';
  declare note: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
}

SeniorStatusHistory.init(
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
    status: {
      type: DataTypes.ENUM('Pending', 'Active', 'Declined'),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "User", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "User", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "SeniorStatusHistory",
    tableName: "SeniorStatusHistory",
    underscored: false,
    timestamps: true,
  }
);

export default SeniorStatusHistory;
