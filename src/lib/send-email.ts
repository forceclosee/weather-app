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

type SendEmailParams = {
	type: "sign-in" | "email-verification" | "forget-password" | "change-email";
	to: string;
	otp: string;
};

export async function sendEmail({ type, to, otp }: SendEmailParams) {
	const emailSubject = () => {
		switch (type) {
			case "email-verification":
				return "Verify your email address";
			case "sign-in":
				return "Verify your login";
			case "change-email":
				return "Confirm your new email address";
			case "forget-password":
				return "Confirm your password change";
		}
	};

	await resend.emails.send({
		from: "Forecast <no-reply@verify.forecast.web.id>",
		to: to,
		subject: emailSubject(),
		react: OtpEmail({ type, otp }),
	});
}
