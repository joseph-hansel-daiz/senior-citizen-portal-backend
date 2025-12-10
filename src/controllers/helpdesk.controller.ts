import { Request, Response } from "express";
import { helpdeskService } from "@/services";

export const create = async (req: Request, res: Response) => {
  try {
    const { seniorId, helpDeskRecordCategoryIds, details } = req.body;

    if (!seniorId || !helpDeskRecordCategoryIds || !details) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure helpDeskRecordCategoryIds is an array
    const categoryIds = Array.isArray(helpDeskRecordCategoryIds)
      ? helpDeskRecordCategoryIds.map(id => Number(id))
      : [Number(helpDeskRecordCategoryIds)];

    if (categoryIds.length === 0) {
      return res.status(400).json({ message: "At least one category is required" });
    }

    const record = await helpdeskService.create({
      seniorId: Number(seniorId),
      helpDeskRecordCategoryIds: categoryIds,
      details: String(details).slice(0, 100),
    });

    return res.status(201).json(record);
  } catch (err: any) {
    console.error("Error creating help desk record:", err);
    return res
      .status(500)
      .json({ message: "Failed to create help desk record" });
  }
};

export default { create };

export const list = async (_req: Request, res: Response) => {
  try {
    const user = (_req as any).user;
    const barangayId = user?.role === "barangay" ? Number(user?.barangayId) : undefined;
    const records = await helpdeskService.list(barangayId ? { barangayId } : undefined);
    return res.json(records);
  } catch (err: any) {
    console.error("Error listing help desk records:", err);
    return res.status(500).json({ message: "Failed to list help desk records" });
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await helpdeskService.detail(id);
    if (!record) return res.status(404).json({ message: "Not found" });
    return res.json(record);
  } catch (err: any) {
    console.error("Error fetching help desk record:", err);
    return res.status(500).json({ message: "Failed to fetch help desk record" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { helpDeskRecordCategoryIds, details } = req.body;

    // Convert helpDeskRecordCategoryIds to array if provided
    let categoryIds: number[] | undefined;
    if (helpDeskRecordCategoryIds !== undefined) {
      categoryIds = Array.isArray(helpDeskRecordCategoryIds)
        ? helpDeskRecordCategoryIds.map(catId => Number(catId))
        : [Number(helpDeskRecordCategoryIds)];
    }

    const updated = await helpdeskService.update(id, { helpDeskRecordCategoryIds: categoryIds, details });
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.json(updated);
  } catch (err: any) {
    console.error("Error updating help desk record:", err);
    return res.status(500).json({ message: "Failed to update help desk record" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await helpdeskService.remove(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    return res.status(204).send();
  } catch (err: any) {
    console.error("Error deleting help desk record:", err);
    return res.status(500).json({ message: "Failed to delete help desk record" });
  }
};

export const helpdeskController = { create, list, detail, update, remove };


