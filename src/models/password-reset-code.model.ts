import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class PasswordResetCode extends Model<InferAttributes<PasswordResetCode>, InferCreationAttributes<PasswordResetCode>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare code: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PasswordResetCode.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Only one code per user
      references: { model: "User", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: "PasswordResetCode",
    tableName: "PasswordResetCode",
    underscored: false,
  }
);

export default PasswordResetCode;

