# Art direction and design system

## Positioning and visual thesis

ETERIOMN is presented as a **Polymath Digital Studio & Ecosystem Lab**: five distinct disciplines brought around one brief, not a claim about a large team, corporate group, client list, or track record. The visual idea is a shared point of view across different kinds of work.

The experience uses an editorial rhythm—large, deliberately typeset statements; numbered study labels; precise rules and captions; broad areas of negative space; and alternating charcoal and ivory surfaces. Art and motion serve hierarchy or make an idea tangible; they do not gate content or act as decoration without purpose.

## Identity and typography

- The entire logo is the editable **ETERIOMN wordmark**. Shared site chrome renders the text as HTML. The favicon repeats only that wordmark; it does not introduce an emblem, pictorial symbol, monogram, or substitute icon.
- **Space Grotesk** is used for the wordmark, headlines, and display-led interface copy. **Inter** handles body and form text. **IBM Plex Mono** is reserved for folios, section numbers, captions, and technical labels.
- The WOFF2 fonts are self-hosted; their SIL Open Font License 1.1 notices are included in `assets/fonts/`. No CDN font request is required.
- Display sizes use fluid `clamp()` scales; small uppercase labels use restrained tracking and are not the only way information is conveyed.

## Palette

The exact supplied colors remain the foundation in `src/css/tokens.css`:

| Role | Value |
|---|---|
| Background | `#0b0b0d` |
| Surface | `#141419` |
| Raised surface | `#1c1c23` |
| Foreground | `#f3f0e8` |
| Muted foreground | `#a5a1a0` |
| Accent | `#6757d9` |
| Strong accent | `#5140be` |
| Highlight | `#d8a45b` |
| Border | `#2a2930` |

Five world accents distinguish related routes. Darker same-family paper-surface companions are defined for small text on ivory; they supplement, rather than replace, the supplied palette. These token contrasts have been checked numerically in code review, but that is not a formal WCAG audit.

## Layout and page hierarchy

- **Homepage:** one image-led hero establishes the point of view. It is followed by a concise thesis, five world rows, explicitly speculative concept studies, a separate Beyond Outpost collaboration feature, a four-step method, a Lab preview, and a clear project-brief CTA.
- **Service index:** five in-page world anchors lead to full-width editorial sections and a readable two-column route index, not one wall of identical cards.
- **Service detail:** each of the 34 confirmed routes has differentiated copy, service-specific SVG artwork, related routes, deliverables, process, boundaries, and FAQs. The Game Development page adds one separately credited Spotlipse collaboration panel. The visuals are generated from distinct route definitions in `src/data/service-illustrations.js`.
- **Supporting pages:** Work (including a clearly distinct collaboration feature), the dedicated `/collaborations/spotlipse.html` page, and each fictional study, Studio, Ecosystem, Digital Lab, Contact, legal drafts, and 404 each have page-specific headings and section structures while sharing the same spacing, type, navigation, and caption system.
- **Negative space:** large display type and imagery are balanced by clear body measures, thin rules, and intentionally quieter intervals. No decorative image is repeated across unrelated service pages.

## World color and purpose

The five worlds have distinct accents: Technology (violet), Creative (amber), Media (cool blue-gray), Marketing (warm stone), and Legal Support (soft violet). On paper surfaces, each uses a darker companion for readable small text. These colors act as navigation and classification cues, not as claims about measured results.

## Imagery and provenance

- The homepage, five world sections, three fictional concept studies, and the Beyond Outpost collaboration use local visuals. Concept routes are labeled fictional/speculative; the three collaboration pixel-art studies are original AI-generated illustrations for this site and repeatedly labeled as not official game artwork, screenshots, or confirmed assets. There are no client-result screenshots, testimonials, fabricated metrics, or invented social proof.
- The collaboration page uses the owner-supplied ETERIOMN × Spotlipse claim only for a general visual-direction collaboration. The public project credit checked on 2026-10-15 lists Spotlipse × Trion Tech and does not name ETERIOMN; the page preserves that distinction and leaves responsibilities configurable/unspecified.
- The service atlas is authored as procedural SVG definitions within the repository and regenerated on build.
- Source and rights evidence for several inherited/local raster assets, the three AI-generated collaboration images' tool terms, and the Lab fallback SVG is incomplete. Each record in `assets/asset-manifest.json` says what is and is not known and marks unresolved assets provisional. They should be replaced or explicitly cleared by the owner before commercial publication; a local file is not evidence of a license.
- The editable social-card SVG and its PNG export are maintained separately; the build does not rasterize one from the other. The wordmark remains text, not an added symbol.

## Interaction and motion

- Motion is restrained: small, user-triggered hover/focus transitions, optional in-view reveals, and a pointer/keyboard-controlled Lab signal field. There is no autoplay video or continuous decorative animation.
- The mobile navigation and collaboration image viewer use native `<dialog>` elements with Escape support and focus return. The collaboration gallery has labeled previous/next controls and arrow-key navigation; without JavaScript, its images remain direct links. The service-world control, work filters, and local brief are progressive enhancements.
- Reduced-motion preferences disable smooth scrolling and cancel/avoid reveal or interpolation motion. Essential information remains static and available without JavaScript, Canvas, or motion.
- The Lab Canvas is optional; a static SVG image remains in the page as a fallback. The canvas is marked decorative and paired with a keyboard-operable range input.
- The Contact page validates locally and creates a downloadable text draft only. It has no delivery endpoint and must not claim that a message was sent.

## Responsive contract

Defined in `src/css/responsive.css`:

- **1200px:** reduce outer gutters and wide navigation/layout gaps.
- **1000px:** switch to the native mobile-dialog navigation; rearrange multicolumn compositions.
- **760px:** stack editorial grids and service/artwork sections for narrow layouts.
- **520px:** compact controls, type, lists, and cards for phones.
- **360px:** narrowest screen adjustments; the base document minimum is 320px.
- The collaboration stylesheet also collapses its hero/fact grids at **920px**; the corresponding page and teasers otherwise reuse the shared responsive contract.

These breakpoints describe the CSS system. On 2026-10-14, Chromium/Linux browser QA loaded the then-current 48-route baseline at ten widths from 320px to 1920px and found no horizontal overflow; representative desktop and mobile renders were visually reviewed. The collaboration route and its home/work/service integrations were added afterward; they have not been visually checked in a browser or at the requested widths in this environment. See `docs/qa.md` for exact coverage and limits. The earlier checks were single-engine emulation, not physical-device, cross-browser, or screen-reader verification.

## Accessibility and trust rules

Use semantic landmarks, one primary heading per page, descriptive document metadata, a skip link, visible focus states, native links/buttons/forms/details/dialog semantics, explicit form labels, image dimensions and accurate alt treatment, and reduced-motion fallbacks. Keep functional content available without animation. Legal/IP service descriptions stay within practical organization and preparation support; they do not claim legal advice, filing, or representation.

The structural validator and automated axe scans do not prove conformance. A subset of navigation, form, FAQ, and Lab keyboard interactions was browser-tested; complete manual keyboard/focus and screen-reader review, the Nu HTML Checker, exhaustive contrast review, and formal WCAG conformance remain pre-launch checks.
