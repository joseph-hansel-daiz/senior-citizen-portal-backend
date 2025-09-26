import { Request, Response } from "express";
import {
  Cohabitant,
  LivingCondition,
  HighestEducationalAttainment,
  SpecializationTechnicalSkill,
  CommunityInvolvement,
  IncomeAssistanceSource,
  MonthlyIncome,
  RealImmovableProperty,
  PersonalMovableProperty,
  ProblemsNeedsCommonlyEncountered,
  HealthProblemAilment,
  DentalConcern,
  VisualConcern,
  AuralConcern,
  SocialEmotionalConcern,
  AreaOfDifficulty,
  Barangay,
} from "../models";

async function sendList(res: Response, model: any) {
  try {
    const items = await model.findAll();
    return res.json(items);
  } catch (err) {
    console.error("Error fetching options:", err);
    return res.status(500).json({ error: "Failed to fetch options" });
  }
}

export const listCohabitants = async (_req: Request, res: Response) =>
  sendList(res, Cohabitant);

export const listLivingConditions = async (_req: Request, res: Response) =>
  sendList(res, LivingCondition);

export const listHighestEducationalAttainments = async (
  _req: Request,
  res: Response
) => sendList(res, HighestEducationalAttainment);

export const listSpecializationTechnicalSkills = async (
  _req: Request,
  res: Response
) => sendList(res, SpecializationTechnicalSkill);

export const listCommunityInvolvements = async (_req: Request, res: Response) =>
  sendList(res, CommunityInvolvement);

export const listIncomeAssistanceSources = async (
  _req: Request,
  res: Response
) => sendList(res, IncomeAssistanceSource);

export const listMonthlyIncomes = async (_req: Request, res: Response) =>
  sendList(res, MonthlyIncome);

export const listRealImmovableProperties = async (
  _req: Request,
  res: Response
) => sendList(res, RealImmovableProperty);

export const listPersonalMovableProperties = async (
  _req: Request,
  res: Response
) => sendList(res, PersonalMovableProperty);

export const listProblemsNeedsCommonlyEncountered = async (
  _req: Request,
  res: Response
) => sendList(res, ProblemsNeedsCommonlyEncountered);

export const listHealthProblemAilments = async (_req: Request, res: Response) =>
  sendList(res, HealthProblemAilment);

export const listDentalConcerns = async (_req: Request, res: Response) =>
  sendList(res, DentalConcern);

export const listVisualConcerns = async (_req: Request, res: Response) =>
  sendList(res, VisualConcern);

export const listAuralConcerns = async (_req: Request, res: Response) =>
  sendList(res, AuralConcern);

export const listSocialEmotionalConcerns = async (
  _req: Request,
  res: Response
) => sendList(res, SocialEmotionalConcern);

export const listAreaOfDifficulties = async (_req: Request, res: Response) =>
  sendList(res, AreaOfDifficulty);

export const listBarangays = async (_req: Request, res: Response) =>
  sendList(res, Barangay);

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
