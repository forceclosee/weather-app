import { Suspense, useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useWeatherParams } from "#/hook/use-weather-params";
import { classList, cn } from "#/utils/class-helper";
import { getFormattedDate } from "#/utils/date";
import { getWeatherDetails } from "#/utils/weather";
import { weatherQueryOptions } from "#/query-options/weather";
import { getPartialLocations } from "#/utils/location-store";

import { Card } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";

interface Props {
	className?: string;
}

export default function DailyForecast({ className }: Props) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<div className={cn("grid gap-4.75", className)}>
			<h2>Daily Forecast</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(7.6rem,1fr))] gap-4">
				<Suspense fallback={<DailyWeatherSkeleton />}>
					{isLoading ? <DailyWeatherSkeleton /> : <DailyWeatherContent />}
				</Suspense>
			</div>
		</div>
	);
}

function DailyWeatherContent() {
	const timezone = getPartialLocations("timezone");

	const weatherParams = useWeatherParams();

	const { data } = useSuspenseQuery(weatherQueryOptions(weatherParams));

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

	const weatherCodes = data.daily.weather_code;

	const details = weatherCodes.map((code) => {
		return getWeatherDetails({ wmoCode: code });
	});

	const maxTemperatures = data.daily.temperature_2m_max.map((temperature) => {
		return `${Math.round(temperature)}${data.daily_units.temperature_2m_max}`;
	});

	const minTemperatures = data.daily.temperature_2m_min.map((temperature) => {
		return `${Math.round(temperature)}${data.daily_units.temperature_2m_min}`;
	});

	// const minTemperatures = data.daily.temperature_2m_min;

	const dayLength = data.daily.time.length;

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

	// daily weather data
	const dailyWeathers = Array.from({ length: dayLength }).map((_, index) => {
		return {
			date: days[index],
			icon: details[index].image,
			description: details[index].description,
			maxTemperature: maxTemperatures[index],
			minTemperature: minTemperatures[index],
			shouldInvertColor: shouldInvertColors[index],
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
							className={classList(
								"inline-12 block-auto weather-icon-drop-shadow",
								{
									"invert-weather-icon-color-on-dark-mode":
										weather.shouldInvertColor,
								},
							)}
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

function DailyWeatherSkeleton() {
	const minWidth = [60, 83, 90, 90, 90, 90, 90];
	// update width

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
