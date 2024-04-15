import type { MetaFunction } from "@remix-run/react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./globals.css";

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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default App;
