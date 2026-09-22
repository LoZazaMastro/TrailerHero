import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');
const optionalCode = source.slice(source.indexOf('const SCREENSAVER_ID = '), source.indexOf('var index = definePlugin('));
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};
const flush = async () => { for (let i = 0; i < 30; i++) await Promise.resolve(); };

function setup({ available = true, missingFinder = false, throwingFinder = false,
                 selected = 'TrailerHero', hydrated = true, active = true } = {}) {
  let time = 100000, nextTimer = 0, data = hydrated ? [{ strID: 'steam-gameslideshow', custom: 'preserved' }] : undefined;
  let modules = [], nativeReply = () => Promise.resolve({ Body: () => ({ active: () => active }) });
  let syncReply = () => Promise.resolve({ ok: true, active: true, snapshot: {} });
  let installReply = () => Promise.resolve({ ok: true });
  const intervals = new Map(), timers = new Map(), subscribers = new Set(), signals = [], warnings = [];
  const counts = { install: 0, sync: 0, cleanup: 0, scan: 0, queryWrites: 0, reports: 0 };
  const win = {
    appStore: { m_mapApps: new Map() },
    __trailerHeroRuntime: { cleanupVideo: () => counts.cleanup++, queueScan: () => counts.scan++ },
    dispatchEvent: event => signals.push(event.detail),
    CustomEvent: class { constructor(_type, { detail }) { this.detail = detail; } },
  };
  const doc = { defaultView: win, querySelector: () => null };
  let docs = [doc];
  const nativeSettings = { rV: { clientSettings: { screensaver_current_id: selected } },
    qt: (_key, value) => { nativeSettings.rV.clientSettings.screensaver_current_id = value; } };
  const service = { GetActiveState: () => nativeReply(), ForceScreensaver() {} };
  const notify = () => { for (const listener of [...subscribers]) listener({ query: { queryKey: ['settings', 'getscreensavers'] } }); };
  const client = {
    getQueryData: () => data,
    setQueryData(_key, value) { counts.queryWrites++; data = value; notify(); },
    invalidateQueries: () => Promise.resolve(),
    getQueryCache: () => ({ subscribe(listener) { subscribers.add(listener); return () => subscribers.delete(listener); } }),
  };
  const moduleSet = () => [nativeSettings, { renamedService: service }, { query: client }];
  if (available) modules = moduleSet();
  const DFL = missingFinder ? {} : { findModule(predicate) {
    if (throwingFinder) throw new Error('Module registry not ready');
    return modules.find(predicate);
  } };
  class Clock extends Date { static now() { return time; } }
  const context = vm.createContext({
    DFL, window: win, document: doc, Date: Clock, URL, Uint8Array,
    console: { warn: (...args) => warnings.push(args), debug() {} },
    setInterval(fn) { const id = ++nextTimer; intervals.set(id, fn); return id; },
    clearInterval(id) { intervals.delete(id); },
    setTimeout(fn, delay) { const id = ++nextTimer; timers.set(id, { fn, at: time + delay }); return id; },
    clearTimeout(id) { timers.delete(id); },
    trailerHeroRouteDocuments: () => docs,
    installScreensaver() { counts.install++; return installReply(); },
    syncScreensaver(state) { counts.sync++; return syncReply(state); },
    cacheScreensaverAsset: async () => ({ ok: true }),
    reportFrontendError: async () => { counts.reports++; },
    fetch: async () => ({ ok: false }), detectLocale: () => 'en',
    controller: { settings: { blockedApps: [], preferredSources: {}, steamAppOverrides: {},
      steamMovieOverrides: {}, youtubeVideos: {}, screensaverAudio: false } },
  });
  vm.runInContext(optionalCode, context);
  return {
    context, win, doc, counts, nativeSettings, service, client, intervals, timers, subscribers, signals, warnings,
    start: () => context.installTrailerHeroScreensaver(),
    tick: async () => { for (const fn of [...intervals.values()]) await fn(); await flush(); },
    async advance(ms) {
      time += ms;
      for (const [id, timer] of [...timers]) {
        if (timer.at <= time) { timers.delete(id); timer.fn(); }
      }
      await flush();
    },
    modules(value) { modules = value ?? moduleSet(); },
    nativeReply(fn) { nativeReply = fn; }, syncReply(fn) { syncReply = fn; }, installReply(fn) { installReply = fn; },
    documents(value) { docs = value; }, data: () => data,
    hydrate(value) { data = value; notify(); },
  };
}

for (const mode of [{ available: false }, { missingFinder: true }, { throwingFinder: true }]) {
  test(`Missing optional Steam APIs do not throw or install a screensaver: ${JSON.stringify(mode)}`, async () => {
    const h = setup(mode);
    h.win.__trailerHeroScreensaverActive = true; // stale 1.7.0 state
    const stop = h.start();
    await flush(); await h.tick();
    assert.equal(typeof stop, 'function');
    assert.equal(h.win.__trailerHeroScreensaverActive, false);
    assert.equal(h.counts.install, 0);
    stop();
    assert.equal(h.intervals.size, 0);
  });
}

test('Late-loaded native modules are discovered; an unused VI export is not required', async () => {
  const h = setup({ available: false });
  const stop = h.start(); await flush();
  assert.equal(h.counts.install, 0);
  h.modules(); await h.tick();
  assert.equal(h.counts.install, 1);
  assert.equal(h.win.__trailerHeroScreensaverActive, true);
  assert.equal(h.win.__trailerHeroScreensaverExpiresAt, 108000);
  stop();
});

test('Throwing exports are skipped without rejecting other valid exports', async () => {
  const h = setup({ available: false });
  const broken = {}; Object.defineProperty(broken, 'rV', { enumerable: true, get() { throw new Error('lazy export'); } });
  const mixed = { working: h.service }; Object.defineProperty(mixed, 'bad', { enumerable: true, get() { throw new Error('bad export'); } });
  h.modules([broken, h.nativeSettings, mixed, { query: h.client }]);
  const stop = h.start(); await flush();
  assert.equal(h.win.__trailerHeroScreensaverActive, true);
  assert.equal(h.counts.sync, 1);
  stop();
});

test('Native active-state failure clears playback suppression and can recover', async () => {
  const h = setup(); const stop = h.start(); await flush();
  assert.equal(h.win.__trailerHeroScreensaverActive, true);
  h.nativeReply(() => Promise.reject(new Error('native API disconnected')));
  await h.tick();
  assert.equal(h.win.__trailerHeroScreensaverActive, false);
  assert.equal(h.win.__trailerHeroScreensaverExpiresAt, 0);
  assert.ok(h.counts.scan > 0);
  assert.equal(h.signals.at(-1).active, false);
  h.nativeReply(async () => ({ Body: () => ({ active: () => true }) }));
  await h.tick();
  assert.equal(h.win.__trailerHeroScreensaverActive, true);
  stop();
});

test('A hung active-state request times out and a late reply cannot suppress playback again', async () => {
  const h = setup(); const stop = h.start(); await flush();
  const reply = deferred(); h.nativeReply(() => reply.promise);
  const pending = h.tick(); await flush(); await h.advance(3001); await pending;
  assert.equal(h.win.__trailerHeroScreensaverActive, false);
  reply.resolve({ Body: () => ({ active: () => true }) }); await flush();
  assert.equal(h.win.__trailerHeroScreensaverActive, false);
  stop();
});

for (const failure of ['reject', 'hang', 'no-browser']) {
  test(`Screensaver media-bridge ${failure} does not leave game-page playback disabled`, async () => {
    const h = setup(); const stop = h.start(); await flush();
    h.syncReply(failure === 'reject' ? () => Promise.reject(new Error('backend restart')) :
      failure === 'hang' ? () => new Promise(() => {}) : async () => ({ ok: true, active: false }));
    const pending = h.tick(); await flush();
    if (failure === 'hang') await h.advance(4001);
    await pending;
    assert.equal(h.win.__trailerHeroScreensaverActive, false);
    assert.equal(h.win.__trailerHeroScreensaverExpiresAt, 0);
    stop();
  });
}

test('Unload during native lookup ignores its late active reply and releases all windows', async () => {
  const h = setup(); const stop = h.start(); await flush();
  const reply = deferred(); h.nativeReply(() => reply.promise);
  const pending = h.tick(); await flush();
  h.documents([]); // popup no longer discoverable, but it was previously touched
  stop();
  assert.equal(h.win.__trailerHeroScreensaverActive, false);
  assert.equal(h.subscribers.size, 0);
  reply.resolve({ Body: () => ({ active: () => true }) }); await pending;
  assert.equal(h.win.__trailerHeroScreensaverActive, false);
  assert.equal(h.intervals.size, 0);
});

test('Native dismissal and unsupported active-state responses release the game page', async () => {
  const h = setup(); const stop = h.start(); await flush();
  h.nativeReply(async () => ({ changedResponse: true })); await h.tick();
  assert.equal(h.win.__trailerHeroScreensaverActive, false);
  h.nativeReply(async () => ({ active: true })); await h.tick();
  assert.equal(h.win.__trailerHeroScreensaverActive, true);
  h.nativeSettings.rV.clientSettings.screensaver_current_id = 'steam-gameslideshow';
  await h.tick();
  assert.equal(h.win.__trailerHeroScreensaverActive, false);
  stop();
});

test('The native ID works even on a Steam build without a writable label setting', async () => {
  const h = setup({ selected: 'uioverride-trailerhero' });
  delete h.nativeSettings.qt;
  const stop = h.start(); await flush();
  assert.equal(h.win.__trailerHeroScreensaverActive, true);
  assert.equal(h.nativeSettings.rV.clientSettings.screensaver_current_id, 'uioverride-trailerhero');
  stop();
});

test('Registration preserves unhydrated query data and never duplicates native modes', async () => {
  const h = setup({ hydrated: false, selected: 'steam-gameslideshow' });
  const stop = h.start(); await flush();
  assert.equal(h.data(), undefined);
  assert.equal(h.counts.queryWrites, 0);
  h.hydrate([{ strID: 'native-mode', extra: 'keep' }, { strID: 'uioverride-trailerhero', strURL: 'own' }]);
  await flush();
  assert.equal(h.data().length, 2);
  assert.equal(h.data()[0].extra, 'keep');
  assert.equal(h.data()[1].strID, 'TrailerHero');
  await h.tick();
  assert.equal(h.data().length, 2);
  stop();
  assert.equal(h.data()[1].strID, 'uioverride-trailerhero');
  assert.equal(h.subscribers.size, 0);
});

test('Failed optional installation is retried without interrupting core playback state', async () => {
  const h = setup({ selected: 'steam-gameslideshow' });
  h.installReply(() => Promise.reject(new Error('Steam directory unavailable')));
  const stop = h.start(); await flush();
  assert.equal(h.win.__trailerHeroScreensaverActive, false);
  assert.equal(h.counts.install, 1);
  await h.tick(); assert.equal(h.counts.install, 1);
  h.installReply(async () => ({ ok: true }));
  await h.advance(30001); await h.tick();
  assert.equal(h.counts.install, 2);
  stop();
});

test('Initializer and cleanup remain usable when optional enhancements throw', () => {
  let mounts = 0, unmounts = 0, routes = 0;
  const context = vm.createContext({
    definePlugin: fn => fn(), controller: { mount() { mounts++; }, unmount() { unmounts++; } },
    installTrailerHeroScreensaver() { throw new Error('unsupported Steam screensaver'); },
    installTrailerHeroContextMenu() { throw new Error('unsupported menu module'); },
    routerHook: { addRoute() { routes++; }, removeRoute() { routes--; } },
    TRAILERHERO_ROUTE: '/trailerhero/:appId', GameSettingsRoute() {},
    SP_JSX: { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    DFL: { staticClasses: { Title: 'Title' } }, FaFilm() {}, Content() {}, TrailerHeroSurfaceBoundary() {},
    console: { warn() {}, debug() {} }, tr: key => key,
  });
  const init = source.slice(source.indexOf('var index = definePlugin('), source.indexOf('export { index as default }'));
  vm.runInContext(init, context);
  assert.equal(mounts, 1);
  assert.ok(context.index.content);
  assert.equal(routes, 1);
  context.index.onDismount();
  assert.equal(unmounts, 1);
  assert.equal(routes, 0);
});

test('Runtime ignores expired and legacy screensaver flags, but respects a fresh native lease', async () => {
  const factory = source.slice(source.indexOf('function trailerHeroRuntimeFactory('), source.indexOf('function buildInstallScript('))
    .replace('const runtime = new Runtime(nextSettings);', 'return { Runtime }; const runtime = new Runtime(nextSettings);');
  const location = new URL('https://steamloopback.host/library/home');
  const win = { location, innerWidth: 1920, innerHeight: 1080 };
  const doc = { URL: location.href, hidden: false, documentElement: { lang: 'en' }, body: { innerText: '' },
    querySelector: () => null, querySelectorAll: () => [] };
  class Clock extends Date { static now() { return 100000; } }
  const context = vm.createContext({ window: win, document: doc, Date: Clock, navigator: {}, URL, console });
  const { Runtime } = vm.runInContext(`(${factory})({}, { en: new Proxy({}, { get: (_target, key) => String(key) }) })`, context);
  const runtime = new Runtime({ enabled: true });
  runtime.cleanupVideo = () => {}; runtime.updateAudioHint = () => {};
  for (const expires of [undefined, 99999, NaN, '108000']) {
    runtime.currentAppId = 570; win.__trailerHeroScreensaverActive = true;
    win.__trailerHeroScreensaverExpiresAt = expires;
    await runtime.scan();
    assert.equal(runtime.currentAppId, undefined, `Stale lease ${String(expires)} must not block normal scanning`);
  }
  runtime.currentAppId = 570; win.__trailerHeroScreensaverExpiresAt = 108000;
  await runtime.scan();
  assert.equal(runtime.currentAppId, 570);
});
