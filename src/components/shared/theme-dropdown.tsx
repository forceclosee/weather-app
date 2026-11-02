import { useEffect, useId } from "react";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components/Popover";

import { ChevronDown, Laptop, Moon, Sun } from "lucide-react";

import { useLocalStorage } from "#/hook/use-local-storage";

import { MenuTrigger, Menu, MenuItem } from "#/components/ui/aria-menu";
import { Button } from "#/components/ui/aria-button";

interface Props extends Omit<AriaPopoverProps, "children"> {
	className?: string;
}

export default function ThemeDropdown({ className }: Props) {
	type Theme = "light" | "dark" | "system";

	const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

	// html data attribute with selected theme
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const getThemeIcon = () => {
		switch (theme) {
			case "light":
				return <Sun className="block-[1.3em] inline-auto" />;
			case "dark":
				return <Moon className="block-[1.3em] inline-auto" />;
			case "system":
				return <Laptop className="block-[1.3em] inline-auto" />;
		}
	};

	const anchorDropdownTrigger = `--${useId()}`;

	return (
		<MenuTrigger
			popoverClassName={className}
			popoverStyle={{
				minInlineSize: `anchor-size(${anchorDropdownTrigger} inline)`,
			}}>
			<Button
				variant="secondary"
				className="group flex gap-2 *:shrink-0"
				style={{ anchorName: anchorDropdownTrigger }}>
				{getThemeIcon()}
				<span className="hidden min-[32rem]:inline">Theme</span>
				<ChevronDown
					strokeWidth={3}
					className="hidden transition-transform duration-200 block-[1.1em] inline-auto group-data-pressed:rotate-180 min-[23rem]:inline"
				/>
			</Button>
			<Menu
				shouldCloseOnSelect
				selectionMode="single"
				selectedKeys={[theme]}
				onSelectionChange={([key]) =>
					key !== undefined && setTheme(key as Theme)
				}>
				<MenuItem<Theme> id="light" labelClassName="gap-2">
					<Sun className="block-[1.3em] inline-auto" />
					<span>Light</span>
				</MenuItem>
				<MenuItem<Theme> id="dark" labelClassName="gap-2">
					<Moon className="block-[1.3em] inline-auto" />
					<span>Dark</span>
				</MenuItem>
				<MenuItem<Theme> id="system" labelClassName="gap-2">
					<Laptop className="block-[1.3em] inline-auto" />
					<span>System</span>
				</MenuItem>
			</Menu>
		</MenuTrigger>
	);
}
