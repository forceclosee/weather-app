import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useMediaQuery } from "#/hook/use-media-query";
import { cn } from "#/utils/class-helper";

import SettingsDesktopSidebar from "#/components/layout/settings-desktop-sidebar";

export const Route = createFileRoute("/_profile/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	const [isLoading, setIsLoading] = useState(true);

	// set loading to false after hydrations
	useEffect(() => {
		setIsLoading(false);
	}, []);

	const isDesktop = useMediaQuery("(width >= 48rem)");

	if (isLoading) {
		return (
			<div
				className="block-full grid items-center justify-items-center"
				aria-hidden>
				<div className="page-loader" aria-hidden></div>
			</div>
		);
	}

	return (
		<div className={cn("block-full", { "border-border border-bs": isDesktop })}>
			<div
				className={cn("max-inline-316 inline-full mx-auto grid px-fluid-500", {
					"block-full grid-cols-[15rem_1fr] items-start gap-4": isDesktop,
				})}>
				{isDesktop && <SettingsDesktopSidebar />}

				<Outlet />
			</div>
		</div>
	);
}
