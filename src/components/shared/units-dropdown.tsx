import { ChevronDown, Settings } from "lucide-react";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components/Popover";

import { cn } from "#/utils/class-helper";
import type { Temperature, WindSpeed, Precipitation } from "#/types";
import {
	getPartialWeatherState,
	updateWeatherState,
} from "#/utils/weather-store";

import { Header } from "react-aria-components/Menu";
import {
	MenuTrigger,
	Menu,
	MenuItem,
	MenuSection,
	MenuSeparator,
} from "#/components/ui/aria-menu";
import { Button } from "#/components/ui/aria-button";

type Props = Omit<AriaPopoverProps, "children"> & {
	className?: string;
};

export default function UnitsDropdown({ className }: Props) {
	const temperature = getPartialWeatherState("temperature");
	const windSpeed = getPartialWeatherState("windSpeed");
	const precipitation = getPartialWeatherState("precipitation");

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
					selectedKeys={[temperature]}
					onSelectionChange={([key]) =>
						key !== undefined &&
						updateWeatherState({ temperature: key as Temperature })
					}>
					<MenuItem<Temperature> hasCheck id="celcius" className="text-text/80">
						Celsius (°C)
					</MenuItem>
					<MenuItem<Temperature>
						hasCheck
						id="fahrenheit"
						className="text-text/80">
						Fahrenheit (°F)
					</MenuItem>
				</MenuSection>
				<MenuSeparator />

				<MenuSection
					title="Wind Speed"
					selectionMode="single"
					selectedKeys={[windSpeed]}
					onSelectionChange={([key]) =>
						key !== undefined &&
						updateWeatherState({ windSpeed: key as WindSpeed })
					}>
					<MenuItem<WindSpeed> hasCheck id="kmh" className="text-text/80">
						km/h
					</MenuItem>
					<MenuItem<WindSpeed> hasCheck id="mph" className="text-text/80">
						mph
					</MenuItem>
					<MenuItem<WindSpeed> hasCheck id="ms" className="text-text/80">
						m/s
					</MenuItem>
					<MenuItem<WindSpeed> hasCheck id="kn" className="text-text/80">
						Knots
					</MenuItem>
				</MenuSection>
				<MenuSeparator />

				<MenuSection
					title="Precipitation"
					selectionMode="single"
					selectedKeys={[precipitation]}
					onSelectionChange={([key]) =>
						key !== undefined &&
						updateWeatherState({ precipitation: key as Precipitation })
					}>
					<MenuItem<Precipitation>
						hasCheck
						id="milimeters"
						className="text-text/80">
						Millimeters (mm)
					</MenuItem>
					<MenuItem<Precipitation> hasCheck id="inch" className="text-text/80">
						Inches (in)
					</MenuItem>
				</MenuSection>
			</Menu>
		</MenuTrigger>
	);
}
