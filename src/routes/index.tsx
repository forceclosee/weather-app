import { createFileRoute } from "@tanstack/react-router";

import Header from "#/components/main/header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="min-block-svh grid grid-rows-[auto_1fr_auto]">
			<Header />
			<p>homepage</p>
			<footer>footer</footer>
		</div>
	);
}
