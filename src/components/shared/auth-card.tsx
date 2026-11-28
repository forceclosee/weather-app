import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
	type: "sign-up" | "login";
	title: string;
}

export default function AuthCard({ children, type, title }: Props) {
	return (
		<div className="grid gap-8">
			<h1 className="text-center">{title}</h1>
			{children}

			{type === "sign-up" && (
				<p>
					Already have an account?{" "}
					<Link to="/login" className="text-text-primary hover-underline">
						Login
					</Link>
				</p>
			)}

			{type === "login" && (
				<p>
					Don't have an account?{" "}
					<Link to="/signup" className="text-text-primary hover-underline">
						Sign up
					</Link>
				</p>
			)}
		</div>
	);
}
