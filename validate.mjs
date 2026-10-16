import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { siteManifest } from './render-site.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');
const mode = process.argv[2] || 'all';
const errors = [];
const notes = [];
const htmlCache = new Map();

const fail = (message) => errors.push(message);
const ok = (message) => notes.push(message);
const escapePath = (value) => value.replaceAll('\\', '/');

function parseAttributes(tag) {
  const match = tag.match(/^<\s*[A-Za-z][\w:-]*/);
  if (!match) return {};
  const source = tag.slice(match[0].length).replace(/\/?>$/, '');
  const attributes = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let item;
  while ((item = pattern.exec(source))) {
    const key = item[1].toLowerCase();
    if (!(key in attributes)) attributes[key] = item[2] ?? item[3] ?? item[4] ?? '';
  }
  return attributes;
}

function inspectHtml(source, filename) {
  const clean = source.replace(/<!--[\s\S]*?-->/g, '');
  const tokens = clean.match(/<\/?[A-Za-z][^<>]*>/g) || [];
  const stack = [];
  const ids = new Set();
  const ariaReferences = [];
  const tags = [];
  const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

  for (const token of tokens) {
    if (/^<\s*\//.test(token)) {
      const name = token.match(/^<\s*\/\s*([A-Za-z][\w:-]*)/)?.[1]?.toLowerCase();
      if (!name) continue;
      const top = stack.pop();
      if (top !== name) fail(`${filename}: closing </${name}> does not match ${top ? `<${top}>` : 'an open element'}.`);
      continue;
    }
    const name = token.match(/^<\s*([A-Za-z][\w:-]*)/)?.[1]?.toLowerCase();
    if (!name) continue;
    const attrs = parseAttributes(token);
    tags.push({ name, attrs, token });
    if (attrs.id) {
      if (ids.has(attrs.id)) fail(`${filename}: duplicate id "${attrs.id}".`);
      ids.add(attrs.id);
    }
    for (const reference of ['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns']) {
      if (attrs[reference]) ariaReferences.push({ attribute: reference, values: attrs[reference].split(/\s+/).filter(Boolean) });
    }
    if (name === 'img') {
      if (!Object.hasOwn(attrs, 'alt')) fail(`${filename}: an <img> is missing its alt attribute.`);
      if (!attrs.width || !attrs.height) fail(`${filename}: an <img> is missing explicit width/height dimensions.`);
    }
    if (name === 'button' && !['button', 'submit', 'reset'].includes(attrs.type)) fail(`${filename}: a <button> is missing an explicit type.`);
    if (name === 'a' && (!attrs.href || attrs.href === '#')) fail(`${filename}: an anchor has an empty or placeholder href.`);
    if (name === 'form' && !attrs.id) fail(`${filename}: a form is missing an id for its behavior and validation hooks.`);

    if (!voidElements.has(name) && !/\/\s*>$/.test(token)) stack.push(name);
  }
  if (stack.length) fail(`${filename}: unclosed elements remain: ${stack.slice(-8).join(', ')}.`);
  for (const reference of ariaReferences) {
    for (const id of reference.values) if (!ids.has(id)) fail(`${filename}: ${reference.attribute} references missing id "${id}".`);
  }

  if (!/^\s*<!doctype html>/i.test(source)) fail(`${filename}: missing HTML5 doctype.`);
  if (!/<html\b[^>]*\blang="en"/i.test(source)) fail(`${filename}: missing English language metadata on <html>.`);
  if (!/<meta\s+charset="utf-8"/i.test(source)) fail(`${filename}: missing UTF-8 charset declaration.`);
  if (!/<meta\s+name="viewport"/i.test(source)) fail(`${filename}: missing viewport metadata.`);
  const title = source.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = tags.find((tag) => tag.name === 'meta' && tag.attrs.name?.toLowerCase() === 'description')?.attrs.content?.trim();
  if (!title) fail(`${filename}: missing or empty title.`);
  if (!description || description.length < 35) fail(`${filename}: missing or very short meta description.`);
  const h1Count = tags.filter((tag) => tag.name === 'h1').length;
  if (h1Count !== 1) fail(`${filename}: expected exactly one h1, found ${h1Count}.`);

  return { ids, tags, title, description };
}

async function loadHtml(relativePath) {
  const normalized = escapePath(relativePath);
  if (htmlCache.has(normalized)) return htmlCache.get(normalized);
  const filename = path.join(root, normalized);
  try {
    const source = await readFile(filename, 'utf8');
    const inspected = inspectHtml(source, normalized);
    const value = { source, ...inspected };
    htmlCache.set(normalized, value);
    return value;
  } catch (error) {
    if (error.code === 'ENOENT') fail(`Missing generated route: ${normalized}. Run npm run build first.`);
    else fail(`Could not read ${normalized}: ${error.message}`);
    return null;
  }
}

async function routeChecks() {
  const { services, worlds, projects, routes } = siteManifest;
  const expected = { technology: 8, creative: 8, media: 7, marketing: 7, legal: 4 };
  if (services.length !== 34) fail(`Expected 34 confirmed service records; found ${services.length}.`);
  if (new Set(services.map((service) => service.slug)).size !== services.length) fail('Duplicate service slugs found.');
  if (new Set(routes).size !== routes.length) fail('Duplicate routes found.');
  for (const [world, count] of Object.entries(expected)) {
    const actual = services.filter((service) => service.world === world).length;
    if (actual !== count) fail(`${world}: expected ${count} services; found ${actual}.`);
    const record = worlds.find((candidate) => candidate.id === world);
    if (!record || record.services.length !== count) fail(`${world}: world registry count does not match the confirmed service count.`);
  }
  for (const service of services) {
    const expectedRoute = `/pages/services/${service.slug}.html`;
    if (!routes.includes(expectedRoute)) fail(`Service route missing from manifest: ${expectedRoute}.`);
    if (!service.meta || !service.intro || !service.audience || !service.challenge || !service.difference || service.deliverables.length < 3 || service.faqs.length < 2) {
      fail(`Service content is incomplete: ${service.slug}.`);
    }
    if (service.faqs.some(([question, answer]) => !question || !answer)) fail(`Empty FAQ content: ${service.slug}.`);
  }
  const routeFiles = routes.map((route) => route === '/' ? 'index.html' : route.slice(1));
  for (const route of routeFiles) await loadHtml(route);
  const servicePages = services.map((service) => htmlCache.get(`pages/services/${service.slug}.html`)).filter(Boolean);
  if (new Set(servicePages.map((page) => page.title)).size !== services.length) fail('Service page titles are not unique.');
  if (new Set(servicePages.map((page) => page.description)).size !== services.length) fail('Service meta descriptions are not unique.');
  ok(`${routes.length} route files checked; ${services.length} confirmed services across ${worlds.length} worlds; ${projects.length} concept studies.`);
}

function targetPathForUrl(url) {
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { return null; }
  let relative = pathname.replace(/^\/+/, '');
  if (!relative) relative = 'index.html';
  else if (pathname.endsWith('/')) relative = path.join(relative, 'index.html');
  const absolute = path.resolve(root, relative);
  if (absolute !== root && !absolute.startsWith(`${root}${path.sep}`)) return null;
  return absolute;
}

async function linkChecks() {
  let checked = 0;
  for (const route of siteManifest.routes) {
    const relative = route === '/' ? 'index.html' : route.slice(1);
    const page = await loadHtml(relative);
    if (!page) continue;
    for (const tag of page.tags) {
      const attrName = ['a', 'link', 'use', 'image'].includes(tag.name) ? 'href' : ['img', 'script', 'source'].includes(tag.name) ? 'src' : '';
      if (!attrName || !tag.attrs[attrName]) continue;
      const value = tag.attrs[attrName].trim();
      if (!value || value.startsWith('data:') || value.startsWith('blob:') || value.startsWith('mailto:') || value.startsWith('tel:')) continue;
      let url;
      try { url = new URL(value, `https://eteriomn.local${route}`); }
      catch { fail(`${relative}: invalid ${attrName} URL "${value}".`); continue; }
      if (url.origin !== 'https://eteriomn.local') {
        if (url.protocol !== 'https:') fail(`${relative}: external URL should use HTTPS: ${value}.`);
        continue;
      }
      const targetPath = targetPathForUrl(url);
      if (!targetPath) { fail(`${relative}: internal link escapes the project root: ${value}.`); continue; }
      try {
        const details = await stat(targetPath);
        if (!details.isFile()) { fail(`${relative}: target is not a file: ${value}.`); continue; }
        checked += 1;
      } catch {
        fail(`${relative}: broken local ${attrName}: ${value}.`);
        continue;
      }
      if (url.hash && targetPath.endsWith('.html')) {
        const targetRelative = escapePath(path.relative(root, targetPath));
        const target = await loadHtml(targetRelative);
        const fragment = decodeURIComponent(url.hash.slice(1));
        if (target && !target.ids.has(fragment)) fail(`${relative}: fragment #${fragment} does not exist in ${targetRelative}.`);
      } else if (url.hash && targetPath.endsWith('.svg')) {
        const fragment = decodeURIComponent(url.hash.slice(1));
        const svg = await readFile(targetPath, 'utf8');
        if (!svg.includes(`id="${fragment}"`) && !svg.includes(`id='${fragment}'`)) fail(`${relative}: SVG fragment #${fragment} does not exist in ${escapePath(path.relative(root, targetPath))}.`);
      }
    }
  }
  ok(`${checked} local href/src references resolved; internal fragments checked.`);
}

async function assetChecks() {
  let references = 0;
  const scanFiles = new Set();
  for (const route of siteManifest.routes) {
    const relative = route === '/' ? 'index.html' : route.slice(1);
    const page = await loadHtml(relative);
    if (!page) continue;
    for (const tag of page.tags) {
      const src = tag.attrs.src;
      if (src?.startsWith('/')) scanFiles.add(src);
    }
  }
  const cssRoot = path.join(root, 'src', 'css');
  for (const file of await readdir(cssRoot)) {
    if (!file.endsWith('.css')) continue;
    const source = await readFile(path.join(cssRoot, file), 'utf8');
    for (const match of source.matchAll(/url\(\s*["']?(\/[^"')\s]+)["']?\s*\)/g)) scanFiles.add(match[1]);
  }
  for (const reference of scanFiles) {
    const pathname = reference.split(/[?#]/)[0];
    const target = path.resolve(root, pathname.replace(/^\/+/, ''));
    if (target !== root && !target.startsWith(`${root}${path.sep}`)) { fail(`Asset reference escapes project root: ${reference}.`); continue; }
    try {
      const details = await stat(target);
      if (!details.isFile()) fail(`Referenced asset is not a file: ${reference}.`);
      else if (details.size === 0) fail(`Referenced asset is empty: ${reference}.`);
      else {
        references += 1;
        if (details.size > 5 * 1024 * 1024) fail(`Referenced asset exceeds 5 MB: ${reference} (${(details.size / 1024 / 1024).toFixed(1)} MB).`);
      }
    } catch { fail(`Missing asset: ${reference}.`); }
  }
  ok(`${references} referenced static assets checked; no required image exceeds 5 MB.`);
}

async function visualManifestChecks() {
  const manifestPath = path.join(root, 'assets', 'asset-manifest.json');
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch (error) {
    fail(`Could not read structured visual asset manifest: ${error.message}`);
    return;
  }
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.assets) || !manifest.brandRule) {
    fail('Visual asset manifest must use schemaVersion 1 and include assets and the wordmark brand rule.');
    return;
  }

  const required = ['id', 'path', 'kind', 'mimeType', 'source', 'creator', 'license', 'attribution', 'intendedUse', 'acquiredOn', 'replacementStatus', 'temporary', 'temporaryStatus', 'altText', 'dimensions', 'aspectRatio'];
  const ids = new Set();
  const declaredPaths = new Set();
  for (const asset of manifest.assets) {
    for (const field of required) if (!(field in asset)) fail(`Visual asset record is missing ${field}: ${asset.id || '(no id)'}.`);
    if (!asset.id || ids.has(asset.id)) fail(`Visual asset id is missing or duplicated: ${asset.id || '(empty)'}.`);
    ids.add(asset.id);
    if (!asset.path?.startsWith('assets/')) fail(`Visual asset path must stay under assets/: ${asset.path || '(empty)'}.`);
    if (declaredPaths.has(asset.path)) fail(`Duplicate visual asset path: ${asset.path}.`);
    declaredPaths.add(asset.path);
    if (!asset.source?.origin || typeof asset.source.url === 'undefined') fail(`${asset.id}: source provenance must state an origin and a URL or null.`);
    if (!asset.creator || !asset.license || !asset.attribution || !asset.replacementStatus || !asset.temporaryStatus) fail(`${asset.id}: creator/license/attribution/replacement/temporary status must be explicit.`);
    if (typeof asset.temporary !== 'boolean') fail(`${asset.id}: temporary must be a boolean.`);
    if (!Array.isArray(asset.intendedUse) || !asset.intendedUse.length) fail(`${asset.id}: intendedUse must be a non-empty array.`);
    if (asset.acquiredOn !== null && !/^\d{4}-\d{2}-\d{2}$/.test(asset.acquiredOn)) fail(`${asset.id}: acquiredOn must be an ISO date or null with a note.`);
    try {
      const contents = await readFile(path.join(root, asset.path));
      if (!contents.length) fail(`${asset.id}: manifest target is empty: ${asset.path}.`);
      const header = contents.subarray(0, 12);
      const validFormat = asset.mimeType === 'font/woff2'
        ? header.subarray(0, 4).toString('ascii') === 'wOF2'
        : asset.mimeType === 'image/png'
          ? contents.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
          : asset.mimeType === 'image/webp'
            ? header.subarray(0, 4).toString('ascii') === 'RIFF' && header.subarray(8, 12).toString('ascii') === 'WEBP'
            : asset.mimeType === 'image/svg+xml'
              ? /<svg\b/.test(contents.subarray(0, 1000).toString('utf8'))
              : true;
      if (!validFormat) fail(`${asset.id}: file bytes do not match ${asset.mimeType}: ${asset.path}.`);
    } catch { fail(`${asset.id}: manifest target does not exist: ${asset.path}.`); }
    if (asset.licenseFile) {
      try { await stat(path.join(root, asset.licenseFile)); }
      catch { fail(`${asset.id}: referenced font/license notice is missing: ${asset.licenseFile}.`); }
    }
    if (asset.kind === 'image') {
      if (typeof asset.altText !== 'string') fail(`${asset.id}: image record must define altText (empty string is allowed for decorative art).`);
      if (!asset.dimensions?.width || !asset.dimensions?.height || !Number.isFinite(asset.aspectRatio)) fail(`${asset.id}: image dimensions and aspectRatio are required.`);
      else if (Math.abs(asset.aspectRatio - asset.dimensions.width / asset.dimensions.height) > 0.002) fail(`${asset.id}: aspectRatio does not match its dimensions.`);
    } else if (asset.kind === 'font') {
      if (asset.altText !== null || asset.dimensions !== null || asset.aspectRatio !== null) fail(`${asset.id}: font records must set altText, dimensions, and aspectRatio to null.`);
      if (!asset.licenseFile) fail(`${asset.id}: font record must point to its included license notice.`);
    } else fail(`${asset.id}: unsupported visual asset kind "${asset.kind}".`);
  }

  for (const [id, license] of Object.entries(manifest.licenses || {})) {
    if (!license.path || !license.title || !license.copyright || !license.source) fail(`Font license record is incomplete: ${id}.`);
    try { await stat(path.join(root, license.path)); }
    catch { fail(`Font license file is missing: ${license.path || id}.`); }
  }

  for (const [folder, prefix] of [['images', 'assets/images/'], ['fonts', 'assets/fonts/']]) {
    const files = await listTree(path.join(root, 'assets', folder));
    for (const filename of files.filter((file) => /\.(?:svg|png|jpe?g|webp|woff2)$/i.test(file))) {
      const expected = `${prefix}${escapePath(filename)}`;
      if (!declaredPaths.has(expected)) fail(`Static visual asset is absent from the manifest: ${expected}.`);
    }
  }
  if (await stat(path.join(root, 'assets/images/brand/eteriomn-mark.svg')).then(() => true).catch(() => false)) fail('The obsolete standalone mark file must be removed.');
  const wordmarkFile = path.join(root, 'assets/images/brand/eteriomn-wordmark.svg');
  try {
    const wordmark = await readFile(wordmarkFile, 'utf8');
    if (!/<text\b[^>]*>ETERIOMN<\/text>/.test(wordmark) || (wordmark.match(/<text\b/g) || []).length !== 1) fail('The favicon SVG must contain the ETERIOMN wordmark only, not a separate symbol or monogram.');
  } catch { fail('The text-only ETERIOMN wordmark SVG is missing.'); }
  ok(`${manifest.assets.length} image/font records and ${Object.keys(manifest.licenses || {}).length} license notices checked for provenance, status, alt text, dimensions, and replacement guidance.`);
}

async function htmlChecks() {
  const titles = new Map();
  const descriptions = new Map();
  for (const route of siteManifest.routes) {
    const relative = route === '/' ? 'index.html' : route.slice(1);
    const page = await loadHtml(relative);
    if (!page) continue;
    if (titles.has(page.title)) fail(`Duplicate page title: "${page.title}" in ${relative} and ${titles.get(page.title)}.`);
    else titles.set(page.title, relative);
    if (descriptions.has(page.description)) fail(`Duplicate meta description in ${relative} and ${descriptions.get(page.description)}.`);
    else descriptions.set(page.description, relative);
    const forbidden = ['href="#"', 'javascript:', 'lorem ipsum'];
    for (const phrase of forbidden) if (page.source.toLowerCase().includes(phrase)) fail(`${relative}: forbidden placeholder or unsafe pattern "${phrase}" found.`);
    if ((page.source.match(/<span class="brand-word">ETERIOMN<\/span>/g) || []).length < 2) fail(`${relative}: navigation and footer must both use the editable ETERIOMN wordmark.`);
    if (/(?:eteriomn-mark\.svg|brandMark|class="note-mark"|class="manifesto-symbol"|class="service-art-stamp"|class="distinction-mark")/i.test(page.source)) fail(`${relative}: obsolete brand mark, service emblem, or E. motif found.`);
  }
  const packageHtml = await readFile(path.join(root, 'package.json'), 'utf8');
  if (!packageHtml.includes('"type": "module"')) fail('package.json must keep native ES modules enabled.');
  ok(`${titles.size} HTML documents passed structural nesting, metadata, heading, ID, image, button, and label-reference checks.`);
}

async function syntaxChecks() {
  const folders = ['scripts', 'src/js', 'src/data', 'tests'];
  const files = [];
  async function collect(folder) {
    let entries;
    try { entries = await readdir(path.join(root, folder), { withFileTypes: true }); }
    catch { return; }
    for (const entry of entries) {
      const relative = path.join(folder, entry.name);
      if (entry.isDirectory()) await collect(relative);
      else if (/\.(?:mjs|js)$/.test(entry.name)) files.push(relative);
    }
  }
  for (const folder of folders) await collect(folder);
  for (const relative of files) {
    const absolute = path.join(root, relative);
    const result = spawnSync(process.execPath, ['--check', absolute], { encoding: 'utf8' });
    if (result.status !== 0) fail(`JavaScript syntax error in ${relative}: ${result.stderr || result.stdout}`);
    const source = await readFile(absolute, 'utf8');
    const imports = [...source.matchAll(/\bfrom\s+["'](\.{1,2}\/[^"']+)["']|\bimport\s*["'](\.{1,2}\/[^"']+)["']|\bimport\s*\(\s*["'](\.{1,2}\/[^"']+)["']/g)];
    for (const match of imports) {
      const specifier = match[1] || match[2] || match[3];
      const target = path.resolve(path.dirname(absolute), specifier);
      if (target !== root && !target.startsWith(`${root}${path.sep}`)) fail(`${relative}: relative import escapes the workspace: ${specifier}.`);
      else {
        try { await stat(target); }
        catch { fail(`${relative}: broken relative import ${specifier}.`); }
      }
    }
  }
  ok(`${files.length} native JavaScript modules passed node --check; relative imports resolved.`);
}

async function listTree(directory, relative = '') {
  const output = [];
  const entries = await readdir(path.join(directory, relative), { withFileTypes: true });
  for (const entry of entries) {
    const next = path.join(relative, entry.name);
    if (entry.isDirectory()) output.push(...await listTree(directory, next));
    else if (entry.isFile()) output.push(next);
  }
  return output;
}

async function deploymentChecks() {
  let checked = 0;
  const routes = siteManifest.routes.map((route) => route === '/' ? 'index.html' : route.slice(1));
  for (const relative of routes) {
    try {
      const [source, built] = await Promise.all([
        readFile(path.join(root, relative)),
        readFile(path.join(distRoot, relative))
      ]);
      if (!source.equals(built)) fail(`Production output differs from source route: dist/${relative}.`);
      checked += 1;
    } catch {
      fail(`Missing production route: dist/${relative}. Run npm run build.`);
    }
  }
  for (const folder of ['assets', 'src/css', 'src/js']) {
    let files;
    try { files = await listTree(path.join(root, folder)); }
    catch { fail(`Missing source static directory: ${folder}.`); continue; }
    for (const relative of files) {
      try {
        const [source, built] = await Promise.all([
          readFile(path.join(root, folder, relative)),
          readFile(path.join(distRoot, folder, relative))
        ]);
        if (!source.equals(built)) fail(`Production static file differs or is missing: dist/${folder}/${relative}.`);
      } catch { fail(`Missing production static file: dist/${folder}/${relative}.`); }
    }
  }
  for (const filename of ['manifest.webmanifest', 'robots.txt', 'sitemap.xml']) {
    try {
      const [source, built] = await Promise.all([
        readFile(path.join(root, filename), 'utf8'),
        readFile(path.join(distRoot, filename), 'utf8')
      ]);
      if (source !== built) fail(`Production metadata file differs: dist/${filename}.`);
      if (filename === 'manifest.webmanifest') JSON.parse(built);
    } catch { fail(`Missing or invalid production metadata file: dist/${filename}.`); }
  }
  ok(`${checked} HTML routes and copied static assets verified in the self-contained dist/ output.`);
}

if (!['all', 'routes', 'assets', 'links', 'html'].includes(mode)) {
  console.error('Usage: node scripts/validate.mjs [all|routes|assets|links|html]');
  process.exit(2);
}

if (mode === 'all' || mode === 'routes') await routeChecks();
if (mode === 'all' || mode === 'html') await htmlChecks();
if (mode === 'all' || mode === 'links') await linkChecks();
if (mode === 'all' || mode === 'assets') {
  await assetChecks();
  await visualManifestChecks();
}
if (mode === 'all') {
  await syntaxChecks();
  await deploymentChecks();
}

for (const note of notes) console.log(`✓ ${note}`);
if (errors.length) {
  console.error(`\n${errors.length} validation error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('All selected checks passed. Browser, screen-reader, and formal accessibility audits remain separate manual/host checks.');
}
