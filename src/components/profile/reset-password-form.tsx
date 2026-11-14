import type { Dispatch, SetStateAction } from "react";

import { useAppForm } from "#/hook/form";
import { resetPasswordSchema } from "#/lib/schema/reset-password-schema";

interface Props {
	setInputMode: Dispatch<SetStateAction<"email" | "password" | "otp">>;
	setEmail: Dispatch<SetStateAction<string>>;
}

export default function ResetPasswordForm({ setInputMode, setEmail }: Props) {
	const form = useAppForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onChange: resetPasswordSchema,
			onSubmit: resetPasswordSchema,
		},

		onSubmit: async ({ value }) => {
			setEmail(value.email);
			setInputMode("password");
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
				<form.AppField name="email">
					{(field) => (
						<field.TextField
							label="Email"
							description="Enter your  email address"
							placeholder="Enter your  email address"
						/>
					)}
				</form.AppField>

				<form.SubmitButton label="Reset Password" />
			</form.AppForm>
		</form>
	);
}
