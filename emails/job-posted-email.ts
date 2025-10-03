import { env } from "@/lib/env";

export function JobPostedEmail({
  name,
  jobTitle,
  category,
  reward,
  noOfWorkers,
  status,
  manageJobUrl,
}: {
  name: string;
  jobTitle: string;
  category?: string;
  reward?: string;
  noOfWorkers?: string;
  status: string;
  manageJobUrl: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Job Posted Successfully</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="margin: 40px auto; background: #ffffff; border-radius: 8px; padding: 20px;">
        
        <!-- Header -->
        <tr>
          <td style="text-align: center; padding: 20px;">
            <h1 style="color: #111827; margin-bottom: 10px; font-size: 24px;">✅ Your Job Has Been Posted!</h1>
            <p style="color: #6b7280; font-size: 16px; margin: 0;">
              Hi ${name}, your job is now live on grabcash.
            </p>
          </td>
        </tr>

        <!-- Job Details -->
        <tr>
          <td style="padding: 20px; background: #f3f4f6; border-radius: 8px;">
            <h2 style="color: #111827; font-size: 18px; margin-bottom: 15px;">📌 Job Details</h2>
            <p style="margin: 4px 0; font-size: 15px; color: #374151;"><b>Title:</b> ${jobTitle}</p>
            ${
              category
                ? `<p style="margin: 4px 0; font-size: 15px; color: #374151;"><b>Category:</b> ${category}</p>`
                : ""
            }
            ${
              reward
                ? `<p style="margin: 4px 0; font-size: 15px; color: #374151;"><b>Reward:</b> ₦${reward} per worker</p>`
                : ""
            }
            ${
              noOfWorkers
                ? `<p style="margin: 4px 0; font-size: 15px; color: #374151;"><b>No. of Workers:</b> ${noOfWorkers}</p>`
                : ""
            }
            <p style="margin: 4px 0; font-size: 15px; color: #374151;"><b>Status:</b> ${status}</p>
          </td>
        </tr>

        <!-- Call to Action -->
        <tr>
          <td style="text-align: center; padding: 20px;">
            <a href="${manageJobUrl}" 
               style="display: inline-block; padding: 12px 24px; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
              Manage Job
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              If you have any questions, please contact our <a href="${
                env.NEXT_PUBLIC_BETTER_AUTH_URL
              }/contact" style="color: #2563eb; text-decoration: none;">Support Team</a>.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
