import { neon } from "@neondatabase/serverless";
import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = createServerOnlyFn(() => {
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error("database url not found");
	}
	return url;
});

console.log(databaseUrl);

const sql = neon(databaseUrl());

export const db = drizzle({ client: sql });
