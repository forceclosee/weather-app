import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ArrowDown, CloudRainWind, Droplet, Info, Wind } from "lucide-react";

import { getWeatherState } from "#/utils/weather-store";
import { getWeather } from "#/utils/weather.functions";
import { getNamedDirection } from "#/utils/weather";

import { Card } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { Popover } from "#/components/ui/base-popover";
import FeelsLikeIcon from "#/components/icons/feels-like";

export default function AdditionalInfo() {
	return (
		<div className="grid @min-[27rem]/current-weather:grid-cols-2 @min-[56rem]/current-weather:grid-cols-4 gap-fluid-450">
			<Suspense fallback={<AdditionalInfoSkeleton />}>
				<CurrentWeatherContent />
			</Suspense>
		</div>
	);
}

function CurrentWeatherContent() {
	const weatherParams = getWeatherState();

	const { data } = useSuspenseQuery({
		queryKey: ["weather", weatherParams],
		queryFn: () => getWeather({ data: weatherParams }),
		refetchOnWindowFocus: false,
	});

	const feelsLike = `${Math.round(data.current.apparent_temperature)}${data.current_units.apparent_temperature}`;
	const humidity = `${data.current.relative_humidity_2m}${data.current_units.relative_humidity_2m}`;
	const wind = `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`;
	const windUnits = data.current_units.wind_direction_10m;
	const precipitations = `${data.current.precipitation} ${data.current_units.precipitation}`;
	const windDirection = data.current.wind_direction_10m;
	const namedDirection = getNamedDirection(windDirection);

	return (
		<>
			<Card
				layout="additional-info"
				title="Feels Like"
				titleIcon={<FeelsLikeIcon height={20} />}
				content={feelsLike}
				popover={
					<Popover
						trigger={<Info className="block-4 inline-auto" />}
						triggerAriaLabel="Open more info"
						title="Feels like (Apparent temperature)"
						description="Apparent temperature is the perceived feels-like temperature combining wind chill factor, relative humidity and solar radiation."
					/>
				}
			/>

			<Card
				layout="additional-info"
				title="Humidity"
				titleIcon={<Droplet className="block-5 inline-auto" />}
				content={humidity}
				popover={
					<Popover
						trigger={<Info className="block-4 inline-auto" />}
						triggerAriaLabel="Open more info"
						title="Humidity"
						description="Humidity is a measurement of the amount of water vapour in the air."
					/>
				}
			/>

			<Card
				layout="additional-info"
				title="Wind"
				titleIcon={<Wind className="block-5 inline-auto" />}
				content={wind}
				icon={
					<ArrowDown
						className="block-[1em] inline-auto shrink-0"
						style={{ rotate: `${windDirection}deg` }}
					/>
				}
				popover={
					<Popover
						trigger={<Info className="block-4 inline-auto" />}
						triggerAriaLabel="Open more info"
						title="Wind"
						description={`Winds ${wind} from the ${namedDirection} direction (${windDirection}${windUnits})`}
					/>
				}
			/>

			<Card
				layout="additional-info"
				title="Precipitations"
				titleIcon={<CloudRainWind className="block-5 inline-auto" />}
				content={precipitations}
				popover={
					<Popover
						trigger={<Info className="block-4 inline-auto" />}
						triggerAriaLabel="Open more info"
						title="Precipitation"
						description="Precipitation is water vapor that has condensed from clouds to fall as liquid (rain) or solids (snow, hail)."
					/>
				}
			/>
		</>
	);
}

function AdditionalInfoSkeleton() {
	return (
		<>
			<Card
				layout="additional-info"
				title="Feels Like"
				titleIcon={<FeelsLikeIcon height={20} />}
				content={<Skeleton width={60} height={32} />}
			/>
			<Card
				layout="additional-info"
				title="Humidity"
				titleIcon={<Droplet className="block-5 inline-auto" />}
				content={<Skeleton width={60} height={32} />}
			/>
			<Card
				layout="additional-info"
				title="Wind"
				titleIcon={<Wind className="block-5 inline-auto" />}
				content={
					<Skeleton
						minWidth="clamp(5rem, -1rem + 75cqw, 8rem)"
						height={32}
						className="shrink-0"
					/>
				}
				icon={<Skeleton circle width={32} height={32} />}
			/>
			<Card
				layout="additional-info"
				title="Precipitations"
				titleIcon={<CloudRainWind className="block-5 inline-auto" />}
				content={<Skeleton width={80} height={32} />}
			/>
		</>
	);
}
