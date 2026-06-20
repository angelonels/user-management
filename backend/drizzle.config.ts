import { defineConfig } from "drizzle-kit";
import { env } from "./src/shared/config/env.js";

export default defineConfig({
  schema: "./src/shared/database/schema/*.ts",
  out: "./src/shared/database/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL
  }
});

