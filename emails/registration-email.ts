import { env } from "@/lib/env";

export function RegistrationEmail({ name }: { name: string }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Welcome to Earnsphere</title>
      </head>
      <body style="background-color:#f9fafb; font-family:Arial,sans-serif; margin:0; padding:0;">
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="margin:auto; background:#ffffff; padding:20px; border-radius:8px;">
          <tr>
            <td>
              <h1 style="color:#111827; font-size:24px;">Welcome to Earnsphere, ${name} 🎉</h1>
              <p style="font-size:16px; color:#374151;">
                Thanks for joining <b>Earnsphere</b> — the marketplace where you can
                <b>earn by completing simple tasks</b> or
                <b>grow your brand with campaigns</b>.
              </p>

              <p style="font-size:16px; color:#374151; margin-top:20px;">Here’s what you can do right now:</p>
              <ul style="font-size:16px; color:#374151;">
                <li>✅ Explore available jobs and start earning instantly</li>
                <li>✅ Post your first job</li>
                <li>✅ Invite friends and earn referral bonuses</li>
              </ul>

              <p style="margin:30px 0;">
                <a href={${env.NEXT_PUBLIC_BETTER_AUTH_URL}/dashboard} style="background-color:#2563eb; color:#ffffff; padding:12px 24px; border-radius:8px; text-decoration:none; font-size:16px; display:inline-block;">
                  Go to Your Dashboard
                </a>
              </p>

              <p style="font-size:14px; color:#6b7280; margin-top:40px;">
                Need help? Reply to this email or visit our
                <a href={${env.NEXT_PUBLIC_BETTER_AUTH_URL}/support} style="color:#2563eb;">Help Center</a>.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
