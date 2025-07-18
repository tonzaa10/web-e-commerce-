import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  padding?: boolean;
}

const SubmitBtn = ({ name, padding = false, ...props }: SubmitBtnProps) => {
  return (
    <Button type="submit" disabled={padding} {...props}>
      {padding ? <Loader2 size={16} className="animate-spin" /> : name}
    </Button>
  );
};

export default SubmitBtn;
