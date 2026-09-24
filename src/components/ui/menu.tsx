import React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "#/utils/class-helper";

import {
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	type MenuProps as AriaMenuProps,
	type MenuItemProps as AriaMenuItemProps,
	MenuSection as AriaMenuSection,
	type MenuSectionProps as AriaMenuSectionProps,
	MenuTrigger as AriaMenuTrigger,
	SubmenuTrigger as AriaSubmenuTrigger,
	Separator,
	type SeparatorProps,
	Header,
	Collection,
	type SubmenuTriggerProps,
	type MenuTriggerProps as AriaMenuTriggerProps,
} from "react-aria-components/Menu";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

import { Popover, type PopoverProps } from "#/components/ui/popover";

type MenuProps<T> = AriaMenuProps<T> & {
	className?: string;
};

export function Menu<T>({ className, ...props }: MenuProps<T>) {
	return (
		<AriaMenu
			shouldCloseOnSelect={false}
			className={cn(
				"squircle flex flex-col gap-1 overflow-auto rounded-xl bg-bg-card p-2 empty:pb-2 empty:text-center",
				className,
			)}
			{...props}
		/>
	);
}

type MenuItemProps = AriaMenuItemProps & {
	hasCheck?: boolean;
	className?: string;
	labelClassName?: string;
};

export function MenuItem({
	children,
	hasCheck,
	className,
	labelClassName,
	...props
}: MenuItemProps) {
	const textValue =
		props.textValue || (typeof children === "string" ? children : undefined);

	return (
		<AriaMenuItem
			textValue={textValue}
			className={cn(
				"squircle flex cursor-pointer items-center rounded-xl p-2 font-normal text-text-muted transition-all duration-200 hover:bg-bg-selected hover:text-text focus-visible:bg-bg-selected focus-visible:text-text data-selected:bg-bg-selected data-selected:font-medium data-selected:text-text",
				{ "justify-between gap-2": hasCheck },
				className,
			)}
			{...props}>
			{composeRenderProps(
				children,
				(children, { selectionMode, isSelected, hasSubmenu }) => (
					<>
						<span
							className={cn(
								"flex flex-1 items-center truncate",
								labelClassName,
							)}>
							{children}
						</span>

						{hasCheck && selectionMode !== "none" && (
							<span className="inline-4 flex items-center">
								{isSelected && (
									<Check strokeWidth={3} className="block-4 inline-4" />
								)}
							</span>
						)}

						{hasSubmenu && (
							<ChevronRight className="block-4 inline-4 absolute inset-e-2" />
						)}
					</>
				),
			)}
		</AriaMenuItem>
	);
}

export function MenuSeparator(props: SeparatorProps) {
	return <Separator {...props} className="mx-3 my-1 border-be border-border" />;
}

export type MenuSectionProps<T> = AriaMenuSectionProps<T> & {
	title?: string;
	items?: Iterable<T> | undefined;
	className?: string;
	headerClassName?: string;
};

export function MenuSection<T>({
	title,
	items,
	children,
	className,
	headerClassName,
	...props
}: MenuSectionProps<T>) {
	return (
		<AriaMenuSection
			className={cn(
				"after:block-1.25 first:-mbs-1.25 after:block after:content-['']",
				className,
			)}
			{...props}>
			{title && (
				<Header
					className={cn(
						"[&+*]:mbs-1 -mbs-px sticky -inset-bs-1.25 z-10 truncate px-2 py-2 text-sm text-text-muted",
						headerClassName,
					)}>
					{title}
				</Header>
			)}
			<Collection items={items}>{children}</Collection>
		</AriaMenuSection>
	);
}

type MenuTriggerProps = AriaMenuTriggerProps & {
	placement?: PopoverProps["placement"];
	popoverClassName?: string;
};

export function MenuTrigger({
	children,
	placement,
	popoverClassName,
	...props
}: MenuTriggerProps) {
	const [trigger, menu] = React.Children.toArray(children) as [
		React.ReactElement,
		React.ReactElement,
	];

	return (
		<AriaMenuTrigger {...props}>
			{trigger}
			<Popover placement={placement} className={popoverClassName}>
				{menu}
			</Popover>
		</AriaMenuTrigger>
	);
}

export function SubmenuTrigger({ children, ...props }: SubmenuTriggerProps) {
	const [trigger, menu] = React.Children.toArray(children) as [
		React.ReactElement,
		React.ReactElement,
	];

	return (
		<AriaSubmenuTrigger {...props}>
			{trigger}
			<Popover offset={-2} crossOffset={-4}>
				{menu}
			</Popover>
		</AriaSubmenuTrigger>
	);
}
