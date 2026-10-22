import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";

import { cn } from "#/utils/class-helper";

interface ClassNameProps {
	className?: string;
}

interface RootProps
	extends Omit<BaseOTPField.Root.Props, "className">,
		ClassNameProps {}

const Root = (props: RootProps) => {
	return (
		<BaseOTPField.Root
			{...props}
			className={cn("flex flex-wrap justify-center gap-2", props.className)}
		/>
	);
};

interface InputProps
	extends Omit<BaseOTPField.Input.Props, "className">,
		ClassNameProps {}

const Input = (props: InputProps) => {
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

interface SeparatorProps
	extends Omit<BaseOTPField.Separator.Props, "className">,
		ClassNameProps {}

const Separator = (props: SeparatorProps) => {
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
