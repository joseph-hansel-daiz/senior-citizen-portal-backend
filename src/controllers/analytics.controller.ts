import { Request, Response } from "express";
import { analyticsService } from "@/services";

function resolveBarangayId(req: Request): number | undefined {
  const user = (req as any).user;
  const isBarangay = user?.role === "barangay";
  return isBarangay ? Number(user?.barangayId) : undefined;
}

export const genderDistribution = async (req: Request, res: Response) => {
  try {
    const barangayId = resolveBarangayId(req);
    const data = await analyticsService.genderDistribution({ barangayId });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const genderDistributionDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const barangayId = resolveBarangayId(req);
    const sexAtBirth = String(req.query.sexAtBirth || "");
    const data = await analyticsService.genderDistributionDetails({
      barangayId,
      sexAtBirth,
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const ageDemographics = async (req: Request, res: Response) => {
  try {
    const barangayId = resolveBarangayId(req);
    const data = await analyticsService.ageDemographics({ barangayId });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const ageDemographicsDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const barangayId = resolveBarangayId(req);
    const bucket = String(req.query.bucket || "");
    const data = await analyticsService.ageDemographicsDetails({
      barangayId,
      bucket,
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const assistanceTotals = async (req: Request, res: Response) => {
  try {
    const barangayId = resolveBarangayId(req);
    const data = await analyticsService.assistanceTotals({ barangayId });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const assistanceTotalsDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const barangayId = resolveBarangayId(req);
    const assistanceId = Number(req.query.assistanceId);
    const data = await analyticsService.assistanceTotalsDetails({
      barangayId,
      assistanceId: Number.isNaN(assistanceId) ? undefined : assistanceId,
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const vaccineCoverage = async (req: Request, res: Response) => {
  try {
    const barangayId = resolveBarangayId(req);
    const data = await analyticsService.vaccineCoverage({ barangayId });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const vaccineCoverageDetails = async (req: Request, res: Response) => {
  try {
    const barangayId = resolveBarangayId(req);
    const vaccineId = Number(req.query.vaccineId);
    const data = await analyticsService.vaccineCoverageDetails({
      barangayId,
      vaccineId: Number.isNaN(vaccineId) ? undefined : vaccineId,
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const usersPerRole = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    const data = await analyticsService.usersPerRole();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const usersPerRoleDetails = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (user?.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }
    const role = String(req.query.role || "");
    const data = await analyticsService.usersPerRoleDetails({ role });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const usersPerBarangay = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    const data = await analyticsService.usersPerBarangay();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const usersPerBarangayDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;
    if (user?.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }
    const barangayId =
      typeof req.query.barangayId === "string"
        ? Number(req.query.barangayId)
        : undefined;
    const data = await analyticsService.usersPerBarangayDetails({
      barangayId: Number.isNaN(barangayId as number)
        ? undefined
        : (barangayId as number | undefined),
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deadAliveCount = async (req: Request, res: Response) => {
  try {
    const barangayId = resolveBarangayId(req);
    const data = await analyticsService.deadAliveCount({ barangayId });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deadAliveCountDetails = async (req: Request, res: Response) => {
  try {
    const barangayId = resolveBarangayId(req);
    const status = String(req.query.status || "");
    const data = await analyticsService.deadAliveCountDetails({
      barangayId,
      status,
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


