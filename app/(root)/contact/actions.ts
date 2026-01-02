"use server";

import { ContactFormEmail } from "@/emails/contact-form-email";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { contactFormSchema, ContactFormSchemaType } from "@/lib/zodSchemas";

import Mailjet from "node-mailjet";
const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

export const contactUs = async (
  data: ContactFormSchemaType
): Promise<ApiResponse> => {
  try {
    // ✅ Validate form data with Zod
    const validation = contactFormSchema.safeParse(data);

    if (!validation.success) {
      return { status: "error", message: "Invalid form data" };
    }

    // ✅ Save contact submission to DB
    const contact = await prisma.contact.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        subject: validation.data.subject,
        message: validation.data.message,
      },
      select: { createdAt: true },
    });

    // ✅ Generate email HTML
    const html = ContactFormEmail({
      ...validation.data,
      date: contact.createdAt,
    });

    // ✅ Send notification email with Mailjet
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: env.SENDER_EMAIL_ADDRESS,
            Name: "Grabcash",
          },
          To: [
            {
              Email: env.ADMIN_EMAIL_ADDRESS,
              Name: "Grabcash Admin",
            },
          ],
          Subject: "New Contact form submission - Grabcash",
          HTMLPart: html, // <-- now a proper string
        },
      ],
    });

    return {
      status: "success",
      message: "Message successfully sent. We will reach out to you shortly",
    };
  } catch (error) {
    return { status: "error", message: "Your message was not sent." };
  }
};
