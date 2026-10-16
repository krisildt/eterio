import test from 'node:test';
import assert from 'node:assert/strict';
import { services, worlds, getRelatedServices } from '../src/data/services.js';
import { projects } from '../src/data/projects.js';
import { buildServiceArtAtlas, serviceIllustrationDescription } from '../src/data/service-illustrations.js';

const expected = {
  technology: ['web-development', 'web-applications', 'mobile-apps', 'desktop-software', 'game-development', 'ai-solutions', 'saas-products', 'automation-systems'],
  creative: ['graphic-design', 'brand-identity', 'logo-design', 'uiux-design', 'motion-graphics', '3d-modeling', '3d-animation', 'product-visualization'],
  media: ['video-editing', 'commercial-videos', 'music-videos', 'sound-design', 'audio-production', 'song-production', 'podcast-production'],
  marketing: ['social-media', 'content-creation', 'seo', 'advertising-campaigns', 'meta-ads', 'google-ads', 'influencer-marketing'],
  legal: ['copyright', 'trademark', 'brand-protection', 'licensing-support']
};

test('the confirmed service manifest contains exactly the 34 supplied routes', () => {
  assert.equal(services.length, 34);
  for (const [worldId, slugs] of Object.entries(expected)) {
    const world = worlds.find((item) => item.id === worldId);
    assert.ok(world, `world ${worldId} exists`);
    assert.deepEqual(world.services, slugs);
    assert.equal(services.filter((service) => service.world === worldId).length, slugs.length);
  }
});

test('each confirmed service has distinct copy and useful page content', () => {
  assert.equal(new Set(services.map((service) => service.slug)).size, services.length);
  assert.equal(new Set(services.map((service) => service.meta)).size, services.length);
  for (const service of services) {
    assert.ok(service.title && service.intro && service.meta && service.audience && service.challenge && service.difference, service.slug);
    assert.ok(service.deliverables.length >= 3, service.slug);
    assert.ok(service.faqs.length >= 2, service.slug);
    assert.equal(getRelatedServices(service).length, 3, service.slug);
  }
});

test('the generated service atlas has one distinct symbol for every confirmed service', () => {
  const atlas = buildServiceArtAtlas();
  const ids = [...atlas.matchAll(/<symbol id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, 34);
  assert.equal(new Set(ids).size, 34);
  for (const service of services) assert.ok(ids.includes(`service-${service.slug}`), service.slug);
  assert.equal(new Set(services.map((service) => serviceIllustrationDescription(service.slug))).size, 34);
});

test('all portfolio examples are explicitly speculative concept studies', () => {
  assert.equal(projects.length, 3);
  assert.ok(new Set(projects.map((project) => project.slug)).size === projects.length);
  for (const project of projects) {
    assert.ok(project.overview.toLowerCase().includes('fictional') || project.overview.toLowerCase().includes('speculative'));
    assert.ok(project.image.startsWith('/assets/images/'));
    assert.ok(project.services.length >= 2);
  }
});
