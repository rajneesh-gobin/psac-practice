#!/usr/bin/env node
'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Import every question in subjects/ into the Supabase `questions` table.
//
//    node netlify/import-questions.js --check      no credential, no network
//    node netlify/import-questions.js --dry-run    reads the database, writes nothing
//    node netlify/import-questions.js              preflight, then upsert
//
//  ⚠ ONE LOADER. This command used to carry its own private copy of the VM
//  sandbox holding only makeMCQ/makeNum/makeTF/makeMatch/makeSymmetry. Six
//  French source files therefore threw "makeCloze is not defined" / "makeText
//  is not defined", were skipped with a warning nobody read, and the importer
//  uploaded 14,361 of the 14,726 questions the deployed app loads — every
//  cloze text and every typed-text correction item missing. It now loads
//  through netlify/lib/questions-sandbox.js, the same module the deployed
//  question service and the re-grading path use, so a new factory cannot be
//  added to the app and forgotten here again.
//
//  ⚠ FAIL-CLOSED. The whole corpus is validated before Supabase is contacted
//  at all. A broken file anywhere means ZERO writes, not a partial update.
//
//  Requires Node 18+ (uses globalThis.fetch).
// ══════════════════════════════════════════════════════════════════════════

if (!globalThis.fetch) {
  console.error('Requires Node 18+. Run with: node --version to check.');
  process.exit(1);
}

const fs   = require('fs');
const path = require('path');
const { loadCorpus } = require('./lib/questions-sandbox');
const { createImporter, newStats, preflight, buildReport, printReport, redactedReport } = require('./lib/question-import');
const { syncProtectedSource, CONFLICT_DIRNAME } = require('./lib/question-writeback');

const ROOT = path.resolve(__dirname, '..');

// ── Command line ──────────────────────────────────────────────────────────
// ⚠ An unknown or misspelled flag must NEVER fall through to a live import.
// `--dry_run` is not `--dry-run`, and quietly uploading 14,890 rows because a
// hyphen was typed as an underscore is not a mistake this command may make.
const USAGE = [
  'Usage: node netlify/import-questions.js [--check | --dry-run] [--report <path>] [--json]',
  '',
  '  --check           Load and validate every question locally. No credential,',
  '                    no network, no writes. Exits non-zero on any problem.',
  '  --dry-run         Also read the database and report what WOULD change.',
  '                    Requires SUPABASE_SERVICE_ROLE_KEY. Writes nothing.',
  '  (no flag)         Preflight, then upsert the verified corpus.',
  '  --report <path>   Also write a redacted machine-readable JSON report.',
  '  --json            Print that report to stdout instead of a path.',
  '  --help            This message.',
].join('\n');

function parseArgs(argv) {
  const opts = { mode: 'live', reportPath: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--check')        opts.mode = 'check';
    else if (a === '--dry-run') opts.mode = 'dry-run';
    else if (a === '--json')    opts.json = true;
    else if (a === '--report') {
      opts.reportPath = argv[++i];
      if (!opts.reportPath || opts.reportPath.startsWith('--')) return { error: '--report needs a file path' };
    } else if (a === '--help' || a === '-h') return { help: true };
    else return { error: 'Unknown option ' + JSON.stringify(a) };
  }
  return opts;
}

const args = parseArgs(process.argv.slice(2));
if (args.help)  { console.log(USAGE); process.exit(0); }
if (args.error) { console.error(args.error + '\n\n' + USAGE); process.exit(2); }

function _loadDotEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
_loadDotEnv();

const SB_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_SRK = process.env.SUPABASE_SERVICE_ROLE_KEY;

// The project reference, never the key. Printing which database is about to be
// written to is the last chance an operator has to notice it is the wrong one.
const targetLabel = (() => {
  try { return new URL(SB_URL).hostname; } catch { return String(SB_URL); }
})();

if (args.mode !== 'check' && !SB_SRK) {
  console.error(
    'ERROR: SUPABASE_SERVICE_ROLE_KEY is not set.\n' +
    'Create a .env file in the project root:\n' +
    '  SUPABASE_URL=https://xawvjwsiqhtxgpocdqgm.supabase.co\n' +
    '  SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>\n\n' +
    'Or run the local checks, which need no credential:\n' +
    '  node netlify/import-questions.js --check'
  );
  process.exit(1);
}

// ── Protected rows ─────────────────────────────────────────────────────────
// The database version of a protected question always wins. Whether the local
// .js can be rewritten to match it is decided — and PROVED — in
// netlify/lib/question-writeback.js. See the header there.
const CONFLICT_DIR = path.join(ROOT, CONFLICT_DIRNAME);

function onProtectedConflict(qid, dbData, pack, patchState) {
  const result = syncProtectedSource(qid, dbData, pack, { root: ROOT });
  if (result.ok) { patchState.backupDir = result.backupDir; return true; }
  patchState.conflicts.push({ id: qid, subjectId: pack.subjectId, reason: result.reason });
  return false;
}

// ── Main ──────────────────────────────────────────────────────────────────
(async () => {
  const started = Date.now();
  let aborted = false, pf = null, database = null, patch = null, verification = null;

  try {
    // ── Phase 1: preflight. No database, no writes, no backups. ───────────
    console.log('Loading question sources...');
    const corpus = loadCorpus();
    pf = preflight(corpus);
    console.log('Loaded ' + pf.practice + ' practice + ' + pf.papers + ' past-paper questions from '
      + pf.packs + ' packs (' + pf.filesLoaded + ' files, ' + pf.filesSkipped + ' skipped).');

    const preflightOk = pf.ok && !pf.filesSkipped;

    if (preflightOk && args.mode !== 'check') {
      // ── Phase 2: the database. Only ever reached by a whole, valid corpus.
      const importer = createImporter({ url: SB_URL, key: SB_SRK });
      const totals = newStats();
      const addStats = s => { for (const k of Object.keys(totals)) totals[k] += s[k]; };
      const written = [];
      const patchState = { conflicts: [], backupDir: null };
      const packById = new Map(corpus.packs.map(p => [p.subjectId, p]));

      const groups = [];
      for (const pack of corpus.packs) {
        const rows = pf.rows.practice.filter(r => r.subject_id === pack.subjectId);
        if (rows.length) groups.push({ label: pack.subjectId, rows, pack });
      }
      if (pf.rows.papers.length) groups.push({ label: 'past-papers', rows: pf.rows.papers, pack: null });

      console.log('\n' + (args.mode === 'dry-run' ? 'Comparing against' : 'Writing to') + ' ' + targetLabel + '...');
      for (const g of groups) {
        if (args.mode === 'dry-run') {
          addStats((await importer.classifyRows(g.rows, g.label)).stats);
        } else {
          const onProtected = g.pack
            ? (id, dbData) => onProtectedConflict(id, dbData, packById.get(g.pack.subjectId), patchState)
            : (id) => { patchState.conflicts.push({ id, subjectId: 'past-papers', reason: 'a past-paper transcription is never rewritten from the database' }); return false; };
          // Only the rows that actually reported a verified write are re-read
          // below. An unchanged or protected row was deliberately not written,
          // and counting it as verified would make the check meaningless.
          addStats(await importer.importRows(g.rows, g.label, onProtected, row => written.push(row)));
        }
      }

      const candidates = totals.scanned;
      database = {
        candidates,
        added: totals.added, updated: totals.updated, unchanged: totals.unchanged,
        protectedUnchanged: totals.protectedUnchanged, protectedConflict: totals.protectedConflict,
        failed: totals.failed,
        attempted: totals.added + totals.updated + totals.failed,
        verified: totals.added + totals.updated,
      };

      if (args.mode === 'live') {
        patch = { patched: totals.patched, warnings: totals.patchWarnings,
                  backupDir: patchState.backupDir, conflictReport: null };
        if (patchState.conflicts.length) {
          fs.mkdirSync(CONFLICT_DIR, { recursive: true });
          const file = path.join(CONFLICT_DIR, 'protected-conflicts.json');
          fs.writeFileSync(file, JSON.stringify({ schemaVersion: 1, generatedAt: new Date().toISOString(),
            note: 'The database version of each question below is authoritative and was kept. The local source was NOT changed.',
            conflicts: patchState.conflicts }, null, 2), 'utf8');
          patch.conflictReport = file;
        }

        // ── Phase 3: read-after-write. A fresh read of every intended row.
        console.log('\nVerifying ' + written.length + ' written rows by reading them back...');
        verification = await importer.verifyRows(written);
      }
    }
  } catch (error) {
    aborted = true;
    console.error('\nImport aborted: ' + error.message);
  }

  if (!pf) {
    console.error('\nQUESTION IMPORT — the corpus could not be loaded at all. Nothing was written.');
    process.exitCode = 1;
    return;
  }

  const report = buildReport({
    mode: args.mode,
    target: args.mode === 'check' ? null : targetLabel,
    preflight: pf,
    database, patch, verification, aborted,
    elapsedSeconds: Math.round((Date.now() - started) / 1000),
    reportPath: args.reportPath,
  });

  if (args.reportPath) {
    fs.mkdirSync(path.dirname(path.resolve(args.reportPath)), { recursive: true });
    fs.writeFileSync(args.reportPath, JSON.stringify(redactedReport(report), null, 2), 'utf8');
  }
  if (args.json) console.log(JSON.stringify(redactedReport(report), null, 2));

  process.exitCode = printReport(report, console);
})();
