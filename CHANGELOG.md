# Changelog

## 0.1.2 — 2026-10-15

- Added `/collaborations/spotlipse.html`, with editable collaboration details, current external project attribution, configurable/unspecified responsibilities, safe project/partner links, and an accessible native-dialog image viewer with direct-link fallback.
- Added a distinctive Home collaboration feature, a Work-index feature, a Game Development service-page panel, and navigation/footer links without changing the 34-service inventory.
- Generated three original local illustrative concepts and optimized them to WebP; all are explicitly labeled as non-official game art and recorded with provenance, provisional rights status, alt text, dimensions, and replacement guidance in both asset manifests.
- Updated the static route allowlist, build, SEO/share metadata, deployment/QA documentation, and collaboration-specific regression tests. Build and static validation pass; 13 tests pass. The new layouts have not been visually tested in a browser in this environment.

## 0.1.1 — 2026-10-14

- Visually inspected representative desktop/mobile pages in an actual Chromium browser and checked all 48 routes across ten viewport widths; resolved the narrow-screen Ecosystem overflow.
- Improved small-label contrast, corrected work-index heading hierarchy, and aligned accessible names with visible wordmark/project content.
- Verified desktop/mobile navigation, work filters, FAQ disclosure, the local-only contact download, and the Digital Lab keyboard control/static-canvas fallback; recorded automated axe results and remaining release gates in `docs/qa.md`.
- Added no packages or frameworks; the production site remains a static HTML/CSS/vanilla-JS project.

## 0.1.0 — 2026-10-13

- Built the ETERIOMN static studio website with native HTML, CSS, and ECMAScript modules.
- Added the complete homepage, work / concept studies, services index, Studio, Digital Lab, Ecosystem, Contact, legal drafts, and 404 page.
- Added all 34 service routes explicitly named in the supplied manifest; documented the unresolved 35th-route discrepancy without inventing a service.
- Added 34 distinct procedural service-art SVGs and integrated separate local WebP hero, world, and fictional concept visuals; unresolved source and rights details are marked provisional in the asset register.
- Added responsive navigation, project filters, a local-only project-brief download, and a reduced-motion-aware Canvas experiment.
- Added a static build, safe local HTTP server, deployment configuration, and route / asset / link / HTML checks.
