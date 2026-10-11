import { queryOptions } from "@tanstack/react-query";

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
