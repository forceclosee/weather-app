import { useEffect, useId, useState, type ComponentProps } from "react";

import { SearchIcon, X } from "lucide-react";

import { cn } from "#/utils/class-helper";

import { Button } from "#/components/ui/aria-button";
import {
	Dialog,
	DialogTrigger,
	Heading,
	Modal,
	ModalOverlay,
} from "#/components/ui/aria-modal";
import SearchResult from "#/components/search/search-result";
import SelectedLocation from "#/components/search/selected-location";
import FavouriteLocationList from "#/components/search/favourite-location-list";

interface Props extends ComponentProps<"div"> {}

export default function Search({ className }: Props) {
	const inputId = useId();

	const [isOpen, setIsOpen] = useState(false);

	const [inputValue, setInputValue] = useState("");

	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		const timeout = setTimeout(() => setSearchValue(inputValue.trim()), 500);

		return () => clearTimeout(timeout);
	}, [inputValue]);

	return (
		<div className={cn("@container/search inline-full", className)}>
			<DialogTrigger>
				<Button
					variant="secondary"
					onClick={() => setIsOpen(true)}
					aria-expanded={isOpen}
					aria-haspopup="dialog"
					className="gap-3 rounded-xl text-start text-text-muted inline-full min-block-12 squircle">
					<SearchIcon strokeWidth={3} className="block-[1.1em] inline-auto" />
					<span className="flex-1">Search for a place...</span>
					<span className="hidden text-base text-text @min-lg/search:inline">
						Search
					</span>
				</Button>

				<ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
					<Modal className="max-inline-2xl">
						<Dialog>
							<Heading slot="title">Search location</Heading>

							<SelectedLocation />

							<search className="flex items-center gap-2 rounded-xl border border-border bg-bg-secondary px-4 outline-2 -outline-offset-2 outline-transparent squircle focus-within:outline-2 focus-within:outline-inherit">
								<label htmlFor={inputId} className="sr-only">
									Search location
								</label>

								<input
									id={inputId}
									type="search"
									autoFocus
									placeholder="Search for a place..."
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									className="flex-1 hide-default-clear bg-transparent py-3 outline-transparent"
								/>

								{/* clear input */}
								{inputValue && (
									<button
										type="button"
										onClick={() => setInputValue("")}
										className="cursor-pointer p-1"
										aria-label="Clear search">
										<X strokeWidth={3} className="block-4 inline-auto" />
									</button>
								)}
							</search>

							{/* search results */}
							<SearchResult searchValue={searchValue} setIsOpen={setIsOpen} />

							{/* favourite locations */}
							<FavouriteLocationList setIsOpen={setIsOpen} />

							{/* close button */}
							<Button
								slot="close"
								variant="plain"
								aria-label="Close search"
								className="absolute -inset-e-4 -inset-bs-4 p-2">
								<X strokeWidth={3} className="block-4 inline-auto" />
							</Button>
						</Dialog>
					</Modal>
				</ModalOverlay>
			</DialogTrigger>
		</div>
	);
}
