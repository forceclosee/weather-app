import { queryOptions } from "@tanstack/react-query";

import { getUnits } from "#/utils/units.functions";

export const unitsQueryOptions = (userId: string) => {
	return queryOptions({
		queryKey: ["units", userId],
		queryFn: () => getUnits(),
		staleTime: Infinity,
	});
};
