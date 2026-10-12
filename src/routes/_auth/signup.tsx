import { createFileRoute, Link } from "@tanstack/react-router";

import SignupForm from "#/components/auth/signup-form";

export const Route = createFileRoute("/_auth/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid gap-8">
			<h1 className="text-center">Sign up</h1>
			<SignupForm />
			<p>
				Already have an account?{" "}
				<Link to="/login" className="hover-underline text-text-primary">
					Login
				</Link>
			</p>
		</div>
	);
}
