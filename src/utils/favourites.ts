import type { Locations } from "#/types";

export const MAX_FAVOURITES = 10;

export interface FavouriteLocation extends Locations {
	createdAt: Date;
}

export type AddToFavouriteErrorReason =
	| "unauthenticated"
	| "email_unverified"
	| "limit_reached"
	| "already_favourited"
	| "invalid_input";

export type GetFavouriteErrorReason = "unauthenticated" | "email_unverified";

export type DeleteFavouriteErrorReason =
	| "unauthenticated"
	| "email_unverified"
	| "invalid_input";

export type AddFavouriteResult =
	| { ok: true; favourite: FavouriteLocation }
	| { ok: false; reason: AddToFavouriteErrorReason };

export type GetFavouriteLocationsResult =
	| { ok: true; favouriteLocations: FavouriteLocation[] }
	| { ok: false; reason: GetFavouriteErrorReason };

export type DeleteFavouriteLocationResult =
	| { ok: true }
	| { ok: false; reason: DeleteFavouriteErrorReason };
