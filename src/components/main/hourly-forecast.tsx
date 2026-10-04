import { Suspense, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ChevronDown } from "lucide-react";

import type { Days } from "#/types";
import { getPartialWeatherState, getWeatherState } from "#/utils/weather-store";
import { getWeather } from "#/utils/weather.functions";
import { getFormattedDate, getFormattedTime } from "#/utils/date";
import { getWeatherDetails } from "#/utils/weather";
import { cn } from "#/utils/class-helper";
import { getPartialDaysState, updateDaysState } from "#/utils/days-store";

import { Button } from "#/components/ui/aria-button";
import { Menu, MenuItem, MenuTrigger } from "#/components/ui/aria-menu";
import { Card } from "#/components/ui/card";
import { ScrollArea } from "#/components/ui/base-scroll-area";
import { Skeleton } from "../ui/skeleton";

type Props = {
	className?: string;
};

export default function HourlyForecast({ className }: Props) {
	return (
		<ScrollArea
			className={cn(
				"max-block-254 squircle pbe-6 rounded-2xl bg-bg-card",
				className,
			)}
			contentClassName="px-6">
			<div className="pbs-6 pbe-4 sticky inset-bs-0 z-[calc(var(--z-card)+1)] flex items-center justify-between gap-4 bg-bg-card">
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
				className="min-block-9.25 flex gap-2 bg-bg-selected *:shrink-0">
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

	const { data } = useSuspenseQuery({
		queryKey: ["weather", weatherParams],
		queryFn: () => getWeather({ data: weatherParams }),
		refetchOnWindowFocus: false,
	});

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

	const details = data.hourly.weather_code.map((code) => {
		return getWeatherDetails({ wmoCode: code });
	});

	const temperatures = data.hourly.temperature_2m;

	const dayLength = data.hourly.time.length;

	// all hourly weather data
	const hourlyWeathers = Array.from({ length: dayLength }).map((_, index) => {
		return {
			date: allDays[index],
			time: times[index],
			icon: details[index].image,
			description: details[index].description,
			temperature: `${Math.round(temperatures[index])}${data.hourly_units.temperature_2m}`,
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
							className="inline-10 block-auto origin-center scale-150 drop-shadow-(--daily-weather-icon-drop-shadow)"
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
