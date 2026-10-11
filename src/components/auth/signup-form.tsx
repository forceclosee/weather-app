import { useAppForm } from "#/hook/form";
import { signupSchema } from "#/lib/schema/signup-schema";

export default function SignupForm() {
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
