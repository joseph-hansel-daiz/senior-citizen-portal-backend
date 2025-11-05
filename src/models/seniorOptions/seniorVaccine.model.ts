import { DataTypes, InferAttributes, InferCreationAttributes, Model, CreationOptional } from "sequelize";
import sequelize from "../../config/db";

class SeniorVaccine extends Model<InferAttributes<SeniorVaccine>, InferCreationAttributes<SeniorVaccine>> {
  declare id: CreationOptional<number>;
  declare seniorId: number;
  declare VaccineId: number;
  declare vaccineDate: Date | null;
}

SeniorVaccine.init(
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
    VaccineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Vaccine", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    vaccineDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "vaccineDate",
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
