'use strict';
// Exercises selfHealOnce() in engine/protect.js — the recovery path for a
// CORRUPTED CACHED SCRIPT, which is not a boot failure and so is invisible to
// the fatal-error panel that test-error-boundary.js covers.
//
// The bug this exists for: a service worker cached the HTML shell under a .js
// URL (a 200, so it looked cacheable), served it ahead of the network for the
// life of the cache, and the page threw "Unexpected token '<'" at line 1 on
// every load. The app then booted perfectly well without that file — Auth.init()
// finished, opacity went to 1, appStarted() was true — so the panel was
// correctly suppressed and the child was told "No subjects available for Grade 5
// yet". The only way out was a console script, which cannot be handed to every
// family. Measured on a real laptop 2026-09-26.
//
// ⚠ THE ONCE-PER-SESSION GUARD IS THE WHOLE SAFETY ARGUMENT. This clears caches
//   and reloads; an error that survives the reset must not reload forever. Cases
//   B and F are the ones that matter — do not relax them.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const SRC = fs.readFileSync(path.join(ROOT, 'engine/protect.js'), 'utf8').replace(/^﻿/, '');

function newWorld(opts) {
  opts = opts || {};
  const listeners = {};
  const acted = { unregistered: 0, cachesDeleted: [], replaced: [] };

  const body = { tagName: 'BODY', style: { opacity: '0', cssText: '' }, children: [],
                 setAttribute() {}, appendChild() {} };
  const document = { body, addEventListener() {}, getElementById: () => null,
                     createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }) };

  const store = {};
  const sessionStorage = opts.noSessionStorage
    ? { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } }
    : { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } };

  const location = {
    pathname: '/', href: 'https://nouklass.com/', origin: 'https://nouklass.com',
    reload() {}, replace(u) { acted.replaced.push(u); },
  };

  const win = {
    document, sessionStorage, location, URL, Promise, Date, RegExp,
    console: { warn() {}, log() {} },
    addEventListener(type, fn) { (listeners[type] = listeners[type] || []).push(fn); },
    navigator: {
      serviceWorker: {
        getRegistrations: () => Promise.resolve([{ unregister() { acted.unregistered++; return Promise.resolve(); } }]),
      },
    },
    caches: {
      keys: () => Promise.resolve(['psac-shell-v408', 'psac-data-v14', 'psac-static-assets']),
      delete: k => { acted.cachesDeleted.push(k); return Promise.resolve(true); },
    },
    setTimeout() { return 0; },
    clearTimeout() {},
  };
  win.window = win;

  const ctx = vm.createContext(win);
  Object.assign(ctx, {
    document, navigator: win.navigator, location, sessionStorage,
    caches: win.caches, setTimeout: win.setTimeout, URL,
  });
  vm.runInContext(SRC, ctx);

  return {
    acted, ctx,
    fire(ev) { (listeners['error'] || []).forEach(fn => fn(ev)); },
    healed: () => acted.cachesDeleted.length > 0,
    recorded: () => ctx.__psacLastError || null,
  };
}

const settle = () => new Promise(r => setImmediate(() => setImmediate(r)));

let pass = 0, fail = 0;
function check(name, cond, extra) {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra ? '  -> ' + extra : '')); }
}

const POISONED = { message: "Uncaught SyntaxError: Unexpected token '<'",
                   filename: 'https://nouklass.com/subjects/_index.js', lineno: 1 };

(async () => {

console.log('\nA. a same-origin .js that parsed as HTML => clear every cache and reload');
{
  const w = newWorld();
  w.fire(POISONED);
  await settle();
  check('all three caches deleted', w.acted.cachesDeleted.length === 3,
        JSON.stringify(w.acted.cachesDeleted));
  check('the unversioned asset cache is one of them',
        w.acted.cachesDeleted.indexOf('psac-static-assets') !== -1);
  check('service worker unregistered', w.acted.unregistered === 1);
  check('reloaded with a cache-busting query', /\?_r=\d+/.test(w.acted.replaced[0] || ''),
        w.acted.replaced[0]);
  check('NOT recorded as a fatal error', w.recorded() === null);
}

console.log('\nB. the same error again in one session => must NOT heal twice  (loop guard)');
{
  const w = newWorld();
  w.fire(POISONED);
  await settle();
  const first = w.acted.cachesDeleted.length;
  w.acted.cachesDeleted.length = 0;
  w.fire(POISONED);
  await settle();
  check('first attempt healed', first === 3);
  check('second attempt did nothing', w.acted.cachesDeleted.length === 0,
        JSON.stringify(w.acted.cachesDeleted));
  check('second attempt falls through to the normal error path', w.recorded() !== null);
}

console.log('\nC. a cross-origin script => never our cache, never our reset');
{
  const w = newWorld();
  w.fire({ message: "Unexpected token '<'", filename: 'https://cdn.jsdelivr.net/x.js', lineno: 1 });
  await settle();
  check('no reset', !w.healed());
  check('still recorded', w.recorded() !== null);
}

console.log('\nD. an ordinary runtime error => untouched, this is the common case');
{
  const w = newWorld();
  w.fire({ message: 'CHAPTERS is not defined', filename: 'https://nouklass.com/engine/app.js', lineno: 12 });
  await settle();
  check('no reset', !w.healed());
  check('recorded as before', /CHAPTERS/.test((w.recorded() || {}).message || ''));
}

console.log('\nE. a syntax error in something that is not a script => no reset');
{
  const w = newWorld();
  w.fire({ message: "Unexpected token '<'", filename: 'https://nouklass.com/index.html', lineno: 1 });
  await settle();
  check('no reset', !w.healed());
}

console.log('\nF. sessionStorage unavailable => refuse to heal  (cannot prove it will not loop)');
{
  const w = newWorld({ noSessionStorage: true });
  w.fire(POISONED);
  await settle();
  check('no reset without a loop guard', !w.healed());
  check('still recorded so the child is not left with nothing', w.recorded() !== null);
}

console.log('\nG. .mjs is a script too  (/\\.js$/ does not match "x.mjs")');
{
  const w = newWorld();
  w.fire({ message: "Unexpected token '<'",
           filename: 'https://nouklass.com/assets/vendor/qrcode-1.5.3.mjs', lineno: 1 });
  await settle();
  check('healed', w.healed());
}

console.log('');
if (fail) { console.log(fail + ' of ' + (pass + fail) + ' checks FAILED\n'); process.exit(1); }
console.log('all ' + pass + ' checks passed\n');

})();
