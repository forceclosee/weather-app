import { useEffect } from "react";
import { ChevronDown, Settings } from "lucide-react";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components/Popover";
import { Header } from "react-aria-components/Menu";

import { useLocalStorage } from "#/hook/use-local-storage";

import { cn } from "#/utils/class-helper";
import type { Temperature, WindSpeed, Precipitation } from "#/types";
import {
	getPartialWeatherState,
	updateWeatherState,
} from "#/utils/weather-store";

import {
	MenuTrigger,
	Menu,
	MenuItem,
	MenuSection,
	MenuSeparator,
} from "#/components/ui/aria-menu";
import { Button } from "#/components/ui/aria-button";

interface Props extends Omit<AriaPopoverProps, "children"> {
	className?: string;
}

export default function UnitsDropdown({ className }: Props) {
	interface Units {
		temperature: Temperature;
		windSpeed: WindSpeed;
		precipitation: Precipitation;
	}

	const temperature = getPartialWeatherState("temperature");
	const windSpeed = getPartialWeatherState("windSpeed");
	const precipitation = getPartialWeatherState("precipitation");

	const initialUnits: Units = {
		temperature,
		windSpeed,
		precipitation,
	};

	const [units, setUnits] = useLocalStorage<Units>("units", initialUnits);

	const setUnit = (newState: Partial<Units>) =>
		setUnits((prev) => ({ ...prev, ...newState }));

	const handleSelect = (
		value: string | undefined,
		target: "temperature" | "windSpeed" | "precipitations",
	) => {
		if (!value) return;

		switch (target) {
			case "temperature":
				setUnit({ temperature: value as Temperature });
				break;

			case "windSpeed":
				setUnit({ windSpeed: value as WindSpeed });
				break;

			case "precipitations":
				setUnit({ precipitation: value as Precipitation });
				break;
		}
	};

	// synchoronize store with the local storage
	useEffect(() => {
		updateWeatherState({
			temperature: units.temperature,
			windSpeed: units.windSpeed,
			precipitation: units.precipitation,
		});
	}, [units]);

	return (
		<MenuTrigger
			placement="bottom end"
			popoverClassName={cn("min-inline-50", className)}>
			<Button variant="secondary" className="group flex gap-2 *:shrink-0">
				<Settings className="block-[1.1em] inline-auto" />
				<span className="hidden shrink-0 min-[26rem]:inline">Units</span>
				<ChevronDown
					strokeWidth={3}
					className="hidden transition-transform duration-200 block-[1.1em] inline-auto group-data-pressed:rotate-180 min-[23rem]:inline"
				/>
			</Button>
			<Menu>
				<Header className="mbe-1 p-1 text-center font-medium">
					Select units
				</Header>

				<MenuSection
					title="Temperature"
					selectionMode="single"
					selectedKeys={[units.temperature]}
					onSelectionChange={([key]) =>
						handleSelect(key as string, "temperature")
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
					selectedKeys={[units.windSpeed]}
					onSelectionChange={([key]) =>
						handleSelect(key as string, "windSpeed")
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
					selectedKeys={[units.precipitation]}
					onSelectionChange={([key]) =>
						handleSelect(key as string, "precipitations")
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
