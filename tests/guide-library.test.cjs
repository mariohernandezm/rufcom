const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

const code = readFileSync(join(__dirname, '../site/assets/js/guide-library.js'), 'utf8');
const html = readFileSync(join(__dirname, '../site/guias.html'), 'utf8');

// Use the catalogue from the real page; replace only the controller's DOM boundary.
function library() {
  let focused;
  class Element {
    constructor() { this.value = ''; this.hidden = false; this.textContent = ''; this.events = {}; }
    addEventListener(type, listener) { this.events[type] = listener; }
    emit(type) { this.events[type]?.(); }
    focus() { focused = this; }
  }
  const sections = [...html.matchAll(/<section id="[^"]+" class="container library-topic"><h2>.*?<div class="library-grid">(.*?)<\/div><\/section>/gs)].map(match => {
    const section = new Element();
    section.cards = [...match[1].matchAll(/<article class="library-card" data-search="([^"]+)">(.*?)<\/article>/gs)].map(card => {
      const element = new Element();
      element.dataset = { search: card[1] };
      element.textContent = card[2].replace(/<[^>]*>/g, ' ');
      return element;
    });
    section.querySelectorAll = () => section.cards;
    return section;
  });
  const cards = sections.flatMap(section => section.cards);
  const elements = Object.fromEntries(['.library-search', '#guide-query', '#guide-search-status', '.library-empty', '#show-all-guides', '#clear-guide-search'].map(id => [id, new Element()]));
  const links = [new Element()];
  const catalog = { querySelectorAll: selector => selector === '.library-topic' ? sections : selector === '.library-subsection' ? [] : cards };
  const document = {
    querySelector: selector => elements[selector],
    getElementById: id => id === 'guide-catalog' ? catalog : elements[`#${id}`],
    querySelectorAll: () => links,
  };
  vm.runInNewContext(code, { document });
  const query = value => { elements['#guide-query'].value = value; elements['#guide-query'].emit('input'); };
  return { elements, sections, cards, links, query, visible: () => cards.filter(card => !card.hidden), focused: () => focused };
}

test('the full real catalogue loads and accented, case-insensitive searches find guide content', () => {
  const l = library();
  assert.equal(l.cards.length, 20);
  assert.equal(l.visible().length, 20);
  l.query('CÓDIGO Q');
  assert.equal(l.visible().length, 1);
  assert.match(l.visible()[0].textContent, /Código Q/);
  l.query('nanoVNA');
  assert.equal(l.visible().length, 1);
  assert.match(l.visible()[0].textContent, /Medir y revisar/);
  assert.equal(l.sections.filter(section => !section.hidden).length, 1);
});

test('no-match recovery and clearing restore all categories and input focus', () => {
  const l = library();
  l.query('xyzsinresultado');
  assert.equal(l.visible().length, 0);
  assert.equal(l.elements['.library-empty'].hidden, false);
  assert.match(l.elements['#guide-search-status'].textContent, /^0 /);
  l.elements['#show-all-guides'].emit('click');
  assert.equal(l.visible().length, 20);
  assert.equal(l.elements['.library-empty'].hidden, true);
  assert.equal(l.focused(), l.elements['#guide-query']);
  l.query('licencia');
  l.elements['#clear-guide-search'].emit('click');
  assert.equal(l.elements['#guide-query'].value, '');
  assert.equal(l.visible().length, 20);
});

test('choosing a topic restores hidden sections before the native anchor navigation', () => {
  const l = library();
  l.query('chirp');
  assert.equal(l.sections.filter(section => section.hidden).length, l.sections.length - 1);
  l.links[0].emit('click');
  assert.equal(l.sections.some(section => section.hidden), false);
  assert.equal(l.visible().length, 20);
  assert.equal(l.elements['#guide-query'].value, '');
});
