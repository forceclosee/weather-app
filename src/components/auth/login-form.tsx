import { useNavigate } from "@tanstack/react-router";

import { useAppForm } from "#/hook/form";
import { loginSchema } from "#/lib/schema/login-schema";
import { authClient } from "#/lib/auth-client";

import { useToastManager } from "#/components/ui/base-toast";

export default function LoginForm() {
	const navigate = useNavigate();
	const toastManager = useToastManager();

	const form = useAppForm({
		defaultValues: {
			loginEmail: "",
			loginPassword: "",
		},
		validators: {
			onChange: loginSchema,
			onSubmit: loginSchema,
		},

		onSubmit: async ({ value, formApi }) => {
			const { data, error } = await authClient.signIn.email({
				email: value.loginEmail,
				password: value.loginPassword,
			});

			if (error) {
				toastManager.add({
					type: "error",
					title: "Login Failed",
					description: error.message
						? `${error.message}, Please try again later`
						: "Something went wrong, Please try again later",
				});

				return;
			}

			formApi.reset();

			toastManager.add({
				type: "success",
				title: "Login successfully",
				description: `Welcome back ${data.user.name}`,
			});

			/* redirect to profile dashboard */
			setTimeout(() => {
				navigate({ to: "/" });
			}, 4000);
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
				<form.AppField name="loginEmail">
					{(field) => (
						<field.TextField
							type="email"
							label="Email"
							placeholder="Enter your email address"
						/>
					)}
				</form.AppField>

				<form.AppField name="loginPassword">
					{(field) => (
						<field.PasswordField
							label="Password"
							placeholder="Enter your password"
						/>
					)}
				</form.AppField>

				<form.SubmitButton
					label="Login"
					labelSubmitting={<span className="login-loader"></span>}
				/>
			</form.AppForm>
		</form>
	);
}
