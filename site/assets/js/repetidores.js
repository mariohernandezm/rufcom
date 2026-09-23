(() => {
  'use strict';
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, '').replace(/\s+/g, ' ').trim();
  const aliases = { rm: 'metropolitana', 'region metropolitana': 'metropolitana', 'bio bio': 'biobio', 'o higgins': 'ohiggins' };
  const matches = (record, query, region = '') => {
    if (region && record.region !== region) return false;
    const original = normalize(query);
    const q = aliases[original] || original;
    if (!q) return true;
    let number = q.replace(',', '.');
    if (/^\d{4,}$/.test(number)) number = number.slice(0, 3) + '.' + number.slice(3);
    if (/^\d{3}(?:\.\d+)?$/.test(number)) {
      return Number(record.tx) === Number(number) || Number(record.rx) === Number(number);
    }
    const haystack = normalize(`${record.name} ${record.geography || ''} ${record.zone ? `zona ${record.zone}` : ''}`);
    return q.split(' ').every(word => haystack.includes(word));
  };
  // Suggest nearby place names only; never autocorrect a callsign or frequency.
  const distance = (a, b) => {
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const next = [i];
      for (let j = 1; j <= b.length; j++) next[j] = Math.min(next[j - 1] + 1, prev[j] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = next;
    }
    return prev[b.length];
  };
  const suggest = (query, places) => {
    const q = normalize(query);
    if (q.length < 4 || !/^[a-z ]+$/.test(q)) return '';
    const ranked = [...new Set(places)].map(place => ({ place, score: distance(q, normalize(place)) })).filter(item => item.score > 0 && item.score <= 1).sort((a, b) => a.score - b.score);
    return ranked.length === 1 ? ranked[0].place : '';
  };
  if (typeof module !== 'undefined') module.exports = { matches, suggest };
  if (typeof document === 'undefined') return;
  const input = document.getElementById('repeater-query');
  if (!input) return;
  const region = document.getElementById('repeater-region');
  const clear = document.getElementById('repeater-clear');
  const reset = document.getElementById('repeater-reset');
  const suggestion = document.getElementById('repeater-suggestion');
  const cards = [...document.querySelectorAll('.repeater-card')];
  const groups = [...document.querySelectorAll('.repeater-region')];
  let suggestedPlace = '';
  const update = () => {
    let count = 0;
    cards.forEach(card => {
      card.hidden = !matches(card.dataset, input.value, region.value);
      if (!card.hidden) count++;
    });
    groups.forEach(group => {
      const visible = group.querySelectorAll('.repeater-card:not([hidden])').length;
      group.hidden = visible === 0;
      group.querySelector('.repeater-region-count').textContent = `(${visible})`;
    });
    document.getElementById('repeater-count').textContent = `${count} de ${cards.length} repetidores${region.value ? ' · ' + region.options[region.selectedIndex].textContent.replace(/ \(\d+\)$/, '') : ''}`;
    document.getElementById('repeater-empty').hidden = count !== 0;
    clear.hidden = !input.value;
    reset.hidden = !input.value && !region.value;
    const places = cards.filter(card => !region.value || card.dataset.region === region.value).map(card => card.dataset.place).filter(Boolean);
    if (!region.value || region.value === 'metropolitana') places.push('Santiago', 'Metropolitana');
    suggestedPlace = count === 0 ? suggest(input.value, places) : '';
    suggestion.hidden = !suggestedPlace;
    suggestion.textContent = suggestedPlace ? `¿Quisiste decir ${suggestedPlace}?` : '';
  };
  input.addEventListener('input', update);
  input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); update(); } });
  region.addEventListener('change', update);
  document.getElementById('repeater-submit').addEventListener('click', update);
  clear.addEventListener('click', () => { input.value = ''; update(); input.focus(); });
  reset.addEventListener('click', () => { input.value = ''; region.value = ''; update(); region.focus(); });
  suggestion.addEventListener('click', () => { input.value = suggestedPlace; update(); input.focus(); });
  update();
})();
