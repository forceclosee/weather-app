import { createFileRoute } from "@tanstack/react-router";

import { ChevronLeft } from "lucide-react";

import { useMediaQuery } from "#/hook/use-media-query";

import EditProfileForm from "#/components/profile/edit-profile-form";
import Link from "#/components/ui/link";

export const Route = createFileRoute("/_profile/settings/profile")({
	head: () => ({
		meta: [{ title: "Edit Profile | ForeCast" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const isMobile = useMediaQuery("(width < 48rem)");

	return (
		<div className="max-inline-132 inline-full mx-auto grid gap-12 py-8">
			{isMobile && (
				<Link
					to="/settings"
					variant="secondary"
					className="max-inline-max gap-2">
					<ChevronLeft strokeWidth={3} className="block-[1.1em] inline-auto" />
					<span>Back</span>
				</Link>
			)}

			<h1 className="text-center">Edit Profile</h1>

			<EditProfileForm />
		</div>
	);
}
