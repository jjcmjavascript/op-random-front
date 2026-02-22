/* global process */
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const apiTarget = process.env.INTERNAL_API_URL;
const publicRoutes = [
  "/",
  "/ranking",
  "/tier-list/leaders",
  "/manual-mode",
  "/manual-mode/leader-select",
  "/manual-mode/card-select",
  "/manual-mode/deck-view",
  "/random-deck",
  "/deck-view",
];

if (!apiTarget) {
  console.error("❌ Missing env API_INTERNAL_URL");
  process.exit(1);
}

console.log("🔀 Proxying /api to", apiTarget);
app.set("trust proxy", true);

app.get("/sitemap.xml", (req, res) => {
  const protocol = req.get("x-forwarded-proto") || req.protocol;
  const host = req.get("host");
  const siteUrl = `${protocol}://${host}`;
  const urls = publicRoutes
    .map(
      (route) => `
  <url>
    <loc>${siteUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

app.get("/robots.txt", (req, res) => {
  const protocol = req.get("x-forwarded-proto") || req.protocol;
  const host = req.get("host");
  const siteUrl = `${protocol}://${host}`;
  const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml`;

  res.header("Content-Type", "text/plain");
  res.send(robots);
});

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
