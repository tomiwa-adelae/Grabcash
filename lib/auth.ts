import { betterAuth } from "better-auth";
import { emailOTP, phoneNumber, username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { resend } from "./resend";
import Mailjet from "node-mailjet";
import { ResetPasswordEmail } from "@/emails/reset-password-email";
import { VerificationEmail } from "@/emails/verification-email";

const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      const resetURL = `${env.BETTER_AUTH_URL}/reset-password?token=${token}&email=${user.email}`;

      await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: env.SENDER_EMAIL_ADDRESS,
              Name: "Earnsphere",
            },
            To: [
              {
                Email: user.email,
                Name: user.name,
              },
            ],
            ReplyTo: {
              Email: env.SENDER_EMAIL_ADDRESS,
              Name: "Earnsphere Support",
            },
            Subject: `Reset your password - Earnsphere`,
            HTMLPart: ResetPasswordEmail({ resetURL }),
          },
        ],
      });
    },
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      async sendVerificationOTP({ email, otp, type }) {
        let subject = "";
        let content = "";

        if (type === "email-verification") {
          subject = "Verify your email - Earnsphere";
          content = VerificationEmail({ otp });
        } else if (type === "forget-password") {
          subject = "Reset your password - Earnsphere";
          content = ``;
        }

        await mailjet.post("send", { version: "v3.1" }).request({
          Messages: [
            {
              From: {
                Email: env.SENDER_EMAIL_ADDRESS,
                Name: "Earnsphere",
              },
              To: [
                {
                  Email: email,
                  Name: email,
                },
              ],
              ReplyTo: {
                Email: env.SENDER_EMAIL_ADDRESS,
                Name: "Earnsphere Support",
              },
              Subject: subject,
              HTMLPart: content,
            },
          ],
        });
      },
    }),
    username({ minUsernameLength: 3, maxUsernameLength: 20 }),
    phoneNumber(),
  ],
});
