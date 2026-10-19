import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";

import { sendEmail } from "#/lib/send-email";
import { db } from "#/db/index";
import * as authSchema from "#/db/schema/auth-schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		emailOTP({
			async sendVerificationOTP({ type, email, otp }) {
				switch (type) {
					case "email-verification":
						await sendEmail({
							type: "email-verification",
							to: email,
							otp: otp,
						});
						break;
				}
			},
			overrideDefaultEmailVerification: true,
		}),
		tanstackStartCookies(),
	],
});
