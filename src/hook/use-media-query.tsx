import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
	const getMatches = (query: string): boolean => {
		if (typeof window === "undefined") {
			return false;
		}
		return window.matchMedia(query).matches;
	};

	const [isMatches, setIsMatches] = useState(() => getMatches(query));

	const handleChange = () => {
		setIsMatches(getMatches(query));
	};

	useEffect(() => {
		const media = window.matchMedia(query);

		// Triggered at the first client-side load and if query changes
		handleChange();

		media.addEventListener("change", handleChange);

		return () => media.removeEventListener("change", handleChange);
	}, [query]);

	return isMatches;
}
