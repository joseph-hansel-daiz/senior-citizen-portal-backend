import { Request, Response } from "express";
import { authService } from "@/services";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.json(result);
  } catch (err: any) {
    if (
      err.message === "Invalid credentials" ||
      err.message === "Username and password are required"
    ) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};
