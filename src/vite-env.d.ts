declare module "react" {
	// add custom properties to type CSSProperties
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}

declare global {
	interface HTMLGeolocationElement extends HTMLElement {
		readonly position: GeolocationPosition | null;
		readonly error: GeolocationPositionError | null;
		readonly isValid: boolean;
		watch: boolean;
		autolocate: boolean;
		accuracymode: "precise" | "coarse";
	}

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
