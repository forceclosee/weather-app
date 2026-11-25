import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Locations } from "#/types";
import { useRovingTabindex } from "#/hook/use-roving-tabindex";
import { updateLocations } from "#/utils/location-store";
import { locationQueryOptions } from "#/query-options/geocoding";

import { Button } from "#/components/ui/aria-button";
import AddToFavouriteButton from "#/components/search/add-to-favourite-button";

interface Props {
	searchValue: string;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchResult({ searchValue, setIsOpen }: Props) {
	const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const { data, isPending, isError, isSuccess } = useQuery(
		locationQueryOptions(searchValue),
	);

	const locations =
		data?.results.map((loc) => {
			const location = {
				coordinates: {
					latitude: loc.latitude,
					longitude: loc.longitude,
				},
				timezone: loc.timezone,
				city: loc.name,
				province: loc.admin1,
				country: loc.country,
				countryCode: loc.country_code.toLowerCase(),
			};
			return location;
		}) ?? [];

	const [activeIndex, setActiveIndex] = useState(0);

	const itemCount = isSuccess ? locations.length : 0;

	const { handleItemKeyDown } = useRovingTabindex({
		itemRefs,
		setActiveIndex,
		itemCount,
	});

	const handleSelectLocation = (location: Locations) => {
		updateLocations(location);

		setIsOpen(false);
	};

	return (
		<section className="grid gap-2">
			<h3 className="font-medium">Search results</h3>

			{/* empty state */}
			{!searchValue && (
				<p className="text-base text-text-muted">Type the city name...</p>
			)}

			{/* loading state */}
			{searchValue && isPending && (
				<div className="search-loader max-inline-max"></div>
			)}

			{/* error state */}
			{(isError || (isSuccess && locations.length === 0)) && (
				<p className="text-base font-medium text-text-error">
					No location found, Please use a different search term.
				</p>
			)}

			{/* success state */}
			{isSuccess && locations.length > 0 && (
				<ul className="grid gap-1">
					{locations.map((location, index) => (
						<li
							key={`${location.coordinates.latitude}, ${location.coordinates.longitude}`}
							className="flex items-center justify-between gap-4 rounded-xl border border-border-muted p-2 transition-all duration-200 squircle focus-within:bg-bg-selected focus-within:outline-2 hover:bg-bg-selected active:scale-95">
							<Button
								ref={(el) => {
									itemRefs.current[index] = el;
								}}
								variant="plain"
								onClick={() => handleSelectLocation(location)}
								onKeyDown={(e) => handleItemKeyDown(e, index)}
								excludeFromTabOrder={activeIndex !== index}
								className="grid flex-1 grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 text-start outline-transparent active:not-disabled:scale-100">
								<img
									src={`https://hatscripts.github.io/circle-flags/flags/${location.countryCode}.svg`}
									alt={`${location.country} flag`}
									width={48}
									height={48}
									className="inline-block shrink-0 block-auto inline-[1em]"
								/>

								<span className="font-medium">
									{`${location.city}, ${location.country}`}
								</span>

								<span className="col-span-2 text-text-muted">
									{`${location.province} (${location.coordinates.latitude}°N, ${location.coordinates.longitude}°E)`}
								</span>
							</Button>

							{/* add to favourite button */}
							<AddToFavouriteButton
								location={location}
								tabIndex={activeIndex === index ? 0 : -1}
							/>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
