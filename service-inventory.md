# Service route inventory

## Confirmed count: 34

The supplied brief repeatedly calls for 35 services, but its authoritative filename manifest names only 34. The earlier department list also names 34: 8 Technology + 8 Creative + 7 Media + 7 Marketing + 4 Legal Support.

The supplied filename list and current registry do not identify an owner-confirmed name or exact route for another service. **No 35th service or filename has been invented.** The registry and static generator are data-driven; when the owner confirms the additional service name and exact filename, add one record to `src/data/services.js`, include it in the matching `worlds[].services` list, update the explicit count checks in `scripts/build.mjs` and `tests/data.test.mjs`, and rebuild.

| World | Count | Routes |
|---|---:|---|
| Technology | 8 | `web-development.html`, `web-applications.html`, `mobile-apps.html`, `desktop-software.html`, `game-development.html`, `ai-solutions.html`, `saas-products.html`, `automation-systems.html` |
| Creative | 8 | `graphic-design.html`, `brand-identity.html`, `logo-design.html`, `uiux-design.html`, `motion-graphics.html`, `3d-modeling.html`, `3d-animation.html`, `product-visualization.html` |
| Media | 7 | `video-editing.html`, `commercial-videos.html`, `music-videos.html`, `sound-design.html`, `audio-production.html`, `song-production.html`, `podcast-production.html` |
| Marketing | 7 | `social-media.html`, `content-creation.html`, `seo.html`, `advertising-campaigns.html`, `meta-ads.html`, `google-ads.html`, `influencer-marketing.html` |
| Legal support | 4 | `copyright.html`, `trademark.html`, `brand-protection.html`, `licensing-support.html` |

Routes live in `pages/services/`. They are exact filenames from the confirmed list.
