import { Request, Response } from "express";
import { seniorService, seniorVaccineService } from "@/services";

export const listBySenior = async (req: Request, res: Response) => {
  try {
    const seniorId = Number(req.params.seniorId);
    const user = (req as any).user;

    if (user?.role === "barangay") {
      try {
        const senior = await seniorService.getSeniorById(String(seniorId));
        if (Number(senior.barangayId) !== Number(user.barangayId)) {
          return res.status(403).json({ message: "Forbidden" });
        }
      } catch (e: any) {
        return res.status(404).json({ message: "Senior not found" });
      }
    }
    const records = await seniorVaccineService.listBySenior(seniorId);
    res.json(records);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const upsert = async (req: Request, res: Response) => {
  try {
    const seniorId = Number(req.params.seniorId);
    const { vaccineId, lastVaccineDate } = req.body;
    const record = await seniorVaccineService.upsert({ seniorId, vaccineId: Number(vaccineId), lastVaccineDate: lastVaccineDate ?? null });
    res.json(record);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const seniorId = Number(req.params.seniorId);
    const vaccineId = Number(req.params.vaccineId);
    const result = await seniorVaccineService.delete({ seniorId, vaccineId });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default { listBySenior, upsert, remove };


