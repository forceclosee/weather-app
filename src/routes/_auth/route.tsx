import { createFileRoute, Outlet } from "@tanstack/react-router";

import Header from "#/components/layout/header";

export const Route = createFileRoute("/_auth")({
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
