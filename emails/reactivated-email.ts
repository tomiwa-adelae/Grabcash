import { env } from "@/lib/env";
import { formatDate, formattedStatus } from "@/lib/utils";

export function ReactivatedEmail({ name }: { name: string }) {
  return `
   <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Account Reactivated - Grabcash</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:20px;">
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="color:#06d6a0;">✅ Account reactivated</h2>
              </td>
            </tr>
            <tr>
              <td style="color:#333; font-size:15px; line-height:22px;">
                <p>Hello <strong>${name}</strong>,</p>
                <p>
                  Good news! Your Grabcash account has been <strong style="color:#06d6a0;">reactivated.</strong>. You can now continue using the platform.
                </p>
                <p>
                  You now have full access to:
                  <ul>
                    <li>Apply for jobs</li>
                    <li>Create and manage jobs</li>
                    <li>Withdraw your earnings</li>
                  </ul>
                </p>
                <p>Please ensure future activities comply with our 
                  <a href="${env.BETTER_AUTH_URL}/privacy-policy" style="color:#06d6a0;">community guidelines</a>.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:20px;">
                 <a href="${env.BETTER_AUTH_URL}/wallet"
                   style="background:#06d6a0; color:#fff; text-decoration:none; padding:12px 20px; border-radius:5px; display:inline-block;">
                   Go to wallet
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
