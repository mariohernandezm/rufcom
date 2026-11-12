'use strict';
// Resolución Exenta SUBTEL 2620/2023, arts. 5, 8 y 9 (tablas verificadas).
const estudioModelo = (() => {
 const categories = {
  aspirante:{name:'Aspirante',appendix:'B',legal:18,technical:12,weights:[.7,.3]},
  novicio:{name:'Novicio',appendix:'C',legal:15,technical:15,weights:[.5,.5]},
  general:{name:'General',appendix:'D',legal:12,technical:18,weights:[.3,.7]},
  superior:{name:'Superior',appendix:'E',legal:6,technical:24,weights:[.2,.8]}
 };
 const topics = {todos:'Todas las materias',reglamento:'Reglamentación',electricidad:'Electricidad y circuitos',electronica:'Electrónica',radio:'Radio y operación'};
 function shuffle(items,random=Math.random){
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
 }
 function pool(bank,category,topic='todos'){
  if(!Object.hasOwn(categories,category))throw new Error('Categoría desconocida');
  return bank.filter(q=>!q.excluded&&(q.category==='todas'||q.category===category)&&(topic==='todos'||q.topic===topic));
 }
 function choose(bank,category,mode='repaso',topic='todos',random=Math.random){
  const list=pool(bank,category,topic);
  if(mode==='repaso')return shuffle(list,random).slice(0,10);
  if(mode!=='simulacro')throw new Error('Modo desconocido');
  const config=categories[category],all=pool(bank,category),legal=all.filter(q=>q.topic==='reglamento'),technical=all.filter(q=>q.topic!=='reglamento');
  if(legal.length<config.legal||technical.length<config.technical)throw new Error('Faltan preguntas para este simulacro');
  return shuffle([...shuffle(legal,random).slice(0,config.legal),...shuffle(technical,random).slice(0,config.technical)],random);
 }
 function prepare(questions,random=Math.random){
  // Official answers can refer to A, B or C, so their original order is meaningful.
  return questions.map(q=>({...q,choices:q.official?q.options.map((text,id)=>({text,id})):shuffle(q.options.map((text,id)=>({text,id})),random)}));
 }
 function selectAreas(bank,category,legalCount,technicalCount,topic='todos',random=Math.random){
  const list=pool(bank,category,topic),legal=list.filter(q=>q.topic==='reglamento'),technical=list.filter(q=>q.topic!=='reglamento');
  if(!Number.isInteger(legalCount)||!Number.isInteger(technicalCount)||legalCount<0||technicalCount<0||legalCount>legal.length||technicalCount>technical.length||legalCount+technicalCount===0)throw new Error('Cantidad de preguntas inválida');
  return [...shuffle(legal,random).slice(0,legalCount),...shuffle(technical,random).slice(0,technicalCount)];
 }
 function grade(questions,answers,category,mode){
  const sections={legal:{total:0,correct:0},technical:{total:0,correct:0}};
  let correct=0,answered=0;
  const mistakes=[];
  for(const q of questions){
   const section=sections[q.topic==='reglamento'?'legal':'technical'];section.total++;
   const picked=answers[q.id];
   if(Number.isInteger(picked)&&picked>=0&&picked<q.options.length)answered++;
   if(picked===q.correct){correct++;section.correct++;}else mistakes.push(q.id);
  }
  for(const s of Object.values(sections))s.percent=s.total?100*s.correct/s.total:null;
  const completeExam=mode==='simulacro'&&sections.legal.total===categories[category].legal&&sections.technical.total===categories[category].technical;
  const weighted=completeExam?sections.legal.percent*categories[category].weights[0]+sections.technical.percent*categories[category].weights[1]:null;
  return {total:questions.length,correct,answered,unanswered:questions.length-answered,percent:questions.length?100*correct/questions.length:0,sections,weighted,
   meetsCriteria:completeExam?weighted>=60-1e-9&&sections.legal.percent>=50&&sections.technical.percent>=50:null,mistakes};
 }
 function secondsLeft(deadline,now=Date.now()){return Math.max(0,Math.ceil((deadline-now)/1000));}
 return {categories,topics,shuffle,pool,choose,prepare,selectAreas,grade,secondsLeft};
})();
if(typeof module!=='undefined')module.exports=estudioModelo;
if(typeof window!=='undefined')window.estudioModelo=estudioModelo;
