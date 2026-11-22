import { cn } from "#/utils/class-helper";
import type { Ref } from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
} from "react-aria-components/Button";

export interface ButtonProps extends MakeRequired<AriaButtonProps, "children"> {
	ref?: Ref<HTMLButtonElement>;
	variant?: "plain" | "primary" | "secondary";
	className?: string;
}

export function Button({
	children,
	variant = "primary",
	type = "button",
	className,
	...props
}: ButtonProps) {
	return (
		<AriaButton
			type={type}
			className={cn(
				"flex cursor-pointer items-center justify-center font-medium text-text transition-all duration-200 trim-text *:shrink-0 active:not-disabled:scale-95 disabled:cursor-not-allowed",
				{
					"rounded-xl bg-bg-primary px-4 scheme-dark max-block-max min-block-10.75 squircle hover:bg-bg-primary-hover focus-visible:bg-bg-primary-hover disabled:bg-bg-primary-disabled":
						variant === "primary",
				},
				{
					"rounded-xl bg-bg-secondary px-4 max-block-max min-block-10.75 squircle hover:bg-bg-secondary-hover focus-visible:bg-bg-secondary-hover":
						variant === "secondary",
				},
				className,
			)}
			{...props}>
			{children}
		</AriaButton>
	);
}
