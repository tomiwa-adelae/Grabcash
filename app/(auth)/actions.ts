"use server";

import Mailjet from "node-mailjet";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { RegistrationEmail } from "@/emails/registration-email";
import { logActivity } from "../data/admin/activity/log-activity";
import { getUserDetails } from "../data/user/get-user-details";

const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

export const sendRegistrationEmail = async (
  email: string,
  name: string
): Promise<ApiResponse> => {
  try {
    const user = await getUserDetails();

    if (!email) return { status: "error", message: "Oops! An error occurred!" };

    // Log the activity
    await logActivity({
      type: "USER_REGISTERED",
      description: `New user registered: ${user.name || user.email}`,
      userId: user.id,
      metadata: { email: user.email },
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: env.SENDER_EMAIL_ADDRESS,
            Name: "grabcash",
          },
          To: [{ Email: email, Name: name }],
          Subject: `Welcome to grabcash, ${name}`,
          HTMLPart: RegistrationEmail({ name }),
        },
      ],
    });

    return { status: "success", message: "Welcome email sent successfully" };
  } catch (error) {
    return { status: "error", message: "Registration email was not sent!" };
  }
};
