import { cn } from "app/lib/utils";
import { Loader2 } from "lucide-react";

type SignupProps = {
  className?: string;
};

export const Spinner = (props: SignupProps) => {
  return <Loader2 className={cn(props.className, "animate-spin")} />;
};
