import { betterAuth } from "better-auth";
import { emailOTP, phoneNumber, username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { resend } from "./resend";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql", // or "mysql", "postgresql", ...etc
	}),
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	emailAndPassword: {
		enabled: true,
		// requireEmailVerification: true,
		// autoSignIn: true,
	},
	plugins: [
		emailOTP({
			otpLength: 6,
			async sendVerificationOTP({ email, otp, type }) {
				console.log(email, type, otp);
				await resend.emails.send({
					from: `Earnsphere <${env.EARNSPHERE_SENDING_EMAIL}>`,
					to: [email],
					subject: "Verify your email - Earnsphere",
					html: `<p>Your OTP is <strong>${otp}</strong></p>`,
				});
			},
		}),
		username({ minUsernameLength: 3, maxUsernameLength: 20 }),
		phoneNumber(),
	],
});
