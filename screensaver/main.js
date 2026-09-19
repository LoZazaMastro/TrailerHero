"use strict";
(() => {
 const element=id=>document.getElementById(id), spinner=element('loading'), status=element('status');
 const scenes=[0,1].map(i=>({root:element('scene'+i),video:element('video'+i),audio:element('audio'+i),logo:element('logo'+i),name:element('name'+i),item:null,candidate:0,ready:false,deadline:0,progress:0,lastTime:-1}));
 let state={items:[],muted:true,locale:navigator.language,loading:true}, active=null, pending=null, switching=false, lastSync=Date.now(), stopped=false, fadeTimer=0;
 const failed=new Set(),played=new Set();
 function release(scene){scene.video.pause();scene.audio.pause();scene.video.removeAttribute('src');scene.audio.removeAttribute('src');scene.video.load();scene.audio.load();scene.root.classList.remove('visible');scene.item=null;scene.ready=false;scene.deadline=0;}
 function sound(scene){scene.video.muted=state.muted!==false||Boolean(scene.item?.audioUrl)||scene!==active;scene.audio.muted=state.muted!==false||scene!==active;}
 function stop(){clearTimeout(fadeTimer);scenes.forEach(release);active=null;pending=null;switching=false;spinner.hidden=true;}
 function choose(){
  const available=(state.items||[]).filter(item=>!failed.has(item.id)&&item.urls?.length&&item.id!==active?.item?.id);
  let choices=available.filter(item=>!played.has(item.id));
  if(!choices.length){played.clear();if(active)played.add(active.item.id);choices=available;}
  return choices.length?choices[Math.floor(Math.random()*choices.length)]:null;
 }
 function setLogo(scene){
  const item=scene.item;scene.name.textContent=item.title||'';scene.name.hidden=Boolean(item.logos?.length);scene.logo.style.display='none';
  let cursor=0;const logos=item.logos||[];
  scene.logo.onload=()=>{if(scene.item!==item)return;scene.logo.style.display='block';scene.name.hidden=true;};
  scene.logo.onerror=()=>{if(scene.item!==item)return;scene.logo.style.display='none';if(++cursor<logos.length)scene.logo.src=logos[cursor];else scene.name.hidden=false;};
  if(logos.length)scene.logo.src=logos[0];else scene.logo.removeAttribute('src');
 }
 function source(scene){
  if(!scene.item)return;
  if(scene.candidate>=scene.item.urls.length){failed.add(scene.item.id);if(scene===pending)pending=null;if(scene===active){active=null;switching=false;}release(scene);if(pending?.ready)commit();else prepare();return;}
  scene.ready=false;scene.deadline=Date.now()+20000;scene.progress=Date.now();scene.lastTime=-1;
  scene.video.src=scene.item.urls[scene.candidate];scene.audio.removeAttribute('src');if(scene.item.audioUrl)scene.audio.src=scene.item.audioUrl;
  sound(scene);scene.video.load();
 }
 function retry(scene){if(!scene.item)return;scene.candidate++;source(scene);}
 function prepare(){
  if(stopped||pending||switching)return;
  let item=choose();
  if(!item&&!active){const only=(state.items||[]).find(x=>!failed.has(x.id)&&x.urls?.length);item=only;}
  if(!item){spinner.hidden=Boolean(active)||state.loading===false;status.textContent=!active&&state.loading===false?(state.emptyText||''):'';return;}
  const scene=scenes.find(x=>x!==active);pending=scene;scene.item=item;scene.candidate=0;setLogo(scene);source(scene);
  if(!active){spinner.hidden=false;status.textContent='';}
 }
 function commit(){
  if(!pending?.ready||switching)return;
  const incoming=pending,outgoing=active;pending=null;active=incoming;switching=true;played.add(incoming.item.id);
  if(outgoing){outgoing.audio.pause();outgoing.video.muted=true;}
  sound(incoming);incoming.video.currentTime=0;incoming.video.play().catch(()=>{retry(incoming);});
  // Keep the previous frame until Chromium reports a decoded, playing video.
  incoming.onVisible=()=>{
   spinner.hidden=true;incoming.root.style.zIndex='2';if(outgoing)outgoing.root.style.zIndex='1';incoming.root.classList.add('visible');
   fadeTimer=setTimeout(()=>{if(outgoing)release(outgoing);switching=false;prepare();},950);
  };
 }
 for(const scene of scenes){
  scene.video.addEventListener('loadeddata',()=>{scene.ready=true;scene.deadline=0;if(scene===active){scene.video.play().catch(()=>retry(scene));}else if(!active||active.video.ended)commit();});
  scene.video.addEventListener('playing',()=>{
   scene.deadline=0;scene.progress=Date.now();
   if(scene===active){scene.onVisible?.();scene.onVisible=null;if(scene.item?.audioUrl){scene.audio.currentTime=scene.video.currentTime;scene.audio.play().catch(()=>{});}}
  });
  scene.video.addEventListener('pause',()=>scene.audio.pause());
  scene.video.addEventListener('timeupdate',()=>{if(scene===active&&pending?.ready&&!switching&&Number.isFinite(scene.video.duration)&&scene.video.duration-scene.video.currentTime<=.9)commit();});
  scene.video.addEventListener('ended',()=>{
   if(scene!==active)return;
   if(pending?.ready)commit();else if(!pending){const alternatives=(state.items||[]).filter(x=>x.id!==scene.item.id&&!failed.has(x.id));if(!alternatives.length){scene.video.currentTime=0;scene.video.play().catch(()=>{});}else prepare();}
   if(pending&&!pending.ready)spinner.hidden=false;
  });
  scene.video.addEventListener('error',()=>{if(!scene.item)return;retry(scene);});
 }
 function updateHeader(){
  const h=state.header;if(h){Object.assign(document.querySelector('header').style,h.style);Object.assign(element('date').style,h.dateStyle);Object.assign(element('weather').style,h.weatherStyle);Object.assign(element('weather-icon').style,h.iconStyle);}
  element('weather-icon').textContent=state.weatherIcon||'';element('weather-temp').textContent=state.weatherTemp||'';
  const now=new Date(),locale=state.locale||navigator.language;
  try{element('clock').textContent=state.clockText||now.toLocaleTimeString(locale,{hour:'2-digit',minute:'2-digit'});element('date').textContent=state.dateText||new Intl.DateTimeFormat(locale,{weekday:'long',day:'numeric',month:'long'}).formatToParts(now).map(p=>['weekday','month'].includes(p.type)?p.value.charAt(0).toLocaleUpperCase(locale)+p.value.slice(1):p.value).join('');}catch{}
 }
 window.__trailerHeroScreensaver={
  update(value){state={...state,...value};lastSync=Date.now();stopped=false;if(active&&!state.items.some(x=>x.id===active.item.id))stop();if(pending&&!state.items.some(x=>x.id===pending.item.id)){release(pending);pending=null;}scenes.forEach(sound);updateHeader();prepare();return this.snapshot();},
  snapshot(){return {appId:active?.item?.id||0,playing:Boolean(active&&!active.video.paused),time:active?.video.currentTime||0,muted:state.muted!==false,items:state.items.length,failed:[...failed],width:active?.video.videoWidth||0,height:active?.video.videoHeight||0,pending:pending?.item?.id||0,logo:Boolean(active?.logo.naturalWidth),switching};},stop
 };
 function tick(){
  updateHeader();if(Date.now()-lastSync>30000){stopped=true;stop();return;}
  for(const scene of scenes){
   if(!scene.item)continue;
   if(scene===active&&scene.video.currentTime!==scene.lastTime){scene.lastTime=scene.video.currentTime;scene.progress=Date.now();}
   if(scene.deadline&&Date.now()>scene.deadline){scene.candidate++;source(scene);}
   else if(scene===active&&!scene.video.ended&&Date.now()-scene.progress>20000){scene.candidate++;source(scene);}
   if(scene===active&&scene.item.audioUrl&&!scene.audio.paused&&Math.abs(scene.audio.currentTime-scene.video.currentTime)>.4)scene.audio.currentTime=scene.video.currentTime;
  }
 }
 updateHeader();setInterval(tick,1000);window.addEventListener('pagehide',()=>{stopped=true;stop();});
})();
