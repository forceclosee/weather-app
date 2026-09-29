import { createFileRoute } from "@tanstack/react-router";

import Header from "#/components/main/header";
import Footer from "#/components/main/footer";
import WeatherDashboard from "#/components/main/weather-dashboard";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="min-block-svh grid grid-rows-[auto_1fr_auto]">
			<Header />
			<main className="max-inline-304 inline-full mx-auto">
				<WeatherDashboard />
			</main>
			<Footer />
		</div>
	);
}
