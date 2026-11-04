import { useMemo } from "react";

import { getLocations } from "#/utils/location-store";
import type { WeatherParams } from "#/utils/weather.functions";
import { useUnits } from "#/hook/use-units";

export function useWeatherParams(): WeatherParams {
	const location = getLocations();

	const { units } = useUnits();

	const weatherParams = useMemo(
		() => ({ ...location, ...units }),
		[location, units],
	);

	return weatherParams;
}
