import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const apiTarget = process.env.INTERNAL_API_URL;

if (!apiTarget) {
  console.error("❌ Missing env API_INTERNAL_URL");
  process.exit(1);
}

console.log("🔀 Proxying /api to", apiTarget);
app.use(
  "/api",
  createProxyMiddleware({
    target: apiTarget,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  })
);

// Sirve el build de Vite
app.use(express.static(path.join(__dirname, "dist")));

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, "0.0.0.0", () => console.log("WEB listening on", port));
