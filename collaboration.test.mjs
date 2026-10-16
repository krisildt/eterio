import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spotlipseCollaboration } from '../src/data/collaboration.js';
import { siteManifest } from '../scripts/render-site.mjs';
import { initCollaborationGallery } from '../src/js/features/collaboration-gallery.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relative) => readFile(path.join(root, relative), 'utf8');

function makeElement({ attributes = {}, dataset = {}, sourceImage = null } = {}) {
  const listeners = new Map();
  return {
    attributes,
    dataset,
    sourceImage,
    isConnected: true,
    focused: false,
    addEventListener(type, callback) {
      const list = listeners.get(type) || [];
      list.push(callback);
      listeners.set(type, list);
    },
    emit(type, event = {}) {
      for (const callback of listeners.get(type) || []) callback(event);
    },
    getAttribute(name) { return attributes[name] ?? null; },
    querySelector(selector) { return selector === 'img' ? sourceImage : null; },
    focus(options) { this.focused = true; this.focusOptions = options; },
    listeners
  };
}

test('the collaboration is routed, separately labeled, and linked from the relevant site surfaces', async () => {
  const route = spotlipseCollaboration.route;
  assert.ok(siteManifest.routes.includes(route));
  assert.equal(siteManifest.services.length, 34);
  const page = await readText('collaborations/spotlipse.html');
  const home = await readText('index.html');
  const work = await readText('pages/work/index.html');
  const gameService = await readText('pages/services/game-development.html');

  assert.match(page, /<title>ETERIOMN × Spotlipse — Beyond Outpost<\/title>/);
  assert.match(page, /<meta name="description" content="[^"]{50,}"\s*\/>/);
  assert.match(page, /eteriomn-world-01\.webp|beyond-outpost-world-01\.webp/);
  assert.match(page, /creative collaboration/i);
  assert.equal(spotlipseCollaboration.status, 'In development', 'status is editable in the collaboration data module');
  assert.match(page, /PROJECT STATUS \/ IN DEVELOPMENT/);
  assert.match(page, /Development credit<\/dt><dd>Spotlipse × Trion Tech<\/dd>/);
  assert.doesNotMatch(page, /developed by ETERIOMN/i);
  assert.doesNotMatch(page, /January 2027/i);
  assert.match(page, /NOT OFFICIAL GAME ART/);
  assert.match(page, /data-collab-lightbox/);
  assert.match(page, /id="collab-lightbox"/);
  assert.match(page, /<button type="button" data-lightbox-previous>Previous image<\/button>/, 'the previous button name comes from its visible label');
  assert.match(page, /<button type="button" data-lightbox-next>Next image<\/button>/, 'the next button name comes from its visible label');
  assert.doesNotMatch(page, /data-lightbox-(?:previous|next)[^>]*aria-label=/, 'the gallery controls do not override their visible names');
  assert.match(home, new RegExp(`href="${route.replaceAll('/', '\\/')}"`));
  assert.match(work, new RegExp(`href="${route.replaceAll('/', '\\/')}"`));
  assert.match(gameService, new RegExp(`href="${route.replaceAll('/', '\\/')}"`));
  assert.ok(home.includes(spotlipseCollaboration.developmentCredit), 'homepage keeps the public development credit visible');
  assert.ok(work.includes(spotlipseCollaboration.developmentCredit), 'Work feature keeps the public development credit visible');
  assert.ok(gameService.includes(spotlipseCollaboration.developmentCredit), 'Game Development panel keeps the public development credit visible');

  const projectLink = `href="${spotlipseCollaboration.externalProjectUrl}" target="_blank" rel="noopener noreferrer"`;
  assert.ok(page.includes(projectLink), 'external project destination has safe new-tab attributes');
  assert.ok(page.includes(`href="${spotlipseCollaboration.partnerUrl}" target="_blank" rel="noopener noreferrer"`));
  assert.doesNotMatch(page, /<(?:img|script|iframe)[^>]+(?:src|href)="https?:\/\//i, 'the page does not hotlink images or scripts');
  assert.match(work, /A separately labeled collaboration|separately labeled creative collaboration/i);
  assert.ok(gameService.includes(spotlipseCollaboration.collaborationNote), 'the Game Development panel uses the editable scope note');
});

test('all three local concepts have matching accessible metadata and provisional manifest records', async () => {
  const manifest = JSON.parse(await readText('assets/asset-manifest.json'));
  const declared = new Map(manifest.assets.map((asset) => [asset.path, asset]));
  const artworks = [spotlipseCollaboration.heroArtwork, ...spotlipseCollaboration.artworks];
  assert.equal(artworks.length, 3);
  for (const artwork of artworks) {
    const localPath = artwork.src.replace(/^\//, '');
    await assert.doesNotReject(access(path.join(root, localPath)));
    const asset = declared.get(localPath);
    assert.ok(asset, `${localPath} is present in the structured manifest`);
    assert.equal(asset.temporary, true);
    assert.match(asset.license, /terms and ownership are not confirmed/i);
    assert.match(asset.altText, /Pixel-art study/);
    assert.equal(asset.dimensions.width, artwork.width);
    assert.equal(asset.dimensions.height, artwork.height);
    assert.match(asset.attribution, /not official Beyond Outpost art/i);
  }
  const markdown = await readText('assets/ASSET-MANIFEST.md');
  assert.match(markdown, /Beyond Outpost collaboration/);
  assert.match(markdown, /Spotlipse × Trion Tech/);
});

test('the native-dialog gallery opens, navigates by keyboard/buttons, wraps, and restores focus', () => {
  const originalDocument = globalThis.document;
  const image = { src: '', alt: '', width: 0, height: 0 };
  const title = { textContent: '' };
  const caption = { textContent: '' };
  const counter = { textContent: '' };
  const viewerListeners = new Map();
  const viewerChildren = new Map();
  const viewer = {
    open: false,
    showModal() { this.open = true; },
    close() {
      this.open = false;
      this.emit('close', { target: this });
    },
    querySelector(selector) { return viewerChildren.get(selector) || null; },
    addEventListener(type, callback) {
      const list = viewerListeners.get(type) || [];
      list.push(callback);
      viewerListeners.set(type, list);
    },
    emit(type, event) {
      for (const callback of viewerListeners.get(type) || []) callback(event);
    }
  };
  const closeButton = makeElement();
  const previousButton = makeElement();
  const nextButton = makeElement();
  viewerChildren.set('[data-lightbox-image]', image);
  viewerChildren.set('[data-lightbox-title]', title);
  viewerChildren.set('[data-lightbox-caption]', caption);
  viewerChildren.set('[data-lightbox-counter]', counter);
  viewerChildren.set('[data-lightbox-close]', closeButton);
  viewerChildren.set('[data-lightbox-previous]', previousButton);
  viewerChildren.set('[data-lightbox-next]', nextButton);

  const sources = [
    ['/first.webp', 'First accessible scene', 100, 50],
    ['/second.webp', 'Second accessible scene', 80, 120],
    ['/third.webp', 'Third accessible scene', 140, 90]
  ];
  const triggers = sources.map(([src, alt, width, height], index) => {
    const sourceImage = { alt, getAttribute(name) { return name === 'width' ? String(width) : name === 'height' ? String(height) : null; } };
    return makeElement({
      attributes: { href: src },
      dataset: { imageTitle: `Scene ${index + 1}` },
      sourceImage
    });
  });

  globalThis.document = {
    querySelector(selector) { return selector === '[data-collab-lightbox]' ? viewer : null; },
    querySelectorAll(selector) { return selector === '[data-collab-image]' ? triggers : []; }
  };

  try {
    initCollaborationGallery();
    let prevented = false;
    triggers[0].emit('click', { button: 0, preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
    assert.equal(viewer.open, true);
    assert.equal(closeButton.focused, true);
    assert.equal(image.src, '/first.webp');
    assert.equal(image.alt, 'First accessible scene');
    assert.equal(image.width, 100);
    assert.equal(title.textContent, 'Scene 1');
    assert.equal(counter.textContent, '01 / 03');
    assert.match(caption.textContent, /not official game artwork/i);

    nextButton.emit('click');
    assert.equal(image.src, '/second.webp');
    viewer.emit('keydown', { key: 'ArrowRight', preventDefault() {} });
    assert.equal(image.src, '/third.webp');
    previousButton.emit('click');
    assert.equal(image.src, '/second.webp');
    viewer.emit('keydown', { key: 'ArrowLeft', preventDefault() {} });
    assert.equal(image.src, '/first.webp');
    previousButton.emit('click');
    assert.equal(image.src, '/third.webp', 'previous navigation wraps to the final image');

    closeButton.emit('click');
    assert.equal(viewer.open, false);
    assert.equal(triggers[0].focused, true, 'closing restores focus to the opening link');

    triggers[2].emit('click', { button: 0, preventDefault() {} });
    nextButton.emit('click');
    assert.equal(image.src, '/first.webp', 'next navigation wraps to the first image');
    viewer.emit('click', { target: viewer });
    assert.equal(viewer.open, false, 'backdrop click closes the viewer');
    assert.equal(triggers[2].focused, true);
  } finally {
    if (originalDocument === undefined) delete globalThis.document;
    else globalThis.document = originalDocument;
  }
});
