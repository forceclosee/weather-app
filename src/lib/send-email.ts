import OtpEmail from "#/emails/otp-email";
import { createServerOnlyFn } from "@tanstack/react-start";
import { Resend } from "resend";

const resendApiKey = createServerOnlyFn(() => {
	const url = process.env.RESEND_API_KEY;
	if (!url) {
		throw new Error("resend api key not found");
	}
	return url;
});

const resend = new Resend(resendApiKey());

interface SendEmailParams {
	type: "sign-in" | "email-verification" | "forget-password" | "change-email";
	to: string;
	otp: string;
}

export async function sendEmail({ type, to, otp }: SendEmailParams) {
	const subject = {
		"email-verification": "Verify your email address",
		"sign-in": "Verify your login",
		"change-email": "Confirm your new email address",
		"forget-password": "Confirm your password reset",
	};

	await resend.emails.send({
		from: "Forecast <no-reply@verify.forecast.web.id>",
		to: to,
		subject: subject[type],
		react: OtpEmail({ type, otp }),
	});
}
