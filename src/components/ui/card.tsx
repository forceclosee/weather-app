import { classList } from "#/utils/class-helper";
import type { ReactNode, ReactSVGElement } from "react";

type Props = {
	layout: "additional-info" | "daily-forecast" | "hourly-forecast";
	title: string;
	titleIcon: Omit<ReactSVGElement, "ref">;
	popover?: ReactNode;
	content: ReactNode;
	icon?: Omit<ReactSVGElement, "ref">;
};

export function Card({
	layout,
	title,
	titleIcon,
	popover,
	content,
	icon,
}: Props) {
	return (
		<div
			className={classList(
				"squircle @container grid rounded-2xl bg-bg-card p-5",
				{
					"min-block-[7.4rem] content-between gap-2":
						layout === "additional-info",
				},
			)}>
			{layout === "additional-info" && (
				<>
					<div
						className={classList("flex items-center gap-2", {
							"*:nth-[2]:me-auto": popover,
						})}>
						{titleIcon}
						<header className="text-lg text-text-muted">{title}</header>
						{popover && popover}
					</div>
					{icon && (
						<div className="flex items-center gap-4 text-3xl">
							{typeof content === "string" && <span>{content}</span>}
							{typeof content !== "string" && <div>{content}</div>}
							{icon}
						</div>
					)}

					{!icon && (
						<>
							{typeof content === "string" && (
								<span className="text-3xl">{content}</span>
							)}
							{typeof content !== "string" && (
								<div className="text-3xl">{content}</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
}
