import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');
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
  let timerId = 0;
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
  const { Runtime } = vm.runInNewContext(`(${factory})({}, {en:{waitingGamePage:'Waiting',loadingYouTubeTrailer:'Loading',stoppedForLaunch:'Stopped'}})`, {
    window, document, navigator: { language: 'en' }, HTMLElement: Element, URL,
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
  return { runtime, window, document, nodes, callbacks, registrations, intervals, timeouts, events, scans: () => scans,
    flush() { for (const [id, cb] of [...timeouts]) { timeouts.delete(id); cb(); } },
    focus(exe = 'steam.exe', extra = {}) { callbacks.focus({ focusedApp: { appid: 413080, pid: 100, windowid: 400, strExeName: exe, ...extra } }); },
    video() { const host = new Element('host'); host.isConnected = true; runtime.attachVideo(host, 570, ['https://example.test/video.mp4'], runtime.requestToken); return runtime.currentVideo; }
  };
}

test('Foreground library retains the existing scan interval and subscribes once in the opener', () => {
  const f = fixture();
  assert.equal(f.runtime.playbackForeground, true);
  assert.equal(f.intervals.size, 1);
  assert.deepEqual(f.registrations.map(r => r.name), ['focus', 'lifetime']);
  f.focus('C:\\Program Files (x86)\\Steam\\steam.exe');
  assert.equal(f.intervals.size, 1);
});

test('Non-Steam lifetime app ID zero cancels video, audio, pending loads and idle scans', () => {
  const f = fixture(), video = f.video(); video.emit('canplay');
  const audio = new Element('audio'); audio.isConnected = true; audio.src = 'https://example.test/audio'; audio.play();
  f.runtime.currentAudio = audio;
  f.runtime.pendingAppId = 570; f.runtime.pendingRequestToken = f.runtime.requestToken;
  const token = f.runtime.requestToken;
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: true });
  assert.equal(f.runtime.requestToken, token + 1);
  assert.equal(f.runtime.pendingAppId, undefined);
  for (const media of [video, audio]) {
    assert.equal(media.paused, true); assert.equal(media.isConnected, false); assert.equal(media.src, undefined);
  }
  assert.equal(f.intervals.size, 0);
  f.runtime.queueScan(); f.flush(); assert.equal(f.scans(), 0);
});

test('Actual executable and PID/window identity govern focus, not configuration AppID', () => {
  const f = fixture();
  f.focus('Cuphead.exe', { appid: 0 }); assert.equal(f.runtime.playbackForeground, false);
  f.focus('steam.exe', { pid: 0 }); assert.equal(f.runtime.playbackForeground, false);
  f.focus('steam.exe', { windowid: 0 }); assert.equal(f.runtime.playbackForeground, false);
  f.focus('steam.exe', { appid: 413080 }); assert.equal(f.runtime.playbackForeground, true);
});

test('Game exit does not restart background playback while another application is foreground', () => {
  const f = fixture(); f.focus('game.exe');
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: false });
  f.callbacks.lifetime({ unAppID: 570, nInstanceID: 43, bRunning: false });
  assert.equal(f.runtime.playbackForeground, false); assert.equal(f.intervals.size, 0);
});

test('A Steam popup alone cannot restart the main library until its document gains focus', () => {
  const f = fixture(); f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: true });
  f.document.focused = false; f.focus('steamwebhelper.exe');
  assert.equal(f.runtime.playbackForeground, false);
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: false });
  f.document.focused = true; f.runtime.handleWindowFocus(); f.flush();
  assert.equal(f.runtime.playbackForeground, true); assert.equal(f.intervals.size, 1); assert.equal(f.scans(), 1);
});

test('Observed Steam library focus app769 with empty executable and window0 resumes after game exit', () => {
  const f = fixture();
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: true });
  f.focus('', { appid: 769, windowid: 0 });
  assert.equal(f.runtime.playbackForeground, false);
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: false });
  assert.equal(f.runtime.playbackForeground, true);
  assert.equal(f.intervals.size, 1);
});

test('Actual document focus after a game exit clears the stale native game hint', () => {
  const f = fixture(); f.document.focused = false;
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: true });
  f.focus('game.exe');
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: false });
  assert.equal(f.runtime.playbackForeground, false);
  f.document.focused = true; f.runtime.handleWindowFocus();
  assert.equal(f.runtime.playbackForeground, true);
});

test('Steam focus cannot resume while a second game lifetime remains active', () => {
  const f = fixture();
  for (const nInstanceID of [42,43]) f.callbacks.lifetime({ unAppID: 0, nInstanceID, bRunning: true });
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: false });
  f.focus('', { appid: 769, windowid: 0 }); f.runtime.handleWindowFocus();
  assert.equal(f.runtime.playbackForeground, false);
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 43, bRunning: false });
  assert.equal(f.runtime.playbackForeground, true);
});

for (const enabled of [true, false]) test(`Background resume preserves the user's ${enabled ? 'trailer' : 'theme'} audio choice`, () => {
  const f = fixture(); let video = f.video(); video.emit('canplay');
  f.runtime.setTrailerAudioEnabled(enabled);
  f.document.hidden = true; f.runtime.handleVisibilityChange();
  assert.equal(f.runtime.trailerAudioEnabled, false);
  f.focus('steam.exe'); assert.equal(f.intervals.size, 0);
  f.document.hidden = false; f.runtime.handleVisibilityChange();
  video = f.video(); video.emit('canplay');
  assert.equal(f.runtime.trailerAudioEnabled, enabled); assert.equal(video.muted, !enabled);
});

for (const enabled of [true, false]) test(`Real launch intent before native lifetime retains ${enabled ? 'trailer' : 'theme'} audio on return`, () => {
  const f = fixture(); let video = f.video(); video.emit('canplay');
  f.runtime.currentAppId = 570; f.runtime.settings.stopOnLaunchEnabled = true;
  f.runtime.setTrailerAudioEnabled(enabled);
  const playButton = new Element('button'); playButton.textContent = 'Gioca';
  f.runtime.handleLaunchIntent({ target: playButton });
  assert.equal(f.runtime.trailerAudioEnabled, false);
  assert.equal(f.runtime.resumeAudioEnabled, enabled);
  f.runtime.handleLaunchIntent({ target: playButton });
  f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: true });
  assert.equal(f.runtime.resumeAudioEnabled, enabled);
  f.focus('game.exe'); f.callbacks.lifetime({ unAppID: 0, nInstanceID: 42, bRunning: false });
  f.focus('steam.exe');
  video = f.video(); video.emit('canplay');
  assert.equal(f.runtime.trailerAudioEnabled, enabled); assert.equal(video.muted, !enabled);
});

test('Late video readiness and fallback errors cannot revive a cancelled background player', () => {
  const f = fixture(), video = f.video();
  f.focus('game.exe'); const plays = video.plays, loads = video.loads;
  video.emit('canplay'); video.emit('error'); f.flush();
  assert.equal(video.plays, plays); assert.equal(video.loads, loads); assert.equal(f.runtime.currentVideo, undefined);
});

test('YouTube is unloaded and its late load event schedules no quality work', () => {
  const f = fixture(), host = new Element('host'); host.isConnected = true;
  f.runtime.attachYouTube(host, 570, 'abcdefghijk', f.runtime.requestToken);
  const frame = f.runtime.currentFrame;
  f.focus('game.exe'); const timers = f.timeouts.size;
  assert.equal(frame.src, 'about:blank'); assert.equal(frame.isConnected, false);
  frame.emit('load'); assert.equal(f.timeouts.size, timers);
});

for (const method of ['playHls', 'playDash']) test(`Late ${method} manifest response cannot create a detached decoder or object URL`, async () => {
  const f = fixture(), video = f.video();
  let complete;
  f.runtime.fetchText = () => new Promise(resolve => { complete = resolve; });
  const pending = f.runtime[method](video, 'https://example.test/manifest', f.runtime.requestToken);
  f.focus('game.exe'); const loads = video.loads;
  complete('Cancelled manifest'); await pending;
  assert.equal(video.src, undefined); assert.equal(video.loads, loads); assert.equal(video.dataset.trailerheroObjectUrl, undefined);
});

test('An already background document starts without scan polling', () => {
  const f = fixture({ focused: false }); assert.equal(f.intervals.size, 0);
  assert.equal(f.runtime.playbackForeground, false);
});

test('Fallback DOM focus and visibility events work when native APIs are unavailable', () => {
  const f = fixture({ native: false });
  f.document.focused = false; f.runtime.handleWindowBlur(); assert.equal(f.intervals.size, 0);
  f.document.focused = true; f.runtime.handleWindowFocus(); assert.equal(f.intervals.size, 1);
});

test('Runtime destruction unregisters native callbacks and ignores queued stale events', () => {
  const f = fixture(); f.runtime.destroy();
  assert.deepEqual(f.registrations.map(r => r.removed), [1, 1]); assert.equal(f.intervals.size, 0);
  f.callbacks.lifetime({ bRunning: true }); f.focus(); f.runtime.handleWindowFocus(); f.flush();
  assert.equal(f.intervals.size, 0); assert.equal(f.scans(), 0);
});
