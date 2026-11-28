import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

import LoginForm from "#/components/auth/login-form";
import AuthCard from "#/components/shared/auth-card";

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
		<AuthCard type="login" title="Login">
			<LoginForm />
		</AuthCard>
	);
}
