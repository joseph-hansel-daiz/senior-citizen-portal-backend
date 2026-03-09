import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/db";

class AuditLog extends Model<
  InferAttributes<AuditLog>,
  InferCreationAttributes<AuditLog>
> {
  declare id: CreationOptional<number>;
  declare actorId: CreationOptional<number | null>;
  declare action: string;
  declare entityType: string;
  declare entityId: CreationOptional<number | null>;
  declare seniorId: CreationOptional<number | null>;
  declare metadata: CreationOptional<Record<string, any> | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    actorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "User", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    entityType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    metadata: {
      type: DataTypes.JSONB,
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
  },
  {
    sequelize,
    modelName: "AuditLog",
    tableName: "AuditLog",
    underscored: false,
    timestamps: true,
  }
);

export default AuditLog;

