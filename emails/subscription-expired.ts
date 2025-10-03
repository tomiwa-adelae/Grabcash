import { env } from "@/lib/env";

export function SubscriptionExpired({ name }: { name: string }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Subscription Expired - Grabcash</title>
  </head>
  <body style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; background:#f9fafb; color:#333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#f9fafb; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background:#2563eb; padding:20px; text-align:center;">
                <h1 style="margin:0; font-size:20px; color:#ffffff; font-weight:bold;">Grabcash</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <h2 style="color:#111827; font-size:22px; margin:0 0 15px;">Your Subscription Has Expired ⏰</h2>
                <p style="font-size:16px; line-height:24px; margin:0 0 20px;">
                  Hi <strong>${name}</strong>,<br /><br />
                  Your Grabcash subscription has expired, and you no longer have access to premium features such as:
                </p>
                <ul style="font-size:15px; line-height:22px; color:#374151; margin:0 0 20px; padding-left:20px;">
                  <li>Unlimited job postings</li>
                  <li>Higher earning limits</li>
                  <li>Priority support</li>
                  <li>Exclusive opportunities</li>
                </ul>
                <p style="font-size:16px; line-height:24px; margin:0 0 30px;">
                  Don’t miss out—renew today and continue enjoying all the benefits of your premium plan.
                </p>

                <!-- CTA Buttons -->
                <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
                  <tr>
                    <td align="center" bgcolor="#16a34a" style="border-radius:6px;">
                      <a href="${env.NEXT_PUBLIC_BETTER_AUTH_URL}/subscriptions" target="_blank" style="display:inline-block; padding:12px 24px; font-size:16px; color:#ffffff; text-decoration:none; font-weight:bold;">Renew Subscription</a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:14px; color:#6b7280; margin:20px 0 0;">
                  If you have any questions, our support team is here to help.  
                  <a href="${env.NEXT_PUBLIC_BETTER_AUTH_URL}/contact" style="color:#2563eb; text-decoration:none;">Contact Support</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f3f4f6; text-align:center; padding:15px; font-size:12px; color:#6b7280;">
                © 2025 Grabcash. All rights reserved.
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
