import { createFactory } from "hono/factory";
import { logger } from "hono/logger";

import type { AppBindings } from "@/types";

export default createFactory<AppBindings>({
  initApp: (app) => {
    app.use(logger());
    app.use(async (_c, next) => {
      await next();
    });
  },
});
