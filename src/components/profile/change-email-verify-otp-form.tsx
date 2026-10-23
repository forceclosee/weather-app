import { getRouteApi } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";

import { useAppForm } from "#/hook/form";
import { authClient } from "#/lib/auth-client";
import { verifyOtpSchema } from "#/lib/schema/profile-settings-schema";

import { useToastManager } from "#/components/ui/base-toast";

const RouteApi = getRouteApi("__root__");
const changeEmailRouteApi = getRouteApi("/_profile/settings/email");

interface Props {
	newEmail?: string;
}

export default function ChangeEmailVerifyOtpForm({ newEmail }: Props) {
	const { user } = RouteApi.useRouteContext();

	const router = useRouter();
	const navigate = changeEmailRouteApi.useNavigate();

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
			if (!user || !newEmail) return;

			const { error } = await authClient.emailOtp.changeEmail({
				newEmail: newEmail,
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
				title: "Successfully change email",
				description: `Your email has been changed to ${newEmail}`,
			});

			router.invalidate();

			// remove 'verifyOtp' search params
			navigate({
				search: () => {
					return {};
				},
			});
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
					labelSubmitting={<span className="verify-loader"></span>}
				/>
			</form.AppForm>
		</form>
	);
}
