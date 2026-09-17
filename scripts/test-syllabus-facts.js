'use strict';
// Does the pack actually ASK the things its source document teaches?
//
// WHY THIS EXISTS
// Every other content harness in this repo counts questions. audit-content-coverage
// flags a subsection under 20 items; test-live-pack-content asks whether each
// declared chapter has any questions and whether the pack holds 40; test-exam-paper-shape
// asks whether a whole paper can be dealt. All of them are green on a pack that
// never mentions the water cycle, because none of them holds a list of what
// SHOULD be asked.
//
// Measured on grade5-history, 2026-09-17, against the Grade 5 revision notes:
// 664 questions, every subsection above its minimum, every harness green — and
// 68 facts from the notes with ZERO questions behind them, plus 36 more with one
// or two. The whole of the water cycle, cyclonic rain, the leeward side, the
// prevailing winds, every part of climate change, and Port Mathurin — the capital
// of Rodrigues — appeared in no question at all. The gaps clustered in the SECOND
// HALF of each unit: each topic was opened properly and then the quota was met.
//
// ⚠ IT READS THE QUESTION STEM AND ANSWER ONLY, NEVER THE EXPLANATION.
//   That distinction is the whole harness. A fact named inside an explanation
//   looks covered to anyone grepping and is a fact the child is never ASKED.
//   The first pass over grade5-history missed ~20 gaps for exactly this reason:
//   they were sitting in explanations the earlier batch had written.
//
// ⚠ IT READS SOURCE, NOT THE BUILT BUNDLES, for the same reason
//   test-live-pack-content does: the question is whether the content has been
//   WRITTEN, and that answer must not depend on whether someone rebuilt.
//
// A ledger is added per pack under scripts/fact-ledgers/<pack>.json. A pack with
// no ledger is skipped and SAID to be skipped — silence would make an absent
// ledger look like a pass.
//
//   node scripts/test-syllabus-facts.js                  — every ledger
//   node scripts/test-syllabus-facts.js grade5-history   — one pack

const fs = require('fs');
const path = require('path');
const { loadPack, listPacks } = require('../netlify/lib/questions-sandbox.js');

const ROOT    = path.join(__dirname, '..');
const LEDGERS = path.join(__dirname, 'fact-ledgers');

// ⚠ The corpus is authored with HTML entities (R&eacute;union, &Icirc;le) AND
//   with real accented characters, in the same pack and sometimes in the same
//   question. A ledger term written one way would silently miss the other, and
//   a fact wrongly reported as missing is how a harness gets ignored. Both forms
//   fold to unaccented ASCII here.
const ENTITIES = {
  '&eacute;': 'e', '&egrave;': 'e', '&ecirc;': 'e', '&euml;': 'e',
  '&agrave;': 'a', '&acirc;': 'a', '&ccedil;': 'c', '&ugrave;': 'u',
  '&ucirc;': 'u', '&icirc;': 'i', '&iuml;': 'i', '&ocirc;': 'o',
  '&Icirc;': 'I', '&Eacute;': 'E', '&Agrave;': 'A',
  '&nbsp;': ' ', '&amp;': '&', '&rarr;': ' ', '&deg;': ' ', '&frac12;': ' 1/2 ',
};

function normalise(s) {
  let t = String(s == null ? '' : s);
  t = t.replace(/<[^>]+>/g, ' ');
  t = t.replace(/&[a-zA-Z]+;/g, m => (m in ENTITIES ? ENTITIES[m] : ' '));
  t = t.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return t.toLowerCase().replace(/\s+/g, ' ').trim();
}

// ⚠ STEM AND ANSWER ONLY. See the header — this is the point of the file.
function askable(q) {
  const ans = Array.isArray(q.answer) ? q.answer.join(' ') : q.answer;
  return normalise(q.question) + ' ' + normalise(ans);
}

function covers(haystack, fact) {
  if (Array.isArray(fact.all) && fact.all.length) {
    const all = fact.all.map(normalise);
    if (haystack.some(h => all.every(t => h.includes(t)))) return true;
  }
  if (Array.isArray(fact.any) && fact.any.length) {
    const any = fact.any.map(normalise);
    if (haystack.some(h => any.some(t => h.includes(t)))) return true;
  }
  return false;
}

const only = process.argv.slice(2).filter(a => !a.startsWith('-'));

if (!fs.existsSync(LEDGERS)) {
  console.log('note  no scripts/fact-ledgers/ directory — nothing to check');
  process.exit(0);
}

const ledgerFiles = fs.readdirSync(LEDGERS).filter(f => f.endsWith('.json')).sort();
if (!ledgerFiles.length) {
  console.log('note  scripts/fact-ledgers/ holds no ledger — nothing to check');
  process.exit(0);
}

let failures = 0, checked = 0, factsTotal = 0, factsAsked = 0;
const packsWithLedger = new Set();

for (const file of ledgerFiles) {
  const ledger = JSON.parse(fs.readFileSync(path.join(LEDGERS, file), 'utf8'));
  const pack = ledger.pack || path.basename(file, '.json');
  packsWithLedger.add(pack);
  if (only.length && !only.includes(pack)) continue;

  if (!fs.existsSync(path.join(ROOT, 'subjects', pack))) {
    console.log('\n' + pack);
    console.log('  FAIL  ledger names a pack that does not exist: subjects/' + pack);
    failures++;
    continue;
  }

  const loaded = loadPack(pack);
  const haystack = loaded.practice.map(askable);
  const facts = Array.isArray(ledger.facts) ? ledger.facts : [];
  factsTotal += facts.length;
  checked++;

  console.log('\n' + pack + '  (' + facts.length + ' facts from ' + (ledger.source || 'its ledger') + ')');
  if (loaded.errors && loaded.errors.length) {
    console.log('  FAIL  the pack did not load cleanly: ' + JSON.stringify(loaded.errors));
    failures++;
    continue;
  }

  // ⚠ A ledger entry with no terms can never fail, so it would sit there looking
  //   like coverage forever. Catch the empty entry, not just the missing fact.
  const malformed = facts.filter(f => !f.id || !f.fact ||
    (!(Array.isArray(f.any) && f.any.length) && !(Array.isArray(f.all) && f.all.length)));
  if (malformed.length) {
    console.log('  FAIL  ' + malformed.length + ' ledger entr(ies) carry no match terms: ' +
      malformed.map(f => f.id || '(no id)').join(' '));
    failures++;
  }

  const ids = facts.map(f => f.id);
  const dupIds = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
  if (dupIds.length) {
    console.log('  FAIL  duplicate fact ids in the ledger: ' + dupIds.join(' '));
    failures++;
  }

  const missing = facts.filter(f => !malformed.includes(f) && !covers(haystack, f));
  factsAsked += facts.length - missing.length - malformed.length;
  if (missing.length) {
    console.log('  FAIL  ' + missing.length + ' fact(s) the source teaches and the pack never asks:');
    const byUnit = {};
    for (const f of missing) (byUnit[f.unit || '(no unit)'] ||= []).push(f);
    for (const unit of Object.keys(byUnit)) {
      console.log('          ' + unit);
      for (const f of byUnit[unit]) console.log('            ' + f.id + '  ' + f.fact);
    }
    failures++;
  } else {
    console.log('  ok    every fact in the ledger is asked by at least one question');
  }
}

// ⚠ A live pack with no ledger is the state this harness exists to leave behind.
//   It is REPORTED, never failed: writing a ledger is a piece of work, and a
//   harness that fails the build for packs nobody has got to yet gets disabled.
const live = listPacks().filter(p => !p.comingSoon).map(p => p.id || p).sort();
const without = live.filter(p => !packsWithLedger.has(p));
if (!only.length && without.length) {
  console.log('\nReview — live packs with no fact ledger yet (not a failure)');
  console.log('  ' + without.length + ' of ' + live.length + ': ' + without.join(' '));
  console.log('  A ledger is a list of what the syllabus teaches. Until one exists,');
  console.log('  nothing here can tell whether that pack asks it.');
}

// ⚠ Ends in "N passed, M failed" because scripts/preflight.js derives its
//   one-line summary from that shape, and a step whose summary is blank tells
//   the person running it nothing about what was measured.
console.log('\n' + checked + ' pack(s) checked · ' +
  factsAsked + ' passed, ' + (factsTotal - factsAsked) + ' failed');
process.exit(failures ? 1 : 0);
