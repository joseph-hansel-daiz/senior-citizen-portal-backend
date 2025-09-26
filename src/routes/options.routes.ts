import { Router } from "express";

import {
  listAreaOfDifficulties,
  listAuralConcerns,
  listCohabitants,
  listCommunityInvolvements,
  listDentalConcerns,
  listHealthProblemAilments,
  listHighestEducationalAttainments,
  listIncomeAssistanceSources,
  listLivingConditions,
  listMonthlyIncomes,
  listPersonalMovableProperties,
  listProblemsNeedsCommonlyEncountered,
  listRealImmovableProperties,
  listSocialEmotionalConcerns,
  listSpecializationTechnicalSkills,
  listVisualConcerns,
} from "../controllers/option.controller";

const router = Router();

router.get("/area-of-difficulties", listAreaOfDifficulties);
router.get("/aural-concerns", listAuralConcerns);
router.get("/cohabitants", listCohabitants);
router.get("/community-involvements", listCommunityInvolvements);
router.get("/dental-concerns", listDentalConcerns);
router.get("/health-problems", listHealthProblemAilments);
router.get("/educational-attainments", listHighestEducationalAttainments);
router.get("/income-sources", listIncomeAssistanceSources);
router.get("/living-conditions", listLivingConditions);
router.get("/monthly-incomes", listMonthlyIncomes);
router.get("/personal-properties", listPersonalMovableProperties);
router.get("/problems-needs", listProblemsNeedsCommonlyEncountered);
router.get("/real-properties", listRealImmovableProperties);
router.get("/social-emotional-concerns", listSocialEmotionalConcerns);
router.get("/technical-skills", listSpecializationTechnicalSkills);
router.get("/visual-concerns", listVisualConcerns);

export default router;
