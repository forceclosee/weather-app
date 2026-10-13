import { useToastManager } from "#/components/ui/base-toast";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/dashboard")({
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
