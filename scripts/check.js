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

  const urls = [...block[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
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

// ── 4 · Every registered subject pack must be loaded by index.html ────────
function checkManifests() {
  const html = read(path.join(ROOT, 'index.html')) || '';
  let packs;
  try { packs = fs.readdirSync(path.join(ROOT, 'subjects'), { withFileTypes: true })
                 .filter(d => d.isDirectory()).map(d => d.name); }
  catch { return; }
  for (const p of packs) {
    if (!exists(path.posix.join('subjects', p, '_manifest.js'))) continue;
    if (!html.includes(`subjects/${p}/_manifest.js`)) fail(`subjects/${p}/_manifest.js exists but index.html never loads it`);
  }
  note(`checked ${packs.length} subject manifests are loaded`);
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
    if (f === 'supabase-migration.sql' || f === 'supabase-schema.sql') continue;  // legacy / generated
    const src = read(path.join(ROOT, f)) || '';
    if (!/\b(crypt|gen_salt|digest|gen_random_bytes)\s*\(/.test(src)) continue;
    if (/SET\s+search_path\s*=\s*public\s+AS/.test(src))
      fail(`${f}: a function uses pgcrypto but pins "SET search_path = public" (needs ", extensions")`);
  }
  note(`checked ${sqls.length} SQL files for the pgcrypto search_path trap`);
}

// ── run ───────────────────────────────────────────────────────────────────
checkHtmlReferences();
checkServiceWorker();
checkLocalFiles();
checkManifests();
checkBadgeIds();
checkSqlSearchPath();

for (const n of notes) console.log('  ok  ' + n);
if (problems.length) {
  console.error('\n' + problems.length + ' problem(s):\n');
  for (const p of problems) console.error('  ✗ ' + p);
  process.exit(1);
}
console.log('\nAll static checks passed.');
