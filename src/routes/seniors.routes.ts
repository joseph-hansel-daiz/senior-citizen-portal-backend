import { Router } from "express";
import { seniorController } from "@/controllers";
import { requireAuthentication } from "@/middleware";

const router = Router();

// router.use(requireAuthentication);

// GET /seniors - List all seniors
router.get("/", seniorController.list);

// GET /seniors/:id - Get senior by ID
router.get("/:id", seniorController.detail);

// POST /seniors - Create new senior
router.post("/", seniorController.create);

// PUT /seniors/:id - Update senior
router.put("/:id", seniorController.update);

// DELETE /seniors/:id - Delete senior (soft delete)
router.delete("/:id", seniorController.remove);

export default router;
