import { queryOptions } from "@tanstack/react-query";

import { getFavouriteLocations } from "#/utils/favourite-locations.functions";

export const favouriteLocationsQueryOptions = (userId: string) => {
	return queryOptions({
		queryKey: ["favourite-locations", userId],
		queryFn: () => getFavouriteLocations(),
		staleTime: Infinity,
	});
};
