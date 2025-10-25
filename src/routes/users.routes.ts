import { Router } from "express";
import { userController } from "@/controllers";
import { requireAuthentication, requireAdmin, upload } from "@/middleware";

const router = Router();

router.use(requireAuthentication);

router.post(
  "/register",
  requireAuthentication,
  requireAdmin,
  userController.register
);
router.get("/me", requireAuthentication, userController.profile);
router.put("/me", requireAuthentication, userController.updateProfile);
router.get("/", requireAuthentication, requireAdmin, userController.list);
router.get("/:id", requireAuthentication, requireAdmin, userController.detail);

export default router;
