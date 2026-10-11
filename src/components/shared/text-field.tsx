import type { HTMLInputTypeAttribute } from "react";
import { Field, Input } from "../ui/base-field";
import { toKebabCase } from "#/utils/attributes-helper";
import { useFieldContext, useFormContext } from "#/hook/form";
import { cn } from "#/utils/class-helper";

type Props = {
	label: string;
	type?: HTMLInputTypeAttribute;
	placeholder: string;
};

export default function TextField({
	label,
	type = "text",
	placeholder,
}: Props) {
	const form = useFormContext();
	const field = useFieldContext<string>();

	const { errors, isBlurred, isValid, isDirty } = field.state.meta;

	const fieldName = toKebabCase(field.name);

	return (
		<form.Subscribe selector={(state) => state.submissionAttempts}>
			{(submissionAttempts) => {
				const isInputInvalid =
					!isValid && (isBlurred || submissionAttempts > 0);

				const isInputValid = isValid && isDirty;

				return (
					<Field.Root>
						<Field.Label>{label}</Field.Label>

						<Input
							type={type}
							name={fieldName}
							placeholder={placeholder}
							value={field.state.value}
							className={cn(
								"border border-border bg-bg-card px-4 hover:border-border-input hover:ring hover:ring-border-input hover:ring-inset focus:border-border-input focus:ring focus:ring-border-input focus:ring-inset",
								{
									"border-border-error hover:border-border-error hover:ring hover:ring-border-error hover:ring-inset focus:border-border-error focus:ring focus:ring-border-error focus:ring-inset":
										isInputInvalid,
								},
								{
									"border-border-success hover:border-border-success hover:ring hover:ring-border-success hover:ring-inset focus:border-border-success focus:ring focus:ring-border-success focus:ring-inset":
										isInputValid,
								},
							)}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
							aria-invalid={isInputInvalid}
						/>

						{isInputInvalid && (
							<Field.Error match={true}>{errors[0]?.message}</Field.Error>
						)}
					</Field.Root>
				);
			}}
		</form.Subscribe>
	);
}
