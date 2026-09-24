import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import TanStackQueryDevtools from "#/integrations/tanstack-query/devtools";

import type { QueryClient } from "@tanstack/react-query";

import favicon from "/favicon.ico";
import globalCss from "#/styles/global.css?url";

// dm sans 100-1000
import "@fontsource-variable/dm-sans";

// bricolage grotesque 200-800
import "@fontsource-variable/bricolage-grotesque";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0",
			},
			{
				title: "ForeCast | Your Trusted Weather Forecast",
			},
			{
				name: "author",
				content: "Force Close",
			},
			{
				name: "description",
				content: "",
			},

			// OG Tags
			{
				property: "og:title",
				content: "ForeCast | Reliable Weather Forecast",
			},
			{
				property: "og:description",
				content: "",
			},
			{
				property: "og:image",
				content: "",
			},
			{
				property: "og:url",
				content: "",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: "Force Close Portfolio",
			},
		],
		links: [
			// favicon
			{
				rel: "icon",
				href: favicon,
				type: "image/x-icon",
			},

			// css
			{
				rel: "stylesheet",
				href: globalCss,
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="bg-bg-page" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="text-text" suppressHydrationWarning>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
