import {
	QueryErrorResetBoundary,
	type QueryErrorResetFunction,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { RefreshCw } from "lucide-react";

import { Button } from "#/components/ui/aria-button";
import CurrentWeather from "#/components/main/current-weather";
import AdditionalInfo from "#/components/main/additional-info";
import DailyForecast from "#/components/main/daily-forecast";
import HourlyForecast from "#/components/main/hourly-forecast";
import Search from "./search";

export default function WeatherDashboard() {
	return (
		<QueryErrorResetBoundary>
			{({ reset }: { reset: QueryErrorResetFunction }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={({ resetErrorBoundary }) => (
						<div className="min-block-full flex flex-col items-center justify-center gap-8 px-fluid-500 py-8 text-center">
							<h1>Something went wrong</h1>
							<p className="mbs-8">
								We couldn't connect to the server (API Error). Please try again
								in a few moments.
							</p>
							<Button
								variant="secondary"
								className="mbs-4 flex gap-2 *:shrink-0"
								onClick={() => resetErrorBoundary()}>
								<RefreshCw className="block-[1.1em] inline-auto" />
								<span>Retry</span>
							</Button>
						</div>
					)}>
					<div className="@container/weather-dashboard grid gap-x-8 gap-y-fluid-925 px-fluid-500 py-12 lg:grid-cols-[1fr_24rem]">
						<h1 className="order-1 text-center font-bricolage-grotesque lg:col-span-2">
							How's the sky looking today?
						</h1>

						<Search className="order-2 lg:col-span-2" />

						<div className="@container/current-weather order-3 grid gap-fluid-550">
							<CurrentWeather />
							<AdditionalInfo />
						</div>

						<DailyForecast className="order-4 lg:order-5" />

						<HourlyForecast className="order-5 lg:order-4 lg:row-span-2" />
					</div>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}
