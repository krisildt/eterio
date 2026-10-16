export function initNavigation() {
  const serviceToggle = document.querySelector('[data-menu-toggle]');
  const serviceMenu = document.getElementById('service-world-menu');
  const serviceNav = serviceToggle?.closest('.nav-services');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileDialog = document.getElementById('mobile-navigation');
  const mobileClose = document.querySelector('[data-mobile-close]');

  const closeServiceMenu = ({ restoreFocus = false } = {}) => {
    if (!serviceToggle || !serviceMenu || serviceMenu.hidden) return;
    serviceMenu.hidden = true;
    serviceToggle.setAttribute('aria-expanded', 'false');
    serviceToggle.setAttribute('aria-label', 'Open service worlds');
    if (restoreFocus) serviceToggle.focus({ preventScroll: true });
  };

  if (serviceToggle && serviceMenu && serviceNav) {
    serviceToggle.addEventListener('click', () => {
      const opening = serviceMenu.hidden;
      serviceMenu.hidden = !opening;
      serviceToggle.setAttribute('aria-expanded', String(opening));
      serviceToggle.setAttribute('aria-label', opening ? 'Close service worlds' : 'Open service worlds');
      if (opening) serviceMenu.querySelector('a')?.focus({ preventScroll: true });
    });

    serviceMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeServiceMenu();
    });
    serviceNav.addEventListener('focusout', (event) => {
      if (event.relatedTarget && !serviceNav.contains(event.relatedTarget)) closeServiceMenu();
    });
    document.addEventListener('pointerdown', (event) => {
      if (!serviceMenu.hidden && !serviceNav.contains(event.target)) closeServiceMenu();
    });
    const mobileViewport = window.matchMedia('(max-width: 1000px)');
    mobileViewport.addEventListener?.('change', (event) => {
      if (event.matches) closeServiceMenu();
    });
  }

  const setMobileClosed = ({ restoreFocus = false } = {}) => {
    if (!mobileToggle || !mobileDialog) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
    if (restoreFocus) mobileToggle.focus({ preventScroll: true });
  };

  const closeMobileMenu = ({ restoreFocus = false } = {}) => {
    if (!mobileDialog) return;
    if (mobileDialog.open) mobileDialog.close();
    setMobileClosed({ restoreFocus });
  };

  if (mobileToggle && mobileDialog && typeof mobileDialog.showModal === 'function') {
    mobileToggle.addEventListener('click', () => {
      if (mobileDialog.open) {
        closeMobileMenu({ restoreFocus: true });
        return;
      }
      mobileDialog.showModal();
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileToggle.setAttribute('aria-label', 'Close navigation');
      document.body.classList.add('menu-open');
      mobileDialog.querySelector('[data-mobile-close]')?.focus({ preventScroll: true });
    });

    mobileClose?.addEventListener('click', () => closeMobileMenu({ restoreFocus: true }));
    mobileDialog.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMobileMenu();
    });
    mobileDialog.addEventListener('click', (event) => {
      if (event.target === mobileDialog) closeMobileMenu({ restoreFocus: true });
    });
    mobileDialog.addEventListener('cancel', () => setMobileClosed());
    mobileDialog.addEventListener('close', () => setMobileClosed());

    const desktop = window.matchMedia('(min-width: 1001px)');
    desktop.addEventListener?.('change', (event) => {
      if (event.matches && mobileDialog.open) closeMobileMenu();
    });
  } else if (mobileToggle) {
    mobileToggle.hidden = true;
    // Preserve the non-dialog navigation when this browser cannot open native dialogs.
    document.documentElement.classList.remove('js-ready');
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (mobileDialog?.open) {
      closeMobileMenu({ restoreFocus: true });
      return;
    }
    if (serviceMenu && !serviceMenu.hidden) closeServiceMenu({ restoreFocus: true });
  });

  const header = document.querySelector('[data-header]');
  if (header) {
    let frame = 0;
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      frame = 0;
    };
    window.addEventListener('scroll', () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }
}
