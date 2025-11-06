import { Router } from "express";
import { analyticsController } from "@/controllers";

const router = Router();

router.get("/gender-distribution", analyticsController.genderDistribution);
router.get("/age-demographics", analyticsController.ageDemographics);
router.get("/assistance", analyticsController.assistanceTotals);
router.get("/vaccines", analyticsController.vaccineCoverage);
router.get("/users-per-role", analyticsController.usersPerRole);
router.get("/users-per-barangay", analyticsController.usersPerBarangay);

export default router;


