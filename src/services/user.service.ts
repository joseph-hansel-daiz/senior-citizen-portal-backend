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

  async updateProfile(userId: string, name?: string, photo?: Blob | null) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    user.set({
      name: name ?? user.name,
      ...(photo !== undefined ? { photo } : {}),
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
    photo?: Blob | null;
  }) {
    const { username, password, name, role = "viewOnly", barangayId, photo } = data;

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
      photo: photo ?? undefined,
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
        // photo may be large; include only if needed by clients
      },
    };
  }

  async updateUser(id: string, payload: {
    name?: string;
    role?: UserRole;
    barangayId?: number | null;
    photo?: Blob | null;
  }) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    const nextRole = payload.role ?? user.role;
    if (!ALLOWED_ROLES.includes(nextRole)) {
      throw new Error("Invalid role");
    }

    let resolvedBarangayId: number | null = user.barangayId ?? null;
    if (nextRole === "barangay") {
      const idToUse = payload.barangayId ?? user.barangayId;
      if (!idToUse) {
        throw new Error("barangayId is required when role is 'barangay'");
      }
      const barangay = await Barangay.findByPk(Number(idToUse));
      if (!barangay) {
        throw new Error("Barangay not found");
      }
      resolvedBarangayId = Number(idToUse);
    } else {
      resolvedBarangayId = null;
    }

    user.set({
      name: payload.name ?? user.name,
      role: nextRole,
      barangayId: resolvedBarangayId,
      ...(payload.photo !== undefined ? { photo: payload.photo } : {}),
    });
    await user.save();

    return User.findByPk(id, { attributes: { exclude } });
  }

  async deleteUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    return { success: true };
  }

  async updateMyPassword(userId: string, newPassword: string) {
    if (!newPassword) {
      throw new Error("Password is required");
    }
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");
    user.set({ password: newPassword });
    await user.save();
    return { success: true };
  }

  async updateUserPassword(id: string, newPassword: string) {
    if (!newPassword) {
      throw new Error("Password is required");
    }
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    user.set({ password: newPassword });
    await user.save();
    return { success: true };
  }
}

export const userService = new UserService();
