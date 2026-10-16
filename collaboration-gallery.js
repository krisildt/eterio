export function initCollaborationGallery() {
  const viewer = document.querySelector('[data-collab-lightbox]');
  const image = viewer?.querySelector('[data-lightbox-image]');
  const title = viewer?.querySelector('[data-lightbox-title]');
  const caption = viewer?.querySelector('[data-lightbox-caption]');
  const counter = viewer?.querySelector('[data-lightbox-counter]');
  const closeButton = viewer?.querySelector('[data-lightbox-close]');
  const previousButton = viewer?.querySelector('[data-lightbox-previous]');
  const nextButton = viewer?.querySelector('[data-lightbox-next]');
  const triggers = [...document.querySelectorAll('[data-collab-image]')];

  if (!viewer || !image || !closeButton || !triggers.length || typeof viewer.showModal !== 'function') return;

  const items = triggers.map((trigger) => {
    const sourceImage = trigger.querySelector('img');
    return {
      src: trigger.getAttribute('href'),
      alt: sourceImage?.alt || trigger.dataset.imageAlt || '',
      title: trigger.dataset.imageTitle || sourceImage?.alt || 'Project artwork',
      width: sourceImage?.getAttribute('width') || '',
      height: sourceImage?.getAttribute('height') || ''
    };
  });

  let activeIndex = 0;
  let returnFocus = null;

  function show(index) {
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    image.src = item.src;
    image.alt = item.alt;
    if (item.width) image.width = Number(item.width);
    if (item.height) image.height = Number(item.height);
    if (title) title.textContent = item.title;
    if (caption) caption.textContent = 'Original illustrative concept · not official game artwork';
    if (counter) counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    if (previousButton) previousButton.disabled = items.length < 2;
    if (nextButton) nextButton.disabled = items.length < 2;
  }

  function close() {
    if (viewer.open) viewer.close();
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || viewer.open) return;
      event.preventDefault();
      returnFocus = trigger;
      show(index);
      viewer.showModal();
      closeButton.focus({ preventScroll: true });
    });
  });

  closeButton.addEventListener('click', close);
  previousButton?.addEventListener('click', () => show(activeIndex - 1));
  nextButton?.addEventListener('click', () => show(activeIndex + 1));
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) close();
  });
  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && items.length > 1) {
      event.preventDefault();
      show(activeIndex - 1);
    } else if (event.key === 'ArrowRight' && items.length > 1) {
      event.preventDefault();
      show(activeIndex + 1);
    }
  });
  viewer.addEventListener('close', () => {
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  });
}
