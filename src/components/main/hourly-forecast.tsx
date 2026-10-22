import { Suspense, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ChevronDown } from "lucide-react";

import type { Days } from "#/types";
import { getPartialWeatherState, getWeatherState } from "#/utils/weather-store";
import { getFormattedDate, getFormattedTime } from "#/utils/date";
import { getWeatherDetails } from "#/utils/weather";
import { classList, cn } from "#/utils/class-helper";
import { getPartialDaysState, updateDaysState } from "#/utils/days-store";
import { createWeatherQueryOptions } from "#/query-options/weather";

import { Button } from "#/components/ui/aria-button";
import { Menu, MenuItem, MenuTrigger } from "#/components/ui/aria-menu";
import { Card } from "#/components/ui/card";
import { ScrollArea } from "#/components/ui/base-scroll-area";
import { Skeleton } from "#/components/ui/skeleton";

interface Props {
	className?: string;
}

export default function HourlyForecast({ className }: Props) {
	return (
		<ScrollArea
			className={cn(
				"max-block-254 squircle pbe-6 rounded-2xl bg-bg-card",
				className,
			)}
			contentClassName="px-6">
			<div className="pbs-6 pbe-4 sticky inset-bs-0 z-[calc(var(--z-card)+1)] flex items-center justify-between gap-2 bg-bg-card">
				<h2>Hourly Forecast</h2>
				<SelectDayDropdown />
			</div>

			<div className="z-card grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
				<Suspense fallback={<HourlyWeatherSkeleton />}>
					<HourlyWeatherContent />
				</Suspense>
			</div>
		</ScrollArea>
	);
}

function SelectDayDropdown() {
	const days = getPartialDaysState("days");
	const selectedDay = getPartialDaysState("selectedDay");

	return (
		<MenuTrigger placement="bottom end" popoverClassName="min-inline-32">
			<Button
				variant="secondary"
				className="min-block-9.25 flex gap-2 bg-bg-selected *:shrink-0 hover:bg-bg-selected-hover focus-visible:bg-bg-selected-hover">
				{selectedDay}
				<ChevronDown strokeWidth={3} className="block-[1.1em] inline-auto" />
			</Button>
			<Menu
				selectionMode="single"
				shouldCloseOnSelect
				selectedKeys={[selectedDay]}
				onSelectionChange={([key]) =>
					key !== undefined && updateDaysState({ selectedDay: key as Days })
				}>
				{days.map((day) => (
					<MenuItem<Days>
						key={day}
						id={day}
						labelClassName="gap-2 text-text/80">
						{day}
					</MenuItem>
				))}
			</Menu>
		</MenuTrigger>
	);
}

function HourlyWeatherContent() {
	const timezone = getPartialWeatherState("timezone");

	const selectedDay = getPartialDaysState("selectedDay");

	const weatherParams = getWeatherState();

	const { data } = useSuspenseQuery(createWeatherQueryOptions(weatherParams));

	// format first 2 days with relative day
	const relativeDays = data.hourly.time.slice(0, 48).map((time) => {
		return getFormattedDate({ timestamp: time, timezone: timezone })
			.relativeDay;
	}) as Days[];

	// format remaining days with weekday long
	const weekdays = data.hourly.time.slice(48).map((time) => {
		return getFormattedDate({ timestamp: time, timezone: timezone })
			.weekdayLongOnly;
	}) as Days[];

	// all days
	const allDays = [...relativeDays, ...weekdays];

	// unique days for dropdown items
	const days = [...new Set(allDays)];

	// update days store on mount
	useEffect(() => {
		updateDaysState({ days: days });
	}, []);

	const times = data.hourly.time.map((time) => {
		return getFormattedTime({ timestamp: time, timezone: timezone });
	});

	const weatherCodes = data.hourly.weather_code;

	// day or night for weather icon
	const isDays = times.map((time) => {
		switch (time) {
			case "6 PM":
			case "7 PM":
			case "8 PM":
			case "9 PM":
			case "10 PM":
			case "11 PM":
			case "12 AM":
			case "1 AM":
			case "2 AM":
			case "3 AM":
			case "4 AM":
			case "5 AM":
				return 0;

			default:
				return 1;
		}
	});

	const details = weatherCodes.map((code, index) => {
		return getWeatherDetails({ wmoCode: code, isDay: isDays[index] });
	});

	const temperatures = data.hourly.temperature_2m.map((temperature) => {
		return `${Math.round(temperature)}${data.hourly_units.temperature_2m}`;
	});

	const dayLength = data.hourly.time.length;

	// icon with dark color that should be inverted to make visible on dark mode
	const shouldInvertColors = weatherCodes.map((code) => {
		switch (code) {
			case 45:
			case 48:
			case 71:
			case 73:
			case 75:
			case 77:
			case 85:
			case 86:
				return true;

			default:
				return false;
		}
	});

	// all hourly weather data
	const hourlyWeathers = Array.from({ length: dayLength }).map((_, index) => {
		return {
			date: allDays[index],
			time: times[index],
			icon: details[index].image,
			description: details[index].description,
			temperature: temperatures[index],
			shouldInvertColor: shouldInvertColors[index],
		};
	});

	// hourly weather data for the selected day
	const seledtedDaysWeather = hourlyWeathers.filter((weather) => {
		return weather.date === selectedDay;
	});

	return (
		<>
			{seledtedDaysWeather.map((weather) => (
				<Card
					key={weather.time}
					layout="hourly-forecast"
					title={weather.time}
					icon={
						<img
							src={weather.icon}
							alt={weather.description}
							width={100}
							height={100}
							className={classList(
								"inline-8 block-auto weather-icon-drop-shadow",
								{
									"invert-weather-icon-color-on-dark-mode":
										weather.shouldInvertColor,
								},
							)}
						/>
					}
					content={weather.temperature}
				/>
			))}
		</>
	);
}

function HourlyWeatherSkeleton() {
	return (
		<>
			{Array.from({ length: 24 }).map((_, index) => (
				<Card
					key={index}
					layout="hourly-forecast"
					title={<Skeleton width={46} />}
					icon={<Skeleton circle width={40} height={40} />}
					content={<Skeleton minWidth={40} />}
				/>
			))}
		</>
	);
}
