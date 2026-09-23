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

    // ⚠ The class must allow `-`. It was [A-Za-z0-9_]+, which silently skipped
    //   every hyphenated filename: onDisk listed them, this regex could not, so
    //   24 real files reported as missing from LOCAL_FILES while sitting
    //   correctly in the array. A name this check cannot parse is worse than one
    //   it rejects — it makes real drift unreportable.
    const listed = [...entry[1].matchAll(/questions\/([A-Za-z0-9_-]+\.js)/g)].map(x => x[1]).sort();
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

// ── 4b · subjects/_counts.js must match the question files on disk ────────
// The DENOMINATOR of every subject certificate. A stale table does not throw:
// it quietly reports "1,412 of 1,419 mastered" for a child who has finished
// the subject, or awards Subject Master while seven new questions sit
// unanswered. Both are worse than an error, so this is a build failure.
//
// ⚠ Rebuilt and compared, not regex-read. The builder is the only definition
//   of what counts, and reproducing its rules here would be a third copy.
function checkSubjectCounts() {
  const rel = 'subjects/_counts.js';
  if (!exists(rel)) {
    fail(rel + ' is missing — run: node scripts/build-subject-counts.js');
    return;
  }
  let shipped, fresh;
  try {
    shipped = require(path.join(ROOT, rel));
  } catch (e) {
    fail(rel + ' does not execute: ' + e.message);
    return;
  }
  try {
    fresh = require(path.join(ROOT, 'scripts', 'build-subject-counts.js')).build().packs;
  } catch (e) {
    fail('scripts/build-subject-counts.js does not run: ' + e.message);
    return;
  }
  const REGEN = 'run: node scripts/build-subject-counts.js';
  const a = Object.keys(shipped).sort(), b = Object.keys(fresh).sort();
  for (const id of b) if (!shipped[id]) fail('pack ' + id + ' is missing from ' + rel + ' — ' + REGEN);
  for (const id of a) if (!fresh[id])   fail(rel + ' lists ' + id + ', which has no questions on disk — ' + REGEN);
  let drift = 0;
  for (const id of b) {
    if (!shipped[id]) continue;
    if (JSON.stringify(shipped[id]) !== JSON.stringify(fresh[id])) { drift++; }
  }
  if (drift) fail(drift + ' pack(s) in ' + rel + ' no longer match their question files — ' + REGEN);
  const n = Object.values(fresh).reduce((t, p) =>
    t + Object.values(p).reduce((x, r) => x + r[0] + r[1] + r[2] + r[3], 0), 0);
  note('checked subjects/_counts.js against ' + b.length + ' packs (' + n + ' practisable questions)');
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


// ⚠ The settings panel width lives in TWO files: the class _renderParentProfile()
// writes and the rule in style.css that widens it inside the dashboard. The
// override used to name a Tailwind utility (.max-w-2xl) the renderer had stopped
// writing, so it matched nothing and Account & Settings rendered as a 512px strip
// centred in a 1088px board - measured at 1440px, phone layout on a desktop.
function checkSettingsPanelWidth() {
  const app = read(path.join(ROOT, 'engine/app.js'));
  const css = read(path.join(ROOT, 'style.css'));
  if (!app || !css) { fail('engine/app.js or style.css not readable'); return; }
  const CLASS = 'parent-settings-col';
  if (!app.includes(CLASS))
    fail('engine/app.js: the Account & Settings wrapper no longer carries .' + CLASS
      + ' - style.css widens the panel through that class and nothing else');
  if (!css.includes('#pd-panel-settings .' + CLASS))
    fail('style.css: nothing widens #pd-panel-settings .' + CLASS
      + ' - Settings goes back to a phone-width column in the middle of the board');
  note('checked the Account & Settings width override still has a class to match');
}

// ⚠ A content harness that hard-codes its pack list goes blind the day a pack
// goes live. audit-content-coverage.js did exactly that: grades 4-6 x five
// subjects, written when that was all there was, so from 2026-09-16 it audited
// 15 of 46 live packs and said nothing about the other 31 - including every NCE
// pack. docs/nce-grade9/batch_plan.md had it recorded as V-6 and it still
// survived, because nothing fails when an audit simply does not look.
function checkAuditsReadTheIndex() {
  for (const name of ['audit-content-coverage.js', 'audit-difficulty-labels.js',
                      'test-live-pack-content.js', 'test-subsection-invariant.js']) {
    const src = read(path.join(ROOT, 'scripts', name));
    if (!src) { fail(`scripts/${name} is missing — it is one of the harnesses that must audit EVERY live pack`); continue; }
    if (!src.includes("'_index.js'") && !src.includes('subjects/_index.js'))
      fail(`scripts/${name} no longer derives its packs from the generated index — `
        + 'it will silently skip whatever goes live next');
    const literal = src.match(/for\s*\(\s*const\s+grade\s+of\s*\[[^\]]+\]/);
    if (literal)
      fail(`scripts/${name} hard-codes a grade list (${literal[0].slice(0, 40)}…) — `
        + 'derive the live packs from subjects/_index.js instead');
  }
  note('checked the 4 content audits still derive their packs from the live index');
}

// ── 10 · Every browser script must PARSE ─────────────────────────────────
// ⚠ Written 2026-09-21 after engine/app.js shipped with curly quotes
//   (typeof X !== ‘undefined’) in nine lines of one commit. A classic script
//   that fails to parse defines NOTHING: showScreen, PracticeHub and every
//   other global vanished, and the only symptom a parent saw was
//   "No subjects available for Grade N yet" plus a ReferenceError in a
//   console they never open. Nothing here executed the engine files, so the
//   one failure that takes the whole app down at once was the one failure no
//   check could see. vm.Script compiles without running - no DOM needed.
function checkScriptsParse() {
  const vm = require('vm');
  const files = new Set(walk('engine'));
  for (const f of ['sw.js', 'subjects/_index.js', 'guest.js']) if (exists(f)) files.add(f);
  for (const html of fs.readdirSync(ROOT).filter(n => n.endsWith('.html'))) {
    const src = read(path.join(ROOT, html)) || '';
    for (const m of src.matchAll(/<script[^>]+src="([^"?]+)"/g)) if (exists(m[1])) files.add(m[1]);
  }
  let n = 0;
  for (const f of [...files].sort()) {
    const src = read(path.join(ROOT, f));
    if (src === null) continue;
    try { new vm.Script(src, { filename: f }); n++; }
    catch (e) { fail(f + ' does not parse: ' + e.message + ' (' + String(e.stack || '').split(/\r?\n/)[0] + ')'); }
  }
  note('parsed ' + n + ' browser scripts (a syntax error in a classic script defines nothing)');
}

// ── run ───────────────────────────────────────────────────────────────────
checkHtmlReferences();
checkServiceWorker();
checkLocalFiles();
checkManifests();
checkSubjectCounts();
checkBadgeIds();
checkSqlSearchPath();
checkScreenNesting();
checkSettingsPanelWidth();
// ── 11 · ONE .env reader ─────────────────────────────────────────────────
// ⚠ Written 2026-09-23. It had been hand-rolled twice
//   (netlify/import-questions.js, scripts/db-query.js) and then NOT written a
//   third time in scripts/preflight.js — which is how the command CLAUDE.md
//   documents, `node scripts/preflight.js --import`, came to refuse with
//   "SUPABASE_SERVICE_ROLE_KEY is not set" while the key sat in .env correctly
//   named: preflight checked process.env, and the only thing that read .env was
//   the importer one level down, which the guard exited before reaching.
//   The parser also carries a CRLF trap that has cost this project a run
//   already, so every extra copy is a chance to get it wrong again.
// ⚠ ONE MISSING BRACE DISCARDS EVERY RULE AFTER IT, silently. Measured
//   2026-09-23: a patch stripped the `}` from one rule at line 3025 of
//   style.css and the browser threw away the remaining ~7,800 lines — the
//   whole chalkboard, every screen layout, the lot. The only symptom anything
//   noticed was that six tab buttons had the wrong width, and only because a
//   headless test happened to measure them.
// ⚠ Comments are blanked first, or a brace inside a comment counts.
function checkCssBraces() {
  for (const rel of ['style.css']) {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) continue;
    const raw = fs.readFileSync(file, 'utf8');
    const clean = raw.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
    let depth = 0, line = 1, openedAt = [];
    for (const ch of clean) {
      if (ch === '\n') line++;
      else if (ch === '{') { depth++; openedAt.push(line); }
      else if (ch === '}') {
        depth--; openedAt.pop();
        if (depth < 0) { fail(`${rel}: an extra } at line ${line} — every rule after it is discarded`); depth = 0; }
      }
    }
    if (depth > 0) {
      fail(`${rel}: ${depth} unclosed block(s), opened at line(s) ${openedAt.slice(-depth).join(", ")}`
        + ' — every rule after that point is discarded by the browser');
    }
  }
  note('checked style.css braces balance');
}

function checkOneEnvReader() {
  const shared = path.join('scripts', 'lib', 'load-env.js');
  if (!read(path.join(ROOT, shared))) { fail(`${shared} is missing — it is the one .env reader`); return; }
  const offenders = [];
  for (const dir of ['scripts', 'netlify', 'workers']) {
    const base = path.join(ROOT, dir);
    if (!fs.existsSync(base)) continue;
    const walk = d => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, e.name);
        if (e.isDirectory()) { if (e.name !== 'node_modules') walk(full); continue; }
        if (!e.name.endsWith('.js')) continue;
        const rel = path.relative(ROOT, full).replace(/\\/g, '/');
        if (rel === 'scripts/lib/load-env.js') continue;
        const src = read(full) || '';
        // The tell of a hand-rolled loader: assigning to a COMPUTED env key.
        if (/process\.env\[[^\]]+\]\s*=/.test(src)) offenders.push(rel);
      }
    };
    walk(base);
  }
  if (offenders.length)
    fail('these re-implement the .env reader instead of requiring scripts/lib/load-env.js: '
      + offenders.join(', '));
  note('checked there is exactly one .env reader');
}

checkAuditsReadTheIndex();
checkOneEnvReader();
checkCssBraces();
checkScriptsParse();

for (const n of notes) console.log('  ok  ' + n);
if (problems.length) {
  console.error('\n' + problems.length + ' problem(s):\n');
  for (const p of problems) console.error('  ✗ ' + p);
  process.exit(1);
}
console.log('\nAll static checks passed.');
