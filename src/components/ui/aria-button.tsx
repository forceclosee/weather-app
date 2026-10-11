import { cn } from "#/utils/class-helper";
import type { ComponentProps } from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
} from "react-aria-components/Button";

type Props = AriaButtonProps &
	ComponentProps<"button"> & {
		variant?: "primary" | "secondary";
		className?: string;
	};

export function Button({
	children,
	variant = "primary",
	className,
	...props
}: Props) {
	return (
		<AriaButton
			className={cn(
				"min-block-10.75 max-block-max trim-text squircle flex cursor-pointer items-center justify-center rounded-xl px-4 font-medium text-text transition-all duration-200 active:not-disabled:scale-95 disabled:cursor-not-allowed",
				variant === "primary"
					? "bg-bg-primary hover:bg-bg-primary-hover focus-visible:bg-bg-primary-hover disabled:bg-bg-primary-disabled"
					: "bg-bg-secondary hover:bg-bg-secondary-hover focus-visible:bg-bg-secondary-hover",
				className,
			)}
			{...props}>
			{children}
		</AriaButton>
	);
}
