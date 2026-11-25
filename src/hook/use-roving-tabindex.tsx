import type { Dispatch, KeyboardEvent, RefObject, SetStateAction } from "react";

interface UseRovingTabindexParams {
	itemRefs: RefObject<(HTMLButtonElement | null)[]>;
	setActiveIndex: Dispatch<SetStateAction<number>>;
	itemCount: number;
}

export function useRovingTabindex({
	itemRefs,
	setActiveIndex,
	itemCount,
}: UseRovingTabindexParams) {
	const focusItem = (index: number) => {
		if (itemCount === 0) return;

		const next = (index + itemCount) % itemCount;

		setActiveIndex(next);
		itemRefs.current[next]?.focus();
	};

	const handleItemKeyDown = (
		e: KeyboardEvent<HTMLButtonElement>,
		index: number,
	) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				focusItem(index + 1);
				break;

			case "ArrowUp":
				e.preventDefault();
				focusItem(index - 1);
				break;

			case "Home":
				e.preventDefault();
				focusItem(0);
				break;

			case "End":
				e.preventDefault();
				focusItem(itemCount - 1);
				break;

			default:
				break;
		}
	};

	return { handleItemKeyDown };
}
