import bcrypt from "bcrypt";
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

export type UserRole = "admin" | "barangay" | "osca" | "viewOnly";

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  name: string;
  logo: Blob;              // stored as BLOB in DB
  role: UserRole;
  barangayId?: number | null; // FK → Barangay, required if role = "barangay"
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role" | "logo" | "barangayId"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public name!: string;
  public logo!: Blob;
  public role!: UserRole;
  public barangayId?: number | null;

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
      references: { model: "barangays", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
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
