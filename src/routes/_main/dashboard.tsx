import { createFileRoute, redirect } from "@tanstack/react-router";

import { getSession } from "#/utils/auth.functions";

import { useToastManager } from "#/components/ui/base-toast";

export const Route = createFileRoute("/_main/dashboard")({
	beforeLoad: async ({ location }) => {
		const session = await getSession();

		if (!session) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
	},

	component: RouteComponent,
});

function RouteComponent() {
	const toastManager = useToastManager();

	const createToast = () => {
		toastManager.add({
			title: "Test title",
			description: "test description",
			type: "error",
		});
	};

	return (
		<>
			<div>Hello "/_main/dashboard"!</div>
			<button type="button" onClick={createToast}>
				toast
			</button>
		</>
	);
}
