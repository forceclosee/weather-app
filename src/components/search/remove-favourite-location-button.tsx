import { Trash } from "lucide-react";

import { useFavouriteLocations } from "#/hook/use-favourite-locations";
import type { FavouriteLocation } from "#/utils/favourites";

import { Tooltip, type TriggerProps } from "#/components/ui/base-tooltip";

interface Props extends TriggerProps {
	location: FavouriteLocation;
}

export default function RemoveFavouriteButton({ location, ...props }: Props) {
	const { deleteFavouriteLocation, isDeleteLocationPending } =
		useFavouriteLocations();

	const handleDelete = (location: FavouriteLocation) => {
		deleteFavouriteLocation(location);
	};

	return (
		<Tooltip.Root>
			<Tooltip.Trigger
				onClick={() => handleDelete(location)}
				disabled={isDeleteLocationPending}
				className="shrink-0 p-2 text-text-error hover:text-text-error/70 hover:not-disabled:scale-125 focus-visible:text-text-error/70"
				aria-label={`Remove ${location.city}, ${location.country} from favourites`}
				{...props}>
				{isDeleteLocationPending ? (
					<span className="bubble-loader" />
				) : (
					<Trash strokeWidth={3} className="block-[1.1em] inline-auto" />
				)}
			</Tooltip.Trigger>

			<Tooltip.Content>
				{`Remove ${location.city}, ${location.country} from favourites`}
			</Tooltip.Content>
		</Tooltip.Root>
	);
}
// <Button
// 			variant="plain"
// 			onClick={() => handleDelete(location)}
// 			isDisabled={isDeleteLocationPending}
// 			className="shrink-0 p-2 text-text-error hover:text-text-error/70 hover:not-disabled:scale-125 focus-visible:text-text-error/70"
// 			aria-label="Delete location from favourites"
// 			{...props}>
// 			{isDeleteLocationPending ? (
// 				<span className="bubble-loader" />
// 			) : (
// 				<Trash strokeWidth={3} className="block-[1.1em] inline-auto" />
// 			)}
// 		</Button>
