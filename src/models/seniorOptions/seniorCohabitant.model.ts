import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface SeniorCohabitantAttributes {
  seniorId: number;
  cohabitantId: number;
}

export interface SeniorCohabitantCreationAttributes
  extends Optional<SeniorCohabitantAttributes, never> {}

class SeniorCohabitant
  extends Model<SeniorCohabitantAttributes, SeniorCohabitantCreationAttributes>
  implements SeniorCohabitantAttributes
{
  public seniorId!: number;
  public cohabitantId!: number;
}

SeniorCohabitant.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "seniors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    cohabitantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "cohabitants", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorCohabitant",
    tableName: "seniorCohabitant",
    timestamps: false,
  }
);

export default SeniorCohabitant;
