import { defineRelations } from "drizzle-orm";

import * as authSchema from "#/db/schema/auth-schema";
import * as unitsSchema from "#/db/schema/units-schema";

const schema = { ...authSchema, ...unitsSchema };

export const relations = defineRelations(schema, (r) => ({
	user: {
		sessions: r.many.session({
			from: r.user.id,
			to: r.session.userId,
		}),
		accounts: r.many.account({
			from: r.user.id,
			to: r.account.userId,
		}),
		units: r.one.units({
			from: r.user.id,
			to: r.units.userId,
		}),
	},

	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id,
		}),
	},

	account: {
		user: r.one.user({
			from: r.account.userId,
			to: r.user.id,
		}),
	},

	units: {
		user: r.one.user({
			from: r.units.userId,
			to: r.user.id,
		}),
	},
}));
