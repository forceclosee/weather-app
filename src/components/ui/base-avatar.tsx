import { getSizesValue } from "#/utils/attributes-helper";
import { cn } from "#/utils/class-helper";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

type ClassNameProps = {
	className?: string;
};

type RootProps = BaseAvatar.Root.Props &
	ClassNameProps & {
		size?: number;
	};

const Root = (props: RootProps) => {
	const size = getSizesValue(props.size) ?? "3rem";

	const randomHue = Math.floor(Math.random() * 360) + 1;

	return (
		<BaseAvatar.Root
			suppressHydrationWarning
			{...props}
			className={cn(
				"trim-capital inline-(--size) block-(--size) inline-flex select-none items-center justify-center overflow-clip rounded-full border border-border bg-(--profile-background)",
				props.className,
			)}
			style={{
				"--size": size,
				"--profile-background": `oklch(0.7 0.08 ${randomHue})`,
			}}
		/>
	);
};

const Image = (props: BaseAvatar.Image.Props) => {
	return (
		<BaseAvatar.Image
			width={96}
			height={96}
			{...props}
			className="inline-full block-full object-cover"
		/>
	);
};

const Fallback = (props: BaseAvatar.Fallback.Props & ClassNameProps) => {
	return (
		<BaseAvatar.Fallback
			{...props}
			className={cn(
				"trim-capital scheme-light inline-flex select-none items-center justify-center font-bold text-[calc(var(--size)*0.5)] text-text",
				props.className,
			)}
		/>
	);
};

export const Avatar = {
	Root,
	Image,
	Fallback,
};
