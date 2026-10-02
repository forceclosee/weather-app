import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactNode } from "react";

type Props = {
	trigger: ReactNode;
	triggerAriaLabel?: string;
	title: string;
	description: string;
};

export function Popover({
	trigger,
	triggerAriaLabel,
	title,
	description,
}: Props) {
	return (
		<BasePopover.Root>
			<BasePopover.Trigger
				className="cursor-pointer"
				aria-label={triggerAriaLabel}>
				{trigger}
			</BasePopover.Trigger>
			<BasePopover.Portal>
				<BasePopover.Positioner sideOffset={5}>
					<BasePopover.Popup className="squircle max-inline-88 rounded-xl bg-bg-info p-4 duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-safe:transition-all motion-safe:data-ending-style:-translate-y-6 motion-safe:data-starting-style:-translate-y-6 motion-safe:data-ending-style:scale-50 motion-safe:data-starting-style:scale-50 motion-reduce:transition-opacity">
						<BasePopover.Arrow className="base-arrow" />
						<BasePopover.Title className="text-lg text-text-inverse">
							{title}
						</BasePopover.Title>
						<BasePopover.Description className="trim-text mbs-4 text-base text-text-inverse/80">
							{description}
						</BasePopover.Description>
					</BasePopover.Popup>
				</BasePopover.Positioner>
			</BasePopover.Portal>
		</BasePopover.Root>
	);
}
