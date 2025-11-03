import { Request, Response, NextFunction } from "express";
import { User } from "@/models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  user?: any;
}

const requireAuthentication = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Missing Authorization header" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Invalid Authorization header" });

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey"
    ) as any;

    // Fetch user from DB to enrich payload with barangayId (and ensure user exists)
    const dbUser = await User.findByPk(payload.id);
    if (!dbUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = {
      ...payload,
      barangayId: dbUser.barangayId ?? null,
    };

    next();
  } catch (err: any) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: err.message });
  }
};

export default requireAuthentication;
