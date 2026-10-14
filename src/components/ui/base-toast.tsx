import type { ReactNode } from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";

import { cn } from "#/utils/class-helper";
import { X } from "lucide-react";

type ProviderProps = {
	children: ReactNode;
};

export const useToastManager = BaseToast.useToastManager;

export const ToastProvider = ({ children }: ProviderProps) => {
	return (
		<BaseToast.Provider>
			{children}
			<BaseToast.Portal>
				<BaseToast.Viewport className="inline-[calc(100vw-2rem)] max-inline-90 fixed inset-be-4 inset-e-4 z-1">
					<List />
				</BaseToast.Viewport>
			</BaseToast.Portal>
		</BaseToast.Provider>
	);
};

const List = () => {
	const { toasts } = useToastManager();

	return (
		<>
			{toasts.map((toast) => (
				<BaseToast.Root
					key={toast.id}
					toast={toast}
					className={cn(
						"base-toast-root",
						{
							"bg-bg-sucess-inverse text-text-success-inverse":
								toast.type === "success",
						},
						{
							"bg-bg-error-inverse text-text-error-inverse":
								toast.type === "error",
						},
					)}>
					<BaseToast.Content className="flex items-start justify-between gap-4 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100">
						<div className="grid gap-1">
							<BaseToast.Title className="text-base" />
							<BaseToast.Description className="text-sm" />
						</div>
						<BaseToast.Close>
							<X
								strokeWidth={3}
								className="block-4 inline-auto text-text-inverse"
							/>
						</BaseToast.Close>
					</BaseToast.Content>
				</BaseToast.Root>
			))}
		</>
	);
};
