import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getFormattedDate } from "#/utils/date";
import { getWeatherDetails } from "#/utils/weather";
import { getPartialWeatherState, getWeatherState } from "#/utils/weather-store";
import { getWeather } from "#/utils/weather.functions";

import { Card } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";

export default function DailyForecast() {
	return (
		<div className="grid gap-4.75">
			<h2 className="font-medium text-xl">Daily Forecast</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-4">
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

	const dates = data.daily.time.map((time) => {
		return getFormattedDate({ timestamp: time, timezone: timezone })
			.weekdayShortOnly;
	});

	const details = data.daily.weather_code.map((code) => {
		return getWeatherDetails({ wmoCode: code });
	});

	const maxTemperatures = data.daily.temperature_2m_max;
	const minTemperatures = data.daily.temperature_2m_min;

	const dayLength = data.daily.time.length;

	// daily weather data
	const dailyWeathers = Array.from({ length: dayLength }).map((_, index) => {
		return {
			date: dates[index],
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
	return (
		<>
			{Array.from({ length: 7 }).map((_, index) => (
				<Card
					className="py-4"
					key={index}
					layout="daily-forecast"
					title={<Skeleton minWidth={45} height={24} />}
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
