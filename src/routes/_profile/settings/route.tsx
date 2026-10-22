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
				className="grid items-center justify-items-center block-full"
				aria-hidden>
				<div className="page-loader" aria-hidden></div>
			</div>
		);
	}

	return (
		<div className={cn("block-full", { "border-bs border-border": isDesktop })}>
			<div
				className={cn("mx-auto grid px-fluid-500 inline-full max-inline-316", {
					"grid-cols-[15rem_1fr] items-start gap-4 block-full": isDesktop,
				})}>
				{isDesktop && <SettingsDesktopSidebar />}

				<Outlet />
			</div>
		</div>
	);
}
