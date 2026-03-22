import db from "../../db/db";
import { CreateCompanyDTO, Company } from "./company.types";

export const createCompany = async (
  userId: string,
  data: CreateCompanyDTO
): Promise<Company> => {
  const insertData: any = {
    user_id: userId,
    company_name: data.company_name,
  };

  // Only add description if it exists
  if (data.description) {
    insertData.description = data.description;
  }

  const result = await db<Company>("companies")
    .insert(insertData)
    .returning("*");

  const company = result[0];

  if (!company) {
    throw new Error("Company creation failed");
  }

  return company;
};