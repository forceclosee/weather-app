import { useEffect, useState } from "react";
import type { Selection } from "react-aria-components/Menu";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components/Popover";

import { Laptop, Moon, Sun } from "lucide-react";

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

	const [theme, setTheme] = useState<Selection>(
		new Set<Theme>([getInitialTheme()]),
	);

	// set theme and save to local storage
	useEffect(() => {
		const selectedTheme: Theme = Array.from(theme)[0].toString() as Theme;

		document.documentElement.setAttribute("data-theme", selectedTheme);
		localStorage.setItem("theme", selectedTheme);
	}, [theme]);

	const getThemeIcon = () => {
		const selectedTheme: Theme = Array.from(theme)[0].toString() as Theme;

		switch (selectedTheme) {
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
			<Button variant="secondary" className="max-block-max flex gap-2">
				{getThemeIcon()}
				<span className="hidden shrink-0 min-[21rem]:inline">Theme</span>
			</Button>
			<Menu
				selectionMode="single"
				selectedKeys={theme}
				onSelectionChange={setTheme}>
				<MenuItem id="light" labelClassName="gap-2">
					<Sun className="block-[1.3em] inline-auto" />
					<span>Light</span>
				</MenuItem>
				<MenuItem id="dark" labelClassName="gap-2">
					<Moon className="block-[1.3em] inline-auto" />
					<span>Dark</span>
				</MenuItem>
				<MenuItem id="system" labelClassName="gap-2">
					<Laptop className="block-[1.3em] inline-auto" />
					<span>System</span>
				</MenuItem>
			</Menu>
		</MenuTrigger>
	);
}
