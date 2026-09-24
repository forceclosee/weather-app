import { cn } from "#/utils/class-helper";
import {
	Button as RACButton,
	type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";

type Props = RACButtonProps & {
	variant?: "primary" | "secondary";
	className?: string;
};

export function Button({
	children,
	variant = "primary",
	className,
	...rest
}: Props) {
	return (
		<RACButton
			className={cn(
				"min-block-9.5 trim-text squircle flex cursor-pointer items-center rounded-xl px-4 font-medium text-text transition-all duration-200 active:scale-95",
				variant === "primary"
					? "bg-bg-primary hover:bg-bg-primary-hover focus-visible:bg-bg-primary-hover"
					: "bg-bg-secondary hover:bg-bg-secondary-hover focus-visible:bg-bg-secondary-hover",
				className,
			)}
			{...rest}>
			{children}
		</RACButton>
	);
}
