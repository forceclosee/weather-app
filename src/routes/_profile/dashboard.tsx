import { createFileRoute, getRouteApi } from "@tanstack/react-router";

import ProfileDetails from "#/components/profile/profile-details";
import VerifyBanner from "#/components/profile/verify-banner";

export const Route = createFileRoute("/_profile/dashboard")({
	head: () => ({
		meta: [{ title: "Dashboard | ForeCast" }],
	}),
	component: RouteComponent,
});

const RouteApi = getRouteApi("__root__");

function RouteComponent() {
	const { user } = RouteApi.useRouteContext();

	return (
		<div className="mx-auto grid gap-8 px-fluid-500 py-8 inline-full max-inline-316">
			<h1 className="sr-only">Profile Dashboard</h1>

			{!user?.emailVerified && <VerifyBanner />}

			<div className="isolate grid overflow-clip rounded-xl squircle *:col-start-1 *:col-end-2 *:row-start-1 *:row-end-2">
				<div className="z-[-1] bg-bg-primary" aria-hidden></div>
				<ProfileDetails />
			</div>
		</div>
	);
}
