import { createFileRoute, Link } from "@tanstack/react-router";
import z from "zod";

import LoginForm from "#/components/auth/login-form";

const loginSearchSchema = z.object({
	redirect: z.string().optional().catch("/"),
});

export const Route = createFileRoute("/_auth/login")({
	head: () => ({
		meta: [{ title: "Login | ForeCast" }],
	}),
	validateSearch: loginSearchSchema,
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid gap-8">
			<h1 className="text-center">Login</h1>
			<LoginForm />
			<p>
				Don't have an account?{" "}
				<Link to="/signup" className="text-text-primary hover-underline">
					Sign up
				</Link>
			</p>
		</div>
	);
}
