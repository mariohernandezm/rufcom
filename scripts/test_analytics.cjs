const {readFileSync} = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const code = readFileSync(require('node:path').join(__dirname,'../site/assets/js/analytics.js'),'utf8');
function page(choice, host='rufcom.cl', blocked=false) {
  const added=[]; let handler, reloads=0;
  const node=()=>({setAttribute(){},append(){},querySelector(){return {focus(){}};},addEventListener(type,fn){handler=fn;}});
  const doc={referrer:'https://example.com/?private=1',cookie:'',createElement:node,head:{append:n=>added.push(n)},body:{append(){}},querySelector:()=>null};
  const ctx={document:doc,location:{protocol:host==='local'?'file:':'https:',hostname:host,origin:'https://'+host,pathname:'/',reload(){reloads++;}},localStorage:{getItem(){if(blocked)throw Error();return choice;},setItem(k,v){if(blocked)throw Error();choice=v;}},window:{},Date};
  vm.runInNewContext(code,ctx);
  return {added,ctx,click(value){handler({target:{closest:()=>({dataset:{choice:value}})}});},reloads:()=>reloads};
}
for(const choice of [null,'rejected']) assert.equal(page(choice).added.length,0);
assert.equal(page('accepted','local').added.length,0);
assert.equal(page(null,'rufcom.cl',true).added.length,0);
const p=page(null); p.click('rejected'); assert.equal(p.added.length,0);
p.click('accepted'); assert.equal(p.added.length,1); assert.equal(p.ctx.window['ga-disable-G-GD6SLBEGHX'],false);
p.click('accepted'); assert.equal(p.added.length,1);
p.click('rejected'); assert.equal(p.reloads(),1); assert.equal(p.ctx.window['ga-disable-G-GD6SLBEGHX'],true);
const accepted=page('accepted'); assert.equal(accepted.added.length,1);
const config=accepted.ctx.window.dataLayer.find(x=>x[0]==='config')[2];
assert.equal(config.page_referrer,'https://example.com/');
assert.equal(config.allow_google_signals,false);
console.log('PASS: consent gating, local exclusion, reacceptance, single load and withdrawal');
