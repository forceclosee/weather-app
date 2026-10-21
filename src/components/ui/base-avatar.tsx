import { getSizesValue } from "#/utils/attributes-helper";
import { cn } from "#/utils/class-helper";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

interface ClassNameProps {
	className?: string;
}

interface RootProps
	extends Omit<BaseAvatar.Root.Props, "className">,
		ClassNameProps {
	size?: number;
}

const Root = (props: RootProps) => {
	const size = getSizesValue(props.size) ?? "3rem";

	const randomHue = Math.floor(Math.random() * 360) + 1;

	return (
		<BaseAvatar.Root
			suppressHydrationWarning
			{...props}
			className={cn(
				"trim-capital inline-(--avatar-size) block-(--avatar-size) inline-flex select-none items-center justify-center overflow-clip rounded-full border border-border bg-(--profile-background)",
				props.className,
			)}
			style={{
				"--avatar-size": size,
				"--profile-background": `oklch(0.7 0.08 ${randomHue})`,
			}}
		/>
	);
};

interface ImageProps extends Omit<BaseAvatar.Image.Props, "src"> {
	src: string | null | undefined;
}

const Image = (props: ImageProps) => {
	const src = props.src || undefined;

	return (
		<BaseAvatar.Image
			width={96}
			height={96}
			{...props}
			src={src}
			className="inline-full block-full object-cover"
		/>
	);
};

const Fallback = (props: BaseAvatar.Fallback.Props & ClassNameProps) => {
	return (
		<BaseAvatar.Fallback
			{...props}
			className={cn(
				"trim-capital scheme-light inline-flex select-none items-center justify-center font-bold text-[calc(var(--avatar-size)*0.5)] text-text",
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
