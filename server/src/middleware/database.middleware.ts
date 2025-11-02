import { createFactory } from "hono/factory";
import { createDb } from "@/lib/database";
import * as schema from "@/lib/database";
import type { AppBindings } from "@/types";

const factory = createFactory<AppBindings>();

export const databaseMiddleware = factory.createMiddleware(async (c, next) => {
  try {
    if (!c.env.DB) {
      return c.json(
        {
          error: "DB binding not found in environment",
          availableBindings: Object.keys(c.env),
        },
        500,
      );
    }
    const db = createDb(c.env);
    c.set("db", db);
    c.set("schema", schema);

    await next();
  } catch (error) {
    console.error("Database middleware error:", error);
    return c.json(
      {
        error: "Database connection failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
});
