import { cn } from "#/utils/class-helper";
import type { ComponentPropsWithoutRef } from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
} from "react-aria-components/Button";

type Props = AriaButtonProps &
	MakeRequired<ComponentPropsWithoutRef<"button">, "children"> & {
		variant?: "plain" | "primary" | "secondary";
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
				"min-block-10.75 max-block-max trim-text squircle flex cursor-pointer items-center justify-center rounded-xl px-4 font-medium text-text transition-all duration-200 *:shrink-0 active:not-disabled:scale-95 disabled:cursor-not-allowed",
				{
					"scheme-dark bg-bg-primary hover:bg-bg-primary-hover focus-visible:bg-bg-primary-hover disabled:bg-bg-primary-disabled":
						variant === "primary",
				},
				{
					"bg-bg-secondary hover:bg-bg-secondary-hover focus-visible:bg-bg-secondary-hover":
						variant === "secondary",
				},
				className,
			)}
			{...props}>
			{children}
		</AriaButton>
	);
}
