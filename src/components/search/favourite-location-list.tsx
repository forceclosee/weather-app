import {
	useRef,
	type Dispatch,
	type KeyboardEvent,
	type SetStateAction,
} from "react";

import type { Locations } from "#/types";
import { useFavouriteLocations } from "#/hook/use-favourite-locations";

import { updateLocations } from "#/utils/location-store";

import { Button } from "#/components/ui/aria-button";
import RemoveFavouriteButton from "./remove-favourite-location-button";

interface Props {
	handleOpenChange: (open: boolean) => void;
	activeIndex: number;
	setActiveIndex: Dispatch<SetStateAction<number>>;
}

export default function FavouriteLocationList({
	activeIndex,
	setActiveIndex,
	handleOpenChange,
}: Props) {
	const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const { favouriteLocations, locationsStatus } = useFavouriteLocations();

	const itemCount = favouriteLocations ? favouriteLocations.length : 0;

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

	const handleSelectLocation = (location: Locations) => {
		updateLocations(location);

		handleOpenChange(false);
	};

	return (
		<section className="grid gap-2">
			<h3 className="font-medium">Favourites</h3>

			{/* unauthenticated user placeholder */}
			{locationsStatus === "unauthenticated" && (
				<p className="text-base text-text-muted">
					Login to to add location to favourites
				</p>
			)}

			{/* unverified user placeholder */}
			{locationsStatus === "email_unverified" && (
				<p className="text-base text-text-muted">
					Verify your email address to to add location to favourites
				</p>
			)}

			{/* empty placeholder */}
			{locationsStatus === "ready" && favouriteLocations.length === 0 && (
				<p className="text-base text-text-muted">No favourite locations yet.</p>
			)}

			{locationsStatus === "ready" && favouriteLocations.length > 0 && (
				<ul className="grid gap-1">
					{favouriteLocations.map((location, index) => (
						<li
							key={`${location.coordinates.latitude}, ${location.coordinates.longitude}`}
							className="flex items-center justify-between gap-4 rounded-xl border border-border-muted p-2 squircle focus-within:bg-bg-selected focus-within:outline-2 hover:bg-bg-selected">
							<Button
								ref={(el) => {
									itemRefs.current[index] = el;
								}}
								variant="plain"
								onClick={() => handleSelectLocation(location)}
								onKeyDown={(e) => handleItemKeyDown(e, index)}
								excludeFromTabOrder={activeIndex !== index}
								className="grid flex-1 grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 text-start outline-transparent">
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

							{/* remove location from favourite button */}
							<RemoveFavouriteButton
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
