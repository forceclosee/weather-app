import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ChevronLeft } from "lucide-react";

import { useMediaQuery } from "#/hook/use-media-query";

import ChangeEmailForm from "#/components/profile/change-email-form";
import ChangeEmailVerifyOtpForm from "#/components/profile/change-email-verify-otp-form";
import ResendOtp from "#/components/profile/resend-otp";
import Link from "#/components/ui/link";

export const Route = createFileRoute("/_profile/settings/email")({
	head: () => ({
		meta: [{ title: "Change Email | ForeCast" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const [inputMode, setInputMode] = useState<"email" | "otp">("email");

	const [newEmail, setNewEmail] = useState<string | undefined>(undefined);

	const isMobile = useMediaQuery("(width < 48rem)");

	return (
		<div className="mx-auto grid gap-12 py-8 inline-full max-inline-132">
			{isMobile && (
				<Link
					to={inputMode === "otp" ? "/settings/email" : "/settings"}
					variant="secondary"
					className="gap-2 max-inline-max">
					<ChevronLeft strokeWidth={3} className="block-[1.1em] inline-auto" />
					<span>Back</span>
				</Link>
			)}

			<h1 className="text-center">
				{inputMode === "otp" ? "Verify Code" : "Change Email"}
			</h1>

			{/* show verify otp form or change email form based on inputMode  */}
			{inputMode === "otp" ? (
				<>
					<ResendOtp type="change-email" newEmail={newEmail} />
					<ChangeEmailVerifyOtpForm newEmail={newEmail} />
				</>
			) : (
				<ChangeEmailForm
					setInputMode={setInputMode}
					setNewEmail={setNewEmail}
				/>
			)}
		</div>
	);
}
