import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { getContext } from "#/integrations/tanstack-query/root-provider";

import { Button } from "#/components/ui/aria-button";
import Link from "#/components/ui/link";

export function getRouter() {
	const context = getContext();

	const router = createTanStackRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultNotFoundComponent: () => {
			return (
				<div className="flex flex-col items-center justify-center gap-6 p-8 text-center min-block-svh">
					<span className="text-4xl font-medium">404</span>
					<h1 className="mbs-8 font-medium">Page Not Found</h1>
					<p className="mbs-12">
						The page you are looking for doesn't exist. Click button bellow to
						go to the homepage
					</p>
					<Link to="/">Back To Homepage</Link>
				</div>
			);
		},
		defaultErrorComponent: ({ reset }) => {
			return (
				<div className="flex flex-col items-center justify-center gap-6 p-8 text-center min-block-svh">
					<p className="text-text-error">Something went wrong</p>
					<Button
						onClick={() => {
							reset();
						}}>
						Try again
					</Button>
				</div>
			);
		},
	});

	setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
