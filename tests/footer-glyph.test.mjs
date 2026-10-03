import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');
const actualFooter = JSON.parse(fs.readFileSync(new URL('./fixtures/steam-footer-positional.json', import.meta.url), 'utf8'));
const actualProps = JSON.parse(fs.readFileSync(new URL('./fixtures/steam-footer-positional-props.json', import.meta.url), 'utf8'));
const factory = source.slice(source.indexOf('function trailerHeroRuntimeFactory('), source.indexOf('function buildInstallScript('))
  .replace('const runtime = new Runtime(nextSettings);', 'return { Runtime, footerAudioGlyphSource, readNativeFooterButton }; const runtime = new Runtime(nextSettings);');

class Element {
  constructor(tag = 'div') { this.tagName = tag.toUpperCase(); this.children = []; this.style = {}; this.className = ''; this.id = ''; this.textContent = ''; this.writes = 0; }
  get src() { return this._src; }
  set src(value) { this._src = value; this.writes++; }
  getAttribute(name) { return name === 'src' ? this.src : name === 'style' ? this.style.cssText || '' : ''; }
  appendChild(child) { child.parentElement = this; this.children.push(child); }
  insertBefore(child, target) { child.parentElement = this; const index = this.children.indexOf(target); this.children.splice(index < 0 ? this.children.length : index, 0, child); }
  remove() { if (this.parentElement) this.parentElement.children.splice(this.parentElement.children.indexOf(this), 1); this.parentElement = null; }
  querySelectorAll(selector) { return this.children.flatMap(child => [...(child.tagName === selector.toUpperCase() ? [child] : []), ...child.querySelectorAll(selector)]); }
  querySelector(selector) { return this.querySelectorAll(selector)[0]; }
  closest(selector) { for (let node = this; node; node = node.parentElement) if (selector.split(',').some(part => part.trim() === '#' + node.id)) return node; return null; }
  cloneNode() { const clone = new Element(this.tagName); clone._src = this.src; clone.className = this.className; clone.style = { ...this.style }; clone.textContent = this.textContent; for (const child of this.children) clone.appendChild(child.cloneNode()); return clone; }
}
function capturedAction(text) {
  const row = actualFooter.find(item => item.text === text);
  const parts = row.parent.match(/^<div class="([^"]+)"><div class="([^"]+)"><img class="([^"]+)" src="([^"]+)"><\/div><div class="([^"]+)">([^<]+)<\/div><\/div>$/);
  assert.ok(parts, 'Captured native footer nesting changed');
  const action = new Element(); action.className = parts[1];
  const wrapper = new Element(); wrapper.className = parts[2];
  const image = new Element('img'); image.className = parts[3]; image.src = parts[4];
  const observed = actualProps.find(item => item.src === image.src).props;
  const chain = Array.from({ length: Math.max(...observed.map(item => item.depth)) + 1 }, () => ({ memoizedProps: {} }));
  observed.forEach(({ depth, ...props }) => chain[depth].memoizedProps = props);
  chain.forEach((fiber, index) => fiber.return = chain[index + 1]); image.__reactFiber$fixture = chain[0];
  const label = new Element(); label.className = parts[5]; label.textContent = parts[6];
  wrapper.appendChild(image); action.appendChild(wrapper); action.appendChild(label);
  return { action, wrapper, image, label };
}
function setup(glyph = '/steaminputglyphs/shared_button_a.svg', button = 0) {
  const footer = new Element(); const host = new Element(); host.id = 'Footer'; host.appendChild(footer);
  const action = new Element(); const image = new Element('img'); image.src = glyph;
  image.__reactFiber$fixture = { memoizedProps: { src: glyph }, return: { memoizedProps: { button } } };
  const label = new Element(); label.textContent = 'Play'; action.appendChild(image); action.appendChild(label); footer.appendChild(action);
  const find = (node, id) => node.id === id ? node : node.children.map(child => find(child, id)).find(Boolean);
  const document = { documentElement: { lang: 'en' }, querySelector: selector => selector === '#Footer > div' ? footer : null, getElementById: id => find(host, id) };
  const api = vm.runInNewContext(`(${factory})({}, { en: { waitingGamePage: "Waiting", trailerAudio: "Trailer audio", themeDeckAudio: "ThemeDeck audio" } })`,
    { window: { location: new URL("https://steamloopback.host/library/app/570") }, document, HTMLElement: Element, navigator: { language: 'en' }, URL, console });
  const runtime = new api.Runtime({ defaultAudio: 'themeDeck' }); runtime.currentVideo = { isConnected: true };
  return { ...api, runtime, footer, image, hint: () => find(host, 'trailerhero-audio-hint') };
}

for (const [name, input, output, button = 0] of [
  ['Xbox shared', 'shared_button_a.svg', 'shared_button_x.svg'],
  ['Xbox colored style', 'xb1_button_a.svg', 'xb1_button_x.svg'],
  ['Steam Controller family', 'sc_button_a.svg', 'sc_button_x.svg'],
  ['PlayStation monochrome', 'ps_button_x.svg', 'ps_button_square.svg'],
  ['PlayStation colored', 'ps_color_button_x.svg', 'ps_color_button_square.svg'],
  ['Nintendo reversed', 'shared_button_b.svg', 'shared_button_y.svg'],
  ['PlayStation reversed', 'ps_button_circle.svg', 'ps_button_triangle.svg'],
  ['Colored PlayStation reversed', 'ps_color_button_circle.svg', 'ps_color_button_triangle.svg'],
  ['Universal positional', 'shared_button_down.svg', 'shared_button_left.svg'],
  ['Universal positional reversed', 'shared_button_right.svg', 'shared_button_up.svg'],
  ['Actual Steam plural positional select', 'shared_buttons_s.svg', 'shared_buttons_w.svg'],
  ['Actual Steam plural positional back', 'shared_buttons_e.svg', 'shared_buttons_w.svg', 1],
  ['Actual Steam plural positional reversed select', 'shared_buttons_e.svg', 'shared_buttons_n.svg'],
  ['Actual Steam plural positional reversed back', 'shared_buttons_s.svg', 'shared_buttons_n.svg', 1],
  ['Back action', 'shared_button_b.svg', 'shared_button_x.svg', 1],
  ['Reversed back action', 'shared_button_a.svg', 'shared_button_y.svg', 1],
  ['Existing native X supports unknown future family', 'future_glyph.svg', 'future_glyph.svg', 2],
]) test(name, () => {
  const fixture = setup('/steaminputglyphs/' + input, button); fixture.runtime.updateAudioHint(true);
  assert.equal(fixture.hint().querySelector('img').src, '/steaminputglyphs/' + output);
  assert.equal(fixture.hint().querySelector('img').hidden, false);
});

test('Actual plural face actions replace the hidden Menu clone and retain native face styling', () => {
  const fixture = setup('/steaminputglyphs/xbox_button_logo.svg', 8);
  fixture.image.parentElement.remove();
  fixture.footer.appendChild(capturedAction('Menu').action);
  fixture.runtime.updateAudioHint(true);
  const hiddenMenu = fixture.hint();
  assert.equal(hiddenMenu.querySelector('img').hidden, true);
  const { action: select, wrapper, image } = capturedAction('Seleziona');
  fixture.footer.appendChild(select); fixture.footer.appendChild(capturedAction('Indietro').action);
  fixture.runtime.updateAudioHint(true);
  const hint = fixture.hint(); const glyph = hint.querySelector('img');
  assert.notEqual(hint, hiddenMenu);
  assert.equal(hint.className, select.className);
  assert.equal(glyph.src, '/steaminputglyphs/shared_buttons_w.svg');
  assert.equal(glyph.hidden, false);
  assert.equal(glyph.className, image.className);
  assert.equal(glyph.style.cssText, image.style.cssText);
  assert.equal(glyph.parentElement.className, wrapper.className);
  assert.equal(glyph.parentElement.style.cssText, wrapper.style.cssText);
  assert.equal(hint.children[1].textContent, 'Trailer audio');
  fixture.runtime.updateAudioHint(true);
  assert.equal(fixture.hint(), hint);
  image.className = 'native-face-glyph-colored'; wrapper.style.cssText = 'width: 30px;';
  fixture.runtime.updateAudioHint(true);
  assert.equal(fixture.hint().querySelector('img').className, image.className);
  assert.equal(fixture.hint().querySelector('img').parentElement.style.cssText, wrapper.style.cssText);
  assert.equal(fixture.footer.querySelectorAll('img').length, 4);
});

test('Actual plural family retains absolute source and selected style query', () => {
  const fixture = setup('https://steamloopback.host/steaminputglyphs/shared_buttons_s.svg?style=selected');
  fixture.runtime.updateAudioHint(true);
  assert.equal(fixture.hint().querySelector('img').src, 'https://steamloopback.host/steaminputglyphs/shared_buttons_w.svg?style=selected');
});

test('Retains full native URL and style query', () => {
  const fixture = setup('https://steamloopback.host/steaminputglyphs/ps_color_button_x.svg?style=selected');
  fixture.runtime.updateAudioHint(true);
  assert.equal(fixture.hint().querySelector('img').src, 'https://steamloopback.host/steaminputglyphs/ps_color_button_square.svg?style=selected');
});
test('Refreshes an existing hint immediately when native glyph style changes', () => {
  const fixture = setup(); fixture.runtime.updateAudioHint(true); const hint = fixture.hint();
  fixture.image.src = '/steaminputglyphs/ps_color_button_x.svg';
  assert.equal(fixture.runtime.shouldQueueScanForMutation({ target: fixture.image, type: 'attributes', attributeName: 'src' }), true);
  fixture.runtime.updateAudioHint(true);
  assert.equal(fixture.hint(), hint); assert.equal(hint.querySelector('img').src, '/steaminputglyphs/ps_color_button_square.svg');
});
test('Unknown native action keeps a text hint instead of claiming an Xbox glyph', () => {
  const fixture = setup('/steaminputglyphs/unknown.svg', undefined);
  delete fixture.image.__reactFiber$fixture;
  fixture.runtime.updateAudioHint(true);
  assert.equal(fixture.hint().querySelector('img').hidden, true);
  assert.equal(fixture.hint().querySelectorAll('div').find(node => !node.children.length).textContent, 'Trailer audio');
});
test('Unknown PlayStation face mapping is refused', () => {
  const fixture = setup('/steaminputglyphs/ps_button_triangle.svg', 0);
  assert.equal(fixture.footerAudioGlyphSource(fixture.image), undefined);
});
test('Repeated update is idempotent and hint mutations do not schedule scans', () => {
  const fixture = setup(); fixture.runtime.updateAudioHint(true); const glyph = fixture.hint().querySelector('img'); const writes = glyph.writes;
  fixture.runtime.updateAudioHint(true);
  assert.equal(glyph.writes, writes); assert.equal(fixture.footer.children.length, 2);
  assert.equal(fixture.runtime.shouldQueueScanForMutation({ target: glyph, type: 'attributes', attributeName: 'src' }), false);
});
test('Page exit or missing media removes the hint', () => {
  const fixture = setup(); fixture.runtime.updateAudioHint(true); fixture.runtime.updateAudioHint(false); assert.equal(fixture.hint(), undefined);
  fixture.runtime.updateAudioHint(true); fixture.runtime.currentVideo.isConnected = false; fixture.runtime.updateAudioHint(true); assert.equal(fixture.hint(), undefined);
});
test('Physical virtual gamepad action and repeat handling are unchanged', () => {
  const fixture = setup(); let toggles = 0; fixture.runtime.toggleTrailerAudio = () => { toggles++; return true; };
  fixture.runtime.handleGamepadButtonDown({ detail: { button: 2 } });
  fixture.runtime.handleGamepadButtonDown({ detail: { button: 3, is_repeat: true } });
  fixture.runtime.handleGamepadButtonDown({ detail: { button: 3 } });
  fixture.runtime.handleGamepadButtonDown({ detail: { button: 3 } });
  assert.equal(toggles, 1);
});
