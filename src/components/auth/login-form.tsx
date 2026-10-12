import { useAppForm } from "#/hook/form";
import { loginSchema } from "#/lib/schema/login-schema";

export default function LoginForm() {
	const form = useAppForm({
		defaultValues: {
			loginEmail: "",
			loginPassword: "",
		},
		validators: {
			onChange: loginSchema,
			onSubmit: loginSchema,
		},
		onSubmit: async () => {
			// lempar ke better auth
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
