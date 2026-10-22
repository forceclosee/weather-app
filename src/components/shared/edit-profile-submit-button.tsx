import type { JSX } from "react";

import { useFormContext } from "#/hook/form";

import { Button } from "#/components/ui/aria-button";

interface Props {
	label: string | JSX.Element;
	labelSubmitting: string | JSX.Element;
}

export default function EditProfileSubmitButton({
	label,
	labelSubmitting,
}: Props) {
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={(state) => [state.isSubmitting, state.isDefaultValue]}>
			{([isSubmitting, isDefaultValue]) => (
				<Button type="submit" isDisabled={isSubmitting || isDefaultValue}>
					{isSubmitting ? labelSubmitting : label}
				</Button>
			)}
		</form.Subscribe>
	);
}
