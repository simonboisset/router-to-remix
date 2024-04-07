import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";

installGlobals();

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [remix()],
});
