import {
	useCallback,
	useEffect,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";

const IS_SERVER = typeof window === "undefined";

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>, () => void] {
	// get value from local storage if any, fallback to initial value
	const readValue: () => T = useCallback(() => {
		if (IS_SERVER) return initialValue;

		try {
			const item = window.localStorage.getItem(key);

			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	}, [key, initialValue]);

	const [storedValue, setStoredValue] = useState(() => readValue());

	// set local storage item
	const setValue: Dispatch<SetStateAction<T>> = useCallback(
		(value) => {
			if (IS_SERVER) {
				console.warn(`Tried setting localStorage key “${key}” in server`);
			}

			try {
				// allow value to be a function so we have the same API as useState
				const newValue = value instanceof Function ? value(readValue()) : value;

				// save to local storage
				window.localStorage.setItem(key, JSON.stringify(newValue));

				// save state
				setStoredValue(newValue);

				// dispatch a custom event so every similar useLocalStorage hook is notified
				window.dispatchEvent(new StorageEvent("local-storage", { key }));
			} catch (error) {
				console.warn(`Error setting localStorage key “${key}”:`, error);
			}
		},
		[key, storedValue],
	);

	// delete item from local storage
	const removeValue = useCallback(() => {
		if (IS_SERVER) {
			console.warn(`Tried removing localStorage key “${key}” in server`);
		}

		// Remove the key from local storage
		window.localStorage.removeItem(key);

		// Save state with default value
		setStoredValue(initialValue);

		// We dispatch a custom event so every similar useLocalStorage hook is notified
		window.dispatchEvent(new StorageEvent("local-storage", { key }));
	}, [key, initialValue]);

	const handleStorageChange = (event: StorageEvent) => {
		if (event.key !== key) return;

		try {
			// If the item was deleted, fallback to initialValue, otherwise parse the new value
			const newValue = event.newValue
				? JSON.parse(event.newValue)
				: initialValue;

			setStoredValue(newValue);
		} catch (error) {
			console.error(`Error parsing synced localStorage value:`, error);
		}
	};

	// synchronize changes across different tabs
	useEffect(() => {
		window.addEventListener("storage", handleStorageChange);

		return () => window.removeEventListener("storage", handleStorageChange);
	}, [key, initialValue]);

	return [storedValue, setValue, removeValue];
}
