export function initSignalField() {
  const canvas = document.querySelector('[data-signal-canvas]');
  const fallback = document.querySelector('.lab-static-fallback');
  const controls = document.querySelector('[data-lab-controls]');
  const range = document.getElementById('signal-position');
  const resetButton = document.querySelector('[data-lab-reset]');
  const frame = canvas?.closest('.experiment-frame');
  if (!canvas || !fallback || !controls || !range || !frame) return;

  let context;
  try { context = canvas.getContext('2d', { alpha: false, desynchronized: true }); }
  catch { context = null; }
  if (!context) {
    canvas.hidden = true;
    fallback.hidden = false;
    controls.hidden = true;
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const signal = { x: 0.5, y: 0.48, active: false };
  let width = 0;
  let height = 0;
  let ratio = 1;
  let frameId = 0;
  let tweenStart = 0;
  let from = { x: 0.5, y: 0.48 };
  let to = { x: 0.5, y: 0.48 };
  let visible = !document.hidden;
  let disposed = false;
  const lifecycle = new AbortController();

  function paint() {
    if (disposed || !context || !width || !height) return;
    context.fillStyle = '#141419';
    context.fillRect(0, 0, width, height);

    const focusX = signal.x * width;
    const focusY = signal.y * height;
    const radius = Math.min(width, height) * 0.34;
    const lineGap = Math.max(18, Math.min(30, width / 42));
    const pointStep = Math.max(8, Math.min(12, width / 105));
    const count = Math.ceil(height / lineGap) + 5;

    for (let row = -2; row < count; row += 1) {
      const baseY = row * lineGap;
      context.beginPath();
      for (let x = -pointStep; x <= width + pointStep; x += pointStep) {
        const dx = x - focusX;
        const dy = baseY - focusY;
        const distance = Math.hypot(dx, dy);
        const influence = signal.active ? Math.max(0, 1 - distance / radius) : 0;
        const underlying = Math.sin((x / Math.max(1, width)) * Math.PI * 2.4 + row * 0.21) * 3.5;
        const deflection = Math.cos((distance / Math.max(1, radius)) * 4.2 + row * 0.12) * influence * 24;
        const y = baseY + underlying + deflection;
        if (x <= -pointStep) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      const accentLine = Math.abs(row % 8) === 0;
      context.strokeStyle = accentLine ? 'rgba(216,164,91,0.58)' : 'rgba(103,87,217,0.48)';
      context.lineWidth = accentLine ? 1.1 : 0.8;
      context.stroke();
    }

    if (signal.active) {
      context.beginPath();
      context.arc(focusX, focusY, 3, 0, Math.PI * 2);
      context.fillStyle = '#f3f0e8';
      context.fill();
      context.beginPath();
      context.arc(focusX, focusY, 13, 0, Math.PI * 2);
      context.strokeStyle = 'rgba(216,164,91,0.7)';
      context.lineWidth = 1;
      context.stroke();
    }
  }

  function showFallback() {
    stopTween();
    canvas.hidden = true;
    fallback.hidden = false;
    controls.hidden = true;
  }

  function resize() {
    if (disposed) return false;
    const bounds = frame.getBoundingClientRect();
    if (!bounds.width || !bounds.height) {
      showFallback();
      return false;
    }

    width = bounds.width;
    height = bounds.height;
    ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const pixelWidth = Math.round(width * ratio);
    const pixelHeight = Math.round(height * ratio);

    try {
      if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
      if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      canvas.hidden = false;
      fallback.hidden = true;
      controls.hidden = false;
      paint();
      return true;
    } catch {
      showFallback();
      return false;
    }
  }

  function stopTween() {
    if (!frameId) return;
    window.cancelAnimationFrame(frameId);
    frameId = 0;
  }

  function animatePosition(nextX, nextY, interactive = true) {
    if (disposed) return;
    stopTween();
    to = { x: Math.min(1, Math.max(0, nextX)), y: Math.min(1, Math.max(0, nextY)) };
    signal.active = interactive;
    if (reduceMotion.matches || !visible) {
      signal.x = to.x;
      signal.y = to.y;
      paint();
      return;
    }
    from = { x: signal.x, y: signal.y };
    tweenStart = performance.now();
    const duration = 180;
    const step = (now) => {
      frameId = 0;
      const progress = Math.min(1, (now - tweenStart) / duration);
      const eased = 1 - (1 - progress) ** 3;
      signal.x = from.x + (to.x - from.x) * eased;
      signal.y = from.y + (to.y - from.y) * eased;
      paint();
      if (progress < 1 && visible) frameId = window.requestAnimationFrame(step);
    };
    frameId = window.requestAnimationFrame(step);
  }

  function setFromPointer(event) {
    const bounds = canvas.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / Math.max(1, bounds.width)));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / Math.max(1, bounds.height)));
    animatePosition(x, y, true);
    // Keep the keyboard control aligned with the pointer target, not the in-flight tween.
    range.value = String(Math.round(x * 100));
  }

  canvas.addEventListener('pointermove', setFromPointer, { passive: true, signal: lifecycle.signal });
  canvas.addEventListener('pointerdown', setFromPointer, { passive: true, signal: lifecycle.signal });
  canvas.addEventListener('pointerleave', () => animatePosition(signal.x, signal.y, false), { passive: true, signal: lifecycle.signal });
  range.addEventListener('input', () => animatePosition(Number(range.value) / 100, 0.48, true), { signal: lifecycle.signal });
  resetButton?.addEventListener('click', () => {
    range.value = '50';
    animatePosition(0.5, 0.48, false);
    resetButton.focus({ preventScroll: true });
  }, { signal: lifecycle.signal });

  canvas.addEventListener('contextlost', (event) => {
    event.preventDefault();
    showFallback();
  }, { signal: lifecycle.signal });
  canvas.addEventListener('contextrestored', () => {
    try {
      context = canvas.getContext('2d', { alpha: false, desynchronized: true });
      if (!context) {
        showFallback();
        return;
      }
      resize();
    } catch {
      context = null;
      showFallback();
    }
  }, { signal: lifecycle.signal });

  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;

  function cleanup() {
    if (disposed) return;
    disposed = true;
    stopTween();
    resizeObserver?.disconnect();
    lifecycle.abort();
  }

  function handleVisibilityChange() {
    visible = !document.hidden;
    if (!visible) {
      stopTween();
      signal.x = to.x;
      signal.y = to.y;
      return;
    }
    paint();
  }

  function handleMotionPreference(event) {
    if (!event.matches) return;
    stopTween();
    signal.x = to.x;
    signal.y = to.y;
    paint();
  }

  resizeObserver?.observe(frame);
  if (!resizeObserver) window.addEventListener('resize', resize, { passive: true, signal: lifecycle.signal });
  document.addEventListener('visibilitychange', handleVisibilityChange, { signal: lifecycle.signal });
  reduceMotion.addEventListener?.('change', handleMotionPreference, { signal: lifecycle.signal });
  window.addEventListener('pagehide', (event) => {
    if (!event.persisted) cleanup();
  }, { once: true, signal: lifecycle.signal });

  resize();
}
