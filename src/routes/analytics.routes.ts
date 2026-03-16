import { Router } from "express";
import { analyticsController } from "@/controllers";

const router = Router();

router.get("/gender-distribution", analyticsController.genderDistribution);
router.get(
  "/gender-distribution/details",
  analyticsController.genderDistributionDetails
);
router.get("/age-demographics", analyticsController.ageDemographics);
router.get(
  "/age-demographics/details",
  analyticsController.ageDemographicsDetails
);
router.get("/assistance", analyticsController.assistanceTotals);
router.get("/assistance/details", analyticsController.assistanceTotalsDetails);
router.get("/vaccines", analyticsController.vaccineCoverage);
router.get("/vaccines/details", analyticsController.vaccineCoverageDetails);
router.get("/users-per-role", analyticsController.usersPerRole);
router.get(
  "/users-per-role/details",
  analyticsController.usersPerRoleDetails
);
router.get("/users-per-barangay", analyticsController.usersPerBarangay);
router.get(
  "/users-per-barangay/details",
  analyticsController.usersPerBarangayDetails
);
router.get("/dead-alive-count", analyticsController.deadAliveCount);
router.get(
  "/dead-alive-count/details",
  analyticsController.deadAliveCountDetails
);

export default router;


