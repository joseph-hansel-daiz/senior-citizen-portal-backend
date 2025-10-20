import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class AuralConcern extends Model<InferAttributes<AuralConcern>, InferCreationAttributes<AuralConcern>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

AuralConcern.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "AuralConcern",
    tableName: "AuralConcern",
    timestamps: false,
    underscored: false,
  }
);

export default AuralConcern;
