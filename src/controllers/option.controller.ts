import { Request, Response } from "express";
import { optionService } from "@/services";

async function handleOptionRequest(
  res: Response,
  serviceCall: () => Promise<any>
) {
  try {
    const items = await serviceCall();
    return res.json(items);
  } catch (err: any) {
    console.error("Error fetching options:", err);
    return res.status(500).json({ error: "Failed to fetch options" });
  }
}

export const listCohabitants = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getCohabitants());

export const listLivingConditions = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getLivingConditions());

export const listHighestEducationalAttainments = async (
  _req: Request,
  res: Response
) =>
  handleOptionRequest(res, () =>
    optionService.getHighestEducationalAttainments()
  );

export const listSpecializationTechnicalSkills = async (
  _req: Request,
  res: Response
) =>
  handleOptionRequest(res, () =>
    optionService.getSpecializationTechnicalSkills()
  );

export const listCommunityInvolvements = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getCommunityInvolvements());

export const listIncomeAssistanceSources = async (
  _req: Request,
  res: Response
) => handleOptionRequest(res, () => optionService.getIncomeAssistanceSources());

export const listMonthlyIncomes = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getMonthlyIncomes());

export const listRealImmovableProperties = async (
  _req: Request,
  res: Response
) => handleOptionRequest(res, () => optionService.getRealImmovableProperties());

export const listPersonalMovableProperties = async (
  _req: Request,
  res: Response
) =>
  handleOptionRequest(res, () => optionService.getPersonalMovableProperties());

export const listProblemsNeedsCommonlyEncountered = async (
  _req: Request,
  res: Response
) =>
  handleOptionRequest(res, () =>
    optionService.getProblemsNeedsCommonlyEncountered()
  );

export const listHealthProblemAilments = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getHealthProblemAilments());

export const listDentalConcerns = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getDentalConcerns());

export const listVisualConcerns = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getVisualConcerns());

export const listAuralConcerns = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getAuralConcerns());

export const listSocialEmotionalConcerns = async (
  _req: Request,
  res: Response
) => handleOptionRequest(res, () => optionService.getSocialEmotionalConcerns());

export const listAreaOfDifficulties = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getAreaOfDifficulties());

export const listBarangays = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getBarangays());

export default {
  listCohabitants,
  listLivingConditions,
  listHighestEducationalAttainments,
  listSpecializationTechnicalSkills,
  listCommunityInvolvements,
  listIncomeAssistanceSources,
  listMonthlyIncomes,
  listRealImmovableProperties,
  listPersonalMovableProperties,
  listProblemsNeedsCommonlyEncountered,
  listHealthProblemAilments,
  listDentalConcerns,
  listVisualConcerns,
  listAuralConcerns,
  listSocialEmotionalConcerns,
  listAreaOfDifficulties,
  listBarangays,
};
