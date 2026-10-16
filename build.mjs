import { mkdir, writeFile, rm, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderHome, render404, generatedPages, siteManifest } from './render-site.mjs';
import { buildServiceArtAtlas } from '../src/data/service-illustrations.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const routeFiles = [
  ['index.html', renderHome()],
  ['404.html', render404()],
  ...generatedPages()
];

function configuredSiteUrl() {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return '';
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error('SITE_URL must be a valid absolute HTTPS origin, for example https://your-domain.com');
  }
  if (parsed.protocol !== 'https:' || parsed.pathname !== '/' || parsed.search || parsed.hash || parsed.username || parsed.password) {
    throw new Error('SITE_URL must be an HTTPS origin only (no path, query, credentials, or fragment).');
  }
  return parsed.origin;
}

function validateManifest() {
  const { services, worlds, routes } = siteManifest;
  const expectedCounts = { technology: 8, creative: 8, media: 7, marketing: 7, legal: 4 };
  if (services.length !== 34) throw new Error(`Service inventory mismatch: expected 34 confirmed services, got ${services.length}.`);
  const slugs = services.map((service) => service.slug);
  if (new Set(slugs).size !== slugs.length) throw new Error('Duplicate service slug detected.');
  for (const [worldId, count] of Object.entries(expectedCounts)) {
    const actual = services.filter((service) => service.world === worldId).length;
    if (actual !== count) throw new Error(`${worldId} has ${actual} service records; expected ${count}.`);
    if (!worlds.some((world) => world.id === worldId)) throw new Error(`Missing world definition: ${worldId}.`);
  }
  for (const service of services) {
    if (!service.slug || !service.title || !service.meta || !service.intro || !service.audience || !service.challenge || !service.deliverables?.length || !service.faqs?.length) {
      throw new Error(`Incomplete service content: ${service.slug || '(missing slug)'}.`);
    }
    if (service.meta.length < 50) throw new Error(`Meta description is too short: ${service.slug}.`);
  }
  const routeSet = new Set(routes);
  if (routeSet.size !== routes.length) throw new Error('Duplicate route detected in the route manifest.');
  return { expectedCounts, routeCount: routes.length };
}

function sitemapContent(siteUrl) {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  if (!siteUrl) return `${header}\n  <!-- Set SITE_URL to an HTTPS origin when the production domain is known. -->\n</urlset>\n`;
  const date = new Date().toISOString().slice(0, 10);
  const indexableRoutes = siteManifest.routes.filter((route) => route !== '/404.html');
  const entries = indexableRoutes.map((route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${date}</lastmod></url>`).join('\n');
  return `${header}\n${entries}\n</urlset>\n`;
}

function robotsContent(siteUrl) {
  return `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : '# Set SITE_URL and rebuild to publish an absolute sitemap location.\n'}`;
}

async function writeServiceArtAtlas() {
  const output = path.join(projectRoot, 'assets', 'images', 'services', 'service-atlas.svg');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, buildServiceArtAtlas(), 'utf8');
}

async function writeSite(targetRoot, { clean = false } = {}) {
  if (clean) await rm(targetRoot, { recursive: true, force: true });
  await mkdir(targetRoot, { recursive: true });
  for (const [relativePath, html] of routeFiles) {
    const targetPath = path.join(targetRoot, relativePath);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, html, 'utf8');
  }
  await writeFile(path.join(targetRoot, 'robots.txt'), robotsContent(configuredUrl), 'utf8');
  await writeFile(path.join(targetRoot, 'sitemap.xml'), sitemapContent(configuredUrl), 'utf8');
  await writeFile(path.join(targetRoot, 'manifest.webmanifest'), await readText(path.join(projectRoot, 'manifest.webmanifest')), 'utf8');
}

async function readText(filePath) {
  const { readFile } = await import('node:fs/promises');
  return readFile(filePath, 'utf8');
}

const manifestStats = validateManifest();
const configuredUrl = configuredSiteUrl();
if (configuredUrl) process.env.SITE_URL = configuredUrl;

// Generate the original service-specific SVG sprite, then the editable static HTML routes.
await writeServiceArtAtlas();
await writeSite(projectRoot);

// Produce a self-contained static deployment directory; no framework or bundler is involved.
await rm(distRoot, { recursive: true, force: true });
await mkdir(distRoot, { recursive: true });
await cp(path.join(projectRoot, 'assets'), path.join(distRoot, 'assets'), { recursive: true });
await cp(path.join(projectRoot, 'src', 'css'), path.join(distRoot, 'src', 'css'), { recursive: true });
await cp(path.join(projectRoot, 'src', 'js'), path.join(distRoot, 'src', 'js'), { recursive: true });
await writeSite(distRoot);

console.log(`Built ${manifestStats.routeCount} HTML routes (${manifestStats.routeCount - 2} content pages plus home and 404) to ${path.relative(projectRoot, distRoot)}/.`);
console.log(`Confirmed service routes: ${siteManifest.services.length}. Missing 35th service remains unassigned; see docs/service-inventory.md.`);
console.log(configuredUrl ? `Canonical URLs and sitemap use ${configuredUrl}.` : 'SITE_URL not set; canonical URLs are omitted and sitemap is intentionally empty until the production domain is known.');
