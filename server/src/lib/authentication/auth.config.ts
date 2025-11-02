import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, openAPI } from "better-auth/plugins";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";

import type { Context } from "hono";
import { ORIGINS } from "@/config/constants";
import { emailVerification } from "@/lib/authentication/utils/emailVerification";
import * as schema from "@/lib/database/schema";
import {
  getMagicLinkHtmlTemplate,
  getMagicLinkTextTemplate,
} from "@/lib/email/templates";
import type { AppBindings } from "@/types";

export function getAuth(c: Context<AppBindings>) {
  return betterAuth({
    advanced: {
      defaultCookieAttributes: {
        httpOnly: true,
        sameSite: "lax",
        partitioned: true,
      },
    },
    trustedOrigins: ORIGINS,
    secret: c.env.BETTER_AUTH_SECRET,
    baseURL: c.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
    },
    emailVerification: emailVerification(c),
    plugins: [
      openAPI(),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          try {
            const transporter = c.get("emailTransporter");
            if (!transporter) {
              console.log(
                "E-post transporter ikke tilgjengelig for magic link",
              );
              return;
            }

            const messageId = await transporter.sendMail({
              from: c.env.SMTP_FROM,
              to: email,
              subject: "Logg inn på Grindatunet",
              html: getMagicLinkHtmlTemplate({
                magicLinkUrl: url,
                appName: "Grindatunet",
              }),
              text: getMagicLinkTextTemplate({
                magicLinkUrl: url,
                appName: "Grindatunet",
              }),
            });

            if (messageId.messageId?.startsWith("dummy-")) {
              console.log("Magic link logget (ikke sendt) til:", email);
            } else {
              console.log("Magic link email sent: %s", messageId.messageId);
            }
          } catch (error) {
            console.error("Error sending magic link (continuing):", error);
          }
        },
      }),
    ],
    database: drizzleAdapter(
      drizzleD1(c.env.DB, {
        schema: {
          ...schema,
        },
      }),
      {
        provider: "sqlite",
        usePlural: true,
      },
    ),
  });
}
