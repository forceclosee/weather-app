import { queryOptions } from "@tanstack/react-query";

import { getLocation } from "#/utils/geocoding.functions";
import { getWeather } from "#/utils/weather.functions";

import type { WeatherStore } from "#/utils/weather-store";

export const createWeatherQueryOptions = (input: WeatherStore) => {
	return queryOptions({
		queryKey: ["weather", input],
		queryFn: () => getWeather({ data: input }),

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
