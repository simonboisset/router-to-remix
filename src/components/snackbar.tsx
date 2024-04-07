import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { create } from "zustand";

type State = {
  open: boolean;
  message: string;
  setOpen: (open: boolean, message?: string) => void;
};

export const useSnackbar = create<State>((set) => ({
  open: false,
  message: "",
  setOpen: (open, message) => {
    if (!open) {
      set({ open });
      return;
    }
    set({ open, message });
  },
}));

export const RootSnackbar = () => {
  const isSnackbarOpen = useSnackbar((state) => state.open);
  const message = useSnackbar((state) => state.message);
  const setOpen = useSnackbar((state) => state.setOpen);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Close fontSize="small" />
        </IconButton>
      }
    />
  );
};
