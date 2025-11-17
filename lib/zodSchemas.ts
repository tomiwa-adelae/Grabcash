import z, { optional } from "zod";

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

export const registerSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    phoneNumber: z.string().regex(/^(\+?\d{10,15})$/, {
      message: "Enter a valid phone number.",
    }),
    // referral: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number.",
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(2, { message: "Enter your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // 👈 attach the error to confirmPassword
  });

export const verifyEmailSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  code: z
    .string()
    .min(2, {
      message: "Code must be 6 characters.",
    })
    .max(6, { message: "Code must be 6 characters" }),
});

export const loginSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, { message: "Enter your password" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export const verifyCodeSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  code: z
    .string()
    .min(2, {
      message: "Code must be 6 characters.",
    })
    .max(6, { message: "Code must be 6 characters" }),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(2, {
      message: "Code must be 6 characters.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number.",
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(2, { message: "Enter your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // 👈 attach the error to confirmPassword
  });

export const onboardingProfileSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .regex(/^[a-zA-Z]/, "Username must start with a letter"),
    phoneNumber: z.string().regex(/^(\+?\d{10,15})$/, {
      message: "Enter a valid phone number.",
    }),
    country: z
      .string()
      .min(2, {
        message: "Country must be selected.",
      })
      .optional(),
    bio: z.string().optional(),
    accountName: z.string().min(3, {
      message: "Account name must be at least 3 character.",
    }),
    bankName: z.string().min(8, {
      message: "Bank must be selected.",
    }),
    accountNumber: z.string().min(8, {
      message: "Account number must be at least 8 character.",
    }),
    image: z.string().optional(),
    socialLinks: z
      .array(
        z.object({
          url: z.string().url({ message: "Please enter a valid URL" }),
        })
      )
      .optional(), // makes the whole field optional
    selectedAvatar: z.string().optional(),
  })
  .refine((data) => data.image || data.selectedAvatar, {
    message: "Please select an avatar or upload a profile picture",
    path: ["image"],
  });

export const onboardingPrismaProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .regex(/^[a-zA-Z]/, "Username must start with a letter"),
  phoneNumber: z.string().regex(/^(\+?\d{10,15})$/, {
    message: "Enter a valid phone number.",
  }),
  country: z
    .string()
    .min(2, {
      message: "Country must be selected.",
    })
    .optional(),
  bio: z.string().optional(),
  accountName: z.string().min(3, {
    message: "Account name must be at least 3 character.",
  }),
  bankName: z.string().min(8, {
    message: "Bank must be selected.",
  }),
  accountNumber: z.string().min(8, {
    message: "Account number must be at least 8 character.",
  }),
  image: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
        url: z.string().url({ message: "Please enter a valid URL" }),
      })
    )
    .optional(), // makes the whole field optional
});

export const onboardingIdentitySchema = z.object({
  dob: z
    .string()
    .min(1, { message: "Date of birth is required." })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format.",
    }),
  identificationType: z.string().min(2, {
    message: "Identification type must be selected.",
  }),
  identificationNumber: z
    .string()
    .min(11, {
      message: "Identification number must be at least 11 character.",
    })
    .max(11, {
      message: "Identification number must be at least 11 character.",
    }),
});

export const proofFormSchema = z.object({
  additionalInformation: z.string().optional(),
});

export const newJobFormSchema = z.object({
  type: z.enum(["micro", "bounty"], {
    message: "Please select the type of job",
  }),
  title: z
    .string()
    .min(2, { message: "Please enter the title for the job" })
    .max(200, { message: "Title should not exceed 200 characters" }),
  category: z
    .string()
    .min(2, { message: "Please select the category for the job" }),
  description: z
    .string()
    .min(2, { message: "Please enter a description for the job" }),
  jobLink: z
    .string()
    .url({ message: "Please enter a link for workers to start your job" }),
  // deadline: z
  //   .string()
  //   .min(1, { message: "Submission deadline is required." })
  //   .refine((val) => !isNaN(Date.parse(val)), {
  //     message: "Invalid date format.",
  //   }),
  reward: z
    .string()
    .min(1, { message: "Reward is required" })
    .transform((val) => {
      // Remove commas and convert to number for validation
      const numericValue = parseFloat(val.replace(/,/g, ""));
      return numericValue;
    })
    .refine((val) => !isNaN(val) && val >= 15, {
      message: "Rewards must be at least ₦15",
    })
    .transform((val) => val.toString()), // Convert back to string if needed
  noOfWorkers: z
    .string()
    .min(1, { message: "Please select the numbers of workers required" }),
  // estimatedTime: z.string().min(1, { message: "Please select estimated time" }),
  // estimatedTimeUnit: z
  //   .string()
  //   .min(1, { message: "Please select estimated time unit" }),
  instructions: z
    .string()
    .min(2, { message: "Please enter the job's instructions" }),
  proofOfCompletion: z.string().min(2, {
    message: "Please enter the required proof of completion for the job",
  }),
  submissionType: z.enum([
    "screenshots",
    "documents",
    "link",
    "shortText",
    "longParagraph",
  ]),
  submissionRequired: z.enum(["required", "optional"], {
    message: "Please specify if submission is required or optional",
  }),
  finalNotes: z.string().optional(),
});

export const editPersonalDetailsSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .regex(/^[a-zA-Z]/, "Username must start with a letter"),
  phoneNumber: z.string().regex(/^(\+?\d{10,15})$/, {
    message: "Enter a valid phone number.",
  }),
  country: z
    .string()
    .min(2, {
      message: "Country must be selected.",
    })
    .optional(),
  bio: z.string().optional(),
});

export const editBankDetailsSchema = z.object({
  accountName: z.string().min(3, {
    message: "Account name must be at least 3 character.",
  }),
  bankName: z.string().min(8, {
    message: "Bank must be selected.",
  }),
  accountNumber: z.string().min(8, {
    message: "Account number must be at least 8 character.",
  }),
});

export const editSocialMediaSchema = z.object({
  socialLinks: z
    .array(
      z.object({
        url: z.string().url({ message: "Please enter a valid URL" }),
      })
    )
    .optional(), // makes the whole field optional
  selectedAvatar: z.string().optional(),
});

export const changePasswordFormSchema = (hashPassword: string | null) =>
  z
    .object({
      newPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .refine((val) => /[a-z]/.test(val), {
          message: "Password must contain at least one lowercase letter.",
        })
        .refine((val) => /[A-Z]/.test(val), {
          message: "Password must contain at least one uppercase letter.",
        })
        .refine((val) => /[0-9]/.test(val), {
          message: "Password must contain at least one number.",
        })
        .refine((val) => /[!@#$%^&*(),.?\":{}|<>]/.test(val), {
          message: "Password must contain at least one special character.",
        }),

      confirmPassword: z.string().min(2, { message: "Enter your password" }),
      oldPassword: z.string().optional(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .superRefine((data, ctx) => {
      if (hashPassword && !data.oldPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Current password is required",
          path: ["oldPassword"],
        });
      }
    });

export type NewsLetterSchemaType = z.infer<typeof newsLetterSchema>;
export type HelpFormSchemaType = z.infer<typeof helpFormSchema>;
export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type VerifyEmailSchemaType = z.infer<typeof verifyEmailSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type OnboardingProfileSchemaType = z.infer<
  typeof onboardingProfileSchema
>;
export type OnboardingPrismaProfileSchemaType = z.infer<
  typeof onboardingPrismaProfileSchema
>;
export type OnboardingIdentitySchemaType = z.infer<
  typeof onboardingIdentitySchema
>;
export type ProofFormSchemaType = z.infer<typeof proofFormSchema>;
export type NewJobFormSchemaType = z.infer<typeof newJobFormSchema>;
export type EditPersonalDetailsSchemaType = z.infer<
  typeof editPersonalDetailsSchema
>;
export type EditBankDetailsSchemaType = z.infer<typeof editBankDetailsSchema>;
export type EditSocialMediaSchemaType = z.infer<typeof editSocialMediaSchema>;

export type ChangePasswordFormSchemaType = z.infer<
  ReturnType<typeof changePasswordFormSchema>
>;
