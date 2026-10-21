import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import OtpField from "#/components/shared/otp-field";
import PasswordField from "#/components/shared/password-field";
import VerifyOtpSubmitButton from "#/components/shared/verify-otp-submit-button";
import SubmitButton from "#/components/shared/submit-button";
import TextField from "#/components/shared/text-field";
import EditProfileSubmitButton from "#/components/shared/edit-profile-submit-button";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldContext: fieldContext,
	formContext: formContext,
	fieldComponents: { TextField, PasswordField, OtpField },
	formComponents: {
		SubmitButton,
		VerifyOtpSubmitButton,
		EditProfileSubmitButton,
	},
});
