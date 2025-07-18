import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labal: string;
  id: string;
  required?: boolean;
}

const InputForm = ({
  labal,
  id,
  required = false,
  ...props
}: InputFormProps) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>
          {labal}
          {required && <span className="text-red-500">*</span>}
        </Label>
        <Input id={id} name={id} required={required} {...props} />
      </div>
    </>
  );
};

export default InputForm;
