import { queryOptions } from "@tanstack/react-query";

import { getWeather, type WeatherParams } from "#/utils/weather.functions";

export const weatherQueryOptions = (input: WeatherParams) => {
	return queryOptions({
		queryKey: ["weather", input],
		queryFn: () => getWeather({ data: input }),
		refetchOnWindowFocus: false,
		staleTime: 15 * 60 * 1000 /* 15 minutes */,
		refetchInterval: 1 * 60 * 60 * 1000 /* 1 hour */,
		refetchIntervalInBackground: true,
	});
};
