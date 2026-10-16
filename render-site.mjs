import { services, worlds, getWorld, getRelatedServices } from '../src/data/services.js';
import { projects } from '../src/data/projects.js';
import { visualAssets } from '../src/data/visuals.js';
import { serviceIllustrationId, serviceIllustrationDescription } from '../src/data/service-illustrations.js';
import { spotlipseCollaboration } from '../src/data/collaboration.js';

const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const serviceHref = (slug) => `/pages/services/${slug}.html`;
const projectHref = (slug) => `/pages/projects/${slug}.html`;
const collaborationHref = spotlipseCollaboration.route;
const servicesHref = '/pages/services/index.html';
const serviceBySlug = (slug) => services.find((item) => item.slug === slug);

const glyph = (name = 'arrow', size = 18) => {
  const paths = {
    arrow: '<path d="M4 12h15M13 5l7 7-7 7"/>',
    upRight: '<path d="M7 17 17 7M7 7h10v10"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    down: '<path d="M12 5v14m-7-7 7 7 7-7"/>'
  };
  return `<svg aria-hidden="true" focusable="false" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
};

function navLink(label, href, currentPath, group = '') {
  const current = currentPath === href;
  const active = current || (group === 'services' && currentPath.includes('/pages/services/')) || (group === 'work' && currentPath.includes('/pages/projects/'));
  return `<a class="nav-link${active ? ' is-active' : ''}" href="${href}"${current ? ' aria-current="page"' : ''}>${label}</a>`;
}

function header(currentPath = '/') {
  const worldLinks = worlds.map((world) => `<a class="world-${world.id}" href="${servicesHref}#${world.id}"><span>${world.number} / ${String(world.services.length).padStart(2, '0')}</span><strong>${esc(world.title)}</strong></a>`).join('');
  const mobileWorldLinks = worlds.map((world) => `<a href="${servicesHref}#${world.id}"><span>${world.number}</span>${esc(world.title)}</a>`).join('');
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <div class="header-inner">
      <a class="brand" href="/"><span class="brand-word">ETERIOMN</span><span class="brand-context" aria-hidden="true">POLYMATH DIGITAL<br />STUDIO & ECOSYSTEM LAB</span></a>
      <nav class="primary-nav" aria-label="Primary navigation">
        ${navLink('Work', '/pages/work/index.html', currentPath, 'work')}
        ${navLink('Collaborations', collaborationHref, currentPath)}
        <div class="nav-services">
          ${navLink('Services', servicesHref, currentPath, 'services')}
          <button class="nav-service-toggle" type="button" aria-label="Open service worlds" aria-expanded="false" aria-controls="service-world-menu" data-menu-toggle>${glyph('chevron', 15)}</button>
          <div class="nav-service-menu" id="service-world-menu" hidden><p>Five disciplines. One shared point of view.</p><div class="nav-service-worlds">${worldLinks}</div></div>
        </div>
        ${navLink('Studio', '/pages/studio/index.html', currentPath)}
        ${navLink('Digital Lab', '/pages/lab/index.html', currentPath)}
        ${navLink('Ecosystem', '/pages/ecosystem/index.html', currentPath)}
      </nav>
      <div class="header-actions">
        <a class="button button--primary button--small header-contact" href="/pages/contact/index.html">Prepare a brief ${glyph('upRight', 14)}</a>
        <button class="mobile-menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-navigation" data-mobile-toggle>${glyph('plus', 19)}</button>
      </div>
    </div>
    <dialog class="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation">
      <div class="mobile-dialog-head"><a class="brand" href="/"><span class="brand-word">ETERIOMN</span></a><button class="mobile-menu-close" type="button" aria-label="Close navigation" data-mobile-close>${glyph('close', 20)}</button></div>
      <nav class="mobile-primary-links" aria-label="Mobile primary navigation">
        ${navLink('Work', '/pages/work/index.html', currentPath, 'work')}
        ${navLink('Collaborations', collaborationHref, currentPath)}
        ${navLink('Services', servicesHref, currentPath, 'services')}
        ${navLink('Studio', '/pages/studio/index.html', currentPath)}
        ${navLink('Digital Lab', '/pages/lab/index.html', currentPath)}
        ${navLink('Ecosystem', '/pages/ecosystem/index.html', currentPath)}
        ${navLink('Contact', '/pages/contact/index.html', currentPath)}
      </nav>
      <div class="mobile-world-links"><span class="eyebrow">BROWSE THE FIVE WORLDS</span>${mobileWorldLinks}</div>
      <a class="button button--primary mobile-dialog-cta" href="/pages/contact/index.html">Prepare a project brief ${glyph('arrow', 15)}</a>
    </dialog>
  </header>`;
}

function footer() {
  const worldLinks = worlds.map((world) => `<a href="${servicesHref}#${world.id}"><span>${world.number}</span>${esc(world.title)}</a>`).join('');
  return `<footer class="site-footer">
    <div class="footer-cta">
      <div><span class="eyebrow">WHEN THE QUESTION IS STILL TAKING SHAPE</span><h2>Start with<br /><span class="display-italic">the context.</span></h2><p>No preset package. No promise before the problem is understood.</p></div>
      <a class="button button--primary" href="/pages/contact/index.html">Prepare a project brief ${glyph('arrow', 16)}</a>
    </div>
    <div class="footer-main">
      <div class="footer-brand-block"><a class="brand brand--footer" href="/"><span class="brand-word">ETERIOMN</span></a><p>Polymath digital studio<br />& ecosystem lab.</p><span class="footer-brand-note">The work between fields.</span></div>
      <div class="footer-column"><h2>Explore</h2><a href="/pages/work/index.html">Concept studies</a><a href="${collaborationHref}">Collaborations</a><a href="${servicesHref}">Services</a><a href="/pages/studio/index.html">Studio</a><a href="/pages/lab/index.html">Digital Lab</a><a href="/pages/ecosystem/index.html">Ecosystem</a></div>
      <div class="footer-column footer-world-column"><h2>Five worlds</h2><div class="footer-world-links">${worldLinks}</div></div>
      <div class="footer-column"><h2>Begin here</h2><p>Share the challenge and the context. The project brief stays on your device until you choose to download it.</p><a class="footer-contact-link" href="/pages/contact/index.html">Open the brief ${glyph('upRight', 14)}</a></div>
    </div>
    <div class="footer-bottom"><span>© <span data-year>${new Date().getFullYear()}</span> ETERIOMN</span><span>Concept work is labeled. No unverified outcomes.</span><nav class="footer-legal" aria-label="Legal information"><a href="/pages/legal/privacy-policy.html">Privacy</a><a href="/pages/legal/cookie-policy.html">Cookies</a><a href="/pages/legal/terms.html">Terms</a></nav></div>
  </footer>`;
}

function pageDocument({ title, description, path = '/', section = 'page', content, image = '', preloadImage = false, noIndex = false, styles = [], socialPreview = null }) {
  const configured = process.env.SITE_URL?.trim();
  const siteUrl = configured ? new URL(configured).origin.replace(/\/$/, '') : '';
  const isNotFound = path === '/404.html';
  const canonical = siteUrl && !isNotFound ? `<link rel="canonical" href="${esc(siteUrl + path)}" />` : '';
  const preview = socialPreview || {
    src: visualAssets.socialCard,
    alt: 'ETERIOMN wordmark with the phrase “The work between fields” beside the local sculptural hero image.',
    width: 1200,
    height: 630,
    mimeType: 'image/png'
  };
  const socialMeta = siteUrl && !isNotFound ? `<meta property="og:image" content="${esc(siteUrl + preview.src)}" /><meta property="og:image:type" content="${esc(preview.mimeType)}" /><meta property="og:image:width" content="${preview.width}" /><meta property="og:image:height" content="${preview.height}" /><meta property="og:image:alt" content="${esc(preview.alt)}" /><meta name="twitter:image" content="${esc(siteUrl + preview.src)}" /><meta name="twitter:image:alt" content="${esc(preview.alt)}" />` : '';
  const pageStyles = styles.map((href) => `<link rel="stylesheet" href="${esc(href)}" />`).join('\n  ');
  const robotsMeta = isNotFound || noIndex ? '<meta name="robots" content="noindex, follow" />' : '';
  const preload = preloadImage && image ? `<link rel="preload" as="image" href="${esc(image)}" fetchpriority="high" />` : '';
  const siteMeta = siteUrl && !isNotFound ? `<meta property="og:url" content="${esc(siteUrl + path)}" />` : '';
  return `<!doctype html>
<html lang="en" class="js-ready">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#0b0b0d" />
  <meta name="color-scheme" content="dark" />
  <meta name="description" content="${esc(description)}" />
  <title>${esc(title)}</title>
  ${robotsMeta}
  ${canonical}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ETERIOMN" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  ${siteMeta}
  ${socialMeta}
  <link rel="icon" href="${visualAssets.favicon}" type="image/svg+xml" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <link rel="preload" href="/assets/fonts/SpaceGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/Inter-Variable-Latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/IBMPlexMono-Medium-Latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/src/css/tokens.css" />
  <link rel="stylesheet" href="/src/css/base.css" />
  <link rel="stylesheet" href="/src/css/components.css" />
  <link rel="stylesheet" href="/src/css/pages.css" />
  <link rel="stylesheet" href="/src/css/responsive.css" />
  ${pageStyles}
  ${preload}
  <noscript><link rel="stylesheet" href="/src/css/no-js.css" /></noscript>
  <script type="module" src="/src/js/main.js"></script>
</head>
<body class="site-page page--${esc(section)}" data-page="${esc(section)}">
  ${header(path)}
  <main id="main">${content}</main>
  ${footer()}
</body>
</html>`;
}

function sectionHeading(index, eyebrow, title, description = '', id = '') {
  const headingId = id ? ` id="${esc(id)}"` : '';
  return `<header class="section-heading" data-reveal><div class="section-heading-index"><span class="page-number">${esc(index)}</span><span class="eyebrow">${esc(eyebrow)}</span></div><div class="section-heading-copy"><h2${headingId}>${title}</h2>${description ? `<p>${description}</p>` : ''}</div></header>`;
}

function projectFeature(project, index, { home = false } = {}) {
  const discipline = project.services.map((slug) => serviceBySlug(slug)?.title).filter(Boolean).slice(0, 3).join(' / ');
  const headingTag = home ? 'h3' : 'h2';
  return `<article class="project-feature project-feature--${index + 1}" data-project-card data-category="${esc(project.filter)}">
    <a class="project-feature-art" href="${projectHref(project.slug)}">
      <img src="${esc(project.image)}" alt="${esc(project.alt)}" width="${project.imageWidth}" height="${project.imageHeight}" loading="lazy" decoding="async" />
      <span class="concept-label">Concept study / fictional</span>
    </a>
    <div class="project-feature-copy">
      <div class="project-feature-meta"><span>${String(index + 1).padStart(2, '0')} / ${esc(project.category)}</span><span>Not client work</span></div>
      <${headingTag}><a href="${projectHref(project.slug)}">${esc(project.title)}</a></${headingTag}>
      <p class="project-subtitle">${esc(project.subtitle)}</p>
      <p>${esc(project.teaser)}</p>
      <span class="project-disciplines">${esc(discipline)}</span>
      <a class="arrow-link" href="${projectHref(project.slug)}">Read the concept study ${glyph('arrow', 16)}</a>
    </div>
  </article>`;
}

function collaborationTeaser(variant = 'home') {
  const project = spotlipseCollaboration;
  const sectionId = `collaboration-feature-${variant}`;
  const wrapperClass = variant === 'work' ? 'work-collaboration-feature' : 'home-collaboration';
  return `<section class="${wrapperClass} collaboration-teaser collaboration-teaser--${esc(variant)}" aria-labelledby="${sectionId}" data-reveal>
    <div class="container collaboration-teaser-grid">
      <figure class="collaboration-teaser-art"><img src="${esc(project.heroArtwork.src)}" alt="${esc(project.heroArtwork.alt)}" width="${project.heroArtwork.width}" height="${project.heroArtwork.height}" loading="lazy" decoding="async" /><figcaption><span>ORIGINAL SITE ILLUSTRATION</span><span>NOT OFFICIAL GAME ART</span></figcaption></figure>
      <div class="collaboration-teaser-copy"><div class="collaboration-teaser-meta"><span>COLLABORATIONS / 01</span><span>${esc(project.status.toUpperCase())}</span></div><p class="collab-lockup">${esc(project.partnership)}</p><h2 id="${sectionId}">Beyond<br /><span>Outpost</span></h2><p>${esc(project.teaser)}</p><p class="collab-credit-line"><span>PUBLIC DEVELOPMENT CREDIT</span> ${esc(project.developmentCredit)}</p><p class="collab-art-disclosure">${esc(project.scopeSummary)} Original concepts · not official game artwork.</p><a class="arrow-link" href="${collaborationHref}">Explore the collaboration ${glyph('arrow', 16)}</a></div>
    </div>
  </section>`;
}

function gameCollaborationPanel() {
  const project = spotlipseCollaboration;
  return `<section class="game-collaboration-panel section--compact" aria-labelledby="game-collaboration-title" data-reveal><div class="container"><div class="game-collaboration-meta"><span>FEATURED COLLABORATION / 01</span><span>${esc(project.status.toUpperCase())}</span></div><div class="game-collaboration-grid"><figure class="game-collaboration-art"><img src="${esc(project.artworks[0].src)}" alt="${esc(project.artworks[0].alt)}" width="${project.artworks[0].width}" height="${project.artworks[0].height}" loading="lazy" decoding="async" /><figcaption>ORIGINAL ILLUSTRATIVE CONCEPT / NOT OFFICIAL GAME ART</figcaption></figure><div class="game-collaboration-copy"><span class="collab-lockup">${esc(project.partnership)}</span><h2 id="game-collaboration-title">Beyond<br /><span>Outpost</span></h2><p>${esc(project.teaser)}</p><p class="game-collaboration-credit">PUBLIC DEVELOPMENT CREDIT / ${esc(project.developmentCredit)}</p><p class="game-collaboration-note">${esc(project.collaborationNote)}</p><a class="arrow-link" href="${collaborationHref}">Read the collaboration ${glyph('arrow', 16)}</a></div></div></div></section>`;
}

function worldRow(world) {
  const count = String(world.services.length).padStart(2, '0');
  const firstServices = world.services.slice(0, 2).map((slug) => {
    const item = serviceBySlug(slug);
    return `<li><a href="${serviceHref(slug)}">${esc(item.title)} ${glyph('upRight', 13)}</a></li>`;
  }).join('');
  return `<article class="world-row world-${world.id}" data-reveal>
    <div class="world-row-index"><span>${world.number}</span><small>${count} routes</small></div>
    <div class="world-row-copy"><span class="eyebrow">${esc(world.label)}</span><h3>${esc(world.title)}</h3><p>${esc(world.description)}</p><ul>${firstServices}</ul><a class="arrow-link" href="${servicesHref}#${world.id}">Explore ${esc(world.title.toLowerCase())} ${glyph('arrow', 15)}</a></div>
    <figure class="world-row-figure"><img src="${esc(visualAssets.worlds[world.id])}" alt="" width="${world.id === 'technology' ? 1264 : world.id === 'media' ? 1584 : world.id === 'creative' ? 1376 : 1408}" height="${world.id === 'technology' ? 848 : world.id === 'media' ? 672 : 768}" loading="lazy" decoding="async" /><figcaption><span>${world.number} / ${esc(world.title.toUpperCase())}</span><span>VISUAL STUDY</span></figcaption></figure>
  </article>`;
}

function pageIntro({ breadcrumb, index, eyebrow, title, description, aside = '', className = '' }) {
  return `<section class="page-intro ${className}"><div class="container"><div class="breadcrumbs"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${esc(breadcrumb)}</span></div><div class="page-intro-grid"><div><span class="eyebrow"><span class="page-number">${esc(index)}</span>${esc(eyebrow)}</span><h1>${title}</h1></div><div class="page-intro-aside"><p>${description}</p>${aside}</div></div><div class="page-intro-rail"><span>ETERIOMN / POLYMATH DIGITAL STUDIO & ECOSYSTEM LAB</span><span>${esc(index)} / 05</span></div></div></section>`;
}

export function renderHome() {
  const practiceRows = worlds.map(worldRow).join('');
  const workRows = projects.map((project, index) => projectFeature(project, index, { home: true })).join('');
  const method = [
    ['01', 'Understand', 'Find the real constraint before choosing a medium.'],
    ['02', 'Shape', 'Make the brief, the system, and the point of view clear.'],
    ['03', 'Build', 'Carry design decisions into a working, testable thing.'],
    ['04', 'Verify', 'Check what people actually encounter, then refine.']
  ];
  const content = `<section class="home-hero" aria-labelledby="home-title">
    <img class="home-hero-image" src="${visualAssets.hero}" width="1312" height="816" alt="A sculptural assembly of ivory ceramic, graphite metal, and violet glass, joined by a narrow amber line in a dark studio." fetchpriority="high" decoding="async" />
    <div class="home-hero-shade" aria-hidden="true"></div>
    <div class="container home-hero-inner">
      <div class="home-hero-copy"><span class="eyebrow hero-eyebrow"><span class="status-dot" aria-hidden="true"></span> POLYMATH DIGITAL STUDIO / ECOSYSTEM LAB</span><h1 id="home-title">The work<br />between<br /><span class="display-italic">fields.</span></h1><p class="home-hero-lede">ETERIOMN brings technology, creative direction, media, marketing, and practical IP support around one shared brief.</p><div class="hero-actions"><a class="button button--primary" href="/pages/contact/index.html">Start with a question ${glyph('arrow', 16)}</a><a class="button button--quiet" href="/pages/work/index.html">See concept studies ${glyph('upRight', 15)}</a></div></div>
      <div class="home-hero-aside"><span>01 — 05</span><p>Five disciplines.<br />One connected practice.</p></div>
      <div class="home-hero-foot"><span>TECHNOLOGY / CREATIVE / MEDIA / MARKETING / IP SUPPORT</span><span>01 / A SHARED POINT OF VIEW</span></div>
    </div>
  </section>

  <section class="home-thesis surface-paper section" aria-labelledby="thesis-title"><div class="container thesis-grid"><div class="thesis-index"><span class="page-number">01</span><span class="eyebrow">THE STUDIO PREMISE</span></div><div><h2 id="thesis-title">Start with the problem,<br /><span class="display-italic">not the department.</span></h2><p class="copy-lede">Digital work crosses boundaries. The audience sees one experience, not the hand-offs behind it. ETERIOMN makes the connections part of the work from the beginning.</p></div></div></section>

  <section class="home-practice section" aria-labelledby="practice-title"><div class="container">${sectionHeading('02', 'THE PRACTICE', 'Five lenses.<br /><span class="display-italic">Shared ground.</span>', 'Different crafts, considered together. Explore a world or go directly to one of its confirmed service routes.', 'practice-title')}
    <div class="world-rows">${practiceRows}</div><div class="section-endline"><span>34 CONFIRMED SERVICE ROUTES</span><a class="arrow-link" href="${servicesHref}">Browse the service index ${glyph('arrow', 15)}</a></div></div></section>

  <section class="home-work surface-paper section" aria-labelledby="work-title"><div class="container">${sectionHeading('03', 'SELECTED CONCEPT STUDIES', 'Questions, made<br /><span class="display-italic">visible.</span>', 'Three fictional explorations test how a point of view can become a clear, usable form. They are concept work—not client commissions or claims of delivered outcomes.', 'work-title')}
    <div class="project-feature-list">${workRows}</div><div class="section-endline"><span>SPECULATIVE / CLEARLY LABELED</span><a class="arrow-link" href="/pages/work/index.html">View all concept studies ${glyph('arrow', 15)}</a></div></div></section>

  ${collaborationTeaser('home')}

  <section class="home-method section" aria-labelledby="method-title"><div class="container">${sectionHeading('04', 'A WORKING METHOD', 'Keep the whole<br /><span class="display-italic">in view.</span>', 'A small set of useful checkpoints. The order flexes with the problem; specialist work is not forced through a generic funnel.', 'method-title')}
    <ol class="method-steps">${method.map(([number, title, text]) => `<li><span class="method-number">${number}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol><p class="method-note">A trademark-readiness brief and a digital product do not need the same process. The point is to keep the next decision clear.</p></div></section>

  <section class="home-lab surface-paper section--compact" aria-labelledby="home-lab-title"><div class="container home-lab-grid"><figure class="home-lab-art"><img src="${visualAssets.lab}" width="900" height="620" alt="" loading="lazy" decoding="async" /><figcaption><span>FIELD NOTE / 01</span><span>PROCEDURAL STUDY</span></figcaption></figure><div class="home-lab-copy"><span class="eyebrow">THE DIGITAL LAB / OPEN QUESTIONS</span><h2 id="home-lab-title">Curiosity is<br /><span class="display-italic">part of the craft.</span></h2><p>Small experiments in interaction, procedural graphics, and digital form. Built to answer a question—not to make the page harder to use.</p><a class="button button--outline" href="/pages/lab/index.html">Enter the Lab ${glyph('arrow', 15)}</a></div></div></section>

  <section class="home-close section" aria-labelledby="home-close-title"><div class="container home-close-inner"><span class="eyebrow">A CLEAR PLACE TO BEGIN</span><h2 id="home-close-title">What are you<br /><span class="display-italic">trying to change?</span></h2><p>Start with the context. The medium and scope can come later.</p><a class="button button--primary" href="/pages/contact/index.html">Prepare a project brief ${glyph('arrow', 16)}</a></div></section>`;
  return pageDocument({ title: 'ETERIOMN — The Work Between Fields', description: 'ETERIOMN is a polymath digital studio connecting technology, creative direction, media, marketing, and practical IP support around one shared brief.', path: '/', section: 'home', content, image: visualAssets.hero, preloadImage: true, styles: ['/src/css/collaboration.css'] });
}

export function renderServicesOverview() {
  const directory = worlds.map((world, worldIndex) => {
    const paper = worldIndex === 1 || worldIndex === 3 ? ' surface-paper' : '';
    const serviceRows = world.services.map((slug, serviceIndex) => {
      const service = serviceBySlug(slug);
      return `<a class="service-link-row" href="${serviceHref(slug)}"><span class="service-link-number">${world.number}.${String(serviceIndex + 1).padStart(2, '0')}</span><span class="service-link-copy"><strong>${esc(service.title)}</strong><small>${esc(service.intro)}</small></span><span class="service-link-arrow">${glyph('upRight', 17)}</span></a>`;
    }).join('');
    const imageWidth = world.id === 'technology' ? 1264 : world.id === 'media' ? 1584 : world.id === 'creative' ? 1376 : 1408;
    const imageHeight = world.id === 'technology' ? 848 : world.id === 'media' ? 672 : 768;
    return `<section class="world-section world-${world.id}${paper}" id="${world.id}" aria-labelledby="world-title-${world.id}"><div class="container"><div class="world-section-head"><div class="world-section-meta"><span class="page-number">${world.number}</span><span class="eyebrow">${esc(world.label)} / ${String(world.services.length).padStart(2, '0')} ROUTES</span></div><div class="world-section-copy"><h2 id="world-title-${world.id}">${esc(world.title)}</h2><p>${esc(world.description)}</p></div><figure class="world-section-art"><img src="${esc(visualAssets.worlds[world.id])}" alt="" width="${imageWidth}" height="${imageHeight}" loading="lazy" decoding="async" /><figcaption>${esc(world.descriptor)}</figcaption></figure></div><div class="service-directory-list">${serviceRows}</div>${world.id === 'legal' ? '<p class="world-legal-note">Legal Support describes practical organization and IP-work preparation only. It is not legal representation or a substitute for advice from qualified counsel.</p>' : ''}</div></section>`;
  }).join('');
  const content = `${pageIntro({ breadcrumb: 'Services', index: '01', eyebrow: 'THE SERVICE INDEX', title: 'One practice.<br /><span class="display-italic">Many entry points.</span>', description: 'Five connected worlds, each with a distinct craft. Start with the specialist question or explore the wider system around it.', aside: '<span class="service-total"><strong>34</strong><span>confirmed<br />service routes</span></span>', className: 'page-intro--services' })}
    <nav class="world-jump" aria-label="Jump to a service world"><div class="container">${worlds.map((world) => `<a href="#${world.id}"><span>${world.number}</span>${esc(world.title)}</a>`).join('')}</div></nav>
    ${directory}<section class="service-index-close section--compact"><div class="container service-index-close-inner"><span class="eyebrow">A USEFUL FIRST STEP</span><p>Not sure which route fits? Share the challenge; the scope can follow.</p><a class="arrow-link" href="/pages/contact/index.html">Start with the context ${glyph('arrow', 15)}</a></div></section>`;
  return pageDocument({ title: 'Services — ETERIOMN', description: 'Explore 34 confirmed ETERIOMN service routes across technology, creative, media, marketing, and practical intellectual-property support.', path: servicesHref, section: 'services', content });
}

export function renderWork() {
  const filters = `<div class="work-filter-bar" data-work-filters role="group" aria-label="Filter concept studies" hidden><span class="eyebrow">FILTER BY WORLD</span><div><button type="button" data-filter="all" aria-pressed="true">All</button><button type="button" data-filter="technology" aria-pressed="false">Technology</button><button type="button" data-filter="creative" aria-pressed="false">Creative</button><button type="button" data-filter="media" aria-pressed="false">Media</button></div></div>`;
  const features = projects.map((project, index) => projectFeature(project, index)).join('');
  const content = `${pageIntro({ breadcrumb: 'Work', index: '02', eyebrow: 'WORK / COLLABORATIONS', title: 'Questions,<br /><span class="display-italic">made visible.</span>', description: 'Three original fictional concept studies sit alongside a separately labeled collaboration around Beyond Outpost. Their status and responsibilities are kept distinct.', aside: '<span class="concept-note">3 CONCEPT STUDIES<br />1 FEATURED COLLABORATION</span>', className: 'page-intro--work' })}
    <section class="work-index surface-paper section"><div class="container"><div class="work-index-head"><span class="eyebrow">A SMALL, INTENTIONAL COLLECTION</span><span class="result-count" data-result-count aria-live="polite" aria-atomic="true">Showing 3 studies</span></div>${filters}<div class="project-feature-list" data-project-grid>${features}</div><p class="empty-filter-state" data-empty-state hidden>No concept studies in this category yet.</p></div></section>
    ${collaborationTeaser('work')}
    <section class="work-ethos section--compact"><div class="container work-ethos-inner"><span class="eyebrow">A NOTE ON THE WORK</span><p>The three concept studies are <strong>speculative explorations</strong>, not commissioned client work. The Beyond Outpost collaboration is presented separately, with project credits kept explicit.</p></div></section>`;
  return pageDocument({ title: 'Concept Studies & Collaborations — ETERIOMN', description: 'Explore three fictional ETERIOMN concept studies and a separately labeled creative collaboration around Beyond Outpost.', path: '/pages/work/index.html', section: 'work', content, styles: ['/src/css/collaboration.css'] });
}

export function renderProject(project) {
  const index = projects.findIndex((candidate) => candidate.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const serviceLinks = project.services.map((slug) => {
    const service = serviceBySlug(slug);
    return service ? `<a href="${serviceHref(slug)}">${esc(service.title)} ${glyph('upRight', 14)}</a>` : '';
  }).join('');
  const content = `<article class="case-page case-page--${esc(project.filter)}">
    <header class="case-heading container"><div class="breadcrumbs"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/pages/work/index.html">Work</a><span aria-hidden="true">/</span><span aria-current="page">${esc(project.title)}</span></div><div class="case-heading-grid"><div><span class="eyebrow"><span class="page-number">${String(index + 1).padStart(2, '0')}</span> FICTIONAL CONCEPT / ${esc(project.category.toUpperCase())}</span><h1>${esc(project.title)}<span class="display-italic">.</span></h1><p class="case-subtitle">${esc(project.subtitle)}</p></div><div class="case-status"><span class="concept-label">Speculative / not client work</span><p>This original study is fictional. It does not represent a real client, product, or commercial outcome.</p></div></div></header>
    <figure class="case-featured container"><img src="${esc(project.image)}" alt="${esc(project.alt)}" width="${project.imageWidth}" height="${project.imageHeight}" fetchpriority="high" decoding="async" /><figcaption><span>VISUAL STUDY / ${String(index + 1).padStart(2, '0')}</span><span>ETERIOMN / CONCEPT WORK</span></figcaption></figure>
    <section class="case-overview surface-paper section"><div class="container case-overview-grid"><div><span class="eyebrow">THE BRIEF / IN FICTION</span><p class="case-overview-copy">${esc(project.overview)}</p></div><dl class="case-facts"><div><dt>Discipline</dt><dd>${esc(project.category)}</dd></div><div><dt>Status</dt><dd>Speculative concept</dd></div><div><dt>Scope</dt><dd>Visual and experience study</dd></div></dl></div></section>
    <section class="case-notes section"><div class="container case-notes-grid">${[["01", "The question", project.objective], ["02", "The direction", project.direction], ["03", "The system", project.system]].map(([number, title, text]) => `<article><span class="page-number">${number} / ${esc(project.category.toUpperCase())}</span><h2>${title}</h2><p>${esc(text)}</p></article>`).join('')}</div></section>
    <section class="case-disciplines surface-paper section--compact"><div class="container case-disciplines-grid"><div><span class="eyebrow">RELATED CAPABILITIES</span><h2>Disciplines<br /><span class="display-italic">in the study.</span></h2></div><div class="case-service-links">${serviceLinks}</div></div></section>
    <section class="case-next container"><div><span class="eyebrow">NEXT CONCEPT / ${esc(next.category.toUpperCase())}</span><h2>${esc(next.title)}</h2></div><a class="button button--outline" href="${projectHref(next.slug)}">Read the next study ${glyph('arrow', 15)}</a></section>
  </article>`;
  return pageDocument({ title: `${project.title} — Fictional Concept Study | ETERIOMN`, description: `${project.title}: ${project.teaser} A fictional, speculative ETERIOMN study—not client work.`, path: projectHref(project.slug), section: 'case-study', content, image: project.image, preloadImage: true });
}

function serviceArtwork(service) {
  const visualId = serviceIllustrationId(service.slug);
  const description = serviceIllustrationDescription(service.slug);
  return `<figure class="service-art"><svg class="service-art-svg" viewBox="0 0 620 440" role="img" aria-labelledby="service-art-title-${esc(service.slug)} service-art-desc-${esc(service.slug)}"><title id="service-art-title-${esc(service.slug)}">${esc(service.title)} visual study</title><desc id="service-art-desc-${esc(service.slug)}">${esc(description)}</desc><rect width="620" height="440" fill="#141419"/><use href="${visualAssets.serviceAtlas}#${visualId}"></use></svg><figcaption class="art-caption"><span>${esc(service.title.toUpperCase())} / ORIGINAL VECTOR STUDY</span><span>ETERIOMN / ${esc(service.world.toUpperCase())}</span></figcaption></figure>`;
}

export function renderService(service) {
  const world = getWorld(service.world);
  const worldIndex = world.services.indexOf(service.slug) + 1;
  const related = getRelatedServices(service).map((candidate, index) => `<a class="related-service-row" href="${serviceHref(candidate.slug)}"><span>${world.number}.${String(index + 1).padStart(2, '0')}</span><strong>${esc(candidate.title)}</strong><span>${glyph('upRight', 15)}</span></a>`).join('');
  const deliverables = service.deliverables.map((item, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${esc(item)}</p></li>`).join('');
  const process = world.process.map(([title, text], index) => `<li><span>${world.number}.${index + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></li>`).join('');
  const faqs = [...service.faqs, ['How do we get started?', 'Share the context, what you hope will change, and any constraints you already know. The first step is a conversation about fit and scope—not a commitment to a preset package.']].map(([question, answer], index) => `<details class="faq-item"><summary><span class="faq-index">${String(index + 1).padStart(2, '0')}</span><span class="faq-question">${esc(question)}</span><span class="faq-plus" aria-hidden="true">+</span></summary><div class="faq-answer"><p>${esc(answer)}</p></div></details>`).join('');
  const legalNote = service.world === 'legal' ? '<p class="service-boundary-note">Practical organization and IP-work preparation only. This service does not provide legal representation, legal advice, filings, or guaranteed outcomes. A qualified lawyer may be needed for jurisdiction-specific guidance.</p>' : '';
  const content = `<article class="service-page service--${world.id}">
    <header class="service-hero container"><div class="breadcrumbs"><a href="/">Home</a><span aria-hidden="true">/</span><a href="${servicesHref}">Services</a><span aria-hidden="true">/</span><a href="${servicesHref}#${world.id}">${esc(world.title)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(service.title)}</span></div>
      <div class="service-hero-grid"><div class="service-hero-copy"><span class="eyebrow"><span class="page-number">${world.number}.${String(worldIndex).padStart(2, '0')}</span> ${esc(world.title.toUpperCase())} / SERVICE STUDY</span><h1>${esc(service.title)}<span class="display-italic">.</span></h1><p class="copy-lede">${esc(service.intro)}</p><div class="service-hero-actions"><a class="button button--primary" href="/pages/contact/index.html?service=${encodeURIComponent(service.title)}">Prepare a brief for this service ${glyph('arrow', 16)}</a><a class="arrow-link" href="${servicesHref}#${world.id}">Back to ${esc(world.title.toLowerCase())} ${glyph('upRight', 14)}</a></div></div>${serviceArtwork(service)}</div>
      <div class="service-hero-rail"><span>${esc(world.descriptor)}</span><span>01 / THE WORK</span></div>
    </header>
    <section class="service-brief surface-paper section"><div class="container service-brief-grid"><div class="service-brief-heading"><span class="eyebrow">WHY THIS WORK</span><h2>Start with<br /><span class="display-italic">the real need.</span></h2></div><div class="service-brief-copy"><article><span>01 / FOR</span><p>${esc(service.audience)}</p></article><article><span>02 / CHALLENGE</span><p>${esc(service.challenge)}</p></article>${legalNote}</div></div></section>
    <section class="service-scope section"><div class="container">${sectionHeading('02', 'PRACTICAL SCOPE', 'What the work<br /><span class="display-italic">can include.</span>', 'Every engagement is shaped around its brief. A useful scope may include:')}<ol class="deliverable-list">${deliverables}</ol></div></section>
    <section class="service-process surface-paper section"><div class="container">${sectionHeading('03', `${world.title.toUpperCase()} / WORKING METHOD`, 'A process with<br /><span class="display-italic">useful checkpoints.</span>', esc(world.description))}<ol class="service-process-list">${process}</ol></div></section>
    <section class="service-point-of-view section"><div class="container service-pov-grid"><span class="page-number">04 / ETERIOMN</span><div><span class="eyebrow">A POINT OF VIEW</span><p>${esc(service.difference)}</p></div></div></section>
    ${service.slug === 'game-development' ? gameCollaborationPanel() : ''}
    <section class="service-faq surface-paper section"><div class="container service-faq-grid"><div><span class="eyebrow">BEFORE THE BRIEF</span><h2>Good questions<br /><span class="display-italic">come first.</span></h2><p>These are starting points—not a substitute for a project conversation or specialist advice where required.</p></div><div class="faq-list">${faqs}</div></div></section>
    <section class="related-services section--compact"><div class="container"><div class="related-services-heading"><div><span class="eyebrow">CONNECTED WORK</span><h2>Related services</h2></div><a class="arrow-link" href="${servicesHref}#${world.id}">View ${esc(world.title.toLowerCase())} ${glyph('arrow', 14)}</a></div><div class="related-service-list">${related}</div></div></section>
    <section class="service-cta surface-paper section--compact"><div class="container service-cta-inner"><span class="eyebrow">A CLEAR NEXT STEP</span><h2>Shape the right<br /><span class="display-italic">version of this.</span></h2><p>Start with the change you want to make. The scope can follow the context.</p><a class="button button--primary" href="/pages/contact/index.html?service=${encodeURIComponent(service.title)}">Prepare a project brief ${glyph('arrow', 16)}</a></div></section>
  </article>`;
  return pageDocument({ title: `${service.title} — ${world.title} | ETERIOMN`, description: service.meta, path: serviceHref(service.slug), section: `service service--${world.id}`, content, styles: service.slug === 'game-development' ? ['/src/css/collaboration.css'] : [] });
}

export function renderSpotlipseCollaboration() {
  const project = spotlipseCollaboration;
  const hero = project.heroArtwork;
  const gallery = project.artworks.map((artwork) => `<figure class="collab-artwork"><a class="collab-artwork-link" href="${esc(artwork.src)}" data-collab-image data-image-title="${esc(artwork.title)}" aria-label="View full image: ${esc(artwork.title)}" aria-haspopup="dialog" aria-controls="collab-lightbox"><img src="${esc(artwork.src)}" alt="${esc(artwork.alt)}" width="${artwork.width}" height="${artwork.height}" loading="lazy" decoding="async" /><span class="collab-artwork-zoom">View full image ${glyph('upRight', 14)}</span></a><figcaption><span>${esc(artwork.label)}</span><span>ILLUSTRATIVE / NOT OFFICIAL ART</span></figcaption></figure>`).join('');
  const content = `<article class="collab-page">
    <section class="collab-hero container" aria-labelledby="collab-page-title">
      <div class="breadcrumbs"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/pages/work/index.html">Work</a><span aria-hidden="true">/</span><span aria-current="page">Spotlipse collaboration</span></div>
      <div class="collab-hero-heading"><div><span class="eyebrow">01 / ${esc(project.eyebrow)}</span><h1 id="collab-page-title"><span>ETERIOMN</span><span class="collab-x" aria-hidden="true">×</span><span>SPOTLIPSE</span></h1></div><div class="collab-hero-statement"><p>${esc(project.description)}</p><p class="collab-studio-claim">A polymath studio for the digital age.</p><p class="collab-motto">Art. Science. Technology.<br />Building what comes next.</p></div></div>
      <figure class="collab-hero-art"><a class="collab-hero-media" href="${esc(hero.src)}" data-collab-image data-image-title="Beyond Outpost / lunar habitat study" aria-label="View full image: Beyond Outpost lunar habitat study" aria-haspopup="dialog" aria-controls="collab-lightbox"><img src="${esc(hero.src)}" alt="${esc(hero.alt)}" width="${hero.width}" height="${hero.height}" fetchpriority="high" decoding="async" /><span class="collab-artwork-zoom">View full image ${glyph('upRight', 14)}</span></a><figcaption class="collab-image-caption"><span>BEYOND OUTPOST / ORIGINAL SITE ILLUSTRATION / NOT OFFICIAL GAME ART</span><span>PIXEL-ART VISUAL STUDY / 01</span></figcaption></figure>
      <div class="collab-hero-rail"><span>VISUAL STATUS / ${esc(project.visualStatus.toUpperCase())} / PROJECT INFORMATION LINKED BELOW</span><span>ETERIOMN × SPOTLIPSE</span></div>
    </section>

    <section class="collab-world-intro" aria-labelledby="collab-world-title"><div class="container collab-world-grid"><div><span class="eyebrow">OUR NEXT WORLD</span><h2 id="collab-world-title">Beyond<br /><span>Outpost.</span></h2></div><div class="collab-world-copy"><p>ETERIOMN and Spotlipse are collaborating around Beyond Outpost. Explore an early illustrative look at the project's visual direction as its world continues to evolve.</p><div class="collab-status-row"><span class="collab-status-dot" aria-hidden="true"></span><span>PROJECT STATUS / ${esc(project.status.toUpperCase())}</span><time datetime="${esc(project.statusVerifiedOn)}">STATUS CHECKED ${esc(project.statusVerifiedOn)}</time></div></div></div></section>

    <section class="collab-project-info" aria-labelledby="collab-info-title"><div class="container"><div class="collab-section-heading"><span class="eyebrow">PROJECT INFORMATION</span><h2 id="collab-info-title">A clear brief.<br /><em>A distinct credit.</em></h2></div><dl class="collab-facts"><div><dt>Project</dt><dd>${esc(project.title)}</dd></div><div><dt>Collaboration</dt><dd>${esc(project.partnership)}</dd></div><div><dt>Category</dt><dd>${esc(project.category)}</dd></div><div><dt>Development credit</dt><dd>${esc(project.developmentCredit)}</dd></div></dl><div class="collab-scope-note"><span class="eyebrow">COLLABORATION SCOPE</span><p>${esc(project.collaborationNote)}</p></div><p class="collab-source-note">${esc(project.sourceContext)} <a href="${esc(project.externalProjectUrl)}" target="_blank" rel="noopener noreferrer">View Spotlipse’s current project information ${glyph('upRight', 13)}</a><span aria-hidden="true"> · </span><a href="${esc(project.externalAnnouncementUrl)}" target="_blank" rel="noopener noreferrer">View Spotlipse’s current collaboration page ${glyph('upRight', 13)}</a></p></div></section>

    <section class="collab-visuals" aria-labelledby="collab-visuals-title"><div class="container"><div class="collab-visuals-intro"><div><span class="eyebrow">01 / VISUAL EXPLORATION</span><h2 id="collab-visuals-title">A world<br /><span>taking shape.</span></h2></div><p>Original illustrative concept studies created for this ETERIOMN page. They are not official Beyond Outpost artwork, gameplay screenshots, or confirmed game assets. Select an image to view it full size.</p></div><div class="collab-art-gallery">${gallery}</div></div></section>

    <section class="collab-meaning" aria-labelledby="collab-meaning-title"><div class="container collab-meaning-grid"><span class="eyebrow">CREATIVE MINDS / SHARED DIRECTION</span><div class="collab-meaning-copy"><h2 id="collab-meaning-title">Art. Science.<br /><span>Technology.</span></h2><p>This page presents a creative collaboration between ETERIOMN and Spotlipse around the visual direction of Beyond Outpost. It does not describe a division of production responsibilities or claim that ETERIOMN developed the full game.</p><p class="collab-meaning-note">The pixel-art scenes shown here were generated as original illustrative concepts for this page. They are not official project materials and should not be read as confirmed locations, gameplay systems, or release features.</p></div></div></section>

    <section class="collab-more" aria-labelledby="collab-more-title"><div class="container collab-more-grid"><div><span class="eyebrow">MORE INFORMATION</span><h2 id="collab-more-title">The story continues<br /><span>with the project.</span></h2></div><div class="collab-more-copy"><p>Follow the current project information from Spotlipse, or explore the wider ETERIOMN practice and its concept studies.</p><div class="collab-more-actions"><a class="button button--primary" href="${esc(project.externalProjectUrl)}" target="_blank" rel="noopener noreferrer">More about Beyond Outpost ${glyph('upRight', 15)}</a><a class="button button--outline" href="/pages/work/index.html">Explore ETERIOMN</a><a class="button button--outline" href="${esc(project.partnerUrl)}" target="_blank" rel="noopener noreferrer">Visit Spotlipse ${glyph('upRight', 14)}</a></div></div></div></section>

    <section class="collab-close container" aria-labelledby="collab-close-title"><span class="eyebrow">A POLYMATH STUDIO FOR THE DIGITAL AGE</span><h2 id="collab-close-title">Ideas become worlds.<br /><span>Worlds become experiences.</span></h2><p>Keep the whole question in view. Build what comes next.</p><a class="button button--primary" href="/">Explore ETERIOMN ${glyph('arrow', 15)}</a></section>

    <dialog class="collab-lightbox" id="collab-lightbox" data-collab-lightbox aria-labelledby="collab-lightbox-heading"><div class="collab-lightbox-inner"><header class="collab-lightbox-head"><h2 class="collab-lightbox-title" id="collab-lightbox-heading" data-lightbox-title aria-live="polite" aria-atomic="true">Beyond Outpost / lunar habitat study</h2><button class="collab-lightbox-close" type="button" data-lightbox-close aria-label="Close image viewer">${glyph('close', 20)}</button></header><figure class="collab-lightbox-figure"><img data-lightbox-image src="${esc(hero.src)}" alt="${esc(hero.alt)}" width="${hero.width}" height="${hero.height}" decoding="async" /><figcaption data-lightbox-caption>Original illustrative concept · not official game artwork</figcaption></figure><div class="collab-lightbox-controls"><button type="button" data-lightbox-previous>Previous image</button><span class="collab-lightbox-counter" data-lightbox-counter aria-live="polite">01 / 03</span><button type="button" data-lightbox-next>Next image</button></div></div></dialog>
  </article>`;
  return pageDocument({
    title: 'ETERIOMN × Spotlipse — Beyond Outpost',
    description: 'A creative collaboration exploring the early visual direction of Beyond Outpost. Original illustrative concepts are clearly distinguished from official game artwork.',
    path: collaborationHref,
    section: 'collaboration',
    content,
    image: hero.src,
    preloadImage: true,
    styles: ['/src/css/collaboration.css'],
    socialPreview: { src: hero.src, alt: 'Original pixel-art lunar habitat illustration made for the ETERIOMN × Spotlipse collaboration page; not official Beyond Outpost artwork.', width: hero.width, height: hero.height, mimeType: 'image/webp' }
  });
}

export function renderStudio() {
  const principles = [
    ['01', 'Join the parts', 'Keep strategy, design, technology, and delivery in the same conversation.'],
    ['02', 'Name the constraints', 'Separate facts, assumptions, and open questions before committing to a direction.'],
    ['03', 'Make the system visible', 'Show how the pieces connect so that decisions remain understandable.'],
    ['04', 'Leave a clear handoff', 'Document what is ready, what remains uncertain, and who owns the next decision.']
  ];
  const disciplines = worlds.map((world) => `<li class="world-${world.id}"><span>${world.number}</span><strong>${esc(world.title)}</strong><small>${esc(world.descriptor)}</small></li>`).join('');
  const content = `${pageIntro({ breadcrumb: 'Studio', index: '03', eyebrow: 'A POLYMATH DIGITAL STUDIO', title: 'Many kinds<br />of <span class="display-italic">thinking.</span>', description: 'ETERIOMN connects disciplines around the whole problem. The name describes a point of view—not a claim about company size, client history, or a team that has not been documented.', aside: '<a class="arrow-link" href="/pages/ecosystem/index.html">See how the practice connects ' + glyph('arrow', 15) + '</a>', className: 'page-intro--studio' })}
    <section class="studio-thesis surface-paper section"><div class="container studio-thesis-grid"><div><span class="eyebrow">OUR POSITION / NOT A CLAIM OF SCALE</span><span class="page-number">01</span></div><div><p>A website, a product, a campaign, and a record of ownership are not separate answers. They are connected decisions around a real human need.</p><p>ETERIOMN makes those connections explicit, gives the work a coherent form, and stays clear about the limits of what is known.</p></div></div></section>
    <section class="studio-principles section"><div class="container">${sectionHeading('02', 'THE WORKING PRINCIPLES', 'Keep the craft<br /><span class="display-italic">honest and useful.</span>', 'The visual choices are only the visible layer. These rules keep the experience credible beneath it.')}<ol class="principle-list">${principles.map(([number, title, text]) => `<li><span>${number}</span><div><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ol></div></section>
    <section class="studio-disciplines surface-paper section--compact"><div class="container studio-disciplines-grid"><div><span class="eyebrow">ONE STUDIO / FIVE WORLDS</span><h2>Range without<br /><span class="display-italic">the relay race.</span></h2><p>Each discipline brings a different lens. They meet through shared briefs, clear handoffs, and an understanding of the same objective.</p><a class="arrow-link" href="${servicesHref}">Explore the service index ${glyph('arrow', 15)}</a></div><ol class="studio-world-list">${disciplines}</ol></div></section>
    <section class="studio-close section--compact"><div class="container studio-close-inner"><span class="eyebrow">A CONVERSATION, NOT A PITCH DECK</span><h2>Start with the<br /><span class="display-italic">thing that matters.</span></h2><a class="button button--primary" href="/pages/contact/index.html">Share the context ${glyph('arrow', 15)}</a></div></section>`;
  return pageDocument({ title: 'Studio — ETERIOMN', description: 'Learn about ETERIOMN’s multidisciplinary studio philosophy: connected thinking across technology, creative, media, marketing, and practical IP support.', path: '/pages/studio/index.html', section: 'studio', content });
}

export function renderEcosystem() {
  const lanes = worlds.map((world) => `<li class="ecosystem-lane world-${world.id}"><a href="${servicesHref}#${world.id}"><span>${world.number}</span><strong>${esc(world.title)}</strong><small>${String(world.services.length).padStart(2, '0')} services</small></a><span class="ecosystem-lane-rule" aria-hidden="true"></span></li>`).join('');
  const content = `${pageIntro({ breadcrumb: 'Ecosystem', index: '04', eyebrow: 'THE SYSTEM BEHIND THE STUDIO', title: 'Connected by<br /><span class="display-italic">the question.</span>', description: 'Five distinct disciplines share one working premise: understand the challenge before choosing the medium. This map describes a practice, not a corporate group chart.', aside: '<span class="concept-note">ONE SHARED BRIEF<br />FIVE USEFUL LENSES</span>', className: 'page-intro--ecosystem' })}
    <section class="ecosystem-visual section"><div class="container"><figure class="ecosystem-diagram" aria-labelledby="ecosystem-caption"><ol class="ecosystem-lanes">${lanes}</ol><div class="ecosystem-convergence"><span class="eyebrow">THE COMMON THREAD</span><strong>One shared<br />brief.</strong><p>Audience / context / constraint</p></div><div class="ecosystem-outputs"><span class="eyebrow">THE WORK TAKES SHAPE</span><ul><li>Experience</li><li>System</li><li>Expression</li><li>Stewardship</li></ul></div><figcaption id="ecosystem-caption"><span>FIG. 01</span><span>A shared objective gives each discipline a useful place in the work.</span></figcaption></figure></div></section>
    <section class="ecosystem-principle surface-paper section"><div class="container ecosystem-principle-grid"><div><span class="eyebrow">HOW IT CONNECTS</span><h2>From the first<br /><span class="display-italic">question to the next.</span></h2></div><div><p>A project may begin in one world and need another to finish well: a product needs a story; a story needs a system; a system needs clear ownership.</p><p>We make those connections visible. Scope stays understandable, specialist limits stay clear, and the next step is easier to choose.</p><a class="arrow-link" href="${servicesHref}">Browse all confirmed services ${glyph('arrow', 15)}</a></div></div></section>
    <section class="ecosystem-worlds section--compact"><div class="container"><div class="related-services-heading"><div><span class="eyebrow">EXPLORE THE FIVE WORLDS</span><h2>Choose a useful lens.</h2></div></div><div class="ecosystem-world-links">${worlds.map((world) => `<a class="world-${world.id}" href="${servicesHref}#${world.id}"><span>${world.number}</span><strong>${esc(world.title)}</strong><small>${esc(world.descriptor)}</small>${glyph('arrow', 15)}</a>`).join('')}</div></div></section>`;
  return pageDocument({ title: 'Ecosystem — ETERIOMN', description: 'Explore how ETERIOMN connects five disciplines through shared briefs, clear handoffs, and a coherent point of view.', path: '/pages/ecosystem/index.html', section: 'ecosystem', content });
}

export function renderLab() {
  const content = `${pageIntro({ breadcrumb: 'Digital Lab', index: '05', eyebrow: 'THE DIGITAL LAB / EXPERIMENT 001', title: 'Curiosity,<br /><span class="display-italic">made testable.</span>', description: 'Small experiments in interaction and digital form. The lab is an open place to test a question—not a promise that every prototype becomes a product.', aside: '<span class="concept-note">NO WEBGL / STATIC FALLBACK INCLUDED</span>', className: 'page-intro--lab' })}
    <section class="lab-experiment section"><div class="container"><div class="lab-experiment-head"><div><span class="eyebrow">01 / SIGNAL FIELD</span><h2>A field that<br /><span class="display-italic">notices you.</span></h2></div><div><p>A procedural contour study responds to a pointer or a keyboard-adjustable signal position. The drawing is decorative; it carries no essential information.</p><span class="lab-status-label">OPTIONAL CANVAS STUDY / STATIC IMAGE AVAILABLE</span></div></div>
      <div class="experiment-frame"><img class="lab-static-fallback" src="${visualAssets.lab}" width="1200" height="720" alt="" /><canvas class="signal-canvas" data-signal-canvas aria-hidden="true" hidden></canvas><div class="experiment-frame-label"><span>CONTOUR / POSITION STUDY</span><span>LOCAL CANVAS / NO NETWORK</span></div></div>
      <div class="lab-controls" data-lab-controls hidden><label for="signal-position">Signal position <input id="signal-position" type="range" min="0" max="100" value="50" aria-describedby="signal-hint" /></label><button class="button button--outline" type="button" data-lab-reset>Reset field ${glyph('plus', 14)}</button><span class="sr-only" id="signal-hint">Move the slider with arrow keys, or move a pointer over the image.</span></div>
      <p class="experiment-accessible-note">Reduced-motion preferences remove animated interpolation. The static composition remains available if JavaScript, canvas, or graphics acceleration is unavailable.</p>
    </div></section>
    <section class="lab-log surface-paper section"><div class="container">${sectionHeading('02', 'THE EXPERIMENT LOG', 'Keep the experiment<br /><span class="display-italic">small enough to learn from.</span>', 'A prototype is useful when it makes a question easier to answer. These studies remain separate from production claims.')}<ol class="lab-log-list"><li><span>01 / PROCEDURAL</span><h3>Signal field</h3><p>Canvas contours react to an explicit input and stop when the interaction ends.</p><span class="lab-tag">INTERACTION STUDY</span></li><li><span>02 / SYSTEMS</span><h3>Five-world index</h3><p>A typographic map tests how distinct capabilities can stay legible in one practice.</p><span class="lab-tag">INFORMATION STUDY</span></li><li><span>03 / MATERIAL</span><h3>Convergence object</h3><p>A sculptural still life explores how material contrast can suggest collaboration.</p><span class="lab-tag">IMAGE STUDY</span></li></ol></div></section>
    <section class="lab-guardrails section--compact"><div class="container"><span class="eyebrow">BUILT TO DEGRADE GRACEFULLY</span><p>The page remains readable without motion, JavaScript, or a canvas context. The experiment never gates navigation or content.</p></div></section>`;
  return pageDocument({ title: 'Digital Lab — ETERIOMN', description: 'Explore an optional procedural canvas interaction study and the principles behind ETERIOMN’s experimental digital lab.', path: '/pages/lab/index.html', section: 'lab', content });
}

export function renderContact() {
  const options = worlds.map((world) => `<optgroup label="${esc(world.title)}">${world.services.map((slug) => `<option value="${esc(serviceBySlug(slug).title)}">${esc(serviceBySlug(slug).title)}</option>`).join('')}</optgroup>`).join('');
  const content = `${pageIntro({ breadcrumb: 'Contact', index: '06', eyebrow: 'CONTACT / PROJECT BRIEF', title: 'Start with<br /><span class="display-italic">what matters.</span>', description: 'Share the context, what you want to change, and what you already know. The first useful step is understanding the brief.', aside: '<span class="contact-honesty"><span class="status-dot" aria-hidden="true"></span> LOCAL DRAFT ONLY / NOTHING IS SENT</span>', className: 'page-intro--contact' })}
    <section class="contact-section section"><div class="container contact-grid"><div class="contact-explainer"><span class="eyebrow">A FEW USEFUL DETAILS</span><h2>A little context<br /><span class="display-italic">goes a long way.</span></h2><p>This brief works entirely in your browser. It does not transmit or store your information. Prepare a local text draft and download it to keep or share yourself.</p><div class="contact-caveat"><span>PLEASE NOTE</span><p>Online delivery is not configured. Do not include confidential or sensitive information in this local draft.</p></div></div>
      <div class="contact-form-wrap"><noscript><p class="noscript-note">This local brief builder requires JavaScript. No information is submitted online.</p></noscript>
      <form class="project-form" id="project-form" hidden>
        <div class="form-grid"><div class="form-field"><label for="name">Your name <span aria-hidden="true">*</span></label><input id="name" name="name" type="text" autocomplete="name" required minlength="2" maxlength="100" aria-describedby="name-help" /><small id="name-help">Required.</small></div><div class="form-field"><label for="email">Email address <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required maxlength="160" aria-describedby="email-help" /><small id="email-help">Required. This remains in the local draft only.</small></div>
        <div class="form-field"><label for="company">Company <span class="optional">Optional</span></label><input id="company" name="company" type="text" autocomplete="organization" maxlength="120" /></div><div class="form-field"><label for="service">Service area <span class="optional">Optional</span></label><select id="service" name="service"><option value="">Not sure yet</option>${options}</select></div>
        <div class="form-field"><label for="budget">Budget context <span class="optional">Optional</span></label><input id="budget" name="budget" type="text" maxlength="120" placeholder="If known, include a range and currency." /></div><div class="form-field"><label for="timeline">Timing <span class="optional">Optional</span></label><select id="timeline" name="timeline"><option value="">Flexible / not decided</option><option>As soon as practical</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Longer-term planning</option></select></div>
        <div class="form-field form-field--wide"><label for="project">What are you trying to make or change? <span aria-hidden="true">*</span></label><textarea id="project" name="project" rows="6" required minlength="20" maxlength="3000" placeholder="A few sentences about the context, the challenge, and what a useful outcome might look like." aria-describedby="project-help"></textarea><small id="project-help">20–3,000 characters. Avoid confidential details; nothing is submitted online.</small></div></div>
        <div class="form-actions"><button class="button button--primary" type="submit">Prepare local draft ${glyph('arrow', 16)}</button><span class="form-privacy-note">Local only. No network request is made.</span></div>
        <div class="form-status" id="form-status" role="status" aria-live="polite" tabindex="-1" hidden></div>
        <a class="button button--outline brief-download" id="brief-download" href="/pages/contact/index.html" download="eteriomn-project-brief.txt" hidden>Download local draft ${glyph('arrow', 15)}</a>
      </form></div></div></section>
    <section class="contact-after surface-paper section--compact"><div class="container contact-after-grid"><span class="eyebrow">WHAT HAPPENS NEXT</span><div><h2>Clarity before<br /><span class="display-italic">commitment.</span></h2><p>Once a real delivery channel is configured, this page can receive project inquiries. Until then, the downloaded text file remains a private local draft; no information leaves the browser.</p></div></div></section>`;
  return pageDocument({ title: 'Contact — ETERIOMN', description: 'Prepare a private project brief for ETERIOMN. The current static form validates and creates a local download only; it does not send data.', path: '/pages/contact/index.html', section: 'contact', content });
}

const legalPages = {
  privacy: {
    path: '/pages/legal/privacy-policy.html', title: 'Privacy Policy — ETERIOMN', name: 'Privacy policy', description: 'A draft privacy notice for the current ETERIOMN static website. Confirm business identity, hosting details, and jurisdiction before publication.',
    sections: [
      ['Status of this notice', '<p><strong>Owner review required before publication.</strong> The legal business name, contact details, hosting provider, data-retention settings, and applicable jurisdiction have not been supplied. Replace the editable placeholders in the project documentation and obtain appropriate review.</p>'],
      ['What this website currently does', '<p>This website is delivered as static HTML, CSS, JavaScript, SVG, and image assets. It currently contains no analytics, advertising pixels, external embeds, or third-party font requests. The contact brief validates in your browser and can create a local text download; it does not submit information to ETERIOMN or store it on a server.</p><p>As with most websites, the hosting provider may process routine request information such as an IP address, requested URL, timestamp, and browser details in server logs. Confirm the actual host, its retention practices, and any associated processing before launch.</p>'],
      ['Information you enter', '<p>While the form is not connected, information typed into it remains in the page session unless you choose to download the brief. The download is created on your device. Anyone with access to that device or downloaded file may be able to see it. Avoid confidential or sensitive information.</p>'],
      ['Cookies and local storage', '<p>The current implementation does not set optional analytics or advertising cookies and does not use local storage for tracking. Hosting infrastructure or browser behavior may differ; check the production configuration before making a final statement.</p>'],
      ['Your choices and contact', '<p>Before publication, identify the responsible legal entity, a monitored privacy contact, the applicable jurisdiction, and the process for handling requests. Replace <code>[LEGAL ENTITY]</code> and <code>[PRIVACY CONTACT]</code> in the owner’s deployment checklist. This draft is not legal advice.</p>']
    ]
  },
  cookies: {
    path: '/pages/legal/cookie-policy.html', title: 'Cookie Policy — ETERIOMN', name: 'Cookie policy', description: 'A draft cookie notice describing the current site implementation. Recheck hosting and third-party integrations before publication.',
    sections: [
      ['Current site behavior', '<p>The current version does not add analytics, advertising, personalization, or social-media cookies. It does not use a consent banner because no optional cookie-based technology is included in this build.</p>'],
      ['Hosting and future changes', '<p>A hosting platform may use technical mechanisms necessary to deliver or secure the website. Confirm the selected provider’s actual behavior before launch. If analytics, advertising, embedded m, or other non-essential storage is introduced later, update this notice and implement an appropriate consent flow before enabling it.</p>'],
      ['Owner review', '<p>This is an implementation note, not a legal determination. The site owner should confirm applicable rules and the behavior of the production stack with qualified advice where needed.</p>']
    ]
  },
  terms: {
    path: '/pages/legal/terms.html', title: 'Terms — ETERIOMN', name: 'Terms of use', description: 'A draft terms page for ETERIOMN. Business details, governing law, and publication terms require owner confirmation and legal review.',
    sections: [
      ['Draft status', '<p><strong>This page is a draft and has not been reviewed by a lawyer.</strong> Before publication, the owner must confirm the legal entity, governing law, contact details, rights in the website materials, and any project-specific terms.</p>'],
      ['Website information', '<p>Website content is provided for general information about the ETERIOMN studio and the capabilities described here. Project examples are clearly labeled speculative concepts; they are not client engagements, endorsements, or evidence of commercial outcomes.</p>'],
      ['No professional legal representation', '<p>The pages describing copyright, trademark, brand protection, and licensing support describe practical organization and briefing assistance only. They do not create a lawyer-client relationship and do not constitute legal advice, filing, or representation. Independent qualified counsel may be required.</p>'],
      ['Project engagements', '<p>A project begins only after its scope, fee, schedule, deliverables, and relevant rights are agreed in a separate written agreement. Website descriptions do not create a fixed offer or guarantee an outcome.</p>'],
      ['Editable owner details', '<p>Before launch, replace <code>[LEGAL ENTITY]</code>, <code>[GOVERNING LAW]</code>, and <code>[CONTACT DETAILS]</code> with confirmed information and seek suitable legal review. Do not publish this draft unchanged.</p>']
    ]
  }
};

export function renderLegal(key) {
  const page = legalPages[key];
  const sections = page.sections.map(([heading, body], index) => `<section class="legal-section"><span class="eyebrow">${String(index + 1).padStart(2, '0')} / ${esc(page.name.toUpperCase())}</span><h2>${esc(heading)}</h2><div class="legal-section-body">${body}</div></section>`).join('');
  const content = `${pageIntro({ breadcrumb: page.name, index: '07', eyebrow: 'OWNER REVIEW REQUIRED / DRAFT', title: `${esc(page.name)}<span class="display-italic">.</span>`, description: 'This document describes the current implementation and contains details that the site owner must confirm before publication.', aside: '<span class="concept-note">NOT LEGALLY REVIEWED</span>', className: 'page-intro--legal' })}<section class="legal-page surface-paper section"><div class="container legal-page-inner"><div class="legal-page-notice"><strong>Editable draft.</strong> Business identity, hosting configuration, jurisdiction, and contact details are not yet provided. Confirm them before this page is used as a formal policy.</div>${sections}</div></section>`;
  return pageDocument({ title: page.title, description: page.description, path: page.path, section: 'legal', content, noIndex: true });
}

export function render404() {
  const content = `<section class="not-found-page section"><div class="container not-found-inner"><div class="breadcrumbs"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Not found</span></div><span class="eyebrow">404 / ROUTE NOT FOUND</span><p class="not-found-code">04<span>/</span>04</p><h1>This page<br />isn't in <span class="display-italic">the map.</span></h1><p>The address may be outdated, or this route may not be part of the current studio index.</p><div class="not-found-actions"><a class="button button--primary" href="/">Return to the homepage ${glyph('arrow', 16)}</a><a class="button button--outline" href="${servicesHref}">Browse the service index ${glyph('upRight', 15)}</a></div></div></section>`;
  return pageDocument({ title: 'Page Not Found — ETERIOMN', description: 'The requested page could not be found. Return to the ETERIOMN homepage or browse the service directory.', path: '/404.html', section: 'not-found', content });
}

export const generatedPages = () => [
  ['pages/services/index.html', renderServicesOverview()],
  ['pages/work/index.html', renderWork()],
  ['collaborations/spotlipse.html', renderSpotlipseCollaboration()],
  ['pages/studio/index.html', renderStudio()],
  ['pages/ecosystem/index.html', renderEcosystem()],
  ['pages/lab/index.html', renderLab()],
  ['pages/contact/index.html', renderContact()],
  ['pages/legal/privacy-policy.html', renderLegal('privacy')],
  ['pages/legal/cookie-policy.html', renderLegal('cookies')],
  ['pages/legal/terms.html', renderLegal('terms')],
  ...projects.map((project) => [`pages/projects/${project.slug}.html`, renderProject(project)]),
  ...services.map((service) => [`pages/services/${service.slug}.html`, renderService(service)])
];

export const siteManifest = {
  services,
  worlds,
  projects,
  routes: [
    '/', '/404.html', '/pages/services/index.html', '/pages/work/index.html', collaborationHref, '/pages/studio/index.html', '/pages/ecosystem/index.html', '/pages/lab/index.html', '/pages/contact/index.html', '/pages/legal/privacy-policy.html', '/pages/legal/cookie-policy.html', '/pages/legal/terms.html',
    ...projects.map((project) => projectHref(project.slug)),
    ...services.map((service) => serviceHref(service.slug))
  ]
};
