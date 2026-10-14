import { useNavigate } from "@tanstack/react-router";

import { useAppForm } from "#/hook/form";
import { signupSchema } from "#/lib/schema/signup-schema";
import { authClient } from "#/lib/auth-client";

import { useToastManager } from "#/components/ui/base-toast";

export default function SignupForm() {
	const navigate = useNavigate();
	const toastManager = useToastManager();

	const form = useAppForm({
		defaultValues: {
			signupName: "",
			signupEmail: "",
			signupPassword: "",
			signupConfirmPassword: "",
		},
		validators: {
			onChange: signupSchema,
			onSubmit: signupSchema,
		},

		onSubmit: async ({ value, formApi }) => {
			const { data, error } = await authClient.signUp.email({
				name: value.signupName,
				email: value.signupEmail,
				password: value.signupPassword,
			});

			if (error) {
				toastManager.add({
					type: "error",
					title: "Signup Failed",
					description: error.message
						? `${error.message}, Please try again later`
						: "Something went wrong, Please try again later",
				});

				return;
			}

			formApi.reset();

			toastManager.add({
				type: "success",
				title: "Signup successfully",
				description: `Thanks for signing up ${data.user.name}`,
			});

			/* redirect to profile dashboard */
			setTimeout(() => {
				navigate({ to: "/dashboard" });
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
				<form.AppField name="signupName">
					{(field) => (
						<field.TextField label="Name" placeholder="Enter your name" />
					)}
				</form.AppField>

				<form.AppField name="signupEmail">
					{(field) => (
						<field.TextField
							type="email"
							label="Email"
							placeholder="Enter your email address"
						/>
					)}
				</form.AppField>

				<form.AppField name="signupPassword">
					{(field) => (
						<field.PasswordField
							label="Password"
							placeholder="Create a password"
							havePasswordRules
						/>
					)}
				</form.AppField>

				<form.AppField name="signupConfirmPassword">
					{(field) => (
						<field.PasswordField
							label="Confirm Password"
							placeholder="Enter your password again"
						/>
					)}
				</form.AppField>

				<form.SubmitButton
					label="Signup"
					labelSubmitting={<span className="signup-loader"></span>}
				/>
			</form.AppForm>
		</form>
	);
}
