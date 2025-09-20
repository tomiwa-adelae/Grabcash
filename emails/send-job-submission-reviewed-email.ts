import { env } from "@/lib/env";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  env.MAILJET_API_PUBLIC_KEY,
  env.MAILJET_API_PRIVATE_KEY
);

export async function sendJobSubmissionReviewedEmail({
  to,
  workerName,
  jobTitle,
  status,
  reward,
  reason,
}: {
  to: string;
  workerName: string;
  jobTitle: string;
  status: "APPROVED" | "REJECTED";
  reward: string;
  reason?: string;
}) {
  await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: env.SENDER_EMAIL_ADDRESS,
          Name: "Earnsphere",
        },
        To: [{ Email: to, Name: workerName }],
        Subject: `Your submission for "${jobTitle}" was ${status}`,
        HTMLPart: `
          <h2>Hello ${workerName},</h2>
          <p>Your submission for <b>${jobTitle}</b> has been <b>${status}</b>.</p>
          ${status === "APPROVED" ? `<p>You’ve earned ₦${reward}.</p>` : ""}
          <p>Reason: ${reason}</p>
          <p>– The Earnsphere Team</p>
        `,
      },
    ],
  });
}
