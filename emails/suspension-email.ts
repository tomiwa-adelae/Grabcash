import { env } from "@/lib/env";
import { formatDate, formattedStatus } from "@/lib/utils";

export function SuspensionEmail({
  date,
  status,
  name,
}: {
  status: string;
  name: string;
  date: Date | null;
}) {
  return `
   <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Account Suspended - Grabcash</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:20px;">
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="color:#e63946;">🚫 Account Suspended</h2>
              </td>
            </tr>
            <tr>
              <td style="color:#333; font-size:15px; line-height:22px;">
                <p>Hello <strong>${name}</strong>,</p>
                <p>
                  Your Grabcash account has been <strong style="color:#e63946;">suspended</strong> due to a violation of our guidelines.
                </p>
                <p>
                  <strong>Details:</strong><br/>
                  Suspension Date: ${formatDate(date)} <br/>
                  Status: ${formattedStatus[status]}
                </p>
                <p>
                  During this period, you will not be able to:
                  <ul>
                    <li>Withdraw your earnings</li>
                    <li>Apply for new jobs</li>
                    <li>Create or manage jobs</li>
                  </ul>
                </p>
                <p>If you believe this was a mistake, please contact our support team.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:20px;">
                <a href="${env.BETTER_AUTH_URL}/contact"
                   style="background:#e63946; color:#fff; text-decoration:none; padding:12px 20px; border-radius:5px; display:inline-block;">
                   Contact Support
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding-top:20px; font-size:13px; color:#666;" align="center">
                &copy; 2026 Grabcash. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
}
