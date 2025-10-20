import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class PersonalMovableProperty extends Model<InferAttributes<PersonalMovableProperty>, InferCreationAttributes<PersonalMovableProperty>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

PersonalMovableProperty.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "PersonalMovableProperty",
    tableName: "PersonalMovableProperty",
    timestamps: false,
    underscored: false,
  }
);

export default PersonalMovableProperty;
