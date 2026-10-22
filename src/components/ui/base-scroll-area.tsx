import { cn } from "#/utils/class-helper";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
	className?: string;
	viewportClassName?: string;
	contentClassName?: string;
}

export function ScrollArea({
	children,
	className,
	viewportClassName,
	contentClassName,
}: Props) {
	return (
		<BaseScrollArea.Root
			className={cn("overflow-clip min-inline-0", className)}>
			<BaseScrollArea.Viewport className={cn("block-full", viewportClassName)}>
				<BaseScrollArea.Content className={contentClassName}>
					{children}
				</BaseScrollArea.Content>
			</BaseScrollArea.Viewport>
			<BaseScrollArea.Scrollbar className="pointer-events-none flex justify-center bg-bg-selected opacity-0 transition-opacity inline-1.5 data-hovering:pointer-events-auto data-hovering:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0">
				<BaseScrollArea.Thumb className="bg-bg-primary inline-full" />
			</BaseScrollArea.Scrollbar>
		</BaseScrollArea.Root>
	);
}
