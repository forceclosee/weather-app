import { cn } from "#/utils/class-helper";
import { Field as BaseField } from "@base-ui/react/field";
import { Input as BaseInput } from "@base-ui/react/input";

type ClassNameProps = {
	className?: string;
};

const Root = (props: BaseField.Root.Props & ClassNameProps) => {
	return (
		<BaseField.Root
			{...props}
			className={cn("inline-full grid items-start gap-2", props.className)}
		/>
	);
};

const Label = (props: BaseField.Label.Props & ClassNameProps) => {
	return (
		<BaseField.Label
			{...props}
			className={cn(
				"flex gap-1 font-bold text-sm after:text-text-error after:content-['*']",
				props.className,
			)}
		/>
	);
};
const Control = (props: BaseField.Control.Props) => {
	return <BaseField.Control {...props} />;
};
const Description = (props: BaseField.Description.Props) => {
	return <BaseField.Description {...props} />;
};
const Item = (props: BaseField.Item.Props) => {
	return <BaseField.Item {...props} />;
};
const FieldError = (props: BaseField.Error.Props & ClassNameProps) => {
	return (
		<BaseField.Error
			{...props}
			className={cn("text-sm text-text-error", props.className)}
		/>
	);
};
const Validity = (props: BaseField.Validity.Props) => {
	return <BaseField.Validity {...props} />;
};

export const Field = {
	Root: Root,
	Label: Label,
	Control: Control,
	Description: Description,
	Item: Item,
	Error: FieldError,
	Validity: Validity,
};

export function Input(props: BaseInput.Props & ClassNameProps) {
	return (
		<BaseInput
			{...props}
			className={cn(
				"min-block-12 squircle rounded-xl outline-transparent transition-all duration-200",
				props.className,
			)}
		/>
	);
}
