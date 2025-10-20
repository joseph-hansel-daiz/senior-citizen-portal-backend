import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorRealImmovableProperty extends Model<InferAttributes<SeniorRealImmovableProperty>, InferCreationAttributes<SeniorRealImmovableProperty>> {
  declare seniorId: number;
  declare realImmovablePropertyId: number;
}

SeniorRealImmovableProperty.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "EconomicProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    realImmovablePropertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "RealImmovableProperty", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorRealImmovableProperty",
    tableName: "SeniorRealImmovableProperty",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorRealImmovableProperty;
