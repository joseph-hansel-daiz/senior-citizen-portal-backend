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
    } = req.body;


    const result = await userService.register({
      username,
      password,
      name,
      role,
      barangayId: barangayId ? Number(barangayId) : undefined,
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, role, barangayId } = req.body;
    const updated = await userService.updateUser(req.params.id, {
      name,
      role,
      barangayId: barangayId === undefined ? undefined : (barangayId === null ? null : Number(barangayId)),
    });
    return res.json(updated);
  } catch (err: any) {
    if (err.message.includes("Invalid") || err.message.includes("required")) {
      return res.status(400).json({ message: err.message });
    }
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    return res.json(result);
  } catch (err: any) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body as { password: string };
    const result = await userService.updateUserPassword(req.params.id, password);
    return res.json(result);
  } catch (err: any) {
    if (err.message.includes("required")) {
      return res.status(400).json({ message: err.message });
    }
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};