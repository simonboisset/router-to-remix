import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

type SignupProps = {
  className?: string;
};

export const Spinner = (props: SignupProps) => {
  return <Loader2 className={cn(props.className, "animate-spin")} />;
};
