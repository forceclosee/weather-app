import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { getSession, ensureSession } from "#/utils/auth.functions";
import type { Units } from "#/types";
import { db } from "#/db";
import { units } from "#/db/schema/units-schema";

export const getUnits = createServerFn({ method: "GET" }).handler(async () => {
	const session = await getSession();

	if (!session) return null;

	const [row] = await db
		.select()
		.from(units)
		.where(eq(units.userId, session.user.id))
		.limit(1);

	return row ?? null;
});

export const updateUnits = createServerFn({ method: "POST" })
	.validator((data: Units) => data)
	.handler(async ({ data }) => {
		const session = await ensureSession();

		const [updated] = await db
			.insert(units)
			.values({ ...data, userId: session.user.id })
			.onConflictDoUpdate({
				target: units.userId,
				set: {
					temperature: data.temperature,
					windSpeed: data.windSpeed,
					precipitation: data.precipitation,
				},
			})
			.returning();

		return updated;
	});

// save the selected units to database after signup and login (if the user don't have saved in the database yet)
export const seedUnits = createServerFn({ method: "POST" })
	.validator((data: Units) => data)
	.handler(async ({ data }) => {
		const session = await ensureSession();

		const [seeded] = await db
			.insert(units)
			.values({ ...data, userId: session.user.id })
			.onConflictDoNothing()
			.returning();

		return seeded ?? null;
	});
