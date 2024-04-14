import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query-client";
import { Toaster } from "./components/ui/sonner";
import style from "./globals.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: style, as: "style" }];
};

export const meta: MetaFunction = () => [
  { title: "Router to Remix" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { charset: "utf-8" },
];

const App = () => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
};

export default App;
