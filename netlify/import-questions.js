#!/usr/bin/env node
'use strict';
// Run manually after adding new question files:
//   node netlify/import-questions.js
//
// Reads all question JS files (same VM sandbox as build-questions.js) and
// upserts every question to the Supabase `questions` table. Safe to re-run —
// uses upsert (merge-duplicates), so existing rows are updated, not doubled.
//
// Requires Node 18+ (uses globalThis.fetch).

if (!globalThis.fetch) {
  console.error('Requires Node 18+. Run with: node --version to check.');
  process.exit(1);
}

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT = path.resolve(__dirname, '..');

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

if (!SB_SRK) {
  console.error(
    'ERROR: SUPABASE_SERVICE_ROLE_KEY is not set.\n' +
    'Create a .env file in the project root:\n' +
    '  SUPABASE_URL=https://xawvjwsiqhtxgpocdqgm.supabase.co\n' +
    '  SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>'
  );
  process.exit(1);
}

// ── VM sandbox — copied exactly from build-questions.js ──────────────────────
function _buildContext(buf) {
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  function makeMCQ({ id, chapterId, difficulty, subsection, question, options, answer, hint, explanation }) {
    const others    = shuffle((options || []).filter(o => o !== answer));
    const finalOpts = shuffle([answer, ...others.slice(0, 3)]);
    return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts, answer,
             acceptableAnswers: [answer], hint, explanation };
  }

  function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation }) {
    return { id, chapterId, difficulty, subsection, type: 'numeric', question,
             answer: String(answer),
             acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String),
             hint, explanation };
  }

  function makeSymmetry({ id, chapterId, difficulty, subsection, question, rows, cols, axis, axisPos, given, answer, hint, explanation }) {
    const ans = answer || (given || []).map(([r, c]) => {
      if (axis === 'vertical')   return [r, (cols - 1) - c];
      if (axis === 'horizontal') return [(rows - 1) - r, c];
      return null;
    }).filter(Boolean);
    return { id, chapterId, difficulty, subsection, type: 'symmetry', question, rows, cols, axis, axisPos, given, answer: ans,
             hint: hint || 'Click the empty cells to mirror the pattern across the coloured line.',
             explanation: explanation || 'Each cell mirrors its pair across the axis of symmetry.' };
  }

  const _tfLabels = (id, chapterId) =>
    (/^(g\d)?fr[-_]/i.test(id || '') || /^(g\d)?fr[-_]/i.test(chapterId || ''))
      ? ['Vrai', 'Faux'] : ['True', 'False'];

  function makeTF({ id, chapterId, difficulty, subsection, question, answer, hint, explanation }) {
    return makeMCQ({ id, chapterId, difficulty, subsection, question,
      options: _tfLabels(id, chapterId), answer: _tfLabels(id, chapterId)[answer ? 0 : 1], hint, explanation });
  }

  function makeMatch({ id, chapterId, difficulty, subsection, leftItem, correctRight, allRights, hint, explanation }) {
    const wrongOpts = shuffle((allRights || []).filter(r => r !== correctRight)).slice(0, 3);
    return makeMCQ({ id, chapterId, difficulty, subsection,
      question: `What does <b>${leftItem}</b> match to?`,
      options: [correctRight, ...wrongOpts], answer: correctRight, hint, explanation });
  }

  const STATIC_QUESTIONS = buf;
  buf.push = function (...qs) {
    qs.flat().forEach(q => q && Array.prototype.push.call(this, q));
    return this.length;
  };

  return { shuffle, makeMCQ, makeNum, makeTF, makeMatch, makeSymmetry, STATIC_QUESTIONS,
           console, 'use strict': undefined };
}

function _withPdfCapture(ctx, pdfBuf) {
  ctx.window = { PSAC_PDF_QUESTIONS: pdfBuf };
  return ctx;
}

// ── Upsert helpers ────────────────────────────────────────────────────────────
async function upsertBatch(rows) {
  const r = await fetch(`${SB_URL}/rest/v1/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SB_SRK,
      Authorization: `Bearer ${SB_SRK}`,
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  });
  if (!r.ok) {
    const msg = await r.text().catch(() => String(r.status));
    throw new Error(msg);
  }
}

// Fetch IDs that are marked protected in the DB — import will skip them.
// Returns an empty Set on any error so a missing column or unreachable DB
// never aborts the import; it just stops protecting (fail-open).
async function fetchProtectedIds(ids) {
  if (!ids.length) return new Set();
  try {
    const inList = ids.map(id => encodeURIComponent(id)).join(',');
    const r = await fetch(
      `${SB_URL}/rest/v1/questions?id=in.(${inList})&protected=eq.true&select=id&limit=${ids.length}`,
      { headers: { apikey: SB_SRK, Authorization: `Bearer ${SB_SRK}` } }
    );
    if (!r.ok) return new Set();
    const rows = await r.json().catch(() => []);
    return new Set(rows.map(r => r.id));
  } catch(_) { return new Set(); }
}

async function upsertAll(rows, label) {
  const BATCH = 200;
  for (let i = 0; i < rows.length; i += BATCH) {
    const slice = rows.slice(i, i + BATCH);
    try {
      await upsertBatch(slice);
    } catch (e) {
      console.error(`  ERROR in ${label} batch ${i}–${i + slice.length - 1}: ${e.message}`);
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  const subjectsDir = path.join(ROOT, 'subjects');
  let totalPractice = 0;
  let totalPapers   = 0;
  const allPapers   = [];

  for (const grade of [4, 5, 6]) {
    const subjects = fs.readdirSync(subjectsDir)
      .filter(d => d.startsWith(`grade${grade}-`) && fs.statSync(path.join(subjectsDir, d)).isDirectory())
      .sort();

    for (const subjectId of subjects) {
      const qDir = path.join(subjectsDir, subjectId, 'questions');
      if (!fs.existsSync(qDir)) continue;

      const buf    = [];
      const pdfBuf = [];
      const ctx    = vm.createContext(_withPdfCapture(_buildContext(buf), pdfBuf));

      const files = fs.readdirSync(qDir).filter(f => f.endsWith('.js')).sort();
      for (const file of files) {
        try {
          const code = fs.readFileSync(path.join(qDir, file), 'utf8');
          new vm.Script(code, { filename: file }).runInContext(ctx);
        } catch (e) {
          console.warn(`  skip ${subjectId}/${file}: ${e.message}`);
        }
      }

      const gradeNum = parseInt(subjectId.match(/grade(\d)/)?.[1] || '0');
      const now      = new Date().toISOString();

      // Skip questions already in DB that are marked protected (admin-edited).
      const allIds      = buf.map(q => q.id);
      const protectedIds = await fetchProtectedIds(allIds);
      if (protectedIds.size) {
        console.log(`  ⚠ Skipping ${protectedIds.size} protected question(s) in ${subjectId}`);
      }
      const toImport = buf.filter(q => !protectedIds.has(q.id));

      const practiceRows = toImport.map(q => ({
        id:            q.id,
        subject_id:    subjectId,
        chapter_id:    q.chapterId || null,
        grade:         gradeNum,
        difficulty:    q.difficulty || 1,
        is_past_paper: false,
        protected:     false,
        data:          q,
        imported_at:   now,
      }));

      console.log(`  ${subjectId}: ${toImport.length} questions, ${pdfBuf.length} past-papers`);
      await upsertAll(practiceRows, subjectId);
      totalPractice += buf.length;

      for (const q of pdfBuf) {
        allPapers.push({
          id:            q.id,
          subject_id:    subjectId,
          chapter_id:    q.chapterId || null,
          grade:         q.grade || gradeNum,
          difficulty:    0,
          is_past_paper: true,
          data:          { ...q, subjectId },
          imported_at:   now,
        });
      }
    }
    console.log(`grade${grade} done.`);
  }

  if (allPapers.length) {
    console.log(`Upserting ${allPapers.length} past-paper rows…`);
    await upsertAll(allPapers, 'past-papers');
    totalPapers = allPapers.length;
  }

  console.log(`\nDone. Run count: ${totalPractice} practice + ${totalPapers} past-papers upserted.`);
})();
