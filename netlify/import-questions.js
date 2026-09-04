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
const { createImporter, newStats, printSummary } = require('./lib/question-import');

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

  function makeMCQ({ id, chapterId, difficulty, subsection, question, options, answer, hint, explanation, learnMore }) {
    const others    = shuffle([...new Set((options || []).filter(o => o !== answer))]);
    const finalOpts = shuffle([answer, ...others.slice(0, 3)]);
    return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts, answer,
             acceptableAnswers: [answer], hint, explanation, learnMore };
  }

  function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation, learnMore }) {
    return { id, chapterId, difficulty, subsection, type: 'numeric', question,
             answer: String(answer),
             acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String),
             hint, explanation, learnMore };
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
  if (data.learnMore)   out += `,\n    learnMore:${J(data.learnMore)}`;
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

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  const subjectsDir = path.join(ROOT, 'subjects');
  const started = Date.now();
  const importer = createImporter({ url: SB_URL, key: SB_SRK });
  const totals = { practice: newStats(), papers: newStats() };
  let skippedFiles = 0;
  let aborted = false;
  const allPapers   = [];
  const seenIds = new Set();
  const addStats = (kind, stats) => {
    for (const key of Object.keys(stats)) totals[kind][key] += stats[key];
  };
  async function importGroup(rows, kind, label, onProtected) {
    // Catch cross-subject collisions rather than silently replacing another pack.
    if (rows.some(row => seenIds.has(row.id))) {
      totals[kind].scanned += rows.length;
      totals[kind].failed += rows.length;
      console.error(`  ${label}: BLOCKED — question ID already used by another group.`);
      return;
    }
    rows.forEach(row => seenIds.add(row.id));
    addStats(kind, await importer.importRows(rows, label, onProtected));
  }

  try {

  // Discovered from subjects/, not hardcoded — see build-questions.js.
  const GRADES = [...new Set(
    fs.readdirSync(path.join(ROOT, 'subjects'))
      .map(d => (d.match(/^grade(\d+)-/) || [])[1])
      .filter(Boolean)
      .map(Number)
  )].sort((a, b) => a - b);

  for (const grade of GRADES) {
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
        const practiceLength = buf.length, paperLength = pdfBuf.length;
        try {
          const code = fs.readFileSync(path.join(qDir, file), 'utf8');
          new vm.Script(code, { filename: file }).runInContext(ctx);
        } catch (e) {
          buf.length = practiceLength;
          pdfBuf.length = paperLength;
          skippedFiles++;
          console.warn(`  skip ${subjectId}/${file}: ${e.message}`);
        }
      }

      const gradeNum = parseInt(subjectId.match(/grade(\d)/)?.[1] || '0');
      const now      = new Date().toISOString();

      const practiceRows = buf.map(q => ({
        id:            q.id,
        subject_id:    subjectId,
        chapter_id:    q.chapterId || null,
        grade:         gradeNum,
        difficulty:    q.difficulty || 1,
        is_past_paper: false,
        data:          q,
        imported_at:   now,
      }));

      await importGroup(practiceRows, 'practice', subjectId, (id, data) => {
        const patched = _writeBackToJs(id, data, qDir);
        console.log(`  ${id}: ${patched ? 'local JS synced from protected DB question (.bak created)' : 'protected DB question kept; local JS needs manual sync'}`);
        return patched;
      });

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
    await importGroup(allPapers, 'papers', 'past-papers');
  }
  } catch (error) {
    aborted = true;
    console.error(`Import aborted: ${error.message}`);
    process.exitCode = 1;
  } finally {
    if (printSummary(totals, skippedFiles, Math.round((Date.now() - started) / 1000), console, aborted)) process.exitCode = 1;
  }
})();
