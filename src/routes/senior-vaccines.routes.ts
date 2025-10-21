import { Router } from "express";
import seniorVaccineController from "@/controllers/senior-vaccine.controller";

const router = Router();

// GET /senior-vaccines/:seniorId
router.get("/:seniorId", seniorVaccineController.listBySenior);

// PUT /senior-vaccines/:seniorId
router.put("/:seniorId", seniorVaccineController.upsert);

// DELETE /senior-vaccines/:seniorId/:vaccineId
router.delete("/:seniorId/:vaccineId", seniorVaccineController.remove);

export default router;


