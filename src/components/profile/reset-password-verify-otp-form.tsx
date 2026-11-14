import { getRouteApi } from "@tanstack/react-router";

import { useAppForm } from "#/hook/form";
import { authClient } from "#/lib/auth-client";
import { resetPasswordVerifySchema } from "#/lib/schema/reset-password-schema";

import { useToastManager } from "#/components/ui/base-toast";

const changeEmailRouteApi = getRouteApi("/_profile/settings/email");

interface Props {
	email: string;
	password: string;
}

export default function ResetPasswordVerifyOtpForm({ email, password }: Props) {
	const navigate = changeEmailRouteApi.useNavigate();

	const toastManager = useToastManager();

	const form = useAppForm({
		defaultValues: {
			otp: "",
		},
		validators: {
			onChange: resetPasswordVerifySchema,
			onSubmit: resetPasswordVerifySchema,
		},

		onSubmit: async ({ value, formApi }) => {
			const { error } = await authClient.emailOtp.resetPassword({
				email: email,
				otp: value.otp,
				password: password,
			});

			if (error) {
				toastManager.add({
					type: "error",
					title: "Verify failed",
					description: error.message
						? `${error.message}, Please enter the correct OTP or request a new OTP by clicking 'Resend OTP'`
						: "Something went wrong, Please try again later",
				});

				return;
			}

			formApi.reset();

			toastManager.add({
				type: "success",
				title: "Successfully reset password",
				description: "Your password has been reset",
			});

			navigate({ to: "/login", replace: true });
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
				<form.AppField name="otp">
					{(field) => <field.OtpField />}
				</form.AppField>

				<form.VerifyOtpSubmitButton
					label="Verify"
					labelSubmitting={
						<span className="submit-loader" data-label="Verifying"></span>
					}
				/>
			</form.AppForm>
		</form>
	);
}
