import { Router } from "express";
import { seniorController } from "@/controllers";
import { requireAuthentication, upload } from "@/middleware";

const router = Router();

// router.use(requireAuthentication);

// GET /seniors - List all seniors
router.get("/", seniorController.list);

// GET /seniors/:id - Get senior by ID
router.get("/:id", seniorController.detail);

// POST /seniors - Create new senior
router.post("/", upload.single("photo"), seniorController.create);

// PUT /seniors/:id - Update senior
router.put("/:id", upload.single("photo"), seniorController.update);

// DELETE /seniors/:id - Delete senior (soft delete)
router.delete("/:id", seniorController.remove);

// POST /seniors/:id/mark-deceased - Mark senior as deceased
router.post("/:id/mark-deceased", upload.single("deathCertificate"), seniorController.markDeceased);

// DELETE /seniors/:id/unmark-deceased - Unmark senior as deceased
router.delete("/:id/unmark-deceased", seniorController.unmarkDeceased);

// POST /seniors/:id/approve - Approve senior
router.post("/:id/approve", seniorController.approve);

// POST /seniors/:id/decline - Decline senior
router.post("/:id/decline", seniorController.decline);

export default router;
