import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("internships", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("company_id")
      .notNullable()
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE");

    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("location");
    table.integer("stipend");

    table.specificType("skills_required", "text[]");

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index(["company_id"]);
    table.index(["title"]);
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("internships");
}

