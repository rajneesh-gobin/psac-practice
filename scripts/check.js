#!/usr/bin/env node
'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Static checks for a no-build vanilla project.
//
//  Every expensive bug in this codebase so far was statically detectable:
//    • defaultStore() / updateDiffBtns() called but never defined
//    • Auth.saveProfile() referenced by markup that no module implements
//    • LOCAL_FILES drifting from the files actually on disk
//    • a sw.js SHELL_FILES entry that does not exist (kills the whole
//      offline shell, because cache.addAll is all-or-nothing)
//
//  Run:  node scripts/check.js
//  Exit: 0 clean, 1 problems found.
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const problems = [];
const notes    = [];
const fail = m => problems.push(m);
const note = m => notes.push(m);

const read = p => { try { return fs.readFileSync(p, 'utf8'); } catch { return null; } };
const exists = p => fs.existsSync(path.join(ROOT, p));

function walk(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }); }
  catch { return out; }
  for (const e of entries) {
    const rel = path.posix.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== '.git') walk(rel, out); }
    else if (e.name.endsWith('.js')) out.push(rel);
  }
  return out;
}

// ── 1 · Every browser module symbol referenced by index.html must exist ────
function checkHtmlReferences() {
  const html = read(path.join(ROOT, 'index.html'));
  if (!html) return fail('index.html not found');

  const engineFiles = walk('engine');
  const engineSrc   = engineFiles.map(f => read(path.join(ROOT, f)) || '').join('\n');

  const MODULES = ['Auth','PD','AdminPanel','TeacherMode','Forum','Calendar','Search','Store','Classroom'];
  const modRe = new RegExp('\\b(' + MODULES.join('|') + ')\\.([A-Za-z_][A-Za-z0-9_]*)\\s*\\(', 'g');

  const defined = name =>
    new RegExp('(?:^|\\n)\\s*(?:async\\s+)?function\\s+' + name + '\\b').test(engineSrc) ||
    new RegExp('[\\s,{]' + name + '\\s*[:,]').test(engineSrc) ||
    new RegExp('\\b' + name + '\\s*[:=]\\s*(?:async\\s*)?\\(').test(engineSrc);

  const seen = new Set();
  let m;
  while ((m = modRe.exec(html))) {
    const key = m[1] + '.' + m[2];
    if (seen.has(key)) continue;
    seen.add(key);
    if (!defined(m[2])) fail(`index.html calls ${key}() but no engine/ module defines "${m[2]}"`);
  }
  note(`checked ${seen.size} module references in index.html`);

  // Bare onclick="someFn(" handlers must resolve to a global in engine/.
  // Skip JS keywords: "oninput=\"if(...) Auth.foo()\"" matches "if(" as the
  // leading identifier, which is a control-flow keyword, not a function call.
  const JS_KEYWORDS = new Set(['if', 'for', 'while', 'switch', 'catch', 'function', 'return', 'typeof', 'new', 'delete', 'void', 'do', 'else']);
  const bareRe = /on(?:click|change|input)="([a-z_][A-Za-z0-9_]*)\s*\(/g;
  const bare = new Set();
  while ((m = bareRe.exec(html))) { if (!JS_KEYWORDS.has(m[1])) bare.add(m[1]); }
  for (const fn of bare) {
    const ok = new RegExp('(?:function\\s+' + fn + '\\b|window\\.' + fn + '\\s*=|const\\s+' + fn + '\\s*=|\\b' + fn + '\\s*=\\s*\\()').test(engineSrc);
    if (!ok) fail(`index.html has on…="${fn}(" but engine/ defines no such global`);
  }
  note(`checked ${bare.size} inline handlers in index.html`);
}

// ── 2 · sw.js pre-cache list must reference files that exist ───────────────
// cache.addAll() rejects entirely if ANY url 404s, which silently removes the
// whole offline shell rather than just that one file.
function checkServiceWorker() {
  const sw = read(path.join(ROOT, 'sw.js'));
  if (!sw) return fail('sw.js not found');
  const block = sw.match(/SHELL_FILES\s*=\s*\[([\s\S]*?)\]/);
  if (!block) return fail('sw.js: could not locate SHELL_FILES');

  // ⚠ STRIP THE COMMENTS FIRST. The entries are matched with a bare
  //   /'([^']+)'/, so one apostrophe in a comment inside the array - "every
  //   child’s first load" - pairs with the opening quote of the next entry and
  //   swallows it. That reported TWELVE files as missing from SHELL_FILES when
  //   every one of them was listed, and the message points at sw.js rather
  //   than at the prose that broke the parse.
  const urls = [...block[1].replace(/\/\/[^\n]*/g, '').matchAll(/'([^']+)'/g)].map(x => x[1]);
  let checked = 0;
  for (const u of urls) {
    if (u === '/') continue;                       // the shell root, not a file
    if (/^https?:/.test(u)) continue;              // external, cannot verify
    checked++;
    if (!exists(u.replace(/^\//, ''))) fail(`sw.js SHELL_FILES lists "${u}" which does not exist on disk`);
  }
  note(`checked ${checked} sw.js pre-cache entries`);

  // Any engine module in index.html should also be cached, or it breaks offline.
  const html = read(path.join(ROOT, 'index.html')) || '';
  for (const s of [...html.matchAll(/<script src="(engine\/[^"]+)"/g)].map(x => x[1])) {
    if (!urls.includes('/' + s)) fail(`sw.js SHELL_FILES is missing "/${s}" (loaded by index.html, so offline would break)`);
  }
}

// ── 3 · LOCAL_FILES must match the question files on disk ─────────────────
function checkLocalFiles() {
  const src = read(path.join(ROOT, 'engine', 'question_loader.js'));
  if (!src) return fail('engine/question_loader.js not found');

  let packs;
  try { packs = fs.readdirSync(path.join(ROOT, 'subjects'), { withFileTypes: true })
                 .filter(d => d.isDirectory()).map(d => d.name); }
  catch { return fail('subjects/ not found'); }

  for (const pack of packs) {
    const dir = path.join(ROOT, 'subjects', pack, 'questions');
    if (!fs.existsSync(dir)) continue;
    const onDisk = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();

    const entry = src.match(new RegExp("'" + pack + "':\\s*\\[([\\s\\S]*?)\\]"));
    if (!entry) { fail(`question_loader.js LOCAL_FILES has no entry for "${pack}" (${onDisk.length} files on disk)`); continue; }

    const listed = [...entry[1].matchAll(/questions\/([A-Za-z0-9_]+\.js)/g)].map(x => x[1]).sort();
    for (const f of onDisk) if (!listed.includes(f)) fail(`LOCAL_FILES["${pack}"] is missing ${f} (invisible under file://)`);
    for (const f of listed) if (!onDisk.includes(f)) fail(`LOCAL_FILES["${pack}"] lists ${f} which is not on disk`);
  }
  note(`checked LOCAL_FILES against ${packs.length} subject packs`);
}

// ── 4 · Subject packs: one generated index, and it must not have drifted ──
// index.html loads subjects/_index.js and NOTHING else from subjects/. Each
// pack's own _manifest.js is fetched by PackLoader.ensure() when that subject
// is opened. The index is generated, so what is worth checking is drift: a new
// pack, a renamed or reordered chapter, or a deleted directory that never made
// it back into the index. A stale index shows a child chapters that no longer
// exist, and it fails silently because the lite entry looks perfectly valid.
function checkManifests() {
  const html = read(path.join(ROOT, 'index.html')) || '';
  if (!html.includes('subjects/_index.js')) fail('index.html does not load subjects/_index.js');
  for (const m of html.matchAll(/<script src="(subjects\/[^"]+)"><\/script>/g)) {
    if (m[1] !== 'subjects/_index.js') {
      fail(`index.html loads ${m[1]} eagerly — subject packs must be lazy (see PackLoader in engine/registry.js)`);
    }
  }

  let dirs;
  try { dirs = fs.readdirSync(path.join(ROOT, 'subjects'), { withFileTypes: true })
                 .filter(d => d.isDirectory()).map(d => d.name).sort(); }
  catch { return; }
  const onDisk = dirs.filter(d => exists(path.posix.join('subjects', d, '_manifest.js')));

  // ⚠ EXECUTE both sides rather than reading them with a regex. A regex passes
  // happily on an index that no longer parses, which is the one failure that
  // would take every subject down at once.
  const vm = require('vm');
  const run = files => {
    const packs = [];
    const ctx = {
      STATIC_QUESTIONS: [], console: { log() {}, warn() {}, error() {} },
      registerSubject: p => { packs.push(p); return p; }, extendSubject: () => null,
      makeMCQ: o => o, makeNum: o => o, makeTF: o => o,
      makeMatch: o => o, makeSymmetry: o => o, makeCloze: o => o,
    };
    ctx.window = ctx;
    vm.createContext(ctx);
    for (const f of files) vm.runInContext(read(path.join(ROOT, f)) || '', ctx, { filename: f });
    return packs;
  };

  let idxPacks, manPacks;
  try { idxPacks = run(['subjects/_index.js']); }
  catch (e) { fail(`subjects/_index.js does not execute: ${e.message}`); return; }
  try { manPacks = run(onDisk.map(d => path.posix.join('subjects', d, '_manifest.js'))); }
  catch (e) { fail(`a subject manifest does not execute: ${e.message}`); return; }

  const REGEN = 'run: node scripts/build-subject-index.js';
  const idxIds = new Set(idxPacks.map(p => p.id));
  const manIds = new Set(manPacks.map(p => p.id));
  for (const id of manIds) if (!idxIds.has(id)) fail(`pack ${id} is missing from subjects/_index.js — ${REGEN}`);
  for (const id of idxIds) if (!manIds.has(id)) fail(`subjects/_index.js lists ${id}, which has no manifest — ${REGEN}`);

  const byId = new Map(manPacks.map(p => [p.id, p]));
  for (const p of idxPacks) {
    const m = byId.get(p.id);
    if (m) {
      const a = (p.chapters || []).map(c => c.id).join(',');
      const b = (m.chapters || []).map(c => c.id).join(',');
      if (a !== b) fail(`pack ${p.id}: chapters in subjects/_index.js differ from its manifest — ${REGEN}`);
    }
    // PackLoader fetches these by path at runtime; a wrong one is a subject
    // that opens with no syllabus and no generators, and only console.warns.
    if (!p._src || !exists(p._src)) fail(`pack ${p.id}: _src "${p._src}" does not exist`);
    for (const extra of p._extra || []) if (!exists(extra)) fail(`pack ${p.id}: _extra "${extra}" does not exist`);
  }
  note(`checked subjects/_index.js against ${onDisk.length} lazily-loaded manifests`);
}

// ── 5 · Badge ids must be unique and never reused ─────────────────────────
// They are persisted in DB.badges; a collision silently awards the wrong badge.
function checkBadgeIds() {
  const files = ['engine/registry.js', ...walk('subjects').filter(f => f.endsWith('_manifest.js'))];
  const seen = new Map();
  for (const f of files) {
    const src = read(path.join(ROOT, f));
    if (!src) continue;
    for (const m of src.matchAll(/id:\s*'([a-z0-9_]+)'\s*,\s*name:\s*'[^']*'\s*,\s*icon:/g)) {
      const id = m[1];
      if (seen.has(id) && seen.get(id) !== f) fail(`badge id "${id}" is defined in both ${seen.get(id)} and ${f}`);
      seen.set(id, f);
    }
  }
  note(`checked ${seen.size} badge/chapter ids for collisions`);
}

// ── 6 · SECURITY DEFINER functions using pgcrypto need `extensions` ───────
// Omitting it is what broke student login: crypt() is unresolvable inside a
// function pinned to search_path = public.
function checkSqlSearchPath() {
  let sqls;
  try { sqls = fs.readdirSync(ROOT).filter(f => f.endsWith('.sql')); } catch { return; }
  for (const f of sqls) {
    // supabase-schema.sql is the generated dump of the live database — the
    // pinning it records is whatever is actually deployed, so flagging it here
    // would only ever report on a database this check cannot change. It is
    // covered instead by scripts/sql-tests/run-schema-tests.sh.
    if (f === 'supabase-schema.sql') continue;
    const src = read(path.join(ROOT, f)) || '';
    if (!/\b(crypt|gen_salt|digest|gen_random_bytes)\s*\(/.test(src)) continue;
    if (/SET\s+search_path\s*=\s*public\s+AS/.test(src))
      fail(`${f}: a function uses pgcrypto but pins "SET search_path = public" (needs ", extensions")`);
  }
  note(`checked ${sqls.length} SQL files for the pgcrypto search_path trap`);
}

// ── 7 · Every screen's own panels must be INSIDE that screen ─────────────
// showScreen() hides screens by toggling .hidden on `.screen` elements, so a
// panel that has escaped its screen through an unbalanced </div> is never
// hidden by anything. #admin-tab-questions did exactly that: one </div> at
// indent 4 closed #screen-admin a panel early, so opening the Question bank
// and then tapping 🔒 Parent hid the admin header and tab bar and left the
// Question bank painted over the parent dashboard. It read as a dead button.
// ⚠ The DOM is the authority here, not the indentation — the file looked
// perfectly tidy, and nine of the ten panels were nested correctly.
function checkScreenNesting() {
  const html = read(path.join(ROOT, 'index.html'));
  if (!html) { fail('index.html not readable'); return; }
  const lines = html.split(/\r?\n/);

  // Match a <div id="..."> to its </div> by depth, ignoring HTML comments.
  const spanOf = needle => {
    const open = lines.findIndex(l => l.includes(needle));
    if (open < 0) return null;
    let depth = 0, inComment = false;
    for (let i = open; i < lines.length; i++) {
      let bare = '';
      const s = lines[i];
      for (let k = 0; k < s.length; k++) {
        if (!inComment && s.startsWith('<!--', k)) { inComment = true; k += 3; continue; }
        if (inComment) { if (s.startsWith('-->', k)) { inComment = false; k += 2; } continue; }
        bare += s[k];
      }
      for (const m of bare.matchAll(/<div\b|<\/div>/g)) depth += m[0] === '</div>' ? -1 : 1;
      if (depth === 0) return { open, close: i };
    }
    return { open, close: -1 };
  };

  const groups = [
    { screen: 'id="screen-admin"', panel: /id="(admin-tab-[a-z-]+)"/g, label: 'admin tab panel' },
  ];
  let checked = 0;
  for (const g of groups) {
    const span = spanOf(g.screen);
    if (!span || span.close < 0) { fail(`index.html: could not find the extent of ${g.screen}`); continue; }
    for (let i = 0; i < lines.length; i++) {
      for (const m of lines[i].matchAll(g.panel)) {
        checked++;
        if (i < span.open || i > span.close) {
          fail(`index.html: #${m[1]} (line ${i + 1}) is OUTSIDE ${g.screen} `
            + `(lines ${span.open + 1}-${span.close + 1}) — showScreen() will never hide it`);
        }
      }
    }
  }
  note(`checked ${checked} admin tab panels are nested inside their screen`);
}

// ── run ───────────────────────────────────────────────────────────────────
checkHtmlReferences();
checkServiceWorker();
checkLocalFiles();
checkManifests();
checkBadgeIds();
checkSqlSearchPath();
checkScreenNesting();

for (const n of notes) console.log('  ok  ' + n);
if (problems.length) {
  console.error('\n' + problems.length + ' problem(s):\n');
  for (const p of problems) console.error('  ✗ ' + p);
  process.exit(1);
}
console.log('\nAll static checks passed.');
