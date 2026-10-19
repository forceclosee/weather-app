import type { JSX } from "react";

import { useFormContext } from "#/hook/form";

import { Button } from "#/components/ui/aria-button";

type Props = {
	label: string | JSX.Element;
	labelSubmitting: string | JSX.Element;
};

export default function SettingsSubmitButton({
	label,
	labelSubmitting,
}: Props) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
			{([isSubmitting, canSubmit]) => (
				<Button type="submit" isDisabled={isSubmitting || !canSubmit}>
					{isSubmitting ? labelSubmitting : label}
				</Button>
			)}
		</form.Subscribe>
	);
}
