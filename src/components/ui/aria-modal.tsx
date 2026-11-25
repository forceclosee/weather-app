import {
	DialogTrigger as AriaDialogTrigger,
	type DialogTriggerProps,
	Dialog as AriaDialog,
	type DialogProps as AriaDialogProps,
	Heading as AriaHeading,
	type HeadingProps as AriaHeadingProps,
	Modal as AriaModal,
	type ModalRenderProps as AriaModalProps,
	ModalOverlay as AriaModalOverlay,
	type ModalOverlayProps as AriaModalOverlayProps,
} from "react-aria-components/Modal";

import { cn } from "#/utils/class-helper";
import type { ReactNode } from "react";

interface ClassNameProps {
	className?: string;
}

export function DialogTrigger(props: DialogTriggerProps) {
	return <AriaDialogTrigger {...props} />;
}

interface ModalOverlayProps
	extends Omit<AriaModalOverlayProps, "className">,
		ClassNameProps {}

export function ModalOverlay({ className, ...props }: ModalOverlayProps) {
	return (
		<AriaModalOverlay
			className={cn(
				"fixed inset-0 z-modal grid items-center justify-items-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm sm:p-8",
				className,
			)}
			{...props}
		/>
	);
}

interface ModalProps
	extends Partial<Omit<AriaModalProps, "className">>,
		ClassNameProps {
	children: ReactNode;
}

export function Modal({ className, children, ...props }: ModalProps) {
	return (
		<AriaModal
			className={cn(
				"overflow-y-auto rounded-2xl border border-border-muted bg-bg-card p-6 text-text shadow-xl outline-none inline-full max-block-[calc(var(--visual-viewport-height)*0.9)] squircle",
				className,
			)}
			{...props}>
			{children}
		</AriaModal>
	);
}

interface DialogProps
	extends Omit<AriaDialogProps, "className">,
		ClassNameProps {}

export function Dialog({ className, ...props }: DialogProps) {
	return (
		<AriaDialog
			className={cn("relative grid gap-6 outline-none", className)}
			{...props}
		/>
	);
}

interface HeadingProps
	extends Omit<AriaHeadingProps, "className">,
		ClassNameProps {}

export function Heading({ className, ...props }: HeadingProps) {
	return <AriaHeading className={cn("text-center", className)} {...props} />;
}
