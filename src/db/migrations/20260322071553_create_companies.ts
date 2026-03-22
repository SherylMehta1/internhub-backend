import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("companies", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    // Foreign Key to users
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("company_name").notNullable();
    table.text("description");
    table.boolean("verified").defaultTo(false);

    table.timestamp("created_at").defaultTo(knex.fn.now());

    // Index for performance
    table.index(["user_id"]);
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("companies");
}

