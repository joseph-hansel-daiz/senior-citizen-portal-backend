import { Request, Response } from "express";
import User, { UserRole } from "../models/user.model";
import jwt from "jsonwebtoken";
import Barangay from "../models/barangay.model";

const exclude = ["password", "logo", "createdAt", "updatedAt"];

export const list = async (_req: Request, res: Response) => {
  const users = await User.findAll({ attributes: { exclude: exclude } });
  res.json(users);
};

export const detail = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: exclude },
  });
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
};

export const profile = async (req: any, res: Response) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { name } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.set({
      name: name ?? user.name,
    });
    await user.save();

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: exclude },
    });

    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const ALLOWED_ROLES: UserRole[] = ["admin", "barangay", "osca", "viewOnly"];

export const register = async (req: Request, res: Response) => {
  try {
    const {
      username,
      password,
      name,
      role = "viewOnly",
      barangayId,
      logoBase64,
    } = req.body;

    // Basic validation
    if (!username || !password || !name) {
      return res
        .status(400)
        .json({ message: "username, password, and name are required" });
    }

    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // If role is barangay, barangayId must be provided and valid
    let resolvedBarangayId: number | null = null;
    if (role === "barangay") {
      if (!barangayId) {
        return res
          .status(400)
          .json({ message: "barangayId is required when role is 'barangay'" });
      }
      const barangay = await Barangay.findByPk(Number(barangayId));
      if (!barangay) {
        return res.status(404).json({ message: "Barangay not found" });
      }
      resolvedBarangayId = Number(barangayId);
    }

    // Enforce unique username
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ message: "Username already registered" });
    }

    // Prepare optional logo
    // Supports: (a) multipart file via multer as req.file, or (b) base64 string via body.logoBase64
    let logoBuffer: Buffer | undefined;
    if ((req as any).file?.buffer) {
      logoBuffer = (req as any).file.buffer as Buffer;
    } else if (logoBase64) {
      try {
        logoBuffer = Buffer.from(
          logoBase64.replace(/^data:\w+\/\w+;base64,/, ""),
          "base64"
        );
      } catch {
        return res.status(400).json({ message: "Invalid logoBase64" });
      }
    }

    // Create the user (password hashing handled by model hooks)
    const user = await User.create({
      username,
      password,
      name,
      role, // defaults to 'viewOnly' if not supplied
      barangayId: resolvedBarangayId,
      ...(logoBuffer ? { logo: logoBuffer as unknown as Blob } : {}),
    });

    // Sign JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "supersecretkey" // ⚠️ replace in production
    );

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        barangayId: user.barangayId ?? null,
      },
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
