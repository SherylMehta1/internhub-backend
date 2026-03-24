import { Request, Response } from "express";
import { applyToInternship } from "./application.service";

export const applyHandler = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const application = await applyToInternship(userId, req.body);

    res.status(201).json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};