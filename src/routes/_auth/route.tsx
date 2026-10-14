import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getSession } from "#/utils/auth.functions";

import Header from "#/components/layout/header";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async () => {
		const session = await getSession();

		if (session) {
			throw redirect({ to: "/" });
		}
	},

	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-block-svh grid grid-rows-[auto_1fr]">
			<Header />
			<main className="max-inline-132 inline-full mx-auto px-fluid-500 py-8">
				<Outlet />
			</main>
		</div>
	);
}
