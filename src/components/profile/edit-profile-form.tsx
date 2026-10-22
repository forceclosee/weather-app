import { useRouter, getRouteApi } from "@tanstack/react-router";

import { useAppForm } from "#/hook/form";
import { authClient } from "#/lib/auth-client";
import { editProfileSchema } from "#/lib/schema/profile-settings-schema";

import { useToastManager } from "#/components/ui/base-toast";

const RouteApi = getRouteApi("__root__");

export default function EditProfileForm() {
	const { user } = RouteApi.useRouteContext();

	const router = useRouter();

	const toastManager = useToastManager();

	const form = useAppForm({
		defaultValues: {
			newName: user?.name ?? "",
		},
		validators: {
			onChange: editProfileSchema,
			onSubmit: editProfileSchema,
		},

		onSubmit: async ({ value, formApi }) => {
			const { error } = await authClient.updateUser({
				name: value.newName,
			});

			if (error) {
				toastManager.add({
					type: "error",
					title: "Failed to update profile",
					description: error.message
						? `${error.message}, Please try again later`
						: "Something went wrong, Please try again later",
				});

				return;
			}

			formApi.reset();

			toastManager.add({
				type: "success",
				title: "Profile updated",
				description: `Your name has been changed to ${value.newName}`,
			});

			router.invalidate();
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
				<form.AppField name="newName">
					{(field) => (
						<field.TextField
							label="Name"
							description="Enter your new name"
							placeholder="Enter your new name"
						/>
					)}
				</form.AppField>

				<form.EditProfileSubmitButton
					label="Save Changes"
					labelSubmitting={<span className="edit-profile-loader"></span>}
				/>
			</form.AppForm>
		</form>
	);
}
