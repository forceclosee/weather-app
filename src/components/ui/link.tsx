import { cn } from "#/utils/class-helper";
import {
	Link as TanstackLink,
	type LinkComponentProps,
} from "@tanstack/react-router";

type Props = MakeRequired<LinkComponentProps, "children"> & {
	variant?: "plain" | "primary" | "secondary";
};

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
				"max-block-max trim-text squircle flex cursor-pointer items-center justify-center rounded-xl px-4 font-medium text-text transition-all duration-200 *:shrink-0 active:scale-95",
				{
					"min-block-10.75 bg-bg-primary hover:bg-bg-primary-hover focus-visible:bg-bg-primary-hover":
						variant === "primary",
				},
				{
					"min-block-10.75 bg-bg-secondary hover:bg-bg-secondary-hover focus-visible:bg-bg-secondary-hover":
						variant === "secondary",
				},
				className,
			)}>
			{children}
		</TanstackLink>
	);
}
