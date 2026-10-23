import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import TextField from "#/components/field-and-form-components/text-field";
import PasswordField from "#/components/field-and-form-components/password-field";
import OtpField from "#/components/field-and-form-components/otp-field";
import SubmitButton from "#/components/field-and-form-components/submit-button";
import VerifyOtpSubmitButton from "#/components/field-and-form-components/verify-otp-submit-button";
import AccountSettingsSubmitButton from "#/components/field-and-form-components/account-settings-submit-button";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldContext: fieldContext,
	formContext: formContext,
	fieldComponents: { TextField, PasswordField, OtpField },
	formComponents: {
		SubmitButton,
		VerifyOtpSubmitButton,
		AccountSettingsSubmitButton,
	},
});
