import { Link } from "@tanstack/react-router";

import UnitsDropdown from "#/components/shared/units-dropdown";
import ThemeDropdown from "#/components/shared/theme-dropdown";
import ProfileDropdown from "#/components/shared/profile-dropdown";

import icon from "#/icons/forecast-icon.png";

interface Props {
	haveUnitsDropdown?: boolean;
	haveProfileDropdown?: boolean;
}

export default function Header({
	haveUnitsDropdown,
	haveProfileDropdown,
}: Props) {
	return (
		<header>
			<div className="mx-auto flex items-center justify-between gap-4 p-fluid-500 inline-full max-inline-316 *:shrink-0">
				<Link
					to="/"
					className="flex items-center gap-2 text-(length:--spacing-fluid-400) *:shrink-0">
					<img
						src={icon}
						alt="ForeCast"
						width={70}
						height={70}
						className="block-[2em] inline-[2em]"
					/>
					<span className="hidden font-bricolage-grotesque font-medium min-[37rem]:inline">
						ForeCast
					</span>
				</Link>

				<div className="flex items-center gap-4 *:shrink-0">
					{haveUnitsDropdown && <UnitsDropdown />}
					<ThemeDropdown />

					{haveProfileDropdown && <ProfileDropdown />}
				</div>
			</div>
		</header>
	);
}
