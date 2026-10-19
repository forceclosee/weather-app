import { getRouteApi, useNavigate } from "@tanstack/react-router";

import { useAppForm } from "#/hook/form";
import { authClient } from "#/lib/auth-client";
import { verifyOtpSchema } from "#/lib/schema/profile-settings-schema";

import { useToastManager } from "#/components/ui/base-toast";

const RouteApi = getRouteApi("__root__");

export default function OtpVerifyEmailForm() {
	const { user } = RouteApi.useRouteContext();

	const navigate = useNavigate();

	const toastManager = useToastManager();

	const form = useAppForm({
		defaultValues: {
			otp: "",
		},
		validators: {
			onChange: verifyOtpSchema,
			onSubmit: verifyOtpSchema,
		},

		onSubmit: async ({ value, formApi }) => {
			const { data, error } = await authClient.emailOtp.verifyEmail({
				email: user?.email ?? "",
				otp: value.otp,
			});

			if (error) {
				toastManager.add({
					type: "error",
					title: "Verify failed",
					description: error.message
						? `${error.message}, Please enter the correct OTP or request a new OTP by clicking 'Resend OTP'`
						: "Something went wrong, Please try again later",
				});
				//

				return;
			}

			formApi.reset();

			toastManager.add({
				type: "success",
				title: "Your email has been verified",
				description: `Thank you for verifying ${data.user.name}`,
			});

			/* redirect to dashboard */
			setTimeout(() => {
				navigate({ to: "/dashboard", replace: true });
			}, 1000);
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

				<form.SettingsSubmitButton
					label="Verify"
					labelSubmitting={<span className="verify-loader"></span>}
				/>
			</form.AppForm>
		</form>
	);
}
