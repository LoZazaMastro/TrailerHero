// Exercise the actual injected runtime with inert Steam events and a controlled clock.
// TRAILERHERO_SOURCE may select a previous source file for causal regression checks.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(process.env.TRAILERHERO_SOURCE || new URL('../src/index.js', import.meta.url), 'utf8');
const factory = source.slice(source.indexOf('function trailerHeroRuntimeFactory('), source.indexOf('function buildInstallScript('))
  .replace('const runtime = new Runtime(nextSettings);', 'return { Runtime }; const runtime = new Runtime(nextSettings);');

class Element {
  constructor(tag) {
    this.tagName = tag; this.listeners = new Map(); this.style = {}; this.dataset = {};
    this.children = []; this.isConnected = false; this.paused = true; this.plays = 0; this.loads = 0;
    this.classList = { add() {}, remove() {}, toggle() {} };
    this.contentWindow = { postMessage() {} };
  }
  addEventListener(name, callback) { this.listeners.set(name, callback); }
  emit(name) { this.listeners.get(name)?.(); }
  setAttribute(name, value) { this[name] = value; }
  getAttribute(name) { return this[name]; }
  closest() { return this; }
  getBoundingClientRect() { return { width: 140, height: 50, top: 0, bottom: 50 }; }
  removeAttribute(name) { delete this[name]; }
  insertBefore(child) { child.isConnected = true; this.children.push(child); }
  appendChild(child) { this.insertBefore(child); }
  remove() { this.isConnected = false; }
  pause() { this.paused = true; this.emit('pause'); }
  play() { this.paused = false; this.plays++; return Promise.resolve(); }
  load() { this.loads++; }
}

function fixture({ focused = true, hidden = false, native = true } = {}) {
  const callbacks = {}, registrations = [], intervals = new Map(), timeouts = new Map();
  let timerId = 0, now = 1000; let nativeRunning = false;
  const timer = (map, fn) => { const id = ++timerId; map.set(id, fn); return id; };
  const events = new Map(), nodes = [];
  const document = {
    hidden, focused, hasFocus() { return this.focused; }, documentElement: { lang: 'en' },
    createElement(tag) { const node = new Element(tag); nodes.push(node); return node; },
    getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; },
    addEventListener(name, cb) { events.set('document:' + name, cb); },
    removeEventListener(name) { events.delete('document:' + name); }, body: new Element('body'), head: new Element('head')
  };
  const subscribe = name => cb => {
    callbacks[name] = cb;
    const entry = { name, removed: 0, unregister() { this.removed++; } };
    registrations.push(entry); return entry;
  };
  const window = {
    location: new URL('https://steamloopback.host/library/app/570'),
    innerHeight: 1080,
    setTimeout: fn => timer(timeouts, fn),
    addEventListener(name, cb) { events.set('window:' + name, cb); },
    removeEventListener(name) { events.delete('window:' + name); },
    opener: native ? { SteamClient: {
      GameSessions: { RegisterForAppLifetimeNotifications: subscribe('lifetime') },
      System: { UI: { RegisterForFocusChangeEvents: subscribe('focus') } }
    } } : undefined
  };
  window.document = document; window.top = window;
  const store = { IsAnyAppRunning() { return nativeRunning; } };
  window.SteamUIStore = store;
  const main = { BrowserWindow: window, m_locationPathname: '/library/app/570', IsMainGamepadUIWindow: () => true, IsGamepadUIOverlayWindow: () => false, MenuStore: { GetOpenSideMenu: () => 0 }, m_ModalManager: { modals: [] } };
  window.Router = { WindowStore: { GamepadUIMainWindowInstance: main } };
  if (window.opener) { window.opener.SteamUIStore = store; window.opener.Router = window.Router; }
  store.WindowStore = window.Router.WindowStore;
  const { Runtime } = vm.runInNewContext(`(${factory})({}, {en:{waitingGamePage:'Waiting',loadingYouTubeTrailer:'Loading',stoppedForLaunch:'Stopped'}})`, {
    window, document, Date: class extends Date { static now() { return now; } }, navigator: { language: 'en' }, HTMLElement: Element, URL,
    URLSearchParams, console, MediaSource: class { static isTypeSupported() { return true; } constructor() { throw new Error('Cancelled request constructed a MediaSource'); } },
    setInterval: fn => timer(intervals, fn), clearInterval: id => intervals.delete(id),
    setTimeout: fn => timer(timeouts, fn), clearTimeout: id => timeouts.delete(id)
  });
  const runtime = new Runtime({ enabled: true, defaultAudio: 'theme', delaySeconds: 0, qualityHeight: 1080, trimStartOverrides: {}, trimEndOverrides: {} });
  let scans = 0;
  runtime.installStyle = () => {};
  runtime.observer = { disconnect() {} };
  runtime.scan = () => { scans++; };
  runtime.updateAudioHint = () => {};
  runtime.publishTrailerAudioActivity = () => {};
  runtime.seekPastIntro = () => {};
  runtime.applyLowResCrt = () => {};
  runtime.getDesiredMediaSignature = () => 'fixture';
  runtime.registerPlaybackVisibility();
  runtime.refreshPlaybackVisibility();
  runtime.startScanTimer();
  return { runtime, window, document, store, main, setRunning(value) { nativeRunning = value; }, advance(ms) { now += ms; for (const [id, cb] of [...timeouts]) { timeouts.delete(id); cb(); } }, nodes, callbacks, registrations, intervals, timeouts, events, scans: () => scans,
    flush() { for (const [id, cb] of [...timeouts]) { timeouts.delete(id); cb(); } },
    focus(exe = 'steam.exe', extra = {}) { callbacks.focus({ focusedApp: { appid: 413080, pid: 100, windowid: 400, strExeName: exe, ...extra } }); },
    video() { const host = new Element('host'); host.isConnected = true; runtime.attachVideo(host, 570, ['https://example.test/video.mp4'], runtime.requestToken); return runtime.currentVideo; }
  };
}


test('actual stale native lifetimes reconcile when original Main stays focused and Steam is idle', () => {
 const f=fixture();for(const id of [20900,23512,12760,20284,2012])f.callbacks.lifetime({nInstanceID:id,unAppID:0,bRunning:true});
 f.focus('',{appid:769,windowid:0});f.runtime.handleWindowFocus();
 assert.equal(f.runtime.playbackForeground,false,'do not replay during first transient idle observation');
 f.advance(1000);f.runtime.refreshPlaybackVisibility();f.flush();
 assert.equal(f.runtime.runningGameInstances.size,0,'confirmed idle Main may retire stale event history');
 assert.equal(f.runtime.playbackForeground,true);assert.equal(f.intervals.size,1);
});
for(const state of ['running','unknown','throws','foreign-focus','hidden','not-focused'])test('actual reconciliation retains pause for '+state,()=>{
 const f=fixture();f.callbacks.lifetime({nInstanceID:42,unAppID:0,bRunning:true});
 if(state==='running')f.setRunning(true);else if(state==='unknown')f.setRunning(undefined);else if(state==='throws')f.store.IsAnyAppRunning=()=>{throw Error('unavailable')};
 if(state==='foreign-focus')f.focus('game.exe');else f.focus('',{appid:769,windowid:0});
 if(state==='hidden')f.document.hidden=true;if(state==='not-focused')f.document.focused=false;
 f.runtime.handleWindowFocus();f.advance(1000);f.runtime.refreshPlaybackVisibility();f.flush();
 assert.equal(f.runtime.runningGameInstances.size,1);assert.equal(f.runtime.playbackForeground,false);assert.equal(f.intervals.size,0);
});
test('a new lifetime start during the idle grace cancels reconciliation',()=>{
 const f=fixture();f.callbacks.lifetime({nInstanceID:42,unAppID:0,bRunning:true});f.focus('',{appid:769,windowid:0});f.runtime.handleWindowFocus();
 f.setRunning(true);f.callbacks.lifetime({nInstanceID:43,unAppID:0,bRunning:true});f.advance(1000);f.runtime.refreshPlaybackVisibility();f.flush();
 assert.equal(f.runtime.runningGameInstances.size,2);assert.equal(f.runtime.playbackForeground,false);
});
test('destroyed runtime cannot recover playback from queued idle reconciliation',()=>{
 const f=fixture();f.callbacks.lifetime({nInstanceID:42,unAppID:0,bRunning:true});f.focus('',{appid:769,windowid:0});f.runtime.handleWindowFocus();f.runtime.destroy();f.advance(1000);f.runtime.refreshPlaybackVisibility();f.flush();
 assert.equal(f.runtime.playbackForeground,false);assert.equal(f.intervals.size,0);
});

for(const state of ['side-menu','modal','overlay','not-main','foreign-document','foreign-route','nonboolean-idle','missing-store'])test('exact Main proof rejects '+state,()=>{
 const f=fixture();f.callbacks.lifetime({nInstanceID:42,unAppID:0,bRunning:true});f.focus('',{appid:769,windowid:0});
 if(state==='side-menu')f.main.MenuStore.GetOpenSideMenu=()=>1;
 if(state==='modal')f.main.m_ModalManager.modals=[{}];
 if(state==='overlay')f.main.IsGamepadUIOverlayWindow=()=>true;
 if(state==='not-main')f.main.IsMainGamepadUIWindow=()=>false;
 if(state==='foreign-document')f.main.BrowserWindow={document:{}};
 if(state==='foreign-route')f.main.m_locationPathname='/overlay';
 if(state==='nonboolean-idle')f.setRunning(0);
 if(state==='missing-store'){f.window.SteamUIStore=undefined;f.window.opener.SteamUIStore=undefined}
 f.runtime.handleWindowFocus();f.advance(1000);f.runtime.refreshPlaybackVisibility();f.flush();
 assert.equal(f.runtime.runningGameInstances.size,1);assert.equal(f.runtime.playbackForeground,false);
});
test('replacing retained Main identity resets the original idle observation',()=>{
 const f=fixture();f.callbacks.lifetime({nInstanceID:42,unAppID:0,bRunning:true});f.focus('',{appid:769,windowid:0});f.runtime.handleWindowFocus();
 f.store.WindowStore.GamepadUIMainWindowInstance={...f.main};f.advance(1000);assert.equal(f.runtime.runningGameInstances.size,1);assert.equal(f.runtime.playbackForeground,false);
 f.advance(1000);f.runtime.refreshPlaybackVisibility();assert.equal(f.runtime.runningGameInstances.size,0);assert.equal(f.runtime.playbackForeground,true);
});
test('a still-active launch suppression window keeps native lifetime history',()=>{
 const f=fixture();f.callbacks.lifetime({nInstanceID:42,unAppID:0,bRunning:true});f.focus('',{appid:769,windowid:0});f.runtime.launchSuppressedUntil=5000;f.runtime.handleWindowFocus();f.advance(1000);f.runtime.refreshPlaybackVisibility();f.flush();assert.equal(f.runtime.runningGameInstances.size,1);assert.equal(f.runtime.playbackForeground,false);
});
