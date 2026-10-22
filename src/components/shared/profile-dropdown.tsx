import { getRouteApi, useRouter } from "@tanstack/react-router";
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
import { usePreventScroll } from "#/hook/use-prevent-scroll";
import { authClient } from "#/lib/auth-client";
import { classList } from "#/utils/class-helper";

import { Button } from "#/components/ui/aria-button";
import { Avatar } from "#/components/ui/base-avatar";
import Link from "#/components/ui/link";

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

	// disable page scrolling when dropdown open
	usePreventScroll(isOpen);

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

	if (!user) {
		return (
			<Link to="/login" className="gap-2">
				<LogIn className="block-[1.3em] inline-auto" />
				<span className="hidden min-[28rem]:inline">Login</span>
			</Link>
		);
	}

	return (
		<FocusTrap active={isOpen}>
			<div ref={containerRef} suppressHydrationWarning className="z-dropdown">
				<Button
					variant="plain"
					id={ariaLabelledby}
					className="flex gap-1 px-0 max-block-none *:shrink-0"
					style={{ anchorName: anchorDropdownTrigger }}
					onClick={() => setIsOpen((prev) => !prev)}
					onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
					aria-haspopup="menu"
					aria-expanded={isOpen}
					aria-controls={ariaControls}>
					<Avatar.Root size={48} className="">
						<Avatar.Image src={user.image} />
						<Avatar.Fallback>
							{user.name.charAt(0).toUpperCase()}
						</Avatar.Fallback>
					</Avatar.Root>
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
						className="absolute inset-bs-1 grid rounded-xl border border-border-muted bg-bg-card min-inline-50 squircle"
						style={{
							positionAnchor: anchorDropdownTrigger,
							positionArea: " block-end span-inline-start ",
						}}
						onKeyDown={(e) => handleMenuKeyDown(e)}
						aria-labelledby={ariaLabelledby}>
						<div className="grid grid-cols-[auto_1fr] items-center gap-x-4 border-be border-border px-4 py-3">
							<Avatar.Root size={32} className="row-span-2">
								{user.image && <Avatar.Image src={user.image} />}
								<Avatar.Fallback>
									{user.name.charAt(0).toUpperCase()}
								</Avatar.Fallback>
							</Avatar.Root>

							<span className="text-lg font-medium">{user.name}</span>
							<span>{user.email}</span>
						</div>

						<div className="grid gap-1 p-2">
							<Link
								variant="plain"
								role="menuitem"
								tabIndex={index === 0 ? 0 : -1}
								to="/dashboard"
								className="justify-start gap-2 p-2 font-medium trim-capital hover:bg-bg-selected focus-visible:bg-bg-selected"
								onClick={() => setIsOpen(false)}>
								<User className="block-[1.3em] inline-auto" />
								<span>Dashboard</span>
							</Link>

							<button
								role="menuitem"
								type="button"
								tabIndex={index === 1 ? 0 : -1}
								disabled={isLoggingOut}
								className="flex cursor-pointer items-center gap-2 rounded-xl p-2 font-medium text-text-error transition-all duration-200 squircle trim-capital *:shrink-0 hover:bg-bg-selected focus-visible:bg-bg-selected"
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
