import type { Dispatch, SetStateAction } from "react";

import { useAppForm } from "#/hook/form";
import { resetPasswordNewPasswordFormSchema } from "#/lib/schema/reset-password-schema";
import { authClient } from "#/lib/auth-client";

import { useToastManager } from "#/components/ui/base-toast";

interface Props {
	setPassword: Dispatch<SetStateAction<string>>;
	setInputMode: Dispatch<SetStateAction<"email" | "password" | "otp">>;
	email: string;
}

export default function NewPasswordForm({
	setInputMode,
	setPassword,
	email,
}: Props) {
	const toastManager = useToastManager();

	const form = useAppForm({
		defaultValues: {
			password: "",
		},
		validators: {
			onChange: resetPasswordNewPasswordFormSchema,
			onSubmit: resetPasswordNewPasswordFormSchema,
		},

		onSubmit: async ({ value, formApi }) => {
			const { error } = await authClient.emailOtp.requestPasswordReset({
				email: email,
			});

			if (error) {
				toastManager.add({
					type: "error",
					title: "Failed to send OTP",
					description: error.message
						? `${error.message}, Please try again later`
						: "Something went wrong, Please try again later",
				});

				return;
			}

			toastManager.add({
				type: "success",
				title: "Successfully sent OTP",
				description: "OTP has been sent to your email address",
			});

			setPassword(value.password);
			setInputMode("otp");

			formApi.reset();
		},

		onSubmitInvalid() {
			const invalidInput = document.querySelector<HTMLInputElement>(
				"[aria-invalid='true']",
			);

			invalidInput?.focus();
		},
	});

	return (
		<form
			noValidate
			className="grid gap-6"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}>
			<form.AppForm>
				<form.AppField name="password">
					{(field) => (
						<field.PasswordField
							havePasswordRules
							label="New Password"
							placeholder="Enter new password"
						/>
					)}
				</form.AppField>

				<form.SubmitButton
					label="Reset Password"
					labelSubmitting={
						<span className="submit-loader" data-label="Sending Otp"></span>
					}
				/>
			</form.AppForm>
		</form>
	);
}
