import { getRouteApi } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

import { authClient } from "#/lib/auth-client";
import { Mail } from "lucide-react";

import { cn } from "#/utils/class-helper";

import { Button } from "#/components/ui/aria-button";

const RouteApi = getRouteApi("__root__");

type Props = {
	className?: string;
};

export default function VerifyBanner({ className }: Props) {
	const { user } = RouteApi.useRouteContext();

	const navigate = useNavigate();

	const handleClick = async () => {
		if (!user) return;

		await authClient.emailOtp.sendVerificationOtp({
			email: user.email,
			type: "email-verification",
		});

		navigate({ to: "/verify-email" });
	};

	return (
		<div
			className={cn(
				"squircle max-block-max flex flex-wrap items-center justify-between gap-2 rounded-xl bg-bg-info px-fluid-500 py-4 text-text-inverse",
				className,
			)}>
			<p>
				<Mail
					strokeWidth={3}
					className="block-[1.1em] inline-auto me-2 inline-block"
				/>
				<span>Please verify your email address to access all features.</span>
			</p>

			<Button onClick={handleClick}>Verify Email</Button>
		</div>
	);
}
