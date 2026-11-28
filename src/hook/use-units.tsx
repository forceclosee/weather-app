import { useEffect, useMemo } from "react";
import { getRouteApi } from "@tanstack/react-router";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

import { useLocalStorage } from "#/hook/use-local-storage";
import type { Units, Temperature, WindSpeed, Precipitation } from "#/types";
import { unitsQueryOptions } from "#/query-options/units";
import { seedUnits, updateUnits } from "#/utils/units.functions";

// module-level guard so multiple useUnits() consumers don't seed the same user twice
const seededUsers = new Set<string>();

const defaultUnits: Units = {
	temperature: "celcius",
	windSpeed: "kmh",
	precipitation: "milimeters",
};

export function useUnits() {
	const { user } = getRouteApi("__root__").useRouteContext();

	const [localUnits, setLocalUnits] = useLocalStorage<Units>(
		"units",
		defaultUnits,
	);

	const queryClient = useQueryClient();

	const options = useMemo(
		() => unitsQueryOptions(user?.id ?? "guest"),
		[user?.id],
	);

	const { data } = useSuspenseQuery(options);

	const isLoggedIn = Boolean(user);

	// get units from database from authenticated user, or from local storage for guest
	const units = useMemo<Units>(() => {
		if (isLoggedIn && data) {
			return {
				temperature: data.temperature as Temperature,
				windSpeed: data.windSpeed as WindSpeed,
				precipitation: data.precipitation as Precipitation,
			};
		}

		return localUnits;
	}, [isLoggedIn, data, localUnits]);

	const { mutate } = useMutation({
		mutationFn: (next: Units) => updateUnits({ data: next }),
		onSuccess: (updated) => {
			if (updated) queryClient.setQueryData(options.queryKey, updated);
		},
	});

	// save the selected units to database after signup and login (if the user don't have saved in the database yet)
	useEffect(() => {
		if (!user || data !== null || seededUsers.has(user.id)) return;

		seededUsers.add(user.id);

		void seedUnits({ data: localUnits })
			.then((row) => {
				if (row) {
					queryClient.setQueryData(options.queryKey, row);
				} else {
					queryClient.invalidateQueries({ queryKey: options.queryKey });
				}
			})
			.catch(() => {
				seededUsers.delete(user.id);
			});
	}, [user, data, localUnits, queryClient, options.queryKey]);

	const setUnits = (newState: Units | ((prev: Units) => Units)) => {
		const resolved =
			typeof newState === "function" ? newState(units) : newState;

		setLocalUnits(resolved);

		if (isLoggedIn) mutate(resolved);
	};

	return { units, setUnits };
}
