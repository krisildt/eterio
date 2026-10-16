# ETERIOMN — Phase 2 Browser Quality & Runtime Audit

**Audit date:** 15 October 2026  
**Status:** Complete; read-only audit. No site fixes or redesigns were made.  
**Preview:** Existing local preview at `http://127.0.0.1:4173` (left unchanged).

## Executive summary

Browser testing was available, so this report is based on rendered Chromium pages and reproducible browser observations—not just source inspection.

- **Coverage:** All **49 manifest routes** loaded at each requested width: **441 route/viewport combinations**. Every expected route returned HTTP 200, with zero horizontal-overflow results, visible out-of-viewport candidates, page exceptions, console errors, or failed requests in that successful-route matrix.
- **Visual evidence:** Reviewed all **20 scroll-loaded desktop full-page captures** and all **7 mobile captures at 390 × 844**. The editorial visual system is consistent and no obvious overlap or clipping appeared in those captures. The separate runtime test did uncover a major exception: the Digital Lab canvas is enabled but renders into a **zero-height frame** at both 1440px and 390px.
- **Navigation/interactions:** Seven clicked internal navigation hops succeeded (plus the initial home load). The menu, work filters, FAQ disclosure, collaboration gallery, reduced-motion state, local contact brief, and fallback paths were exercised. The interaction suite recorded **12 passes and one real failure**: the Lab canvas interaction/rendering.
- **Accessibility:** axe-core found no violations in **98 default-state scans** (49 routes at 1440px and 390px). An additional scan of eight interactive states found a **WCAG 2.5.3 “Label in Name” failure** on the gallery’s Previous and Next buttons (two affected controls). This is not a WCAG conformance certification; assistive-technology and zoom testing remain outstanding.
- **Performance:** A local, unthrottled 16-sample lab run recorded median LCP **108 ms** and median CLS **0.0003**; the highest CLS was **0.074** in the mobile samples and coincided with a 67px header/content shift. These localhost measurements are not production or field performance data.
- **Other confirmed issue:** A typo at an unknown root path returns a plain `Not found.` response rather than the designed branded 404. Unknown paths under `/pages/` do return the designed 404 with HTTP 404.

**Highest-priority next actions:** restore the Lab’s rendered canvas area, correct the two gallery accessible names, and configure/test the host’s root-level 404 fallback. No fixes have been applied in this audit.

## Scope and guardrails

This was a verification and improvement-planning phase only. I did **not** edit project HTML, CSS, JavaScript, source data, generated site output, or the running preview; did not run a workspace build; and did not add a project dependency or framework. Playwright and axe-core were installed only under `/tmp/eteriomn-playwright-audit` for this audit. Evidence and this report are new files under `audit-evidence-phase-2/` and the workspace root.

The existing **34 confirmed service-detail routes** were retained; no 35th service was introduced. The contact flow is described and behaves as a local text-draft/download flow—not as online inquiry delivery. The collaboration page separates ETERIOMN’s stated creative visual-direction collaboration from the Spotlipse × Trion Tech development credit, and labels the page’s generated concept art illustrative/non-official. Rights/owner approval for that art was not established. The Spotlipse source was observed as “in development” on 2026-10-15; no “Coming January 2027” claim is used here.

## Test environment and capabilities

| Item | Actual setup |
|---|---|
| Site under test | Existing preview, `http://127.0.0.1:4173`; no preview restart or configuration change |
| Browser | Google Chrome for Testing **142.0.7444.175**, headless Chromium on the sandboxed Linux environment |
| Browser automation | Playwright Core **1.64.1** |
| Accessibility automation | axe-core **4.14.0** |
| Node | **20.20.2** |
| Viewports | CSS widths 320, 360, 390, 430, 768, 1024, 1280, 1440, 1920; device scale factor 1 |
| Heights used in the route matrix | 844px at widths ≤430; 900px at 768/1024; 1000px at 1280/1440; 1080px at 1920 |
| Additional modes | JavaScript-disabled contact/collaboration fallbacks; `prefers-reduced-motion: reduce`; forced Canvas 2D-context failure |
| Performance conditions | Localhost, fresh browser context per sample, no CPU/network throttling, 1.2s post-load observation |

This environment supports route navigation, screenshots, DOM geometry, console/page/request monitoring, keyboard and pointer events, native form validation, local download inspection, reduced-motion emulation, and automated accessibility scans. It does **not** substitute for physical devices, another browser engine, a production host, screen readers/voice control, or a throttled real-world network.

## Commands and results

The audit scripts and their JSON results are in `/tmp` and `audit-evidence-phase-2/` respectively. Commands below are the commands actually used for the evidence runs.

| Command | Result |
|---|---|
| `node /tmp/eteriomn-browser-audit.mjs` | 49 routes × 9 widths = **441** combinations; all expected routes HTTP 200; zero horizontal overflow/out-of-viewport candidates, page errors, console errors, or failed requests. Matrix: [`viewport-matrix.json`](audit-evidence-phase-2/viewport-matrix.json). |
| `node /tmp/eteriomn-image-scroll.mjs` | Visited all 49 routes, scrolled to trigger lazy images, and checked **28** non-hidden `<img>` instances; **28/28 loaded**, with no image failures, page errors, console errors, or request failures. Saved 20 corrected, scroll-loaded full-page captures. [`lazy-image-audit.json`](audit-evidence-phase-2/lazy-image-audit.json). |
| `node /tmp/eteriomn-navigation-audit.mjs` | **7/7** clicked navigation hops succeeded after the initial home load, including desktop header, project card, brand-home link, service-world anchor, service detail, contact CTA, and mobile menu link; each destination returned HTTP 200. [`runtime-navigation.json`](audit-evidence-phase-2/runtime-navigation.json). |
| `node /tmp/eteriomn-runtime-audit.mjs` | **12 PASS / 1 FAIL**. The failed assertion is the reproduced Lab canvas defect, not a test-harness limitation. No page exceptions; no external or non-GET requests during the interaction run. The three console messages in this run are expected responses to the deliberately requested 404 paths. [`runtime-interactions.json`](audit-evidence-phase-2/runtime-interactions.json). |
| `node /tmp/eteriomn-axe-audit.mjs` | **98** default-state scans (49 routes × 1440px and 390px); zero axe violations. Eight rule/state prompts were left incomplete for manual review (image-backed contrast and the gallery’s popup-control relationship), not reported as confirmed violations. [`axe-accessibility-audit.json`](audit-evidence-phase-2/axe-accessibility-audit.json). |
| `node /tmp/eteriomn-axe-states.mjs` | **8** open/active interaction states; one rule failed on two gallery buttons: `label-content-name-mismatch`. [`axe-interactive-states.json`](audit-evidence-phase-2/axe-interactive-states.json). |
| `node /tmp/eteriomn-performance-audit.mjs` | **16** one-shot samples: 8 representative routes × desktop/mobile. Results and per-sample data: [`performance-lab.json`](audit-evidence-phase-2/performance-lab.json). |
| `node /tmp/eteriomn-cls-attribution.mjs` | Reproduced CLS **0.074** at 390 × 844 on Home, Services, and Contact; recorded shifting DOM nodes and previous/current rectangles in [`layout-shift-attribution.json`](audit-evidence-phase-2/layout-shift-attribution.json). |
| `node /tmp/eteriomn-lab-diagnose.mjs` | Compared normal Canvas initialization and forced static fallback at 1440px and 390px. Normal frame measured 0px high at both widths; forced-failure static image rendered at 1325 × 795px and 358 × 215px respectively. |
| `npm install --prefix /tmp/eteriomn-playwright-audit --no-save --no-package-lock playwright-core axe-core` | Test-only tooling installed in `/tmp`; no package or dependency was added to the project. |

## Pages rendered and screenshot review

All 49 route paths below were opened directly at every matrix width. The matrix is automated rendering evidence; it does **not** mean every page/viewport was manually inspected.

**Other routes (15):**

```text
/
/404.html
/collaborations/spotlipse.html
/pages/contact/index.html
/pages/ecosystem/index.html
/pages/lab/index.html
/pages/legal/cookie-policy.html
/pages/legal/privacy-policy.html
/pages/legal/terms.html
/pages/projects/nocturne.html
/pages/projects/object-study-03.html
/pages/projects/signal-house.html
/pages/services/index.html
/pages/studio/index.html
/pages/work/index.html
```

**Service detail routes (the 34 confirmed routes):**

```text
/pages/services/3d-animation.html
/pages/services/3d-modeling.html
/pages/services/advertising-campaigns.html
/pages/services/ai-solutions.html
/pages/services/audio-production.html
/pages/services/automation-systems.html
/pages/services/brand-identity.html
/pages/services/brand-protection.html
/pages/services/commercial-videos.html
/pages/services/content-creation.html
/pages/services/copyright.html
/pages/services/desktop-software.html
/pages/services/game-development.html
/pages/services/google-ads.html
/pages/services/graphic-design.html
/pages/services/influencer-marketing.html
/pages/services/licensing-support.html
/pages/services/logo-design.html
/pages/services/meta-ads.html
/pages/services/mobile-apps.html
/pages/services/motion-graphics.html
/pages/services/music-videos.html
/pages/services/podcast-production.html
/pages/services/product-visualization.html
/pages/services/saas-products.html
/pages/services/seo.html
/pages/services/social-media.html
/pages/services/song-production.html
/pages/services/sound-design.html
/pages/services/trademark.html
/pages/services/uiux-design.html
/pages/services/video-editing.html
/pages/services/web-applications.html
/pages/services/web-development.html
```

### Screenshot-backed observations

All 20 `loaded-*.png` desktop captures were manually reviewed after scrolling to trigger lazy loading. They cover the home page, 404, collaboration, contact, ecosystem, lab, three legal pages, three concept studies, services index plus five service details, studio, and work. All seven 390 × 844 mobile captures were also reviewed: home, services index, web-development detail, work, collaboration, lab, and contact. The initial non-scrolled captures can omit lazy media; use the `loaded-*.png` files when reviewing the full-page pages.

- Across the inspected pages, the dark/ivory editorial identity, typography, and section hierarchy were consistent. I saw no obvious overlap or clipping in those captures. This is a finding about the screenshots reviewed—not a claim that every route was manually inspected at every width.
- At 390px, the work filters remain visible and wrap as a compact row; the Web Development page’s title, CTA, and service artwork fit the viewport; the contact hero clearly states “local draft only / nothing is sent.” These observations are backed by the `mobile390-*` screenshots.
- Privacy and cookie pages visibly mark the copy as owner-review/draft material. The terms page is explicitly an editable draft and visibly retains `[LEGAL ENTITY]`, `[GOVERNING LAW]`, and `[CONTACT DETAILS]` tokens. These are content-readiness items, not hidden claims of completed legal review.
- The designed `/404.html` capture is branded and offers routes back into the site. The separate unknown-root-path screenshot shows the unbranded plain-text fallback.
- The Lab’s normal browser state is an exception to the initial static/full-page visual assessment: its canvas is not rendered. The DOM geometry and state screenshots are direct browser evidence; see the defect register.

Useful screenshots: [`loaded-home.png`](audit-evidence-phase-2/loaded-home.png), [`loaded-pages__legal__cookie-policy.png`](audit-evidence-phase-2/loaded-pages__legal__cookie-policy.png), [`loaded-pages__legal__terms.png`](audit-evidence-phase-2/loaded-pages__legal__terms.png), [`loaded-404.png`](audit-evidence-phase-2/loaded-404.png), [`mobile390-pages__work__index.png`](audit-evidence-phase-2/mobile390-pages__work__index.png), [`mobile390-pages__contact__index.png`](audit-evidence-phase-2/mobile390-pages__contact__index.png), [`state-collaboration-gallery-open.png`](audit-evidence-phase-2/state-collaboration-gallery-open.png), [`state-contact-local-draft.png`](audit-evidence-phase-2/state-contact-local-draft.png), and [`state-unknown-root-404.png`](audit-evidence-phase-2/state-unknown-root-404.png).

## Requested viewport results

**Automated result at every listed width:** all 49 routes returned HTTP 200; `documentElement` and `body` scroll widths matched the viewport; zero horizontal-overflow results and zero visible out-of-viewport candidates. The test sampled geometry after load/font readiness at the heights shown below. Only 1440px full-page screenshots and 390 × 844 mobile screenshots were manually reviewed; the other widths are automated-only evidence.

| Viewport width | Test height | Routes | HTTP/overflow result | Manual screenshot review |
|---:|---:|---:|---|---|
| 320 | 844 | 49 | 49/49 HTTP 200; no overflow/candidates | No |
| 360 | 844 | 49 | 49/49 HTTP 200; no overflow/candidates | No |
| 390 | 844 | 49 | 49/49 HTTP 200; no overflow/candidates | Yes, 7 selected routes |
| 430 | 844 | 49 | 49/49 HTTP 200; no overflow/candidates | No |
| 768 | 900 | 49 | 49/49 HTTP 200; no overflow/candidates | No |
| 1024 | 900 | 49 | 49/49 HTTP 200; no overflow/candidates | No |
| 1280 | 1000 | 49 | 49/49 HTTP 200; no overflow/candidates | No |
| 1440 | 1000 | 49 | 49/49 HTTP 200; no overflow/candidates | Yes, 20 selected full pages |
| 1920 | 1080 | 49 | 49/49 HTTP 200; no overflow/candidates | No |

The geometry scan excludes hidden, fixed, and sticky elements from its out-of-viewport candidate list; it is not a substitute for manually inspecting every route, zoom level, or intermediate responsive breakpoint.

## Actual navigation and interaction results

| Area | Browser result |
|---|---|
| Desktop navigation | Header Work → work index; concept-study card → detail; brand → home; services-world menu → Technology anchor; service index → Web Development detail; contact CTA → contact page. All destinations returned HTTP 200. |
| Mobile navigation | Opened the native dialog; close control received initial focus; Shift+Tab/Tab stayed within the dialog; Escape and close button both closed it, removed the body scroll lock, and restored focus to the opener. Clicking Work navigated to the work page and closed the dialog. |
| Work filters | Technology selected one matching card and updated `aria-pressed`/result text; All restored all three studies. Creative and Media were not separately exercised. |
| FAQ | On Web Development, keyboard Space opened the first disclosure and Enter closed it. |
| Collaboration gallery | Opened; previous/next buttons and ArrowLeft/ArrowRight changed images and wrapped; images decoded; close button and Escape closed the dialog and restored focus to the opening link. |
| Digital Lab | Slider changed from 50 to 51 by keyboard and Reset returned it to 50. **Visible canvas and pointer interaction failed** because the render frame is 0px high; the control’s value still changes without a visible field. With Canvas 2D deliberately forced to fail, the static image fallback appeared and the controls hid as intended. |
| Reduced motion | Chromium reported `prefers-reduced-motion: reduce`; the Lab slider/reset remained usable. Other animation behavior was not exhaustively assessed. |
| Contact form | Required-field validation set `aria-invalid`; valid input created a local blob text file (`eteriomn-project-brief.txt`). Its contents say it is a local draft and has not been sent. No POST/non-GET request occurred. Editing afterward invalidated the old download. A forced `createObjectURL` error displayed a recovery message without claiming success. With JavaScript disabled, the page disclosed that the local brief builder is unavailable and retained primary navigation. |
| 404 handling | Direct `/404.html` rendered the designed page (HTTP 200); an unknown `/pages/...` path returned HTTP 404 with the designed branded page; an unknown root path returned HTTP 404 with only `Not found.`. Production-host rewrite behavior was not tested. |
| Lazy media | Across 49 route visits, all 28 encountered non-hidden images loaded after scrolling. |

## Accessibility findings — WCAG 2.2 AA target

This is a focused automated plus keyboard spot-check, **not a statement of WCAG conformance**.

1. **Default states:** axe-core 4.14.0 scanned 49 routes at 1440px and 390px (98 scans) with WCAG 2.0/2.1/2.2 A/AA and best-practice tags. It reported zero violations. Eight rule/state combinations were incomplete and require human review: six image-backed `color-contrast` checks and two popup-related `aria-valid-attr-value` checks on the collaboration page. The `aria-controls="collab-lightbox"` reference exists; the dialog opened and behaved in the browser. The image-backed contrast prompts remain unverified by automation. The active Work-filter state generated one additional incomplete color-contrast prompt, also not a confirmed violation.
2. **Open/active states:** a further eight scans covered the desktop services menu, mobile navigation, active work filter, open FAQ, open lightbox, form errors, prepared local draft, and Lab. One rule failed in the open lightbox: `label-content-name-mismatch`, affecting two controls. Visible text is **“Previous image” / “Next image”** while the accessible names are **“View previous project image” / “View next project image.”** The visible label is not preserved as a matching phrase in the accessible name. This implicates WCAG 2.2 **SC 2.5.3 Label in Name (Level A)**.
3. **Keyboard checks passed:** visible first-Tab skip link; desktop menu focus/escape behavior; mobile dialog focus cycle, Escape, close, and focus restoration; FAQ Space/Enter; gallery arrow keys, close, Escape, and focus restoration; and contact validation/status focus.
4. **Selected color-token calculation:** foreground on background 17.27:1; muted text on background 7.68:1; highlight on background 8.78:1; foreground on the purple accent button 4.68:1. These representative token pairs exceed the normal-text 4.5:1 threshold; they do not establish contrast for every state or image overlay.
5. **Not tested:** screen readers, voice-control software, full keyboard traversal of every route/control, OS high-contrast/forced-colors mode, browser zoom at 200%/400%, touch hardware, or the complete WCAG 2.2 AA success-criteria set. Do not treat the zero-violation default scans as conformance certification.

## Performance observations and limits

`performance-lab.json` contains 16 one-shot samples: home, services index, Web Development, work, collaboration, Lab, contact, and `/404.html` at 1440px and 390px. Each used a fresh context and a 1.2-second post-load observation.

| Metric | Samples | Median | Range / note |
|---|---:|---:|---|
| TTFB | 16 | 0.8 ms | 0.6–1.4 ms, localhost only |
| DOMContentLoaded | 16 | 79.1 ms | 61.5–111.5 ms |
| Load event end | 16 | 79.4 ms | 61.8–111.6 ms |
| First Contentful Paint | 16 | 104 ms | 72–160 ms |
| Largest Contentful Paint | 16 | 108 ms | 72–160 ms |
| CLS | 16 | 0.0003 | 0–0.074; the 390px samples reached 0.074 on seven of eight pages |
| Transfer bytes/sample | 16 | 270,761 bytes | 212,856–568,777 bytes |
| Long tasks | 16 | — | One 52ms task in the sample set |

A second layout-shift attribution run recorded the brand moving from y=0 to y=24 and the main content moving from y=136 to y=69 (67px) during the mobile header’s initial-to-JavaScript-ready change on Home, Services, and Contact. The observed CLS was 0.074 in those samples; see [`layout-shift-attribution.json`](audit-evidence-phase-2/layout-shift-attribution.json). This is a local lab observation, not a prediction of production CLS.

No Lighthouse run, real-user monitoring, field Core Web Vitals, throttled network/CPU test, production cache/CDN measurement, or cross-device profiling was performed. **Performance outside this local unthrottled Chromium run is unknown.** No performance budget was supplied, so these numbers are measurements, not a budget pass.

## Separate scorecards

### Source / requirements evidence

| Area | Status | Evidence / boundary |
|---|---|---|
| Route scope | **Verified** | Manifest includes the 34 confirmed service-detail routes and the existing 49-route set; no new route was added. |
| Architecture and preservation | **Verified for this audit** | No project source/build file, dependency, framework, or running preview was changed. This is not a fresh build/release verification. |
| Contact-delivery claim | **Verified** | Browser behavior, download contents, and on-page copy confirm local-only preparation; no online delivery is implied or observed. |
| Collaboration attribution | **Verified in rendered copy** | ETERIOMN’s visual-direction role is distinct from Spotlipse × Trion Tech’s development credit. The page labels its art illustrative/non-official. Art rights/owner approval remain unknown. |
| Legal readiness | **Partial / owner action** | Privacy/cookie/terms pages identify draft/owner review; the terms document visibly retains owner-detail placeholders and is not presented as legally reviewed. Legal sufficiency and actual production-stack behavior are unknown. |
| Runtime behavior | **Not inferable from source alone** | Browser testing found the zero-height Lab canvas and active-dialog accessible-name mismatch despite otherwise clean route checks. |

### Browser evidence

| Area | Status | Evidence |
|---|---|---|
| Manifest routing at requested widths | **Pass** | 441/441 successful route/viewport loads; no overflow/candidates. |
| Selected rendered visual review | **Partial pass** | 20 desktop and 7 mobile captures reviewed; no obvious clipping/overlap, but the Lab canvas fails at runtime. Other viewport widths were not manually reviewed. |
| Internal navigation | **Pass** | 7 clicked route/anchor hops plus direct home load; all destinations HTTP 200. |
| Interactive behaviors | **Partial** | 12 runtime checks pass; Lab canvas/render check fails. |
| Accessibility | **Partial / fail in one interactive state** | Zero default-state axe violations; one WCAG 2.5.3 rule failure on two lightbox controls. Full conformance is untested. |
| 404 fallback | **Partial** | Designed page works on `/pages/...` misses; unknown root path is plain text. Host-specific production behavior unknown. |
| Performance | **Measured locally only** | 16 unthrottled localhost samples; field/production performance unknown. |

## Severity-ranked defect register

| Rank | Severity | Finding and user impact | Reproduction / evidence |
|---:|---|---|---|
| 1 | **High — core feature** | **Digital Lab canvas collapses to zero height.** Normal initialization hides the static image and reveals controls, but `.experiment-frame` and its canvas both measure `height: 0px` at 1440px and 390px. Canvas attributes remain at the default 300 × 150; the drawing is not visible and pointer targeting cannot work. Keyboard slider/reset changes values without showing the signal. The forced no-context fallback does render, so the failure is in the normal initialized layout. | Open `/pages/lab/index.html`; compare [`state-lab-canvas-zero-height-1440.png`](audit-evidence-phase-2/state-lab-canvas-zero-height-1440.png), [`state-lab-canvas-zero-height-390.png`](audit-evidence-phase-2/state-lab-canvas-zero-height-390.png), the working fallback captures [`state-lab-static-fallback-visible-1440.png`](audit-evidence-phase-2/state-lab-static-fallback-visible-1440.png) / [`state-lab-static-fallback-visible-390.png`](audit-evidence-phase-2/state-lab-static-fallback-visible-390.png), and the structured geometry in [`runtime-interactions.json`](audit-evidence-phase-2/runtime-interactions.json). |
| 2 | **High — WCAG A blocker for this control** | **Gallery Previous/Next accessible names do not retain their visible labels.** Two controls fail axe `label-content-name-mismatch`, mapped to WCAG 2.2 SC 2.5.3 Label in Name. This can impair speech/voice-control users who address the visible button text. | Open the collaboration image viewer and run axe; see the two nodes in [`axe-interactive-states.json`](audit-evidence-phase-2/axe-interactive-states.json) and the rendered controls in [`state-collaboration-gallery-open.png`](audit-evidence-phase-2/state-collaboration-gallery-open.png). |
| 3 | **Medium — navigation recovery** | **Unknown root paths are not routed to the designed 404.** A root typo returns status 404 with a plain white `Not found.` body, leaving no branded recovery links. Missing paths under `/pages/` already return the designed 404 at status 404. The test is specific to the current preview server; the production host was not tested. | Navigate to `/no-such-root-route`; see [`state-unknown-root-404.png`](audit-evidence-phase-2/state-unknown-root-404.png). Compare with `/pages/services/no-such-route.html` and `/404.html`. |
| 4 | **Medium — layout stability** | **Mobile header/content shifts during JavaScript readiness.** At 390px, seven of eight representative pages recorded CLS 0.074; source attribution showed a 67px upward movement of the main content. It is repeatable in this local lab run but remains below no supplied project-specific budget; slower production conditions may differ. | See `performance-lab.json` for per-route CLS and the layout-shift observer measurement described above. |

The explicit legal-draft placeholders and non-official art disclosures are **not hidden defects**; they are known owner/review gates. Image-backed contrast checks are **incomplete**, not confirmed failures, and should be manually reviewed.

## Top five improvements (no fixes implemented here)

1. **Restore the Lab experiment’s real layout area.** Make the normal canvas and the static fallback occupy a stable, non-zero frame; then retest canvas pixels, pointer movement, slider/reset, resize, reduced motion, and forced-failure fallback at 320/390/1440.
2. **Make the gallery’s accessible names include the visible labels.** Preserve “Previous image” and “Next image” as part of the accessible names; rerun axe with the dialog open and verify with keyboard and voice-control semantics.
3. **Route missing root paths to the branded 404 while preserving HTTP 404.** Configure the target host’s not-found handling and test root and nested misses on the actual deployment host, without rewriting valid routes.
4. **Reduce the mobile header’s first-paint layout shift.** Keep the no-JavaScript fallback usable while avoiding the 136px-to-69px header/content transition; remeasure under throttled cold-load conditions.
5. **Complete the remaining WCAG and launch-readiness verification.** Manually review contrast over imagery, run assistive-technology and 200%/400% zoom checks, and have the owner/counsel complete and approve the legal details before formal publication.

## Verified versus unknown

**Verified in this audit**

- All 49 manifest routes rendered at all nine requested widths; the matrix found no horizontal overflow or visible out-of-viewport candidates.
- The 28 encountered non-hidden images loaded after scrolling.
- Seven clicked internal navigation hops plus the initial home load succeeded; menus, filter state, FAQ keyboard disclosure, gallery image navigation, form validation and local download, reduced-motion preference, and fallback/error states were exercised.
- The contact form did not send a network request; its generated file explicitly identifies itself as a local draft.
- The designed 404 works for direct `/404.html` and missing `/pages/...` paths. The root miss does not.
- The Lab zero-height issue exists at desktop and mobile widths; the forced static fallback renders.
- One interactive WCAG 2.5.3 issue exists in two gallery buttons; default-state axe scans alone did not reveal it.
- The sampled 390px layout shift and local performance values are reproducible from the saved JSON evidence.

**Unknown / not established**

- How the actual production host handles unknown root/deep paths, redirects, cache headers, fonts, scripts, or image delivery.
- Production or field performance, CWV, low-end-device behavior, throttled network/CPU behavior, and other browser engines.
- Full WCAG 2.2 AA conformance; screen-reader/voice-control behavior, forced colors, zoom/reflow, complete keyboard traversal, and manual image-overlay contrast.
- Whether cookie/storage behavior in the deployed stack matches the draft notices; legal adequacy, business/jurisdiction details, and qualified counsel approval.
- Rights/owner approval for the locally generated Beyond Outpost concept art.
- Any server-side contact delivery: none was present or tested, and no online-delivery claim should be made.

## Next-phase recommendation

Proceed with a **bounded Phase 3 fix-and-retest**, not a redesign: first fix the Lab frame, gallery accessible names, root 404 handling, and mobile header shift. Preserve the HTML/CSS/Vanilla JS architecture, all existing routes, the ETERIOMN wordmark and palette, the local-only brief behavior, and accurate collaboration credits. Retest each change in Chromium across the nine widths, rerun interactive-state axe checks, and then perform manual keyboard/assistive-technology/zoom checks. Before launch, verify the actual hosting configuration and have the owner/counsel complete the legal drafts; keep the concept art labeled illustrative until rights/owner approval is secured.

## Evidence index

All evidence is under [`audit-evidence-phase-2/`](audit-evidence-phase-2/):

- `viewport-matrix.json` — 49 × 9 route/viewport results.
- `lazy-image-audit.json` — scroll-triggered image results.
- `runtime-navigation.json` and `runtime-interactions.json` — clicked navigation, interactions, form outcomes, 404 behavior, and the Lab geometry failure.
- `axe-accessibility-audit.json` and `axe-interactive-states.json` — default and active-state accessibility scans.
- `performance-lab.json` — 16 per-sample performance observations.
- `loaded-*.png` — 20 scroll-loaded desktop full-page captures.
- `mobile390-*.png` — seven 390 × 844 screenshots.
- `state-*.png` — selected interaction, fallback, Lab-defect, form, gallery, and unknown-path evidence.
