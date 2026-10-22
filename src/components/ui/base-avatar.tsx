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
				"inline-flex items-center justify-center overflow-clip rounded-full border border-border bg-(--profile-background) select-none block-(--avatar-size) inline-(--avatar-size) trim-capital",
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
			className="object-cover block-full inline-full"
		/>
	);
};

interface FallbackProps
	extends Omit<BaseAvatar.Fallback.Props, "className">,
		ClassNameProps {}

const Fallback = (props: FallbackProps) => {
	return (
		<BaseAvatar.Fallback
			{...props}
			className={cn(
				"inline-flex items-center justify-center text-[calc(var(--avatar-size)*0.5)] font-bold text-text scheme-light select-none trim-capital",
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
