import { queryOptions } from "@tanstack/react-query";

import type { Coordinates } from "#/types";
import { getReverseGeocoding } from "#/utils/reverse-geocoding";

export const reverseGeocoding = (coordinate: Coordinates | undefined) => {
	return queryOptions({
		queryKey: ["reverse-geocoding", coordinate],
		queryFn: () => getReverseGeocoding(coordinate),
		enabled: !!coordinate,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	});
};
