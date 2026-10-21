/* Progressive enhancement: the current illustration remains visible without JS.
   Rotation: 6 seconds, with explicit pause/resume and no queued background ticks. */
(() => {
  'use strict';
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
    const controls = carousel.querySelector('[data-carousel-controls]');
    const previous = carousel.querySelector('[data-carousel-previous]');
    const next = carousel.querySelector('[data-carousel-next]');
    const position = carousel.querySelector('[data-carousel-position]');
    const viewport = carousel.querySelector('[data-carousel-viewport]');
    const toggle = carousel.querySelector('[data-carousel-toggle]');
    if (slides.length < 2 || !controls || !previous || !next || !position || !viewport) return;

    let index = 0;
    const show = (requested, announce = false) => {
      index = (requested + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== index; });
      position.setAttribute('aria-live', announce ? 'polite' : 'off');
      position.textContent = `${index + 1} / ${slides.length}`;
      position.setAttribute('aria-label', `Imagen ${index + 1} de ${slides.length}`);
    };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let paused = motion.matches;
    let hovered = false;
    let timer = null;
    let pointerAction = null;
    const schedule = () => {
      clearTimeout(timer);
      timer = null;
      if (toggle) {
        toggle.textContent = paused ? '▶' : 'Ⅱ';
        toggle.setAttribute('aria-label', paused ? 'Reanudar carrusel' : 'Pausar carrusel');
        toggle.setAttribute('title', paused ? 'Reanudar carrusel' : 'Pausar carrusel');
      }
      if (!toggle || paused || hovered || document.hidden) return;
      timer = setTimeout(() => {
        show(index + 1);
        schedule();
      }, 6000);
    };
    const pause = () => { paused = true; schedule(); };
    const move = (requested) => { pause(); show(requested, true); };
    previous.addEventListener('click', () => move(index - 1));
    next.addEventListener('click', () => move(index + 1));
    controls.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(index + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    carousel.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') { hovered = true; schedule(); }
    });
    carousel.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'mouse') { hovered = false; schedule(); }
    });
    // Keyboard focus and manual navigation stop rotation until explicitly resumed.
    carousel.addEventListener('focusin', pause);
    if (toggle) {
      // Preserve click intent: focusin may pause before the click is delivered.
      toggle.addEventListener('pointerdown', () => { pointerAction = paused; });
      toggle.addEventListener('pointercancel', () => { pointerAction = null; });
      toggle.addEventListener('pointerleave', () => { pointerAction = null; });
      toggle.addEventListener('click', () => {
        const play = pointerAction === null ? paused : pointerAction;
        pointerAction = null;
        paused = !play;
        schedule();
      });
    }
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', (event) => { if (event.matches) pause(); });

    let start = null;
    viewport.addEventListener('pointerdown', (event) => {
      if (event.isPrimary && event.pointerType !== 'mouse') {
        pause();
        start = { id: event.pointerId, x: event.clientX, y: event.clientY };
      }
    });
    viewport.addEventListener('pointerup', (event) => {
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        move(index + (dx < 0 ? 1 : -1));
      }
    });
    viewport.addEventListener('pointercancel', () => { start = null; });
    viewport.addEventListener('pointerleave', () => { start = null; });
    show(0);
    controls.hidden = false;
    schedule();
  });
})();
