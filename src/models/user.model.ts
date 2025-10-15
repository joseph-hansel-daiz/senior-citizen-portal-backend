import bcrypt from "bcrypt";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

export type UserRole = "admin" | "barangay" | "osca" | "viewOnly";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare name: string;
  declare logo: CreationOptional<Blob>;              // stored as BLOB in DB
  declare role: CreationOptional<UserRole>;
  declare barangayId: CreationOptional<number | null>; // FK → Barangay, required if role = "barangay"

  async validPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    logo: { type: DataTypes.BLOB(), allowNull: true },
    role: {
      type: DataTypes.ENUM("admin", "barangay", "osca", "viewOnly"),
      allowNull: false,
      defaultValue: "viewOnly",
    },
    barangayId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Barangay", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User",
    underscored: false,
    hooks: {
      beforeValidate: async (user: User) => {
        // Enforce: barangayId is required if role === 'barangay'
        if (user.role === "barangay") {
          if (!user.barangayId) {
            throw new Error("barangayId is required when role is 'barangay'.");
          }
        } else {
          // Ensure non-barangay users don't carry a stale FK
          user.barangayId = null;
        }
      },
      beforeCreate: async (user: User) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.password && user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

export default User;
