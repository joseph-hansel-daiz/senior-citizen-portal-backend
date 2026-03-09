import { Router } from "express";
import { auditLogController } from "@/controllers";
import { requireAdmin } from "@/middleware";

const router = Router();

// Admin-only audit log listing
router.get("/", requireAdmin, auditLogController.list);
router.get("/senior/:seniorId", requireAdmin, auditLogController.listBySenior);

export default router;

