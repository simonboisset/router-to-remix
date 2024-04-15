import type { MetaFunction } from "@remix-run/react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Layout } from "./components/layout";
import { UserFormSkeleton } from "./components/user-form";

import "./globals.css";

export const meta: MetaFunction = () => [
  { title: "Router to Remix" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { charset: "utf-8" },
];

export function HydrateFallback() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout isLoading users={[]} selectedUserId={""}>
          <UserFormSkeleton />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const App = () => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default App;
