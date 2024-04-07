import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { queryClient } from "./api/query-client";
import { RootSnackbar } from "./components/snackbar";
import RootPage, { loader as rootLoader } from "./routes/_users";
import UserRoute, {
  action as userAction,
  loader as userLoader,
} from "./routes/_users.$userId";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <UserRoute />,
        loader: userLoader,
        action: userAction,
      },
      {
        path: ":userId",
        element: <UserRoute />,
        loader: userLoader,
        action: userAction,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <RootSnackbar />
    </QueryClientProvider>
  );
};

export default App;
