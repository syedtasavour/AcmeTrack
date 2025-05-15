import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // 👈 exposes to Docker and host machine
    port: 5173,
  },

  plugins: [tailwindcss(), react()],
});
