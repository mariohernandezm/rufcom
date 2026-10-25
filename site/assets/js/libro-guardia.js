
(() => {
'use strict';
const key='rufcom-libro-v1',tbody=document.querySelector('#registros'),status=document.querySelector('#estado-libro');
const normalize=v=>v.toUpperCase().replace(/\s/g,'');
// SUBTEL lists individuals with both surnames before their given names.
// Keep institutions and incomplete names unchanged; manual corrections remain editable.
function givenNamesFirst(value){
 const words=value.trim().toUpperCase().split(/\s+/);
 if(words.length<3 || /\b(CLUB|RADIOCLUB|UNIVERSIDAD|ASOCIACI[ÓO]N|CORPORACI[ÓO]N|FUNDACI[ÓO]N|BOMBEROS|ILUSTRE|MUNICIPALIDAD|EJ[ÉE]RCITO|ARMADA|FUERZA|ESCUELA|SOCIEDAD|SERVICIO|DEFENSA)\b/.test(value.toUpperCase()))return value.toUpperCase();
 let end=0;
 const particles=new Set(['DE','DEL','LA','LAS','LOS','DA','DAS','DO','DOS','VAN','VON']);
 for(let surname=0;surname<2;surname++){
  while(end<words.length && particles.has(words[end]))end++;
  end++;
 }
 if(end>=words.length)return value.toUpperCase();
 return [...words.slice(end),...words.slice(0,end)].join(' ');
}
const sourceNames=new Map(window.licenciasDatos.registros.map(r=>[r.indicativo,r.nombre.toUpperCase()]));
const names=new Map([...sourceNames].map(([call,name])=>[call,givenNamesFirst(name)]));
const fields=['date','time','call','name','city','notes','frequency','mode'];
const labels=['Fecha','Hora','Indicativo','Nombre y apellidos','Comuna','Notas','Frecuencia MHz','Modo'];
const blank=()=>Object.fromEntries(fields.map(f=>[f,'']));
let book={version:1,operator:'',zone:Intl.DateTimeFormat().resolvedOptions().timeZone,rows:[blank()]};
let downloaded='';
const contents=()=>JSON.stringify({operator:book.operator,rows:book.rows.filter(r=>fields.some(f=>r[f]))});
try{localStorage.removeItem(key);}catch{}
function save(){
 const count=book.rows.filter(r=>r.call).length;
 status.textContent=count+' '+(count===1?'registro':'registros')+' · Solo en esta página. Descarga el Excel antes de salir.';
}
window.addEventListener('beforeunload',e=>{if(book.rows.some(r=>fields.some(f=>r[f]))&&contents()!==downloaded){e.preventDefault();e.returnValue='';}});
window.addEventListener('pageshow',e=>{if(e.persisted){book={version:1,operator:'',zone:Intl.DateTimeFormat().resolvedOptions().timeZone,rows:[blank()]};downloaded='';operator.value='';render();save();}});
function ensureEmptyRow(){
 if(!book.rows.length || fields.some(f=>book.rows[book.rows.length-1][f])){
  const row=blank();book.rows.push(row);appendRow(row,book.rows.length-1);
 }
}
function render(){
 tbody.replaceChildren();
 book.rows.forEach(appendRow);
 ensureEmptyRow();
}
function appendRow(row,index){
  const tr=document.createElement('tr');
  fields.forEach((field,j)=>{
   const td=document.createElement('td'),input=document.createElement('input');
   input.type=field==='date'?'date':field==='time'?'time':'text';input.value=row[field];input.dataset.field=field;input.maxLength=field==='notes'?1000:150;input.autocomplete='off';
   const label=document.createElement('label');label.className='guard-field-label';label.textContent=labels[j];input.id='registro-'+index+'-'+field;label.htmlFor=input.id;td.append(label);
   input.setAttribute('aria-label',labels[j]+', fila '+(index+1));input.dataset.rfRole='control';
   input.addEventListener('input',()=>{
    let value=input.value;
    if(['call','name','city'].includes(field))value=field==='call'?normalize(value):value.toUpperCase();
    row[field]=value;if(input.value!==value)input.value=value;
    if(field==='call'){
     if(value&&!row.stamped){const now=new Date(),pad=n=>String(n).padStart(2,'0');row.date ||= now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate());row.time ||= pad(now.getHours())+':'+pad(now.getMinutes());row.stamped=true;}
     row.name=(names.get(value)||'').toUpperCase();row.city=(window.rufcomComunas[value]||'').toUpperCase();
     for(const f of ['date','time','name','city'])tr.querySelector('[data-field="'+f+'"]').value=row[f];
    }
    ensureEmptyRow();
    save();
   });td.append(input);tr.append(td);
  });
  const td=document.createElement('td'),remove=document.createElement('button');remove.type='button';remove.textContent='Eliminar';remove.className='rf-button rf-button--secondary';remove.dataset.rfRole='control';remove.setAttribute('aria-label','Eliminar fila '+(index+1));
  remove.addEventListener('click',()=>{if(fields.some(f=>row[f])&&!confirm('¿Eliminar esta fila del libro?'))return;book.rows.splice(index,1);if(!book.rows.length)book.rows.push(blank());render();save();});td.append(remove);tr.append(td);tbody.append(tr);
 }
const operator=document.querySelector('#estacion');operator.value=book.operator;
operator.addEventListener('input',()=>{operator.value=normalize(operator.value);book.operator=operator.value;save();});
document.querySelector('#agregar').addEventListener('click',()=>{ensureEmptyRow();save();tbody.lastChild.querySelector('[data-field="call"]').focus();});
document.querySelector('#descargar').addEventListener('click',()=>{
 const rows=book.rows.filter(r=>fields.some(f=>r[f]));
 if(!rows.length){status.textContent='Escribe un indicativo para comenzar tu libro.';return;}
 if(rows.some(r=>!r.call)){status.textContent='Hay una fila con datos sin indicativo. Complétala o elimínala antes de descargar.';return;}
 const url=URL.createObjectURL(window.libroExcel(rows,book.operator,book.zone)),a=document.createElement('a');a.href=url;a.download='libro-de-guardia-rufcom.xlsx';a.click();downloaded=contents();status.textContent='Descarga iniciada. Verifica que el Excel se haya guardado antes de salir.';setTimeout(()=>URL.revokeObjectURL(url),30000);
});
render();save();
})();

