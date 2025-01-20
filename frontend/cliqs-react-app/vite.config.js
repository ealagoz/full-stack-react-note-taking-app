import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // All requests starting with /api will be proxied
        target: "http://127.0.0.1:8000", // Your FastAPI backend URL
        changeOrigin: true, // Important for CORS
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix
      },
    },
  },
});
