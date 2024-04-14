import { Button, type ButtonProps } from "./button";
import { Spinner } from "./spinner";

type LoadingButtonProps = ButtonProps & {
  loading: boolean;
};

export const LoadingButton = ({
  loading,
  disabled,
  children,
  ...props
}: LoadingButtonProps) => (
  <Button {...props} disabled={loading || disabled}>
    {loading ? <Spinner /> : children}
  </Button>
);
