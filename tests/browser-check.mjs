import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const target = await fetch('http://127.0.0.1:9225/json/new?http://127.0.0.1:4173', { method: 'PUT' }).then(r => r.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let id = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener('message', ({data}) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text);
  if (message.id) { const p = pending.get(message.id); pending.delete(message.id); message.error ? p.reject(message.error) : p.resolve(message.result); }
});
function cdp(method, params = {}) { return new Promise((resolve, reject) => { const next = ++id; pending.set(next, {resolve,reject}); socket.send(JSON.stringify({id:next,method,params})); }); }
async function evaluate(expression) {
  const r = await cdp('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true});
  assert(!r.exceptionDetails, JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
await cdp('Runtime.enable');
await cdp('Page.enable');
await evaluate(`new Promise(resolve => { if (document.readyState === 'complete') resolve(); else window.addEventListener('load', resolve, {once:true}); })`);
assert.equal(await evaluate('document.title'), '이음로컬 — 순천, 이야기를 걷다');
assert(await evaluate('[...document.images].every(img => img.complete && img.naturalWidth > 0)'), 'Images must load');
assert(await evaluate(`[...document.querySelectorAll('a[href^="#"]')].every(a => a.hash === '' || document.querySelector(a.hash))`), 'All anchor links must resolve');
for (const width of [320,390,768,1440]) {
  await cdp('Emulation.setDeviceMetricsOverride', {width,height:1000,deviceScaleFactor:1,mobile:width<768});
  assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `Horizontal overflow at ${width}`);
}
await evaluate(`document.querySelector('[data-start]').click()`);
assert(await evaluate(`document.querySelector('#audio-dialog').open`));
assert(await evaluate(`document.querySelector('#audio-dialog').contains(document.activeElement)`), 'Dialog focus');
const textResults = await evaluate(`(() => {
 const out = {};
 for(const lang of ['en','ja','zh','ko']) {
   out[lang] = [];
   document.querySelector('#language').value = lang;
   for(let level=0;level<3;level++) {
     document.querySelector('input[name="level"][value="'+level+'"]').checked=true;
     document.querySelector('#preferences').dispatchEvent(new Event('change',{bubbles:true}));
     out[lang].push(document.querySelector('#sample-text').textContent);
     if(document.querySelector('#sample-text').lang !== lang) throw new Error('Wrong content language');
   }
 }
 return out;
})()`);
for (const texts of Object.values(textResults)) { assert.equal(new Set(texts).size,3); assert(texts.every(t=>t.length>40)); }
await evaluate(`document.querySelector('#audio-dialog [data-close]').click()`);
assert.equal(await evaluate(`document.querySelector('#audio-dialog').open`), false);
for (const theme of ['nature','culture','humanities']) {
 await evaluate(`document.querySelector('[data-theme="${theme}"]').click()`);
 assert(await evaluate(`document.querySelector('#theme-dialog').open && document.querySelector('#theme-title').textContent.length > 0`));
 await evaluate(`document.querySelector('#theme-dialog [data-close]').click()`);
}
await cdp('Emulation.setDeviceMetricsOverride', {width:390,height:844,deviceScaleFactor:1,mobile:true});
await evaluate(`document.querySelector('.menu-toggle').click()`);
assert.equal(await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')`),'true');
await evaluate(`document.querySelector('#mobile-nav a').click()`);
assert(await evaluate(`document.querySelector('#mobile-nav').hidden`));
await evaluate('window.scrollTo(0,0)');
let shot = await cdp('Page.captureScreenshot', {format:'png',captureBeyondViewport:false});
await writeFile('/tmp/ieum-mobile.png',Buffer.from(shot.data,'base64'));
await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await evaluate('window.scrollTo(0,0)');
const height = await evaluate('document.documentElement.scrollHeight');
shot = await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:1440,height,scale:1}});
await writeFile('/tmp/ieum-desktop.png',Buffer.from(shot.data,'base64'));
assert.deepEqual(exceptions,[]);
console.log('PASS: loaded assets and anchors; 4 viewport widths; 12 language/level combinations; modal focus/close; 3 theme dialogs; mobile menu; no JS exceptions.');
socket.close();
