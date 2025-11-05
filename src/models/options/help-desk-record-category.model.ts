import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/db";

class HelpDeskRecordCategory extends Model<InferAttributes<HelpDeskRecordCategory>, InferCreationAttributes<HelpDeskRecordCategory>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

HelpDeskRecordCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "HelpDeskRecordCategory",
    tableName: "HelpDeskRecordCategory",
    underscored: false,
    timestamps: false,
  }
);

export default HelpDeskRecordCategory;
