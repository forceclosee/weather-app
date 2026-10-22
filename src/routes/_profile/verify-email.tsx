import { createFileRoute, redirect } from "@tanstack/react-router";

import OtpVerifyEmailForm from "#/components/profile/otp-verify-email-form";
import ResendOtp from "#/components/profile/resend-otp";

export const Route = createFileRoute("/_profile/verify-email")({
	beforeLoad: async ({ context }) => {
		if (context.user?.emailVerified) {
			throw redirect({
				to: "/dashboard",
			});
		}
	},

	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="mx-auto grid gap-12 px-fluid-500 py-8 inline-full max-inline-132">
			<h1 className="text-center">Verify Code</h1>
			<ResendOtp />
			<OtpVerifyEmailForm />
		</div>
	);
}
