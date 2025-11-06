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

export const ageDemographics = async (req: Request, res: Response) => {
  try {
    const barangayId = resolveBarangayId(req);
    const data = await analyticsService.ageDemographics({ barangayId });
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

export const vaccineCoverage = async (req: Request, res: Response) => {
  try {
    const barangayId = resolveBarangayId(req);
    const data = await analyticsService.vaccineCoverage({ barangayId });
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


