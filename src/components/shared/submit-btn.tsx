import { Button } from "@/components/ui/button";
import { Loader2, LucideIcon } from "lucide-react";

interface SubmitBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  panding?: boolean;
  icon?: LucideIcon;
}

const SubmitBtn = ({ name, panding = false, icon, ...props }: SubmitBtnProps) => {
  const Icon = icon
  return (

    <Button type="submit" disabled={panding} {...props}>
      {panding ? <Loader2 size={16} className="animate-spin" /> :
        <>
          {Icon && <Icon size={16} />} {name}
        </>
      }
    </Button>
  );
};

export default SubmitBtn;
