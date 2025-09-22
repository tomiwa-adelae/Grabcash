"use server";

import Mailjet from "node-mailjet";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { RegistrationEmail } from "@/emails/registration-email";

const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

export const sendRegistrationEmail = async (
  email: string,
  name: string
): Promise<ApiResponse> => {
  try {
    if (!email) return { status: "error", message: "Oops! An error occurred!" };

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: env.SENDER_EMAIL_ADDRESS,
            Name: "Earnsphere",
          },
          To: [{ Email: email, Name: name }],
          Subject: `Welcome to Earnsphere, ${name}`,
          HTMLPart: RegistrationEmail({ name }),
        },
      ],
    });

    return { status: "success", message: "Welcome email sent successfully" };
  } catch (error) {
    return { status: "error", message: "Registration email was not sent!" };
  }
};
