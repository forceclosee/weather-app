import { createStore, useSelector, type Store } from "@tanstack/react-store";
import type { Temperature, WindSpeed, Precipitation } from "#/types";

type Coordinates = {
	latitude: number;
	longitude: number;
};

export type WeatherStore = {
	coordinates: Coordinates;
	city: string;
	country: string;
	countryCode: string;
	temperature: Temperature;
	windSpeed: WindSpeed;
	precipitation: Precipitation;
};

export const weatherParamsStateStore: Store<WeatherStore> = createStore({
	coordinates: {
		latitude: 52.5244,
		longitude: 13.4105,
	},
	city: "Berlin",
	country: "Germany",
	countryCode: "de",
	temperature: "celcius",
	windSpeed: "kmh",
	precipitation: "milimeters",
});

export const getParamsState = (): WeatherStore => {
	return useSelector(weatherParamsStateStore);
};

export const getPartialParamState = <K extends keyof WeatherStore>(
	param: K,
): WeatherStore[K] => {
	return useSelector(weatherParamsStateStore, (state) => state[param]);
};

export const setCity = (newCity: string) => {
	weatherParamsStateStore.setState((state) => {
		return {
			...state,
			city: newCity,
		};
	});
};

export const setCountry = (newCountry: string) => {
	weatherParamsStateStore.setState((state) => {
		return {
			...state,
			country: newCountry,
		};
	});
};

export const setCountryCode = (newCountryCode: string) => {
	weatherParamsStateStore.setState((state) => {
		return {
			...state,
			countryCode: newCountryCode.toLowerCase(),
		};
	});
};

export const setCoordinates = (newCoordinates: Coordinates) => {
	weatherParamsStateStore.setState((state) => {
		return {
			...state,
			coordinates: newCoordinates,
		};
	});
};

export const setTemperature = (newTemperature: Temperature) => {
	weatherParamsStateStore.setState((state) => {
		return {
			...state,
			temperature: newTemperature,
		};
	});
};

export const setWindSpeed = (newWindSpeed: WindSpeed) => {
	weatherParamsStateStore.setState((state) => {
		return {
			...state,
			windSpeed: newWindSpeed,
		};
	});
};

export const setPrecipitaion = (newPrecipitation: Precipitation) => {
	weatherParamsStateStore.setState((state) => {
		return {
			...state,
			precipitation: newPrecipitation,
		};
	});
};
