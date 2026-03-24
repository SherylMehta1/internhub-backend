import db from "../../db/db";
import { CreateApplicationDTO, Application } from "./application.types";

export const applyToInternship = async (
  userId: string,
  data: CreateApplicationDTO
): Promise<Application> => {
  // Step 1 — Check if internship exists
  const internship = await db("internships")
    .where({ id: data.internship_id })
    .first();

  if (!internship) {
    throw new Error("Internship not found");
  }

  // Step 2 — Insert application
  const insertData: any = {
  internship_id: data.internship_id,
  student_id: userId,
};

// Only include if exists
if (data.resume_url) {
  insertData.resume_url = data.resume_url;
}

// Step 3 — Insert with error handling
  try {
    const result = await db<Application>("applications")
      .insert(insertData)
      .returning("*");

    const application = result[0];

    if (!application) {
      throw new Error("Application failed");
    }

    return application;
  } catch (error: any) {
    //  Handle duplicate application
    if (error.code === "23505") {
      throw new Error("You have already applied to this internship");
    }

    // Unknown DB error
    throw error;
  }
};