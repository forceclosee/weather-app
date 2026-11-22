import type { MouseEvent } from "react";
import { Star } from "lucide-react";

import type { Locations } from "#/types";
import { useFavouriteLocations } from "#/hook/use-favourite-locations";
import { cn } from "#/utils/class-helper";

import { Button, type ButtonProps } from "#/components/ui/aria-button";

interface Props extends Omit<ButtonProps, "children"> {
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

	const handleFavourite = (
		e: MouseEvent<HTMLButtonElement>,
		location: Locations,
	) => {
		e.stopPropagation();

		// delete from favourites if already favourited
		if (isFavourited(location)) {
			deleteFavouriteLocation(location);
			return;
		}

		// add to favourite
		addFavouriteLocation(location);
	};

	return (
		<Button
			variant="plain"
			onClick={(e) =>
				handleFavourite(e as MouseEvent<HTMLButtonElement>, location)
			}
			isDisabled={isAddLocationPending || isDeleteLocationPending}
			className="shrink-0 p-2"
			aria-label={
				isFavourited(location)
					? `Remove ${location.city}, ${location.country} from favourites`
					: `Add ${location.city}, ${location.country} to favourites`
			}
			{...props}>
			<Star
				strokeWidth={3}
				className={cn(
					"block-[1.1em] inline-auto hover:fill-text focus-visible:fill-text",
					{ "fill-text": isFavourited(location) },
				)}
			/>
		</Button>
	);
}
