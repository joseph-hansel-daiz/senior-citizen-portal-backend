import { DataTypes, InferAttributes, InferCreationAttributes, Model, CreationOptional } from "sequelize";
import sequelize from "../../config/db";

class SeniorAssistance extends Model<InferAttributes<SeniorAssistance>, InferCreationAttributes<SeniorAssistance>> {
  declare id: CreationOptional<number>;
  declare seniorId: number;
  declare assistanceId: number;
  declare assistanceDate: Date | null;
}

SeniorAssistance.init(
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
    assistanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Assistance", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    assistanceDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "assistanceDate",
    },
  },
  {
    sequelize,
    modelName: "SeniorAssistance",
    tableName: "SeniorAssistance",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorAssistance;
