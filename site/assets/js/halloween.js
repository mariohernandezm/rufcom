'use strict';
function halloweenActive(now=new Date()){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Santiago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const get=type=>parts.find(p=>p.type===type).value;
 const day=`${get('year')}-${get('month')}-${get('day')}`;
 return day>='2026-10-28' && day<'2026-11-01';
}
if(typeof module!=='undefined')module.exports={halloweenActive};
if(typeof document!=='undefined'){
 let strip=null,css=null;
 function updateHalloween(){
  if(halloweenActive()){
   if(strip)return;
   css=document.createElement('link');css.rel='stylesheet';css.href='/assets/css/halloween.css?v=20261029-contraste';document.head.append(css);
   strip=document.createElement('div');strip.className='rf-halloween';
   strip.innerHTML='<span aria-hidden="true" class="rf-halloween-art">🎃</span><span data-rf-role="control">Halloween en frecuencia <span aria-hidden="true">·</span> ¡Buenos contactos y pocos sustos!</span><span aria-hidden="true" class="rf-halloween-art">🦇</span>';
   const header=document.querySelector('.site-header');if(header)header.after(strip);else document.body.prepend(strip);
   document.body.classList.add('rf-halloween-active');
  }else{
   strip?.remove();css?.remove();strip=null;css=null;document.body.classList.remove('rf-halloween-active');
  }
 }
 updateHalloween();
 // A tab left open also returns to normal after midnight in Chile.
 setInterval(updateHalloween,1000);
 document.addEventListener('visibilitychange',updateHalloween);
 window.addEventListener('pageshow',updateHalloween);
}

