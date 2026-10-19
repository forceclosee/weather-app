import { z } from "zod";

export const verifyOtpSchema = z.object({
	otp: z.string().min(6, "Please enter the 6 digit OTP"),
});

export type loginSchema = z.infer<typeof verifyOtpSchema>;
