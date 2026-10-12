import { Link } from "@tanstack/react-router";

import UnitsDropdown from "#/components/shared/units-dropdown";
import ThemeDropdown from "#/components/shared/theme-dropdown";

import icon from "#/icons/forecast-icon.png";

type Props = {
	haveUnitsDropdown?: boolean;
};

export default function Header({ haveUnitsDropdown }: Props) {
	return (
		<header>
			<div className="max-inline-316 inline-full mx-auto flex items-center justify-between gap-4 p-fluid-500 *:shrink-0">
				<Link
					to="/"
					className="text-(length:--spacing-fluid-400) flex items-center gap-2 *:shrink-0">
					<img
						src={icon}
						alt="ForeCast"
						width={70}
						height={70}
						className="inline-[2em] block-[2em]"
					/>
					<span className="hidden font-bricolage-grotesque font-medium min-[29rem]:inline">
						ForeCast
					</span>
				</Link>

				<div className="flex gap-4 *:shrink-0">
					{haveUnitsDropdown && <UnitsDropdown />}
					<ThemeDropdown />
				</div>
			</div>
		</header>
	);
}
