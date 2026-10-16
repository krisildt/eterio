export function initProjectFilters() {
  const filterGroup = document.querySelector('[data-work-filters]');
  const grid = document.querySelector('[data-project-grid]');
  if (!filterGroup || !grid) return;

  const buttons = [...filterGroup.querySelectorAll('[data-filter]')];
  const cards = [...grid.querySelectorAll('[data-project-card]')];
  const count = document.querySelector('[data-result-count]');
  const emptyState = document.querySelector('[data-empty-state]');
  if (!buttons.length || !cards.length) return;

  filterGroup.hidden = false;
  const update = (filter) => {
    let visible = 0;
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    buttons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
    });
    if (count) count.textContent = `Showing ${visible} ${visible === 1 ? 'study' : 'studies'}`;
    if (emptyState) emptyState.hidden = visible > 0;
  };

  buttons.forEach((button) => button.addEventListener('click', () => update(button.dataset.filter)));
  update('all');
}

export function initProjectBrief() {
  const form = document.getElementById('project-form');
  const status = document.getElementById('form-status');
  const downloadLink = document.getElementById('brief-download');
  if (!form || !status || !downloadLink) return;

  form.hidden = false;
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('service');
  const serviceField = form.elements.namedItem('service');
  if (requestedService && serviceField) {
    const matchingOption = [...serviceField.options].find((option) => option.value.toLowerCase() === requestedService.toLowerCase());
    if (matchingOption) serviceField.value = matchingOption.value;
  }

  const controls = [...form.querySelectorAll('input, select, textarea')];
  const counter = document.getElementById('project-counter');
  const messageField = form.elements.namedItem('project');
  const updateCounter = () => {
    if (!counter || !messageField) return;
    counter.textContent = `${messageField.value.length} / ${messageField.maxLength} characters`;
  };
  updateCounter();

  controls.forEach((control) => {
    control.addEventListener('invalid', () => control.setAttribute('aria-invalid', 'true'));
    control.addEventListener('input', () => {
      if (control.validity.valid) control.removeAttribute('aria-invalid');
      else if (control.hasAttribute('aria-invalid')) control.setAttribute('aria-invalid', 'true');
      if (control === messageField) updateCounter();
    });
    control.addEventListener('change', () => {
      if (control.validity.valid) control.removeAttribute('aria-invalid');
    });
  });

  let activeObjectUrl = '';
  let draftReady = false;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonMarkup = submitButton?.innerHTML || 'Prepare local draft';

  form.addEventListener('input', () => {
    if (!draftReady) return;
    draftReady = false;
    if (activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
    activeObjectUrl = '';
    downloadLink.removeAttribute('href');
    downloadLink.hidden = true;
    status.textContent = 'The brief changed. Prepare a new local draft to download the updated version.';
    status.hidden = false;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonMarkup;
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (draftReady) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Check the required fields and correct any highlighted errors. Nothing has been sent.';
      status.hidden = false;
      return;
    }

    try {
      const data = new FormData(form);
      const date = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date());
      const lines = [
        'ETERIOMN — PROJECT BRIEF (LOCAL DRAFT)',
        `Prepared in this browser: ${date}`,
        '',
        'This file was prepared locally. It has not been sent to ETERIOMN.',
        '',
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Company: ${data.get('company') || 'Not provided'}`,
        `Service interest: ${data.get('service') || 'Not sure yet'}`,
        `Budget context: ${data.get('budget') || 'Not provided'}`,
        `Timing: ${data.get('timeline') || 'Not decided'}`,
        '',
        'PROJECT CONTEXT',
        String(data.get('project') || '').trim(),
        '',
        'Privacy note: This draft was created on your device. Downloading or sharing it is your choice.'
      ];
      const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
      const nextObjectUrl = URL.createObjectURL(blob);
      if (activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
      activeObjectUrl = nextObjectUrl;
      downloadLink.href = activeObjectUrl;
      downloadLink.hidden = false;
      status.textContent = 'Your brief is ready as a local draft. Nothing was sent and no information left this browser. Use “Download local draft” to save a copy. Online delivery is not connected.';
      status.hidden = false;
      draftReady = true;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Draft prepared';
      }
    } catch {
      status.textContent = 'The local draft could not be prepared in this browser. Your information was not sent. Try again, or copy the text elsewhere before leaving this page.';
      status.hidden = false;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonMarkup;
      }
    }
    status.focus({ preventScroll: true });
  });

  window.addEventListener('pagehide', () => {
    if (activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
  }, { once: true });
}

export function initReveals() {
  const targets = document.querySelectorAll('[data-reveal]');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!targets.length || !('IntersectionObserver' in window) || preference.matches) return;

  const animations = new Set();
  const styles = getComputedStyle(document.documentElement);
  const duration = Number.parseFloat(styles.getPropertyValue('--duration-reveal')) || 500;
  const easing = styles.getPropertyValue('--ease-out').trim() || 'cubic-bezier(.22,1,.36,1)';
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      currentObserver.unobserve(entry.target);
      if (preference.matches || typeof entry.target.animate !== 'function') return;
      const animation = entry.target.animate(
        [{ opacity: 0.94, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration, easing, fill: 'both' }
      );
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
      animation.oncancel = () => animations.delete(animation);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -3% 0px' });

  targets.forEach((target) => observer.observe(target));
  preference.addEventListener?.('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    animations.forEach((animation) => animation.cancel());
    animations.clear();
  });
}
