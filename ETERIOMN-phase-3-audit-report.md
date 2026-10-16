# ETERIOMN — Phase 3 remediation and QA report

**Audit date:** 16 October 2026  
**Status:** The four scoped, evidence-backed defects are repaired and verified in the local Chromium environment. This is not production approval; owner, legal, rights, domain/SEO, host, and (if required) contact-delivery gates remain.  
**Preview:** `http://127.0.0.1:4173` — local static server, no workspace build.

## A. Executive summary

Phase 3 continued the existing HTML5/CSS3/Vanilla JS/native-module project and addressed only the four agreed defects:

1. **Digital Lab zero-height canvas:** fixed the collapsed experiment frame and made the CSS and intrinsic canvas dimensions follow the measured frame on resize.
2. **Gallery button names:** the visible button text “Previous image” and “Next image” now forms the accessible name; no conflicting `aria-label` replaces it.
3. **Root-level 404:** local unknown-root, nested-route, and missing-asset requests now receive the designed 404 document with HTTP 404, without rewriting to home.
4. **Mobile CLS:** the enhanced header state is present in generated HTML from first paint, with a `<noscript>` stylesheet that restores a usable no-JS navigation layout. In the comparable local CLS sample, the prior 0.074 peak fell to 0.000 on all eight sampled routes.

Post-fix browser checks covered **49 routes at 390 × 844 and 1440 × 1000 (98 route/viewport combinations)**, and the Lab at all **nine requested widths**. All route combinations returned 200, had a title and primary heading, showed no horizontal overflow, and produced no recorded browser/page errors, console errors, or failed requests. Static tests and source validators passed; a full production-output build/validation also passed in a disposable copy, not in the workspace.

This does not claim a full visual re-audit, WCAG conformance, production-host behavior, field Core Web Vitals, online contact delivery, or production readiness. See Section J for the release gates.

## B. Baseline, preservation, and change controls

- Before source edits, I saved `audit-evidence-phase-3/baseline-source-hashes.json`, browser/HTTP results, baseline static-test output, and affected-page screenshots. The workspace has **no Git worktree**, so no `git diff` or repository history was available. The SHA-256 manifests compare every file listed at baseline and all 49 route documents. One edited test file, `tests/routes.test.mjs`, was not included in the original hash list; its current SHA is recorded in `postfix-source-hashes.json`, but no pre-edit hash is available for that file.
- Phase 2 artifacts remain in `audit-evidence-phase-2/` and were not used as Phase 3 output. New Phase 3 material is kept separately in `audit-evidence-phase-3/`.
- The workspace baseline `npm test` passed **13/13**. Baseline `npm run validate` passed source checks but stopped at deployment-output validation because `/home/user/dist/` did not exist. No workspace build was run to create or overwrite generated output.
- Scoped source changes: `scripts/dev-server.mjs`, `scripts/render-site.mjs`, `src/css/pages.css`, the Lab module, route/gallery tests, a new `src/css/no-js.css`, and exactly 49 generated route HTML files patched in place. The QA record was appended to `docs/qa.md`. Project dependency manifests and `netlify.toml` / `vercel.json` were not changed; no framework, build dependency, or new service route was added.
- The 34 confirmed service routes remain in the 49-route manifest. No unconfirmed 35th service was introduced. The wordmark-only identity and existing dark editorial art direction were retained; no emblem or unrelated redesign was added.

## C. Verification setup and coverage boundaries

| Item | Setup / coverage |
|---|---|
| Local site | Existing static preview, `http://127.0.0.1:4173` |
| Browser | Chromium `156.0.8078.4`, headless Linux |
| Automation / accessibility tools | Playwright `1.64.1`; axe-core `4.14.0`; both installed under `/tmp/eteriomn-phase3-tooling`, not as project dependencies |
| Runtime | Node `20.20.2` |
| All-route browser matrix | 49 manifest routes × 390 × 844 and 1440 × 1000 = **98** combinations, including all 34 service-detail routes |
| Digital Lab viewport matrix | CSS widths 320, 360, 390, 430, 768, 1024, 1280, 1440, and 1920 px; responsive heights documented in the Lab JSON/screenshots |
| Additional affected-page checks | Collaboration gallery at desktop/mobile; contact success/error/native validation; no-JS contact and Lab; local 404/missing asset; reduced motion, synthetic lifecycle events, and high-DPI Lab |

The all-route test is a browser render/status/overflow/error matrix at **two representative widths**—not a nine-width run on every route, and not a manual visual review of every page. The Lab alone received the nine requested widths. Selected affected-page screenshots were reviewed; no claim is made that every route, state, or intermediate breakpoint was visually inspected.

## D. Digital Lab: root cause, fix, and evidence

**Reproduced cause:** the canvas was absolutely positioned and therefore removed from normal flow, while `.experiment-frame` had no definite block size/aspect ratio. The parent consequently measured **0 px high** (`aspect-ratio: auto` in the pre-edit browser record); an absolutely positioned canvas could not provide the missing parent height. The canvas context existed, but there was no visible area in which to render.

**Fix:** the frame now reserves a **5:3 aspect ratio** in CSS before JavaScript runs. The resize routine measures the frame, synchronizes canvas CSS width/height and intrinsic backing dimensions, caps backing resolution at 1.5× DPR, and paints after resize. Because the canvas is absolute and the parent ratio is explicit, backing-store updates do not determine the frame’s layout size. The static SVG image remains the baseline/no-JS/failure fallback; interactive controls are shown only when the Canvas 2D context is usable.

| Viewport width | Frame / canvas CSS size (px) | Canvas backing store (px) | Visible artwork | Horizontal overflow |
|---:|---:|---:|---|---|
| 320 | 292.8 × 175.7 | 293 × 176 | Yes | No |
| 360 | 332.8 × 199.7 | 333 × 200 | Yes | No |
| 390 | 358 × 214.8 | 358 × 215 | Yes | No |
| 430 | 398 × 238.8 | 398 × 239 | Yes | No |
| 768 | 714.2 × 428.5 | 714 × 429 | Yes | No |
| 1024 | 952.3 × 571.4 | 952 × 571 | Yes | No |
| 1280 | 1177.6 × 706.5 | 1178 × 707 | Yes | No |
| 1440 | 1324.8 × 794.9 | 1325 × 795 | Yes | No |
| 1920 | 1500 × 900 | 1500 × 900 | Yes | No |

At each width the frame and canvas CSS boxes matched; sampled canvas pixels contained 42–89 distinct colors; the SVG fallback was hidden in the working-canvas state; controls were visible; and the next viewport resize changed both CSS and intrinsic dimensions. A DPR-2 check at 398 × 238.8 CSS px used a 597 × 358 backing store (approximately the 1.5× cap). No Lab console errors, page errors, or failed requests were recorded.

**Interaction/fallback/lifecycle checks:** pointer and keyboard slider input synchronized the range; ArrowRight changed 50 to 51, Reset returned it to 50, and pointer input set it to 24. With `getContext('2d')` forced to fail, the static fallback was visible and controls remained hidden. With JavaScript disabled, the fallback was visible at 320, 390, and 1440 px, the canvas/controls stayed hidden, and there was no overflow. Synthetic `contextlost`/`contextrestored` events switched to the fallback and back. Real GPU context loss was not induced.

**Reduced motion and lifecycle caveats resolved:** the first raw global RAF counter saw one frame after slider focus. The follow-up request-stack evidence shows that this was the header’s `navigation.js` scroll update after focus automatically scrolled the range into view—not a Lab tween. Once focus scrolling settled, reduced-motion slider input and reset scheduled **zero RAF callbacks**. The browser build did not support the attempted CDP background-visibility command; a synthetic `visibilitychange` with `document.hidden` overridden did cancel the pending animation frame. A synthetic `pagehide` canceled the next frame and disconnected the one observed `ResizeObserver`. These tests do not reproduce an actual background tab or operating-system lifecycle transition.

Evidence: `postfix-lab-results.json`, `postfix-reduced-motion.json`, `postfix-reduced-motion-investigation.json`, `postfix-hidden-cleanup.json`, `postfix-lab-no-js.json`, and `postfix-lab-{320,360,390,430,768,1024,1280,1440,1920}.png`.

## E. Collaboration gallery: names, interaction, focus, and axe

- Previous and Next controls now have visible text and matching accessible names: **“Previous image”** and **“Next image.”** The buttons have no overriding `aria-label`; exact role/name queries found one of each.
- Mouse clicks and ArrowLeft/ArrowRight changed images and wrapped at either end. Opening the viewer placed focus on “Close image viewer.” The close button, Escape key, and backdrop click closed the dialog; focus returned to the correct opening image link. Reopening from the third image showed the corresponding image/title and close-button focus.
- Keyboard navigation showed a **3 px solid amber `:focus-visible` outline** on gallery controls. Chromium reports the native `<dialog>` as modal while open. At the native Tab boundary, Chromium briefly reports `document.activeElement` as `BODY` before cycling to the first modal control; the background skip link was not focused. This is recorded as native Chromium focus-cycle behavior, not a claim about other browser engines or assistive technology.
- Repeated axe checks covered default and open gallery states at desktop and mobile widths: **zero reported violations**. The default desktop scan left `aria-valid-attr-value` and image-backed `color-contrast` checks incomplete (three nodes each); these are not confirmed violations, but the color-contrast items still need human review. Open-dialog scans had no incomplete rules. Focused axe checks also found zero violations in the tested contact states.

This is a focused interaction/axe result, not WCAG conformance. Screen-reader, voice-control, zoom, forced-colors, and full criterion-by-criterion testing remain outstanding.

Evidence: `postfix-interaction-results.json`, `postfix-gallery-wrap.json`, `postfix-gallery-focus.json`, `postfix-gallery-open-1440.png`, `postfix-gallery-open-390.png`, and `postfix-static-tests.txt`.

## F. 404 and static-server behavior

The local static server now returns the designed 404 HTML with HTTP 404 for unknown root paths and unknown nested routes. Browser requests for `/no-such-phase-3-root-route` and `/pages/services/no-such-phase-3-route.html` retained their requested paths, returned status 404, displayed “This page isn’t in the map,” and included the designed actions. Neither was rewritten to home. A missing image asset path returned the designed 404 document with HTTP 404; a request for `/package.json` also returned 404 without exposing project metadata. Existing `/`, `/404.html`, service-detail, collaboration, CSS, JavaScript, and representative image assets returned their expected 200 responses/content types.

The actual production host was not exercised. The current deploy configuration points Netlify to `dist`; no custom fallback rule was added. Official platform guidance indicates that a root `404.html` is used for unresolved static paths on both providers, but configuration and deployment behavior still need confirmation on the selected host: [Netlify routing documentation](https://docs.netlify.com/manage/routing/redirects/redirect-options/) and [Vercel custom 404 guidance](https://vercel.com/kb/guide/custom-404-page). These documents are not a substitute for a production deployment test, and the providers are not assumed to behave identically in every configuration.

Evidence: `postfix-interaction-results.json`, `postfix-404-root-390.png`, and `postfix-all-route-browser-results.json`.

## G. Route, responsive shell, and CLS retests

**All-route browser retest:** all **98/98** route/viewport combinations returned HTTP 200. Every page had a title and primary heading; `documentElement` and `body` had no horizontal overflow; and the run recorded zero page exceptions, console errors, or failed requests. Static route validation independently confirmed 49 route files and 34 confirmed service details. This route matrix does not imply nine-width testing of every route.

**Cause and fix:** the mobile header started in its expanded non-JS layout (about 136.3 px tall) and collapsed to the 69 px enhanced layout only when JavaScript added `js-ready`, shifting the main content upward by about 67 px. The generated HTML now starts in the enhanced layout to reserve the final geometry from first paint; a stylesheet inside `<noscript>` restores the visible non-JS navigation when scripts are disabled.

**Comparable CLS sample:** eight routes were measured in fresh 390 × 844, DPR-1 contexts with no throttling and a 1.2-second post-load window. Baseline recorded **0.074 on four routes** (Web Development, Work, Lab, Contact; the other four were 0). Post-fix recorded **0.000 on all eight routes**, with no shift entries. Header and main-content geometry remained at 69 px / y=69 px in the post-fix sample. This is a local lab sample, not field Core Web Vitals.

| Route sample | Before | After |
|---|---:|---:|
| Home | 0.000 | 0.000 |
| Services index | 0.000 | 0.000 |
| Web Development | 0.074 | 0.000 |
| Work index | 0.074 | 0.000 |
| Collaboration | 0.000 | 0.000 |
| Digital Lab | 0.074 | 0.000 |
| Contact | 0.074 | 0.000 |
| `/404.html` | 0.000 | 0.000 |

With JavaScript disabled at 390 px, the contact page kept all six primary links visible, hid JS-only menu toggles and the form, displayed the local-only `<noscript>` message, loaded the no-JS stylesheet, and had no horizontal overflow. The Lab’s JavaScript-disabled fallback was also checked at 320, 390, and 1440 px.

Evidence: `postfix-all-route-browser-results.json`, `postfix-cls-results.json`, `postfix-no-js-contact-390.png`, `postfix-lab-no-js.json`, and `postfix-lab-no-js-field-390.png`.

## H. Contact flow: truthful local-draft behavior retained

The contact form remains a **local-only draft builder**, not an online inquiry form.

- Empty required fields triggered native constraint validation and set `aria-invalid="true"` on Name, Email, and Project; focus moved to Name. The browser displayed native validation feedback; the app’s live status remained hidden on this native-invalid path.
- Valid sample input produced a focused `role="status"` / `aria-live="polite"` success message that says nothing was sent and online delivery is not connected. The local Blob download was named `eteriomn-project-brief.txt`; its content explicitly says it has not been sent and was created on the user’s device.
- Editing the prepared brief revoked/removed the previous download and displayed a “brief changed” status. A forced `URL.createObjectURL` failure displayed an error/recovery message, left download hidden, kept submission available, and did not claim success.
- The browser interaction recorded **zero non-GET/HEAD requests** (13 requests in total, all routine page assets). No form data was posted or sent during the test.
- With JavaScript disabled, the form remained unavailable and the page clearly said that no information is submitted online; the primary navigation remained usable.

A real delivery endpoint/provider and the matching privacy/retention process are still owner decisions. Do not describe this as lead delivery or an “inquiry sent” flow.

Evidence: `postfix-interaction-results.json`, `postfix-contact-native-validation.json`, `postfix-contact-local-draft.png`, and `postfix-no-js-contact-390.png`.

## I. Source tests and disposable production-output validation

Post-fix workspace checks—without building in the workspace—passed:

| Command | Result |
|---|---|
| `npm test` | **13 passed, 0 failed** |
| `npm run check:routes` | 49 route files; 34 confirmed services across five worlds; three concept studies |
| `npm run check:assets` | 21 referenced static assets and provenance/license checks passed |
| `npm run check:links` | 3,339 local `href`/`src` references and fragments resolved |
| `npm run check:html` | 49 HTML documents passed structural/metadata/heading/ID/label checks |
| Targeted `node --check` | Server, renderer, Lab module, and edited route/gallery tests passed |

For production-output validation, the project was copied to `/tmp/eteriomn-phase3-disposable-1792137545`; `npm run build` and the full `npm run validate` ran **only in that disposable copy**. The build produced 49 HTML routes and 34 service routes; full validation passed source, static asset, syntax/import, route, metadata, and copied-`dist/` checks. `/home/user/dist/` remains absent; no workspace build overwrote generated output.

`SITE_URL` was unset for the disposable build. Accordingly, canonical URLs were omitted and the generated sitemap intentionally remained hostless/empty. A confirmed HTTPS production origin is required before release metadata can be finalized.

Evidence: `postfix-static-tests.txt` and `disposable-output-validation.txt`.

## J. Unresolved launch blockers and untested items

The following remain open; the local fixes do not clear them:

1. **Illustration rights:** the local Beyond Outpost concepts remain labeled illustrative/non-official. Owner/platform permission and rights for launch use have not been established; obtain approval or replace with documented authorized work.
2. **Spotlipse approval and credits:** confirm the collaboration copy, names, and asset use with the relevant owners. Keep ETERIOMN’s claim limited to the user-supplied creative/visual-direction scope; retain the distinct **Spotlipse × Trion Tech development credit**. Do not imply broader roles or outcomes without verification.
3. **Legal review:** confirm legal entity, jurisdiction, privacy contact, hosting/log retention, and review the draft privacy, cookie, and terms copy with qualified counsel/owner approval.
4. **Domain and canonical origin:** confirm the production HTTPS domain and build with `SITE_URL`; current output has no canonical origin.
5. **Sitemap/SEO:** generate and verify the final sitemap/robots/canonical metadata against the chosen domain and the owner’s indexing policy. The disposable build deliberately used no production hostname.
6. **Contact delivery, if required:** decide whether online receipt is needed. If so, implement and verify a real endpoint/provider plus appropriate privacy, consent, security, and retention handling. Until then, the form is local-only.
7. **Host behavior:** test the actual selected Netlify/Vercel deployment for root and nested 404 status, existing assets, security headers, and rewrite behavior. Local-server success is not a host test.
8. **Accessibility and device coverage:** no screen reader, voice-control, physical device, Firefox/WebKit, full manual keyboard, 200%/400% zoom, forced-colors, or full WCAG review was performed. The axe scans are not a conformance certificate.
9. **Production performance:** no Lighthouse, CDN/production test, throttled network/CPU run, or field Core Web Vitals were collected.

Do not present this audit as launch approval until the owner/rights/host/legal/domain/SEO gates are resolved or explicitly accepted and the required real delivery decision is made.

## K. Evidence index and reporting boundaries

- **Baseline before edits:** `audit-evidence-phase-3/baseline-source-hashes.json`, `baseline-browser-results.json`, `baseline-http-routes.json`, `baseline-static-tests.txt`, and `baseline-*.png`.
- **Post-fix browser/viewport evidence:** `postfix-all-route-browser-results.json`, `postfix-lab-results.json`, the nine `postfix-lab-{width}.png` captures, `postfix-gallery-focus.json`, `postfix-interaction-results.json`, `postfix-cls-results.json`, and the named fallback/contact/404 screenshots.
- **Motion/lifecycle addenda:** `postfix-reduced-motion-investigation.json`, `postfix-reduced-motion.json`, `postfix-hidden-cleanup.json`, and `postfix-lab-no-js.json`.
- **Automated and build evidence:** `postfix-static-tests.txt`, `disposable-output-validation.txt`, and `postfix-source-hashes.json`.
- **Evidence methodology and limits:** `audit-evidence-phase-3/README.md`. Historical Phase 2 material remains separate under `audit-evidence-phase-2/`.

Browser claims in this report are limited to the listed local Chromium runs and saved measurements. The 49-route browser sample is two widths; the Lab sample is nine widths; only selected screenshots were visually reviewed. Local CLS is not field CWV; axe is not certification; synthetic lifecycle events are not real backgrounding/GPU loss; and local 404 behavior is not a production-host deployment test.
