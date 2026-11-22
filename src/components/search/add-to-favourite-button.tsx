import { Star } from "lucide-react";

import type { Locations } from "#/types";
import { useFavouriteLocations } from "#/hook/use-favourite-locations";
import { cn } from "#/utils/class-helper";

import { Tooltip, type TriggerProps } from "#/components/ui/base-tooltip";

interface Props extends TriggerProps {
	location: Locations;
}

export default function AddToFavouriteButton({ location, ...props }: Props) {
	const {
		addFavouriteLocation,
		isAddLocationPending,
		isFavourited,
		deleteFavouriteLocation,
		isDeleteLocationPending,
	} = useFavouriteLocations();

	const handleFavourite = (location: Locations) => {
		// delete from favourites if already favourited
		if (isFavourited(location)) {
			deleteFavouriteLocation(location);
			return;
		}

		// add to favourite
		addFavouriteLocation(location);
	};

	return (
		<Tooltip.Root>
			<Tooltip.Trigger
				onClick={() => handleFavourite(location)}
				disabled={isAddLocationPending || isDeleteLocationPending}
				className="shrink-0 text-text hover:*:fill-text focus-visible:*:fill-text"
				aria-label={
					isFavourited(location)
						? `Remove ${location.city}, ${location.country} from favourites`
						: `Add ${location.city}, ${location.country} to favourites`
				}
				{...props}>
				{isAddLocationPending || isDeleteLocationPending ? (
					<span className="bubble-loader" />
				) : (
					<Star
						strokeWidth={3}
						className={cn("block-[1.1em] inline-auto", {
							"fill-text": isFavourited(location),
						})}
					/>
				)}
			</Tooltip.Trigger>

			<Tooltip.Content>
				{isFavourited(location)
					? `Remove ${location.city}, ${location.country} from favourites`
					: `Add ${location.city}, ${location.country} to favourites`}
			</Tooltip.Content>
		</Tooltip.Root>
	);
}
