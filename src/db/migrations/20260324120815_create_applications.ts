import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("applications", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    //Internship reference
    table
      .uuid("internship_id")
      .notNullable()
      .references("id")
      .inTable("internships")
      .onDelete("CASCADE");

    //Student reference
    table
      .uuid("student_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("resume_url");
    table.float("ai_score");
    table.string("status").defaultTo("applied");

    table.timestamp("created_at").defaultTo(knex.fn.now());

    //Prevent duplicate applications
    table.unique(["internship_id", "student_id"]);
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("applications");
}

