import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useMediaQuery } from "#/hook/use-media-query";

import SettingsNav from "#/components/shared/settings-nav";

export const Route = createFileRoute("/_profile/settings/")({
	head: () => ({
		meta: [{ title: "Settings | ForeCast" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const isDesktop = useMediaQuery("(width >= 48rem)");

	useEffect(() => {
		if (isDesktop) {
			navigate({ to: "/settings/profile", replace: true });
		}
	}, [isDesktop, navigate]);

	if (isDesktop) return null;

	return (
		<div className="grid gap-12 py-8">
			<h1 className="sr-only">Settings</h1>

			<SettingsNav />
		</div>
	);
}
