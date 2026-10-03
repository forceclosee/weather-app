import { Suspense, useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getWeatherState, getPartialWeatherState } from "#/utils/weather-store";
import { getWeather } from "#/utils/weather.functions";
import { getFormattedDate, getFormattedCurrentTime } from "#/utils/date";
import { getWeatherDetails } from "#/utils/weather";

import { Skeleton } from "#/components/ui/skeleton";

import bgMobile from "#/images/bg-today-small.svg";
import bgDesktop from "#/images/bg-today-large.svg";

export default function CurrentWeather() {
	return (
		<div className="scheme-dark squircle max-block-max min-block-71.5 relative isolate grid items-center overflow-clip rounded-2xl text-text">
			<picture className="absolute inset-0 z-[-1]" aria-hidden>
				<source media="(width >= 48rem)" srcSet={bgDesktop} />
				<img
					src={bgMobile}
					alt=""
					className="block-full origin-center scale-110 object-cover"
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

	const { data } = useSuspenseQuery({
		queryKey: ["weather", weatherParams],
		queryFn: () => getWeather({ data: weatherParams }),
		refetchOnWindowFocus: false,
	});

	const temperature = `${Math.round(data.current.temperature_2m)}${data.current_units.temperature_2m}`;

	const { fullDate } = getFormattedDate({
		timestamp: data.current.time,
		timezone: timezone,
	});

	const { description, image } = getWeatherDetails({
		wmoCode: data.current.weather_code,
		isDay: data.current.is_day,
	});

	return (
		<div className="grid @3xl/current-weather:grid-cols-[1fr_auto] items-center @3xl/current-weather:justify-items-start justify-items-center gap-8 p-6 pe-8 text-center @3xl/current-weather:text-start">
			<div className="grid gap-2">
				<h2 className="font-medium text-[1.85rem]">
					<span>{`${city}, ${country}`}</span>
					<img
						src={countryFlagUrl}
						alt=""
						width={48}
						height={48}
						className="inline-[1em] block-auto ms-4 inline-block shrink-0"
					/>
				</h2>
				<span className="text-lg text-text/77">{fullDate}</span>
				<TimeDisplay />
			</div>

			<div className="grid gap-2">
				<div className="flex @min-[30rem]/current-weather:flex-row flex-col items-center gap-8 *:shrink-0">
					<img
						src={image}
						alt={description}
						width={100}
						height={100}
						className="inline-24 block-auto origin-center scale-150 drop-shadow-(--current-weather-icon-drop-shadow)"
					/>
					<span className="trim-capital font-bricolage-grotesque font-semibold text-[6.2rem] italic">
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

		const now = new Date();
		const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

		// variable to store the interval reference, used to clear it on unmount
		let interval: NodeJS.Timeout;

		const timeout = setTimeout(() => {
			updateTime();

			interval = setInterval(updateTime, 1 * 60 * 1000);
		}, delay);

		return () => {
			clearTimeout(timeout);
			if (interval) clearInterval(interval);
		};
	}, [timezone]);

	return <span className="text-lg text-text/77">{currentTime}</span>;
}

function CurrentWeatherSkeleton() {
	return (
		<div className="grid @3xl/current-weather:grid-cols-[1fr_auto] items-center gap-8 p-6">
			<div className="grid @3xl/current-weather:justify-items-start justify-items-center gap-2">
				<Skeleton width={285} height={30} />
				<Skeleton width={260} />
				<Skeleton width={140} />
			</div>

			<div className="grid justify-items-center gap-2">
				<div className="flex @min-[30rem]/current-weather:flex-row flex-col items-center gap-8">
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
