import { Request, Response } from "express";
import { userService } from "@/services";

export const list = async (_req: Request, res: Response) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err: any) {
    if (err.message === "User not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const profile = async (req: any, res: Response) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json(user);
  } catch (err: any) {
    if (err.message === "User not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { name } = req.body;
    const updatedUser = await userService.updateProfile(req.user.id, name);
    res.json(updatedUser);
  } catch (err: any) {
    if (err.message === "User not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const {
      username,
      password,
      name,
      role,
      barangayId,
      logoBase64,
    } = req.body;

    // Prepare optional logo
    let logoBuffer: Buffer | undefined;
    if ((req as any).file?.buffer) {
      logoBuffer = (req as any).file.buffer as Buffer;
    } else if (logoBase64) {
      try {
        logoBuffer = Buffer.from(
          logoBase64.replace(/^data:[\w/]+;base64,/, ""),
          "base64"
        );
      } catch {
        return res.status(400).json({ message: "Invalid logoBase64" });
      }
    }

    const result = await userService.register({
      username,
      password,
      name,
      role,
      barangayId: barangayId ? Number(barangayId) : undefined,
      logo: logoBuffer,
    });

    return res.status(201).json(result);
  } catch (err: any) {
    if (err.message.includes("required") || 
        err.message.includes("Invalid") || 
        err.message.includes("already registered")) {
      return res.status(400).json({ message: err.message });
    }
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};