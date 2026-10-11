import type { ReactNode } from "react";

import { useFormContext } from "#/hook/form";

import { Button } from "#/components/ui/aria-button";

type Props = {
	label: ReactNode;
	labelSubmitting: ReactNode;
};

export default function SubmitButton({ label, labelSubmitting }: Props) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" isDisabled={isSubmitting} className="scheme-dark">
					{isSubmitting ? labelSubmitting : label}
				</Button>
			)}
		</form.Subscribe>
	);
}
