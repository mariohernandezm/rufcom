const assert = require('node:assert/strict');
const test = require('node:test');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const script = fs.readFileSync(path.join(__dirname, '../site/assets/js/carousel.js'), 'utf8');

// Event/DOM boundary fixture: exercise the shipped script without a browser dependency.
function element(initial = {}) {
  const listeners = {};
  return Object.assign({
    hidden: false, textContent: '', attributes: {},
    addEventListener(name, fn) { (listeners[name] ||= []).push(fn); },
    setAttribute(name, value) { this.attributes[name] = value; },
    emit(name, detail = {}) {
      const event = { preventDefault() { this.defaultPrevented = true; }, ...detail };
      for (const fn of listeners[name] || []) fn(event);
      return event;
    },
  }, initial);
}
function carousel(count = 2) {
  const slides = Array.from({ length: count }, (_, i) => element({ hidden: i !== 0 }));
  const controls = element({ hidden: true }), previous = element(), next = element();
  const position = element(), viewport = element(), toggle = element();
  const parts = { controls, previous, next, position, viewport, toggle };
  return element({
    ...parts, slides,
    querySelectorAll() { return slides; },
    querySelector(selector) { return parts[selector.match(/data-carousel-(\w+)/)[1]]; },
  });
}
function load(...instances) {
  return setup(instances);
}
function setup(instances, reduced = false) {
  let now = 0, sequence = 0;
  const timers = new Map();
  const doc = element({ hidden: false, querySelectorAll: () => instances });
  const motion = element({ matches: reduced });
  vm.runInNewContext(script, {
    document: doc, window: { matchMedia: () => motion },
    setTimeout(fn, delay) { const id = ++sequence; timers.set(id, {fn, at: now + delay}); return id; },
    clearTimeout(id) { timers.delete(id); },
  });
  return {
    doc, motion,
    advance(ms) {
      const end = now + ms;
      while (true) {
        const next = [...timers].sort((a,b) => a[1].at-b[1].at)[0];
        if (!next || next[1].at > end) break;
        now = next[1].at; timers.delete(next[0]); next[1].fn();
      }
      now = end;
    },
  };
}
const visible = (c) => c.slides.map((s) => !s.hidden);

test('manual controls wrap both ways, announce position and keep exactly one image visible', () => {
  const c = carousel(); load(c);
  assert.equal(c.controls.hidden, false);
  assert.deepEqual(visible(c), [true, false]);
  c.next.emit('click');
  assert.deepEqual(visible(c), [false, true]);
  assert.equal(c.position.textContent, '2 / 2');
  assert.equal(c.position.attributes['aria-label'], 'Imagen 2 de 2');
  c.next.emit('click');
  assert.deepEqual(visible(c), [true, false]);
  c.previous.emit('click');
  assert.deepEqual(visible(c), [false, true]);
});

test('keyboard changes only this carousel and leaves modified shortcuts alone', () => {
  const a = carousel(), b = carousel(); load(a, b);
  assert.equal(a.controls.emit('keydown', { key: 'ArrowRight' }).defaultPrevented, true);
  assert.deepEqual(visible(a), [false, true]);
  assert.deepEqual(visible(b), [true, false]);
  a.controls.emit('keydown', { key: 'ArrowLeft', ctrlKey: true });
  assert.deepEqual(visible(a), [false, true]);
  a.controls.emit('keydown', { key: 'ArrowLeft' });
  assert.deepEqual(visible(a), [true, false]);
});

test('horizontal touch changes the image; scrolling, small gestures and cancelled touches do not', () => {
  const c = carousel(); load(c);
  const down = (x = 100, y = 100) => c.viewport.emit('pointerdown', { isPrimary: true, pointerType: 'touch', pointerId: 1, clientX: x, clientY: y });
  const up = (x, y) => c.viewport.emit('pointerup', { pointerId: 1, clientX: x, clientY: y });
  down(); up(20, 104);
  assert.deepEqual(visible(c), [false, true]);
  down(); up(90, 105);
  down(); up(150, 200);
  down(); c.viewport.emit('pointercancel'); up(20, 100);
  assert.deepEqual(visible(c), [false, true]);
  down(20); up(100, 100);
  assert.deepEqual(visible(c), [true, false]);
});

test('single-image fallback does not expose nonfunctional controls', () => {
  const c = carousel(1); load(c);
  assert.equal(c.controls.hidden, true);
  assert.deepEqual(visible(c), [true]);
});

test('automatic rotation changes at six seconds, wraps, and does not announce every tick', () => {
  const c = carousel(), clock = load(c);
  clock.advance(5999);
  assert.deepEqual(visible(c), [true, false]);
  clock.advance(1);
  assert.deepEqual(visible(c), [false, true]);
  assert.equal(c.position.attributes['aria-live'], 'off');
  clock.advance(6000);
  assert.deepEqual(visible(c), [true, false]);
});

test('hover pauses temporarily and restarts a complete six-second interval on exit', () => {
  const c = carousel(), clock = load(c);
  clock.advance(5000);
  c.emit('pointerenter', {pointerType: 'mouse'});
  clock.advance(12000);
  assert.deepEqual(visible(c), [true, false]);
  c.emit('pointerleave', {pointerType: 'mouse'});
  clock.advance(5999);
  assert.deepEqual(visible(c), [true, false]);
  clock.advance(1);
  assert.deepEqual(visible(c), [false, true]);
});

test('manual navigation and keyboard focus pause until resumed with the rotation button', () => {
  const c = carousel(), clock = load(c);
  c.next.emit('click');
  clock.advance(18000);
  assert.deepEqual(visible(c), [false, true]);
  assert.equal(c.toggle.attributes['aria-label'], 'Reanudar carrusel');
  c.toggle.emit('click');
  clock.advance(6000);
  assert.deepEqual(visible(c), [true, false]);
  c.emit('focusin');
  clock.advance(12000);
  assert.deepEqual(visible(c), [true, false]);
});

test('clicking pause preserves its intent when focusin arrives before the click', () => {
  const c = carousel(), clock = load(c);
  c.toggle.emit('pointerdown');
  c.emit('focusin');
  c.toggle.emit('click');
  clock.advance(12000);
  assert.equal(c.toggle.attributes['aria-label'], 'Reanudar carrusel');
  assert.deepEqual(visible(c), [true, false]);
  c.toggle.emit('pointerdown');
  c.emit('focusin');
  c.toggle.emit('click');
  clock.advance(6000);
  assert.deepEqual(visible(c), [false, true]);
});

test('background tabs do not accumulate ticks, and reduced motion starts paused', () => {
  const c = carousel(), clock = load(c);
  clock.advance(5000);
  clock.doc.hidden = true; clock.doc.emit('visibilitychange');
  clock.advance(60000);
  assert.deepEqual(visible(c), [true, false]);
  clock.doc.hidden = false; clock.doc.emit('visibilitychange');
  clock.advance(5999);
  assert.deepEqual(visible(c), [true, false]);
  clock.advance(1);
  assert.deepEqual(visible(c), [false, true]);
  const d = carousel(), reduced = setup([d], true);
  reduced.advance(18000);
  assert.deepEqual(visible(d), [true, false]);
  assert.equal(d.toggle.attributes['aria-label'], 'Reanudar carrusel');
});
