import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('../screensaver/main.js',import.meta.url),'utf8');
function setup(){
 const e={};let tick,time=100000,fade;
 for(const id of ['scene0','scene1','video0','video1','audio0','audio1','logo0','logo1','name0','name1','status','weather','weather-icon','weather-temp','date','clock','loading'])e[id]={src:'',currentTime:0,paused:true,ended:false,style:{},classList:{add(){},remove(){}},listeners:{},addEventListener(name,fn){this.listeners[name]=fn;},play(){this.paused=false;return Promise.resolve();},pause(){this.paused=true;},load(){},removeAttribute(name){this[name]='';}};
 const win={addEventListener(name,fn){this[name]=fn;}};
 class FakeDate extends Date {static now(){return time;}}
 vm.runInNewContext(source,{document:{getElementById:id=>e[id]},window:win,navigator:{language:'it'},Date:FakeDate,Intl,Math:{...Math,random:()=>0,floor:Math.floor,abs:Math.abs},setInterval:fn=>tick=fn,setTimeout:fn=>{fade=fn;return 1},clearTimeout:()=>{fade=undefined}});
 return {e,api:win.__trailerHeroScreensaver,tick,advance:n=>time+=n,win,ready(i){e['video'+i].listeners.loadeddata();e['video'+i].listeners.playing();},finishFade(){fade?.();},end(i){e['video'+i].ended=true;e['video'+i].listeners.ended();}};
}
const item=(id,urls=['https://example.test/trailer.mp4'])=>({id,title:`Game ${id}`,urls,logos:['https://example.test/logo.png']});
test('Preloads another game and crossfades only after decoded playback begins',()=>{
 const h=setup(),{e,api}=h;api.update({items:[item(1),item(2)]});assert.equal(api.snapshot().playing,false);assert.equal(e.loading.hidden,false);
 h.ready(0);h.finishFade();assert.equal(api.snapshot().appId,1);assert.equal(api.snapshot().pending,2);assert.equal(e.video0.muted,true);
 e.video1.listeners.loadeddata();h.end(0);e.video1.listeners.playing();assert.equal(api.snapshot().appId,2);assert.equal(e.audio0.paused,true);h.finishFade();assert.equal(e.video0.src.includes('trailer'),true); // now preloading the next cycle
});
test('Audio toggles live, separate tracks never duplicate the video soundtrack',()=>{
 const h=setup(),{e,api}=h;api.update({items:[{...item(1),audioUrl:'https://example.test/audio.m4a'}],muted:false});h.ready(0);assert.equal(e.video0.muted,true);assert.equal(e.audio0.muted,false);assert.equal(e.audio0.paused,false);api.update({muted:true});assert.equal(e.audio0.muted,true);
});
test('Broken media tries alternatives then skips without an infinite loop',()=>{
 const h=setup(),{e,api}=h;api.update({items:[item(1,['a','b']),item(2)]});e.video0.listeners.error();assert.equal(e.video0.src,'b');e.video0.listeners.error();assert.equal(api.snapshot().pending,2);e.video0.listeners.error();assert.equal(api.snapshot().appId,0);assert.equal(api.snapshot().pending,0);
});
test('Stalled preload is skipped and loss of heartbeat stops both scenes',()=>{
 const h=setup(),{e,api}=h;api.update({items:[item(1),item(2)]});h.advance(21000);h.tick();assert.equal(api.snapshot().pending,2);h.advance(10000);h.tick();assert.equal(e.video0.paused,true);assert.equal(e.video1.paused,true);assert.equal(e.audio0.paused,true);
});
test('Native dismissal releases both media elements and future transitions',()=>{
 const h=setup(),{e,api}=h;api.update({items:[item(1),item(2)]});h.ready(0);h.finishFade();h.win.pagehide();h.finishFade();assert.equal(e.video0.src,'');assert.equal(e.video1.src,'');assert.equal(api.snapshot().appId,0);
});
test('Logo candidates are tried in order with a readable last resort',()=>{
 const {e,api}=setup();api.update({items:[{...item(1),logos:['first','second']}]});e.logo0.onerror();assert.equal(e.logo0.src,'second');e.logo0.onload();assert.equal(e.name0.hidden,true);e.logo0.onerror();assert.equal(e.name0.hidden,false);
});

test('An active stalled source retries without discarding the preloaded next game',()=>{
 const h=setup(),{e,api}=h;api.update({items:[item(1,['a','b']),item(2)]});h.ready(0);h.finishFade();e.video1.listeners.loadeddata();
 e.video0.listeners.error();assert.equal(e.video0.src,'b');assert.equal(api.snapshot().pending,2);e.video0.listeners.loadeddata();assert.equal(e.video0.paused,false);
 e.video0.listeners.error();e.video1.listeners.playing();assert.equal(api.snapshot().appId,2);assert.equal(api.snapshot().failed.includes(1),true);
});
test('Transition starts before the end and preserves the outgoing layer until the fade completes',()=>{
 const h=setup(),{e,api}=h;api.update({items:[item(1),item(2)]});h.ready(0);h.finishFade();e.video1.listeners.loadeddata();e.video0.duration=20;e.video0.currentTime=19.2;e.video0.listeners.timeupdate();e.video1.listeners.playing();
 assert.equal(api.snapshot().appId,2);assert.equal(e.scene1.style.zIndex,'2');assert.equal(e.scene0.style.zIndex,'1');
});
test('A title does not flash while a valid logo is loading',()=>{
 const {e,api}=setup();api.update({items:[item(1)]});assert.equal(e.name0.hidden,true);e.logo0.onload();assert.equal(e.name0.hidden,true);
});
