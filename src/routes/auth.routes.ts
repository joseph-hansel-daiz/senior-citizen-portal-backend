import { Router } from "express";
import { authController } from "@/controllers";
import { requireAuthentication, requireAdmin } from "@/middleware";

const router = Router();

router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.get("/reset-codes", requireAuthentication, requireAdmin, authController.listResetCodes);
router.post("/reset-password", authController.resetPassword);

export default router;
