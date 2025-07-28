import { betterAuth } from "better-auth";
import { emailOTP, phoneNumber, username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { resend } from "./resend";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url, token }) => {
			const resetURL = `${env.BETTER_AUTH_URL}/reset-password?token=${token}&email=${user.email}`;
			let subject = "";
			let content = "";
			subject = "Reset your password - Earnsphere";
			content = `
						<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
							<div style="text-align: center; margin-bottom: 30px;">
								<h1 style="color: #333; margin-bottom: 10px;">Password Reset</h1>
								<p style="color: #666; font-size: 16px;">Reset your Earnsphere password</p>
							</div>
							
							<div style="background: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center; margin-bottom: 30px;">
								<p style="color: #333; font-size: 16px; margin-bottom: 20px;">
									Please use this verification code to reset your password:
								</p>
								<div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; display: inline-block;">
									<span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333; font-family: monospace;">
										${resetURL}
									</span>
								</div>
								<p style="color: #666; font-size: 14px; margin-top: 20px;">
									This code will expire in 5 minutes
								</p>
							</div>
							
							<div style="border-top: 1px solid #e9ecef; padding-top: 20px; text-align: center;">
								<p style="color: #666; font-size: 14px; margin: 0;">
									If you didn't request a password reset, please ignore this email.
								</p>
							</div>
						</div>
					`;
			await resend.emails.send({
				from: `Earnsphere <${env.EARNSPHERE_SENDING_EMAIL}>`,
				to: [user.email],
				subject,
				html: content,
			});
		},
	},
	plugins: [
		emailOTP({
			otpLength: 6,
			async sendVerificationOTP({ email, otp, type }) {
				let subject = "";
				let content = "";

				if (type === "email-verification") {
					subject = "Verify your email - Earnsphere";
					content = `
						<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
							<div style="text-align: center; margin-bottom: 30px;">
								<h1 style="color: #333; margin-bottom: 10px;">Email Verification</h1>
								<p style="color: #666; font-size: 16px;">Welcome to Earnsphere!</p>
							</div>
							
							<div style="background: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center; margin-bottom: 30px;">
								<p style="color: #333; font-size: 16px; margin-bottom: 20px;">
									Please use this verification code to complete your registration:
								</p>
								<div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; display: inline-block;">
									<span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333; font-family: monospace;">
										${otp}
									</span>
								</div>
								<p style="color: #666; font-size: 14px; margin-top: 20px;">
									This code will expire in 5 minutes
								</p>
							</div>
							
							<div style="border-top: 1px solid #e9ecef; padding-top: 20px; text-align: center;">
								<p style="color: #666; font-size: 14px; margin: 0;">
									If you didn't create an account with Earnsphere, please ignore this email.
								</p>
							</div>
						</div>
					`;
				} else if (type === "forget-password") {
					subject = "Reset your password - Earnsphere";
					content = `
						<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
							<div style="text-align: center; margin-bottom: 30px;">
								<h1 style="color: #333; margin-bottom: 10px;">Password Reset</h1>
								<p style="color: #666; font-size: 16px;">Reset your Earnsphere password</p>
							</div>
							
							<div style="background: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center; margin-bottom: 30px;">
								<p style="color: #333; font-size: 16px; margin-bottom: 20px;">
									Please use this verification code to reset your password:
								</p>
								<div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; display: inline-block;">
									<span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333; font-family: monospace;">
										${otp}
									</span>
								</div>
								<p style="color: #666; font-size: 14px; margin-top: 20px;">
									This code will expire in 5 minutes
								</p>
							</div>
							
							<div style="border-top: 1px solid #e9ecef; padding-top: 20px; text-align: center;">
								<p style="color: #666; font-size: 14px; margin: 0;">
									If you didn't request a password reset, please ignore this email.
								</p>
							</div>
						</div>
					`;
				}

				await resend.emails.send({
					from: `Earnsphere <${env.EARNSPHERE_SENDING_EMAIL}>`,
					to: [email],
					subject,
					html: content,
				});
			},
		}),
		username({ minUsernameLength: 3, maxUsernameLength: 20 }),
		phoneNumber(),
	],
});
