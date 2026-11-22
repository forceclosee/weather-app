import {
	pgTable,
	text,
	numeric,
	timestamp,
	primaryKey,
} from "drizzle-orm/pg-core";

import { user } from "#/db/schema/auth-schema";

export const favouriteLocations = pgTable(
	"favourite_locations",
	{
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		latitude: numeric("latitude", {
			precision: 9,
			scale: 6,
			mode: "number",
		}).notNull(),
		longitude: numeric("longitude", {
			precision: 9,
			scale: 6,
			mode: "number",
		}).notNull(),
		timezone: text("timezone").notNull(),
		city: text("city").notNull(),
		province: text("province").notNull(),
		country: text("country").notNull(),
		countryCode: text("country_code").notNull(),
	},
	(t) => [primaryKey({ columns: [t.userId, t.latitude, t.longitude] })],
);
