import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class DeathInfo extends Model<InferAttributes<DeathInfo>, InferCreationAttributes<DeathInfo>> {
  declare seniorId: number;
  declare dateOfDeath: Date;
  declare deathCertificate: CreationOptional<Buffer>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
}

DeathInfo.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    dateOfDeath: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    deathCertificate: {
      type: DataTypes.BLOB,
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
    modelName: "DeathInfo",
    tableName: "DeathInfo",
    underscored: false,
    timestamps: true,
  }
);

export default DeathInfo;
