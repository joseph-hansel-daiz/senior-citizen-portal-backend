import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class HighestEducationalAttainment extends Model<InferAttributes<HighestEducationalAttainment>, InferCreationAttributes<HighestEducationalAttainment>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

HighestEducationalAttainment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "HighestEducationalAttainment",
    tableName: "HighestEducationalAttainment",
    timestamps: false,
    underscored: false,
  }
);

export default HighestEducationalAttainment;
