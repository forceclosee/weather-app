import ThemeDropdown from "#/components/shared/theme-dropdown";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-block-svh grid grid-rows-[auto_1fr]">
			<header className="max-inline-316 inline-full mx-auto justify-items-end p-fluid-500">
				<ThemeDropdown />
			</header>
			<main className="max-inline-132 inline-full mx-auto px-fluid-500 py-8">
				<Outlet />
			</main>
		</div>
	);
}
