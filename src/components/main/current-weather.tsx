import { Suspense, useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getWeatherState, getPartialWeatherState } from "#/utils/weather-store";

import { classList } from "#/utils/class-helper";
import { getFormattedDate, getFormattedCurrentTime } from "#/utils/date";
import { getWeatherDetails } from "#/utils/weather";
import { createWeatherQueryOptions } from "#/query-options/weather";

import { Skeleton } from "#/components/ui/skeleton";

import bgMobile from "#/images/bg-today-small.svg";
import bgDesktop from "#/images/bg-today-large.svg";

export default function CurrentWeather() {
	return (
		<div className="relative isolate grid items-center overflow-clip rounded-2xl text-text scheme-dark max-block-max min-block-71.5 squircle">
			<picture className="absolute inset-0 z-[-1]" aria-hidden>
				<source media="(width >= 48rem)" srcSet={bgDesktop} />
				<img
					src={bgMobile}
					alt=""
					className="origin-center scale-110 object-cover block-full"
				/>
			</picture>

			<Suspense fallback={<CurrentWeatherSkeleton />}>
				<CurrentWeatherContent />
			</Suspense>
		</div>
	);
}

function CurrentWeatherContent() {
	const timezone = getPartialWeatherState("timezone");
	const city = getPartialWeatherState("city");
	const country = getPartialWeatherState("country");
	const countryCode = getPartialWeatherState("countryCode");

	const countryFlagUrl = `https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg`;

	const weatherParams = getWeatherState();

	const { data } = useSuspenseQuery(createWeatherQueryOptions(weatherParams));

	const temperature = `${Math.round(data.current.temperature_2m)}${data.current_units.temperature_2m}`;

	const { fullDate } = getFormattedDate({
		timestamp: data.current.time,
		timezone: timezone,
	});

	const weatherCode = data.current.weather_code;

	const { description, image } = getWeatherDetails({
		wmoCode: weatherCode,
		isDay: data.current.is_day,
	});

	// icon with dark color that should be inverted to make visible on dark mode
	const shouldInvertColor =
		weatherCode === 45 ||
		weatherCode === 48 ||
		weatherCode === 71 ||
		weatherCode === 73 ||
		weatherCode === 75 ||
		weatherCode === 77 ||
		weatherCode === 85 ||
		weatherCode === 86;

	return (
		<div className="grid items-center justify-items-center gap-8 p-6 pe-8 text-center @3xl/current-weather:grid-cols-[1fr_auto] @3xl/current-weather:justify-items-start @3xl/current-weather:text-start">
			<div className="grid gap-2">
				<h2 className="text-[1.85rem] font-medium">
					<span>{`${city}, ${country}`}</span>
					<img
						src={countryFlagUrl}
						alt=""
						width={48}
						height={48}
						className="ms-4 inline-block shrink-0 block-auto inline-[1em]"
					/>
				</h2>
				<span className="text-lg text-text/77">{fullDate}</span>
				<TimeDisplay />
			</div>

			<div className="grid gap-2">
				<div className="flex flex-col items-center gap-8 *:shrink-0 @min-[30rem]/current-weather:flex-row">
					<img
						src={image}
						alt={description}
						width={100}
						height={100}
						className={classList("inline-22 block-auto", {
							"invert-weather-icon-color": shouldInvertColor,
						})}
					/>
					<span className="font-bricolage-grotesque font-semibold text-(length:--spacing-fluid-1600) italic trim-capital">
						{temperature}
					</span>
				</div>
				<p className="text-center text-text/77">{description}</p>
			</div>
		</div>
	);
}

function TimeDisplay() {
	const timezone = getPartialWeatherState("timezone");

	const [currentTime, setCurrentTime] = useState(() =>
		getFormattedCurrentTime(timezone),
	);

	// update the current time every minute
	useEffect(() => {
		const updateTime = () => setCurrentTime(getFormattedCurrentTime(timezone));

		// update current time immediately when timezone changes
		updateTime();

		const now = new Date();
		const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

		// variable to store the interval reference, used to clear it on unmount
		let interval: NodeJS.Timeout;

		const timeout = setTimeout(() => {
			updateTime();

			interval = setInterval(updateTime, 1 * 60 * 1000); /* 1 minute */
		}, delay);

		return () => {
			clearTimeout(timeout);
			if (interval) clearInterval(interval);
		};
	}, [timezone]);

	return (
		<span suppressHydrationWarning className="text-lg text-text/77">
			{currentTime}
		</span>
	);
}

function CurrentWeatherSkeleton() {
	return (
		<div className="grid items-center gap-8 p-6 @3xl/current-weather:grid-cols-[1fr_auto]">
			<div className="grid justify-items-center gap-2 @3xl/current-weather:justify-items-start">
				<Skeleton width={285} height={30} />
				<Skeleton width={260} />
				<Skeleton width={140} />
			</div>

			<div className="grid justify-items-center gap-2">
				<div className="flex flex-col items-center gap-8 @min-[30rem]/current-weather:flex-row">
					<Skeleton
						minWidth={70}
						width={70}
						height={70}
						circle
						className="my-4.5"
					/>
					<Skeleton minWidth={195} height={66} />
				</div>
				<Skeleton width={150} className="mx-auto" />
			</div>
		</div>
	);
}
