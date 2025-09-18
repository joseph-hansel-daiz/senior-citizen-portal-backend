import { Router } from "express";
import {
  list,
  detail,
  profile,
  updateProfile,
  register,
} from "../controllers/user.controller";
import auth from "../middleware/requireAuthentication";
import requireAdmin from "../middleware/requireAdmin";
import upload from "../middleware/upload";
import requireAuthentication from "../middleware/requireAuthentication";

const router = Router();

router.use(auth);

router.post(
  "/register",
  requireAuthentication,
  requireAdmin,
  upload.single("logo"),
  register
);
router.get("/me", requireAuthentication, profile);
router.put("/me", requireAuthentication, updateProfile);
router.get("/", requireAuthentication, requireAdmin, list);
router.get("/:id", requireAuthentication, requireAdmin, detail);

export default router;
