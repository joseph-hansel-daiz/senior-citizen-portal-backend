import { Request, Response } from "express";
import { seniorService, deathInfoService } from "@/services";
import { TransactionHelper } from "@/utils/transaction";

export const list = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const barangayId =
      user?.role === "barangay"
        ? Number(user?.barangayId)
        : req.query.barangayId
          ? Number(req.query.barangayId)
          : undefined;
    const birthYear = req.query.birthYear
      ? Number(req.query.birthYear)
      : undefined;
    const filter =
      barangayId != null || birthYear != null
        ? { barangayId, birthYear }
        : undefined;
    const seniors = await seniorService.listSeniors(filter);
    res.json(seniors);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const options = async (req: Request, res: Response) => {
  try {
    const status = req.query.status as "active" | "pending" | "all" | undefined;
    const list = await seniorService.getSeniorOptions(
      status ? { status } : undefined
    );
    res.json(list);
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
    let requestData: any;
    let photoBuffer: Buffer | undefined;

    if (req.file?.buffer) {
      try {
        requestData = typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body;
      } catch {
        return res.status(400).json({ message: "Invalid JSON in data field" });
      }
      photoBuffer = req.file.buffer as Buffer;
    } else {
      requestData = req.body;
      const { photo } = requestData;
      if (photo) {
        if (typeof photo === "string" && photo.startsWith("data:")) {
          photoBuffer = Buffer.from(
            photo.replace(/^data:[\w/]+;base64,/, ""),
            "base64"
          );
        } else if (photo instanceof Buffer) {
          photoBuffer = photo;
        }
      }
    }

    const createdBy = req.user?.id;
    const completeSenior = await TransactionHelper.executeInTransaction(
      async (transaction) => {
        return seniorService.createSenior(
          {
            ...requestData,
            barangayId: Number(requestData.barangayId),
            photo: photoBuffer ? (photoBuffer as unknown as Blob) : undefined,
            createdBy,
          },
          transaction
        );
      }
    );

    res.status(201).json(completeSenior);
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
    let requestData: any;
    let photoBuffer: Buffer | undefined;

    if (req.file?.buffer) {
      try {
        requestData = typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body;
      } catch {
        return res.status(400).json({ message: "Invalid JSON in data field" });
      }
      photoBuffer = req.file.buffer as Buffer;
    } else {
      requestData = req.body;
      const { photo } = requestData;
      if (photo) {
        if (typeof photo === "string" && photo.startsWith("data:")) {
          photoBuffer = Buffer.from(
            photo.replace(/^data:[\w/]+;base64,/, ""),
            "base64"
          );
        } else if (photo instanceof Buffer) {
          photoBuffer = photo;
        }
      }
    }

    const updatedBy = req.user?.id;
    const completeSenior = await TransactionHelper.executeInTransaction(
      async (transaction) => {
        return seniorService.updateSenior(
          id,
          {
            ...requestData,
            barangayId: requestData.barangayId != null ? Number(requestData.barangayId) : undefined,
            photo: photoBuffer ? (photoBuffer as unknown as Blob) : undefined,
            updatedBy,
          },
          transaction
        );
      }
    );

    res.json(completeSenior);
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

export const markDeceased = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { dateOfDeath } = req.body;
    const createdBy = req.user?.id;

    // Validate required fields
    if (!dateOfDeath) {
      return res.status(400).json({ message: "Date of death is required" });
    }

    // Validate senior exists
    const senior = await seniorService.getSeniorById(id);
    if (!senior) {
      return res.status(404).json({ message: "Senior not found" });
    }

    // Check if already marked as deceased
    const existingDeathInfo = await deathInfoService.getBySeniorId(Number(id));
    if (existingDeathInfo) {
      return res
        .status(400)
        .json({ message: "Senior is already marked as deceased" });
    }

    // Handle death certificate upload
    let deathCertificateBuffer: Buffer | undefined;
    if ((req as any).file?.buffer) {
      deathCertificateBuffer = (req as any).file.buffer as Buffer;
    }

    // Create death info record
    const deathInfo = await deathInfoService.create({
      seniorId: Number(id),
      dateOfDeath: new Date(dateOfDeath),
      deathCertificate: deathCertificateBuffer,
      createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: createdBy,
    });

    res.status(201).json({
      message: "Senior marked as deceased successfully",
      deathInfo,
    });
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const unmarkDeceased = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    // Validate senior exists
    const senior = await seniorService.getSeniorById(id);
    if (!senior) {
      return res.status(404).json({ message: "Senior not found" });
    }

    // Check if senior is marked as deceased
    const existingDeathInfo = await deathInfoService.getBySeniorId(Number(id));
    if (!existingDeathInfo) {
      return res
        .status(400)
        .json({ message: "Senior is not marked as deceased" });
    }

    // Delete death info record
    await deathInfoService.delete(Number(id));

    res.json({
      message: "Senior unmarked as deceased successfully",
    });
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const approve = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { oscaId, note } = req.body;
    const approvedBy = req.user?.id;

    // Validate required fields
    if (!oscaId) {
      return res.status(400).json({ message: "OSCA ID is required" });
    }

    // Execute approve operation within a transaction
    const completeSenior = await TransactionHelper.executeInTransaction(
      async (transaction) => {
        return await seniorService.approveSenior(id, oscaId, note, approvedBy, transaction);
      }
    );

    res.json({
      message: "Senior approved successfully",
      senior: completeSenior
    });
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else if (err.message === "Senior is not in pending status" || err.message === "Identifying information not found") {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export const decline = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const declinedBy = req.user?.id;

    // Execute decline operation within a transaction
    const completeSenior = await TransactionHelper.executeInTransaction(
      async (transaction) => {
        return await seniorService.declineSenior(id, note, declinedBy, transaction);
      }
    );

    res.json({
      message: "Senior declined successfully",
      senior: completeSenior
    });
  } catch (err: any) {
    if (err.message === "Senior not found") {
      res.status(404).json({ message: err.message });
    } else if (err.message === "Senior is not in pending status") {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};
