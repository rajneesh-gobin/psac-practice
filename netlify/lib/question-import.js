'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Question import: content comparison, preflight validation, database
//  accounting and the human-readable summary.
//
//  netlify/import-questions.js is the command; everything that decides what
//  is valid, what changed and what to print lives here so it can be tested
//  without a database and without a network.
// ══════════════════════════════════════════════════════════════════════════

// Compare every stored content field. Only answer-choice order is cosmetic.
// ⚠ `options` is the ONLY array whose order is noise — makeMCQ shuffles it on
// every load, so two identical questions never serialise the same way. Every
// other array is meaning: a multi-select `answer` list, a symmetry coordinate
// pair, the gap order of a cloze text and the part order of a task all change
// what the question asks if they are reordered.
function canonical(value, key = '') {
  if (Array.isArray(value)) {
    const items = value.map(v => canonical(v));
    return key === 'options' ? items.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))) : items;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().filter(k => value[k] !== undefined)
      .map(k => [k, canonical(value[k], k)]));
  }
  return value;
}
const contentMatches = (a, b) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
const rowMatches = (a, b) => ['subject_id', 'chapter_id', 'grade', 'difficulty', 'is_past_paper', 'data']
  .every(key => contentMatches(a[key], b[key]));

const newStats = () => ({ scanned: 0, added: 0, updated: 0, unchanged: 0,
                          protectedUnchanged: 0, protectedConflict: 0, failed: 0,
                          patched: 0, patchWarnings: 0 });
const statProtected = s => s.protectedUnchanged + s.protectedConflict;

// ── Supported question formats ────────────────────────────────────────────
// ⚠ An unknown type must FAIL preflight, never be coerced. The importer used
// to treat every non-numeric, non-symmetry record as an MCQ when writing a
// protected database row back to source, which would have rewritten a cloze
// text, a typed-text item or a structured task as makeMCQ and destroyed it.
//
// `required` is checked for presence; `check` may return a problem string.
// `regenerable` says whether a source rewrite may even be ATTEMPTED for this
// type — and even then the generated block is re-evaluated through the real
// factory and compared before anything is written (see the command).
const TYPE_RULES = {
  mcq: {
    label: 'Multiple choice', regenerable: true,
    required: ['question', 'options', 'answer'],
    check: q => {
      if (!Array.isArray(q.options) || q.options.length < 2) return 'options must be an array of at least 2';
      if (!q.options.includes(q.answer)) return 'answer is not one of the options';
      if (new Set(q.options).size !== q.options.length) return 'duplicate options';
      return null;
    },
  },
  numeric: {
    label: 'Numeric', regenerable: true,
    required: ['question', 'answer'],
    check: q => (Array.isArray(q.acceptableAnswers) && q.acceptableAnswers.length
      ? null : 'acceptableAnswers must be a non-empty array'),
  },
  text: {
    label: 'Typed text', regenerable: true,
    required: ['question', 'answer'],
    check: q => {
      if (!Array.isArray(q.acceptableAnswers) || !q.acceptableAnswers.length) return 'acceptableAnswers must be a non-empty array';
      if (typeof q.strictAccents !== 'boolean') return 'strictAccents must be a boolean';
      if (!Array.isArray(q.confusables)) return 'confusables must be an array';
      return null;
    },
  },
  // ⚠ PROJECTED FROM A MULTI-PART TASK, never authored directly. `expr` and
  //   `slots` are produced by Assessment.projectToItems() when a task is
  //   expanded, so they arrive with a `taskId` and a `partLabel` naming the
  //   part they came from. They are NOT regenerable: rewriting one back to
  //   source would have to rebuild the whole task, and the source of truth is
  //   the makeTask() call in the question file, not the projected row.
  //
  // ⚠ The importer refused these outright until now - correctly, since an
  //   unknown type must never be coerced to MCQ - which is why grade9-maths
  //   could not be imported at all. Adding a validator is what makes the type
  //   supported, not adding it to a list.
  expr: {
    label: 'Algebraic expression (projected)', regenerable: false,
    required: ['question', 'answer'],
    check: q => {
      if (typeof q.answer !== 'string' || !q.answer.trim()) return 'answer must be a non-empty string';
      if (!Array.isArray(q.acceptableAnswers) || !q.acceptableAnswers.length) {
        return 'acceptableAnswers must be a non-empty array';
      }
      if (!q.acceptableAnswers.includes(q.answer)) return 'answer is not among acceptableAnswers';
      if (!q.taskId || !q.partLabel) return 'a projected item must carry taskId and partLabel';
      return null;
    },
  },
  slots: {
    label: 'Multi-blank answer (projected)', regenerable: false,
    required: ['question', 'answer', 'slotResponse'],
    check: q => {
      const r = q.slotResponse;
      if (!r || typeof r !== 'object') return 'slotResponse must be an object';
      // ⚠ The field is `answer`, not `answers`, and it is an ARRAY OF ARRAYS:
      //   one list of accepted spellings per blank. Written as `answers` this
      //   validator rejected all 26 slots items with a message describing a
      //   field that does not exist - a validator has to be checked against
      //   the real shape, not the shape it assumes.
      if (!Array.isArray(r.answer) || !r.answer.length) return 'slotResponse.answer must be a non-empty array';
      if (!r.answer.every(a => Array.isArray(a) && a.length)) {
        return 'each blank needs a non-empty array of accepted answers';
      }
      if (r.labels && (!Array.isArray(r.labels) || r.labels.length !== r.answer.length)) {
        return 'slotResponse.labels must match the number of blanks';
      }
      // ⚠ marksByCorrect is indexed by HOW MANY blanks are right, so it needs
      //   one more entry than there are blanks (zero right ... all right).
      if (r.marksByCorrect && (!Array.isArray(r.marksByCorrect)
          || r.marksByCorrect.length !== r.answer.length + 1)) {
        return 'marksByCorrect must have one entry per possible number correct';
      }
      if (!q.taskId || !q.partLabel) return 'a projected item must carry taskId and partLabel';
      return null;
    },
  },
  // ⚠ The TASK ITSELF is stored too, alongside its projected parts. The
  //   printable NCE paper generator reads tasks, and isPoolQuestion() keeps
  //   them out of practice and exams, so both shapes have to survive a round
  //   trip through the database.
  task: {
    label: 'Multi-part task', regenerable: false,
    required: ['parts'],
    check: q => {
      if (!Array.isArray(q.parts) || !q.parts.length) return 'parts must be a non-empty array';
      const bad = q.parts.find(p => !p || !p.label || !p.prompt || typeof p.marks !== 'number');
      if (bad) return 'every part needs a label, a prompt and numeric marks';
      const labels = q.parts.map(p => p.label);
      if (new Set(labels).size !== labels.length) return 'duplicate part labels';
      const dep = q.parts.find(p => p.dependsOn && !labels.includes(p.dependsOn));
      if (dep) return 'dependsOn "' + dep.dependsOn + '" is not a label on this task';
      return null;
    },
  },
  cloze: {
    label: 'Cloze', regenerable: false,
    required: ['text', 'bank', 'gapAnswers', 'gapAlts'],
    check: q => {
      if (!Array.isArray(q.bank)) return 'bank must be an array';
      if (!Array.isArray(q.gapAlts) || !q.gapAlts.every(a => Array.isArray(a) && a.length)) return 'gapAlts must be an array of non-empty arrays';
      if (!Array.isArray(q.gapAnswers) || q.gapAnswers.length !== q.gapAlts.length) return 'gapAnswers must match gapAlts in length';
      if (q.gaps !== q.gapAlts.length) return 'gaps (' + q.gaps + ') does not match the number of answers (' + q.gapAlts.length + ')';
      if (q.gapsA + q.gapsB !== q.gaps) return 'gapsA + gapsB does not equal gaps';
      if (q.twoPart !== (q.gapsB > 0)) return 'twoPart disagrees with gapsB';
      return null;
    },
  },
  multi: {
    label: 'Multi-select', regenerable: false,
    required: ['question', 'options', 'answer'],
    check: q => {
      if (!Array.isArray(q.options) || q.options.length < 2) return 'options must be an array of at least 2';
      if (!Array.isArray(q.answer) || !q.answer.length) return 'answer must be a non-empty array';
      const missing = q.answer.filter(a => !q.options.includes(a));
      if (missing.length) return missing.length + ' answer(s) are not among the options';
      return null;
    },
  },
  symmetry: {
    label: 'Symmetry', regenerable: false,
    required: ['question', 'rows', 'cols', 'axis', 'given', 'answer'],
    check: q => {
      const pair = v => Array.isArray(v) && v.length === 2 && v.every(n => Number.isInteger(n));
      if (!Number.isInteger(q.rows) || !Number.isInteger(q.cols)) return 'rows and cols must be integers';
      if (!Array.isArray(q.given) || !q.given.every(pair)) return 'given must be [row, col] pairs';
      if (!Array.isArray(q.answer) || !q.answer.length || !q.answer.every(pair)) return 'answer must be non-empty [row, col] pairs';
      const off = q.answer.concat(q.given).find(c => c[0] < 0 || c[1] < 0 || c[0] >= q.rows || c[1] >= q.cols);
      return off ? 'cell [' + off + '] is outside the ' + q.rows + 'x' + q.cols + ' grid' : null;
    },
  },
  'symmetry-line': {
    label: 'Draw symmetry line', regenerable: false,
    required: ['question', 'shapes', 'answer'],
    check: q => {
      const line = v => Array.isArray(v) && v.length === 4 && v.every(Number.isFinite);
      const point = v => Array.isArray(v) && v.length === 2 && v.every(Number.isFinite);
      if (!Array.isArray(q.answer) || !q.answer.length || !q.answer.every(line)) {
        return 'answer must be a non-empty array of [x1, y1, x2, y2] lines';
      }
      if (!Array.isArray(q.shapes) || !q.shapes.length) return 'shapes must be a non-empty array';
      const supported = new Set(['polygon', 'rect', 'ellipse', 'circle']);
      const bad = q.shapes.find(shape => !shape || !supported.has(shape.kind)
        || (shape.kind === 'polygon' && (!Array.isArray(shape.points) || !shape.points.every(point))));
      if (bad) return 'shape is invalid or uses an unsupported primitive';
      const size = q.canvas || { width: 320, height: 240 };
      if (!Number.isFinite(size.width) || !Number.isFinite(size.height) || size.width <= 0 || size.height <= 0) {
        return 'canvas width and height must be positive numbers';
      }
      const off = q.answer.find(l => l.some((n, i) => n < 0 || n > (i % 2 ? size.height : size.width)));
      return off ? 'answer line [' + off + '] is outside the drawing canvas' : null;
    },
  },
  // PSAC French "chasse aux erreurs": a passage with deliberate mistakes the
  // child clicks. Shape read from makeErrorHunt() in engine/helpers.js, not
  // from memory — the parallel arrays are indexed against `words`, so their
  // lengths agreeing is the whole integrity of the item.
  errorhunt: {
    label: 'Error hunt', regenerable: false,
    required: ['title', 'words', 'errAt', 'errFix', 'correct'],
    check: q => {
      if (!Array.isArray(q.words) || !q.words.length) return 'words must be a non-empty array';
      if (!Array.isArray(q.errAt) || !q.errAt.length) return 'errAt must list at least one error';
      if (q.errors !== q.errAt.length) return 'errors (' + q.errors + ') does not match errAt (' + q.errAt.length + ')';
      // ⚠ Four arrays indexed in lockstep. One short array silently mis-pairs a
      //   correction with the wrong word, which reads as a bug in the content.
      for (const k of ['errFix', 'errKind', 'errWhy']) {
        if (!Array.isArray(q[k]) || q[k].length !== q.errAt.length) return k + ' must be the same length as errAt';
      }
      const off = q.errAt.find(i => !Number.isInteger(i) || i < 0 || i >= q.words.length);
      if (off !== undefined) return 'errAt index ' + off + ' is outside words';
      if (new Set(q.errAt).size !== q.errAt.length) return 'duplicate errAt index';
      // An "error" that corrects to itself can be neither clicked nor left.
      const same = q.errAt.findIndex((i, n) => q.words[i] === q.errFix[n]);
      if (same >= 0) return 'error ' + same + ' corrects to itself';
      if (typeof q.correct !== 'string' || !q.correct.trim()) return 'correct must be the corrected passage';
      if (q.maxChecks != null && !Number.isInteger(q.maxChecks)) return 'maxChecks must be an integer';
      return null;
    },
  },
  // ⚠ The shape here is engine/assessment.js's, read from makeTask() — a part
  // carries `label` and `response.kind`, NOT `id` and `kind`. A validator
  // written from memory would pass every real task and reject nothing.
  task: {
    label: 'Structured task', regenerable: false,
    required: ['parts'],
    check: q => {
      if (!Array.isArray(q.parts) || !q.parts.length) return 'parts must be a non-empty array';
      const bad = q.parts.findIndex(p => !p || typeof p !== 'object' || !p.label
        || !p.response || !p.response.kind);
      if (bad >= 0) return 'part ' + bad + ' needs a label and a response.kind';
      const labels = q.parts.map(p => p.label);
      if (new Set(labels).size !== labels.length) return 'duplicate part labels';
      if (q.marks != null && !Number.isFinite(q.marks)) return 'marks must be a number';
      return null;
    },
  },
};
const SUPPORTED_TYPES = Object.keys(TYPE_RULES);

// ── Preflight: build every row and prove the corpus before touching Supabase ─
// A source-file error is FATAL here. The old command warned about a skipped
// file in its closing summary — after it had already uploaded every group that
// loaded, so a broken file near the end left the database holding a corpus
// nobody had validated as a whole.
function preflight(corpus, options = {}) {
  const now = options.now || new Date().toISOString();
  const errors = [];
  const rows = { practice: [], papers: [] };
  const byType = {}, byGrade = {}, bySubject = {};
  const seen = new Map();
  let filesLoaded = 0, filesSkipped = 0;

  for (const e of corpus.errors || []) {
    errors.push({ kind: 'source', where: e.subjectId + '/' + e.file, message: e.message });
  }
  for (const pack of corpus.packs || []) {
    for (const f of pack.files) { if (f.failed) filesSkipped++; else filesLoaded++; }
  }

  const record = (kind, pack, q) => {
    const where = pack.subjectId + ' · ' + (q && q.id ? q.id : '(no id)');
    if (!q || typeof q !== 'object') { errors.push({ kind: 'question', where, message: 'not an object' }); return; }
    if (typeof q.id !== 'string' || !q.id.trim()) { errors.push({ kind: 'question', where, message: 'missing or non-string id' }); return; }
    if (seen.has(q.id)) {
      errors.push({ kind: 'duplicate', where, message: 'id already used by ' + seen.get(q.id) });
      return;
    }
    seen.set(q.id, pack.subjectId + ' (' + kind + ')');

    if (kind === 'practice') {
      const type = q.type;
      const rule = TYPE_RULES[type];
      if (!rule) {
        errors.push({ kind: 'type', where, message: 'unsupported type ' + JSON.stringify(type)
          + ' — add it to TYPE_RULES with a validator, or fix the source' });
        return;
      }
      const missing = rule.required.filter(k => q[k] === undefined || q[k] === null || q[k] === '');
      if (missing.length) { errors.push({ kind: 'question', where, message: type + ': missing ' + missing.join(', ') }); return; }
      const problem = rule.check(q);
      if (problem) { errors.push({ kind: 'question', where, message: type + ': ' + problem }); return; }
      const difficulty = q.difficulty || 1;
      if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 4) {
        errors.push({ kind: 'question', where, message: 'difficulty ' + q.difficulty + ' is not 1-4' }); return;
      }
      if (!q.chapterId) { errors.push({ kind: 'question', where, message: 'missing chapterId' }); return; }
      byType[type] = (byType[type] || 0) + 1;
      byGrade[pack.grade] = (byGrade[pack.grade] || 0) + 1;
      bySubject[pack.subjectId] = (bySubject[pack.subjectId] || 0) + 1;
      rows.practice.push({ id: q.id, subject_id: pack.subjectId, chapter_id: q.chapterId,
        grade: pack.grade, difficulty, is_past_paper: false, data: q, imported_at: now });
    } else {
      // ⚠ A past-paper item legitimately has no `answer` and no gradable type —
      // it is a transcription of a printed question. It is validated for
      // identity and classification only, and must never reach a practice pool.
      if (q.answer !== undefined) errors.push({ kind: 'paper', where, message: 'past-paper item carries an answer; it must never be gradable' });
      const grade = q.grade || pack.grade;
      rows.papers.push({ id: q.id, subject_id: pack.subjectId, chapter_id: q.chapterId || null,
        grade, difficulty: 0, is_past_paper: true, data: Object.assign({}, q, { subjectId: pack.subjectId }), imported_at: now });
      byGrade[grade] = (byGrade[grade] || 0) + 1;
    }
  };

  for (const pack of corpus.packs || []) {
    if (!Number.isInteger(pack.grade) || pack.grade < 1) {
      errors.push({ kind: 'pack', where: pack.subjectId, message: 'pack directory name carries no grade number' });
      continue;
    }
    for (const q of pack.practice) record('practice', pack, q);
    for (const q of pack.papers)   record('paper',    pack, q);
  }

  return {
    ok: errors.length === 0,
    packs: (corpus.packs || []).length,
    files: (corpus.packs || []).reduce((n, p) => n + p.files.length, 0),
    filesLoaded, filesSkipped,
    practice: rows.practice.length,
    papers: rows.papers.length,
    byType, byGrade, bySubject,
    rows, errors,
  };
}

function createImporter({ url, key, fetchImpl = globalThis.fetch, log = console }) {
  const headers = { apikey: key, Authorization: 'Bearer ' + key };
  async function request(url, options) {
    const response = await fetchImpl(url, { ...options, signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error('Database request failed (HTTP ' + response.status + ')');
    return response;
  }
  async function readExisting(ids) {
    const found = new Map();
    for (let start = 0; start < ids.length; start += 50) {
      const part = ids.slice(start, start + 50);
      const filter = part.map(id => '"' + id.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"').join(',');
      let offset = 0, total;
      do {
        const params = new URLSearchParams({ id: 'in.(' + filter + ')', select: 'id,subject_id,chapter_id,grade,difficulty,is_past_paper,protected,data', order: 'id.asc', limit: '50', offset: String(offset) });
        const response = await request(url + '/rest/v1/questions?' + params, { headers: { ...headers, Prefer: 'count=exact' } });
        const range = response.headers.get('content-range');
        if (!range || !/\/\d+$/.test(range)) throw new Error('Cannot verify complete database/protection lookup');
        total = Number(range.split('/')[1]);
        const rows = await response.json();
        if (!Array.isArray(rows) || total > part.length || (offset < total && !rows.length)) throw new Error('Incomplete database/protection lookup');
        for (const row of rows) {
          if (!part.includes(row.id) || found.has(row.id) || typeof row.protected !== 'boolean') throw new Error('Invalid database/protection lookup');
          found.set(row.id, row);
        }
        offset += rows.length;
      } while (offset < total);
      if (offset !== total) throw new Error('Database lookup count mismatch');
    }
    return found;
  }

  // Split a group into what the database says it is. No writes, so --dry-run
  // and the live path classify through exactly the same code.
  function classify(rows, existing) {
    const stats = newStats();
    stats.scanned = rows.length;
    const pending = [], conflicts = [];
    for (const row of rows) {
      const old = existing.get(row.id);
      if (old && old.protected) {
        if (contentMatches(row.data, old.data)) stats.protectedUnchanged++;
        else { stats.protectedConflict++; conflicts.push({ row, dbData: old.data }); }
      } else if (old && rowMatches(row, old)) stats.unchanged++;
      else pending.push(row);
    }
    stats.added   = pending.filter(r => !existing.has(r.id)).length;
    stats.updated = pending.length - stats.added;
    return { stats, pending, conflicts };
  }

  async function classifyRows(rows, label) {
    const stats = newStats();
    stats.scanned = rows.length;
    if (!rows.length) return { stats, pending: [], conflicts: [] };
    try {
      const ids = rows.map(r => r.id);
      if (ids.some(id => typeof id !== 'string' || !id) || new Set(ids).size !== ids.length) throw new Error('Missing or duplicate question IDs');
      const existing = await readExisting(ids);
      const split = classify(rows, existing);
      log.log('  ' + label + ': ' + split.stats.added + ' new, ' + split.stats.updated + ' updated, '
        + split.stats.unchanged + ' unchanged, ' + statProtected(split.stats) + ' protected ('
        + split.stats.protectedConflict + ' conflicting)');
      return split;
    } catch (error) {
      stats.failed = rows.length;
      log.error('  ' + label + ': BLOCKED — ' + error.message + '. Nothing classified for this group.');
      return { stats, pending: [], conflicts: [], error };
    }
  }

  async function importRows(rows, label, onProtected, onWritten) {
    const stats = newStats();
    stats.scanned = rows.length;
    if (!rows.length) return stats;
    let existing;
    try {
      const ids = rows.map(r => r.id);
      if (ids.some(id => typeof id !== 'string' || !id) || new Set(ids).size !== ids.length) throw new Error('Missing or duplicate question IDs');
      existing = await readExisting(ids);
    } catch (error) {
      stats.failed = rows.length;
      log.error('  ' + label + ': BLOCKED — ' + error.message + '. No rows written for this group.');
      return stats;
    }
    const split = classify(rows, existing);
    stats.protectedUnchanged = split.stats.protectedUnchanged;
    stats.protectedConflict  = split.stats.protectedConflict;
    stats.unchanged          = split.stats.unchanged;
    for (const conflict of split.conflicts) {
      if (!onProtected) continue;
      try {
        if (onProtected(conflict.row.id, conflict.dbData, conflict.row.data)) stats.patched++;
        else stats.patchWarnings++;
      } catch (error) {
        stats.patchWarnings++;
        log.error('  ' + conflict.row.id + ': local sync failed — ' + error.message);
      }
    }
    const pending = split.pending;
    for (let start = 0; start < pending.length; start += 200) {
      const batch = pending.slice(start, start + 200);
      try {
        const response = await request(url + '/rest/v1/questions', {
          method: 'POST', headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=representation' },
          body: JSON.stringify(batch),
        });
        const saved = await response.json();
        if (!Array.isArray(saved) || saved.length !== batch.length || new Set(saved.map(r => r.id)).size !== batch.length) throw new Error('Write response could not be verified');
        const byId = new Map(saved.map(r => [r.id, r]));
        for (const row of batch) {
          if (!byId.has(row.id) || !rowMatches(row, byId.get(row.id))) { stats.failed++; continue; }
          if (existing.has(row.id)) stats.updated++; else stats.added++;
          if (onWritten) onWritten(row);
        }
      } catch (error) {
        stats.failed += batch.length;
        log.error('  ' + label + ': ' + batch.length + ' writes failed or unverified — ' + error.message);
      }
    }
    log.log('  ' + label + ': ' + stats.added + ' new, ' + stats.updated + ' updated, ' + stats.unchanged
      + ' unchanged, ' + statProtected(stats) + ' protected (' + stats.protectedConflict + ' conflicting), '
      + stats.failed + ' failed/unverified');
    return stats;
  }

  // ── Read-after-write ─────────────────────────────────────────────────────
  // ⚠ NOT a row count. The table legitimately holds protected and historical
  // rows outside this corpus, so a global count proves nothing. This re-reads
  // the rows this run intended to write, in a fresh request, and compares the
  // canonical content field by field.
  async function verifyRows(rows) {
    const result = { ran: true, checked: rows.length, missing: [], mismatched: [], error: null, ok: true };
    if (!rows.length) return result;
    try {
      const found = await readExisting(rows.map(r => r.id));
      for (const row of rows) {
        const live = found.get(row.id);
        if (!live) result.missing.push(row.id);
        else if (!rowMatches(row, live)) result.mismatched.push(row.id);
      }
    } catch (error) {
      result.error = error.message;
    }
    result.ok = !result.error && !result.missing.length && !result.mismatched.length;
    return result;
  }

  return { importRows, classifyRows, verifyRows, readExisting };
}

// ── The summary a non-technical operator reads ───────────────────────────
const MODE_LABEL = { check: 'CHECK ONLY', 'dry-run': 'DRY RUN', live: 'LIVE IMPORT' };
const RULE = '='.repeat(60);
const num = n => Number(n || 0).toLocaleString('en-GB');

function table(rows, headings, out) {
  const all = [headings].concat(rows);
  const widths = headings.map((_, c) => Math.max.apply(null, all.map(r => String(r[c]).length)));
  const line = r => r.map((cell, c) => c === 0 ? String(cell).padEnd(widths[c]) : String(cell).padStart(widths[c] + 3)).join('');
  out(line(headings));
  for (const r of rows) out(line(r));
}

// Every printed total must be derivable from every other one. A summary whose
// halves disagree is worse than no summary: it reads as authoritative.
function accountingProblems(report) {
  const p = report.preflight, d = report.database, out = [];
  if (p.practice + p.papers !== p.total) out.push('corpus total ' + p.total + ' != practice ' + p.practice + ' + past papers ' + p.papers);
  if (!d) return out;
  const classified = d.added + d.updated + d.unchanged + d.protectedUnchanged + d.protectedConflict + d.failed;
  if (d.candidates !== classified) out.push('database candidates ' + d.candidates + ' != new+updated+unchanged+protected+failed ' + classified);
  if (d.attempted !== d.added + d.updated + d.failed) out.push('writes attempted ' + d.attempted + ' != new+updated+failed ' + (d.added + d.updated + d.failed));
  if (d.verified + d.failed !== d.attempted) out.push('writes verified ' + d.verified + ' + failed ' + d.failed + ' != attempted ' + d.attempted);
  return out;
}

function decideOutcome(report) {
  const p = report.preflight, d = report.database, v = report.verification;
  if (!p.ok || p.filesSkipped) return { text: 'CHECK FAILED — nothing was written', ok: false,
    next: 'Fix the source files and question errors listed above, then run --check again. No database rows were touched.' };
  if (report.accounting.length) return { text: 'IMPORT INCOMPLETE — review required', ok: false,
    next: 'The printed totals do not balance; treat every count above as unreliable and rerun --check.' };
  if (report.mode === 'check') return { text: 'CHECK PASSED — nothing was written', ok: true, next: null };
  if (d && d.failed) return { text: 'IMPORT INCOMPLETE — review required', ok: false,
    next: 'Some writes failed or could not be verified. They may or may not have reached the database — rerun the import; it is idempotent.' };
  if (v && v.ran && !v.ok) return { text: 'IMPORT INCOMPLETE — review required', ok: false,
    next: 'Read-after-write verification did not find every intended row. Rerun the import and do not assume the corpus is live.' };
  if (report.patch && report.patch.warnings) return { text: 'IMPORT INCOMPLETE — review required', ok: false,
    next: report.patch.warnings + ' protected question(s) could not be synced back to local source safely. The database version was kept and the source left untouched — reconcile by hand using the conflict report.' };
  if (d && d.protectedConflict) return { text: 'IMPORT INCOMPLETE — review required', ok: false,
    next: d.protectedConflict + ' protected database question(s) differ from local source. The database version was kept. Review the conflict report and reconcile by hand.' };
  if (report.mode === 'dry-run') return { text: 'DRY RUN COMPLETE — nothing was written', ok: true, next: null };
  if (d && !d.attempted) return { text: 'NO CHANGES NEEDED', ok: true, next: null };
  return { text: 'SUCCESS — all changes verified', ok: true, next: null };
}

function buildReport(input) {
  const p = input.preflight;
  const report = {
    version: 1,
    mode: input.mode,
    target: input.target || null,
    elapsedSeconds: input.elapsedSeconds || 0,
    aborted: !!input.aborted,
    preflight: {
      ok: p.ok, packs: p.packs, files: p.files, filesLoaded: p.filesLoaded, filesSkipped: p.filesSkipped,
      practice: p.practice, papers: p.papers, total: p.practice + p.papers,
      byType: p.byType, byGrade: p.byGrade, bySubject: p.bySubject,
      errorCount: p.errors.length, errors: p.errors,
    },
    database: input.database || null,
    patch: input.patch || null,
    verification: input.verification || null,
    reportPath: input.reportPath || null,
  };
  report.accounting = accountingProblems(report);
  const outcome = input.aborted
    ? { text: 'IMPORT INCOMPLETE — review required', ok: false,
        next: 'The command stopped before finishing. Rerun --check, then the import; it is idempotent.' }
    : decideOutcome(report);
  report.outcome = outcome.text;
  report.nextAction = outcome.next;
  report.exitCode = outcome.ok ? 0 : 1;
  return report;
}

function printReport(report, log = console) {
  const out = text => log.log(text);
  const p = report.preflight, d = report.database;
  out('');
  out(RULE);
  out('QUESTION IMPORT — ' + (MODE_LABEL[report.mode] || report.mode));
  if (report.target) out('Target: ' + report.target);
  out(RULE);
  out('Preflight: ' + (p.ok && !p.filesSkipped ? 'PASSED' : 'FAILED'));
  out(num(p.packs) + ' subject packs · ' + num(p.files) + ' source files · '
    + num(p.filesLoaded) + ' loaded · ' + num(p.filesSkipped) + ' skipped');
  out('');
  table([['Questions loaded', num(p.practice), num(p.papers), num(p.total)]],
    ['Question corpus', 'Practice', 'Past papers', 'Total'], out);
  out('');
  table(Object.keys(p.byType).sort((a, b) => p.byType[b] - p.byType[a])
    .map(t => [(TYPE_RULES[t] ? TYPE_RULES[t].label : t), num(p.byType[t])]), ['Type', 'Count'], out);
  out('');
  table(Object.keys(p.byGrade).sort((a, b) => Number(a) - Number(b))
    .map(g => ['Grade ' + g, num(p.byGrade[g])]), ['Grade', 'Questions'], out);
  if (report.mode === 'check') {
    out('');
    table(Object.keys(p.bySubject).sort().map(s => [s, num(p.bySubject[s])]), ['Subject pack', 'Practice'], out);
  }
  if (d) {
    out('');
    table([
      ['New', num(d.added)], ['Updated', num(d.updated)], ['Unchanged', num(d.unchanged)],
      ['Protected unchanged', num(d.protectedUnchanged)], ['Protected conflicts', num(d.protectedConflict)],
      ['Failed / unverified', num(d.failed)],
    ], [report.mode === 'dry-run' ? 'Database would be' : 'Database result', 'Count'], out);
    out('');
    out('Database candidates: ' + num(d.candidates)
      + '   writes ' + (report.mode === 'dry-run' ? 'that would be attempted' : 'attempted') + ': ' + num(d.attempted)
      + (report.mode === 'dry-run' ? '' : '   verified: ' + num(d.verified) + '   failed/unverified: ' + num(d.failed)));
    out('"Loaded" is every question read from source. "Attempted" is only new + updated —');
    out('an unchanged row is deliberately not rewritten, and that is not a failure.');
    out('"Protected" means the database version wins; it is a problem only when it');
    out('CONFLICTS with the local source. "Verified" means the row was read back.');
  }
  if (report.patch) {
    out('');
    out('Local protected-source files patched: ' + num(report.patch.patched)
      + '   left for manual review: ' + num(report.patch.warnings));
    if (report.patch.backupDir)      out('Backups: ' + report.patch.backupDir);
    if (report.patch.conflictReport) out('Conflict report (contains answers — gitignored): ' + report.patch.conflictReport);
  }
  if (report.verification && report.verification.ran) {
    const v = report.verification;
    out('');
    out('Database verification');
    out('  Rows re-read: ' + num(v.checked));
    out('  Result: ' + (v.ok ? 'PASSED — every intended write was read back with matching content'
      : 'FAILED — ' + (v.error ? v.error : v.missing.length + ' missing, ' + v.mismatched.length + ' content mismatch')));
    for (const id of v.missing.slice(0, 5))    out('    missing:    ' + id);
    for (const id of v.mismatched.slice(0, 5)) out('    mismatched: ' + id);
  }
  if (p.errors.length) {
    out('');
    out('Problems: ' + num(p.errors.length));
    for (const e of p.errors.slice(0, 20)) out('  ' + String(e.kind).padEnd(9) + ' ' + e.where + ': ' + e.message);
    if (p.errors.length > 20) out('  ... and ' + num(p.errors.length - 20) + ' more'
      + (report.reportPath ? ' — full list in ' + report.reportPath : ' — rerun with --report <path> for the full list'));
  }
  for (const problem of report.accounting) out('ACCOUNTING ERROR: ' + problem);
  out('');
  out('Elapsed: ' + report.elapsedSeconds + 's');
  out(report.outcome);
  if (report.nextAction) out('Next: ' + report.nextAction);
  out(RULE);
  return report.exitCode;
}

// ⚠ The machine-readable report must never carry an answer or a credential.
// It is written only when asked for, and it is a bug report, not a corpus dump.
function redactedReport(report) {
  const strip = e => ({ kind: e.kind, where: e.where, message: e.message });
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    mode: report.mode,
    target: report.target,
    outcome: report.outcome,
    exitCode: report.exitCode,
    elapsedSeconds: report.elapsedSeconds,
    preflight: Object.assign({}, report.preflight, { errors: report.preflight.errors.map(strip) }),
    database: report.database,
    patch: report.patch,
    verification: report.verification && { ran: report.verification.ran, ok: report.verification.ok,
      checked: report.verification.checked, missing: report.verification.missing.length,
      mismatched: report.verification.mismatched.length, error: report.verification.error },
    accounting: report.accounting,
  };
}

module.exports = { createImporter, contentMatches, rowMatches, canonical, newStats, statProtected,
                   preflight, TYPE_RULES, SUPPORTED_TYPES,
                   buildReport, printReport, accountingProblems, redactedReport };
