import { getLocation } from "#/utils/geocoding.functions";
import { queryOptions } from "@tanstack/react-query";

export const createLocationQueryOptions = (input: string) => {
	return queryOptions({
		queryKey: ["location", input],
		queryFn: () => getLocation({ data: input }),
		enabled: !!input,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		retry: false,
	});
};
