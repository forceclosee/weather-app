import { cn } from "#/utils/class-helper";
import { Field as BaseField } from "@base-ui/react/field";
import { Input as BaseInput } from "@base-ui/react/input";

interface ClassNameProps {
	className?: string;
}

interface RootProps
	extends Omit<BaseField.Root.Props, "className">,
		ClassNameProps {}

const Root = (props: RootProps) => {
	return (
		<BaseField.Root
			{...props}
			className={cn("grid items-start gap-2 inline-full", props.className)}
		/>
	);
};

interface LabelProps
	extends Omit<BaseField.Label.Props, "className">,
		ClassNameProps {}

const Label = (props: LabelProps) => {
	return (
		<BaseField.Label
			{...props}
			className={cn(
				"flex gap-1 text-sm font-bold after:text-text-error after:content-['*']",
				props.className,
			)}
		/>
	);
};

const Control = (props: BaseField.Control.Props) => {
	return <BaseField.Control {...props} />;
};

interface DescriptionProps
	extends Omit<BaseField.Description.Props, "className">,
		ClassNameProps {}

const Description = (props: DescriptionProps) => {
	return (
		<BaseField.Description
			{...props}
			className={cn("text-sm", props.className)}
		/>
	);
};

const Item = (props: BaseField.Item.Props) => {
	return <BaseField.Item {...props} />;
};

interface FieldErrorProps
	extends Omit<BaseField.Error.Props, "className">,
		ClassNameProps {}

const FieldError = (props: FieldErrorProps) => {
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

interface InputProps
	extends Omit<BaseInput.Props, "className">,
		ClassNameProps {}

export function Input(props: InputProps) {
	return (
		<BaseInput
			{...props}
			className={cn(
				"rounded-xl outline-transparent transition-all duration-200 min-block-12 squircle",
				props.className,
			)}
		/>
	);
}
