import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

export interface PersonalMovablePropertyAttributes {
  id: number;
  name: string;
}

export interface PersonalMovablePropertyCreationAttributes
  extends Optional<PersonalMovablePropertyAttributes, "id"> {}

class PersonalMovableProperty
  extends Model<PersonalMovablePropertyAttributes, PersonalMovablePropertyCreationAttributes>
  implements PersonalMovablePropertyAttributes
{
  public id!: number;
  public name!: string;
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
