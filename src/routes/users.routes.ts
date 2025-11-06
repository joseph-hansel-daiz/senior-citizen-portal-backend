import { Router } from "express";
import { userController } from "@/controllers";
import { requireAuthentication, requireAdmin, upload } from "@/middleware";

const router = Router();

router.use(requireAuthentication);

router.post(
  "/register",
  requireAuthentication,
  requireAdmin,
  upload.single("photo"),
  userController.register
);
router.get("/me", requireAuthentication, userController.profile);
router.put("/me", requireAuthentication, upload.single("photo"), userController.updateProfile);
router.get("/", requireAuthentication, requireAdmin, userController.list);
router.get("/:id", requireAuthentication, requireAdmin, userController.detail);
router.put("/:id", requireAuthentication, requireAdmin, upload.single("photo"), userController.updateUser);
router.delete("/:id", requireAuthentication, requireAdmin, userController.removeUser);
router.put(
  "/:id/password",
  requireAuthentication,
  requireAdmin,
  userController.updatePassword
);

export default router;
