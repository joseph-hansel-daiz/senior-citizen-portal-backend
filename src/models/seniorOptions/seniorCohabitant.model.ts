import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorCohabitant extends Model<InferAttributes<SeniorCohabitant>, InferCreationAttributes<SeniorCohabitant>> {
  declare seniorId: number;
  declare cohabitantId: number;
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
