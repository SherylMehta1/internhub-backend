import db from "../../db/db";
import { CreateInternshipDTO, Internship } from "./internship.types";

export const createInternship = async (
  userId: string,
  data: CreateInternshipDTO
): Promise<Internship> => {
  // Step 1 — Find company of this user
  const company = await db("companies")
    .where({ user_id: userId })
    .first();

  if (!company) {
    throw new Error("Company profile not found");
  }

  // Step 2 — Prepare insert data
  const insertData: any = {
    company_id: company.id,
    title: data.title,
    description: data.description,
  };

  if (data.location) insertData.location = data.location;
  if (data.stipend) insertData.stipend = data.stipend;
  if (data.skills_required)
    insertData.skills_required = data.skills_required;

  // 🗄 Step 3 — Insert internship
  const result = await db<Internship>("internships")
    .insert(insertData)
    .returning("*");

  const internship = result[0];

  if (!internship) {
    throw new Error("Internship creation failed");
  }

  return internship;
};

//searching & filtering
export const getInternships = async (query: any) => {
  const { search, location, page = 1, limit = 10 } = query;

  const offset = (page - 1) * limit;

  let dbQuery = db("internships");

  // Search by title
  if (search) {
    dbQuery = dbQuery.where("title", "ilike", `%${search}%`);
  }

  // Filter by location
  if (location) {
    dbQuery = dbQuery.andWhere("location", "ilike", `%${location}%`);
  }

  // Pagination
  const internships = await dbQuery
    .limit(limit)
    .offset(offset)
    .orderBy("created_at", "desc");

  return internships;
};