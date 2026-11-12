// Browser regression checks run in CI against this checkout, before Pages deployment.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.RUFCOM_PLAYWRIGHT_MODULE || 'playwright');
const site = path.resolve(__dirname, '../site');
const output = process.env.RUFCOM_BROWSER_ARTIFACTS || path.resolve(__dirname, '../browser-review');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json','.pdf':'application/pdf'};
const report = { pages: [], carousel: [], density: [], error: null };
const primaryPages = [['inicio','/'],['licencias','/licencias.html'],['codigo-q','/codigo-q.html'],['libro','/libro-de-guardia.html'],['repetidores','/repetidores.html'],['simplex-repetidor','/simplex-repetidor.html'],['guias','/guias.html'],['chirp','/chirp.html']];
const covered = new Set(primaryPages.map(([,url])=>url === '/' ? 'index.html' : url.slice(1)));
const pages = [...primaryPages, ...Object.keys(require('./seo_pages.json')).filter(name=>!covered.has(name)).map(name=>[name.replace('.html',''),'/'+name]), ['404','/404.html']];

async function studyQuiz(browser, base, viewport) {
  const context = await browser.newContext({viewport:viewport==='movil'?{width:390,height:844}:{width:1366,height:900},hasTouch:viewport==='movil'});
  await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  const quiz = await context.newPage();
  const errors = [];
  quiz.on('pageerror', error => errors.push(error.message));
  await quiz.clock.install({time:new Date('2026-11-11T18:00:00Z')});
  for (const [category, legal, technical] of [['aspirante',18,12],['novicio',15,15],['general',12,18],['superior',6,24]]) {
    await quiz.goto(base+'/practicar-examen.html?categoria='+category);
    assert.equal(await quiz.locator('#quiz-category').inputValue(),category);
    assert.equal(await quiz.locator('#quiz-config').isVisible(),true);
    assert.equal(await quiz.locator('#quiz-legal-count').inputValue(),String(legal));
    assert.equal(await quiz.locator('#quiz-technical-count').inputValue(),String(technical));
    assert.equal(await quiz.locator('#quiz-training').isChecked(),false);
    await audit(quiz,'practicar-examen',viewport,'configurar-'+category);
    await quiz.locator('#quiz-start').click();
    assert.equal(await quiz.locator('#quiz-nav button').count(),30);
    assert.match(await quiz.locator('#quiz-clock').innerText(),/45:00/);
    await quiz.locator('#quiz-choices label').first().click();
    assert.equal(await quiz.locator('#quiz-feedback').isVisible(),false);
    assert.equal(await quiz.locator('#quiz-choices [data-result]').count(),0);
    await quiz.locator('#quiz-next').click();
    await quiz.locator('#quiz-previous').click();
    assert.equal(await quiz.locator('#quiz-choices input:checked').count(),1);
    await quiz.locator('#quiz-finish').click();
    assert.match(await quiz.locator('#quiz-confirm-text').innerText(),/29 preguntas sin responder/);
    await quiz.locator('#quiz-keep').click();
    assert.equal(await quiz.locator('#quiz-results').isVisible(),false);
    await audit(quiz,'practicar-examen',viewport,'simulacro-'+category);
    await quiz.clock.fastForward(45*60*1000);
    assert.equal(await quiz.locator('#quiz-results').isVisible(),true);
    assert.match(await quiz.locator('#quiz-result-summary').innerText(),/Se agotaron los 45 minutos/);
    assert.match(await quiz.locator('#quiz-result-summary').innerText(),/29 sin responder/);
    assert.match(await quiz.locator('#quiz-result-scores').innerText(),new RegExp('de '+legal));
    assert.match(await quiz.locator('#quiz-result-scores').innerText(),new RegExp('de '+technical));
    await audit(quiz,'practicar-examen',viewport,'resultado-'+category);
  }
  await quiz.locator('#quiz-restart').click();
  await quiz.locator('[data-category="novicio"]').click();
  await quiz.locator('#quiz-training').check();
  const model=require('../site/assets/js/estudio-modelo.js'),bank=require('../site/assets/js/estudio-banco.js'),pool=model.pool(bank,'novicio');
  const legal=pool.filter(q=>q.topic==='reglamento').length,technical=pool.length-legal;
  await quiz.locator('#quiz-legal-count').selectOption(String(legal));
  await quiz.locator('#quiz-technical-count').selectOption(String(technical));
  assert.equal(await quiz.locator('#quiz-format').innerText(),'Total: '+pool.length+' preguntas');
  await quiz.screenshot({path:path.join(output,'estudio-'+viewport+'-configurar.png')});
  await quiz.locator('#quiz-legal-count').selectOption('5');
  await quiz.locator('#quiz-technical-count').selectOption('5');
  await quiz.locator('#quiz-start').click();
  await quiz.locator('#quiz-choices input').first().press('Space');
  assert.equal(await quiz.locator('#quiz-feedback').isVisible(),true);
  assert.equal(await quiz.locator('#quiz-choices input:disabled').count(),4);
  assert.equal(await quiz.locator('#quiz-choices [data-result="correct"]').count(),1);
  assert.equal(await quiz.locator('#quiz-choices [data-result="incorrect"]').count(),await quiz.locator('#quiz-feedback').getAttribute('data-result')==='incorrect'?1:0);
  assert.match(await quiz.getByRole('link',{name:'Ver pregunta original (PDF)',exact:true}).getAttribute('href'),/^assets\/docs\/subtel-apendice-/);
  await audit(quiz,'practicar-examen',viewport,'repaso-explicado');
  await quiz.screenshot({path:path.join(output,'estudio-'+viewport+'-repaso.png'),fullPage:true});
  await quiz.locator('#quiz-finish').click();
  await quiz.locator('#quiz-confirm-finish').click();
  assert.equal(await quiz.locator('#quiz-retry-errors').isVisible(),true);
  await quiz.locator('#quiz-review summary').first().click();
  await audit(quiz,'practicar-examen',viewport,'revision-abierta');
  await quiz.locator('#quiz-retry-errors').click();
  assert.equal(await quiz.locator('#quiz-clock').isVisible(),false);
  assert((await quiz.locator('#quiz-nav button').count())>=9);
  await quiz.goto(base+'/practicar-examen.html');
  await quiz.locator('[data-category="superior"]').click();
  await quiz.locator('#quiz-legal-count').selectOption('0');
  await quiz.locator('#quiz-technical-count').selectOption('5');
  await quiz.locator('#quiz-start').click();
  assert.equal(await quiz.locator('#quiz-nav button').count(),5);
  assert.match(await quiz.locator('#quiz-session-title').innerText(),/Práctica Superior/);
  await quiz.locator('#quiz-finish').click();await quiz.locator('#quiz-confirm-finish').click();
  assert(!/mínimos|Resultado ponderado/.test(await quiz.locator('#quiz-results').innerText()));
  await quiz.goto(base+'/practicar-examen.html?categoria=__proto__&tema=constructor');
  assert.equal(await quiz.locator('#quiz-category').inputValue(),'aspirante');
  assert.equal(await quiz.locator('#quiz-topic').inputValue(),'todos');
  assert.deepEqual(errors,[],'Quiz JavaScript errors');
  await quiz.close();
  await context.close();
}

async function studyLesson(browser,base,viewport){
  const context=await browser.newContext({viewport:viewport==='movil'?{width:390,height:844}:{width:1366,height:900}});
  await context.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
  const page=await context.newPage(),errors=[],bank=require('../site/assets/js/estudio-banco.js');
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/estudio-reglamento.html?categoria=novicio');
  const cards=page.locator('.course-bank-question'),first=cards.first(),second=cards.nth(1),third=cards.nth(2);
  assert.equal(await first.getByRole('radio').count(),4);
  assert.equal(await first.locator('details').count(),0,'No answer is exposed before responding');
  assert.equal(await first.locator('[data-result]').count(),0);
  assert.equal(await first.getByRole('button',{name:'Comprobar respuesta'}).isDisabled(),true);
  // The first official key is C. Exercise keyboard selection and an incorrect attempt.
  await first.getByRole('radio').first().press('Space');
  assert.equal(await first.locator('.quiz-feedback').isVisible(),false);
  await first.getByRole('button',{name:'Comprobar respuesta'}).press('Enter');
  assert.equal(await first.locator('.quiz-feedback').getAttribute('data-result'),'incorrect');
  assert.equal(await first.locator('.quiz-option[data-result="incorrect"]').count(),1);
  assert.equal(await first.locator('.quiz-option[data-result="correct"]').count(),0);
  assert.equal(await first.locator('.course-source-answer').isVisible(),false);
  assert.equal(await first.locator('input:disabled').count(),4);
  await audit(page,'estudio-reglamento',viewport,'respuesta-incorrecta');
  await first.getByText('Ver respuesta correcta',{exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('.course-bank-question .quiz-option[data-result="correct"]'));
  assert.match(await first.locator('.course-source-answer').innerText(),/^Clave publicada: C\./);
  assert.equal(await first.locator('.quiz-option[data-result="correct"]').count(),1);
  await audit(page,'estudio-reglamento',viewport,'solucion-revelada');
  // A correct response is green and reveals its explanation immediately.
  const secondKey=bank.filter(q=>q.module==='reglamento')[1].correct;
  await second.getByRole('radio').nth(secondKey).check();
  await second.getByRole('button',{name:'Comprobar respuesta'}).click();
  assert.equal(await second.locator('.quiz-feedback').getAttribute('data-result'),'correct');
  assert.equal(await second.locator('.course-source-answer').isVisible(),true);
  assert.equal(await second.locator('.quiz-option[data-result="incorrect"]').count(),0);
  // Both checked attempts and an unsubmitted selection survive pagination/category changes.
  await third.getByRole('radio').nth(1).check();
  await page.locator('#course-bank-next').click();await page.locator('#course-bank-previous').click();
  assert.equal(await first.locator('.course-source-answer').isVisible(),true);
  assert.equal(await first.locator('input:checked').inputValue(),'0');
  assert.equal(await second.locator('.quiz-feedback').getAttribute('data-result'),'correct');
  assert.equal(await third.locator('input:checked').inputValue(),'1');
  assert.equal(await third.locator('details').count(),0);
  await page.locator('#course-category').selectOption('general');
  assert.equal(await first.locator('.quiz-feedback').getAttribute('data-result'),'incorrect');
  await first.scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output,'leccion-'+viewport+'-respuesta.png')});
  await audit(page,'estudio-reglamento',viewport,'respuesta-correcta-y-retorno');
  const excluded=bank.find(q=>q.excluded),matching=bank.filter(q=>q.module===excluded.module);
  await page.goto(base+'/estudio-'+excluded.module+'.html');await page.locator('#course-category').selectOption('todas');
  for(let i=0;i<Math.floor(matching.findIndex(q=>q.id===excluded.id)/8);i++)await page.locator('#course-bank-next').click();
  const issue=cards.filter({hasText:excluded.id+' ·'});
  assert.equal(await issue.count(),1);
  assert.equal(await issue.getByRole('radio').count(),0,'A documented ambiguous key is not graded');
  assert.match(await issue.innerText(),/incidencia y no se califica/);
  await issue.getByText('Ver clave e incidencia documental',{exact:true}).click();
  assert.equal(await issue.locator('.course-source-issue').isVisible(),true);
  await audit(page,'estudio-'+excluded.module,viewport,'incidencia-sin-calificar');
  assert.deepEqual(errors,[],'Lesson JavaScript errors');
  await context.close();
}

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
      for (const [name, url] of pages) {
        await page.goto(base+url,{waitUntil:'networkidle'});
        const reject = page.getByRole('button',{name:'Rechazar',exact:true});
        if (await reject.isVisible()) await reject.click();
        await audit(page,name,viewport.label,'initial');
        if (name === 'inicio') {
          const heights = await page.locator('#accesos .resource-card').evaluateAll(items=>items.map(el=>el.getBoundingClientRect().height));
          assert.equal(heights.length,6);
          assert(heights.every(height=>height<220), `Home resource cards: ${heights}`);
          await carousel(page,viewport.label);
        }
        if (name === 'guias') {
          const density = await page.evaluate(()=>({
            firstCard:document.querySelector('.library-card').getBoundingClientRect().top + scrollY,
            chirpCard:document.querySelector('.library-card a[href="chirp.html"]').closest('article').getBoundingClientRect().top + scrollY,
            cardHeights:[...document.querySelectorAll('.library-card')].map(el=>el.getBoundingClientRect().height),
            downloadHeight:document.querySelector('.download-section').getBoundingClientRect().height
          }));
          report.density.push({name,viewport:viewport.label,...density});
          assert(density.cardHeights.every(height=>height<190), `Guide cards too tall: ${density.cardHeights}`);
          assert(density.firstCard < (viewport.width>700 ? 1000 : 1400), `First guide at ${density.firstCard}px`);
          if(viewport.width>700) assert(density.chirpCard<1450, `CHIRP guide at ${density.chirpCard}px`);
          assert.equal(await page.locator('.library-card .library-read').count(),0);
          for(const panel of await page.locator('.download-card details,.download-help').all()) {
            await panel.locator('summary').click();
            await audit(page,name,viewport.label,'download-help-open');
            await panel.locator('summary').click();
          }
        }
        if (name === 'chirp') {
          const step = await page.locator('#guia-seccion-2').evaluate(el=>el.getBoundingClientRect().top + scrollY);
          report.density.push({name,viewport:viewport.label,firstStep:step});
          assert(step<(viewport.width>700 ? 800 : 1150), `CHIRP first step at ${step}px`);
          await page.locator('.guide-index summary').click();
          await audit(page,name,viewport.label,'guide-index-open');
          await page.locator('.guide-index summary').click();
        }
        if (name === 'repetidores') {
          const initialCard = await page.locator('.repeater-card').first().boundingBox();
          assert(initialCard.y < viewport.height - 100, 'The directory must show the first card on entry');
          const input = page.locator('#repeater-query');
          const summary = page.locator('#repeater-count');
          assert.equal(await page.locator('.repeater-card:visible').count(),178);
          assert.equal(await page.locator('#simplex-reference').isVisible(),false);
          await input.fill('CE1CA');
          const beforeTyping = await page.evaluate(() => scrollY);
          await input.pressSequentially(' ');
          assert.equal(await input.evaluate(el=>el===document.activeElement),true);
          assert.equal(await page.evaluate(() => scrollY),beforeTyping);
          await input.press('Enter');
          assert.equal(await summary.evaluate(el=>el===document.activeElement),true);
          assert.equal(await page.locator('.repeater-card:visible').count(),3);
          const visibleResults = await page.locator('.repeater-card:visible').first().boundingBox();
          assert(visibleResults.y >= 0 && visibleResults.y < viewport.height - 60, 'First search result must be in view');
          await audit(page,name,viewport.label,'search-results');
          await page.screenshot({path:path.join(output, `repetidores-${viewport.label}-busqueda.png`)});
          await input.fill('zzzzzz');
          await page.locator('#repeater-submit').click();
          assert.equal(await page.locator('#repeater-empty').isVisible(),true);
          const empty = await page.locator('#repeater-empty').boundingBox();
          assert(empty.y >= 0 && empty.y < viewport.height - 60, 'Empty search feedback must be in view');
          await input.fill('146.520');
          await input.press('Enter');
          assert.equal(await page.locator('#simplex-reference').isVisible(),true);
          await page.locator('#repeater-reset').click();
          await page.locator('#repeater-region').selectOption('metropolitana');
          assert.equal(await page.locator('.repeater-card:visible').count(),15);
          await page.locator('.repeater-settings:visible').first().locator('summary').click();
          await audit(page,name,viewport.label,'radio-settings-open');
        }
        if (name === 'libro') {
          await page.clock.install({time:new Date('2026-10-25T14:30:00Z')});
          const compact=viewport.width<=1100;
          const field=f=>compact?page.locator('#mobile-'+f):page.locator('[data-field="'+f+'"]').first();
          await field('call').pressSequentially('ca3 hmm');
          assert.equal(await page.locator('#registros tr').count(),2);
          assert.equal(await field('call').evaluate(el=>el===document.activeElement),true);
          assert.equal(await page.locator('[data-field="time"]').nth(1).inputValue(),'');
          assert.equal(await field('call').inputValue(),'CA3HMM');
          assert.equal(await field('name').inputValue(),'MARIO HERNANDEZ MONTES');
          assert.notEqual(await field('city').inputValue(),'');
          // Condition shortcuts replace a previous choice at any cursor position.
          await field('condition').press('p');
          assert.equal(await field('condition').inputValue(),'PORTÁTIL');
          await field('condition').press('End');
          await field('condition').press('m');
          assert.equal(await field('condition').inputValue(),'MÓVIL');
          await field('condition').press('Home');
          await field('condition').press('f');
          assert.equal(await field('condition').inputValue(),'FIJA');
          await field('condition').press('Backspace');
          assert.equal(await field('condition').inputValue(),'');
          await field('condition').click();
          await field('condition').press('p');
          assert.equal(await field('condition').inputValue(),'PORTÁTIL');
          const stamp=await field('time').inputValue();
          assert.match(stamp,/^[0-9]{2}:[0-9]{2}$/);
          await page.clock.fastForward(120000);
          await field('name').fill('josé pérez');
          await field('city').fill('ñuñoa');
          assert.equal(await field('name').inputValue(),'JOSÉ PÉREZ');
          assert.equal(await field('city').inputValue(),'ÑUÑOA');
          assert.equal(await field('time').inputValue(),stamp);
          if(compact){
            await page.locator('#guard-form button[type=submit]').click();
            for(let i=2;i<=20;i++){
              await field('call').fill('DEMO'+i);
              await page.locator('#guard-form button[type=submit]').click();
            }
            assert.equal(await page.locator('#guard-list button').count(),5);
            assert.equal(await page.locator('#guard-count').innerText(),'20 contactos');
            await page.locator('#guard-next').click();
            assert.equal(await page.locator('#guard-page').innerText(),'6–10 de 20');
            await page.locator('#guard-list button').first().click();
            await field('city').fill('concon');
            await page.locator('#guard-form button[type=submit]').click();
            assert.equal(await page.locator('#guard-count').innerText(),'20 contactos');
            assert.equal(await field('call').evaluate(el=>el===document.activeElement),true);
            assert.equal(await page.locator('.guard-mobile').evaluate(el=>el.scrollWidth<=el.clientWidth+1),true);
          }
          const download=page.waitForEvent('download');
          await page.locator('#descargar').click();
          await (await download).saveAs(path.join(output,'libro-'+viewport.label+'.xlsx'));
          await audit(page,name,viewport.label,'completed-book');
          assert.equal(await page.locator('.guard-table').evaluate(el=>el.scrollWidth<=el.clientWidth+1),true);
          await page.reload();
          assert.equal(await field('call').inputValue(),'');
          assert.equal(await field('time').inputValue(),'');
          assert.equal(await page.locator('#registros tr').count(),1);
          await field('name').fill('wilson garrido');
          await field('name').press('ArrowDown');
          await field('name').press('Enter');
          assert.equal(await field('call').inputValue(),'CE3WAR');
          assert.equal(await field('city').inputValue(),'SANTIAGO');
          assert.match(await field('expiry').inputValue(),/25\/09\/2029/);
          await field('name').fill('hernan gomez');
          const person=page.getByRole('option',{name:/HERNÁN ALEJANDRO OLIVERA GÓMEZ · CE3HOG/});
          await person.filter({visible:true}).click();
          assert.equal(await field('call').inputValue(),'CE3HOG');
          assert.equal(await field('city').inputValue(),'RENCA');
          await audit(page,name,viewport.label,'name-lookup');
          await page.screenshot({path:path.join(output,'libro-nombre-'+viewport.label+'.png'),fullPage:true});
          page.once('dialog',dialog=>dialog.accept());
          await page.reload();
        }
        await page.screenshot({path:path.join(output, `${name}-${viewport.label}-completa.png`),fullPage:primaryPages.some(([key])=>key===name)});
        if(await page.locator('#mainNav').count()) await menus(page,name,viewport.label);
        if (name === 'licencias' || name === 'codigo-q') {
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
      await studyQuiz(browser,base,viewport.label);
      await studyLesson(browser,base,viewport.label);
      await context.close();
    }
    console.log('PASS: all canonical pages and 404, desktop/mobile, compact resources and CHIRP entry, searches, guard log, menus, panels, roles, images and carousel');
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
