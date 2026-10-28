
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
const model=window.libroModelo, defaults={frequency:'',mode:''};
const fields=model.fields;
const licenses=new Map(window.licenciasDatos.registros.map(r=>[r.indicativo,r.vencimiento]));
const labels=['Fecha','Hora local','Comuna','Condición','Indicativo','Nombre y apellidos','Notas','Frecuencia MHz','Modo','Vigencia de licencia'];
const blank=()=>model.blank(defaults), hasData=model.hasData;
let book={version:1,operator:'',zone:Intl.DateTimeFormat().resolvedOptions().timeZone,rows:[blank()]};
let downloaded='';
let mobileRow=null,mobilePage=0;
let mobileReady=false;
const contents=()=>JSON.stringify({operator:book.operator,rows:book.rows.filter(r=>hasData(r))});
try{localStorage.removeItem(key);}catch{}
function save(){
 const count=book.rows.filter(r=>r.call).length;
 status.textContent=count+' '+(count===1?'registro':'registros')+' · Solo en esta página. Descarga el Excel antes de salir.';
 if(mobileReady)refreshMobile();
}
window.addEventListener('beforeunload',e=>{if(book.rows.some(r=>hasData(r))&&contents()!==downloaded){e.preventDefault();e.returnValue='';}});
window.addEventListener('pageshow',e=>{if(e.persisted){book={version:1,operator:'',zone:Intl.DateTimeFormat().resolvedOptions().timeZone,rows:[blank()]};downloaded='';operator.value='';defaults.frequency='';defaults.mode='';document.querySelector('#frecuencia-general').value='';document.querySelector('#modo-general').value='';book.rows=[blank()];render();save();}});
function ensureEmptyRow(){
 if(!book.rows.length || hasData(book.rows[book.rows.length-1])){
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
   const td=document.createElement('td'),input=document.createElement('input');td.dataset.column=field;
   input.type=field==='date'?'date':field==='time'?'time':'text';input.value=row[field];input.dataset.field=field;input.maxLength=field==='notes'?1000:150;input.autocomplete='off';
   const label=document.createElement('label');label.className='guard-field-label';label.textContent=labels[j];input.id='registro-'+index+'-'+field;label.htmlFor=input.id;td.append(label);
   input.setAttribute('aria-label',labels[j]+', fila '+(index+1));input.dataset.rfRole='control';
   configureInput(input,field);if(field==='expiry')paintLicense(input,row);
   input.addEventListener('input',()=>{
    let value=input.value;
    if(['call','name','city'].includes(field))value=field==='call'?normalize(value):value.toUpperCase();
    if(field==='condition')value=model.condition(value);
    if(field==='mode')value=value.toUpperCase();
    if(field==='frequency')value=value.replace(',','.');
    if(['frequency','mode'].includes(field))row._manual[field]=Boolean(value);
    row[field]=value;if(input.value!==value){const initial=input.value;input.value=value;if(field==='condition'&&initial.length===1)input.setSelectionRange(1,value.length);}
    if(field==='call'){
     if(value&&!row.stamped){const now=new Date(),pad=n=>String(n).padStart(2,'0');row.date ||= now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate());row.time ||= pad(now.getHours())+':'+pad(now.getMinutes());row.stamped=true;}
     const base=value.replace(/\/(P|M)$/,'');
     row.name=(names.get(base)||'').toUpperCase();
     // Replace even a manually entered commune when the callsign changes.
     // Keep manual input for unknown calls; clear only the previous lookup result.
     const city=window.rufcomComunas[base];
     if(city)row.city=city.toUpperCase();else if(row._lookupCity===row.city)row.city='';
     row._lookupCity=city?row.city:'';
     row.expiry=licenses.get(base)||'';paintLicense(tr.querySelector('[data-field=expiry]'),row);
     for(const f of ['date','time','name','city'])tr.querySelector('[data-field="'+f+'"]').value=row[f];
    }
    ensureEmptyRow();
    save();
   });td.append(input);if(field==='city')attachCommune(input);tr.append(td);
  });
  const td=document.createElement('td'),remove=document.createElement('button');remove.type='button';remove.textContent='Eliminar';remove.className='rf-button rf-button--secondary';remove.dataset.rfRole='control';remove.setAttribute('aria-label','Eliminar fila '+(index+1));
  remove.addEventListener('click',()=>{if(hasData(row)&&!confirm('¿Eliminar esta fila del libro?'))return;book.rows.splice(index,1);if(!book.rows.length)book.rows.push(blank());render();save();});td.append(remove);tr.append(td);tbody.append(tr);
 }

function licenseText(row){return !row.call?'':model.licenseState(row.expiry)+(row.expiry?' · '+row.expiry:'');}
function paintLicense(input,row){input.value=licenseText(row);input.classList.toggle('guard-expired',model.licenseState(row.expiry)==='Vencida');}
function configureInput(input,field){
 if(field==='expiry'){input.readOnly=true;input.placeholder='Según listado SUBTEL';}
 if(field==='condition'){
  input.setAttribute('list','condiciones-estacion');input.placeholder='P, F o M';input.setAttribute('aria-describedby','ayuda-autocompletar');
  // A station shortcut replaces the whole condition, wherever the cursor is.
  // beforeinput also covers the on-screen keyboard on phones.
  input.addEventListener('beforeinput',e=>{
   if(e.isComposing)return;
   const shortcut=e.inputType==='insertText'&&/^[pfm]$/i.test(e.data||'');
   const clear=e.inputType.startsWith('delete')&&['PORTÁTIL','FIJA','MÓVIL'].includes(input.value);
   if(!e.cancelable||!shortcut&&!clear)return;
   e.preventDefault();input.value=shortcut?e.data:'';
   input.dispatchEvent(new Event('input',{bubbles:true}));
  });
  input.addEventListener('focus',()=>input.select());
  input.addEventListener('click',()=>input.select());
 }
 if(field==='city'){input.placeholder='Comuna o iniciales';input.setAttribute('aria-describedby','ayuda-autocompletar');}
 if(field==='frequency')input.inputMode='decimal';
 if(field==='mode')input.setAttribute('list','modos-radio');
}
// Accessible suggestions support typed prefixes, initials, keyboard and touch.
function attachCommune(input){
 const box=document.createElement('div');box.className='guard-suggestions';box.id=input.id+'-suggestions';box.setAttribute('role','listbox');box.setAttribute('aria-label','Comunas sugeridas');box.hidden=true;input.after(box);
 input.setAttribute('role','combobox');input.setAttribute('aria-autocomplete','list');input.setAttribute('aria-controls',box.id);input.setAttribute('aria-expanded','false');
 let matches=[],active=-1;
 function close(){box.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');active=-1;}
 function select(value){input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}));close();input.focus();}
 function show(){
  matches=model.communeMatches(input.value,window.rufcomListaComunas).slice(0,20);box.replaceChildren();active=-1;
  if(!matches.length||matches.length===1&&model.fold(matches[0])===model.fold(input.value)){close();return;}
  for(const [i,value] of matches.entries()){
   const option=document.createElement('div');option.id=box.id+'-'+i;option.setAttribute('role','option');option.setAttribute('aria-selected','false');option.dataset.rfRole='control';option.textContent=value;
   option.addEventListener('pointerdown',e=>e.preventDefault());option.addEventListener('click',()=>select(value));box.append(option);
  }
  box.hidden=false;input.setAttribute('aria-expanded','true');input.removeAttribute('aria-activedescendant');
 }
 input.addEventListener('input',show);
 input.addEventListener('keydown',e=>{
  if(e.key==='Escape'){close();return;}
  if(box.hidden)return;
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){
   e.preventDefault();active=(active+(e.key==='ArrowDown'?1:-1)+matches.length)%matches.length;
   [...box.children].forEach((el,i)=>el.setAttribute('aria-selected',String(i===active)));input.setAttribute('aria-activedescendant',box.children[active].id);box.children[active].scrollIntoView({block:'nearest'});
  }
  if(e.key==='Enter'&&(active>=0||matches.length===1)){e.preventDefault();select(matches[active>=0?active:0]);}
  if(e.key==='Tab'&&(active>=0||matches.length===1))select(matches[active>=0?active:0]);
 });
 input.addEventListener('blur',close);
}
for(const [field,id] of [['frequency','frecuencia-general'],['mode','modo-general']]){
 const input=document.querySelector('#'+id);
 input.addEventListener('input',()=>{
  const value=field==='mode'?input.value.toUpperCase():input.value.replace(',','.');input.value=value;
  model.applyDefaults(book.rows,defaults,field,value);
  book.rows.forEach((row,i)=>{tbody.children[i].querySelector('[data-field='+field+']').value=row[field];});save();
 });
}
document.querySelector('#aplicar-generales').addEventListener('click',()=>{
 for(const row of book.rows)for(const field of ['frequency','mode']){row._manual[field]=false;row[field]=defaults[field];}
 render();save();
});

const operator=document.querySelector('#estacion');operator.value=book.operator;
operator.addEventListener('input',()=>{operator.value=normalize(operator.value);book.operator=operator.value;save();});
document.querySelector('#agregar').addEventListener('click',()=>{ensureEmptyRow();save();tbody.lastChild.querySelector('[data-field="call"]').focus();});
document.querySelector('#descargar').addEventListener('click',()=>{
 const rows=book.rows.filter(r=>hasData(r));
 if(!rows.length){status.textContent='Escribe un indicativo para comenzar tu libro.';return;}
 if(rows.some(r=>!r.call)){status.textContent='Hay una fila con datos sin indicativo. Complétala o elimínala antes de descargar.';return;}
 const url=URL.createObjectURL(window.libroExcel(rows,book.operator,book.zone)),a=document.createElement('a');a.href=url;a.download='libro-de-guardia-rufcom.xlsx';a.click();downloaded=contents();status.textContent='Descarga iniciada. Verifica que el Excel se haya guardado antes de salir.';setTimeout(()=>URL.revokeObjectURL(url),30000);
});
const mobile=document.createElement('section');mobile.className='guard-mobile';mobile.setAttribute('aria-label','Registro rápido de contactos');
mobile.innerHTML='<form id="guard-form"><div class="guard-mobile-heading"><h2 data-rf-role="card-title" id="guard-editor-title">Nuevo contacto</h2><span id="guard-stamp" data-rf-role="note">Hora automática</span></div><div id="guard-main-fields"></div><button class="rf-button" data-rf-role="control" type="submit">Guardar y siguiente</button><button class="rf-button" data-rf-role="control" id="guard-new" type="button">Nuevo contacto</button><button class="rf-button" data-rf-role="control" id="guard-delete" type="button">Eliminar contacto</button></form><div class="guard-mobile-heading"><h2 data-rf-role="card-title" id="guard-count">Contactos</h2><span data-rf-role="note">Toca uno para editar</span></div><div id="guard-list"></div><div class="guard-mobile-pages"><button class="rf-button" data-rf-role="control" id="guard-prev" type="button" aria-label="Página anterior">Anterior</button><span id="guard-page" data-rf-role="note"></span><button class="rf-button" data-rf-role="control" id="guard-next" type="button" aria-label="Página siguiente">Siguiente</button></div>';
document.querySelector('.guard-table').before(mobile);
const mobileInputs={};
for(const f of fields){
 const label=document.createElement('label');label.dataset.rfRole='control';label.textContent=labels[fields.indexOf(f)];
 const input=document.createElement('input');input.id='mobile-'+f;input.type=f==='date'?'date':f==='time'?'time':'text';input.maxLength=f==='notes'?1000:150;input.autocomplete='off';input.dataset.rfRole='control';label.htmlFor=input.id;label.append(input);mobileInputs[f]=input;
 mobile.querySelector('#guard-main-fields').append(label);
 configureInput(input,f);
 input.addEventListener('input',()=>{
  const index=book.rows.indexOf(mobileRow),target=tbody.children[index].querySelector('[data-field="'+f+'"]');
  const initial=input.value;target.value=initial;target.dispatchEvent(new Event('input',{bubbles:true}));
  if(f==='condition'&&initial.length===1)input.setSelectionRange(1,input.value.length);
 });
 if(f==='city')attachCommune(input);
}
function refreshMobile(){
 if(!book.rows.includes(mobileRow))mobileRow=book.rows[book.rows.length-1];
 for(const f of fields){if(f==='expiry')paintLicense(mobileInputs[f],mobileRow);else if(mobileInputs[f].value!==mobileRow[f])mobileInputs[f].value=mobileRow[f];}
 mobile.querySelector('#guard-stamp').textContent=mobileRow.time?'Hora '+mobileRow.time:'Hora automática';
 mobile.querySelector('#guard-editor-title').textContent=mobileRow.call?'Contacto '+mobileRow.call:'Nuevo contacto';
 mobile.querySelector('#guard-delete').hidden=!hasData(mobileRow);
 const rows=book.rows.filter(r=>hasData(r)).slice().reverse(),pages=Math.max(1,Math.ceil(rows.length/5));mobilePage=Math.min(mobilePage,pages-1);
 mobile.querySelector('#guard-count').textContent=rows.length+' contactos';
 const list=mobile.querySelector('#guard-list');list.replaceChildren();
 for(const row of rows.slice(mobilePage*5,mobilePage*5+5)){
  const button=document.createElement('button');button.type='button';button.className='guard-contact';button.dataset.rfRole='control';button.setAttribute('aria-label','Editar '+(row.call||'contacto sin indicativo'));
  const time=document.createElement('span'),body=document.createElement('span'),call=document.createElement('strong'),info=document.createElement('span');time.textContent=row.time||'—';call.textContent=row.call||'SIN INDICATIVO';info.textContent=[row.name,row.city,row.condition].filter(Boolean).join(' · ');info.className='guard-contact-info';info.dataset.rfRole='note';body.append(call,info);const license=document.createElement('span');license.className='guard-contact-info';license.dataset.rfRole='note';license.textContent=licenseText(row);license.classList.toggle('guard-expired',model.licenseState(row.expiry)==='Vencida');body.append(license);button.append(time,body);
  button.addEventListener('click',()=>{mobileRow=row;refreshMobile();mobileInputs.call.focus();});list.append(button);
 }
 mobile.querySelector('#guard-page').textContent=rows.length?(mobilePage*5+1)+'–'+Math.min(mobilePage*5+5,rows.length)+' de '+rows.length:'Sin contactos';
 mobile.querySelector('#guard-prev').disabled=mobilePage===0;mobile.querySelector('#guard-next').disabled=mobilePage===pages-1;
}
function nextMobile(){ensureEmptyRow();mobileRow=book.rows[book.rows.length-1];refreshMobile();mobileInputs.call.focus();}
mobile.querySelector('form').addEventListener('submit',e=>{e.preventDefault();if(!mobileRow.call){mobileInputs.call.setCustomValidity('Escribe el indicativo.');mobileInputs.call.reportValidity();return;}mobileInputs.call.setCustomValidity('');mobilePage=0;nextMobile();save();});
mobileInputs.call.addEventListener('input',()=>mobileInputs.call.setCustomValidity(''));
mobile.querySelector('#guard-new').addEventListener('click',nextMobile);
mobile.querySelector('#guard-delete').addEventListener('click',()=>{if(!confirm('¿Eliminar este contacto del libro?'))return;book.rows.splice(book.rows.indexOf(mobileRow),1);mobileRow=null;render();save();});
mobile.querySelector('#guard-prev').addEventListener('click',()=>{mobilePage--;refreshMobile();});mobile.querySelector('#guard-next').addEventListener('click',()=>{mobilePage++;refreshMobile();});
// Both views edit the same rows; resizing never loses a contact in progress.
matchMedia('(max-width:1100px)').addEventListener('change',()=>refreshMobile());
mobileReady=true;render();save();
})();

