(() => {
'use strict';
document.querySelectorAll('[data-print-study]').forEach(button=>button.addEventListener('click',()=>window.print()));
if(!document.querySelector('#quiz-setup'))return;
const M=window.estudioModelo,bank=window.estudioBanco,$=id=>document.getElementById(id);
if(!M||!Array.isArray(bank)){$('quiz-error').hidden=false;$('quiz-error').textContent='No se pudo cargar la práctica. Vuelve a abrir esta página.';return;}
const category=$('quiz-category'),training=$('quiz-training'),topic=$('quiz-topic'),legalCount=$('quiz-legal-count'),technicalCount=$('quiz-technical-count'),config=$('quiz-config');
const params=new URLSearchParams(location.search);
const lessonParam=Object.hasOwn(M.modules,params.get('leccion'))?params.get('leccion'):null;
const group=document.createElement('optgroup');group.label='Lecciones del curso';
for(const [id,lesson] of Object.entries(M.modules)){const option=document.createElement('option');option.value='leccion:'+id;option.textContent=lesson.title;group.append(option);}topic.append(group);
if(Object.hasOwn(M.categories,params.get('categoria')))category.value=params.get('categoria');
if(Object.hasOwn(M.topics,params.get('tema')))topic.value=params.get('tema');
if(lessonParam)topic.value='leccion:'+lessonParam;
let attempt=null,timer=null,lastMistakes=[];
const percent=value=>value.toLocaleString('es-CL',{maximumFractionDigits:1})+'%';
function element(tag,text,role='body'){
 const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(role)el.dataset.rfRole=role;return el;
}
function updateSetup(){
 const c=M.categories[category.value],total=Number(legalCount.value)+Number(technicalCount.value),standard=Number(legalCount.value)===c.legal&&Number(technicalCount.value)===c.technical;
 $('quiz-config-title').textContent=`Configurar ${training.checked?'entrenamiento':'examen'} ${c.name}`;
 topic.closest('label').hidden=!training.checked;
 $('quiz-format').textContent=`Total: ${total} preguntas`;
 $('quiz-mode-help').textContent=training.checked?'Sin reloj. Después de responder verás la solución y su referencia en SUBTEL.':standard?'Formato de examen: 30 preguntas y 45 minutos. Las soluciones se muestran al finalizar.':'Práctica personalizada de 45 minutos. El resultado orienta tu estudio; no se aplica el criterio de aprobación del examen.';
 if(total===0)$('quiz-mode-help').textContent='No hay preguntas habilitadas para esta selección. Elige otra materia o aumenta la cantidad de preguntas para practicar.';
 $('quiz-start').textContent=training.checked?'Iniciar entrenamiento':standard?'Iniciar examen':'Iniciar práctica';$('quiz-start').disabled=total===0;
}
function countOptions(select,available,standard){
 select.replaceChildren();
 for(const n of [...new Set([standard,0,5,10,20,available])].filter(n=>n<=available)){
  const option=document.createElement('option');option.value=String(n);option.textContent=`${n} preguntas${n===standard?' (Examen)':n===available?' (Todas)':''}`;select.append(option);
 }select.value=String(Math.min(standard,available));
}
function refreshCounts(){
 const c=M.categories[category.value],list=M.pool(bank,category.value,training.checked?topic.value:'todos');
 countOptions(legalCount,list.filter(q=>q.topic==='reglamento').length,c.legal);countOptions(technicalCount,list.filter(q=>q.topic!=='reglamento').length,c.technical);updateSetup();
}
function openConfig(value){category.value=value;refreshCounts();window.scrollTo({top:0,behavior:'instant'});config.showModal();}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>openConfig(button.dataset.category)));
training.addEventListener('change',()=>{if(!training.checked)topic.value='todos';refreshCounts();});topic.addEventListener('change',refreshCounts);
for(const el of [legalCount,technicalCount])el.addEventListener('change',updateSetup);
$('quiz-cancel').addEventListener('click',()=>config.close());
function stopClock(){if(timer!==null){clearInterval(timer);timer=null;}}
function start(customQuestions=null){
 stopClock();
 const c=M.categories[category.value],standard=Number(legalCount.value)===c.legal&&Number(technicalCount.value)===c.technical;
 const chosen=customQuestions||M.selectAreas(bank,category.value,Number(legalCount.value),Number(technicalCount.value),training.checked?topic.value:'todos');
 const practiceMode=customQuestions?'errores':training.checked?'repaso':standard?'simulacro':'personalizado';
 attempt={category:category.value,mode:practiceMode,questions:M.prepare(chosen),answers:{},index:0,deadline:customQuestions||training.checked?null:Date.now()+45*60*1000,finished:false};
 config.close();$('quiz-intro').hidden=true;$('quiz-help').hidden=true;
 $('quiz-session-title').textContent=`${practiceMode==='errores'?'Repaso de errores':training.checked?'Entrenamiento':standard?'Examen':'Práctica'} ${c.name}`;
 $('quiz-error').hidden=true;$('quiz-setup').hidden=true;$('quiz-results').hidden=true;$('quiz-session').hidden=false;$('quiz-confirm').hidden=true;
 $('quiz-clock').hidden=!attempt.deadline;
 $('quiz-progress').max=attempt.questions.length;
 buildNavigation();renderQuestion();tick();
 if(attempt.deadline)timer=setInterval(tick,1000);
}
function tick(){
 if(!attempt||attempt.finished||!attempt.deadline)return;
 const seconds=M.secondsLeft(attempt.deadline),minutes=Math.floor(seconds/60),rest=seconds%60;
 $('quiz-clock').textContent=`${String(minutes).padStart(2,'0')}:${String(rest).padStart(2,'0')}`;
 $('quiz-clock').setAttribute('aria-label',`Tiempo restante: ${minutes} minutos y ${rest} segundos`);
 if(seconds===0)finish(true);
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});
function buildNavigation(){
 $('quiz-nav').replaceChildren();
 attempt.questions.forEach((q,index)=>{
  const button=element('button',String(index+1),'control');button.type='button';button.dataset.index=String(index);
  button.addEventListener('click',()=>{attempt.index=index;renderQuestion();});$('quiz-nav').append(button);
 });
}
function updateNavigation(){
 const answered=Object.keys(attempt.answers).length,total=attempt.questions.length;
 $('quiz-progress').value=answered;
 $('quiz-progress-label').textContent=`Total: ${attempt.index+1}/${total} · ${answered} respondidas`;
 [...$('quiz-nav').children].forEach((button,index)=>{
  const done=Object.hasOwn(attempt.answers,attempt.questions[index].id);button.dataset.answered=String(done);
  button.setAttribute('aria-label',`Pregunta ${index+1}, ${done?'respondida':'sin responder'}`);
  if(index===attempt.index)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
 });
 $('quiz-previous').disabled=attempt.index===0;$('quiz-next').disabled=attempt.index===total-1;
}
function renderQuestion(){
 const q=attempt.questions[attempt.index],picked=attempt.answers[q.id];
 $('quiz-confirm').hidden=true;$('quiz-feedback').hidden=true;$('quiz-choices').replaceChildren();
 const area=q.topic==='reglamento'?'Reglamentación':'Técnica',areaQuestions=attempt.questions.filter(item=>(item.topic==='reglamento')===(q.topic==='reglamento'));
 $('quiz-question-topic').textContent='Materia '+area.toLowerCase();
 $('quiz-area-progress').textContent=`Pregunta ${areaQuestions.findIndex(item=>item.id===q.id)+1} de ${areaQuestions.length}`;
 $('quiz-question-title').textContent=q.question;
 $('quiz-figures').replaceChildren();for(const figure of q.figures||[]){const image=document.createElement('img');image.src=figure.src;image.alt=figure.alt;image.width=figure.width;image.height=figure.height;image.className='quiz-figure';$('quiz-figures').append(image);}
 q.choices.forEach((choice,index)=>{
  const label=element('label',undefined,'control');label.className='quiz-option';
  const input=element('input',undefined,'control');input.type='radio';input.name='quiz-answer';input.value=String(choice.id);input.id=`quiz-answer-${index}`;
  const immediate=attempt.mode==='repaso'||attempt.mode==='errores';
  input.checked=picked===choice.id;input.disabled=immediate&&picked!==undefined;
  const letter=element('span',String.fromCharCode(65+index),null);letter.className='quiz-option-letter';letter.setAttribute('aria-hidden','true');
  const text=element('span',choice.text,null);label.htmlFor=input.id;label.append(input,letter,text);
  input.addEventListener('change',()=>{
   if(attempt.finished||immediate&&attempt.answers[q.id]!==undefined)return;
   attempt.answers[q.id]=choice.id;updateNavigation();
   if(immediate){
    $('quiz-choices').querySelectorAll('input').forEach(el=>{el.disabled=true;});showFeedback(q);
   }
  });$('quiz-choices').append(label);
 });
 if((attempt.mode==='repaso'||attempt.mode==='errores')&&picked!==undefined)showFeedback(q);
 updateNavigation();$('quiz-question-title').focus({preventScroll:true});$('quiz-session').scrollIntoView({block:'start',behavior:'instant'});
}
function learningLink(q){
 const link=element('a','Repasar este concepto',null);link.href=M.modules[q.module]?.url+'?categoria='+attempt.category;return link;
}
function sourceLinks(q){
 const wrap=element('p',undefined,'note');
 for(const [url,text] of [[q.sourceUrl,'Ver pregunta original (PDF)'],[q.keyUrl,'Consultar solucionario (PDF)']]){
  if(!url)continue;const link=element('a',text,null);link.href=url;link.target='_blank';link.rel='noopener noreferrer';if(wrap.childNodes.length)wrap.append(document.createTextNode(' · '));wrap.append(link);
 }return wrap;
}
function showFeedback(q){
 const feedback=$('quiz-feedback'),correct=attempt.answers[q.id]===q.correct;
 for(const label of $('quiz-choices').querySelectorAll('.quiz-option')){
  const value=Number(label.querySelector('input').value),result=value===q.correct?'correct':value===attempt.answers[q.id]?'incorrect':null;
  label.querySelector('.quiz-answer-status')?.remove();
  if(result){label.dataset.result=result;const status=element('span',result==='correct'?'✓ Correcta':'✕ Incorrecta',null);status.className='quiz-answer-status';label.append(status);}
 }
 feedback.replaceChildren();feedback.dataset.result=correct?'correct':'incorrect';
 feedback.append(element('p',correct?'Respuesta correcta.':'Esta respuesta no es correcta.'),element('p','Solución: '+q.options[q.correct]),element('p',q.explanation));
 const source=element('p',q.source,'note');source.className='source-note';feedback.append(source,sourceLinks(q),learningLink(q));feedback.hidden=false;
}
function requestFinish(){
 const remaining=attempt.questions.length-Object.keys(attempt.answers).length;
 if(!remaining){finish(false);return;}
 $('quiz-confirm-text').textContent=`Quedan ${remaining} preguntas sin responder. Contarán como incorrectas si finalizas ahora.`;
 $('quiz-confirm').hidden=false;$('quiz-confirm-text').focus();
}
function scoreTable(result){
 const wrap=element('div',undefined,null);wrap.className='study-table-wrap';
 const table=element('table',undefined,null);table.className='study-table';
 const caption=element('caption','Resultados por área');table.append(caption);
 const head=element('thead',undefined,null),row=element('tr',undefined,null);
 for(const text of ['Área','Aciertos','Resultado']){const th=element('th',text);th.scope='col';row.append(th);}head.append(row);table.append(head);
 const body=element('tbody',undefined,null);
 for(const [key,label] of [['legal','Reglamentación'],['technical','Técnica']]){
  const s=result.sections[key];if(!s.total)continue;
  const tr=element('tr',undefined,null);tr.append(element('td',label),element('td',`${s.correct} de ${s.total}`),element('td',percent(s.percent)));body.append(tr);
 }table.append(body);wrap.append(table);return wrap;
}
function finish(expired){
 if(!attempt||attempt.finished)return;
 attempt.finished=true;stopClock();
 const result=M.grade(attempt.questions,attempt.answers,attempt.category,attempt.mode);
 lastMistakes=attempt.questions.filter(q=>result.mistakes.includes(q.id));
 $('quiz-session').hidden=true;$('quiz-results').hidden=false;$('quiz-confirm').hidden=true;$('quiz-help').hidden=false;
 $('quiz-result-title').textContent=attempt.mode==='simulacro'?`Resultado ponderado: ${percent(result.weighted)}`:`Práctica: ${result.correct} de ${result.total} correctas`;
 let summary=`${result.correct} ${result.correct===1?'acierto':'aciertos'} de ${result.total}. ${result.unanswered} sin responder. `;
 if(expired)summary='Se agotaron los 45 minutos. '+summary;
 if(attempt.mode==='simulacro')summary+=result.meetsCriteria?'Cumples los mínimos de este simulacro: 60% ponderado y 50% en cada área. Esto no equivale a aprobar el examen oficial.':'Aún no cumples los mínimos de este simulacro: 60% ponderado y 50% en cada área. Revisa abajo qué temas conviene repasar.';
 else summary+=`Porcentaje de aciertos de esta tanda: ${percent(result.percent)}. Úsalo para orientar tu repaso.`;
 $('quiz-result-summary').textContent=summary;$('quiz-result-scores').replaceChildren(scoreTable(result));
 const message=M.encouragement(result),rufis=$('quiz-rufis');rufis.dataset.tone=message.tone;
 $('quiz-rufis-title').textContent=message.title;$('quiz-rufis-message').textContent=message.text;
 const suggestions=$('quiz-rufis-topics');suggestions.replaceChildren();
 const reviewTopics=[...new Set(lastMistakes.map(q=>q.module))].sort((a,b)=>lastMistakes.filter(q=>q.module===b).length-lastMistakes.filter(q=>q.module===a).length).slice(0,3);
 for(const lesson of reviewTopics){
  const q=lastMistakes.find(item=>item.module===lesson),li=element('li',undefined,'body'),link=learningLink(q);
  link.textContent=M.modules[q.module].title;li.append(link);suggestions.append(li);
 }
 $('quiz-rufis-study').hidden=!lastMistakes.length;
 $('quiz-retry-errors').hidden=!lastMistakes.length;$('quiz-review').replaceChildren();
 attempt.questions.forEach((q,index)=>{
  const picked=attempt.answers[q.id],correct=picked===q.correct,details=element('details',undefined,null);details.className='quiz-review-item';
  details.dataset.result=picked===undefined?'unanswered':correct?'correct':'incorrect';
  details.append(element('summary',`${index+1}. ${picked===undefined?'Sin responder':correct?'Correcta':'Incorrecta'} · ${q.question}`,'control'));
  const chosen=element('p','Tu respuesta: '+(picked===undefined?'Sin responder':q.options[picked]));chosen.className='quiz-review-answer';chosen.dataset.result=picked===undefined?'unanswered':correct?'correct':'incorrect';
  const solution=element('p','✓ Respuesta correcta: '+q.options[q.correct]);solution.className='quiz-review-answer';solution.dataset.result='correct';
  details.append(chosen,solution,element('p',q.explanation));
  const source=element('p',q.source,'note');source.className='source-note';details.append(source,sourceLinks(q),learningLink(q));$('quiz-review').append(details);
 });$('quiz-result-title').focus({preventScroll:true});$('quiz-results').scrollIntoView({block:'start',behavior:'instant'});
}
$('quiz-start').addEventListener('click',()=>{try{start();}catch{const alert=$('quiz-error');alert.textContent='No se pudo iniciar esta selección. Prueba otra materia o vuelve a abrir la página.';alert.hidden=false;}});
$('quiz-previous').addEventListener('click',()=>{if(attempt.index>0){attempt.index--;renderQuestion();}});
$('quiz-next').addEventListener('click',()=>{if(attempt.index<attempt.questions.length-1){attempt.index++;renderQuestion();}});
$('quiz-finish').addEventListener('click',requestFinish);
$('quiz-confirm-finish').addEventListener('click',()=>finish(false));
$('quiz-keep').addEventListener('click',()=>{$('quiz-confirm').hidden=true;$('quiz-question-title').focus();});
$('quiz-retry-errors').addEventListener('click',()=>{if(lastMistakes.length)start(lastMistakes);});
$('quiz-restart').addEventListener('click',()=>{stopClock();attempt=null;$('quiz-session').hidden=true;$('quiz-results').hidden=true;$('quiz-setup').hidden=false;$('quiz-intro').hidden=false;$('quiz-help').hidden=false;document.querySelector('[data-category="'+category.value+'"]').focus();});
refreshCounts();
if(Object.hasOwn(M.categories,params.get('categoria'))||Object.hasOwn(M.topics,params.get('tema'))||lessonParam){training.checked=Boolean(lessonParam)||Object.hasOwn(M.topics,params.get('tema'));openConfig(category.value);}
})();
