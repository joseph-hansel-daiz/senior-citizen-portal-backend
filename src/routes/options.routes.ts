import { Router } from "express";

import { optionController } from "@/controllers";

const router = Router();

router.get("/area-of-difficulties", optionController.listAreaOfDifficulties);
router.get("/aural-concerns", optionController.listAuralConcerns);
router.get("/cohabitants", optionController.listCohabitants);
router.get("/community-involvements", optionController.listCommunityInvolvements);
router.get("/dental-concerns", optionController.listDentalConcerns);
router.get("/health-problems", optionController.listHealthProblemAilments);
router.get("/educational-attainments", optionController.listHighestEducationalAttainments);
router.get("/income-sources", optionController.listIncomeAssistanceSources);
router.get("/living-conditions", optionController.listLivingConditions);
router.get("/monthly-incomes", optionController.listMonthlyIncomes);
router.get("/personal-properties", optionController.listPersonalMovableProperties);
router.get("/problems-needs", optionController.listProblemsNeedsCommonlyEncountered);
router.get("/real-properties", optionController.listRealImmovableProperties);
router.get("/social-emotional-concerns", optionController.listSocialEmotionalConcerns);
router.get("/technical-skills", optionController.listSpecializationTechnicalSkills);
router.get("/visual-concerns", optionController.listVisualConcerns);

router.get(
  "/help-desk-record-categories",
  optionController.listHelpDeskRecordCategories
);

export default router;
