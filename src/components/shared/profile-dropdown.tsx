import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import {
	useId,
	useRef,
	useState,
	useTransition,
	type KeyboardEvent,
} from "react";

import { FocusTrap } from "focus-trap-react";
import { ChevronDown, LogIn, LogOut, User } from "lucide-react";

import { useOutsideClick } from "#/hook/use-outside-click";
import { authClient } from "#/lib/auth-client";

import { Button } from "#/components/ui/aria-button";
import { classList } from "#/utils/class-helper";

const RouteApi = getRouteApi("__root__");

export default function ProfileDropdown() {
	const { user } = RouteApi.useRouteContext();

	const containerRef = useRef<HTMLDivElement>(null);

	const anchorDropdownTrigger = `--${useId()}`;

	const ariaControls = useId();
	const ariaLabelledby = useId();

	// dropdown open state
	const [isOpen, setIsOpen] = useState(false);

	const [index, setIndex] = useState(0);

	const [isLoggingOut, startTransition] = useTransition();

	const router = useRouter();

	// close dropdown on outside click
	useOutsideClick({
		ref: containerRef,
		isOpen: isOpen,
		onClose: () => setIsOpen(false),
	});

	const handleLogout = () => {
		startTransition(async () => {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						router.invalidate();
					},
				},
			});
		});
	};

	// menu item roving tabindex
	const handleMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const menuItems = Array.from(
			e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'),
		);
		const currentIndex = menuItems.indexOf(e.target as HTMLElement);

		let newIndex = currentIndex;

		switch (e.key) {
			case "Escape":
				setIsOpen(false);
				break;

			case "ArrowDown":
				newIndex = (currentIndex + 1) % menuItems.length;
				break;

			case "ArrowUp":
				newIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
				break;

			// do nothing for other key
			default:
				return;
		}

		e.preventDefault();
		e.stopPropagation();
		menuItems[newIndex].focus();
		setIndex(newIndex);
	};

	const randomHue = Math.floor(Math.random() * 360) + 1;

	if (!user) {
		return (
			<Link
				to="/login"
				className="min-block-10.75 max-block-max trim-text squircle flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-bg-primary px-4 font-medium text-text transition-all duration-200 *:shrink-0 hover:bg-bg-primary-hover focus-visible:bg-bg-primary-hover active:scale-95">
				<LogIn className="block-[1.3em] inline-auto" />
				<span className="hidden min-[28rem]:inline">Login</span>
			</Link>
		);
	}

	return (
		<FocusTrap active={isOpen}>
			<div ref={containerRef}>
				<Button
					variant="plain"
					id={ariaLabelledby}
					className="max-block-none flex gap-1 px-0 *:shrink-0"
					style={{ anchorName: anchorDropdownTrigger }}
					onClick={() => setIsOpen((prev) => !prev)}
					onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
					aria-haspopup="menu"
					aria-expanded={isOpen}
					aria-controls={ariaControls}>
					{user.image ? (
						<img
							src={user.image}
							alt=""
							className="block-12 inline-12 origin-center rounded-full border border-border object-cover"
						/>
					) : (
						<span
							className="block-12 inline-12 trim-capital scheme-light flex items-center justify-center rounded-full border-2 border-border bg-(--profile-background) font-bold text-2xl text-text"
							style={{
								"--profile-background": `oklch(0.7 0.08 ${randomHue})`,
							}}>
							{user.name.charAt(0).toUpperCase()}
						</span>
					)}
					<ChevronDown
						strokeWidth={3}
						className={classList(
							"block-[1.1em] inline-auto transition-transform duration-200",
							{ "rotate-180": isOpen },
						)}
					/>
				</Button>

				{isOpen && (
					<div
						role="menu"
						id={ariaControls}
						className="squircle min-inline-50 absolute inset-bs-1 grid rounded-xl border border-border-muted bg-bg-card"
						style={{
							positionAnchor: anchorDropdownTrigger,
							positionArea: " block-end span-inline-start ",
						}}
						onKeyDown={(e) => handleMenuKeyDown(e)}
						aria-labelledby={ariaLabelledby}>
						<div className="grid grid-cols-[auto_1fr] items-center gap-x-4 border-be border-border px-4 py-3">
							{user.image ? (
								<img
									src={user.image}
									alt=""
									className="block-8 inline-8 row-span-2 origin-center rounded-full border border-border object-cover"
								/>
							) : (
								<span className="block-8 inline-8 trim-capital scheme-dark row-span-2 flex items-center justify-center rounded-full border border-border bg-bg-primary font-bold text-text text-xl">
									{user.name.charAt(0).toUpperCase()}
								</span>
							)}

							<span className="font-medium text-lg">{user.name}</span>
							<span>{user.email}</span>
						</div>

						<div className="grid gap-1 p-2">
							<Link
								role="menuitem"
								tabIndex={index === 0 ? 0 : -1}
								to="/dashboard"
								className="trim-capital squircle flex items-center gap-2 rounded-xl p-2 font-medium text-text transition-all duration-200 *:shrink-0 hover:bg-bg-selected focus-visible:bg-bg-selected"
								onClick={() => setIsOpen(false)}>
								<User className="block-[1.3em] inline-auto" />
								<span>Dashboard</span>
							</Link>

							<button
								role="menuitem"
								type="button"
								tabIndex={index === 1 ? 0 : -1}
								disabled={isLoggingOut}
								className="trim-capital squircle flex cursor-pointer items-center gap-2 rounded-xl p-2 font-medium text-text transition-all duration-200 *:shrink-0 hover:bg-bg-selected focus-visible:bg-bg-selected"
								onClick={handleLogout}>
								<LogOut className="block-[1.3em] inline-auto" />
								{isLoggingOut ? (
									<span className="logout-loader"></span>
								) : (
									<span>Logout</span>
								)}
							</button>
						</div>
					</div>
				)}
			</div>
		</FocusTrap>
	);
}
