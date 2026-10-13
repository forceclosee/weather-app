import {
	createFileRoute,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";

import Footer from "#/components/layout/footer";
import Header from "#/components/layout/header";

export const Route = createFileRoute("/_main")({
	component: RouteComponent,
});

function RouteComponent() {
	const currentPath = useRouterState({
		select: (state) => state.location.pathname,
	});

	return (
		<div className="min-block-svh grid grid-rows-[auto_1fr_auto]">
			<Header haveUnitsDropdown={currentPath === "/"} />

			<main className="max-inline-316 inline-full @container/main mx-auto">
				<Outlet />
			</main>

			{currentPath === "/" && <Footer />}
		</div>
	);
}
