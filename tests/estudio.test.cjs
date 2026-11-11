const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const M=require('../site/assets/js/estudio-modelo.js');
const bank=require('../site/assets/js/estudio-banco.js');
function random(seed=11){return ()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
function answerAreas(questions,legal,technical){const counts={legal,technical},answers={};for(const q of questions){const key=q.topic==='reglamento'?'legal':'technical';if(counts[key]>0){answers[q.id]=q.correct;counts[key]--;}}return answers;}
test('original bank has distinct questions, one unambiguous answer and reachable study references',()=>{
 assert.equal(bank.length,144);assert.equal(new Set(bank.map(q=>q.id)).size,144);assert.equal(new Set(bank.map(q=>q.question)).size,144);
 const lessons=fs.readFileSync(require.resolve('../site/materias-radioaficion.html'),'utf8');
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.correct>=0&&q.correct<4);assert(q.explanation.length>30);assert(q.source.length>10);assert(lessons.includes(`id="${q.lesson}"`));assert(Object.hasOwn(M.topics,q.topic));}
 assert.equal(bank.filter(q=>q.category==='todas').length,32);
 for(const category of Object.keys(M.categories))assert.equal(bank.filter(q=>q.category===category).length,28);
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
test('review selection filters topics and never mutates the original options or loses answer identities',()=>{
 const before=JSON.stringify(bank),questions=M.choose(bank,'general','repaso','radio',random());
 assert(questions.length<=10&&questions.length>0);assert(questions.every(q=>q.category==='general'&&q.topic==='radio'));
 const prepared=M.prepare(questions,random(42));
 assert(prepared.some(q=>q.choices[0].id!==0));
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
test('worked numerical answers agree with independent calculations',()=>{
 const answer=id=>bank.find(q=>q.id===id).options[0];
 assert.equal(answer('A01'),'0,08 A');assert.equal(12/150,.08);
 assert.equal(answer('G03'),'50 Ω');assert.equal(Math.hypot(30,40),50);
 assert.equal(answer('S15'),'13 dB');assert.equal(10-3+6,13);
 assert.equal(answer('S25'),'50 dB');assert.equal(10*Math.log10(100/.001),50);
});
