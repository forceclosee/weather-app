import Header from "#/components/layout/header";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_profile")({
	beforeLoad: async ({ context, location }) => {
		if (!context.user) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
	},

	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div
			suppressHydrationWarning
			className="min-block-svh grid grid-rows-[auto_1fr_auto]">
			<Header haveProfileDropdown />

			<main>
				<Outlet />
			</main>
		</div>
	);
}
