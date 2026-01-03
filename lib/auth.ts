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
  advanced: {
    cookies: {
      session_token: {
        name: "grabcash_auth",
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          domain: ".grabcash.ng",
          path: "/",
        },
      },
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.250:3000",
    "https://grabcash.ng",
    "https://www.grabcash.ng",

    // allow all LAN IPs (DEV ONLY)
    // /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:3000$/,
  ],
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
              Name: "grabcash",
            },
            To: [
              {
                Email: user.email,
                Name: user.name,
              },
            ],
            ReplyTo: {
              Email: env.SENDER_EMAIL_ADDRESS,
              Name: "grabcash Support",
            },
            Subject: `Reset your password - grabcash`,
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
          subject = "Verify your email - grabcash";
          content = VerificationEmail({ otp });
        } else if (type === "forget-password") {
          subject = "Reset your password - grabcash";
          content = ``;
        }

        await mailjet.post("send", { version: "v3.1" }).request({
          Messages: [
            {
              From: {
                Email: env.SENDER_EMAIL_ADDRESS,
                Name: "grabcash",
              },
              To: [
                {
                  Email: email,
                  Name: email,
                },
              ],
              ReplyTo: {
                Email: env.SENDER_EMAIL_ADDRESS,
                Name: "grabcash Support",
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
