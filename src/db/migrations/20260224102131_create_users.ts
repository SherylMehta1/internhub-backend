import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable();
    table.string("email").unique().notNullable().index();
    table.string("password_hash").notNullable();
    table.enu("role", ["student", "company", "admin"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}


