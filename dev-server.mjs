import { createServer } from 'node:http';
import { realpath, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rootArgIndex = process.argv.indexOf('--root');
const requestedRoot = rootArgIndex >= 0 ? process.argv[rootArgIndex + 1] : '.';
const serveRoot = path.resolve(projectRoot, requestedRoot || '.');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';

const MIME = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.css', 'text/css; charset=utf-8'], ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'], ['.json', 'application/json; charset=utf-8'], ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.svg', 'image/svg+xml'], ['.webp', 'image/webp'], ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'],
  ['.avif', 'image/avif'], ['.gif', 'image/gif'], ['.ico', 'image/x-icon'], ['.xml', 'application/xml; charset=utf-8'], ['.txt', 'text/plain; charset=utf-8'],
  ['.woff', 'font/woff'], ['.woff2', 'font/woff2'], ['.mp4', 'video/mp4'], ['.webm', 'video/webm'], ['.mp3', 'audio/mpeg'], ['.wav', 'audio/wav']
]);

const isWithin = (parent, child) => child === parent || child.startsWith(`${parent}${path.sep}`);

function isPublicPath(relativePath) {
  const parts = relativePath.split(path.sep).filter(Boolean);
  if (parts.some((part) => part.startsWith('.'))) return false;
  if (parts.length === 1 && ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'manifest.webmanifest'].includes(parts[0])) return true;
  if (parts[0] === 'assets') return true;
  if (parts[0] === 'pages') return true;
  if (parts[0] === 'collaborations') return true;
  if (parts[0] === 'src' && ['css', 'js'].includes(parts[1])) return true;
  return false;
}

function securityHeaders(response) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  response.setHeader('Cache-Control', 'no-store');
}

async function tryFile(candidate, rootReal) {
  let realPath;
  try {
    realPath = await realpath(candidate);
    if (!isWithin(rootReal, realPath)) return null;
    const details = await stat(realPath);
    if (!details.isFile()) return null;
    return { realPath, details };
  } catch {
    return null;
  }
}

async function sendNotFound(request, response, rootReal) {
  const notFound = await tryFile(path.join(serveRoot, '404.html'), rootReal);
  if (notFound) {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    if (request.method === 'HEAD') response.end();
    else createReadStream(notFound.realPath).pipe(response);
    return;
  }
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(request.method === 'HEAD' ? undefined : 'Not found.');
}

const rootReal = await realpath(serveRoot);
const server = createServer(async (request, response) => {
  securityHeaders(response);
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', Allow: 'GET, HEAD' });
    response.end('Method not allowed.');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
  } catch {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Bad request path.');
    return;
  }
  if (pathname.includes(String.fromCharCode(0)) || pathname.includes(String.fromCharCode(92))) {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Bad request path.');
    return;
  }

  let relativePath = path.normalize(pathname.replace(/^\/+/, ''));
  if (relativePath === '.' || relativePath === path.sep) relativePath = '';
  if (pathname.endsWith('/')) relativePath = path.join(relativePath, 'index.html');
  else if (!relativePath) relativePath = 'index.html';
  if (relativePath.startsWith(`..${path.sep}`) || relativePath === '..' || !isPublicPath(relativePath)) {
    await sendNotFound(request, response, rootReal);
    return;
  }

  let candidate = path.resolve(serveRoot, relativePath);
  if (!isWithin(rootReal, candidate)) {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end('Not found.');
    return;
  }

  let found = await tryFile(candidate, rootReal);
  if (!found) {
    try {
      const directory = await stat(candidate);
      if (directory.isDirectory()) {
        candidate = path.join(candidate, 'index.html');
        found = await tryFile(candidate, rootReal);
      }
    } catch { /* fall through to the 404 document */ }
  }

  if (!found) {
    await sendNotFound(request, response, rootReal);
    return;
  }

  const contentType = MIME.get(path.extname(found.realPath).toLowerCase()) || 'application/octet-stream';
  response.writeHead(200, { 'Content-Type': contentType, 'Content-Length': found.details.size });
  if (request.method === 'HEAD') response.end();
  else createReadStream(found.realPath).on('error', () => {
    if (!response.headersSent) response.writeHead(500);
    response.end();
  }).pipe(response);
});

server.listen(port, host, () => {
  console.log(`ETERIOMN static server: http://${host}:${port}`);
  console.log(`Public root: ${serveRoot}`);
  console.log('Allowed public paths: /, /pages/*, /collaborations/*, /assets/*, /src/css/*, /src/js/*');
});

server.on('error', (error) => {
  console.error('Static server failed:', error.message);
  process.exitCode = 1;
});
