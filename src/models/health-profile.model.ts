import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class HealthProfile extends Model<InferAttributes<HealthProfile>, InferCreationAttributes<HealthProfile>> {
  declare seniorId: number;
  declare bloodType: 'O' | 'O+' | 'O-' | 'A' | 'A+' | 'A-';
  declare physicalDisability: CreationOptional<string>;
  declare listMedicines: CreationOptional<string>;
  declare checkUp: boolean;
  declare scheduleCheckUp: 'Monthly' | 'Every 3 Months' | 'Every 6 Months' | 'Annually';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare createdBy: CreationOptional<number | null>;
  declare updatedBy: CreationOptional<number | null>;
}

HealthProfile.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    bloodType: {
      type: DataTypes.ENUM('O', 'O+', 'O-', 'A', 'A+', 'A-'),
      allowNull: false,
    },
    physicalDisability: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    listMedicines: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    checkUp: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    scheduleCheckUp: {
      type: DataTypes.ENUM('Monthly', 'Every 3 Months', 'Every 6 Months', 'Annually'),
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
    modelName: "HealthProfile",
    tableName: "HealthProfile",
    underscored: false,
    timestamps: true,
  }
);

export default HealthProfile;
