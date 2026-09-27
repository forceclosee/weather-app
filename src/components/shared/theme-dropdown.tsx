import { useEffect, useState } from "react";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components/Popover";

import { ChevronDown, Laptop, Moon, Sun } from "lucide-react";

import { MenuTrigger, Menu, MenuItem } from "#/components/ui/menu";
import { Button } from "#/components/ui/button";

type Props = Omit<AriaPopoverProps, "children"> & {
	className?: string;
};

export default function ThemeDropdown({ className }: Props) {
	type Theme = "light" | "dark" | "system";

	// get saved theme from local storage
	const getInitialTheme = (): Theme => {
		if (typeof window === "undefined") return "system";

		return (localStorage.getItem("theme") as Theme) || "system";
	};

	const [theme, setTheme] = useState<Theme>(getInitialTheme());

	// set theme and save to local storage
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const getThemeIcon = () => {
		switch (theme) {
			case "light":
				return <Sun className="block-[1.3em] inline-auto shrink-0" />;
			case "dark":
				return <Moon className="block-[1.3em] inline-auto shrink-0" />;
			case "system":
				return <Laptop className="block-[1.3em] inline-auto shrink-0" />;
		}
	};

	return (
		<MenuTrigger popoverClassName={className}>
			<Button variant="secondary" className="flex gap-2 *:shrink-0">
				{getThemeIcon()}
				<span className="hidden min-[24rem]:inline">Theme</span>
				<ChevronDown className="block-[1.1em] inline-auto" />
			</Button>
			<Menu
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
