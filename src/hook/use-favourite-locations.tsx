import { useCallback, useMemo } from "react";
import { getRouteApi } from "@tanstack/react-router";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

import type { Locations } from "#/types";
import { favouriteLocationsQueryOptions } from "#/query-options/favourite-locations";
import {
	addFavouriteLocation as addFavouriteLocationFn,
	deleteFavouriteLocation as deleteFavouriteLocationFn,
} from "#/utils/favourite-locations.functions";
import type {
	AddToFavouriteErrorReason,
	DeleteFavouriteErrorReason,
	FavouriteLocation,
	GetFavouriteErrorReason,
} from "#/utils/favourites";
import { coordinateKey } from "#/utils/location";

import { useToastManager } from "#/components/ui/base-toast";

const routeApi = getRouteApi("__root__");

const EMPTY: FavouriteLocation[] = [];

const addFavouriteLocationErrorMessages = {
	unauthenticated: "Login to add location to favourites",
	email_unverified: "Verify your email address to add location to favourites",
	invalid_input:
		"Some location details are missing, cant add location to favourite",
	already_favourited: "Location already in favourite list",
	limit_reached:
		"You can only add maximum 10 locations to favourite, remove some favourite locations to add new location",
} satisfies Record<AddToFavouriteErrorReason, string>;

const deleteFavouriteLocationErrorMessages = {
	unauthenticated: "Login to delete favourite location",
	email_unverified: "Verify your email address to delete favourite location",
	invalid_input:
		"Some location details are missing, cant delete favourite location",
} satisfies Record<DeleteFavouriteErrorReason, string>;

export function useFavouriteLocations() {
	const { user } = routeApi.useRouteContext();

	const toastManager = useToastManager();

	const queryClient = useQueryClient();
	const options = useMemo(
		() => favouriteLocationsQueryOptions(user?.id ?? ""),
		[user?.id],
	);

	// add to favourite
	const { mutate: addMutate, isPending: isAddLocationPending } = useMutation({
		mutationFn: (location: Locations) =>
			addFavouriteLocationFn({ data: location }),
		onError: (error, variables) => {
			toastManager.add({
				type: "error",
				title: `Failed to add ${variables.city}, ${variables.country}`,
				description: error.message,
			});
		},
		onSuccess: (result, variables) => {
			if (!result.ok) {
				toastManager.add({
					type: "error",
					title: `Failed to add ${variables.city}, ${variables.country}`,
					description: addFavouriteLocationErrorMessages[result.reason],
				});

				queryClient.invalidateQueries({ queryKey: options.queryKey }); // resync stale tab

				return;
			}

			queryClient.setQueryData(options.queryKey, (prev) => {
				if (!prev?.ok) return prev;

				toastManager.add({
					type: "success",
					title: `Successfully add ${variables.city}, ${variables.country}`,
					description: `${variables.city}, ${variables.country} has been added to favourites`,
				});

				return {
					...prev,
					favouriteLocations: [result.favourite, ...prev.favouriteLocations],
				};
			});
		},
	});

	const addFavouriteLocation = (location: Locations) => {
		addMutate(location);
	};

	// favourite locations
	const { data } = useSuspenseQuery(options);

	const locationsStatus: GetFavouriteErrorReason | "ready" = data.ok
		? "ready"
		: data.reason;

	const favouriteLocations = data.ok ? data.favouriteLocations : EMPTY;

	const favouriteKeys = useMemo(
		() =>
			new Set(
				favouriteLocations.map((favLoc) => coordinateKey(favLoc.coordinates)),
			),
		[favouriteLocations],
	);

	// check if location is favourited
	const isFavourited = useCallback(
		(location: Locations) => {
			return favouriteKeys.has(coordinateKey(location.coordinates));
		},
		[favouriteKeys],
	);

	// delete favourite location
	const { mutate: deleteMutate, isPending: isDeleteLocationPending } =
		useMutation({
			mutationFn: (location: Locations) =>
				deleteFavouriteLocationFn({ data: location }),
			onError: (error, variables) => {
				toastManager.add({
					type: "error",
					title: `Failed to delete ${variables.city}, ${variables.country}`,
					description: error.message,
				});
			},
			onSuccess: (result, variables) => {
				if (!result.ok) {
					toastManager.add({
						type: "error",
						title: `Failed to delete ${variables.city}, ${variables.country}`,
						description: deleteFavouriteLocationErrorMessages[result.reason],
					});

					queryClient.invalidateQueries({ queryKey: options.queryKey }); // resync stale tab

					return;
				}

				const removedKey = coordinateKey(variables.coordinates);

				queryClient.setQueryData(options.queryKey, (prev) => {
					if (!prev?.ok) return prev;

					toastManager.add({
						type: "success",
						title: `Successfully delete ${variables.city}, ${variables.country}`,
						description: `${variables.city}, ${variables.country} has been deleted from favourites`,
					});

					return {
						...prev,
						favouriteLocations: prev.favouriteLocations.filter(
							(favLoc) => coordinateKey(favLoc.coordinates) !== removedKey,
						),
					};
				});
			},
		});

	const deleteFavouriteLocation = (location: Locations) => {
		deleteMutate(location);
	};

	return {
		addFavouriteLocation,
		isAddLocationPending,
		favouriteLocations,
		locationsStatus,
		isFavourited,
		deleteFavouriteLocation,
		isDeleteLocationPending,
	};
}
