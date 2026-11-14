import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

import { cn } from "#/utils/class-helper";

interface ClassNameProps {
	className?: string;
}

interface RootProps
	extends Omit<BaseCheckbox.Root.Props, "className">,
		ClassNameProps {}

const Root = (props: RootProps) => {
	return (
		<BaseCheckbox.Root
			{...props}
			className={cn(
				"flex items-center justify-center border border-border text-text block-4 inline-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary data-checked:bg-bg-primary data-checked:text-text",
				props.className,
			)}
		/>
	);
};

interface IndicatorProps
	extends Omit<BaseCheckbox.Indicator.Props, "className">,
		ClassNameProps {}

const Indicator = (props: IndicatorProps) => {
	return (
		<BaseCheckbox.Indicator
			{...props}
			className={cn("flex data-unchecked:hidden", props.className)}
		/>
	);
};

export const Checkbox = {
	Root,
	Indicator,
};
