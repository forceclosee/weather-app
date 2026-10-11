import PasswordField from "#/components/shared/password-field";
import SubmitButton from "#/components/shared/submit-button";
import TextField from "#/components/shared/text-field";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldContext: fieldContext,
	formContext: formContext,
	fieldComponents: { TextField: TextField, PasswordField: PasswordField },
	formComponents: { SubmitButton: SubmitButton },
});
