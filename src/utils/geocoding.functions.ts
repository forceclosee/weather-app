import { createServerFn } from "@tanstack/react-start";

import { geocodingSchema } from "#/lib/schema/geocoding-schema";

class FetchError extends Error {}

export const getLocation = createServerFn()
	.validator((data: string) => {
		if (!data.trim()) {
			throw new Error("Search query required");
		}
		return data;
	})
	.handler(async ({ data }) => {
		const url = `https://geocoding-api.open-meteo.com/v1/search?name=${data}&count=5`;

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new FetchError("Failed to fetch location data");
			}

			const rawApiData = await response.json();
			const result = geocodingSchema.safeParse(rawApiData);

			if (result.error) {
				throw new Error(result.error?.message);
			}

			return result.data;
		} catch (error) {
			if (error instanceof FetchError) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong");
			}
		}
	});
