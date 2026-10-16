import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteManifest } from '../scripts/render-site.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('every route in the static manifest has a generated HTML file', async () => {
  for (const route of siteManifest.routes) {
    const file = route === '/' ? 'index.html' : route.slice(1);
    await assert.doesNotReject(access(path.join(root, file)), file);
    const html = await readFile(path.join(root, file), 'utf8');
    assert.match(html, /<!doctype html>/i, `${file} contains an HTML document`);
    assert.match(html, /<h1\b/i, `${file} has a primary heading`);
    assert.match(html, /<html lang="en" class="js-ready">/i, `${file} starts in the enhanced header layout to avoid a JavaScript-ready layout jump`);
    assert.match(html, /<noscript><link rel="stylesheet" href="\/src\/css\/no-js\.css" \/><\/noscript>/, `${file} keeps its non-script navigation fallback`);
  }
});

test('the site provides a not-found document and no unconfirmed 35th service route', async () => {
  await assert.doesNotReject(access(path.join(root, '404.html')));
  assert.equal(siteManifest.services.length, 34);
  assert.equal(siteManifest.routes.filter((route) => route.startsWith('/pages/services/') && route !== '/pages/services/index.html').length, 34);
});
