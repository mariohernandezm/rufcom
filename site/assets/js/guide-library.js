"use strict";
(() => {
  const search = document.querySelector(".library-search");
  const input = document.getElementById("guide-query");
  const status = document.getElementById("guide-search-status");
  const catalog = document.getElementById("guide-catalog");
  if (!search || !input || !status || !catalog) return;

  const sections = [...catalog.querySelectorAll(".library-topic")];
  const cards = [...catalog.querySelectorAll(".library-card")];
  const empty = document.querySelector(".library-empty");
  const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const searchable = new Map(cards.map(card => [card, normalize(`${card.textContent} ${card.dataset.search || ""}`)]));

  const filter = () => {
    const terms = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      card.hidden = !terms.every(term => searchable.get(card).includes(term));
      if (!card.hidden) count += 1;
    });
    sections.forEach(section => {
      section.hidden = ![...section.querySelectorAll(".library-card")].some(card => !card.hidden);
    });
    if (empty) empty.hidden = count !== 0;
    status.textContent = terms.length
      ? `${count} ${count === 1 ? "guía encontrada" : "guías encontradas"}.`
      : `${cards.length} guías y herramientas disponibles.`;
  };
  const clear = () => {
    input.value = "";
    filter();
  };
  document.getElementById("clear-guide-search")?.addEventListener("click", () => {
    clear();
    input.focus();
  });
  input.addEventListener("input", filter);
  document.getElementById("show-all-guides")?.addEventListener("click", () => {
    clear();
    input.focus();
  });
  document.querySelectorAll(".library-categories a").forEach(link => {
    link.addEventListener("click", clear);
  });
  search.hidden = false;
  filter();
})();
