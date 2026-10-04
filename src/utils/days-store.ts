import type { Days } from "#/types";
import { createStore, type Store, useSelector } from "@tanstack/react-store";

export type DaysStore = {
	days: Days[];
	selectedDay: Days;
};

export const daysStore: Store<DaysStore> = createStore({
	days: [],
	selectedDay: "Today",
});

export const getDays = (): Days[] => {
	return useSelector(daysStore);
};

export const getPartialDaysState = <K extends keyof DaysStore>(
	param: K,
): DaysStore[K] => {
	return useSelector(daysStore, (state) => state[param]);
};

export const updateDaysState = (newState: Partial<DaysStore>) => {
	daysStore.setState((prev) => ({
		...prev,
		...newState,
	}));
};
