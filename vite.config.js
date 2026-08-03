import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/my-portfolio/", // 👈 এটি ব্যবহার করলে localhost:5173/my-portfolio/ হবে
});