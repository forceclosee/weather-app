import type { CSSProperties } from "react";

type Value =
	| CSSProperties["minInlineSize"]
	| CSSProperties["maxInlineSize"]
	| CSSProperties["blockSize"]
	| number
	| undefined;

export const getSizesValue = (value: Value): string | undefined => {
	switch (typeof value) {
		case "undefined":
			return undefined;
		case "string":
			return value;
		case "number":
			return `${value / 16}rem`;
	}
};

export const toKebabCase = (value: string) => {
	return value
		.replace(/((?<=[a-z\d])[A-Z]|(?<=[A-Z\d])[A-Z](?=[a-z]))/g, "-$1")
		.toLowerCase();
};
