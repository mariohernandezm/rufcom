"use strict";
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
if (menuBtn && mainNav) {
  const groups = [...mainNav.querySelectorAll("details")];
  const closeGroups = () => groups.forEach(group => { group.open = false; });
  const setOpen = (open) => {
    if (!open) closeGroups();
    mainNav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };
  groups.forEach(group => group.addEventListener("toggle", () => {
    if (group.open) groups.forEach(other => { if (other !== group) other.open = false; });
  }));
  document.addEventListener("click", event => {
    if (!mainNav.contains(event.target) && !menuBtn.contains(event.target)) setOpen(false);
  });
  menuBtn.addEventListener("click", () => setOpen(!mainNav.classList.contains("open")));
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && (mainNav.classList.contains("open") || groups.some(group => group.open))) {
      const activeGroup = groups.find(group => group.open);
      const mobileMenu = mainNav.classList.contains("open");
      setOpen(false);
      if (mobileMenu) menuBtn.focus();
      else if (activeGroup) activeGroup.querySelector("summary").focus();
    }
  });
}

const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('#mainNav a, .footer-nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage || (currentPage === 'index.html' && link.getAttribute('href') === '/')) link.setAttribute('aria-current', 'page');
});
