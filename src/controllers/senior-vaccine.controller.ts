import { Request, Response } from "express";
import { seniorVaccineService } from "@/services";

export const listBySenior = async (req: Request, res: Response) => {
  try {
    const seniorId = Number(req.params.seniorId);
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


