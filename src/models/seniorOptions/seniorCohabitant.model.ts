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
      references: { model: "DependencyProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    cohabitantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "Cohabitant", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorCohabitant",
    tableName: "SeniorCohabitant",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorCohabitant;
