import type { Dispatch, SetStateAction } from "react";
import { getRouteApi } from "@tanstack/react-router";

import { useAppForm } from "#/hook/form";
import { authClient } from "#/lib/auth-client";
import { changeEmailSchema } from "#/lib/schema/profile-settings-schema";

import { useToastManager } from "#/components/ui/base-toast";

const routeApi = getRouteApi("__root__");

interface Props {
	setInputMode: Dispatch<SetStateAction<"email" | "otp">>;
	setNewEmail: Dispatch<SetStateAction<string | undefined>>;
}

export default function ChangeEmailForm({ setInputMode, setNewEmail }: Props) {
	const { user } = routeApi.useRouteContext();

	const toastManager = useToastManager();

	const form = useAppForm({
		defaultValues: {
			newEmail: user?.email ?? "",
		},
		validators: {
			onChange: changeEmailSchema,
			onSubmit: changeEmailSchema,
		},

		onSubmit: async ({ value }) => {
			const { error } = await authClient.emailOtp.requestEmailChange({
				newEmail: value.newEmail,
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

			setInputMode("otp");
			setNewEmail(value.newEmail);
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
				<form.AppField name="newEmail">
					{(field) => (
						<field.TextField
							label="New Email"
							description="Enter your new email address"
							placeholder="Enter your new email address"
						/>
					)}
				</form.AppField>

				<form.AccountSettingsSubmitButton
					label="Request Changes"
					labelSubmitting={<span className="request-changes-loader"></span>}
				/>
			</form.AppForm>
		</form>
	);
}
