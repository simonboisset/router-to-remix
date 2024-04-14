import { useId } from "react";
import { Input, type InputProps } from "./input";
import { Label } from "./label";

type TextFieldProps = InputProps & {
  label: string;
};
export const TextField = ({ label, ...props }: TextFieldProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
};
