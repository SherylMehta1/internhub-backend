import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: "./src/db/migrations",
  },
};

export default config;