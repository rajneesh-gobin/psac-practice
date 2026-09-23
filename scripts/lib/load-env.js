'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  THE ONE .env reader for this repo's Node tooling.
//
//  WHY IT IS SHARED — it was written twice (netlify/import-questions.js,
//  scripts/db-query.js) and then NOT written a third time, in
//  scripts/preflight.js, which is the bug this replaces: `preflight --import`
//  checked process.env.SUPABASE_SERVICE_ROLE_KEY and refused with
//  "SUPABASE_SERVICE_ROLE_KEY is not set" while the key sat correctly named in
//  .env — because the only thing that read .env was the importer one level
//  down, which never got to run. The documented command in CLAUDE.md therefore
//  could not work as documented.
//
//  ⚠ Split on /\r?\n/, never '\n'. A CRLF .env — which is what every Windows
//    editor here writes — leaves a trailing \r on each line, and \r is a regex
//    line terminator: `.` cannot match it and `$` will not match before it, so
//    a '\n' split parses the whole file to {} and reports the key as missing
//    while it is right there. That already cost this project once; it is the
//    single best reason for there to be one copy of this and not four.
//
//  ⚠ NEVER overwrites a variable already in the environment. A value passed on
//    the command line or exported in the shell must win over the file, or
//    pointing a script at another project becomes impossible.
//
//  Returns the list of names it set, so a caller can say what it found.
// ══════════════════════════════════════════════════════════════════════════

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..');

function loadEnv(envPath = path.join(ROOT, '.env')) {
  if (!fs.existsSync(envPath)) return [];
  const set = [];
  for (const raw of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = raw.replace(/\r/g, '').trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const k = line.slice(0, eq).trim();
    if (!k) continue;
    let v = line.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[k]) { process.env[k] = v; set.push(k); }
  }
  return set;
}

module.exports = { loadEnv, ROOT };
