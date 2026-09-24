import icon from "#/icons/forecast-icon.png";
import UnitsDropdown from "#/components/shared/units-dropdown";
import ThemeDropdown from "#/components/shared/theme-dropdown";

export default function Header() {
	return (
		<header className="flex items-center justify-between gap-4 p-fluid-500">
			<div className="text-(length:--spacing-fluid-400) flex items-center gap-2">
				<img
					src={icon}
					alt="ForeCast"
					width={70}
					height={70}
					className="inline-[2em] block-[2em] shrink-0"
				/>
				<span className="hidden font-bricolage-grotesque font-medium min-[25rem]:inline">
					ForeCast
				</span>
			</div>

			<div className="flex gap-4">
				<ThemeDropdown className="shrink-0" />
				<UnitsDropdown className="shrink-0" />
			</div>
		</header>
	);
}
