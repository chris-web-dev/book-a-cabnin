import type { D1Database } from "@cloudflare/workers-types";
import type { Session, User } from "better-auth";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { Env } from "hono";
import type { Transporter } from "nodemailer";

import type { getAuth } from "@/lib/authentication";
import type * as schema from "@/lib/database/schema";

export interface AppBindings extends Env {
  Bindings: {
    DB: D1Database;
    BETTER_AUTH_URL: string;
    FRONTEND_URL: string;
    BETTER_AUTH_SECRET: string;
    // SMTP Settings
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_SECURE: string;
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_FROM: string;
  };
  Variables: {
    auth: ReturnType<typeof getAuth>;
    db: DrizzleD1Database<typeof schema>;
    schema: typeof schema;
    session: Session | null;
    user: User | null;
    emailTransporter:
      | Transporter
      | {
          sendMail: (mailOptions: any) => Promise<{ messageId: string }>;
          verify: () => Promise<boolean>;
        };
  };
}
