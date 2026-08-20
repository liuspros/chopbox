import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
//
// Local dev runs TWO servers, not one:
//   1. Plain `vite` (this file) serves the frontend on port 5173.
//   2. `vercel dev --listen 3001` serves ONLY the /api routes on port 3001.
//
// Why not just `vercel dev` alone (wrapping vite)? That combination has a
// known bug where Vercel's dev proxy strips headers Vite's dev server
// relies on to tell "give me the HTML page" apart from "give me this as a
// JS module" — causing index.html to get fed through the JS parser and
// crash. Running them separately and proxying /api calls from Vite to
// Vercel's function server sidesteps that entirely, and is the pattern
// Vercel's own docs recommend for this exact setup.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
