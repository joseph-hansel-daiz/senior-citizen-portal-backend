import { Request, Response } from "express";
import { auditLogService } from "@/services";

export const list = async (req: Request, res: Response) => {
  try {
    const {
      actorId,
      seniorId,
      entityType,
      action,
      from,
      to,
      limit,
      offset,
    } = req.query;

    const result = await auditLogService.list({
      actorId: actorId != null ? Number(actorId) : undefined,
      seniorId: seniorId != null ? Number(seniorId) : undefined,
      entityType: typeof entityType === "string" ? entityType : undefined,
      action: typeof action === "string" ? action : undefined,
      from: typeof from === "string" ? new Date(from) : undefined,
      to: typeof to === "string" ? new Date(to) : undefined,
      limit: limit != null ? Number(limit) : undefined,
      offset: offset != null ? Number(offset) : undefined,
    });

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const listBySenior = async (req: Request, res: Response) => {
  try {
    const seniorId = Number(req.params.seniorId);
    const { actorId, limit, offset } = req.query;

    const result = await auditLogService.list({
      seniorId,
      actorId: actorId != null ? Number(actorId) : undefined,
      limit: limit != null ? Number(limit) : undefined,
      offset: offset != null ? Number(offset) : undefined,
    });

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

