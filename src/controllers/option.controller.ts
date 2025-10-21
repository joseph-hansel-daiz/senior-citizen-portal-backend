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

export const createOption = async (req: Request, res: Response) => {
  try {
    const key = req.params.key;
    const { name } = req.body || {};
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "'name' is required" });
    }
    const created = await optionService.createOption(key, name.trim());
    return res.status(201).json(created);
  } catch (err: any) {
    console.error("Error creating option:", err);
    return res.status(500).json({ error: err.message || "Failed to create option" });
  }
};

export const updateOption = async (req: Request, res: Response) => {
  try {
    const key = req.params.key;
    const id = Number(req.params.id);
    const { name } = req.body || {};
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "'name' is required" });
    }
    const updated = await optionService.updateOption(key, id, name.trim());
    return res.json(updated);
  } catch (err: any) {
    if (String(err?.message || "").includes("Not found")) {
      return res.status(404).json({ error: "Not found" });
    }
    console.error("Error updating option:", err);
    return res.status(500).json({ error: err.message || "Failed to update option" });
  }
};

export const deleteOption = async (req: Request, res: Response) => {
  try {
    const key = req.params.key;
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const deleted = await optionService.deleteOption(key, id);
    if (deleted === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.status(204).send();
  } catch (err: any) {
    console.error("Error deleting option:", err);
    return res.status(500).json({ error: err.message || "Failed to delete option" });
  }
};

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

export const listHelpDeskRecordCategories = async (
  _req: Request,
  res: Response
) => handleOptionRequest(res, () => optionService.getHelpDeskRecordCategories());

export const listVaccines = async (_req: Request, res: Response) =>
  handleOptionRequest(res, () => optionService.getVaccines());

export default {
  createOption,
  updateOption,
  deleteOption,
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
  listHelpDeskRecordCategories,
  listVaccines,
};
