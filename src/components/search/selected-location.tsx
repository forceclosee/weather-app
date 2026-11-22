import { getLocations } from "#/utils/location-store";

import AddToFavouriteButton from "#/components/search/add-to-favourite-button";

export default function SelectedLocation() {
	const location = getLocations();

	return (
		<section className="grid gap-2">
			<h3 className="font-medium">Selected location</h3>

			<div className="flex items-center justify-between gap-4 rounded-xl border border-border-muted p-2 squircle">
				<div className="grid grid-cols-[auto_1fr] items-center gap-1 gap-x-2 gap-y-1">
					{location.countryCode && (
						<img
							src={`https://hatscripts.github.io/circle-flags/flags/${location.countryCode}.svg`}
							alt={`${location.country} flag`}
							width={48}
							height={48}
							className="inline-block shrink-0 block-auto inline-[1em]"
						/>
					)}

					<span className="font-medium">
						{[location.city, location.country].filter(Boolean).join(", ")}
					</span>

					<span className="col-span-2 text-text-muted">
						{`${location.province} (${location.coordinates.latitude}°N, ${location.coordinates.longitude}°E)`}
					</span>
				</div>

				{/* add to favourite button */}
				<AddToFavouriteButton location={location} />
			</div>
		</section>
	);
}
