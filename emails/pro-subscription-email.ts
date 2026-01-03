import { env } from "@/lib/env";

export function ProSubscriptionEmail({
  name,
  plan,
}: {
  name: string;
  plan: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Welcome to grabcash Pro</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="margin: 40px auto; background: #ffffff; border-radius: 8px; padding: 20px;">
          
          <!-- Header -->
          <tr>
            <td style="text-align: center; padding: 20px;">
              <h1 style="color: #111827; margin-bottom: 10px; font-size: 24px;">🎉 Welcome to grabcash Pro!</h1>
              <p style="color: #6b7280; font-size: 16px; margin: 0;">
                Hi ${name}, your Pro subscription is now active.
              </p>
            </td>
          </tr>

          <!-- Confirmation -->
          <tr>
            <td style="padding: 20px; text-align: center; background: #f3f4f6; border-radius: 8px;">
              <p style="color: #111827; font-size: 16px; margin-bottom: 8px;">
                You are currently on the <b>${plan} Plan</b>.
              </p>
              <p style="color: #374151; font-size: 14px; margin: 0;">
                Enjoy uninterrupted access to premium features and earning opportunities.
              </p>
            </td>
          </tr>

          <!-- Features -->
          <tr>
            <td style="padding: 30px 20px;">
              <h2 style="font-size: 18px; color: #111827; margin-bottom: 15px;">✨ Your Pro Benefits</h2>
              <ul style="padding-left: 20px; color: #374151; font-size: 15px; line-height: 1.6;">
                <li>Access real, verified earning tasks</li>
                <li>Weekly payouts to your bank or wallet</li>
                <li>Join bounty campaigns & create job listings</li>
                <li>Earn from referrals & affiliate programs</li>
                <li>Full access to the grabcash Academy</li>
                <li>Advanced search & filtering tools</li>
                <li>Eligibility for Leaderboards & Hall of Champions</li>
                <li>Premium customer support</li>
              </ul>
            </td>
          </tr>

          <!-- Call to Action -->
          <tr>
            <td style="text-align: center; padding: 20px;">
              <a href={${env.NEXT_PUBLIC_BETTER_AUTH_URL}/dashboard}
                 style="display: inline-block; padding: 12px 24px; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
                Go to Dashboard
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Thanks for being part of grabcash.<br />
                You can manage your subscription anytime from your account settings.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
