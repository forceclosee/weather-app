import { cn } from "#/utils/class-helper";
import {
	Link as TanstackLink,
	type LinkComponentProps,
} from "@tanstack/react-router";

interface Props extends MakeRequired<LinkComponentProps, "children"> {
	variant?: "plain" | "primary" | "secondary";
}

export default function Link({
	to,
	variant = "primary",
	children,
	className,
}: Props) {
	return (
		<TanstackLink
			to={to}
			className={cn(
				"max-block-max trim-text flex cursor-pointer items-center justify-center px-4 font-medium text-text transition-all duration-200 *:shrink-0 active:scale-95",
				{
					"min-block-10.75 scheme-dark squircle rounded-xl bg-bg-primary hover:bg-bg-primary-hover focus-visible:bg-bg-primary-hover":
						variant === "primary",
				},
				{
					"min-block-10.75 squircle rounded-xl bg-bg-secondary hover:bg-bg-secondary-hover focus-visible:bg-bg-secondary-hover":
						variant === "secondary",
				},
				className,
			)}>
			{children}
		</TanstackLink>
	);
}
