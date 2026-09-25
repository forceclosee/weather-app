import { useState } from "react";
import { ChevronDown, Settings } from "lucide-react";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components/Popover";
import { Header, type Selection } from "react-aria-components/Menu";

import { cn } from "#/utils/class-helper";

import {
	MenuTrigger,
	Menu,
	MenuItem,
	MenuSection,
	MenuSeparator,
} from "#/components/ui/menu";
import { Button } from "#/components/ui/button";

type Props = Omit<AriaPopoverProps, "children"> & {
	className?: string;
};

export default function UnitsDropdown({ className }: Props) {
	type Temperature = "celcius" | "fahrenheit";
	const [temperature, setTemperature] = useState<Selection>(
		new Set<Temperature>(["celcius"]),
	);

	type WindSpeed = "km/h" | "mph" | "m/s" | "knots";
	const [windSpeed, setWindSpeed] = useState<Selection>(
		new Set<WindSpeed>(["km/h"]),
	);

	type Precipitation = "milimeters" | "inches";
	const [precipitation, setPrecipitation] = useState<Selection>(
		new Set<Precipitation>(["milimeters"]),
	);

	return (
		<MenuTrigger
			placement="bottom end"
			popoverClassName={cn("min-inline-[12.5rem]", className)}>
			<Button variant="secondary" className="flex gap-2 *:shrink-0">
				<Settings className="block-[1.1em] inline-auto" />
				<span className="hidden shrink-0 min-[20rem]:inline">Units</span>
				<ChevronDown className="block-[1.1em] inline-auto" />
			</Button>
			<Menu>
				<Header className="mbe-1 p-1 text-center font-medium">
					Select units
				</Header>

				<MenuSection
					title="Temperature"
					selectionMode="single"
					selectedKeys={temperature}
					onSelectionChange={setTemperature}>
					<MenuItem hasCheck id="celcius" className="text-text/80">
						Celsius (°C)
					</MenuItem>
					<MenuItem hasCheck id="fahrenheit" className="text-text/80">
						Fahrenheit (°F)
					</MenuItem>
				</MenuSection>
				<MenuSeparator />

				<MenuSection
					title="Wind Speed"
					selectionMode="single"
					selectedKeys={windSpeed}
					onSelectionChange={setWindSpeed}>
					<MenuItem hasCheck id="km/h" className="text-text/80">
						km/h
					</MenuItem>
					<MenuItem hasCheck id="mph" className="text-text/80">
						mph
					</MenuItem>
					<MenuItem hasCheck id="m/s" className="text-text/80">
						m/s
					</MenuItem>
					<MenuItem hasCheck id="knots" className="text-text/80">
						Knots
					</MenuItem>
				</MenuSection>
				<MenuSeparator />

				<MenuSection
					title="Precipitation"
					selectionMode="single"
					selectedKeys={precipitation}
					onSelectionChange={setPrecipitation}>
					<MenuItem hasCheck id="milimeters" className="text-text/80">
						Millimeters (mm)
					</MenuItem>
					<MenuItem hasCheck id="inches" className="text-text/80">
						Inches (in)
					</MenuItem>
				</MenuSection>
			</Menu>
		</MenuTrigger>
	);
}
