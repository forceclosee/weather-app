import type { JSX } from "react";

import { useFormContext } from "#/hook/form";

import { Button } from "#/components/ui/aria-button";

type Props = {
	label: string | JSX.Element;
	labelSubmitting: string | JSX.Element;
};

export default function SubmitButton({ label, labelSubmitting }: Props) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" isDisabled={isSubmitting}>
					{isSubmitting ? labelSubmitting : label}
				</Button>
			)}
		</form.Subscribe>
	);
}
