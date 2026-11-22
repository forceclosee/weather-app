import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { reverseGeocoding } from "#/query-options/reverse-geocoding";
import type { Coordinates } from "#/types";
import { updateLocations } from "#/utils/location-store";

import { useToastManager } from "#/components/ui/base-toast";

export default function Geolocation() {
	const toastManager = useToastManager();

	const [coordinate, setCoordinate] = useState<Coordinates | undefined>(
		undefined,
	);

	const containerRef = useRef<HTMLDivElement>(null);

	// get the user coordinate
	const handleLocation = (event: Event) => {
		const element = event.target as HTMLGeolocationElement;

		if (element.position) {
			const { latitude, longitude } = element.position.coords;
			setCoordinate({ latitude, longitude });
		} else if (element.error) {
			toastManager.add({
				type: "error",
				title: "Failed to get location",
				description: element.error.message,
			});
		}
	};

	// import polyfill for unsupported browser
	const importPolyfill = async () => {
		await import("geolocation-element-polyfill");
	};

	// create 'geolocation' element
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		if (!("HTMLGeolocationElement" in window)) {
			importPolyfill();
		}

		const geolocationElement = document.createElement("geolocation");

		geolocationElement.setAttribute("accuracymode", "precise");
		geolocationElement.setAttribute("autolocate", "");
		geolocationElement.classList.add("geolocation");

		container.append(geolocationElement);

		container.addEventListener("location", handleLocation);

		return () => {
			container.replaceChildren();
			container.removeEventListener("location", handleLocation);
		};
	}, []);

	// reverse geocoding
	const { data, isError, error } = useQuery(reverseGeocoding(coordinate));

	// toast for fetch error
	useEffect(() => {
		if (isError) {
			toastManager.add({
				type: "error",
				title: "Failed to get location",
				description: error?.message ?? "Something went wrong",
			});
		}
	}, [isError, error, toastManager]);

	const locality = () => {
		if (!data?.locality) {
			return data?.city ?? "";
		}

		if (data.locality !== data.city) {
			return [data?.locality ?? "", data?.city ?? ""]
				.filter(Boolean)
				.join(", ");
		}

		return data.locality ?? "";
	};

	const city = data?.city ?? "";
	const country = data?.countryName ?? "";
	const countryCode = data?.countryCode?.toLowerCase() ?? "";
	const timezone =
		data?.localityInfo?.informative.find(
			(entry) => entry.description === "time zone",
		)?.name ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

	// update location store
	useEffect(() => {
		if (!coordinate || !data) return;

		updateLocations({
			coordinates: coordinate,
			city: locality(),
			province: city,
			country,
			countryCode,
			timezone,
		});
	}, [coordinate, data]);

	return <div ref={containerRef} />;
}
