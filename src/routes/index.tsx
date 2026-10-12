import { createFileRoute } from "@tanstack/react-router";

import Header from "#/components/layout/header";
import Footer from "#/components/layout/footer";
import WeatherDashboard from "#/components/main/weather-dashboard";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="min-block-svh grid grid-rows-[auto_1fr_auto]">
			<Header haveUnitsDropdown />
			<main className="max-inline-316 inline-full @container/main mx-auto">
				<WeatherDashboard />
			</main>
			<Footer />
		</div>
	);
}
