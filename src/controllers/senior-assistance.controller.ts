import { Request, Response } from "express";
import { seniorService, seniorAssistanceService } from "@/services";

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
    const records = await seniorAssistanceService.listBySenior(seniorId);
    res.json(records);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const upsert = async (req: Request, res: Response) => {
  try {
    const seniorId = Number(req.params.seniorId);
    const { id, assistanceId, assistanceDate } = req.body;
    const record = await seniorAssistanceService.upsert({ id: id ? Number(id) : undefined, seniorId, assistanceId: Number(assistanceId), assistanceDate: assistanceDate ?? null });
    res.json(record);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    // keep compatibility with vaccines delete pattern (path param is record id)
    const id = Number(req.params.assistanceId ?? req.params.id);
    const result = await seniorAssistanceService.delete({ id });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default { listBySenior, upsert, remove };


