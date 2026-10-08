import { createStore, useSelector, type Store } from "@tanstack/react-store";

import type { Temperature, WindSpeed, Precipitation } from "#/types";

type Coordinates = {
	latitude: number;
	longitude: number;
};

export type WeatherStore = {
	coordinates: Coordinates;
	timezone: string;
	city: string;
	country: string;
	countryCode: string;
	temperature: Temperature;
	windSpeed: WindSpeed;
	precipitation: Precipitation;
};

export const weatherStateStore: Store<WeatherStore> = createStore({
	coordinates: {
		latitude: 52.5244,
		longitude: 13.4105,
	},
	timezone: "Europe/Berlin",
	city: "Berlin",
	country: "Germany",
	countryCode: "de",
	temperature: "celcius",
	windSpeed: "kmh",
	precipitation: "milimeters",
});

export const getWeatherState = (): WeatherStore => {
	return useSelector(weatherStateStore);
};

export const getPartialWeatherState = <K extends keyof WeatherStore>(
	param: K,
): WeatherStore[K] => {
	return useSelector(weatherStateStore, (state) => state[param]);
};

export const setWeatherState = (newState: WeatherStore) => {
	weatherStateStore.setState(() => newState);
};

export const updateWeatherState = (newState: Partial<WeatherStore>) => {
	weatherStateStore.setState((prev) => ({
		...prev,
		...newState,
	}));
};
