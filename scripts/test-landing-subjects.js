'use strict';
// The subject cards on the landing page, against the packs that actually exist.
//
// ⚠ WHY THIS EXISTS. Measured 2026-09-16: the Science card said "Grades 1–6"
//   and the History & Geography card said "Grades 1–6". Neither is true —
//   Science packs start at grade 4 and History & Geography stops at grade 6, so
//   a Grade 2 parent came looking for Science and found Health Education. And
//   6,364 practisable questions had no card at all: Health Education, SSEE,
//   ICT, Social & Modern Studies and the three Grade 9 sciences. ICT alone is
//   the single biggest pack in the app.
//
// ⚠ THE TABLE IS DERIVED, never hand-written here. Hard-coding the expected
//   grades would just move the staleness from index.html into this file — the
//   whole failure was a hand-maintained list drifting from the packs.
//
// ⚠ It checks a card is HONEST, not that every subject has one. A landing page
//   is an edited pitch: grouping two subjects on one card, or leading with the
//   five core ones, is a design decision. Claiming a grade that has no pack is
//   not. So: every grade a card claims must exist, and any subject with a
//   sizeable pack and no mention at all is REVIEWED, not failed.
//
// Run: node scripts/test-landing-subjects.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond, extra) => {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label + (extra ? '\n          ' + extra : '')); }
};

// ── what actually ships ─────────────────────────────────────────────────────
const packs = [];
for (const ln of fs.readFileSync(path.join(ROOT, 'subjects/_index.js'), 'utf8').split(/\r?\n/)) {
  if (!ln.startsWith('registerSubject(')) continue;
  try { packs.push(JSON.parse(ln.slice('registerSubject('.length, ln.lastIndexOf('});') + 1))); } catch (_) {}
}
ok('read the generated pack index', packs.length > 0);
const live = packs.filter((p) => !p.comingSoon);

const gradesOf = {};
for (const p of live) (gradesOf[p.subject || p.name] = gradesOf[p.subject || p.name] || new Set()).add(p.grade);

// ── the cards ───────────────────────────────────────────────────────────────
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const landing = html.slice(html.indexOf('id="screen-landing"'), html.indexOf('id="screen-contact"'));
const section = landing.slice(landing.indexOf('Subjects for PSAC and NCE'));
const grid = section.slice(0, section.indexOf('</section>'));

// Each card is <h3>Title</h3> followed by a <p> naming its grades.
const cards = [];
for (const m of grid.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g)) {
  const strip = (s) => s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  cards.push({ title: strip(m[1]), grades: strip(m[2]) });
}
ok('found the subject cards', cards.length >= 5, 'found ' + cards.length);

// ⚠ Expand "Grades 4–6" AND "Grade 9" — a single-grade card is the normal shape
//   for the NCE subjects, and a range-only reader silently skips them.
const claimedGrades = (s) => {
  const out = new Set();
  for (const m of s.matchAll(/Grades\s+(\d)\s*[–-]\s*(\d)/g)) for (let g = +m[1]; g <= +m[2]; g++) out.add(g);
  for (const m of s.matchAll(/Grades?\s+(\d)\b/g)) out.add(+m[1]);
  return out;
};

// Map a card title onto the pack subjects it speaks for. A card may cover more
// than one (the Grade 9 sciences share one card), so this is a substring match
// in both directions rather than an equality test.
const ALIAS = { 'Mathematics': 'Maths', 'ICT': 'Information and Communication Technology' };
const subjectsFor = (title) => {
  const parts = title.split(/\s*[·&]\s*|\s+and\s+/).map((s) => s.trim()).filter(Boolean);
  const hit = new Set();
  for (const raw of parts) {
    const p = ALIAS[raw] || raw;
    for (const subj of Object.keys(gradesOf)) {
      if (subj.toLowerCase() === p.toLowerCase() || subj.toLowerCase().includes(p.toLowerCase())) hit.add(subj);
    }
  }
  return [...hit];
};

let matched = 0;
for (const card of cards) {
  const subs = subjectsFor(card.title);
  if (!subs.length) continue;           // a non-subject card (the "growing" panel)
  const claims = claimedGrades(card.grades);
  if (!claims.size) continue;
  matched++;
  // Every grade the card claims must be backed by a live pack in one of the
  // subjects that card speaks for.
  const backed = new Set();
  for (const s of subs) for (const g of gradesOf[s]) backed.add(g);
  const unbacked = [...claims].filter((g) => !backed.has(g)).sort();
  ok(`"${card.title}" claims only grades that exist`, unbacked.length === 0,
    unbacked.length ? `claims ${card.grades} but ${subs.join(' + ')} live at ${[...backed].sort().join(', ')} — no pack for grade ${unbacked.join(', ')}` : '');
}
ok('matched at least five cards to real subjects', matched >= 5, 'matched ' + matched);

// ⚠ REVIEW, not a failure: a subject with real content that the page never
//   names. Judged on questions, because "has a pack" and "is worth a card" are
//   different questions.
const bundles = path.join(ROOT, 'netlify/question-bundles');
if (fs.existsSync(bundles)) {
  const qOf = {};
  for (const p of live) {
    let j; try { j = JSON.parse(fs.readFileSync(path.join(bundles, p.id + '.json'), 'utf8')); } catch (_) { continue; }
    const s = p.subject || p.name;
    qOf[s] = (qOf[s] || 0) + (Array.isArray(j) ? j : (j.questions || [])).length;
  }
  // ⚠ Look for the SHORT name too. The pack subject is "Information and
  //   Communication Technology" and the card says "ICT" — matching on the long
  //   name alone reported the biggest pack in the app as unmentioned while its
  //   card sat right there.
  const shortOf = {};
  for (const [short, long] of Object.entries(ALIAS)) shortOf[long] = short;
  const mentioned = (s) => {
    const hay = section.toLowerCase();
    const names = [s, shortOf[s]].filter(Boolean);
    return names.some((n) => hay.includes(n.toLowerCase().slice(0, 12)));
  };
  const unnamed = Object.entries(qOf)
    .filter(([s, n]) => n >= 300 && !mentioned(s))
    .sort((a, b) => b[1] - a[1]);
  if (unnamed.length) {
    console.log('  REVIEW  live subjects with 300+ questions and no mention on the landing page:');
    for (const [s, n] of unnamed) console.log(`            ${s} (${n})`);
  }
}

// ── How many games there are, said in three places ──────────────────────────
// ⚠ Adding French Ninja moved ONE number and left two behind: the stat block
//   said 8 while the Game Zone showcase listed 7 cards and the Kids Mode list
//   still read "seven learning games". minigame.js is the only authority —
//   mg-card-live is what a child can actually tap.
const mg = fs.readFileSync(path.join(ROOT, 'engine/minigame.js'), 'utf8');
const liveGames = (mg.match(/mg-card-live/g) || []).length;
ok('minigame.js has live game cards', liveGames > 0);

const WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
const statBlock = +((landing.match(/>(\d+)<\/div>\s*<div[^>]*>\s*learning games/) || [])[1] || 0);
ok(`the stat block says ${liveGames}`, statBlock === liveGames, `it says ${statBlock}`);

const spelled = (landing.match(/\b([a-z]+) learning games\b/) || [])[1];
ok(`the Game Zone line says "${WORDS[liveGames]}"`, spelled === WORDS[liveGames],
  `it says "${spelled}"`);

// The showcase: one card per game, plus the dashed "in the workshop" panel.
const arcade = landing.slice(landing.indexOf('Learning that plays like an arcade'));
const showcase = arcade.slice(0, arcade.indexOf('</section>'));
const cardTitles = [...showcase.matchAll(/<h3[^>]*>([^<]*)<\/h3>/g)].map((m) => m[1]);
const playable = cardTitles.filter((t) => !/workshop/i.test(t));
ok(`the showcase lists ${liveGames} playable games`, playable.length === liveGames,
  `it lists ${playable.length}: ${playable.join(', ')}`);

console.log(`${checks - fails}/${checks} landing-subject checks passed`);
process.exit(fails ? 1 : 0);
