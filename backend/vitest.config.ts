import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.{test,spec}.ts"],
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["text", "html", "lcov"],
      all: false
    }
  },
  // Evita que o Vite tente tratar jsonwebtoken como URL/module estranho
  optimizeDeps: {
    include: ["jsonwebtoken"]
  },
  // Para CJS/ESM misto de libs legadas
  esbuild: {
    target: "es2020"
  }
});
