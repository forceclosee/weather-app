import Header from "#/components/layout/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_profile")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div
			suppressHydrationWarning
			className="grid grid-rows-[auto_1fr_auto] min-block-svh">
			<Header haveProfileDropdown />

			<main>
				<Outlet />
			</main>
		</div>
	);
}
