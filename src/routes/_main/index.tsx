import { createFileRoute } from "@tanstack/react-router";

import WeatherDashboard from "#/components/main/weather-dashboard";

export const Route = createFileRoute("/_main/")({ component: Home });

function Home() {
	return <WeatherDashboard />;
}
