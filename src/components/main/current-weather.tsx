import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getParamsState, getPartialParamState } from "#/utils/weather-store";
import { getWeather } from "#/utils/weather.functions";
import { getFormattedDate } from "#/utils/date";
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
	const city = getPartialParamState("city");
	const country = getPartialParamState("country");
	const countryCode = getPartialParamState("countryCode");
	const countryFlagUrl = `https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg`;

	const weatherParams = getParamsState();

	const { data } = useSuspenseQuery({
		queryKey: ["weather", weatherParams],
		queryFn: () => getWeather({ data: weatherParams }),
		refetchOnWindowFocus: false,
	});

	const timestamp = data.current.time;
	const timezone = data.timezone;

	const { fullDate } = getFormattedDate({
		timestamp: timestamp,
		timezone: timezone,
	});

	const weatherCode = data.current.weather_code;
	const isDay = data.current.is_day;

	const { description, image } = getWeatherDetails({
		wmoCode: weatherCode,
		isDay: isDay,
	});

	const temperature = `${Math.round(data.current.temperature_2m)}${data.current_units.temperature_2m}`;

	return (
		<div className="grid items-center justify-items-center gap-8 p-6 pe-8 text-center md:grid-cols-[1fr_auto] md:justify-items-start md:text-start">
			<div className="grid gap-2">
				<h2 className="font-medium text-[1.85rem]">
					{city}, {country}
					<img
						src={countryFlagUrl}
						alt=""
						width={48}
						height={48}
						className="inline-[1em] block-auto ms-4 inline-block shrink-0"
					/>
				</h2>
				<p className="text-text/77">{fullDate}</p>
			</div>

			<div className="grid gap-2">
				<div className="flex flex-col items-center gap-8 *:shrink-0 min-[24rem]:flex-row">
					<img
						src={image}
						alt={description}
						width={100}
						height={100}
						className="inline-24 block-auto origin-center scale-150"
					/>
					<p className="trim-capital font-bricolage-grotesque font-semibold text-[6.2rem] italic">
						{temperature}
					</p>
				</div>
				<p className="text-center text-text/77">{description}</p>
			</div>
		</div>
	);
}

function CurrentWeatherSkeleton() {
	return (
		<div className="grid items-center justify-items-center gap-8 p-6 pe-8 text-center md:grid-cols-[1fr_auto] md:justify-items-start md:text-start">
			<div className="grid justify-items-center gap-2">
				<Skeleton width={285} height={30} />
				<Skeleton width={260} />
			</div>

			<div className="grid gap-2">
				<div className="flex flex-col items-center gap-8 *:shrink-0 min-[24rem]:flex-row">
					<Skeleton width={90} height={90} circle />
					<Skeleton width={195} height={66} />
				</div>
				<Skeleton width={150} className="mx-auto" />
			</div>
		</div>
	);
}
