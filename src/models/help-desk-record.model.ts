import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class HelpDeskRecord extends Model<InferAttributes<HelpDeskRecord>, InferCreationAttributes<HelpDeskRecord>> {
  declare id: CreationOptional<number>;
  declare seniorId: number;
  declare details: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
  declare deletedBy: CreationOptional<number | null>;
}

HelpDeskRecord.init(
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
      onDelete: "RESTRICT",
    },
    details: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "User", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "HelpDeskRecord",
    tableName: "HelpDeskRecord",
    underscored: false,
    timestamps: true,
    paranoid: true,
  }
);

export default HelpDeskRecord;
