import { getFormattedJsDate } from "#/utils/date";
import { getRouteApi } from "@tanstack/react-router";

import { Calendar, Settings } from "lucide-react";

import { Avatar } from "#/components/ui/base-avatar";
import Link from "#/components/ui/link";

const RouteApi = getRouteApi("__root__");

export default function ProfileDetails() {
	const { user } = RouteApi.useRouteContext();

	if (!user) {
		return null;
	}

	const date = getFormattedJsDate(user.createdAt);

	return (
		<div
			suppressHydrationWarning
			className="mbs-35 squircle grid gap-x-4 gap-y-12 rounded-ss-xl rounded-se-xl bg-bg-card px-fluid-500 py-(--padding-block) md:grid-cols-[1fr_auto]"
			style={{ "--padding-block": "2rem" }}>
			<div className="grid gap-4">
				<Avatar.Root
					size={96}
					className="-mbs-[calc(var(--size)/2+var(--padding-block))] mbe-4">
					<Avatar.Image src={user.image} />
					<Avatar.Fallback>{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<h2 className="text-3xl">{user.name}</h2>
				<span>{user.email}</span>
				<div className="flex items-center gap-2">
					<Calendar className="block-[1.1em] inline-auto shrink-0" />
					<span>{`Joined ${date}`}</span>
				</div>
			</div>

			<Link to="/settings" className="gap-2">
				<Settings className="block-[1.3em] inline-auto" />
				<span>Account Settings</span>
			</Link>
		</div>
	);
}
