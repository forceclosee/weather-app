import { Check, LucideCircleQuestionMark } from "lucide-react";

import { useFieldContext } from "#/hook/form";
import { toKebabCase } from "#/utils/attributes-helper";

import { Checkbox } from "#/components/ui/base-checkbox";
import { Field } from "#/components/ui/base-field";
import { Popover } from "#/components/ui/base-popover";

interface Props {
	label: string;
	description?: string;
}

export default function CheckboxField({ label, description }: Props) {
	const field = useFieldContext<boolean>();

	const fieldName = toKebabCase(field.name);

	return (
		<Field.Root className="flex items-center gap-2 max-inline-max">
			<Checkbox.Root
				nativeButton
				render={<button type="button" />}
				name={fieldName}
				checked={field.state.value}
				onCheckedChange={(checked) => field.handleChange(checked)}
				className="shrink-0">
				<Checkbox.Indicator>
					<Check strokeWidth={3} className="block-3.5 inline-auto" />
				</Checkbox.Indicator>
			</Checkbox.Root>

			<Field.Label isFieldNotRequired>{label}</Field.Label>

			{description && (
				<Popover
					trigger={<LucideCircleQuestionMark className="block-5 inline-auto" />}
					triggerAriaLabel="Open more info"
					title={description}
				/>
			)}
		</Field.Root>
	);
}
