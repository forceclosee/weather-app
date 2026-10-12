import { createFileRoute, Link } from "@tanstack/react-router";

import LoginForm from "#/components/auth/login-form";

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid gap-8">
			<h1 className="text-center">Login</h1>
			<LoginForm />
			<p>
				Don't have an account?{" "}
				<Link to="/signup" className="hover-underline text-text-primary">
					Sign up
				</Link>
			</p>
		</div>
	);
}
