import { queryOptions } from "@tanstack/react-query";

import { getLocation } from "#/utils/geocoding.functions";
import { getWeather } from "#/utils/weather.functions";
import { getWeatherState } from "#/utils/weather-store";

const weatherParams = getWeatherState();

export const createWeatherQueryOptions = () => {
	return queryOptions({
		queryKey: ["weather", weatherParams],
		queryFn: () => getWeather({ data: weatherParams }),
		refetchOnWindowFocus: false,
		staleTime: 15 * 60 * 1000 /* 15 minutes */,
		refetchInterval: 1 * 60 * 60 * 1000 /* 1 hour */,
		refetchIntervalInBackground: true,
	});
};

export const createLocationQueryOptions = (input: string) => {
	return queryOptions({
		queryKey: ["location", input],
		queryFn: () => getLocation({ data: input }),
		enabled: !!input,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		retry: false,
	});
};
