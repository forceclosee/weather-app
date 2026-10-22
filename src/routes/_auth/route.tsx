import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Header from "#/components/layout/header";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ context }) => {
		if (context.user) {
			throw redirect({ to: "/" });
		}
	},

	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid grid-rows-[auto_1fr] min-block-svh">
			<Header />
			<main className="mx-auto px-fluid-500 py-8 inline-full max-inline-132">
				<Outlet />
			</main>
		</div>
	);
}
