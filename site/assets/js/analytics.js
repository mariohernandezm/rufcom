/* RUFCOM: analytics loads only after an explicit choice, on the public site. */
(() => {
  'use strict';
  const id = 'G-GD6SLBEGHX';
  const key = 'rufcom-analytics-consent-v1';
  const live = location.protocol === 'https:' && ['rufcom.cl', 'www.rufcom.cl'].includes(location.hostname);
  let choice;
  try { choice = localStorage.getItem(key); } catch (_) {}
  let started = false;
  function start() {
    if (!live || started) return;
    started = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', id, {
      allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_expires: 15552000,
      page_location: location.origin + location.pathname,
      page_referrer: document.referrer ? document.referrer.split('?')[0].split('#')[0] : ''
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  }
  const box = document.createElement('section');
  box.className = 'analytics-choice';
  box.setAttribute('aria-label', 'Preferencias de estadísticas');
  box.innerHTML = '<p><strong>¿Nos ayudas a mejorar RUFCOM?</strong> Con tu permiso usamos cookies de Google Analytics para conocer las visitas y las páginas más consultadas. Puedes rechazar y seguir navegando igual. <a href="privacidad.html">Privacidad</a></p><div><button type="button" data-choice="accepted">Aceptar estadísticas</button><button type="button" data-choice="rejected">Rechazar</button></div>';
  box.hidden = choice === 'accepted' || choice === 'rejected';
  document.body.append(box);
  box.addEventListener('click', event => {
    const button = event.target.closest('[data-choice]');
    if (!button) return;
    choice = button.dataset.choice;
    try { localStorage.setItem(key, choice); } catch (_) {}
    box.hidden = true;
    if (choice === 'accepted') start();
    else {
      window['ga-disable-' + id] = true;
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ['', '; domain=rufcom.cl', '; domain=.rufcom.cl', '; domain=' + location.hostname]) {
          document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax; Secure';
        }
      }
      if (started) location.reload();
    }
  });
  const footer = document.querySelector('footer .footer-contact') || document.querySelector('footer');
  if (footer) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'analytics-settings';
    button.textContent = 'Preferencias de estadísticas';
    button.addEventListener('click', () => { box.hidden = false; box.querySelector('button').focus(); });
    footer.append(button);
  }
  if (choice === 'accepted') start();
})();
