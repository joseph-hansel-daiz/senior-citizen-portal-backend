import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/db";

class HelpDeskRecordCategoryRecord extends Model<
  InferAttributes<HelpDeskRecordCategoryRecord>,
  InferCreationAttributes<HelpDeskRecordCategoryRecord>
> {
  declare id: CreationOptional<number>;
  declare helpDeskRecordId: number;
  declare helpDeskRecordCategoryId: number;
}

HelpDeskRecordCategoryRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    helpDeskRecordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "HelpDeskRecord", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    helpDeskRecordCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "HelpDeskRecordCategory", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "HelpDeskRecordCategoryRecord",
    tableName: "HelpDeskRecordCategoryRecord",
    timestamps: false,
    underscored: false,
  }
);

export default HelpDeskRecordCategoryRecord;
