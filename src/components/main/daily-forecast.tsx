import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getFormattedDate } from "#/utils/date";
import { getWeatherDetails } from "#/utils/weather";
import { getPartialWeatherState, getWeatherState } from "#/utils/weather-store";
import { getWeather } from "#/utils/weather.functions";

import { Card } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/utils/class-helper";

type Props = {
	className?: string;
};

export default function DailyForecast({ className }: Props) {
	return (
		<div className={cn("grid gap-4.75", className)}>
			<h2>Daily Forecast</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(7.6rem,1fr))] gap-4">
				<Suspense fallback={<CurrentWeatherSkeleton />}>
					<CurrentWeatherContent />
				</Suspense>
			</div>
		</div>
	);
}

function CurrentWeatherContent() {
	const timezone = getPartialWeatherState("timezone");

	const weatherParams = getWeatherState();

	const { data } = useSuspenseQuery({
		queryKey: ["weather", weatherParams],
		queryFn: () => getWeather({ data: weatherParams }),
		refetchOnWindowFocus: false,
	});

	// format first 2 days with relative day
	const relativeDays = data.daily.time.slice(0, 2).map((time) => {
		return getFormattedDate({ timestamp: time, timezone: timezone })
			.relativeDay;
	});

	// format remaining days with weekday long
	const weekdays = data.daily.time.slice(2).map((time) => {
		return getFormattedDate({ timestamp: time, timezone: timezone })
			.weekdayLongOnly;
	});

	// all days
	const days = [...relativeDays, ...weekdays];

	const details = data.daily.weather_code.map((code) => {
		return getWeatherDetails({ wmoCode: code });
	});

	const maxTemperatures = data.daily.temperature_2m_max;
	const minTemperatures = data.daily.temperature_2m_min;

	const dayLength = data.daily.time.length;

	// daily weather data
	const dailyWeathers = Array.from({ length: dayLength }).map((_, index) => {
		return {
			date: days[index],
			icon: details[index].image,
			description: details[index].description,
			maxTemperature: `${Math.round(maxTemperatures[index])}${data.daily_units.temperature_2m_max}`,
			minTemperature: `${Math.round(minTemperatures[index])}${data.daily_units.temperature_2m_min}`,
		};
	});

	return (
		<>
			{dailyWeathers.map((weather) => (
				<Card
					key={weather.date}
					layout="daily-forecast"
					title={weather.date}
					icon={
						<img
							src={weather.icon}
							alt={weather.description}
							width={100}
							height={100}
							className="inline-12 block-auto origin-center scale-150 drop-shadow-(--daily-weather-icon-drop-shadow)"
						/>
					}
					content={
						<>
							<span>{weather.maxTemperature}</span>
							<span>{weather.minTemperature}</span>
						</>
					}
				/>
			))}
		</>
	);
}

function CurrentWeatherSkeleton() {
	const minWidth = [60, 83, 45, 45, 45, 45, 45];

	return (
		<>
			{Array.from({ length: 7 }).map((_, index) => (
				<Card
					key={index}
					className="py-4"
					layout="daily-forecast"
					title={<Skeleton minWidth={minWidth[index]} height={24} />}
					icon={<Skeleton circle width={40} height={40} />}
					content={
						<>
							<Skeleton width={36} />
							<Skeleton width={36} />
						</>
					}
				/>
			))}
		</>
	);
}
