import { defineConfig } from "tsup";

export default defineConfig({
  dts: true,
  entry: ["src/**/*.{ts,tsx}", "!src/**/__tests__/**"],
  format: ["cjs", "esm"],
  minify: true,
  sourcemap: false,
});
