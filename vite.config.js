import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const filename = new URL("", import.meta.url).pathname;
const dirname = path.dirname(filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
      "@app": path.resolve(dirname, "./src/app"),
      "@modules": path.resolve(dirname, "./src/app/modules"),
      "@shared": path.resolve(dirname, "./src/app/shared"),
      "@components": path.resolve(dirname, "./src/app/shared/components"),
      "@hooks": path.resolve(dirname, "./src/app/shared/hooks"),
      "@services": path.resolve(dirname, "./src/app/shared/services"),
      "@helpers": path.resolve(dirname, "./src/app/shared/helpers"),
      "@types": path.resolve(dirname, "./src/app/shared/types"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3008",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
