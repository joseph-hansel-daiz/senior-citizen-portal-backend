import { Request, Response } from "express";
import { authService, passwordResetService } from "@/services";

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

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const result = await passwordResetService.requestPasswordReset(username);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const listResetCodes = async (_req: Request, res: Response) => {
  try {
    const codes = await passwordResetService.listResetCodes();
    res.json(codes);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { code, password } = req.body;
    const result = await passwordResetService.resetPassword(code, password);
    res.json(result);
  } catch (err: any) {
    if (err.message.includes("required") || err.message.includes("Invalid")) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};
