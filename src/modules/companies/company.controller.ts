import { Request, Response } from "express";
import { createCompany } from "./company.service";

export const createCompanyHandler = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const company = await createCompany(userId, req.body);

    res.status(201).json(company);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};