import { cn } from "#/utils/class-helper";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

interface ClassNameProps {
	className?: string;
}

const Provider = ({ ...props }: BaseTooltip.Provider.Props) => {
	return <BaseTooltip.Provider {...props} />;
};

const Root = (props: BaseTooltip.Root.Props) => {
	return <BaseTooltip.Root {...props} />;
};

export interface TriggerProps
	extends Omit<BaseTooltip.Trigger.Props, "className">,
		ClassNameProps {}

const Trigger = (props: TriggerProps) => {
	return (
		<BaseTooltip.Trigger
			{...props}
			className={cn(
				"flex cursor-pointer items-center justify-center p-2 font-medium text-text transition-all duration-200 trim-text *:shrink-0 active:not-disabled:scale-95 disabled:cursor-not-allowed",
				props.className,
			)}
		/>
	);
};

interface TooltipContentProps
	extends BaseTooltip.Popup.Props,
		Pick<
			BaseTooltip.Positioner.Props,
			"align" | "alignOffset" | "side" | "sideOffset"
		> {}

const Content = ({
	align = "center",
	alignOffset = 0,
	side = "top",
	sideOffset = 6,
	children,
	...props
}: TooltipContentProps) => {
	return (
		<BaseTooltip.Portal>
			<BaseTooltip.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="z-toast">
				<BaseTooltip.Popup
					className="relative flex origin-(--transform-origin) flex-col rounded-xl border border-border bg-bg-info px-3 py-2 text-sm text-text-inverse shadow-[0.25rem_0.25rem_0] shadow-black/12 transition-[scale,opacity] duration-200 ease-out squircle data-ending-style:scale-[0.75] data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-[0.75] data-starting-style:opacity-0"
					{...props}>
					<BaseTooltip.Arrow className="relative block overflow-clip block-1.5 inline-3 before:absolute before:inset-s-1/2 before:inset-be-0 before:transform-[translate(-50%,50%)_rotate(45deg)] before:border before:border-border before:bg-bg-info before:content-[''] before:block-[calc(6px*sqrt(2))] before:inline-[calc(6px*sqrt(2))] data-[side=bottom]:-inset-bs-1.5 data-[side=inline-end]:-inset-s-2.25 data-[side=inline-end]:-rotate-90 data-[side=inline-start]:-inset-e-2.25 data-[side=inline-start]:rotate-90 data-[side=left]:-inset-e-2.25 data-[side=left]:rotate-90 data-[side=right]:-inset-s-2.25 data-[side=right]:-rotate-90 data-[side=top]:-inset-be-1.5 data-[side=top]:rotate-180" />
					{children}
				</BaseTooltip.Popup>
			</BaseTooltip.Positioner>
		</BaseTooltip.Portal>
	);
};

export const Tooltip = {
	Provider,
	Root,
	Trigger,
	Content,
};
