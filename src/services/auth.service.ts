import jwt from "jsonwebtoken";
import { User } from "@/models";

export class AuthService {
  private readonly jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "supersecretkey";
  }

  async login(username: string, password: string) {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const ok = await user.validPassword(password);
    if (!ok) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, email: user.username, role: user.role },
      this.jwtSecret
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        barangayId: user.barangayId,
        logo: user.logo,
      },
    };
  }
}

export const authService = new AuthService();
