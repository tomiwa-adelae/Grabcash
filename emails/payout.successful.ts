import { env } from "@/lib/env";
import { formatDate } from "@/lib/utils";

export function PayoutSuccessful({
  amount,
  accountNumber,
  bankName,
  date,
  name,
}: {
  amount: string;
  name: string;
  accountNumber: string;
  bankName: string;
  date: Date;
}) {
  return `
    <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px; border:1px solid #eee;">
      <h2 style="color:#16a34a;">✅ Payout Successful</h2>
      <p>Hi ${name},</p>
      <p>We’re happy to let you know that your recent payout request has been successfully processed.</p>

      <table style="width:100%; border-collapse: collapse; margin:20px 0;">
        <tr>
          <td style="padding:8px; border:1px solid #eee;">Amount:</td>
          <td style="padding:8px; border:1px solid #eee;"><strong>₦${amount}</strong></td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #eee;">Bank:</td>
          <td style="padding:8px; border:1px solid #eee;">${bankName}</td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #eee;">Account Number:</td>
          <td style="padding:8px; border:1px solid #eee;">${accountNumber}</td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #eee;">Date:</td>
          <td style="padding:8px; border:1px solid #eee;">${formatDate(
            date
          )}</td>
        </tr>
      </table>

      <p>The funds should arrive in your bank account shortly. If you don’t see them within 24 - 48 hours, please contact your bank or our support team.</p>

      <p>Thanks for using <strong>Grabcash</strong>! Keep earning, keep winning 🚀</p>

      <p style="margin-top:30px; font-size:12px; color:#777;">
        — The Grabcash Team <br />
        <a href='${
          env.BETTER_AUTH_URL
        }/wallet' style="color:#16a34a;">Visit Wallet</a>
      </p>
    </div>
  </body>
</html>
  `;
}
