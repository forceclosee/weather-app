import icon from "#/icons/forecast-icon.png";
import UnitsDropdown from "#/components/shared/units-dropdown";
import ThemeDropdown from "#/components/shared/theme-dropdown";

export default function Header() {
	return (
		<header>
			<div className="max-inline-304 inline-full mx-auto flex items-center justify-between gap-4 p-fluid-500 *:shrink-0">
				<div className="text-(length:--spacing-fluid-400) flex items-center gap-2 *:shrink-0">
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
				</div>

				<div className="flex gap-4 *:shrink-0">
					<ThemeDropdown />
					<UnitsDropdown />
				</div>
			</div>
		</header>
	);
}
