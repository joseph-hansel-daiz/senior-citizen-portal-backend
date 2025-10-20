import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";
import sequelize from "../../config/db";

class ProblemsNeedsCommonlyEncountered extends Model<InferAttributes<ProblemsNeedsCommonlyEncountered>, InferCreationAttributes<ProblemsNeedsCommonlyEncountered>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

ProblemsNeedsCommonlyEncountered.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "ProblemsNeedsCommonlyEncountered",
    tableName: "ProblemsNeedsCommonlyEncountered",
    timestamps: false,
    underscored: false,
  }
);

export default ProblemsNeedsCommonlyEncountered;
