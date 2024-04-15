import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout";
import { UserFormSkeleton } from "./components/user-form";
import "./globals.css";
import RootPage from "./routes/_users";
import UserRoute from "./routes/_users.$userId";

const HydrateFallback = () => (
  <Layout isLoading users={[]} selectedUserId={""}>
    <UserFormSkeleton />
  </Layout>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <UserRoute />,
      },
      {
        path: ":userId",
        element: <UserRoute />,
      },
    ],
  },
]);

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
