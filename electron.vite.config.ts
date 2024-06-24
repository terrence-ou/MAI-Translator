import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "@": resolve("src/renderer/src"),
        "@renderer": resolve("/src/renderer/src"),
        "@shared": resolve("/src/shared"),
        "@/hooks": resolve("/src/renderer/src/hooks"),
        "@/components": resolve("/src/renderer/src/components"),
      },
    },
    plugins: [react()],
  },
});
