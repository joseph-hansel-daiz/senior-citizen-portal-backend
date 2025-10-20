import { Router } from "express";
import { helpdeskController } from "@/controllers";

const router = Router();

// GET /helpdesk - List records
router.get("/", helpdeskController.list);

// GET /helpdesk/:id - Record detail
router.get("/:id", helpdeskController.detail);

// POST /helpdesk - Create a help desk record
router.post("/", helpdeskController.create);

// PUT /helpdesk/:id - Update a help desk record
router.put("/:id", helpdeskController.update);

// DELETE /helpdesk/:id - Delete a help desk record
router.delete("/:id", helpdeskController.remove);

export default router;


