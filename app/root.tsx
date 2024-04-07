import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
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
import { RootSnackbar } from "./components/snackbar";
import "./mains.css";

const theme = createTheme();

export const meta: MetaFunction = () => [
  { title: "Router to Remix" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { charset: "utf-8" },
];

export const links: LinksFunction = () => [];

const App = () => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <Outlet />
            <RootSnackbar />
          </QueryClientProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default App;
