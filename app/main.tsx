import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout";
import { UserFormSkeleton } from "./components/user-form";
import "./globals.css";
import RootPage, { clientLoader as rootLoader } from "./routes/_users";
import UserRoute, {
  clientAction as userAction,
  clientLoader as userLoader,
} from "./routes/_users.$userId";

const HydrateFallback = () => (
  <Layout isLoading users={[]} selectedUserId={""}>
    <UserFormSkeleton />
  </Layout>
);

const router = createBrowserRouter(
  [
    {
      HydrateFallback,
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
  ],
  {
    future: {
      v7_partialHydration: true,
    },
  }
);

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
