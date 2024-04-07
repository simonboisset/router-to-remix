import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootSnackbar } from "./components/snackbar";
import { Route } from "./routes/route";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Route />
      <RootSnackbar />
    </QueryClientProvider>
  );
};
