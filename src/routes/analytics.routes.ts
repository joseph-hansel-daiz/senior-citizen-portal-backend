import { Router } from "express";
import { analyticsController } from "@/controllers";

const router = Router();

router.get("/gender-distribution", analyticsController.genderDistribution);
router.get("/age-demographics", analyticsController.ageDemographics);
router.get("/assistance", analyticsController.assistanceTotals);
router.get("/vaccines", analyticsController.vaccineCoverage);

export default router;


