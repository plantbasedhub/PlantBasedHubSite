import type { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL, // Pegando do Vercel
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
  pool: { min: 2, max: 10 }, // Melhora conexões no Vercel
};

export default config;
