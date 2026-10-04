import { classList, cn } from "#/utils/class-helper";
import type { ReactNode, ReactSVGElement } from "react";

type Props = {
	className?: string;
	layout: "additional-info" | "daily-forecast" | "hourly-forecast";
	title: ReactNode;
	titleIcon?: Omit<ReactSVGElement, "ref">;
	popover?: ReactNode;
	content: ReactNode;
	icon?: ReactNode;
};

export function Card({
	className,
	layout,
	title,
	titleIcon,
	popover,
	content,
	icon,
}: Props) {
	return (
		<div
			className={cn(
				"squircle @container grid overflow-clip border border-border-muted",
				{
					"min-block-29.5 content-between gap-2 rounded-2xl bg-bg-card p-5":
						layout === "additional-info",
				},
				{
					"min-block-41.25 content-between justify-items-center gap-2 rounded-2xl bg-bg-card px-2.5 py-3.25":
						layout === "daily-forecast",
				},
				{
					"min-block-15 grid-cols-[3.5rem_1fr_3rem] items-center gap-2 rounded-lg bg-bg-selected px-4 py-1":
						layout === "hourly-forecast",
				},
				className,
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

			{layout === "daily-forecast" && (
				<>
					<header className="text-lg">{title}</header>
					{icon}
					<div className="flex justify-between gap-4 justify-self-stretch">
						{content}
					</div>
				</>
			)}

			{layout === "hourly-forecast" && (
				<>
					<span className="text-lg">{title}</span>
					{icon}
					<span className="justify-self-end">{content}</span>
				</>
			)}
		</div>
	);
}
