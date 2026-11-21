import { createStore, useSelector } from "@tanstack/react-store";

import type { Coordinates } from "#/types";

export interface LocationsStore {
	coordinates: Coordinates;
	timezone: string;
	city: string;
	province: string;
	country: string;
	countryCode: string;
}

export const locationsStore = createStore<LocationsStore>({
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

export const getLocations = (): LocationsStore => {
	return useSelector(locationsStore);
};

export const getPartialLocations = <K extends keyof LocationsStore>(
	param: K,
): LocationsStore[K] => {
	return useSelector(locationsStore, (state) => state[param]);
};

export const setLocations = (newState: LocationsStore) => {
	locationsStore.setState(() => newState);
};

export const updateLocations = (newState: Partial<LocationsStore>) => {
	locationsStore.setState((prev) => ({
		...prev,
		...newState,
	}));
};
