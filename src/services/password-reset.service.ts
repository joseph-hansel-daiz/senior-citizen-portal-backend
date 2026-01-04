import { User, PasswordResetCode } from "@/models";
import * as argon2 from "argon2";

export class PasswordResetService {
  /**
   * Generate a random 6-digit code
   */
  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Request password reset - generates code for user
   * Only one code per user - if exists, returns existing code
   */
  async requestPasswordReset(username: string) {
    if (!username) {
      throw new Error("Username is required");
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      // Don't reveal if user exists for security
      return { success: true, message: "If the username exists, a reset code has been generated" };
    }

    // Check if code already exists for this user
    let resetCode = await PasswordResetCode.findOne({ where: { userId: user.id } });
    
    if (resetCode) {
      // Return existing code
      return {
        success: true,
        message: "If the username exists, a reset code has been generated",
        code: resetCode.code, // Only for admin viewing
      };
    }

    // Generate new code
    let code = this.generateCode();
    // Ensure code is unique
    while (await PasswordResetCode.findOne({ where: { code } })) {
      code = this.generateCode();
    }

    // Create reset code
    resetCode = await PasswordResetCode.create({
      userId: user.id,
      code,
    });

    return {
      success: true,
      message: "If the username exists, a reset code has been generated",
      code: resetCode.code, // Only for admin viewing
    };
  }

  /**
   * List all password reset codes (admin only)
   */
  async listResetCodes() {
    const codes = await PasswordResetCode.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return codes.map((code) => ({
      id: code.id,
      userId: code.userId,
      code: code.code,
      username: (code as any).User?.username,
      userName: (code as any).User?.name,
      createdAt: code.createdAt,
    }));
  }

  /**
   * Reset password using code
   */
  async resetPassword(code: string, newPassword: string) {
    if (!code || !newPassword) {
      throw new Error("Code and password are required");
    }

    const resetCode = await PasswordResetCode.findOne({
      where: { code },
    });

    if (!resetCode) {
      throw new Error("Invalid reset code");
    }

    // Fetch the user separately
    const user = await User.findByPk(resetCode.userId);
    if (!user) {
      throw new Error("User not found for this code");
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Delete the reset code after successful password change
    await resetCode.destroy();

    return { success: true, message: "Password has been reset successfully" };
  }
}

export const passwordResetService = new PasswordResetService();

