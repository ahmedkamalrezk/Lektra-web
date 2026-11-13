#!/usr/bin/env node
/**
 * Zero-dependency preview of the static export in `out/`.
 *
 * The export assumes it is served from `NEXT_PUBLIC_BASE_PATH` (for example
 * `/Lektra-web`), so this server strips that prefix before looking up a file —
 * exactly what GitHub Pages does for a project site.
 *
 *   bun run build                       # writes out/
 *   bun run start                       # http://localhost:3009
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const PORT = Number(process.env.PORT) || 3009;
const ROOT = resolve(process.cwd(), "out");
const PREFIX = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

if (!existsSync(ROOT)) {
  console.error("No out/ directory — run `bun run build` first.");
  process.exit(1);
}

createServer((req, res) => {
  let path = decodeURIComponent((req.url || "/").split("?")[0]);

  if (PREFIX) {
    if (path === PREFIX) {
      res.writeHead(308, { location: `${PREFIX}/` });
      return res.end();
    }
    if (!path.startsWith(`${PREFIX}/`)) {
      res.writeHead(404, { "content-type": "text/plain" });
      return res.end("Not found — this build is served from " + PREFIX);
    }
    path = path.slice(PREFIX.length);
  }

  let file = normalize(join(ROOT, path));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end();
    return;
  }

  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  else if (!extname(file) && existsSync(`${file}.html`)) file = `${file}.html`;

  if (!existsSync(file)) {
    res.writeHead(404, { "content-type": "text/plain" });
    return res.end("Not found: " + path);
  }

  res.writeHead(200, {
    "content-type": TYPES[extname(file)] || "application/octet-stream",
    "cache-control": "no-store",
  });
  createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`Previewing out/ at http://localhost:${PORT}${PREFIX}/`);
});
