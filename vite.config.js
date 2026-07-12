import { defineConfig } from "vite";

// GitHub Pages serves under /Portfolio/; Vercel (and most hosts) serve at /
const base = process.env.VERCEL ? "/" : (process.env.VITE_BASE || "/Portfolio/");

export default defineConfig({
  base,
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
