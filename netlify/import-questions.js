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

// Fetch protected questions from DB — returns a Map of id → data.
// Returns an empty Map on any error so a missing column or unreachable DB
// never aborts the import; it just stops protecting (fail-open).
async function fetchProtectedQuestions(ids) {
  if (!ids.length) return new Map();
  try {
    const inList = ids.map(id => encodeURIComponent(id)).join(',');
    const r = await fetch(
      `${SB_URL}/rest/v1/questions?id=in.(${inList})&protected=eq.true&select=id,data&limit=${ids.length}`,
      { headers: { apikey: SB_SRK, Authorization: `Bearer ${SB_SRK}` } }
    );
    if (!r.ok) return new Map();
    const rows = await r.json().catch(() => []);
    return new Map(rows.map(r => [r.id, r.data]));
  } catch(_) { return new Map(); }
}

// Compare the content fields that matter — NOT options (shuffled on every import).
function _questionsMatch(jsQ, dbQ) {
  if (!dbQ) return false;
  const fields = ['question', 'answer', 'hint', 'explanation', 'difficulty', 'subsection', 'type', 'chapterId'];
  return fields.every(f => (jsQ[f] ?? '') === (dbQ[f] ?? ''));
}

// Find the make*({...}) block containing the given question ID in a file's content.
// Returns { start, end } character positions, or null if not found.
function _findQuestionBlock(content, qid) {
  const escaped = qid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const idRe    = new RegExp(`id:\\s*['"\`]${escaped}['"\`]`);
  const m       = idRe.exec(content);
  if (!m) return null;

  // Scan backward from the ID to find the 'make' factory name
  let makePos = -1;
  for (let i = m.index; i >= Math.max(0, m.index - 300); i--) {
    if (content.slice(i, i + 4) === 'make') { makePos = i; break; }
  }
  if (makePos === -1) return null;

  // Find the opening paren
  const openParen = content.indexOf('(', makePos);
  if (openParen === -1 || openParen > m.index) return null;

  // Track paren depth to find the matching close paren
  let depth = 0, closePos = -1;
  for (let i = openParen; i < content.length; i++) {
    if (content[i] === '(') depth++;
    else if (content[i] === ')') { depth--; if (depth === 0) { closePos = i; break; } }
  }
  if (closePos === -1) return null;

  return { start: makePos, end: closePos + 1 };
}

// Generate a makeMCQ / makeNum JS source string from a DB data object.
// Uses JSON.stringify for all string values — handles HTML, SVG, quotes safely.
// Returns null for symmetry questions (grid data cannot be reconstructed here).
function _generateBlock(data) {
  if (data.type === 'symmetry') return null;
  const J       = v => (v == null ? 'undefined' : JSON.stringify(v));
  const factory = data.type === 'numeric' ? 'makeNum' : 'makeMCQ';
  let out = `${factory}({ id:${J(data.id)}, chapterId:${J(data.chapterId)}, difficulty:${data.difficulty || 1}`;
  if (data.subsection) out += `, subsection:${J(data.subsection)}`;
  out += `,\n    question:${J(data.question)}`;
  if (data.type === 'numeric') {
    out += `,\n    answer:${J(data.answer)}`;
    if (data.acceptableAnswers && data.acceptableAnswers.length > 1)
      out += `, acceptableAnswers:${JSON.stringify(data.acceptableAnswers)}`;
  } else if (data.options && data.options.length) {
    out += `,\n    options:${JSON.stringify(data.options)}, answer:${J(data.answer)}`;
  }
  if (data.hint)        out += `,\n    hint:${J(data.hint)}`;
  if (data.explanation) out += `,\n    explanation:${J(data.explanation)}`;
  out += ` })`;
  return out;
}

// Find a question in its JS file and replace it with the DB version.
// Creates a .bak backup of the file before modifying.
// Returns true on success, false if the file/block could not be found.
function _writeBackToJs(qid, dbData, qDir) {
  let targetFile = null, fileContent = null;
  const escaped = new RegExp(`id:\\s*['"\`]${qid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`);
  for (const file of fs.readdirSync(qDir).filter(f => f.endsWith('.js')).sort()) {
    const content = fs.readFileSync(path.join(qDir, file), 'utf8');
    if (escaped.test(content)) { targetFile = path.join(qDir, file); fileContent = content; break; }
  }
  if (!targetFile) return false;

  const block = _findQuestionBlock(fileContent, qid);
  if (!block) return false;

  const replacement = _generateBlock(dbData);
  if (!replacement) return false; // symmetry — skip

  // Back up the original before touching it
  fs.writeFileSync(targetFile + '.bak', fileContent, 'utf8');

  const updated = fileContent.slice(0, block.start) + replacement + fileContent.slice(block.end);
  fs.writeFileSync(targetFile, updated, 'utf8');
  return true;
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

      // Skip questions marked protected in DB (admin-edited).
      // Warn only when the JS file version actually differs from the DB version —
      // if they match, the protection is silent (no noise for unchanged questions).
      const allIds       = buf.map(q => q.id);
      const protectedMap = await fetchProtectedQuestions(allIds);
      const protectedIds = new Set(protectedMap.keys());

      for (const q of buf) {
        if (!protectedIds.has(q.id)) continue;
        const dbData = protectedMap.get(q.id);
        if (!_questionsMatch(q, dbData)) {
          const patched = _writeBackToJs(q.id, dbData, qDir);
          if (patched) {
            console.log(`  ✏ PATCHED: ${q.id} — JS file updated to match DB version (.bak created)`);
          } else {
            console.log(`  ⚠ PROTECTED (differs, JS not patched): ${q.id} — DB version kept`);
          }
        }
        // If content matches: skip silently
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
