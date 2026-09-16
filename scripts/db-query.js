'use strict';
// Run SQL against the PRODUCTION database through the Supabase Management API.
//
// ⚠ THIS TALKS TO PRODUCTION. There is no staging database. Read-only queries
//   are the default use; anything that writes should be a reviewed migration
//   file passed with --file, so that what ran is what is in the repo.
//
// ⚠ supabase-schema.sql is a GENERATED DUMP and is evidence of nothing on its
//   own — it is only as fresh as the last regeneration. CLAUDE.md's rule is to
//   query pg_policies / pg_proc on the live database before trusting it, and
//   this is the tool for doing that.
//
// ⚠ .env in this repo is CRLF (a past commit exists because the importer could
//   not read it), so the parser below strips \r explicitly.
//
// Usage:
//   node scripts/db-query.js "select 1"
//   node scripts/db-query.js --file migrations/xxxx.sql
//   node scripts/db-query.js --file migrations/xxxx.sql --apply
//
// Without --apply, a --file is printed and NOT executed. A bare SQL string is
// executed as given: use it for SELECTs.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

function loadEnv() {
  const f = path.join(ROOT, '.env');
  if (!fs.existsSync(f)) return;
  for (const raw of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    const line = raw.replace(/\r/g, '').trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const k = line.slice(0, eq).trim();
    let v = line.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[k]) process.env[k] = v;
  }
}
loadEnv();

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const URL_ = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const REF = (URL_.match(/https:\/\/([a-z0-9]+)\.supabase\.co/) || [])[1];

if (!TOKEN) { console.error('SUPABASE_ACCESS_TOKEN is not set (.env)'); process.exit(1); }
if (!REF) { console.error('could not derive the project ref from SUPABASE_URL'); process.exit(1); }

async function run(sql) {
  const r = await fetch('https://api.supabase.com/v1/projects/' + REF + '/database/query', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  });
  const text = await r.text();
  if (!r.ok) throw new Error('HTTP ' + r.status + ': ' + text.slice(0, 600));
  try { return JSON.parse(text); } catch (_) { return text; }
}

(async () => {
  const args = process.argv.slice(2);
  const fileAt = args.indexOf('--file');
  const apply = args.includes('--apply');

  let sql;
  if (fileAt >= 0) {
    const f = args[fileAt + 1];
    sql = fs.readFileSync(path.resolve(ROOT, f), 'utf8');
    if (!apply) {
      console.log('── ' + f + ' — NOT executed (pass --apply to run it) ──\n');
      console.log(sql);
      return;
    }
    console.log('── applying ' + f + ' to project ' + REF + ' ──');
  } else {
    sql = args.filter((a) => a !== '--apply').join(' ');
    if (!sql) { console.error('nothing to run'); process.exit(1); }
  }

  const out = await run(sql);
  console.log(typeof out === 'string' ? out : JSON.stringify(out, null, 2));
})().catch((e) => { console.error(String(e.message || e)); process.exit(1); });
