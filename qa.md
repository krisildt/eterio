# QA record — 2026-10-14 baseline and 2026-10-15 collaboration follow-up

## 2026-10-16 Phase 3 defect remediation

Phase 3 repaired the four evidence-backed issues—zero-height Digital Lab canvas, gallery Previous/Next accessible names, inconsistent root-level 404, and mobile CLS—without changing the static HTML/CSS/Vanilla JS/native-module architecture or introducing project dependencies. The detailed A–K report is [`ETERIOMN-phase-3-audit-report.md`](../ETERIOMN-phase-3-audit-report.md); new baseline and post-fix browser evidence is isolated in [`audit-evidence-phase-3/`](../audit-evidence-phase-3/). The historical Phase 2 report/evidence remain separate.

- Baseline hashes and browser/HTTP/static evidence were captured before edits. The workspace has no Git repository; hashes are the change record for files listed at baseline. `tests/routes.test.mjs` was edited but omitted from the baseline hash list; its current hash and limitation are recorded in `postfix-source-hashes.json`.
- Post-fix browser matrix: all 49 manifest routes, including all 34 confirmed service details, at 390 × 844 and 1440 × 1000 (**98 combinations**); all returned HTTP 200, with no horizontal overflow, page/console errors, or failed requests. This is a two-width all-route browser retest, not a nine-width matrix or full manual visual audit of every route.
- Digital Lab: visible Canvas artwork, matching CSS/backing dimensions, responsive resize, fallback, controls, and no overflow at 320, 360, 390, 430, 768, 1024, 1280, 1440, and 1920 px. Reduced-motion slider/reset scheduled no Lab animation frames after focus scrolling settled. Synthetic visibility/pagehide tests verified cleanup; real background-tab and GPU-loss states were not induced.
- Gallery: visible Previous/Next labels are preserved in accessible names; mouse, arrow-key navigation, wrap, focus/open/close/reopen, and repeated axe checks were exercised. Focused scans reported zero violations; this is not a WCAG conformance claim.
- Comparable local CLS sample: baseline peak 0.074 on four of eight 390 × 844 routes; post-fix sample 0.000 on all eight. This is not field Core Web Vitals.
- Contact remains local-only. Browser tests verified native invalid-field feedback, local text download with “not sent” wording, stale-download invalidation after edits, and a forced draft-creation error. No non-GET/HEAD request occurred. Online delivery is not configured.
- `npm test` passed 13/13; route/assets/links/HTML validators and targeted syntax checks passed. Full `npm run build` and `npm run validate` passed only in a disposable `/tmp` copy; no workspace build was run and `/home/user/dist/` remains absent.
- Launch blockers remain: Beyond Outpost art-rights/owner approval; Spotlipse copy and credit sign-off (keeping Spotlipse × Trion Tech’s distinct development credit); legal review/owner details; production HTTPS domain/canonical and sitemap/SEO setup; actual host 404 testing; and a real contact-delivery decision if online receipt is required. Cross-browser, screen-reader, formal accessibility, physical-device, and production/field-performance testing remain outstanding.

## 2026-10-15 collaboration integration follow-up

This follow-up records the ETERIOMN × Spotlipse transformation added after the browser-tested 48-route baseline below. Results in the 2026-10-14 section do **not** include the new collaboration route or its homepage, Work, and Game Development integrations.

- `npm run build` — passed; generated 49 HTML routes (47 content pages plus home and 404), preserved all 34 confirmed services, and assembled `dist/`.
- `npm run validate` — passed:
  - 49 route files and 49 HTML documents checked; one primary heading per document, IDs/ARIA references, image dimensions/alt, and structural nesting passed.
  - 3,290 local `href`/`src` references and fragments resolved.
  - 21 referenced static assets checked; the three collaboration concepts are local WebP files under 5 MB and appear in the structured provenance manifest.
  - 34 image/font asset records and three font-license notices checked; source, creator, license/status, alt text, dimensions, and replacement notes are present.
  - 18 native JavaScript modules passed `node --check`; relative imports resolved.
  - All 49 generated routes and copied assets in `dist/` verified.
- `npm test` — **13 passed, 0 failed**. Added collaboration-route/scope/attribution/asset tests and a mocked-DOM interaction test covering native-dialog open, previous/next controls, left/right keyboard navigation, wraparound, backdrop close, and focus restoration. This is not a real-browser interaction test.
- `tinycss2` parsed all six project stylesheets with no stylesheet or nested media/supports syntax errors.
- Rendered the dedicated canonical URL and page-specific Open Graph/Twitter image type, dimensions, and alt metadata under a temporary test `SITE_URL`; the real production origin remains unset.
- Static preview HTTP smoke test — `/`, `/collaborations/spotlipse.html`, `/pages/work/index.html`, `/pages/services/game-development.html`, the collaboration WebP, the new stylesheet, and gallery module returned 200 with expected content types; an unknown route returned the designed 404. Static-server security headers were present.

### Not verified for the new collaboration surfaces

No Chromium, Firefox, WebKit, or other browser executable is available in the current environment. Therefore the new route and the updated Home, Work, and Game Development layouts have **not** been visually inspected or viewport-tested at 320, 360, 390, 430, 768, 1024, 1280, 1440, or 1920 px. Real-browser image rendering, horizontal overflow, console/request errors, keyboard/focus behavior, JavaScript-disabled fallback, reduced-motion behavior, and axe/screen-reader results for these additions are not claimed. The prior 2026-10-14 Playwright/axe results below apply only to the old 48-route baseline. Use the live preview for review and complete these checks before release.

## Scope and workspace state

This was a continuation of the existing static-site project, not a restart. The project already contained the 48-route build system, 34 confirmed service pages, shared CSS/JS, procedural service SVGs, and its existing visual assets. The specifically named `nocturne.png`, `signal-house.png`, `object-study-03.png`, `home-full.png`, and `service-mobile-top.png` source screenshots were not present in the workspace. The existing 1200 × 630 `eteriomn-social-card.png` was inspected; it is a wordmark-only card. To review the actual rendered pages, temporary Playwright captures with the requested screenshot names were generated in `.qa-review/` and reviewed; they were QA captures, not replacements for source artwork or production assets.

In the original 2026-10-14 baseline pass, no verified HTML, CSS, JavaScript, asset, route, or interaction defect was found, so no site-source code was changed during that pass. The outdated responsive-verification sentence in `docs/art-direction.md` was aligned with its browser results. Temporary captures, audit scripts, and test-only downloads are not part of the website.

## Build and regression checks

- `npm run build` — passed; generated **48 HTML routes** (46 content pages plus home and 404), the 34-symbol service-art atlas, and the static `dist/` output.
- `npm run validate` — passed:
  - 48 route files and 48 HTML documents checked; 34 confirmed services across five worlds and three fictional concept studies.
  - 3,068 local `href`/`src` references resolved; internal HTML/SVG fragments checked.
  - 18 referenced static assets checked; no required image exceeds 5 MB.
  - 31 image/font records and three font-license notices checked for provenance fields, status, alt text, dimensions, and replacement guidance.
  - 15 native JavaScript modules passed `node --check`; relative imports resolved.
  - All 48 generated routes and copied static assets in `dist/` verified.
- `npm test` — **10 passed, 0 failed**. Tests cover the exact supplied palette, readable paper accents, wordmark-only identity, font-license notices, 34 differentiated service records and atlas symbols, fictional study labels, generated routes, and the deliberate absence of an unconfirmed 35th service.
- Additional parsing — all five CSS files parsed with `tinycss2`; 14 SVGs and both source/dist sitemap XML files parsed; JSON parsing passed for four project configuration/manifest files.
- HTTP preview — `/` returned 200 with `X-Content-Type-Options: nosniff`; an unknown route returned 404. The preview server's security headers were present.

## Rendered-browser, responsive, and accessibility checks

The local static preview was tested with Chromium **156.0.8078.4**, Playwright **1.64.0**, on Linux. Playwright and axe-core were used temporarily for QA and were not added as project dependencies.

- Visually reviewed rendered captures of the 1440 px homepage hero and full page, all three full-page fictional studies (Nocturne, Signal House, Object Study 03), and the top of a 390 px Web Development service detail page. The social-card PNG was also inspected. These checks confirmed distinct study imagery and labels, readable editorial hierarchy, and the intended dark/ivory palette; no source-image substitutions were made.
- Loaded all **48 routes at 10 viewport widths**—320, 360, 390, 520, 760, 1000, 1001, 1200, 1440, and 1920 px—for **480 route/viewport combinations**. All route responses succeeded; **zero horizontal-overflow cases**, zero browser-console/page errors, and zero failed requests were observed.
- Scrolled through and checked lazy-loaded images on the homepage, service index, work index, Nocturne study, and Digital Lab; all sampled images loaded. The three full-page study captures also rendered their distinct hero visuals.
- Ran axe-core **4.14.0** against all 48 routes at both 1440 px and 390 px, using WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA, and best-practice tags: **96 route/viewport scans, zero automated violations**. Separate scans of the open desktop menu, open mobile dialog, work filters, prepared local brief, open FAQ, working Lab controls, and forced canvas-fallback state also reported zero violations.

### Interaction and fallback checks

- Desktop service-world menu opens with focus on its first link, reports its expanded state, closes with Escape, and returns focus to its toggle.
- Mobile native dialog opens with focus on its close button, exposes the expanded state, locks background scrolling, then closes with Escape, restores focus, and unlocks scrolling.
- Work filters show one Technology study, one Creative study, and all three studies for All; the pressed state and live result count update correctly.
- The contact form rejects an initially incomplete brief through native constraints. A valid test brief downloaded as `eteriomn-project-brief.txt`; its content says it has **not** been sent. Editing the brief invalidates the old download link. No non-GET request was made; delivery remains local-only.
- Native FAQ details opened with Space and closed with Enter.
- Under reduced-motion emulation, the Lab range still responded to ArrowRight and Reset returned it to 50. When the 2D canvas context was forced unavailable, the static SVG remained visible and the canvas controls stayed hidden.
- At 390 px with JavaScript disabled, the primary navigation remained visible, the local form stayed hidden, its `<noscript>` notice was visible, and the document did not overflow.

## Not verified / release gates

- Browser testing was on Chromium/Linux only. Firefox, WebKit, physical devices, full manual keyboard review, and screen-reader behavior have not been tested.
- Axe is an automated scan, not a conformance certification. The Nu HTML Checker, formal accessibility review, exhaustive manual contrast/state review, Lighthouse/Core Web Vitals, and production performance were not claimed.
- `SITE_URL` remains unset. Canonical/social URLs are omitted, and the sitemap intentionally has no production hostname until the owner confirms one.
- The contact form does not send or store inquiries. A real delivery provider/backend and corresponding privacy/data-retention process remain owner decisions.
- Some image-source and usage-rights evidence remains incomplete. Local presence and successful rendering do not establish commercial permission; see `assets/ASSET-MANIFEST.md`, `assets/asset-manifest.json`, and `docs/production.md`.
- Legal/business owner details and review of draft legal notices remain outstanding. The 35th service is unconfirmed; no extra route was invented.

## Remaining owner decisions

1. Confirm the production HTTPS origin and rebuild with `SITE_URL`.
2. Confirm rights/source and platform terms for provisional images, or replace them with documented original/authorized art; update the asset manifest.
3. Choose and configure real contact delivery only if online inquiry receipt is required; update privacy and retention language to match.
4. Confirm whether a 35th service exists and, if so, supply its exact name and route.
5. Confirm legal entity, privacy contact, host/log retention, and governing jurisdiction; obtain review of draft legal notices.
6. Before release, complete cross-browser/device, screen-reader, formal accessibility, and production-performance checks and record their results.
