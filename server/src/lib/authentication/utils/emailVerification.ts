import {
  getVerifyEmailHtmlTemplate,
  getVerifyEmailTextTemplate,
} from "@/lib/email/templates";

export const emailVerification = (c: any) => ({
  enabled: true,
  sendVerificationEmail: async ({
    user,
    url,
    token,
  }: {
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null;
    };
    url: string;
    token: string;
  }) => {
    try {
      const transporter = c.get("emailTransporter");
      if (!transporter) {
        console.log(
          "E-post transporter ikke tilgjengelig - hopper over e-post sending",
        );
        return;
      }

      const messageId = await transporter.sendMail({
        from: c.env.SMTP_FROM,
        to: user.email,
        subject: "Verifiser din e-postadresse",
        html: getVerifyEmailHtmlTemplate({
          userName: user.name,
          verificationUrl: url,
          appName: "Grindatunet",
        }),
        text: getVerifyEmailTextTemplate({
          userName: user.name,
          verificationUrl: url,
          appName: "Grindatunet",
        }),
      });

      if (messageId.messageId?.startsWith("dummy-")) {
        console.log("E-post verifisering logget (ikke sendt) til:", user.email);
      } else {
        console.log("Verification email sent:", messageId.messageId);
      }
    } catch (error) {
      console.error("Error in email sending (continuing anyway):", error);
    }
  },
});
