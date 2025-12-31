import { env } from "@/lib/env";

export function ReferralBonusEmail({
  referrerName,
  referredUserName,
  bonusAmount = "500",
}: {
  referrerName: string;
  referredUserName: string;
  bonusAmount?: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="margin: 40px auto; background: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
        <tr>
          <td style="text-align: center; padding: 20px;">
            <h1 style="color: #059669; margin-bottom: 10px; font-size: 24px;">🎉 You've Earned a Bonus!</h1>
            <p style="color: #374151; font-size: 16px;">
              Hi ${referrerName}, great news! 
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; background: #ecfdf5; border-radius: 8px; text-align: center;">
            <p style="font-size: 18px; color: #065f46; margin: 0;">
              <b>${referredUserName}</b> just joined grabcash using your code.
            </p>
            <h2 style="color: #059669; font-size: 32px; margin: 10px 0;">+₦${bonusAmount}</h2>
            <p style="color: #065f46; font-size: 14px;">has been added to your earnings.</p>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; padding: 30px;">
            <a href="${env.NEXT_PUBLIC_BETTER_AUTH_URL}/dashboard" 
               style="display: inline-block; padding: 12px 24px; background: #111827; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
              View My Balance
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">
              Thank you for growing the grabcash community!
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
