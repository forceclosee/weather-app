import { useEffect } from "react";

export function usePreventScroll(isOpen: boolean) {
	useEffect(() => {
		if (isOpen) {
			document.documentElement.style.setProperty("overflow", "clip");
		} else {
			document.documentElement.style.removeProperty("overflow");
		}

		return () => {
			document.documentElement.style.removeProperty("overflow");
		};
	}, [isOpen]);
}
