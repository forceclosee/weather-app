import {
	useEffect,
	useRef,
	useState,
	type ComponentProps,
	type Dispatch,
	type KeyboardEvent,
	type SetStateAction,
	type SubmitEvent,
} from "react";
import { useQuery } from "@tanstack/react-query";

import { SearchIcon, X } from "lucide-react";

import { updateWeatherState } from "#/utils/weather-store";
import { classList, cn } from "#/utils/class-helper";
import { createLocationQueryOptions } from "#/query-options/weather";

import { Button } from "#/components/ui/aria-button";

type Selected = 0 | 1 | 2 | 3 | 4 | 5;

type Props = ComponentProps<"div">;

export default function Search({ className }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);

	const inputRef = useRef<HTMLInputElement>(null);

	// user input value
	const [inputValue, setInputValue] = useState("");

	// search value used for geocoding url params
	const [searchValue, setSearchValue] = useState("");

	// dropdown open state
	const [isOpen, setIsOpen] = useState(false);

	// selected menu item
	const [selected, setSelected] = useState<Selected>(0);

	// close dropdown on outside click
	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent | FocusEvent) => {
			if (!containerRef.current?.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	// close dropdown when the focus moves outside the container
	const handleContainerBlur = () => {
		setTimeout(() => {
			if (!containerRef.current?.contains(document.activeElement)) {
				setIsOpen(false);
			}
		}, 0);
	};

	// clear search input
	const handleClearButtonClick = () => {
		setInputValue("");
		setSearchValue("");
		inputRef.current?.focus();
	};

	// submit handler for search form
	const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsOpen(true);

		if (!inputValue) return;

		setSearchValue(inputValue);
		setSelected(0);
	};

	return (
		<search
			ref={containerRef}
			onBlur={handleContainerBlur}
			className={cn("max-inline-2xl inline-full mx-auto", className)}
			style={{ anchorName: "--search-container" }}>
			<form onSubmit={(e) => handleSearch(e)}>
				<label htmlFor="search" className="sr-only">
					Search Location
				</label>

				<div className="min-block-14 grid grid-cols-[1fr_auto] gap-4">
					<input
						ref={inputRef}
						id="search"
						type="search"
						placeholder="Search for a place..."
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onFocus={() => setIsOpen(true)}
						className={classList(
							"squircle hide-default-clear min-inline-0 rounded-xl bg-bg-card ps-4 outline-2 outline-transparent -outline-offset-2 transition-all duration-200 focus:outline-2 focus:outline-inherit",
							inputValue.length === 0 ? "pe-4" : "pe-8",
						)}
						style={{ anchorName: "--search-input" }}
					/>

					{/* clear search input button */}
					{inputValue && (
						<button
							type="button"
							onClick={handleClearButtonClick}
							className="absolute inset-e-3 cursor-pointer"
							style={{
								positionAnchor: "--search-input",
								positionArea: "center",
							}}
							aria-label="Clear search">
							<X strokeWidth={3} className="block-4 inline-auto" />
						</button>
					)}

					<Button
						type="submit"
						className="max-block-none scheme-dark flex gap-4 px-6 text-text text-xl"
						aria-label="Search location">
						<SearchIcon strokeWidth={3} className="block-[1em] inline-auto" />
						<span className="hidden sm:inline" aria-hidden>
							Search
						</span>
					</Button>
				</div>
			</form>

			{isOpen && (
				<SearchDropdown
					searchValue={searchValue}
					setSelected={setSelected}
					setIsOpen={setIsOpen}
					selected={selected}
				/>
			)}
		</search>
	);
}

type SearchDropdownProps = {
	searchValue: string;
	setSelected: Dispatch<SetStateAction<Selected>>;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	selected: Selected;
};

function SearchDropdown({
	searchValue,
	setSelected,
	setIsOpen,
	selected,
}: SearchDropdownProps) {
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	const { data, isPending, isError, isSuccess } = useQuery(
		createLocationQueryOptions(searchValue),
	);

	const locations = data?.results;

	// menu item click handler
	const handleItemClick = (target: Selected) => {
		if (!locations) return;

		setSelected(target);
		setIsOpen(false);

		// update weather state
		updateWeatherState({
			coordinates: {
				latitude: locations[target].latitude,
				longitude: locations[target].longitude,
			},
			timezone: locations[target].timezone,
			city: locations[target].name,
			country: locations[target].country,
			countryCode: locations[target].country_code.toLowerCase(),
		});
	};

	// menu item keyboard event handler
	const handleItemKeyDown = (
		e: KeyboardEvent<HTMLDivElement>,
		target: Selected,
	) => {
		if (!locations) return;

		let newSelected: Selected = target;

		switch (e.key) {
			case "Escape":
				setIsOpen(false);
				break;

			case "ArrowDown":
				e.preventDefault();

				newSelected = ((target + 1) % locations.length) as Selected;

				break;

			case "ArrowUp":
				e.preventDefault();

				newSelected = ((target - 1 + locations.length) %
					locations.length) as Selected;

				break;

			case "Enter":
				setSelected(newSelected);
				setIsOpen(false);

				if (!locations) return;

				// update weather state
				updateWeatherState({
					coordinates: {
						latitude: locations[target].latitude,
						longitude: locations[target].longitude,
					},
					timezone: locations[target].timezone,
					city: locations[target].name,
					country: locations[target].country,
					countryCode: locations[target].country_code.toLowerCase(),
				});

				break;

			// do nothing for other key
			default:
				return;
		}

		itemRefs.current[newSelected]?.focus();
	};

	return (
		<div
			role="dialog"
			className="inline-[anchor-size(--search-container_inline)] sm:inline-[anchor-size(--search-input_inline)] squircle absolute inset-bs-1 z-dropdown rounded-xl border border-border-muted bg-bg-card p-4 shadow-xl [position-anchor:--search-container] sm:[position-anchor:--search-input]"
			style={{
				positionArea: "block-end span-all",
			}}>
			{/* empty state */}
			{!searchValue && <p className="text-base">Type the city name</p>}

			{/* loading state */}
			{isPending && searchValue && <div className="loader"></div>}

			{/* error state */}
			{isError && (
				<p className="font-medium text-base text-text-error">
					No location found, Please use a different search term
				</p>
			)}

			{/* success state */}
			{isSuccess && locations && (
				<div role="menu" className="grid gap-1">
					{locations.map((location, index) => (
						<div
							key={index}
							ref={(el) => {
								itemRefs.current[index] = el;
							}}
							role="menuitem"
							tabIndex={selected === index ? 0 : -1}
							onClick={() => handleItemClick(index as Selected)}
							onKeyDown={(e) => handleItemKeyDown(e, index as Selected)}
							className="squircle grid cursor-pointer grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 rounded-xl border border-border-muted p-2 hover:bg-bg-selected focus-visible:bg-bg-selected">
							<img
								src={`https://hatscripts.github.io/circle-flags/flags/${location.country_code.toLowerCase()}.svg`}
								alt={`${location.country} flag`}
								width={48}
								height={48}
								className="inline-[1em] block-auto inline-block shrink-0"
							/>

							<span className="font-medium">
								{`${location.name}, ${location.country}`}
							</span>

							<span className="col-span-2 text-text-muted">
								{`${location.admin1} (${location.latitude}°N, ${location.longitude}°E)`}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
