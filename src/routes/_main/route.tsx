import { createFileRoute, Outlet } from "@tanstack/react-router";

import Footer from "#/components/layout/footer";
import Header from "#/components/layout/header";

export const Route = createFileRoute("/_main")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div
			suppressHydrationWarning
			className="min-block-svh grid grid-rows-[auto_1fr_auto]">
			<Header haveUnitsDropdown haveProfileDropdown />

			<main className="max-inline-316 inline-full @container/main mx-auto">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
