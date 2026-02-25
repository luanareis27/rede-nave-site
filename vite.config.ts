import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  preview: {
    port: 4173,
    allowedHosts: true, // <-- aceita qualquer host
    proxy: {},
  },
  server: {
    fs: {
      allow: ["."], // permite acesso ao filesystem do projeto
    },
  },
});
