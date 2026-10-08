import { cn } from "#/utils/class-helper";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
	className?: string;
	viewportClassName?: string;
	contentClassName?: string;
};

export function ScrollArea({
	children,
	className,
	viewportClassName,
	contentClassName,
}: Props) {
	return (
		<BaseScrollArea.Root className={cn("overflow-clip", className)}>
			<BaseScrollArea.Viewport className={cn("block-full", viewportClassName)}>
				<BaseScrollArea.Content className={contentClassName}>
					{children}
				</BaseScrollArea.Content>
			</BaseScrollArea.Viewport>
			<BaseScrollArea.Scrollbar className="inline-1.5 pointer-events-none flex justify-center bg-bg-selected opacity-0 transition-opacity data-hovering:pointer-events-auto data-scrolling:pointer-events-auto data-hovering:opacity-100 data-scrolling:opacity-100 data-scrolling:duration-0">
				<BaseScrollArea.Thumb className="inline-full bg-bg-primary" />
			</BaseScrollArea.Scrollbar>
		</BaseScrollArea.Root>
	);
}
