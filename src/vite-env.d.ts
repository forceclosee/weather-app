declare module "react" {
	// add custom properties to type CSSProperties
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}

declare global {
	/**
	 * utility to make attribute required
	 *
	 * @example
	 * to make "href" and "target" required
	 * ```tsx
	 * interface Props extends MakeRequired<HTMLAttributes<"a">, "href" | "target"> {custom props here};
	 * ```
	 * or
	 * ```tsx
	 * type Props = MakeRequired<HTMLAttributes<"a">, "href" | "target"> & {custom props here};
	 * ```
	 */
	type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
}

export {};
