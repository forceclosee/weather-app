import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import ResendOtp from "#/components/profile/resend-otp";
import ResetPasswordForm from "#/components/profile/reset-password-form";
import ResetPasswordVerifyOtpForm from "#/components/profile/reset-password-verify-otp-form";
import NewPasswordForm from "#/components/profile/new-password-form";

export const Route = createFileRoute("/_profile/reset-password")({
	head: () => ({
		meta: [{ title: "Reset Password | ForeCast" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const [inputMode, setInputMode] = useState<"email" | "password" | "otp">(
		"email",
	);
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");

	return (
		<div className="mx-auto grid gap-12 px-fluid-500 py-8 inline-full max-inline-132">
			{inputMode === "email" && (
				<>
					<h1 className="text-center">Forgot your Password?</h1>
					<p>Enter your email address.</p>

					<ResetPasswordForm setInputMode={setInputMode} setEmail={setEmail} />
				</>
			)}

			{inputMode === "password" && email && (
				<>
					<p>
						Create a new password , and we will send you reset instructions.
					</p>

					<NewPasswordForm
						setInputMode={setInputMode}
						setPassword={setPassword}
						email={email}
					/>
				</>
			)}

			{inputMode === "otp" && email && (
				<>
					<ResendOtp type="reset-password" email={email} />
					<ResetPasswordVerifyOtpForm email={email} password={password} />
				</>
			)}
		</div>
	);
}
