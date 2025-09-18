import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

export interface SeniorAttributes {
  id: number;
  isDeleted: boolean;
  barangayId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  deletedBy?: number | null;
}

export interface SeniorCreationAttributes
  extends Optional<
    SeniorAttributes,
    | "id"
    | "isDeleted"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
    | "createdBy"
    | "updatedBy"
    | "deletedBy"
  > {}

class Senior
  extends Model<SeniorAttributes, SeniorCreationAttributes>
  implements SeniorAttributes
{
  public id!: number;
  public isDeleted!: boolean;
  public barangayId!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;
  public createdBy?: number | null;
  public updatedBy?: number | null;
  public deletedBy?: number | null;
}

Senior.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    barangayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "barangays", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
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
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "Senior",
    tableName: "seniors",
    timestamps: true, // Sequelize will manage createdAt + updatedAt
    paranoid: true, // enables deletedAt for soft deletes
    underscored: true,
  }
);

export default Senior;
