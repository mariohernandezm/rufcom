const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const m=require('../site/assets/js/libro-modelo.js');
test('expiry is inclusive and unknown or invalid dates are never expired',()=>{
 assert.equal(m.licenseState('27/10/2026','2026-10-27'),'Vigente');
 assert.equal(m.licenseState('26/10/2026','2026-10-27'),'Vencida');
 assert.equal(m.licenseState('28/10/2026','2026-10-27'),'Vigente');
 for(const value of ['',undefined,'31/02/2026','renovada'])assert.equal(m.licenseState(value),'Sin datos');
 assert.equal(m.today(new Date('2026-10-28T01:00:00Z')),'2026-10-27');
});
test('commune suggestions support accents, prefixes and word initials',()=>{
 const options=['PUENTE ALTO','PUNTA ARENAS','ÑUÑOA','SAN JOSÉ DE MAIPO'];
 assert.deepEqual(m.communeMatches('pa',options),['PUENTE ALTO','PUNTA ARENAS']);
 assert.deepEqual(m.communeMatches('puente a',options),['PUENTE ALTO']);
 assert.deepEqual(m.communeMatches('nuno',options),['ÑUÑOA']);
 assert.deepEqual(m.communeMatches('s j d m',options),['SAN JOSÉ DE MAIPO']);
 assert.deepEqual(m.communeMatches('',options),[]);
 for(const [key,value] of [['p','PORTÁTIL'],['f','FIJA'],['m','MÓVIL']])assert.equal(m.condition(key),value);
});
test('defaults do not create phantom records, preserve overrides and fill future rows',()=>{
 const defaults={frequency:'',mode:''},rows=[m.blank(defaults)];
 m.applyDefaults(rows,defaults,'frequency','146.500');m.applyDefaults(rows,defaults,'mode','FM');
 assert.equal(m.hasData(rows[0]),false);
 rows[0].call='TEST';rows[0].frequency='145.500';rows[0]._manual.frequency=true;
 rows.push(m.blank(defaults));m.applyDefaults(rows,defaults,'frequency','144.300');
 assert.equal(rows[0].frequency,'145.500');assert.equal(rows[1].frequency,'144.300');
 assert.equal(m.blank(defaults).mode,'FM');assert.equal(m.hasData(rows[0]),true);
});
test('Excel export keeps the requested order, expiry red, filter and literal user values',async()=>{
 const c={window:{libroModelo:m},TextEncoder,Blob,Uint8Array,DataView,ArrayBuffer,atob};vm.createContext(c);
 vm.runInContext(fs.readFileSync(require.resolve('../site/assets/js/libro-excel.js'),'utf8'),c);
 const row={...m.blank({frequency:'146.500',mode:'FM'}),date:'2026-10-27',time:'21:45',city:'PUENTE ALTO',condition:'PORTÁTIL',call:'TEST',name:'=1+1',notes:'<test>',expiry:'01/01/2000'};
 const blob=c.window.libroExcel([row],'TEST','America/Santiago'),bytes=Buffer.from(await blob.arrayBuffer());
 const xml=bytes.toString('utf8');
 assert.match(xml,/<autoFilter ref="A4:K5"/);
 assert.match(xml,/<c r="C5" t="inlineStr" s="0"><is><t xml:space="preserve">PUENTE ALTO/);
 assert.match(xml,/<c r="D5" t="inlineStr" s="0"><is><t xml:space="preserve">PORTÁTIL/);
 assert.match(xml,/<c r="J5" t="inlineStr" s="3">/);assert.match(xml,/<c r="K5" t="inlineStr" s="3">/);
 assert.match(xml,/>=1\+1<\/t>/);assert.match(xml,/&lt;test&gt;/);assert.doesNotMatch(xml,/<f>/);
});
