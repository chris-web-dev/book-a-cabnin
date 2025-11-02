import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/lib/database/drizzle/migrations",
  schema: "./src/lib/database/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DEV_SQLITE_URL || "./dev.db",
  },
});
