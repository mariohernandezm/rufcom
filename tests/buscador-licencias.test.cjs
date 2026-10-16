const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const code = readFileSync(join(__dirname, '../site/assets/js/buscador-licencias.js'), 'utf8');

// Exercise the real controller with only its DOM boundary replaced.
function lookup(data) {
  let focused;
  class Element {
    constructor() { this.value = ''; this.hidden = false; this.textContent = ''; this.children = []; this.events = {}; }
    addEventListener(type, callback) { this.events[type] = callback; }
    replaceChildren() { this.children = []; }
    append(child) { this.children.push(child); }
    focus() { focused = this; }
    emit(type, properties = {}) { this.events[type]?.({ preventDefault() {}, ...properties }); }
  }
  const elements = Object.fromEntries(['#buscar-licencia', '#consulta', '#estado', '#resultados', '#tabla-resultados', '#mostrar-mas', '#limpiar-busqueda', '.table-wrap', '#ejecutar-busqueda'].map(id => [id, new Element()]));
  const document = { querySelector: id => elements[id], createElement: () => new Element() };
  vm.runInNewContext(code, { document, window: { licenciasDatos: data } });
  return { elements, focused: () => focused };
}
const records = Array.from({ length: 31 }, (_, i) => ({ indicativo: `CD3TEST${i}`, nombre: 'JOSÉ PÉREZ', vencimiento: '2030-01-01' }));

test('Enter searches accented names and pagination reveals the remaining rows', () => {
  const { elements: e } = lookup({ registros: records });
  e['#consulta'].value = 'jose perez'; e['#consulta'].emit('keydown', { key: 'Enter' });
  assert.equal(e['#resultados'].children.length, 25);
  assert.equal(e['.table-wrap'].hidden, false);
  assert.equal(e['#mostrar-mas'].hidden, false);
  e['#mostrar-mas'].emit('click');
  assert.equal(e['#resultados'].children.length, 31);
  assert.equal(e['#mostrar-mas'].hidden, true);
});

test('editing a query hides stale results and clear returns focus to the input', () => {
  const { elements: e, focused } = lookup({ registros: records });
  e['#consulta'].value = 'CD3'; e['#ejecutar-busqueda'].emit('click');
  e['#consulta'].value = 'SINCOINCIDENCIAS'; e['#consulta'].emit('input');
  assert.equal(e['.table-wrap'].hidden, true);
  assert.equal(e['#mostrar-mas'].hidden, true);
  e['#limpiar-busqueda'].emit('click');
  assert.equal(e['#consulta'].value, '');
  assert.equal(e['#resultados'].children.length, 0);
  assert.equal(e['#limpiar-busqueda'].hidden, true);
  assert.equal(focused(), e['#consulta']);
});

test('empty query, no match and unavailable data show distinct recovery messages', () => {
  const { elements: e, focused } = lookup({ registros: records });
  e['#ejecutar-busqueda'].emit('click');
  assert.match(e['#estado'].textContent, /Escribe un nombre/);
  assert.equal(focused(), e['#consulta']);
  e['#consulta'].value = 'SINCOINCIDENCIAS'; e['#ejecutar-busqueda'].emit('click');
  assert.match(e['#estado'].textContent, /no significa/);
  assert.equal(e['.table-wrap'].hidden, true);
  const broken = lookup(undefined).elements;
  broken['#consulta'].value = 'CD3'; broken['#ejecutar-busqueda'].emit('click');
  assert.match(broken['#estado'].textContent, /Recarga esta página/);
});
