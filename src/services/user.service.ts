import jwt from "jsonwebtoken";
import { User, Barangay } from "@/models";
import type { UserRole } from "@/models/user.model";

const ALLOWED_ROLES: UserRole[] = ["admin", "barangay", "osca", "viewOnly"];
const exclude = ["password", "createdAt", "updatedAt"];

export class UserService {
  private readonly jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "supersecretkey";
  }

  async listUsers() {
    return User.findAll({ attributes: { exclude } });
  }

  async getUserById(id: string) {
    const user = await User.findByPk(id, {
      attributes: { exclude },
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  async getUserProfile(userId: string) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateProfile(userId: string, name: string) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    user.set({
      name: name ?? user.name,
    });
    await user.save();

    return User.findByPk(userId, {
      attributes: { exclude },
    });
  }

  async register(data: {
    username: string;
    password: string;
    name: string;
    role?: UserRole;
    barangayId?: number;
  }) {
    const { username, password, name, role = "viewOnly", barangayId } = data;

    if (!username || !password || !name) {
      throw new Error("username, password, and name are required");
    }

    if (!ALLOWED_ROLES.includes(role)) {
      throw new Error("Invalid role");
    }

    // If role is barangay, barangayId must be provided and valid
    let resolvedBarangayId: number | null = null;
    if (role === "barangay") {
      if (!barangayId) {
        throw new Error("barangayId is required when role is 'barangay'");
      }
      const barangay = await Barangay.findByPk(Number(barangayId));
      if (!barangay) {
        throw new Error("Barangay not found");
      }
      resolvedBarangayId = Number(barangayId);
    }

    // Enforce unique username
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      throw new Error("Username already registered");
    }

    // Create the user (password hashing handled by model hooks)
    const user = await User.create({
      username,
      password,
      name,
      role,
      barangayId: resolvedBarangayId,
    });

    // Sign JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      this.jwtSecret
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        barangayId: user.barangayId ?? null,
      },
    };
  }
}

export const userService = new UserService();
