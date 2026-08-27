import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom", // <-- Define el entorno DOM para todas las pruebas UI
    setupFiles: "./src/setupTests.ts", // Si usas archivo de setup
  },
});
