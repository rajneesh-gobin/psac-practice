'use strict';
// Exercises the error-boundary state machine in engine/protect.js against a
// minimal DOM stub with controllable timers. Tests the decision logic (which is
// what I got wrong the first time), not the rendering.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const SRC = fs.readFileSync(path.join(ROOT, 'engine/protect.js'), 'utf8').replace(/^﻿/, '');

function makeEl(tag) {
  return {
    tagName: (tag || 'div').toUpperCase(),
    id: '', style: { cssText: '', opacity: '' }, children: [],
    innerHTML: '', onclick: null,
    setAttribute() {}, appendChild(c) { this.children.push(c); },
  };
}

function newWorld() {
  const timers = [];
  const listeners = {};
  const byId = {};

  const body = makeEl('body');
  body.style.opacity = '0';                       // the inline style index.html ships

  const document = {
    body,
    addEventListener() {},
    createElement: makeEl,
    getElementById: id => byId[id] || null,
  };
  // Anything appended is discoverable by id, like a real DOM.
  const origAppend = body.appendChild.bind(body);
  body.appendChild = el => { if (el.id) byId[el.id] = el; collectIds(el); origAppend(el); };
  function collectIds(el) {
    // showPanel() builds its buttons via innerHTML, so mine the ids out of it.
    const m = String(el.innerHTML).match(/id="([^"]+)"/g) || [];
    m.forEach(s => { const id = s.slice(4, -1); byId[id] = byId[id] || makeEl('button'); });
  }

  const window = {
    document,
    console: { warn() {}, log() {} },
    addEventListener(type, fn) { (listeners[type] = listeners[type] || []).push(fn); },
    navigator: {},
    caches: undefined,
    location: { pathname: '/', reload() {}, replace() {} },
    setTimeout(fn, ms) { timers.push({ fn, at: ms }); return timers.length; },
    clearTimeout() {},
    Promise,
    Date,
    RegExp,
  };
  window.window = window;

  const ctx = vm.createContext(window);
  ctx.document = document;
  ctx.navigator = window.navigator;
  ctx.location = window.location;
  ctx.setTimeout = window.setTimeout;

  vm.runInContext(SRC, ctx);

  return {
    body, byId, ctx,
    fire(type, ev) { (listeners[type] || []).forEach(fn => fn(ev)); },
    advance(ms) {
      const due = timers.filter(t => t.at <= ms);
      due.forEach(t => { t.done || (t.done = true, t.fn()); });
    },
    panel: () => byId['psac-fatal'] || null,
    opacity: () => body.style.opacity,
  };
}

let pass = 0, fail = 0;
function check(name, cond, extra) {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra ? '  -> ' + extra : '')); }
}

console.log('\nA. fatal error, app never starts  => reveal + panel');
{
  const w = newWorld();
  w.fire('error', { message: 'CHAPTERS is not defined', filename: 'app.js', lineno: 12 });
  check('revealed immediately', w.opacity() === '0.999', 'opacity=' + w.opacity());
  check('no panel yet', w.panel() === null);
  w.advance(10000);
  check('panel shown after grace', w.panel() !== null);
  check('panel forces full opacity', w.opacity() === '1', 'opacity=' + w.opacity());
  check('error recorded', !!w.ctx.__psacLastError && /CHAPTERS/.test(w.ctx.__psacLastError.message));
}

console.log('\nB. stray async error, app DOES start => no panel  (the false-positive case)');
{
  const w = newWorld();
  w.fire('error', { message: 'confetti frame failed' });
  w.body.style.opacity = '1';            // auth.js completes normally
  w.advance(10000);
  check('no panel over a working app', w.panel() === null);
  check('opacity untouched by boundary', w.opacity() === '1', 'opacity=' + w.opacity());
}

console.log('\nC. no error at all, just slow => failsafe reveal, still no panel');
{
  const w = newWorld();
  w.advance(8000);
  check('revealed by failsafe', w.opacity() === '0.999', 'opacity=' + w.opacity());
  w.advance(20000);
  check('no panel without evidence of a fault', w.panel() === null);
}

console.log('\nD. late reveal AFTER the failsafe fired => still recognised as alive');
{
  const w = newWorld();
  w.fire('error', { message: 'slow boot hiccup' });
  w.advance(8000);                        // failsafe reveals to 0.999
  w.body.style.opacity = '1';             // auth.js finishes at 9s
  w.advance(10000);
  check('sentinel let auth.js still win', w.panel() === null);
}

console.log('\nE. routine <img> 404 in a question => boundary ignores it entirely');
{
  const w = newWorld();
  w.fire('error', { target: { tagName: 'IMG', src: 'https://upload.wikimedia.org/x.png' } });
  check('not recorded', !w.ctx.__psacLastError);
  check('page not touched', w.opacity() === '0', 'opacity=' + w.opacity());
  w.advance(10000);
  check('no panel', w.panel() === null);
}

console.log('\nF. a blocking <script> failing to arrive => treated as fatal');
{
  const w = newWorld();
  w.fire('error', { target: { tagName: 'SCRIPT', src: '/subjects/grade5-maths/_manifest.js' } });
  check('recorded', !!w.ctx.__psacLastError && /_manifest\.js/.test(w.ctx.__psacLastError.message));
  w.advance(10000);
  check('panel shown', w.panel() !== null);
}

console.log('\nG. unhandled promise rejection => same path as a throw');
{
  const w = newWorld();
  w.fire('unhandledrejection', { reason: new Error('supabase unreachable') });
  check('recorded', !!w.ctx.__psacLastError && /supabase/.test(w.ctx.__psacLastError.message));
  w.advance(10000);
  check('panel shown', w.panel() !== null);
}

console.log('\n' + (fail ? 'FAILED ' + fail + ' / ' + (pass + fail) : 'all ' + pass + ' checks passed'));
process.exit(fail ? 1 : 0);
