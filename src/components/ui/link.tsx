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
				"flex cursor-pointer items-center justify-center px-4 font-medium text-text transition-all duration-200 max-block-max trim-text *:shrink-0 active:scale-95",
				{
					"rounded-xl bg-bg-primary scheme-dark min-block-10.75 squircle hover:bg-bg-primary-hover focus-visible:bg-bg-primary-hover":
						variant === "primary",
				},
				{
					"rounded-xl bg-bg-secondary min-block-10.75 squircle hover:bg-bg-secondary-hover focus-visible:bg-bg-secondary-hover":
						variant === "secondary",
				},
				className,
			)}>
			{children}
		</TanstackLink>
	);
}
