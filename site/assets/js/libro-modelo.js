'use strict';
// Shared rules for the editor and Excel export. Dates are calendar dates in Chile.
const libroModelo = (() => {
 const fold = v => String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().trim();
 function today(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Santiago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const get = type => parts.find(p=>p.type===type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
 }
 function expiryISO(value) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value || '');
  if (!m) return '';
  const [,d,mn,y] = m, date = new Date(Date.UTC(+y,+mn-1,+d));
  return date.getUTCFullYear()===+y && date.getUTCMonth()===+mn-1 && date.getUTCDate()===+d ? `${y}-${mn}-${d}` : '';
 }
 function licenseState(value, day = today()) {
  const iso = expiryISO(value);
  return !iso ? 'Sin datos' : iso < day ? 'Vencida' : 'Vigente';
 }
 function communeMatches(value, options) {
  const q = fold(value), compact = q.replace(/\s/g,'');
  if (!q) return [];
  return options.filter(name => {
   const n = fold(name), words = n.split(/\s+/);
   return n.startsWith(q) || words.map(w=>w[0]).join('').startsWith(compact);
  }).sort((a,b)=>a.localeCompare(b,'es'));
 }
 function condition(value) {
  const q = fold(value);
  return ({P:'PORTÁTIL',F:'FIJA',M:'MÓVIL',PORTATIL:'PORTÁTIL',FIJA:'FIJA',MOVIL:'MÓVIL'})[q] || value.toUpperCase();
 }
 function nameMatches(value, records) {
  const query=fold(value);
  if(query.length<2)return [];
  const words=query.split(/\s+/);
  return records.filter(r=>words.every(word=>fold(r.nombre).includes(word)));
 }
 const fields = ['date','time','city','condition','call','name','notes','frequency','mode','expiry'];
 function blank(defaults) { return {...Object.fromEntries(fields.map(f=>[f,''])),...defaults,_manual:{}}; }
 function hasData(row) { return fields.some(f=>!['frequency','mode','expiry'].includes(f) && row[f]) || ['frequency','mode'].some(f=>row._manual[f] && row[f]); }
 function applyDefaults(rows, defaults, field, value) {
  defaults[field] = value;
  for (const row of rows) if (!row._manual[field]) row[field] = value;
 }
 return {fold,today,expiryISO,licenseState,communeMatches,nameMatches,condition,fields,blank,hasData,applyDefaults};
})();
if (typeof module !== 'undefined') module.exports = libroModelo;
if (typeof window !== 'undefined') window.libroModelo = libroModelo;
