import z from "zod";

export const newsLetterSchema = z.object({
	email: z.string().email().min(2, {
		message: "Email must be at least 2 characters.",
	}),
});

export const helpFormSchema = z.object({
	fullname: z.string().min(2, {
		message: "Full name must be at least 2 characters.",
	}),
	email: z.string().email().min(2, {
		message: "Email must be at least 2 characters.",
	}),
	message: z.string().min(2, {
		message: "Message must be at least 2 characters.",
	}),
});

export const contactFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email().min(2, {
		message: "Email must be at least 2 characters.",
	}),
	subject: z.string().min(2, {
		message: "Message must be at least 2 characters.",
	}),
	message: z.string().min(2, {
		message: "Message must be at least 2 characters.",
	}),
});

export type NewsLetterSchemaType = z.infer<typeof newsLetterSchema>;
export type HelpFormSchemaType = z.infer<typeof helpFormSchema>;
export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
