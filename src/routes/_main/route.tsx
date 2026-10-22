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
			className="grid grid-rows-[auto_1fr_auto] min-block-svh">
			<Header haveUnitsDropdown haveProfileDropdown />

			<main className="@container/main mx-auto inline-full max-inline-316">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
