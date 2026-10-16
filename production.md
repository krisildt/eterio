# Production handoff

This project is a static-site implementation, not a hosted service. Production requires a verified domain, owner/legal details, approved image rights, and a real inquiry-delivery decision that have not been supplied in the workspace.

## 1. Tooling and build

- Use a currently supported Node.js LTS version satisfying `package.json` (`>=20`).
- There are no npm runtime/development dependencies. The site uses HTML5, CSS3, and native ECMAScript modules only; no framework or mandatory bundler is used.
- `npm run build` generates the 49 HTML routes, including `/collaborations/spotlipse.html`, writes the 34-symbol service-art SVG atlas, and assembles a self-contained static `dist/` directory containing the routes, local assets, CSS, JavaScript, manifest, robots file, and sitemap.
- `npm run dev` builds and serves the workspace; `npm run preview` builds and serves `dist/`. Both use the included Node static server. `PORT` and `HOST` may be set as required by the host.
- The authoritative confirmed service inventory is 34 routes. The original brief's filename list contains 34 despite saying 35; no extra route is invented. See `docs/service-inventory.md`.

## 2. Domain, canonical URLs, and discovery

Before a production build, set `SITE_URL` to the verified HTTPS origin only—for example, `https://example.org` (no path, query, credentials, or fragment):

```sh
SITE_URL=https://your-verified-domain.example npm run build
```

This emits canonical URLs, Open Graph/Twitter image URLs, and the absolute sitemap location. If `SITE_URL` is unset, canonical/social URLs are omitted and the sitemap intentionally contains no placeholder host. Do not publish the placeholder example.

After deployment, check `/`, every `.html` route, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, the favicon, the social-card PNG, local fonts, stylesheet/module requests, and the host's 404 response over HTTPS. Confirm that direct requests to the exact `.html` routes are supported.

## 3. Contact delivery: not configured

The current project brief is **local only**. It performs native validation and prepares a text-file download in the user's browser. No network request is made, nothing is stored by this project, and nothing is sent to ETERIOMN. The interface uses explicit copy and never reports a successful inquiry.

Before receiving inquiries:

1. Choose and configure a real provider/backend or a verified secure email-delivery flow; none is present here.
2. Keep provider secrets off the client. Add server-side validation, abuse/spam controls, appropriate error states, and a tested privacy/data-retention process.
3. Update page copy and privacy/legal notices to match actual delivery, storage, processors, and retention.
4. Test successful, failed, duplicate, malicious, and unavailable-endpoint cases before representing the page as a working contact channel.

Until then, retain the local-draft explanation and do not describe the form as having sent information.

## 4. Legal and business details

Privacy, cookie, and terms pages are explicitly marked **draft / owner review required / not legally reviewed** and are `noindex`. Before launch, confirm the responsible legal entity, jurisdiction, monitored privacy contact, actual host and server-log behavior, any data processors, retention, applicable user rights, project terms, and intellectual-property language with qualified counsel. Replace bracketed owner placeholders only with verified information. Do not publish a draft as a reviewed policy.

The IP-support service pages describe practical organization and briefing assistance only. They do not promise legal advice, filings, representation, or a guaranteed result.

## 5. Artwork and licensing release gate

Read `assets/ASSET-MANIFEST.md` and `assets/asset-manifest.json` before approving imagery. Fonts include their local SIL Open Font License 1.1 notices. The service atlas is generated from repository SVG definitions. Several inherited/local WebP assets lack retained source, creator, generation, or license evidence; the hero and Nocturne records identify known AI-generation context but not model/session or commercial terms. World images, Signal House, and Object Study 03 are recorded as unknown where the workspace does not establish origin. They are provisional—not automatically production-cleared by being local or visually original.

Before commercial publication, have the owner confirm rights/source and platform terms for every provisional visual asset—including the active Lab fallback, both social-card derivatives, and the three new collaboration illustrations—or replace it with documented original/authorized material. Keep concept studies labeled fictional and collaboration art labeled illustrative; do not use them as client evidence or official project assets. Update the manifest for any replacement, including exact source, creator, license, attribution, alt text, dimensions, intended routes, and temporary status.

### Collaboration page: attribution and owner confirmation

The ETERIOMN × Spotlipse collaboration claim is supplied by the site owner's brief. The public Spotlipse project page and collaboration page checked on 2026-10-15 credit Beyond Outpost to Spotlipse × Trion Tech and do not list ETERIOMN. The ETERIOMN page therefore describes only a collaboration around visual direction and keeps specific responsibilities configurable/unspecified; it does not claim that ETERIOMN developed the game or owns its IP. Before release, obtain owner confirmation of the relationship, public wording, partner-name use, and any agreed scope. Recheck the current project attribution and the editable `In development` status in `src/data/collaboration.js`; do not add an unverified release date. The page's external project and partner destinations are recorded there and must be rechecked before launch.

The three local WebP concepts were AI-generated with Arena.ai image generation on 2026-10-15 and are explicitly not official Beyond Outpost art, screenshots, gameplay, or confirmed assets. Their model/version, prompt record, and generation-tool terms were not retained. Confirm the applicable output-use terms and owner approval before public/commercial release; replace with artwork only when authorization is documented. Do not hotlink or republish the partner's public art without permission.

## 6. Static hosting and headers

- **Netlify:** the included `netlify.toml` runs `npm run build` and publishes `dist/`.
- **Vercel:** set build command to `npm run build` and output directory to `dist`; the included `vercel.json` supplies headers.
- The current provider configuration applies `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS, caching rules, and a restrictive same-origin Content Security Policy. Review the actual provider response headers, HTTPS, cache behavior, and CSP after deployment. If scripts, fonts, images, embeds, or a contact provider are added, update the relevant CSP directive deliberately rather than loosening it globally.
- No API, serverless function, analytics, tracking pixel, or third-party embed is included.

## 7. Build and regression checks

Run before release:

```sh
npm run build
npm run validate
npm test
```

The checks cover route counts/content, unique route metadata, local asset/link/fragment resolution, basic HTML nesting and required attributes, structured image/font provenance fields, JavaScript syntax/imports, and parity between `dist/` and the generated source routes/assets. The included checks are regression safeguards, not proof of visual quality, full HTML conformance, accessibility, browser compatibility, or performance.

The local Chromium visual/responsive, interaction, no-JavaScript, reduced-motion, and automated axe checks completed on 2026-10-14 covered the prior 48-route baseline before `/collaborations/spotlipse.html` was added. The follow-up build/tests are recorded separately in `docs/qa.md`; the new route and the updated home/work/service surfaces have not received an in-browser visual, responsive, screen-reader, or axe review in this environment. Before launch, verify those surfaces at the requested widths, run the Nu HTML Checker, review with a screen reader, perform formal accessibility and cross-browser/device checks, and measure production performance. Do not claim conformance or performance results without those checks.

## 8. Pre-launch checklist

- [ ] Verify the production hostname and rebuild with `SITE_URL`.
- [ ] Confirm or replace all provisional raster art; keep `assets/asset-manifest.json` accurate.
- [ ] Confirm the owner-supplied Spotlipse collaboration claim, wording/scope, current project attribution/status, partner-name use, and external URLs; keep development credit to Spotlipse × Trion Tech distinct.
- [ ] Decide whether the static local draft is sufficient or integrate and test real contact delivery.
- [ ] Confirm legal entity, privacy contact, host log behavior, jurisdiction, and reviewed legal text.
- [ ] Confirm the missing 35th service and exact route name if the owner expects one; otherwise retain the honest 34-route statement.
- [ ] Run build, regression, route/link, JSON/XML/SVG checks.
- [ ] Perform real browser/responsive, keyboard, reduced-motion, screen-reader, formal accessibility, and performance checks; record findings instead of inferring them from source review.
- [ ] Verify deployment headers, HTTPS, caching, 404 handling, metadata, and sitemap on the production host.
