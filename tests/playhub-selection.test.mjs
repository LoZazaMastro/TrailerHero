import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../src/index.js',import.meta.url),'utf8');
const code=source.slice(source.indexOf('function installPlayhubTrailerSelection('),source.indexOf('var index = definePlugin'));
function fixture(){const listeners=new Map();const replies=[];const target={CustomEvent:class{constructor(type,init){this.type=type;this.detail=init.detail;}},addEventListener(t,fn){listeners.set(t,fn)},removeEventListener(t){listeners.delete(t)},dispatchEvent(e){replies.push(e.detail)}};const runtime={settings:{youtubeVideos:{10:'old'},preferredSources:{10:'local'}},updateSettings(next){this.settings={...this.settings,...next};}};const context={};vm.createContext(context);vm.runInContext(code,context);const stop=context.installPlayhubTrailerSelection(target,runtime);return{runtime,replies,listeners,stop,send(data){listeners.get('playhub:select-streaming-trailer')({detail:data})}};}
test('selects through controller and preserves unrelated selections',()=>{const f=fixture();f.send({requestId:'r',appId:4000000000,videoId:'abcdefghijk'});assert.equal(f.runtime.settings.youtubeVideos[4000000000],'abcdefghijk');assert.equal(f.runtime.settings.youtubeVideos[10],'old');assert.equal(f.runtime.settings.preferredSources[4000000000],'youtube');assert.equal(f.replies[0].ok,true)});
test('invalid video cannot mutate settings',()=>{const f=fixture();f.send({requestId:'r',appId:123,videoId:'invalid'});assert.equal(f.replies[0].ok,false);assert.equal(f.runtime.settings.youtubeVideos[123],undefined)});
test('controller persistence failure never acknowledged successful',()=>{const f=fixture();f.runtime.updateSettings=()=>{throw Error('write')};f.send({requestId:'r',appId:123,videoId:'abcdefghijk'});assert.equal(f.replies[0].ok,false)});
test('unmount removes listener',()=>{const f=fixture();f.stop();assert.equal(f.listeners.size,0)});
