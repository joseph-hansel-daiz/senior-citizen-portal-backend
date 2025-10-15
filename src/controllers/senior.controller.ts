import { Request, Response } from "express";
import { seniorService } from "@/services";

export const list = async (_req: Request, res: Response) => {
  try {
    const seniors = await seniorService.listSeniors();
    res.json(seniors);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const senior = await seniorService.getSeniorById(req.params.id);
    res.json(senior);
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const create = async (req: any, res: Response) => {
  try {
    const { barangayId } = req.body;
    const createdBy = req.user?.id;

    const senior = await seniorService.createSenior({
      barangayId: Number(barangayId),
      createdBy,
    });

    res.status(201).json(senior);
  } catch (err: any) {
    if (err.message.includes("required")) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const update = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { barangayId } = req.body;
    const updatedBy = req.user?.id;

    const senior = await seniorService.updateSenior(id, {
      barangayId: barangayId ? Number(barangayId) : undefined,
      updatedBy,
    });

    res.json(senior);
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const remove = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBy = req.user?.id;

    const result = await seniorService.deleteSenior(id, deletedBy);
    res.json(result);
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};
