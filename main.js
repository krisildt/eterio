import { initNavigation } from './navigation.js';
import { initProjectFilters, initProjectBrief, initReveals } from './interactions.js';

function setDynamicYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = year; });
}

function initializeSafely(name, initialize) {
  try {
    initialize();
  } catch (error) {
    console.error(`ETERIOMN ${name} initialization failed.`, error);
  }
}

document.documentElement.classList.add('js-ready');
initializeSafely('navigation', initNavigation);
initializeSafely('project filters', initProjectFilters);
initializeSafely('project brief', initProjectBrief);
initializeSafely('motion', initReveals);
if (document.querySelector('[data-signal-canvas]')) {
  import('./features/signal-field.js')
    .then(({ initSignalField }) => initializeSafely('digital lab', initSignalField))
    .catch((error) => console.warn('ETERIOMN Lab experiment unavailable; the static visual remains available.', error));
}
if (document.querySelector('[data-collab-lightbox]')) {
  import('./features/collaboration-gallery.js')
    .then(({ initCollaborationGallery }) => initializeSafely('collaboration gallery', initCollaborationGallery))
    .catch((error) => console.warn('ETERIOMN collaboration viewer unavailable; image links remain available.', error));
}
setDynamicYear();
