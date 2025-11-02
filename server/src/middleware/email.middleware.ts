import { createFactory } from "hono/factory";
import nodemailer, { type Transporter } from "nodemailer";
import type { AppBindings } from "@/types";

const factory = createFactory<AppBindings>();

export const emailMiddleware = factory.createMiddleware(async (c, next) => {
  try {
    // Domeneshop bruker port 465 med SSL
    const transporter: Transporter = nodemailer.createTransport({
      host: c.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: c.env.SMTP_USER,
        pass: c.env.SMTP_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });

    const verificationPromise = transporter.verify();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("SMTP connection timeout")), 15000),
    );

    await Promise.race([verificationPromise, timeoutPromise]);

    c.set("emailTransporter", transporter);
    console.log("SMTP transporter satt opp suksessfullt");
  } catch (error) {
    console.error("Email middleware error:", error);

    const dummyTransporter = {
      sendMail: async (mailOptions: any) => {
        console.log("Dummy e-post (ikke sendt) til:", mailOptions.to);
        console.log("Tittel:", mailOptions.subject);
        return { messageId: `dummy-${Date.now()}` };
      },
      verify: async () => true,
    };

    c.set("emailTransporter", dummyTransporter);
    console.log("Dummy e-post transporter satt opp (ingen e-post vil bli sendt)");
  }

  await next();
});
