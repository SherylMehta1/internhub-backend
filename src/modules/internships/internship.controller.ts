import { Request, Response } from "express";
import { createInternship } from "./internship.service";
import { getInternships } from "./internship.service";

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

export const getInternshipsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const internships = await getInternships(req.query);
    if (internships.length === 0) {
      return res.status(200).json({
        message: "No internships match your search",
        data: [],
      });
    }

    res.status(200).json(internships);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};