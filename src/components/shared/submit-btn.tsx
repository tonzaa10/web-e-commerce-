import { Button } from "@/components/ui/button";
import { Loader2, LucideIcon } from "lucide-react";

interface SubmitBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  padding?: boolean;
  icon?: LucideIcon;
}

const SubmitBtn = ({ name, padding = false, icon, ...props }: SubmitBtnProps) => {
  const Icon = icon
  return (

    <Button type="submit" disabled={padding} {...props}>
      {padding ? <Loader2 size={16} className="animate-spin" /> :
        <>
          {Icon && <Icon size={16} />} {name}
        </>
      }
    </Button>
  );
};

export default SubmitBtn;
