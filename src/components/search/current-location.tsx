import { Star } from "lucide-react";

import { getPartialLocations } from "#/utils/location-store";

import { Button } from "#/components/ui/aria-button";

export default function CurrentLocation() {
	const coordinate = getPartialLocations("coordinates");
	const city = getPartialLocations("city");
	const province = getPartialLocations("province");
	const country = getPartialLocations("country");
	const countryCode = getPartialLocations("countryCode");

	const handleFavourite = (e: MouseEvent) => {
		e.stopPropagation();

		// ...
	};

	return (
		<section className="grid gap-2">
			<h3 className="font-medium">Current location</h3>

			<div className="flex items-center justify-between gap-4 rounded-xl border border-border-muted p-2 squircle">
				<div className="grid grid-cols-[auto_1fr] items-center gap-1 gap-x-2 gap-y-1">
					{countryCode && (
						<img
							src={`https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg`}
							alt={`${country} flag`}
							width={48}
							height={48}
							className="inline-block shrink-0 block-auto inline-[1em]"
						/>
					)}

					<span className="font-medium">
						{[city, country].filter(Boolean).join(", ")}
					</span>

					<span className="col-span-2 text-text-muted">
						{`${province} (${coordinate.latitude}°N, ${coordinate.longitude}°E)`}
					</span>
				</div>

				{/* add to favourite button */}
				<Button
					variant="plain"
					className="shrink-0 p-2"
					onClick={() => handleFavourite}
					aria-label="Add to favourites">
					<Star strokeWidth={3} className="block-[1.1em] inline-auto" />
				</Button>
			</div>
		</section>
	);
}
