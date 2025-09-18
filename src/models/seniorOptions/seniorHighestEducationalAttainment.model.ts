import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorHighestEducationalAttainmentAttributes {
  seniorId: number;
  highestEducationalAttainmentId: number;
}

export interface SeniorHighestEducationalAttainmentCreationAttributes
  extends Optional<SeniorHighestEducationalAttainmentAttributes, never> {}

class SeniorHighestEducationalAttainment
  extends Model<SeniorHighestEducationalAttainmentAttributes, SeniorHighestEducationalAttainmentCreationAttributes>
  implements SeniorHighestEducationalAttainmentAttributes
{
  public seniorId!: number;
  public highestEducationalAttainmentId!: number;
}

SeniorHighestEducationalAttainment.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "seniors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    highestEducationalAttainmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "highestEducationalAttainments", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorHighestEducationalAttainment",
    tableName: "seniorHighestEducationalAttainment",
    timestamps: false,
  }
);

export default SeniorHighestEducationalAttainment;
