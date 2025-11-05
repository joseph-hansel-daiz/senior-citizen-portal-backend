import { Router } from "express";
import seniorAssistanceController from "@/controllers/senior-assistance.controller";

const router = Router();

// GET /senior-assistances/:seniorId
router.get("/:seniorId", seniorAssistanceController.listBySenior);

// PUT /senior-assistances/:seniorId
router.put("/:seniorId", seniorAssistanceController.upsert);

// DELETE /senior-assistances/:seniorId/:assistanceId
router.delete("/:seniorId/:assistanceId", seniorAssistanceController.remove);

export default router;


