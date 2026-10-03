import { createServerFn } from "@tanstack/react-start";

import { weatherSchema } from "#/lib/schema/weather-schema";
import type { WeatherStore } from "#/utils/weather-store";

class FetchError extends Error {}

export const getWeather = createServerFn()
	.validator((data: WeatherStore) => data)
	.handler(async ({ data }) => {
		const {
			coordinates: { latitude, longitude },
			temperature,
			windSpeed,
			precipitation,
		} = data;

		const getTemperatureParameter = (temp = temperature) => {
			if (temp === "celcius") {
				return "";
			} else {
				return `&temperature_unit=${temp}`;
			}
		};

		const getWindSpeedParameter = (wind = windSpeed) => {
			if (wind === "kmh") {
				return "";
			} else {
				return `&wind_speed_unit=${wind}`;
			}
		};

		const getPrecipitationsParameter = (prec = precipitation) => {
			if (prec === "milimeters") {
				return "";
			} else {
				return `&precipitation_unit=${prec}`;
			}
		};

		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}5&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,apparent_temperature,relative_humidity_2m,wind_speed_10m,is_day,precipitation,wind_direction_10m&timezone=auto${getTemperatureParameter()}${getWindSpeedParameter()}${getPrecipitationsParameter()}`;

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new FetchError("Failed to fetch weather data");
			}

			const rawApiData = await response.json();
			const result = weatherSchema.safeParse(rawApiData);

			if (result.error) {
				throw new Error(result.error?.message);
			}

			return result.data;
		} catch (error) {
			if (error instanceof FetchError) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong");
			}
		}
	});
