import { createStore, useSelector } from "@tanstack/react-store";

import type { Locations } from "#/types";
import { normalizeCoordinates } from "#/utils/location";

export const locationsStore = createStore<Locations>({
	coordinates: {
		latitude: 52.5244,
		longitude: 13.4105,
	},
	timezone: "Europe/Berlin",
	city: "Berlin",
	province: "Berlin",
	country: "Germany",
	countryCode: "de",
});

export const getLocations = (): Locations => {
	return useSelector(locationsStore);
};

export const getPartialLocations = <K extends keyof Locations>(
	param: K,
): Locations[K] => {
	return useSelector(locationsStore, (state) => state[param]);
};

export const setLocations = (newState: Locations) => {
	locationsStore.setState(() => ({
		...newState,
		coordinates: normalizeCoordinates(newState.coordinates),
	}));
};

export const updateLocations = (newState: Partial<Locations>) => {
	locationsStore.setState((prev) => ({
		...prev,
		...newState,
		coordinates: newState.coordinates
			? normalizeCoordinates(newState.coordinates)
			: prev.coordinates,
	}));
};
