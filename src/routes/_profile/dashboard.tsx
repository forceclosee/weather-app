import { createFileRoute } from "@tanstack/react-router";

import ProfileDetails from "#/components/profile/profile-details";

export const Route = createFileRoute("/_profile/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="squircle isolate mx-fluid-500 my-8 grid overflow-clip rounded-xl *:col-start-1 *:col-end-2 *:row-start-1 *:row-end-2">
			<h1 className="sr-only">Profile Dashboard</h1>
			<div className="z-[-1] bg-bg-primary" aria-hidden></div>
			<ProfileDetails />
		</div>
	);
}
