import { createServerFn } from "@tanstack/react-start";

import { getSession } from "#/utils/auth.functions";
import { db, sql } from "#/db";

import {
	MAX_FAVOURITES,
	type AddFavouriteResult,
	type FavouriteLocation,
	type GetFavouriteLocationsResult,
	type DeleteFavouriteLocationResult,
} from "./favourites";
import {
	locationSchema,
	type LocationInput,
} from "#/lib/schema/location-schema";
import { favouriteLocations } from "#/db/schema/favourite-locations-schema";
import { and, desc, eq } from "drizzle-orm";
import { normalizeCoordinates } from "./location";

export const addFavouriteLocation = createServerFn({ method: "POST" })
	.validator((data: LocationInput) => data)
	.handler(async ({ data }): Promise<AddFavouriteResult> => {
		const session = await getSession();

		if (!session) {
			return { ok: false, reason: "unauthenticated" };
		}

		const userId = session.user.id;

		if (!session.user.emailVerified) {
			return { ok: false, reason: "email_unverified" };
		}

		const safeInput = locationSchema.safeParse(data);

		if (!safeInput.success) {
			return { ok: false, reason: "invalid_input" };
		}

		const {
			coordinates: { latitude, longitude },
			timezone,
			city,
			province,
			country,
			countryCode,
		} = safeInput.data;

		let rows: { created_at: string }[];

		try {
			const results = await sql.transaction([
				sql`select pg_advisory_xact_lock(hashtextextended(${userId}, 0))`,
				sql`insert into favourite_locations (user_id, latitude, longitude, timezone, city, province, country, country_code) select ${userId}, ${latitude}, ${longitude}, ${timezone}, ${city}, ${province}, ${country}, ${countryCode} where (select count(*) from favourite_locations where user_id = ${userId}) < ${MAX_FAVOURITES} returning created_at`,
			]);

			rows = results[1] as { created_at: string }[];
		} catch (error) {
			if (isUniqueViolation(error))
				return { ok: false, reason: "already_favourited" };
			throw error;
		}

		if (rows.length === 0) {
			const existing = await db
				.select({ userId: favouriteLocations.userId })
				.from(favouriteLocations)
				.where(
					and(
						eq(favouriteLocations.userId, userId),
						eq(favouriteLocations.latitude, latitude),
						eq(favouriteLocations.longitude, longitude),
					),
				)
				.limit(1);

			return {
				ok: false,
				reason: existing.length > 0 ? "already_favourited" : "limit_reached",
			};
		}

		return {
			ok: true,
			favourite: {
				...safeInput.data,
				coordinates: normalizeCoordinates(safeInput.data.coordinates),
				createdAt: new Date(rows[0].created_at),
			},
		};
	});

function isUniqueViolation(error: unknown): error is { code: string } {
	return (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		error.code === "23505"
	);
}

export const getFavouriteLocations = createServerFn().handler(
	async (): Promise<GetFavouriteLocationsResult> => {
		const session = await getSession();

		if (!session) {
			return { ok: false, reason: "unauthenticated" };
		}

		if (!session.user.emailVerified) {
			return { ok: false, reason: "email_unverified" };
		}

		const userId = session.user.id;

		const rows = await db
			.select({
				createdAt: favouriteLocations.createdAt,
				latitude: favouriteLocations.latitude,
				longitude: favouriteLocations.longitude,
				timezone: favouriteLocations.timezone,
				city: favouriteLocations.city,
				province: favouriteLocations.province,
				country: favouriteLocations.country,
				countryCode: favouriteLocations.countryCode,
			})
			.from(favouriteLocations)
			.where(eq(favouriteLocations.userId, userId))
			.orderBy(desc(favouriteLocations.createdAt));

		const locations: FavouriteLocation[] = rows.map((row) => {
			const location = {
				createdAt: row.createdAt,
				coordinates: {
					latitude: row.latitude,
					longitude: row.longitude,
				},
				timezone: row.timezone,
				city: row.city,
				province: row.province,
				country: row.country,
				countryCode: row.countryCode.toLowerCase(),
			};

			return location;
		});

		return { ok: true, favouriteLocations: locations };
	},
);

export const deleteFavouriteLocation = createServerFn({ method: "POST" })
	.validator((data: Pick<LocationInput, "coordinates">) => data)
	.handler(async ({ data }): Promise<DeleteFavouriteLocationResult> => {
		const session = await getSession();

		if (!session) {
			return { ok: false, reason: "unauthenticated" };
		}

		if (!session.user.emailVerified) {
			return { ok: false, reason: "email_unverified" };
		}

		const userId = session.user.id;

		const safeInput = locationSchema
			.pick({ coordinates: true })
			.safeParse(data);

		if (!safeInput.success) {
			return { ok: false, reason: "invalid_input" };
		}

		const { latitude, longitude } = normalizeCoordinates(
			safeInput.data.coordinates,
		);

		await db
			.delete(favouriteLocations)
			.where(
				and(
					eq(favouriteLocations.userId, userId),
					eq(favouriteLocations.latitude, latitude),
					eq(favouriteLocations.longitude, longitude),
				),
			);

		return { ok: true };
	});
