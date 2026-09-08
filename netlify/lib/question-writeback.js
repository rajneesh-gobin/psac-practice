'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Syncing a PROTECTED database question back into its local .js source.
//
//  The rule never changes: a protected database row wins. The only question is
//  whether the local source can be rewritten to match it without loss.
//
//  ⚠ The old implementation emitted makeMCQ for every type except numeric and
//  symmetry. A protected cloze text, typed-text correction, multi-select item
//  or structured task would have been rewritten as an MCQ — silently
//  destroying the source file, with a .bak beside it as the only trace.
//
//  Two rules make that impossible now:
//    1. an EXHAUSTIVE type switch — only mcq, numeric and text have a lossless
//       source form, and an unlisted type is never regenerated;
//    2. losslessness is PROVED, not assumed. The candidate file is executed
//       alongside its siblings through the real loader, and the rewrite is
//       accepted only if the pack still loads, the target question now equals
//       the database version exactly, and no neighbouring question moved.
//
//  Anything else leaves the source untouched and becomes a conflict for a
//  human to reconcile.
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');
const { evaluateSources } = require('./questions-sandbox');
const { TYPE_RULES, contentMatches } = require('./question-import');

// ⚠ Conflict artefacts hold the DATABASE version of a question, correct
// answers included. The directory is gitignored AND carries a netlify.toml 404
// rule, because a CLI deploy uploads from local disk rather than from git.
const CONFLICT_DIRNAME = '.import-conflicts';

const FACTORY_NAMES = ['makeMCQ', 'makeNum', 'makeTF', 'makeMatch', 'makeSymmetry',
                       'makeCloze', 'makeText', 'makeTask'];

// Rebuild a factory call from a stored question object. Returns null for any
// type with no lossless source form — never a best-effort approximation.
function generateBlock(data) {
  const rule = TYPE_RULES[data && data.type];
  if (!rule || !rule.regenerable) return null;
  const J = v => (v == null ? 'undefined' : JSON.stringify(v));
  const head = 'id:' + J(data.id) + ', chapterId:' + J(data.chapterId)
    + ', difficulty:' + (data.difficulty || 1)
    + (data.subsection ? ', subsection:' + J(data.subsection) : '');
  let out;

  if (data.type === 'numeric') {
    out = 'makeNum({ ' + head + ',\n    question:' + J(data.question) + ',\n    answer:' + J(data.answer);
    if (data.acceptableAnswers && data.acceptableAnswers.length > 1)
      out += ', acceptableAnswers:' + JSON.stringify(data.acceptableAnswers);
  } else if (data.type === 'text') {
    // makeText derives acceptableAnswers as [answer, ...alsoAccept], so the
    // tail of that array is exactly what alsoAccept was.
    out = 'makeText({ ' + head + ',\n    question:' + J(data.question) + ',\n    answer:' + J(data.answer);
    const also = (data.acceptableAnswers || []).slice(1);
    if (also.length)                     out += ', alsoAccept:' + JSON.stringify(also);
    if ((data.confusables || []).length) out += ', confusables:' + JSON.stringify(data.confusables);
    if (data.strictAccents)              out += ', strictAccents:true';
  } else {
    out = 'makeMCQ({ ' + head + ',\n    question:' + J(data.question)
        + ',\n    options:' + JSON.stringify(data.options) + ', answer:' + J(data.answer);
  }
  if (data.hint)        out += ',\n    hint:' + J(data.hint);
  if (data.explanation) out += ',\n    explanation:' + J(data.explanation);
  if (data.learnMore)   out += ',\n    learnMore:' + J(data.learnMore);
  return out + ' })';
}

const idPattern = qid => new RegExp('id:\\s*[\'"`]' + String(qid).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\'"`]');

// Locate the make*({ ... }) call that declares this id.
function findQuestionBlock(content, qid) {
  const m = idPattern(qid).exec(content);
  if (!m) return null;
  let makePos = -1, factory = null;
  for (let i = m.index; i >= Math.max(0, m.index - 300); i--) {
    const name = FACTORY_NAMES.find(n => content.startsWith(n, i));
    if (name) { makePos = i; factory = name; break; }
  }
  if (makePos === -1) return null;
  const openParen = content.indexOf('(', makePos);
  if (openParen === -1 || openParen > m.index) return null;
  let depth = 0, closePos = -1;
  for (let i = openParen; i < content.length; i++) {
    if (content[i] === '(') depth++;
    else if (content[i] === ')') { depth--; if (depth === 0) { closePos = i; break; } }
  }
  return closePos === -1 ? null : { start: makePos, end: closePos + 1, factory };
}

// Attempt the sync. Returns { ok, reason }. `write` false makes it a pure
// dry run — nothing is read back differently, but no file and no backup is
// created, which is what --check and --dry-run need.
function syncProtectedSource(qid, dbData, pack, options = {}) {
  const write = options.write !== false;
  const root  = options.root || path.resolve(__dirname, '..', '..');
  const no = reason => ({ ok: false, reason });

  const rule = TYPE_RULES[dbData && dbData.type];
  if (!rule) return no('database row has unsupported type ' + JSON.stringify(dbData && dbData.type));
  if (!rule.regenerable) return no('type "' + dbData.type + '" has no lossless source form; the local file was left untouched');

  let sources;
  try {
    sources = pack.files.map(f => ({ file: f.file, code: fs.readFileSync(path.join(pack.dir, f.file), 'utf8') }));
  } catch (e) { return no('could not read the pack sources: ' + e.message); }

  const target = sources.find(s => idPattern(qid).test(s.code));
  if (!target) return no('no source file declares this id literally (generated in a loop?)');

  const block = findQuestionBlock(target.code, qid);
  if (!block) return no('could not isolate the factory call in ' + target.file);
  const replacement = generateBlock(dbData);
  if (!replacement) return no('no lossless source form for type "' + dbData.type + '"');

  const before = evaluateSources(sources);
  const candidate = sources.map(s => s === target
    ? { file: s.file, code: s.code.slice(0, block.start) + replacement + s.code.slice(block.end) }
    : s);
  const after = evaluateSources(candidate);

  if (after.errors.length) return no('the rewritten ' + target.file + ' no longer loads: ' + after.errors[0].message);
  const beforeById = new Map(before.practice.map(q => [q.id, q]));
  const afterById  = new Map(after.practice.map(q => [q.id, q]));
  if (after.practice.length !== before.practice.length) return no('the rewrite changed the question count of ' + pack.subjectId);
  if (beforeById.size !== afterById.size) return no('the rewrite changed the set of question ids');
  for (const [id, q] of afterById) {
    if (!beforeById.has(id)) return no('the rewrite introduced a new id (' + id + ')');
    if (id === qid) continue;
    if (!contentMatches(q, beforeById.get(id))) return no('the rewrite altered a neighbouring question (' + id + ')');
  }
  if (!afterById.has(qid)) return no('the rewritten source no longer produces ' + qid);
  if (!contentMatches(afterById.get(qid), dbData)) return no('the regenerated source does not reproduce the database version exactly');

  if (!write) return { ok: true, reason: null, wouldWrite: target.file };

  const backupDir = path.join(root, CONFLICT_DIRNAME, 'backups');
  fs.mkdirSync(backupDir, { recursive: true });
  fs.writeFileSync(path.join(backupDir, pack.subjectId + '__' + target.file + '.bak'), target.code, 'utf8');
  fs.writeFileSync(path.join(pack.dir, target.file), candidate.find(s => s.file === target.file).code, 'utf8');
  return { ok: true, reason: null, file: target.file, backupDir };
}

module.exports = { generateBlock, findQuestionBlock, syncProtectedSource, CONFLICT_DIRNAME, FACTORY_NAMES };
