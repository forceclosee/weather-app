import {
	QueryErrorResetBoundary,
	type QueryErrorResetFunction,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { RefreshCw } from "lucide-react";

import { Button } from "#/components/ui/aria-button";
import CurrentWeather from "#/components/main/current-weather";
import AdditionalInfo from "#/components/main/additional-info";

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
					<div className="@container/weather-dashboard grid gap-8 px-fluid-500 py-12">
						<h1 className="text-center font-bricolage-grotesque">
							How's the sky looking today?
						</h1>

						<div className="@container/current-weather grid gap-fluid-450">
							<CurrentWeather />
							<AdditionalInfo />
						</div>
					</div>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}
