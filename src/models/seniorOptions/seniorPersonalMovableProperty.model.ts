import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class SeniorPersonalMovableProperty extends Model<InferAttributes<SeniorPersonalMovableProperty>, InferCreationAttributes<SeniorPersonalMovableProperty>> {
  declare seniorId: number;
  declare personalMovablePropertieId: number;
}

SeniorPersonalMovableProperty.init(
  {
    seniorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "EconomicProfile", key: "seniorId" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    personalMovablePropertieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "PersonalMovableProperty", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SeniorPersonalMovableProperty",
    tableName: "SeniorPersonalMovableProperty",
    timestamps: false,
    underscored: false,
  }
);

export default SeniorPersonalMovableProperty;
