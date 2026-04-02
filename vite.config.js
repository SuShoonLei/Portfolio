import { defineConfig } from "vite";

export default defineConfig({
  base: "/Portfolio/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
