const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const M=require('../site/assets/js/estudio-modelo.js');
const bank=require('../site/assets/js/estudio-banco.js');
function random(seed=11){return ()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
function answerAreas(questions,legal,technical){const counts={legal,technical},answers={};for(const q of questions){const key=q.topic==='reglamento'?'legal':'technical';if(counts[key]>0){answers[q.id]=q.correct;counts[key]--;}}return answers;}
test('official bank preserves section identities, source PDFs, answer keys and figures',()=>{
 assert.equal(bank.length,708);assert.equal(new Set(bank.map(q=>q.id)).size,708);
 const lessons=fs.readFileSync(require.resolve('../site/materias-radioaficion.html'),'utf8');
 for(const q of bank){assert.equal(q.options.length,4);assert(q.correct>=0&&q.correct<4);assert(q.official);assert(q.keyId);assert(q.source.length>10);assert(lessons.includes(`id="${q.lesson}"`));assert(Object.hasOwn(M.topics,q.topic));for(const url of [q.sourceUrl,q.keyUrl,...q.figures.map(f=>f.src)])assert(fs.existsSync(require('node:path').join(__dirname,'../site',url.split('#')[0])),q.id+' '+url);}
 const expected={todas:108,aspirante:114,novicio:162,general:186,superior:138};
 for(const [category,count] of Object.entries(expected))assert.equal(bank.filter(q=>q.category===category).length,count);
 const issues=require('../docs/estudio-incidencias.json');
 assert.equal(bank.filter(q=>!q.excluded).length,688);
 assert.deepEqual(new Set(bank.filter(q=>q.excluded).map(q=>q.id)),new Set(['D1-16','E2-94',...Object.keys(issues)]));
 for(const [id,reason] of Object.entries(issues))assert.equal(bank.find(q=>q.id===id).excluded,reason);
 assert.equal(bank.find(q=>q.id==='C1-57').figures.length,0);assert.match(bank.find(q=>q.id==='C1-58').figures[0].src,/C1-58/);
 const manifest=require('../docs/estudio-fuentes.json'),crypto=require('node:crypto');
 for(const source of manifest){const bytes=fs.readFileSync(require('node:path').join(__dirname,'../site/assets/docs/subtel-apendice-'+source.appendix.toLowerCase()+'-20201206.pdf'));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),source.sha256);}
});
test('all categories reproduce the official question distributions and weights without cross-category questions',()=>{
 const expected={aspirante:[18,12,.7,.3],novicio:[15,15,.5,.5],general:[12,18,.3,.7],superior:[6,24,.2,.8]};
 for(const [category,[legal,technical,w1,w2]] of Object.entries(expected)){
  const q=M.choose(bank,category,'simulacro','radio',random());
  assert.equal(q.length,30);assert.equal(new Set(q.map(x=>x.id)).size,30);
  assert.equal(q.filter(x=>x.topic==='reglamento').length,legal);assert.equal(q.filter(x=>x.topic!=='reglamento').length,technical);
  assert(q.every(x=>x.category==='todas'||x.category===category));assert.deepEqual(M.categories[category].weights,[w1,w2]);
 }
 assert.throws(()=>M.choose([], 'superior','simulacro'),/Faltan/);
 assert.throws(()=>M.pool(bank,'__proto__'),/desconocida/);
});
test('official alternative order is preserved because answers can refer to other letters',()=>{
 const before=JSON.stringify(bank),questions=M.choose(bank,'general','repaso','radio',random());
 assert(questions.length<=10&&questions.length>0);assert(questions.every(q=>q.category==='general'&&q.topic==='radio'));
 const prepared=M.prepare(questions,random(42));
 assert(prepared.every(q=>q.choices.map(c=>c.id).join('')==='0123'));
 for(const q of prepared){assert.equal(q.choices.find(o=>o.id===q.correct).text,q.options[q.correct]);assert.equal(new Set(q.choices.map(o=>o.id)).size,4);}
 assert.equal(JSON.stringify(bank),before);
});
test('the same 18 correct answers can pass or fail because the legal and technical weights differ',()=>{
 const questions=M.choose(bank,'aspirante','simulacro','todos',random());
 const pass=M.grade(questions,answerAreas(questions,12,6),'aspirante','simulacro');
 const fail=M.grade(questions,answerAreas(questions,9,9),'aspirante','simulacro');
 assert.equal(pass.correct,18);assert.equal(fail.correct,18);assert(Math.abs(pass.weighted-61.6666666667)<1e-7);assert.equal(fail.weighted,57.5);
 assert.equal(pass.meetsCriteria,true);assert.equal(fail.meetsCriteria,false);
});
test('each area minimum is required even with a high weighted total; blanks are incorrect',()=>{
 const q=M.choose(bank,'aspirante','simulacro','todos',random());
 const legalOnly=M.grade(q,answerAreas(q,18,0),'aspirante','simulacro');
 assert.equal(legalOnly.weighted,70);assert.equal(legalOnly.meetsCriteria,false);assert.equal(legalOnly.unanswered,12);assert.equal(legalOnly.mistakes.length,12);
 const boundary=M.grade(q,answerAreas(q,9,10),'aspirante','simulacro');assert(Math.abs(boundary.weighted-60)<1e-9);assert.equal(boundary.meetsCriteria,true);
 const perfect=M.grade(q,answerAreas(q,18,12),'aspirante','simulacro');assert.equal(perfect.weighted,100);assert.deepEqual(perfect.mistakes,[]);
 const review=M.grade(q.slice(0,1),{},'aspirante','repaso');assert.equal(review.meetsCriteria,null);assert.equal(review.weighted,null);
});
test('the deadline uses elapsed real time and cannot gain time while a tab is hidden',()=>{
 assert.equal(M.secondsLeft(45000,0),45);assert.equal(M.secondsLeft(45000,44001),1);assert.equal(M.secondsLeft(45000,45000),0);assert.equal(M.secondsLeft(45000,99999),0);
});
test('custom counts never repeat questions, cross categories or include ambiguous source duplicates',()=>{
 for(const category of Object.keys(M.categories)){
  const all=M.pool(bank,category),legal=all.filter(q=>q.topic==='reglamento').length,technical=all.length-legal;
  const selected=M.selectAreas(bank,category,legal,technical,'todos',random());
  assert.equal(selected.length,all.length);assert.equal(new Set(selected.map(q=>q.id)).size,all.length);assert(selected.every(q=>!q.excluded));
  assert(selected.slice(0,legal).every(q=>q.topic==='reglamento'));assert(selected.slice(legal).every(q=>q.topic!=='reglamento'));
 }
 assert.equal(M.selectAreas(bank,'novicio',0,5,'electronica',random()).length,5);
 assert.throws(()=>M.selectAreas(bank,'novicio',0,0),/inválida/);assert.throws(()=>M.selectAreas(bank,'novicio',109,0),/inválida/);
 const custom=M.selectAreas(bank,'aspirante',20,10);assert.equal(M.grade(custom,{},'aspirante','simulacro').meetsCriteria,null);
});
test('sample official numerical keys agree with independent calculations',()=>{
 const answer=id=>{const q=bank.find(q=>q.id===id);return q.options[q.correct];};
 assert.equal(answer('E1-10'),'99 W.');assert.equal(18*5.5,99);
 assert.equal(answer('E1-13'),'10:1');assert.equal(Math.sqrt(100),10);
 assert.equal(answer('D1-36'),'50 K - 1 W.');assert.equal(1/(1/100+1/100),50);
});
test('Rufis encourages without announcing a pass when an area minimum fails or the attempt is blank',()=>{
 const q=M.choose(bank,'aspirante','simulacro','todos',random());
 const pass=M.grade(q,answerAreas(q,12,6),'aspirante','simulacro');
 assert.equal(M.encouragement(pass).tone,'celebrate');assert.match(M.encouragement(pass).text,/simulacro/);
 const highTotal=M.grade(q,answerAreas(q,18,0),'aspirante','simulacro');
 assert.equal(highTotal.weighted,70);assert.equal(M.encouragement(highTotal).tone,'encourage');
 assert(!/lo lograste|felicitaciones/i.test(M.encouragement(highTotal).title));
 const blank=M.encouragement(M.grade(q,{},'aspirante','simulacro'));
 assert.equal(blank.tone,'encourage');assert.match(blank.text,/sin responder/);
 const short=M.grade(q.slice(0,2),{[q[0].id]:q[0].correct,[q[1].id]:q[1].correct},'aspirante','repaso');
 assert.equal(M.encouragement(short).tone,'celebrate');assert(!/cumpliste los mínimos|aprobaste/i.test(M.encouragement(short).text));
});
test('every official question has a lesson, and category routes cover the concepts represented in their bank',()=>{
 const coverage=require('../docs/estudio-cobertura.json');assert.equal(Object.keys(M.modules).length,16);
 const covered=Object.values(coverage).flatMap(x=>x.questionIds);assert.equal(covered.length,708);assert.equal(new Set(covered).size,708);
 for(const q of bank){assert(Object.hasOwn(M.modules,q.module));assert(coverage[q.module].questionIds.includes(q.id));
  const page=fs.readFileSync(require('node:path').join(__dirname,'../site',M.modules[q.module].url),'utf8');assert(page.includes('data-course-module="'+q.module+'"'));
  if(q.category!=='todas')assert(M.modules[q.module].route.includes(q.category),q.id+' missing from category route');
 }
 for(const category of Object.keys(M.categories)){
  const route=fs.readFileSync(require('node:path').join(__dirname,'../site/estudiar-'+category+'.html'),'utf8');
  for(const q of M.pool(bank,category))assert(route.includes(M.modules[q.module].url+'?categoria='+category),q.id+' route link');
 }
});
test('lesson practice preserves category and excludes documented problems; question E1-20 separates givens from alternatives',()=>{
 for(const category of Object.keys(M.categories))for(const id of Object.keys(M.modules)){
  const pool=M.pool(bank,category,'leccion:'+id);assert(pool.every(q=>q.module===id&&!q.excluded&&(q.category==='todas'||q.category===category)));
 }
 assert.deepEqual(M.pool(bank,'general','leccion:__proto__'),[]);
 const q=bank.find(q=>q.id==='E1-20');assert.match(q.question,/20 mA a 100 V/);assert.equal(q.options[1],'700. 714 y 200 Ohm.');assert(q.options.every(o=>!o.includes('A.-')&&!o.includes('B.-')));assert(q.excluded);
});
