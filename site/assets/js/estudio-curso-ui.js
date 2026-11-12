(() => {
 'use strict';
 const section=document.querySelector('[data-course-module]');if(!section)return;
 const modules=window.estudioCurso,bank=window.estudioBanco,M=window.estudioModelo;
 const $=id=>document.getElementById(id),category=$('course-category'),id=section.dataset.courseModule;
 if(!modules||!bank||!M){$('course-bank-count').textContent='No se pudo cargar el banco. Puedes seguir estudiando las explicaciones y ejemplos de esta página.';return;}
 const param=new URLSearchParams(location.search).get('categoria');
 category.value=Object.hasOwn(M.categories,param)?param:modules[id].route[0];
 if(Object.hasOwn(M.categories,param)){
  const route=window.estudioRutas[param],position=route.indexOf(id),context=$('course-route-context');
  context.textContent='Recorrido '+M.categories[param].name+(position>=0?` · Lección ${position+1} de ${route.length}`:' · Tema complementario');context.hidden=false;
  $('course-lesson-position').textContent=position>=0?`Lección ${position+1} de ${route.length} · ${M.categories[param].name}`:'Tema complementario · '+M.categories[param].name;
  const breadcrumb=document.querySelector('.study-breadcrumb a');breadcrumb.href='estudiar-'+param+'.html';breadcrumb.textContent='Material de '+M.categories[param].name;
  const actions=[...document.querySelectorAll('a.rf-button')].filter(a=>/^(Anterior:|Siguiente:)/.test(a.textContent));
  for(const a of actions){const next=route[position+(a.textContent.startsWith('Anterior:')?-1:1)];if(position<0||!next)a.remove();else{a.href=modules[next].url+'?categoria='+param;a.textContent=(a.textContent.startsWith('Anterior:')?'Anterior: ':'Siguiente: ')+modules[next].title;}}
  const back=[...document.querySelectorAll('a')].find(a=>a.textContent==='Ver todas las lecciones');back.href='estudiar-'+param+'.html';back.textContent='Volver a mi recorrido '+M.categories[param].name;
 }
 let page=0;const size=8,responses=new Map();
 function el(tag,text,role='body'){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(role)node.dataset.rfRole=role;return node;}
 function solution(q,title){
  const details=el('details',undefined,null);details.className='course-check';details.append(el('summary',title,'control'));
  const answer=el('p','Clave publicada: '+String.fromCharCode(65+q.correct)+'. '+q.options[q.correct]);answer.className=q.excluded?'course-source-issue':'course-source-answer';details.append(answer);
  if(q.excluded)details.append(el('p','Fuera de la práctica calificada. '+q.excluded));
  else {if(!q.explanation.startsWith('Respuesta según el solucionario'))details.append(el('p',q.explanation));details.append(el('p','Relaciona esta respuesta con los conceptos y ejemplos de la lección antes de seguir.'));}
  const source=el('p',q.source,'note');source.className='source-note';details.append(source);
  const links=el('p',undefined,'note');links.className='source-note';
  for(const [href,text] of [[q.sourceUrl,'Pregunta original (PDF)'],[q.keyUrl,'Solucionario publicado (PDF)']]){if(links.childNodes.length)links.append(' · ');const a=el('a',text,null);a.href=href;links.append(a);}details.append(links);
  return details;
 }
 function exercise(article,q){
  const state=responses.get(q.id)||{selected:null,checked:false,revealed:false};responses.set(q.id,state);
  const form=el('form',undefined,null),options=el('fieldset',undefined,null);options.className='quiz-options';options.append(el('legend','Selecciona tu respuesta'));
  const choices=q.options.map((text,index)=>{
   const label=el('label',undefined,'control');label.className='quiz-option';
   const input=el('input',undefined,null);input.type='radio';input.name='course-answer-'+q.id;input.value=String(index);input.checked=state.selected===index;
   const letter=el('span',String.fromCharCode(65+index),null);letter.className='quiz-option-letter';
   label.append(input,letter,el('span',text,null));options.append(label);
   input.addEventListener('change',()=>{if(!state.checked){state.selected=index;submit.disabled=false;}});
   return {input,label};
  });
  const submit=el('button','Comprobar respuesta','control');submit.type='submit';submit.className='rf-button';submit.disabled=state.selected===null;
  const feedback=el('div',undefined,null);feedback.className='quiz-feedback';feedback.setAttribute('role','status');feedback.hidden=true;
  form.append(options,submit);article.append(form,feedback);
  function mark(index,result){
   const {label}=choices[index];if(label.dataset.result===result)return;label.dataset.result=result;
   const status=el('span',result==='correct'?'Correcta':'Incorrecta',null);status.className='quiz-answer-status';label.append(status);
  }
  function showResult(){
   const correct=state.selected===q.correct;
   for(const {input} of choices)input.disabled=true;submit.disabled=true;
   mark(state.selected,correct?'correct':'incorrect');feedback.hidden=false;feedback.dataset.result=correct?'correct':'incorrect';
   feedback.append(el('p',correct?'¡Correcto! Has elegido la respuesta de la clave oficial.':'Aún no. Puedes ver la respuesta correcta y repasar la lección antes de continuar.'));
   const details=solution(q,correct?'Respuesta correcta y fuente oficial':'Ver respuesta correcta');
   details.open=correct||state.revealed;
   if(state.revealed)mark(q.correct,'correct');
   details.addEventListener('toggle',()=>{if(details.open&&!correct){state.revealed=true;mark(q.correct,'correct');}});
   article.append(details);
  }
  form.addEventListener('submit',event=>{event.preventDefault();if(state.checked||state.selected===null)return;state.checked=true;showResult();});
  if(state.checked)showResult();
 }
 function render(focus=false){
  const list=bank.filter(q=>q.module===id&&(category.value==='todas'||q.category==='todas'||q.category===category.value)),total=list.length;
  page=Math.min(page,Math.max(0,Math.ceil(total/size)-1));const start=page*size;
  $('course-bank-count').textContent=total?`${total} preguntas de este tema. Mostrando ${start+1} a ${Math.min(start+size,total)}.`:'No hay preguntas de este tema en el banco de esta categoría. La explicación puede servirte como preparación para una categoría posterior.';
  $('course-bank-list').replaceChildren();
  for(const q of list.slice(start,start+size)){
   const article=el('article',undefined,null);article.className='study-card course-bank-question';
   const label=el('p',q.id+' · '+(q.category==='todas'?'Todas las categorías':M.categories[q.category].name),'eyebrow');label.className='eyebrow';
   article.append(label,el('h3',q.question,'card-title'));
   for(const figure of q.figures){const image=document.createElement('img');image.src=figure.src;image.alt=figure.alt;image.width=figure.width;image.height=figure.height;image.loading='lazy';image.className='quiz-figure';article.append(image);}
   if(q.excluded){
    article.append(el('p','Consulta documental: esta pregunta tiene una incidencia y no se califica.'));
    const options=el('ol',undefined,null);options.type='A';for(const option of q.options)options.append(el('li',option));article.append(options,solution(q,'Ver clave e incidencia documental'));
   }else exercise(article,q);
   $('course-bank-list').append(article);
  }
  $('course-bank-previous').disabled=page===0;$('course-bank-next').disabled=start+size>=total;
  const practiceCategory=category.value==='todas'?modules[id].route[0]:category.value;
  const hasPractice=M.pool(bank,practiceCategory,'leccion:'+id).length>0;
  $('course-practice').hidden=!hasPractice;
  $('course-practice').href='practicar-examen.html?categoria='+practiceCategory+'&leccion='+id;
  if(focus){$('course-bank-title').focus({preventScroll:true});section.scrollIntoView({block:'start',behavior:'instant'});}
 }
 category.addEventListener('change',()=>{page=0;render();});
 $('course-bank-previous').addEventListener('click',()=>{if(page>0){page--;render(true);}});
 $('course-bank-next').addEventListener('click',()=>{page++;render(true);});render();
})();
