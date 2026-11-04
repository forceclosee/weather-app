import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { user } from "#/db/schema/auth-schema";

export const units = pgTable("units", {
	userId: text("user_id")
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade" }),
	temperature: varchar("temperature", { length: 20 })
		.notNull()
		.default("celcius"),
	windSpeed: varchar("wind_speed", { length: 10 }).notNull().default("kmh"),
	precipitation: varchar("precipitation", { length: 20 })
		.notNull()
		.default("milimeters"),
});
