// Browser regression checks run in CI against this checkout, before Pages deployment.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.RUFCOM_PLAYWRIGHT_MODULE || 'playwright');
const site = path.resolve(__dirname, '../site');
const output = process.env.RUFCOM_BROWSER_ARTIFACTS || path.resolve(__dirname, '../browser-review');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
const report = { pages: [], carousel: [], error: null };

const server = http.createServer(async (req, res) => {
  try {
    let relative = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    if (relative.endsWith('/')) relative += 'index.html';
    const file = path.resolve(site, '.' + relative);
    if (!file.startsWith(site + path.sep)) { res.writeHead(403); res.end(); return; }
    const bytes = await fs.readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream'});
    res.end(bytes);
  } catch { res.writeHead(404); res.end('Not found'); }
});

async function audit(page, name, viewport, state) {
  const result = await page.evaluate(() => {
    const visible = el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
    const errors = [], counts = {};
    for (const el of document.querySelectorAll('[data-rf-role]')) {
      if (!visible(el)) continue;
      const role = el.dataset.rfRole, css = getComputedStyle(el), size = parseFloat(css.fontSize);
      counts[role] = (counts[role] || 0) + 1;
      const expected = { 'card-title':18, body:16, control:16, note:14, eyebrow:14 }[role];
      if (expected && Math.abs(size - expected) > .1) errors.push(`${role}: ${size}px, ${el.textContent.trim().slice(0,65)}`);
      if (['page-title','section-title'].includes(role) && (size < 22 || size > 26.1)) errors.push(`${role}: ${size}px`);
      const weight = { 'page-title':700, 'section-title':700, 'card-title':700, body:400, note:400, eyebrow:600 }[role];
      if (weight && Number(css.fontWeight) !== weight) errors.push(`${role}: weight ${css.fontWeight}`);
      if (!css.fontFamily.includes('system-ui')) errors.push(`${role}: family ${css.fontFamily}`);
    }
    const broken = [...document.images].filter(el => visible(el) && el.complete && !el.naturalWidth).map(el=>el.getAttribute('src'));
    return { counts, errors, broken, overflow:document.documentElement.scrollWidth > innerWidth + 1 };
  });
  report.pages.push({ name, viewport, state, ...result });
  assert.deepEqual(result.errors, [], `${name} ${viewport} ${state}: typography`);
  assert.deepEqual(result.broken, [], `${name}: broken image`);
  assert.equal(result.overflow, false, `${name} ${viewport}: horizontal overflow`);
}

async function menus(page, name, label) {
  await page.evaluate(() => window.scrollTo(0,0));
  const menu = page.getByRole('button', { name:'Abrir menú', exact:true });
  const mobile = await menu.isVisible();
  if (mobile) await menu.click();
  for (const section of ['Empieza aquí','Guías','Equipos y antenas','Aventura y proyectos']) {
    await page.locator('#mainNav summary').filter({hasText:section}).click();
    await audit(page, name, label, `menu-${section}`);
    if (section === 'Guías') await page.screenshot({path:path.join(output, `${name}-${label}-menu.png`)});
  }
  await page.keyboard.press('Escape');
}

async function carousel(page, label) {
  const position = page.locator('[data-carousel-position]');
  await page.mouse.move(0,0);
  assert.equal(await position.textContent(), '1 / 2');
  const started = Date.now();
  await page.waitForFunction(() => document.querySelector('[data-carousel-position]').textContent === '2 / 2', undefined, {timeout:8000});
  report.carousel.push({ viewport:label, state:'automatic-first-change', elapsedFromLoadedPage:Date.now()-started });
  await page.screenshot({path:path.join(output, `inicio-${label}-rufis.png`)});
  await page.getByRole('button',{name:'Ver imagen siguiente',exact:true}).click();
  assert.equal(await position.textContent(),'1 / 2');
  assert.equal(await page.locator('[data-carousel-toggle]').count(),0);
  // Keep focus and cursor on the arrow: neither may freeze the carousel.
  await page.waitForFunction(() => document.querySelector('[data-carousel-position]').textContent === '2 / 2', undefined, {timeout:8000});
  assert.equal(await page.getByRole('button',{name:'Ver imagen siguiente',exact:true}).evaluate(el=>el===document.activeElement),true);
  const controls = await page.locator('.rf-carousel__controls button').evaluateAll(items => items.map(el=>({w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height})));
  assert(controls.every(el=>el.w>=44 && el.h>=44), 'Carousel touch targets must be at least 44px');
  await audit(page,'inicio',label,'autoplay-after-manual');
  await page.screenshot({path:path.join(output, `inicio-${label}-trio.png`)});
  report.carousel.push({viewport:label,state:'autoplay-after-manual-with-focus-and-hover',controls});
}

(async () => {
  let browser, page;
  await fs.mkdir(output,{recursive:true});
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    browser = await chromium.launch();
    for (const viewport of [{width:1366,height:900,label:'escritorio'},{width:390,height:844,label:'movil'}]) {
      const context = await browser.newContext({viewport:{width:viewport.width,height:viewport.height},hasTouch:viewport.label==='movil'});
      await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
      page = await context.newPage();
      const errors=[]; page.on('pageerror', error=>errors.push(error.message));
      for (const [name, url] of [['inicio','/'],['licencias','/licencias.html'],['codigo-q','/codigo-q.html']]) {
        await page.goto(base+url,{waitUntil:'networkidle'});
        const reject = page.getByRole('button',{name:'Rechazar',exact:true});
        if (await reject.isVisible()) await reject.click();
        await audit(page,name,viewport.label,'initial');
        if (name === 'inicio') await carousel(page,viewport.label);
        await page.screenshot({path:path.join(output, `${name}-${viewport.label}-completa.png`),fullPage:true});
        await menus(page,name,viewport.label);
        if (name !== 'inicio') {
          await page.locator('.guide-index summary').click();
          await audit(page,name,viewport.label,'guide-index-open');
          await page.locator('.guide-index summary').click();
          const cq = page.locator(name === 'licencias' ? '#llamada-cq' : '#cq-y-alfabeto-fonetico');
          await cq.scrollIntoViewIfNeeded();
          await page.screenshot({path:path.join(output, `${name}-${viewport.label}-cq.png`)});
          assert((await page.locator('main').innerText()).includes('Charlie'));
          if (name === 'codigo-q') {
            await page.locator('.q-answer summary').click();
            await audit(page,name,viewport.label,'answer-open');
          }
        }
      }
      assert.deepEqual(errors,[],'JavaScript page errors');
      await context.close();
    }
    console.log('PASS: three affected pages, desktop/mobile, menus, panels, roles, images and carousel rotation/pause');
  } catch (error) {
    report.error = error.stack;
    if (page && !page.isClosed()) await page.screenshot({path:path.join(output,'failure.png'),fullPage:true}).catch(()=>{});
    process.exitCode = 1;
    console.error(error);
  } finally {
    await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n');
    if (browser) await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})();
