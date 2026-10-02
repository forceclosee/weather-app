import {
	OverlayArrow,
	Popover as AriaPopover,
	type PopoverProps as AriaPopoverProps,
} from "react-aria-components/Popover";
import type { ReactNode } from "react";
import { cn } from "#/utils/class-helper";

export type PopoverProps = Omit<AriaPopoverProps, "children"> & {
	showArrow?: boolean;
	children: ReactNode;
	className?: string;
};

export function Popover({
	children,
	showArrow,
	className,
	...props
}: PopoverProps) {
	const offset = showArrow ? 12 : 5;

	return (
		<AriaPopover
			offset={offset}
			{...props}
			className={cn(
				"overflow-auto shadow-2xl forced-colors:bg-[Canvas]",
				className,
			)}>
			{showArrow && (
				<OverlayArrow className="group">
					<svg
						aria-hidden="true"
						width={12}
						height={12}
						viewBox="0 0 12 12"
						className="block fill-text stroke-1 stroke-text/10 group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]">
						<path d="M0 0 L6 6 L12 0" />
					</svg>
				</OverlayArrow>
			)}
			{children}
		</AriaPopover>
	);
}
