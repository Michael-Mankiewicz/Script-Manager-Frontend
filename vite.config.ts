import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
 base: "/",
 plugins: [react()],
 preview: {
  strictPort: true,
 },
 server: {
  strictPort: true,
  host: true,
 },
});