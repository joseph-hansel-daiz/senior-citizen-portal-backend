import { Request, Response } from "express";
import { seniorService, seniorVaccineService, auditLogService } from "@/services";
import { SeniorVaccine } from "@/models";

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
    const { id, vaccineId, vaccineDate } = req.body;
    const record = await seniorVaccineService.upsert({
      id: id ? Number(id) : undefined,
      seniorId,
      vaccineId: Number(vaccineId),
      vaccineDate: vaccineDate ?? null,
    });

    await auditLogService.log({
      actorId: (req as any).user?.id ?? null,
      action: id ? "SENIOR_VACCINE_UPDATE" : "SENIOR_VACCINE_CREATE",
      entityType: "SeniorVaccine",
      entityId: Number((record as any).id),
      seniorId,
      metadata: {
        vaccineId: Number(vaccineId),
        vaccineDate: vaccineDate ?? null,
      },
    });

    res.json(record);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    // Keep route compatibility: treat path param as the record id
    const id = Number(req.params.vaccineId ?? req.params.id);

    const existing = await SeniorVaccine.findByPk(id);
    const result = await seniorVaccineService.delete({ id });

    if (existing) {
      await auditLogService.log({
        actorId: (req as any).user?.id ?? null,
        action: "SENIOR_VACCINE_DELETE",
        entityType: "SeniorVaccine",
        entityId: id,
        seniorId: (existing as any).seniorId ?? null,
        metadata: {
          vaccineId: (existing as any).vaccineId,
          vaccineDate: (existing as any).vaccineDate ?? null,
        },
      });
    }

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default { listBySenior, upsert, remove };


