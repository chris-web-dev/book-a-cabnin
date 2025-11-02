import type { Context } from "hono";
import honoFactory from "./hono-factory";
import {
  corsMiddleware,
  csrfMiddleware,
  databaseMiddleware,
  emailMiddleware,
} from "./middleware";

// Endret rekkefølgen på middleware
const routes = honoFactory
  .createApp()
  .basePath("/api")
  .use(corsMiddleware)
  .use(csrfMiddleware)
  .use(databaseMiddleware)
  .use(emailMiddleware)
  .get("/", (c: Context) => {
    return c.json({
      message: "Hono API",
      version: 1,
      status: "Ok",
      statusCode: 200,
    });
  });

export type HonoApp = typeof routes;
export default routes;
