import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorVaccine extends Model<InferAttributes<SeniorVaccine>, InferCreationAttributes<SeniorVaccine>> {
  declare seniorId: number;
  declare VaccineId: number;
  declare lastVaccineDate: Date | null;
}

SeniorVaccine.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "Senior", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    VaccineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "Vaccine", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    lastVaccineDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "lastVaccineDate",
    },
  },
  {
    sequelize,
    modelName: "SeniorVaccine",
    tableName: "SeniorVaccine",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorVaccine;
