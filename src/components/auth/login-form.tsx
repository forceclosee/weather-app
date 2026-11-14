import { getRouteApi, useNavigate } from "@tanstack/react-router";

import { useAppForm } from "#/hook/form";
import { loginSchema } from "#/lib/schema/login-schema";
import { authClient } from "#/lib/auth-client";

import { useToastManager } from "#/components/ui/base-toast";
import Link from "../ui/link";

const routeApi = getRouteApi("/_auth/login");

export default function LoginForm() {
	const navigate = useNavigate();
	const { redirect } = routeApi.useSearch();

	const toastManager = useToastManager();

	const form = useAppForm({
		defaultValues: {
			loginEmail: "",
			loginPassword: "",
			loginRememberMe: true,
		},
		validators: {
			onChange: loginSchema,
			onSubmit: loginSchema,
		},

		onSubmit: async ({ value, formApi }) => {
			const { data, error } = await authClient.signIn.email({
				email: value.loginEmail,
				password: value.loginPassword,
				rememberMe: value.loginRememberMe,
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

			// redirect to previous user route, fallback to homepage
			navigate({ to: redirect || "/", replace: true });
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

				<div className="flex flex-wrap items-center justify-between gap-4">
					<form.AppField name="loginRememberMe">
						{(field) => (
							<field.CheckboxField
								label="Remember me?"
								description="If checked, you will stay logged in after closing the browser tab."
							/>
						)}
					</form.AppField>

					<Link
						variant="plain"
						to="/reset-password"
						className="text-text-primary hover-underline">
						Forget password?
					</Link>
				</div>

				<form.SubmitButton
					label="Login"
					labelSubmitting={<span className="login-loader"></span>}
				/>
			</form.AppForm>
		</form>
	);
}
