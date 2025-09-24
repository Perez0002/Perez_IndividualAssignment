// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",   // so React Testing Library works
    coverage: {
      provider: "v8",       // use the v8 plugin you installed
      reporter: ["text", "html"], // text = table in terminal, html = folder you can open
    },
  },
});
