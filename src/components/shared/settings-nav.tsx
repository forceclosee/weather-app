import type { LinkProps } from "@tanstack/react-router";
import {
	ChevronRight,
	KeyRound,
	Mail,
	Pencil,
	type LucideIcon,
} from "lucide-react";
import Link from "../ui/link";
import { cn } from "#/utils/class-helper";

interface Props {
	className?: string;
	isSidebar?: boolean;
}

export default function SettingsNav({ className, isSidebar }: Props) {
	type SettingLinks = {
		to: LinkProps["to"];
		label: string;
		icon: LucideIcon;
	};

	const navItems: SettingLinks[] = [
		{
			to: "/settings/profile",
			label: "Edit Profile",
			icon: Pencil,
		},
		{
			to: "/settings/email",
			label: "Change Email",
			icon: Mail,
		},
		{
			to: "/settings/password",
			label: "Change Password",
			icon: KeyRound,
		},
	];

	return (
		<nav
			className={cn(
				"grid",
				isSidebar ? "gap-1" : "squircle rounded-xl bg-bg-card",
				className,
			)}>
			{navItems.map((navItem) => (
				<Link
					key={navItem.label}
					to={navItem.to}
					variant="plain"
					className={cn(
						"gap-2 py-3",
						{ "not-last:border-be not-last:border-border": !isSidebar },
						{
							"squircle rounded-xl hover:bg-bg-card focus-visible:bg-bg-card data-[status=active]:bg-bg-card":
								isSidebar,
						},
					)}>
					<navItem.icon strokeWidth={3} className="block-[1.1em] inline-auto" />
					<span className="me-auto">{navItem.label}</span>
					{!isSidebar && (
						<ChevronRight
							strokeWidth={3}
							className="block-[1.1em] inline-auto"
						/>
					)}
				</Link>
			))}
		</nav>
	);
}
