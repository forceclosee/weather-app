import { getSizesValue } from "#/utils/attributes-helper";
import { cn } from "#/utils/class-helper";
import type { CSSProperties } from "react";

type Props = {
	/**
	 * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element
	 *
	 * use to add or override the default styling
	 */
	className: string;
	/**
	 * whether the skeleton should have full border radius
	 */
	circle: boolean;
	/**
	 * the skeleton **min width** in pixels (will be converted to rem)
	 *
	 * only use when **width** doesn't work
	 *
	 * default to `inline-size: 100%` if omited
	 */
	minWidth: number | CSSProperties["minInlineSize"];
	/**
	 * the skeleton **max width** in pixels (will be converted to rem)
	 *
	 * default to `inline-size: 100%` if omited
	 */
	width: number;
	/**
	 * the skeleton **height** in pixels (will be converted to rem)
	 *
	 * @default 1.4rem
	 */
	height: number;
};

export function Skeleton({
	className,
	circle,
	minWidth,
	width,
	height,
}: Partial<Props>) {
	const minWidthValue = getSizesValue(minWidth);
	const maxWidthValue = getSizesValue(width);
	const heightValue = getSizesValue(height) ?? "1.4rem";

	return (
		<div
			className={cn(
				"motion-safe:wave inline-full starting:opacity-0 transition-all transition-discrete duration-75 motion-safe:bg-linear-to-r motion-safe:bg-size-[200%_100%] motion-safe:from-gray-400/60 motion-safe:via-gray-600/60 motion-safe:to-gray-400/60 motion-reduce:animate-pulse motion-reduce:bg-gray-500/80",
				circle ? "rounded-full" : "squircle rounded-lg",
				className,
			)}
			style={{
				minInlineSize: minWidthValue,
				maxInlineSize: maxWidthValue,
				blockSize: heightValue,
			}}
			aria-hidden="true"></div>
	);
}
