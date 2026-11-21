import { reverseGeocodingSchema } from "#/lib/schema/reverse-geocoding-schema";
import type { Coordinates } from "#/types";

class FetchError extends Error {}

export async function getReverseGeocoding(coordinate: Coordinates | undefined) {
	if (!coordinate) throw new Error("missing coordinate");

	const url = `https://api-bdc.io/data/reverse-geocode-client?latitude=${coordinate.latitude}&longitude=${coordinate.longitude}&localityLanguage=en`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new FetchError("Failed to fetch location details");
		}

		const rawApiData = await response.json();
		const result = reverseGeocodingSchema.safeParse(rawApiData);

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
}
