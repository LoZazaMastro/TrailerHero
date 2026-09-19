import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');
function section(start, end) {
  const a = source.indexOf(start), b = source.indexOf(end, a);
  assert.ok(a >= 0 && b > a, `Source section ${start}`);
  return source.slice(a, b);
}
const factory = section('function trailerHeroRuntimeFactory(', 'function buildInstallScript(')
  .replace('const runtime = new Runtime(nextSettings);', `return {
    getGameDetailsRouteAppId, extractAppIdFromText, detectLocationAppId,
    isProbablyGameDetailsPage, findHeroCandidate, coerceAppId
  }; const runtime = new Runtime(nextSettings);`);
class Element {
  constructor(appId, { width = 1600, height = 500, asset } = {}) {
    this.tagName = 'DIV'; this.className = 'hero';
    this.asset = asset || `url(https://cdn.example/steam/apps/${appId}/library_hero.jpg)`;
    this.rect = { width, height, top: 0, left: 0, bottom: height, right: width };
  }
  getAttribute(key) { return key === 'style' ? `background-image:${this.asset}` : ''; }
  getBoundingClientRect() { return this.rect; }
}
function runtime(route, heroes = [], { opener, text = '', settings = false } = {}) {
  const loc = new URL(route, 'https://steamloopback.host');
  const document = { URL: loc.href, body: { innerText: text }, documentElement: { lang: 'it' },
    querySelector: (selector) => selector === '.thGamePage' && settings ? {} : null,
    querySelectorAll: () => heroes,
  };
  const window = { location: loc, innerWidth: 1920, innerHeight: 1080 };
  if (opener) window.opener = { location: new URL(opener, 'https://steamloopback.host') };
  const context = vm.createContext({ window, document, HTMLElement: Element, HTMLImageElement: Element,
    getComputedStyle: el => ({ backgroundImage: el.asset }), navigator: {}, URL, console });
  return vm.runInContext(`(${factory})({}, { en: {} })`, context);
}

for (const [route, id] of [
  ['/routes/library/app/570', 570], ['/library/app/3456789012', 3456789012],
  ['/library/4294967295', 4294967295], ['/library/app/10/', 10],
  ['/routes/library/collection/Favorites/3456789012', 3456789012],
  ['/routes/library/collection/My%20Games/570?foo=1', 570],
  ['/library/app/570#details', 570],
]) {
  test(`Steam route ${route}`, () => {
    const h = runtime(route, [new Element(id)]);
    assert.equal(h.detectLocationAppId(), id);
    assert.equal(h.isProbablyGameDetailsPage(), true);
  });
}
for (const route of ['/library/home', '/routes/library/home', '/library/collections', '/library/collection/123',
  '/library/app/570/achievements', '/app/570/properties', '/trailerhero/570', '/downloads',
  '/store/app/570', '/library', '/library/app/4294967296', '/library/app/345678901200']) {
  test(`No playback on ${route}`, () => {
    assert.equal(runtime(route, [new Element(570)], { text: 'Play Achievements Activity' }).isProbablyGameDetailsPage(), false);
  });
}
test('No translated label requirement on a confirmed game page', () => {
  assert.equal(runtime('/library/app/570', [new Element(570)], { text: '게임 실행 업적' }).isProbablyGameDetailsPage(), true);
});
test('Opener Home rejects stale local game route', () => {
  assert.equal(runtime('/library/app/570', [new Element(570)], { opener: '/routes/library/home' }).isProbablyGameDetailsPage(), false);
});
test('Opener game route overrides stale local route', () => {
  const h = runtime('/library/app/570', [new Element(730)], { opener: '/routes/library/app/730' });
  assert.equal(h.detectLocationAppId(), 730);
  assert.equal(h.isProbablyGameDetailsPage(), true);
});
test('Never attach to the previous game hero', () => {
  const h = runtime('/library/app/730', [new Element(570)]);
  assert.equal(h.findHeroCandidate(), undefined);
  assert.equal(h.isProbablyGameDetailsPage(), false);
});
test('Current game wins even when stale hero scores higher', () => {
  const h = runtime('/library/app/730', [new Element(570), new Element(730, { width: 1200 })]);
  assert.equal(h.findHeroCandidate().appId, 730);
});
test('Settings surface always rejected', () => {
  assert.equal(runtime('/library/app/570', [new Element(570)], { settings: true }).isProbablyGameDetailsPage(), false);
});
test('Hashed assets and custom shortcut images retain uint32 IDs', () => {
  const h = runtime('/');
  assert.equal(h.extractAppIdFromText('https://cdn/steam/apps/570/abcdef.jpg'), 570);
  assert.equal(h.extractAppIdFromText('https://steamloopback.host/customimages/3456789012_hero.jpg'), 3456789012);
  assert.equal(h.extractAppIdFromText('steam://nav/games/details/3456789012'), 3456789012);
  assert.equal(h.extractAppIdFromText('https://cdn/steam/apps/9999999999/library_hero.jpg'), undefined);
});
test('Strict app IDs do not accept trailing text or booleans', () => {
  const h = runtime('/');
  for (const value of ['570bad', '1e3', -1, 0, 4294967296, true, null]) assert.equal(h.coerceAppId(value), undefined);
});

// Small React/Decky stand-ins test real menu patching code, not Steam itself.
function menuContext({ available = true } = {}) {
  let interval, original, menuModule;
  const element = (type, props, ...children) => ({ type, key: props?.key, props: { ...props,
    ...(children.length ? { children: children.length === 1 ? children[0] : children } : {}) } });
  const react = { isValidElement: node => Boolean(node?.type && node?.props), createElement: element,
    cloneElement: (node, props, ...children) => element(node.type, { ...node.props, ...props, key: node.key },
      ...(children.length ? children : [Object.hasOwn(props || {}, "children") ? props.children : node.props.children])) };
  const propertyItem = element('MenuItem', { onSelected: function () { navigator.AppProperties(570); } }, 'Properties');
  class NativeMenu {
    constructor(props = { overview: { appid: 570 } }) { this.props = props; }
    render() { return element('Menu', {}, [element('MenuItem', {}, 'Play'), element('Fragment', {}, [propertyItem])]); }
  }
  original = NativeMenu.prototype.render;
  function ContextWrapper() { return { navigator: 'provided-by-Steam' }; }
  menuModule = { marker: function () { return '().LibraryContextMenu'; }, ContextWrapper };
  const findTree = (node, predicate) => {
    if (predicate(node)) return node;
    for (const item of Array.isArray(node) ? node : [node?.props?.children].flat()) {
      if (item && item !== node) { const found = findTree(item, predicate); if (found) return found; }
    }
  };
  const dfl = { MenuItem: 'PluginItem', findModuleByExport: () => available ? menuModule : undefined,
    fakeRenderComponent: () => ({ type: NativeMenu }), findInReactTree: findTree,
    Navigation: { Navigate: () => {} } };
  const context = vm.createContext({ SP_REACT: react, DFL: dfl, console,
    window: { setInterval: f => { interval = f; return 1; }, clearInterval: () => { interval = undefined; } },
    TRAILERHERO_MENU_KEY: 'trailerhero-game-settings', captureTrailerHeroRouteSnapshot: () => {} });
  const code = section('function installMenuSectionFallback(', '// TrailerHero 1.5.1') + '\n' + section('function normalizeMenuAppId(', 'function getSteamAppName(') + '\n' +
    section('function extractContextAppId(', '// Native Steam custom screensaver.');
  vm.runInContext(code, context);
  return { context, NativeMenu, original, dfl, setAvailable: value => { available = value; },
    retry: () => interval?.(), hasRetry: () => Boolean(interval) };
}
test('Nested Steam context arrays resolve the current app', () => {
  const { context } = menuContext();
  assert.equal(context.extractContextAppId([{ props: { rgApps: [{ appid: 3456789012 }] } }]), 3456789012);
});
test('Current Steam context menu structure gains one entry and restores on unload', () => {
  const { context, NativeMenu, original } = menuContext();
  const patch = context.installTrailerHeroContextMenu();
  const result = new NativeMenu().render();
  const section = result.props.children[1].props.children;
  assert.equal(section.filter(x => x.key === 'trailerhero-game-settings').length, 1);
  assert.equal(section.at(-1).props.children, 'Properties');
  assert.equal(result.props.children.length, 2);
  patch.unpatch();
  assert.equal(NativeMenu.prototype.render, original);
});
test('Late-loaded menu module is retried and its timer removed', () => {
  const h = menuContext({ available: false });
  const patch = h.context.installTrailerHeroContextMenu();
  assert.equal(h.hasRetry(), true);
  h.setAvailable(true); h.retry();
  assert.equal(h.hasRetry(), false);
  assert.notEqual(h.NativeMenu.prototype.render, h.original);
  patch.unpatch();
  assert.equal(h.NativeMenu.prototype.render, h.original);
});
test('Menu retry is cancelled on unload', () => {
  const h = menuContext({ available: false });
  h.context.installTrailerHeroContextMenu().unpatch();
  assert.equal(h.hasRetry(), false);
});
test('Native menu survives an enhancement failure', () => {
  const h = menuContext();
  const patch = h.context.installTrailerHeroContextMenu();
  h.dfl.findInReactTree = () => { throw new Error('Simulated Steam change'); };
  assert.equal(new h.NativeMenu().render().type, 'Menu');
  patch.unpatch();
});

function controllerContext(reply) {
  let calls = 0, installs = 0, saves = 0;
  const settings = { settingsVersion: 13, preferredSources: { '3456789012': 'local' },
    youtubeEnabled: false, youtubeVideos: {}, youtubeQueries: {} };
  const context = vm.createContext({ console, setInterval, clearInterval, clearTimeout,
    window: { setTimeout, clearTimeout },
    tr: x => x, DEFAULT_TRIM_START_SECONDS: 4, DEFAULT_TRIM_END_SECONDS: 5,
    DEFAULT_SETTINGS: settings, parseSettings: () => structuredClone(settings),
    saveSettings: () => { saves++; },
    getLocalTrailer: () => { calls++; return typeof reply === 'function' ? reply() : Promise.resolve(reply); },
    normalizeMenuAppId: v => Number(v?.appid ?? v) || 0,
    buildInstallScript: () => { installs++; return 'install'; },
    RUNTIME_MISSING_SCRIPT: 'status', BACKEND_TIMEOUT_MS: 2000,
  });
  vm.runInContext(section('class TrailerHeroController {', 'const controller = new TrailerHeroController();') +
    '\nglobalThis.Controller = TrailerHeroController;', context);
  const controller = new context.Controller();
  controller.mounted = true;
  controller.runInSteamTab = async () => undefined;
  return { controller, counts: () => ({ calls, installs, saves }) };
}
test('Local assignments without old assigned field are preserved', async () => {
  const h = controllerContext({ ok: true, entries: [{ appid: 3456789012, videoUrl: 'http://127.0.0.1:1/video' }] });
  await h.controller.refreshLocalTrailers();
  assert.equal(h.controller.settings.preferredSources['3456789012'], 'local');
  assert.ok(h.controller.localTrailers['3456789012']);
});
test('Failed local library response does not erase saved preferences', async () => {
  const h = controllerContext({ ok: false, error: 'backend restarting' });
  await h.controller.refreshLocalTrailers();
  assert.equal(h.controller.settings.preferredSources['3456789012'], 'local');
  assert.equal(h.counts().saves, 0);
});
test('Backend restart refreshes local URLs in the injected runtime', async () => {
  const h = controllerContext({ ok: true, entries: [{ assigned: true, appid: 3456789012, videoUrl: 'http://127.0.0.1:222/new-token' }] });
  h.controller.localTrailers = { '3456789012': { assigned: true, appid: 3456789012, videoUrl: 'http://127.0.0.1:111/old-token' } };
  await h.controller.readRemoteStatus();
  assert.equal(h.controller.localTrailers['3456789012'].videoUrl, 'http://127.0.0.1:222/new-token');
  assert.equal(h.counts().installs, 1);
});
test('Unmount prevents late library completion from changing or reinstalling runtime', async () => {
  let resolve;
  const h = controllerContext(() => new Promise(r => { resolve = r; }));
  const pending = h.controller.refreshLocalTrailers();
  h.controller.unmount();
  resolve({ ok: true, entries: [] });
  await pending;
  await h.controller.installOrUpdate();
  assert.equal(h.controller.settings.preferredSources['3456789012'], 'local');
  assert.equal(h.counts().installs, 0);
});
test('Source and shipped bundle are synchronized', () => {
  assert.equal(fs.readFileSync(new URL('../dist/index.js', import.meta.url), 'utf8'), source);
});
