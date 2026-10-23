import { useFieldContext, useFormContext } from "#/hook/form";
import { toKebabCase } from "#/utils/attributes-helper";

import { Field } from "#/components/ui/base-field";
import { OTPField } from "#/components/ui/base-otp-field";

const OTP_LENGTH = 6;

export default function OtpField() {
	const form = useFormContext();
	const field = useFieldContext<string>();

	const { errors, isValid } = field.state.meta;

	const fieldName = toKebabCase(field.name);

	return (
		<form.Subscribe selector={(state) => state.submissionAttempts}>
			{(submissionAttempts) => {
				const isInputInvalid = !isValid && submissionAttempts > 0;

				return (
					<Field.Root>
						<Field.Label className="sr-only">Verification code</Field.Label>

						<OTPField.Root
							length={OTP_LENGTH}
							value={field.state.value}
							onValueChange={(value) => field.handleChange(value)}>
							{Array.from({ length: OTP_LENGTH }, (_, index) => (
								<OTPField.Input
									key={index}
									name={fieldName}
									className="hover:border-border-input hover:ring hover:ring-border-input hover:ring-inset focus:border-border-input focus:ring focus:ring-border-input focus:ring-inset"
									aria-invalid={isInputInvalid}
									aria-label={
										index === 0
											? undefined
											: `Character ${index + 1} of ${OTP_LENGTH}`
									}
								/>
							))}
						</OTPField.Root>

						{isInputInvalid && (
							<Field.Error match={true} className="text-center">
								{errors[0]?.message}
							</Field.Error>
						)}
					</Field.Root>
				);
			}}
		</form.Subscribe>
	);
}
