import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteManifest } from '../scripts/render-site.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relative) => readFile(path.join(root, relative), 'utf8');

function relativeLuminance(hex) {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(first, second) {
  const values = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test('the supplied palette tokens remain exact', async () => {
  const css = await readText('src/css/tokens.css');
  const expected = {
    '--color-bg': '#0b0b0d',
    '--color-surface': '#141419',
    '--color-raised': '#1c1c23',
    '--color-foreground': '#f3f0e8',
    '--color-muted': '#a5a1a0',
    '--color-accent': '#6757d9',
    '--color-accent-strong': '#5140be',
    '--color-highlight': '#d8a45b',
    '--color-border': '#2a2930'
  };
  for (const [token, value] of Object.entries(expected)) {
    const actual = css.match(new RegExp(`${token}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1]?.toLowerCase();
    assert.equal(actual, value, `${token} should match the supplied palette`);
  }
});

test('world labels use readable same-family accents on the ivory surface', async () => {
  const css = await readText('src/css/tokens.css');
  const paper = css.match(/--color-foreground:\s*(#[0-9a-f]{6})/i)?.[1];
  assert.ok(paper, 'the supplied foreground token defines the ivory paper surface');
  for (const token of ['--world-technology-paper', '--world-creative-paper', '--world-media-paper', '--world-marketing-paper', '--world-legal-paper']) {
    const value = css.match(new RegExp(`${token}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1];
    assert.ok(value, `${token} exists`);
    assert.ok(contrastRatio(value, paper) >= 4.5, `${token} meets 4.5:1 against the paper surface`);
  }
});

test('all generated routes use the editable wordmark without an independent mark', async () => {
  for (const route of siteManifest.routes) {
    const relative = route === '/' ? 'index.html' : route.slice(1);
    const html = await readText(relative);
    assert.ok((html.match(/<span class="brand-word">ETERIOMN<\/span>/g) || []).length >= 2, `${relative} has wordmark text in navigation and footer`);
    assert.doesNotMatch(html, /eteriomn-mark\.svg|brandMark|class="note-mark"|class="manifesto-symbol"|class="service-art-stamp"|class="distinction-mark"/i, `${relative} contains no old mark, service emblem, or E. motif`);
    assert.match(html, /rel="icon" href="\/assets\/images\/brand\/eteriomn-wordmark\.svg"/);
  }

  const favicon = await readText('assets/images/brand/eteriomn-wordmark.svg');
  assert.match(favicon, /<text\b[^>]*>ETERIOMN<\/text>/);
  assert.equal((favicon.match(/<text\b/g) || []).length, 1);
  assert.doesNotMatch(favicon, /<path\b|<circle\b|<polygon\b/);

  const webManifest = JSON.parse(await readText('manifest.webmanifest'));
  assert.equal(webManifest.icons[0].src, '/assets/images/brand/eteriomn-wordmark.svg');
  const socialCard = await readFile(path.join(root, 'assets/images/brand/eteriomn-social-card.png'));
  assert.equal(socialCard.toString('ascii', 1, 4), 'PNG');
  assert.equal(socialCard.readUInt32BE(16), 1200);
  assert.equal(socialCard.readUInt32BE(20), 630);
});

test('self-hosted typefaces include their local SIL Open Font License notices', async () => {
  const manifest = JSON.parse(await readText('assets/asset-manifest.json'));
  const fontAssets = manifest.assets.filter((asset) => asset.kind === 'font');
  assert.ok(fontAssets.length >= 6);
  for (const asset of fontAssets) {
    const font = await readFile(path.join(root, asset.path));
    assert.equal(font.toString('ascii', 0, 4), 'wOF2', `${asset.path} is WOFF2`);
    const license = await readText(asset.licenseFile);
    assert.match(license, /SIL OPEN FONT LICENSE Version 1\.1/i, `${asset.licenseFile} is included`);
  }
});
