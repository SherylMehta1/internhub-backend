import { Request, Response } from "express";
import { createInternship } from "./internship.service";

export const createInternshipHandler = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const internship = await createInternship(userId, req.body);

    res.status(201).json(internship);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};