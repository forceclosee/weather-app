import { createFileRoute } from "@tanstack/react-router";

import SignupForm from "#/components/auth/signup-form";
import AuthCard from "#/components/shared/auth-card";

export const Route = createFileRoute("/_auth/signup")({
	head: () => ({
		meta: [{ title: "Signup | ForeCast" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AuthCard type="sign-up" title="Sign up">
			<SignupForm />
		</AuthCard>
	);
}
