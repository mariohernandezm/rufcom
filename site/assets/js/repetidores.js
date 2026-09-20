(() => {
  'use strict';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const matches = (record, query) => {
    const q = normalize(query);
    if (!q) return true;
    let number = q.replace(',', '.');
    // A frequency without a separator keeps its first three digits as MHz.
    if (/^\d{4,}$/.test(number)) number = number.slice(0, 3) + '.' + number.slice(3);
    if (/^\d{3}(?:\.\d+)?$/.test(number) && number.includes('.')) {
      return Number(record.tx) === Number(number) || Number(record.rx) === Number(number);
    }
    return normalize(record.name).includes(q) || record.tx.includes(number) || record.rx.includes(number);
  };
  if (typeof module !== 'undefined') module.exports = { matches };
  if (typeof document === 'undefined') return;
  const input = document.getElementById('repeater-query');
  if (!input) return;
  const cards = [...document.querySelectorAll('.repeater-card')];
  const update = () => {
    let count = 0;
    cards.forEach(card => {
      card.hidden = !matches(card.dataset, input.value);
      if (!card.hidden) count++;
    });
    document.getElementById('repeater-count').textContent = `${count} de ${cards.length} repetidores`;
    document.getElementById('repeater-empty').hidden = count !== 0;
  };
  input.addEventListener('input', update);
  document.getElementById('repeater-clear').addEventListener('click', () => { input.value = ''; update(); input.focus(); });
  update();
})();
