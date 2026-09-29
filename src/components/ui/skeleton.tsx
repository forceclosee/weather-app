import { cn } from "#/utils/class-helper";

type Props = {
	className: string;
	circle: boolean;
	width: number;
	height: number;
};

export function Skeleton({ className, circle, width, height }: Partial<Props>) {
	return (
		<div
			className={cn(
				"motion-safe:wave starting:opacity-0 transition-all transition-discrete duration-75 motion-safe:bg-linear-to-r motion-safe:bg-size-[200%_100%] motion-safe:from-gray-400/60 motion-safe:via-gray-600/60 motion-safe:to-gray-400/60 motion-reduce:animate-pulse motion-reduce:bg-gray-500/80",
				circle ? "rounded-full" : "squircle rounded-lg",
				className,
			)}
			style={{
				inlineSize: width ? `${width / 16}rem` : "100%",
				blockSize: height ? `${height / 16}rem` : "1.4rem",
			}}
			aria-hidden="true"></div>
	);
}
