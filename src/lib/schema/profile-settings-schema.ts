import { z } from "zod";

export const verifyOtpSchema = z.object({
	otp: z.string().min(6, "Please enter the 6 digit OTP"),
});

export type verifyOtpSchema = z.infer<typeof verifyOtpSchema>;

export const editProfileSchema = z.object({
	newName: z.string().min(2, "Name must be at least 2 characters"),
});

export type editProfileSchema = z.infer<typeof editProfileSchema>;

export const changeEmailSchema = z.object({
	newEmail: z.email("Please enter a valid email address"),
});

export type changeEmailSchema = z.infer<typeof changeEmailSchema>;
