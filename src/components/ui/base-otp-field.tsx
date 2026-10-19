import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";

import { cn } from "#/utils/class-helper";

type ClassNameProps = {
	className?: string;
};

const Root = (props: BaseOTPField.Root.Props & ClassNameProps) => {
	return (
		<BaseOTPField.Root
			{...props}
			className={cn("flex flex-wrap justify-center gap-2", props.className)}
		/>
	);
};

const Input = (props: BaseOTPField.Input.Props & ClassNameProps) => {
	return (
		<BaseOTPField.Input
			{...props}
			className={cn(
				"inline-12 block-12 squircle rounded-xl border border-border bg-bg-card text-center text-base text-text outline-transparent",
				props.className,
			)}
		/>
	);
};

const Separator = (props: BaseOTPField.Separator.Props & ClassNameProps) => {
	return (
		<BaseOTPField.Separator
			{...props}
			className={cn("block-px inline-4 bg-current text-text", props.className)}
		/>
	);
};

export const OTPField = {
	Root,
	Input,
	Separator,
};
