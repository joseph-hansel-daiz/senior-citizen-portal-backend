import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class HealthProblemAilment extends Model<InferAttributes<HealthProblemAilment>, InferCreationAttributes<HealthProblemAilment>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

HealthProblemAilment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "HealthProblemAilment",
    tableName: "HealthProblemAilment",
    timestamps: false,
    underscored: false,
  }
);

export default HealthProblemAilment;
