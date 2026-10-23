import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import z from "zod";
import { ChevronLeft } from "lucide-react";

import { useMediaQuery } from "#/hook/use-media-query";

import ChangeEmailForm from "#/components/profile/change-email-form";
import ChangeEmailVerifyOtpForm from "#/components/profile/change-email-verify-otp-form";
import ResendOtp from "#/components/profile/resend-otp";
import Link from "#/components/ui/link";

const changeEmailSearchSchema = z.object({
	verifyOtp: z.boolean().optional(),
});

export const Route = createFileRoute("/_profile/settings/email")({
	head: () => ({
		meta: [{ title: "Change Email | ForeCast" }],
	}),
	validateSearch: changeEmailSearchSchema,
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const { verifyOtp } = Route.useSearch();

	const [isLoading, setIsLoading] = useState(true);

	const [newEmail, setNewEmail] = useState<string | undefined>(undefined);

	const isMobile = useMediaQuery("(width < 48rem)");

	// remove search params if newEmail is undefined (after page refresh)
	useEffect(() => {
		if (!newEmail) {
			navigate({
				search: () => {
					return {};
				},
			});
		}

		// set loading to false after hydrations
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return (
			<div
				className="grid items-center justify-items-center block-full"
				aria-hidden>
				<div className="page-loader" aria-hidden></div>
			</div>
		);
	}

	return (
		<div className="mx-auto grid gap-12 py-8 inline-full max-inline-132">
			{isMobile && (
				<Link
					to={verifyOtp ? "/settings/email" : "/settings"}
					variant="secondary"
					className="gap-2 max-inline-max">
					<ChevronLeft strokeWidth={3} className="block-[1.1em] inline-auto" />
					<span>Back</span>
				</Link>
			)}

			<h1 className="text-center">
				{verifyOtp ? "Verify Code" : "Change Email"}
			</h1>

			{/* show verify otp form or change email form based on 'verifyOtp' search params  */}
			{verifyOtp ? (
				<>
					<ResendOtp type="change-email" newEmail={newEmail} />
					<ChangeEmailVerifyOtpForm newEmail={newEmail} />
				</>
			) : (
				<ChangeEmailForm setNewEmail={setNewEmail} />
			)}
		</div>
	);
}
