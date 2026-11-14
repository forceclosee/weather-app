import {
	useRef,
	type Dispatch,
	type KeyboardEvent,
	type SetStateAction,
} from "react";
import { useQuery } from "@tanstack/react-query";

import { Star } from "lucide-react";

import type { Location } from "#/lib/schema/geocoding-schema";
import { updateLocations } from "#/utils/location-store";
import { locationQueryOptions } from "#/query-options/geocoding";

import { Button } from "#/components/ui/aria-button";

interface Props {
	searchValue: string;
	handleOpenChange: (open: boolean) => void;
	activeIndex: number;
	setActiveIndex: Dispatch<SetStateAction<number>>;
}

export default function SearchResult({
	searchValue,
	handleOpenChange,
	activeIndex,
	setActiveIndex,
}: Props) {
	const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const { data, isPending, isError, isSuccess } = useQuery(
		locationQueryOptions(searchValue),
	);

	const locations = data?.results ?? [];

	const itemCount = isSuccess ? locations.length : 0;

	const focusItem = (index: number) => {
		if (itemCount === 0) return;

		const next = (index + itemCount) % itemCount;

		setActiveIndex(next);
		itemRefs.current[next]?.focus();
	};

	const handleItemKeyDown = (
		e: KeyboardEvent<HTMLButtonElement>,
		index: number,
	) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				focusItem(index + 1);
				break;

			case "ArrowUp":
				e.preventDefault();
				focusItem(index - 1);
				break;

			case "Home":
				e.preventDefault();
				focusItem(0);
				break;

			case "End":
				e.preventDefault();
				focusItem(itemCount - 1);
				break;

			default:
				break;
		}
	};

	const handleSelectLocation = (location: Location) => {
		updateLocations({
			coordinates: {
				latitude: location.latitude,
				longitude: location.longitude,
			},
			timezone: location.timezone,
			city: location.name,
			country: location.country,
			countryCode: location.country_code.toLowerCase(),
		});

		handleOpenChange(false);
	};

	return (
		<section className="grid gap-2">
			<h3 className="font-medium">Results</h3>

			{/* empty state */}
			{!searchValue && (
				<p className="text-base text-text-muted">Type the city name</p>
			)}

			{/* loading state */}
			{searchValue && isPending && (
				<div className="search-loader max-inline-max"></div>
			)}

			{/* error state */}
			{isError ||
				(isSuccess && locations.length === 0 && (
					<p className="text-base font-medium text-text-error">
						No location found, Please use a different search term
					</p>
				))}

			{/* success state */}
			{isSuccess && locations.length > 0 && (
				<ul className="grid gap-1">
					{locations.map((location, index) => (
						<li
							key={location.id}
							className="flex items-center justify-between gap-4 rounded-xl border border-border-muted p-2 squircle focus-within:bg-bg-selected focus-within:outline-2 hover:bg-bg-selected">
							<Button
								ref={(el) => {
									itemRefs.current[index] = el;
								}}
								variant="plain"
								onClick={() => handleSelectLocation(location)}
								onKeyDown={(e) => handleItemKeyDown(e, index)}
								excludeFromTabOrder={activeIndex !== index}
								className="grid flex-1 grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 rounded-lg text-start outline-transparent">
								<img
									src={`https://hatscripts.github.io/circle-flags/flags/${location.country_code.toLowerCase()}.svg`}
									alt={`${location.country} flag`}
									width={48}
									height={48}
									className="inline-block shrink-0 block-auto inline-[1em]"
								/>

								<span className="font-medium">
									{`${location.name}, ${location.country}`}
								</span>

								<span className="col-span-2 text-text-muted">
									{`${location.admin1} (${location.latitude}°N, ${location.longitude}°E)`}
								</span>
							</Button>

							{/* add to favourite button */}
							<Button
								variant="plain"
								excludeFromTabOrder={activeIndex !== index}
								className="shrink-0 p-2"
								aria-label="Add to favourites">
								<Star strokeWidth={3} className="block-[1.1em] inline-auto" />
							</Button>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
