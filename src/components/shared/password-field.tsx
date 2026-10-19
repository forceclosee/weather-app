import { useRef, useState } from "react";

import { Check, Eye, EyeOff, X } from "lucide-react";

import { useFieldContext, useFormContext } from "#/hook/form";
import { toKebabCase } from "#/utils/attributes-helper";
import { classList, cn } from "#/utils/class-helper";
import { passwordRules } from "#/lib/schema/signup-schema";

import { Field, Input } from "#/components/ui/base-field";

type Props = {
	label: string;
	placeholder: string;
	havePasswordRules?: boolean;
};

export default function PasswordField({
	label,
	placeholder,
	havePasswordRules,
}: Props) {
	const form = useFormContext();
	const field = useFieldContext<string>();

	const inputRef = useRef<HTMLInputElement>(null);

	const [inputType, setInputType] = useState<"password" | "text">("password");

	const handleRevealButtonClick = () => {
		setInputType((prev) => (prev === "password" ? "text" : "password"));
		inputRef.current?.focus();
	};

	const { errors, isBlurred, isValid, isDirty } = field.state.meta;

	const fieldName = toKebabCase(field.name);

	return (
		<form.Subscribe selector={(state) => state.submissionAttempts}>
			{(submissionAttempts) => {
				const isInputInvalid =
					!isValid && (isBlurred || submissionAttempts > 0);

				const isInputValid = isValid && isDirty;

				return (
					<Field.Root className="group">
						<Field.Label>{label}</Field.Label>

						<div className="inline-full grid grid-cols-[1fr_auto]">
							<Input
								ref={inputRef}
								type={inputType}
								name={fieldName}
								placeholder={placeholder}
								value={field.state.value}
								className={cn(
									"rounded-se-none rounded-ee-none border-border border-y border-s bg-bg-card ps-4 pe-0 group-has-focus:border-border-input group-has-hover:border-border-input group-has-focus:ring-input-password group-has-hover:ring-input-password",
									{
										"border-border-error group-has-focus:border-border-error group-has-hover:border-border-error group-has-focus:ring-input-password-invalid group-has-hover:ring-input-password-invalid":
											isInputInvalid,
									},
									{
										"border-border-success group-has-focus:border-border-success group-has-hover:border-border-success group-has-focus:ring-input-password-valid group-has-hover:ring-input-password-valid":
											isInputValid,
									},
								)}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								aria-invalid={isInputInvalid}
							/>

							{/* reveal password */}
							<button
								type="button"
								className={cn(
									"block-12 inline-12 squircle inset-e-0 cursor-pointer justify-items-center rounded-se-xl rounded-ee-xl border-border border-y border-e bg-bg-card text-text-muted transition-all duration-200 hover:text-text focus:text-text focus-visible:outline-offset-0 group-has-focus:border-border-input group-has-hover:border-border-input group-has-focus:ring-input-reveal group-has-hover:ring-input-reveal",
									{
										"border-border-error group-has-focus:border-border-error group-has-hover:border-border-error group-has-focus:ring-input-reveal-invalid group-has-hover:ring-input-reveal-invalid":
											isInputInvalid,
									},
									{
										"border-border-success group-has-focus:border-border-success group-has-hover:border-border-success group-has-focus:ring-input-reveal-valid group-has-hover:ring-input-reveal-valid":
											isInputValid,
									},
								)}
								onClick={handleRevealButtonClick}
								aria-label="Toggle password visibility"
								aria-pressed={inputType === "text"}>
								{inputType === "password" ? (
									<Eye className="block-5 inline-auto" />
								) : (
									<EyeOff className="block-5 inline-auto" />
								)}
							</button>
						</div>

						{isInputInvalid && (
							<Field.Error
								match={true}
								className={classList({ "sr-only": havePasswordRules })}>
								{errors[0]?.message}
							</Field.Error>
						)}

						{havePasswordRules && (
							<ul
								className={cn(
									"block-0 group-has-aria-[invalid=true]:block-auto group-has-focus:block-auto starting:block-0! hidden overflow-clip opacity-0 starting:opacity-0! transition-all transition-discrete duration-200 group-has-aria-[invalid=true]:block group-has-focus:block group-has-aria-[invalid=true]:opacity-100 group-has-focus:opacity-100",
									{ "hidden! block-0! opacity-0!": isInputValid },
								)}>
								{passwordRules.map((rule) => {
									const isPassed = rule.test(field.state.value || "");

									return (
										<li
											key={rule.id}
											className={classList(
												"flex items-center gap-2",
												isPassed ? "text-text-success" : "text-text-muted",
											)}>
											{isPassed ? (
												<Check
													strokeWidth={3}
													className="block-[1em] inline-auto"
												/>
											) : (
												<X
													strokeWidth={3}
													className="block-[1em] inline-auto text-text-error"
												/>
											)}

											<span>{rule.label}</span>
										</li>
									);
								})}
							</ul>
						)}
					</Field.Root>
				);
			}}
		</form.Subscribe>
	);
}
