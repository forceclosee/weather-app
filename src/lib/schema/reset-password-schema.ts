import z from "zod";

export const resetPasswordSchema = z.object({
	email: z.email("Please enter a valid email address"),
});

export type resetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const resetPasswordNewPasswordFormSchema = z.object({
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(
			/[^a-zA-Z0-9]/,
			"Password must contain at least one special character",
		),
});

export type resetPasswordNewPasswordFormSchema = z.infer<
	typeof resetPasswordNewPasswordFormSchema
>;

export const resetPasswordVerifySchema = z.object({
	otp: z.string().min(6, "Please enter the 6 digit OTP"),
});

export type resetPasswordVerifySchema = z.infer<
	typeof resetPasswordVerifySchema
>;
