import { useEffect, type RefObject } from "react";

type Params = {
	ref: RefObject<HTMLElement | null>;
	isOpen: boolean;
	onClose: () => void;
};

export function useOutsideClick({ ref, isOpen, onClose }: Params) {
	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (e: MouseEvent) => {
			if (!ref.current?.contains(e.target as Node)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [ref, isOpen, onClose]);
}
