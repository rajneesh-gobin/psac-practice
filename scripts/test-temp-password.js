'use strict';
// generateTempPassword() from netlify/functions/admin-account-recovery.js.
//
// This password is read out over the phone or pasted into WhatsApp, and it is
// the ONLY thing standing between a stranger and a parent's account for as long
// as it lives. Two properties matter and neither is visible by looking:
//   • no character a person confuses with another (0/O, 1/l/I, 5/S, 8/B)
//   • no bias in the character distribution - `byte % 29` quietly favours the
//     first few symbols of the alphabet, and nobody would ever notice
//
// Extracted and run in a vm rather than requiring the module, which pulls in
// @supabase/supabase-js and expects Netlify's environment.
//
// Run: node scripts/test-temp-password.js
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const SRC = fs.readFileSync(path.join(ROOT, 'netlify/functions/admin-account-recovery.js'), 'utf8');
const block = SRC.match(/const TEMP_ALPHABET[\s\S]*?\n\}\n/);
if (!block) { console.error('could not extract generateTempPassword'); process.exit(1); }

const ctx = vm.createContext({ crypto: require('crypto') });
vm.runInContext(block[0] + ';globalThis.gen = generateTempPassword;'
  + 'globalThis.ALPHABET = TEMP_ALPHABET;', ctx);

let pass = 0, fail = 0;
function ck(name, ok, detail) {
  console.log((ok ? '  PASS  ' : '  FAIL  ') + name + (ok || !detail ? '' : '\n          ' + detail));
  ok ? pass++ : fail++;
}

const N = 20000;
const samples = [];
for (let i = 0; i < N; i++) samples.push(ctx.gen());

ck('every password matches xxxx-xxxx-xxxx',
  samples.every(s => /^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/.test(s)),
  'first bad: ' + samples.find(s => !/^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/.test(s)));

// ⚠ The property is about PAIRS, not about a list of banned characters. The
// first version of this asserted "s is absent" and failed the implementation
// for it - wrongly: s is only confusable with a 5, and 5 is not in the
// alphabet. What must hold is that no confusable pair has BOTH members present.
const CONFUSABLE = [
  ['0', 'o'], ['1', 'l'], ['1', 'i'], ['l', 'i'], ['5', 's'], ['8', 'b'],
  ['2', 'z'], ['6', 'b'], ['9', 'g'], ['9', 'q'], ['0', 'q'],
];
const bothPresent = CONFUSABLE.filter(([a, b]) =>
  ctx.ALPHABET.includes(a) && ctx.ALPHABET.includes(b));
ck('no confusable pair has both members in the alphabet',
  bothPresent.length === 0,
  'both present: ' + bothPresent.map(pr => pr.join('/')).join(', '));

ck('the alphabet is lower case and alphanumeric only, so case is never a question',
  /^[a-z0-9]+$/.test(ctx.ALPHABET), ctx.ALPHABET);

ck('no password contains a character outside the alphabet',
  samples.every(s => [...s.replace(/-/g, '')].every(c => ctx.ALPHABET.includes(c))));

ck('all ' + N + ' are distinct', new Set(samples).size === N,
  'collisions: ' + (N - new Set(samples).size));

// Rejection sampling means every symbol should appear about equally often.
// A modulo implementation over 256 bytes skews the first 256 % 29 = 24 symbols
// upward by ~12%, which this catches and an eyeball never would.
const counts = {};
for (const s of samples) for (const ch of s.replace(/-/g, '')) counts[ch] = (counts[ch] || 0) + 1;
const used = Object.keys(counts);
const expected = (N * 12) / ctx.ALPHABET.length;
const worst = used.reduce((m, c) => Math.max(m, Math.abs(counts[c] - expected) / expected), 0);
ck('character distribution is flat within 10% (no modulo bias)',
  worst < 0.10, 'worst deviation ' + (worst * 100).toFixed(1) + '%');
ck('every symbol in the alphabet actually occurs',
  used.length === ctx.ALPHABET.length,
  used.length + ' of ' + ctx.ALPHABET.length + ' seen');

// 29 symbols ^ 12 characters ~ 58 bits. Well past anything guessable in the
// hours between an admin reading it out and the parent changing it.
const bits = 12 * Math.log2(ctx.ALPHABET.length);
ck('at least 50 bits of entropy', bits >= 50, bits.toFixed(1) + ' bits');

console.log('');
console.log(pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
