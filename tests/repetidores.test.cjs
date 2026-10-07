const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { matches, readFilters, searchLink } = require('../site/assets/js/repetidores.js');

test('shared search restores accents and exact decimal frequency without changing the matching result', () => {
  const records = [
    { name: 'CE3 AA/RPT-A', geography: 'Peñalolén Metropolitana', region: 'metropolitana', tx: '146.820', rx: '146.220' },
    { name: 'CE2SYE/RPT-B', geography: 'San Antonio', region: 'valparaiso', tx: '433.6125', rx: '438.6125' }
  ];
  for (const [region, query] of [['metropolitana', 'Peñalolén'], ['valparaiso', '433,6125']]) {
    const link = searchLink('https://rufcom.cl/repetidores.html?unrelated=1#old', region, query);
    const parsed = new URL(link);
    assert.equal(parsed.origin, 'https://rufcom.cl');
    assert.equal(parsed.hash, '');
    assert.equal(parsed.searchParams.has('unrelated'), false);
    const restored = readFilters(parsed.search, ['metropolitana', 'valparaiso']);
    assert.deepEqual(restored, { region, query });
    assert.deepEqual(records.filter(r => matches(r, restored.query, restored.region)), records.filter(r => matches(r, query, region)));
    assert.equal(records.filter(r => matches(r, restored.query, restored.region)).length, 1);
  }
});

test('unknown region cannot hide the entire directory and a cleared search has a clean URL', () => {
  assert.deepEqual(readFilters('?region=unknown-region&q=146.970', ['metropolitana']), { region: '', query: '146.970' });
  assert.equal(searchLink('https://rufcom.cl/repetidores.html?region=metropolitana&q=old', '', ''), 'https://rufcom.cl/repetidores.html');
});

test('published settings cover every repeater and preserve VHF and fractional UHF frequencies', () => {
  const html = fs.readFileSync(path.join(__dirname, '../site/repetidores.html'), 'utf8');
  const cards = [...html.matchAll(/<article class="repeater-card"[^>]*>[\s\S]*?<\/article>/g)].map(m => m[0]);
  assert.equal(cards.length, 178);
  assert.equal(cards.filter(card => card.includes('class="repeater-settings"')).length, 178);
  for (const [tx, rx, sign, offset] of [
    ['146.820', '146.220', '−', '0.600000'],
    ['146.060', '146.660', '+', '0.600000'],
    ['433.6125', '438.6125', '+', '5.000000']
  ]) {
    const card = cards.find(c => c.includes(`data-tx="${tx}"`) && c.includes(`data-rx="${rx}"`));
    assert.ok(card, `Source frequencies ${tx}/${rx} remain present`);
    assert.ok(card.includes(`Recepción / RX (MHz)</dt><dd>${Number(tx).toFixed(6)}`));
    assert.ok(card.includes(`Transmisión / TX (MHz)</dt><dd>${Number(rx).toFixed(6)}`));
    assert.ok(card.includes(`Dúplex en CHIRP</dt><dd>${sign}`));
    assert.ok(card.includes(`Desplazamiento (MHz)</dt><dd>${offset}`));
  }
});
