import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repositoryName = "react-output-hook-form-zod";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: repositoryName,
});
