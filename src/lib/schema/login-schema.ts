import { z } from "zod";

export const loginSchema = z.object({
	loginEmail: z.email("Please enter a valid email address"),
	loginPassword: z.string().min(1, "Password cannot empty"),
	loginRememberMe: z.boolean(),
});

export type loginSchema = z.infer<typeof loginSchema>;
