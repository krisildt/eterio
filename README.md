# ETERIOMN

A complete, framework-free website for a polymath digital studio and ecosystem lab. The public frontend is static HTML, CSS, and native ECMAScript modules — no React, Vite, mandatory bundler, or runtime framework.

## Run locally

**Requirements:** Node.js 20 or newer; use a currently supported LTS release for deployment. There are no npm runtime or development dependencies.

```sh
npm install
npm run dev
```

`npm run dev` regenerates the static routes and deployment output, then starts the local HTTP server on `http://localhost:4173` (binds to `0.0.0.0`). To use another port, set `PORT=8080`. The server only exposes public site routes, assets, CSS, and JavaScript; project data, scripts, package files, and dotfiles are not served.

## Build and preview

```sh
npm run build
npm run preview
```

`npm run build` generates deployable HTML under `pages/` and a self-contained `dist/` directory. `npm run preview` builds first, then serves `dist/`. The output uses root-relative URLs and can be deployed as a static site.

To generate canonical links and an absolute XML sitemap after the production domain is known:

```sh
SITE_URL=https://your-real-domain.example npm run build
```

Use the actual HTTPS origin only, with no path. `SITE_URL` is intentionally unset in this workspace: canonical URLs are omitted, and the sitemap is an empty valid shell until the real domain is supplied. Replace the example above with the verified production domain; do not publish a placeholder domain.

## Project map

- `index.html`, `404.html` — home and not-found pages.
- `pages/` — generated, directly deployable routes for work, concept studies, studio, Lab, ecosystem, contact, legal drafts, services index, and service details.
- `collaborations/spotlipse.html` — dedicated ETERIOMN × Spotlipse page for Beyond Outpost, with source attribution, explicitly illustrative local concept art, and a native image viewer.
- `src/data/services.js` — service and department registry, distinct page copy, process steps, and FAQs.
- `src/data/projects.js` — fictional concept studies and centralized project image references.
- `src/data/collaboration.js` — editable collaboration scope, current status, verified project destinations, artwork dimensions, and alt text.
- `src/data/visuals.js` — shared favicon/social, hero, department, and Lab visual paths. The visible logo is editable `ETERIOMN` text in shared chrome.
- `src/css/` — exact palette/type tokens, shared components, editorial page layouts, and responsive rules.
- `src/js/` — native ES modules for navigation, project filters, the local brief, reveal enhancement, the progressive native-dialog collaboration gallery, and the optional Canvas Lab study.
- `src/data/service-illustrations.js` — 34 distinct procedural SVG plates and the source for the generated service atlas.
- `assets/` — local WebP/SVG artwork, a wordmark-only favicon, the separately maintained social-card SVG/PNG pair, and self-hosted WOFF2 fonts. See `assets/ASSET-MANIFEST.md` and `assets/asset-manifest.json` for provenance, licensing, alt text, intended use, status, and replacement guidance.
- `docs/art-direction.md`, `docs/production.md`, `docs/qa.md` — design decisions, production handoff, and the record of checks/limitations.
- `scripts/build.mjs` — validates the content registry, writes the static routes, and assembles `dist/`.
- `scripts/dev-server.mjs` — small Node static server with path traversal protections and an explicit public-path allowlist.
- `scripts/validate.mjs` — route, asset, internal-link, and generated-HTML checks.
- `tests/` — Node’s built-in test suite.
- `netlify.toml`, `vercel.json` — static deployment settings and compatible security headers.

## Implemented routes

- `/` — complete homepage.
- `/pages/work/index.html` — concept portfolio with working category filters and a separately labeled collaboration feature.
- `/collaborations/spotlipse.html` — ETERIOMN × Spotlipse / Beyond Outpost project page; the game's public development attribution remains Spotlipse × Trion Tech, while ETERIOMN's specific scope is configurable and not over-specified.
- `/pages/projects/nocturne.html`, `/pages/projects/signal-house.html`, `/pages/projects/object-study-03.html` — original fictional case studies, explicitly labeled speculative.
- `/pages/services/index.html` — five-department service directory.
- `/pages/services/{service-slug}.html` — all **34 confirmed** service routes listed in `docs/service-inventory.md`.
- `/pages/studio/index.html`, `/pages/ecosystem/index.html`, `/pages/lab/index.html`, `/pages/contact/index.html`.
- `/pages/legal/privacy-policy.html`, `/pages/legal/cookie-policy.html`, `/pages/legal/terms.html` — clearly marked owner-review drafts.
- `/404.html` — designed not-found page.

### Service inventory discrepancy

The brief says 35 service pages but its authoritative filename list contains 34, and its five department lists also total 34. The supplied route list and current registry do not identify an owner-confirmed additional service. The site implements the confirmed 34 and does not invent a 35th route. Add the confirmed name and exact filename to `src/data/services.js` and the count checks once supplied. See `docs/service-inventory.md`.

## Functional notes and honest limitations

- Responsive navigation, Escape/focus handling, working concept-study filters, native FAQ accordions, the optional pointer/keyboard-controlled Lab canvas, and an accessible native-dialog collaboration gallery are implemented. The gallery falls back to direct image links; core content remains available without JavaScript, Canvas has a static SVG fallback, and reduced-motion preferences limit animation.
- The contact form uses native validation and prepares a downloadable text draft **locally in the browser only**. There is no email provider, backend, or storage endpoint configured, so nothing is transmitted and the UI never claims a message was sent. Connect and test a real submission endpoint before using it to receive inquiries; do not add secrets to browser code.
- The three portfolio examples are fictional concept studies, not client work. No testimonials, customer outcomes, campaign metrics, awards, or social links are fabricated.
- The ETERIOMN × Spotlipse collaboration claim is supplied by the site owner. Spotlipse's public project page checked on 2026-10-15 credits Beyond Outpost development to Spotlipse × Trion Tech and does not list ETERIOMN; this site distinguishes that credit and does not claim ETERIOMN developed the game. Specific responsibilities remain configurable/unspecified. Its three generated images are clearly labeled illustrative, not official Beyond Outpost art; generation-tool terms and owner release approval remain provisional.
- Legal pages are implementation drafts, not lawyer-reviewed policies. Confirm the legal entity, jurisdiction, production host, data retention, privacy contact, and terms before publication.
- No production domain, public email, phone, address, or social destinations were supplied. Canonical URLs and absolute sitemap entries remain unconfigured until `SITE_URL` is set.
- The type system is self-hosted: Space Grotesk for the wordmark/display face, Inter for body/interface text, and IBM Plex Mono for technical labels. Their SIL Open Font License 1.1 notices are included under `assets/fonts/`; source, attribution, and usage notes are recorded in `assets/asset-manifest.json`.
- The visible ETERIOMN logo is plain editable text, with no separate icon or monogram. The favicon and social card repeat the wordmark where image metadata requires artwork.
- Several inherited/local raster images and the Lab fallback SVG have incomplete source, creator, generation, or license records. The hero and Nocturne artwork are identified by existing project notes as AI-generated, but their model/session and commercial-use terms were not retained; the world images, Signal House, Object Study 03, and Lab fallback sources are recorded as unknown where evidence is absent. These assets and the social-card derivatives are marked provisional in the register and require owner rights confirmation or replacement before commercial publication. The generated service-art atlas has repository source definitions.

## Validation

```sh
npm run validate
npm run check:routes
npm run check:assets
npm run check:links
npm run check:html
npm test
```

These commands check generated routes and content counts, referenced local assets, internal links and fragments, HTML structure/metadata/IDs/image attributes, and registry invariants. They do not replace browser testing, a screen-reader review, a formal WCAG audit, or a complete validator such as the Nu HTML Checker.

## Deployment

### Netlify

The provided `netlify.toml` runs `npm run build` and publishes `dist/`. Set `SITE_URL` as a build environment variable once the production hostname is verified. Review the host’s final headers and HTTPS setup.

### Vercel

Use the root project, set the build command to `npm run build`, output directory to `dist`, and add the verified `SITE_URL` environment variable. `vercel.json` supplies compatible response headers; static `.html` files resolve directly and `404.html` is the not-found document. Review the final project settings and HTTPS behavior after deployment.

No serverless functions or backend are included. The production host should serve the static routes at their `.html` paths and use the provided 404 file.
