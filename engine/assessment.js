'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  ASSESSMENT SCHEMA - the NCE-shaped question model
//
//  The Grades 4-6 PSAC bank is a flat list of independent questions, each with
//  one answer and no marks. That is genuinely what a PSAC paper looks like.
//  An NCE Grade 9 paper is not: measured over five years of MES Mathematics
//  papers (docs/nce-grade9/exam-blueprints.md), a paper is ~31 numbered TASKS
//  worth 100 marks, where a task may print one stimulus and hang several parts
//  off it - (a), (b)(i), (b)(ii) - each with its own marks, its own response
//  format, and sometimes an explicit dependency on an earlier part.
//
//  So this file adds a TASK on top of the existing question, and deliberately
//  does not replace it:
//
//    task  { id, chapterId, subsection, difficulty, stimulus?, parts[] }
//    part  { label, prompt, marks, response, hint?, explanation?, rubric?,
//            dependsOn? }
//
//  ⚠ A LEGACY QUESTION IS STILL A LEGACY QUESTION. Nothing here changes
//    makeMCQ/makeNum/makeTF/makeMatch/makeSymmetry/makeCloze/makeText or the
//    13,079 Grades 4-6 items they build. scripts/test-grade456-regression.js
//    is the guard that says so, and it is run on every batch.
//
//  ⚠ TWO RENDERERS, ONE SCHEMA. Online practice and the online exam consume
//    projectToItems(), which flattens a task's AUTO-MARKABLE parts into the
//    legacy question shape the existing renderers already draw. The printable
//    paper consumes the task itself, with its stimulus, its numbering, its
//    marks and its non-auto-markable parts. A drawing or construction task is
//    therefore present on the printed paper with a rubric and ABSENT from the
//    online pool, rather than being quietly downgraded into an easier MCQ.
//
//  ⚠ THIS IS NOT A COMPUTER ALGEBRA SYSTEM. normaliseExpression() below
//    handles the forms the real papers actually ask for - integers, decimals,
//    fractions, multiples of pi, and simple sums of terms. Anything beyond
//    that must be listed in `accept`. A normaliser that silently guesses is
//    worse than one that says no, because a wrong "correct" is invisible.
// ══════════════════════════════════════════════════════════════════════════

(function (root) {

// ── Response kinds ────────────────────────────────────────────────────────
// autoMark: false is a promise to the printable generator that this part
// carries a rubric and will never be graded by a machine. It is the same
// mechanism that keeps `cloze` out of getStaticQs(), generalised.
const RESPONSE_KINDS = {
  choice:     { autoMark: true,  variants: ['options', 'circle', 'tick'] },
  multi:      { autoMark: true },
  number:     { autoMark: true },
  expression: { autoMark: true },
  blanks:     { autoMark: true },
  cells:      { autoMark: true },
  written:    { autoMark: false },
  drawing:    { autoMark: false },
};

const isAutoMarked = kind => !!(RESPONSE_KINDS[kind] && RESPONSE_KINDS[kind].autoMark);

// ── Normalisation ─────────────────────────────────────────────────────────

// Unicode a paper uses vs ASCII a child types. Both must compare equal.
function normaliseText(s) {
  return String(s == null ? '' : s)
    // ⚠ WRITTEN AS ESCAPES, DELIBERATELY. This class held the three dash
    //   characters as literals and a global "tidy the em dashes" pass across
    //   engine/ replaced the U+2014 inside it with a plain hyphen, so
    //   "3—4" silently stopped folding to "3-4" while the line still read
    //   correctly. A cosmetic sweep cannot change a character it cannot see.
    .replace(/[\u2212\u2013\u2014]/g, '-')   // minus, en dash, em dash
    .replace(/[×⋅]/g, '*')            // ×, ⋅
    .replace(/÷/g, '/')                    // ÷
    .replace(/[‘’ʼ´`]/g, "'")
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const _gcd = (a, b) => (b ? _gcd(b, a % b) : Math.abs(a));

// A rational, or null when the string is not one. Handles "3/4", "-3/4",
// "0.75", "1 1/2" (mixed number, which the papers do use).
function toRational(s) {
  const t = normaliseText(s).replace(/\s*\/\s*/g, '/').replace(/,/g, '');
  let m;
  if ((m = t.match(/^(-?\d+)\s+(\d+)\/(\d+)$/))) {           // mixed: 1 1/2
    const whole = +m[1], n = +m[2], d = +m[3];
    if (!d) return null;
    const sign = whole < 0 ? -1 : 1;
    return reduce(Math.abs(whole) * d + n === 0 ? 0 : sign * (Math.abs(whole) * d + n), d);
  }
  if ((m = t.match(/^(-?\d+)\/(-?\d+)$/))) {                 // 3/4
    const d = +m[2];
    return d ? reduce(+m[1], d) : null;
  }
  if ((m = t.match(/^-?\d+(\.\d+)?$/))) {                    // 12 or 0.75
    const dec = (m[1] || '').length ? (m[1].length - 1) : 0;
    const d = Math.pow(10, dec);
    return reduce(Math.round(parseFloat(t) * d), d);
  }
  return null;
  function reduce(n, d) {
    if (d < 0) { n = -n; d = -d; }
    const g = _gcd(n, d) || 1;
    return { n: n / g, d: d / g };
  }
}

const ratEq = (a, b) => !!a && !!b && a.n === b.n && a.d === b.d;

// "14π", "14pi", "14 x pi", "π/2" -> { k: rational, pi: true }.
// Anything with no pi returns pi:false and its rational value, so a plain
// number flows through the same comparison.
function toPiForm(s) {
  let t = normaliseText(s).toLowerCase().replace(/π/g, 'pi');
  if (!/pi/.test(t)) {
    const r = toRational(t);
    return r ? { k: r, pi: false } : null;
  }
  t = t.replace(/\s*\*\s*/g, '').replace(/\s+/g, '');
  let m;
  if (t === 'pi') return { k: { n: 1, d: 1 }, pi: true };
  if ((m = t.match(/^(-?[\d.\/]+)pi$/))) {                   // 14pi, 3/2pi
    const r = toRational(m[1]); return r ? { k: r, pi: true } : null;
  }
  if ((m = t.match(/^pi\/(-?\d+)$/))) {                      // pi/2
    const d = +m[1]; return d ? { k: { n: 1, d }, pi: true } : null;
  }
  if ((m = t.match(/^(-?\d+)pi\/(-?\d+)$/))) {               // 3pi/2
    const d = +m[2]; return d ? toPiForm(String(+m[1]) + '/' + d + 'pi') : null;
  }
  return null;
}

// Split a simple sum into sorted canonical terms so "8 + 4x" and "4x + 8"
// compare equal. Only handles + and - at the top level, which is what the
// papers ask for ("give your answer in its simplest form").
function normaliseExpression(s) {
  const t = normaliseText(s).replace(/\s+/g, '').toLowerCase();
  if (!t) return '';
  // Never try to reorder anything with brackets, powers of a bracket, or an
  // explicit relation - those are compared literally against `accept`.
  if (/[()=<>]/.test(t)) return t;
  const parts = t.match(/[+-]?[^+-]+/g);
  if (!parts || parts.length < 2) return canonTerm(t);
  return parts.map(canonTerm).sort().join('+');

  function canonTerm(term) {
    let sign = '';
    let body = term;
    if (body[0] === '+') body = body.slice(1);
    else if (body[0] === '-') { sign = '-'; body = body.slice(1); }
    // "4x" -> coefficient 4, variable part "x"; "x" -> 1,"x"; "8" -> 8,""
    const m = body.match(/^([\d.\/]*)(.*)$/);
    let coef = m[1], vars = m[2];
    if (vars) {
      // x*y and y*x are the same product.
      vars = vars.replace(/\*/g, '').split('').sort().join('');
      if (coef === '' || coef === '1') coef = '1';
    } else if (coef === '') {
      coef = body;
    }
    const r = toRational(coef);
    const c = r ? (r.d === 1 ? String(r.n) : r.n + '/' + r.d) : coef;
    return sign + c + (vars ? '*' + vars : '');
  }
}

// ── Marking, one function per auto-markable kind ──────────────────────────
// Every one returns { correct, earned } so partial credit is expressible.
// `given` is always a string or an array of strings - whatever the renderer
// stored - never a live DOM value.

function markNumber(response, given) {
  const marks = response._marks || 1;
  const accept = [response.answer].concat(response.accept || []);
  const g = normaliseText(given).replace(/ /g, ' ');
  if (!g) return { correct: false, earned: 0 };
  // A unit or currency typed by a child who was already shown it on the answer
  // line is not a mistake. Strip a trailing unit and a LEADING prefix before
  // comparing.
  // ⚠ The prefix half was missing and it is not a corner case: the answer line
  //   prints "Answer: Rs ................", so writing "Rs 210 000" is the
  //   most natural thing a child can do, and it was being marked wrong.
  const rx = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let stripped = g;
  if (response.unit) stripped = stripped.replace(new RegExp('\\s*' + rx(response.unit) + '$', 'i'), '').trim();
  if (response.prefix) stripped = stripped.replace(new RegExp('^' + rx(response.prefix) + '\\s*', 'i'), '').trim();
  for (const a of accept) {
    if (a == null) continue;
    if (normaliseText(a).toLowerCase() === stripped.toLowerCase()) return { correct: true, earned: marks };
    const ra = toPiForm(a), rg = toPiForm(stripped);
    if (ra && rg && ra.pi === rg.pi && ratEq(ra.k, rg.k)) return { correct: true, earned: marks };
    // A tolerance is opt-in. Without one, 2.24 is NOT 2.236 - the papers are
    // explicit about the accuracy they want ("to the nearest whole number"),
    // and silently accepting a rounder answer teaches the wrong habit.
    if (response.tolerance != null) {
      const na = parseFloat(normaliseText(a)), ng = parseFloat(stripped);
      if (isFinite(na) && isFinite(ng) && Math.abs(na - ng) <= response.tolerance) {
        return { correct: true, earned: marks };
      }
    }
  }
  return { correct: false, earned: 0 };
}

function markExpression(response, given) {
  const marks = response._marks || 1;
  const accept = [response.answer].concat(response.accept || []);
  const g = normaliseExpression(given);
  if (!g) return { correct: false, earned: 0 };
  for (const a of accept) {
    if (a == null) continue;
    if (normaliseExpression(a) === g) return { correct: true, earned: marks };
    const ra = toPiForm(a), rg = toPiForm(given);
    if (ra && rg && ra.pi === rg.pi && ratEq(ra.k, rg.k)) return { correct: true, earned: marks };
  }
  return { correct: false, earned: 0 };
}

function markChoice(response, given) {
  const marks = response._marks || 1;
  const ok = normaliseText(given) === normaliseText(response.answer);
  return { correct: ok, earned: ok ? marks : 0 };
}

function markMulti(response, given) {
  const marks = response._marks || 1;
  let chosen = given;
  if (typeof given === 'string') { try { chosen = JSON.parse(given || '[]'); } catch { chosen = []; } }
  if (!Array.isArray(chosen)) chosen = [];
  const want = (response.answer || []).map(normaliseText).sort();
  const got = chosen.map(normaliseText).sort();
  const ok = want.length === got.length && want.every((v, i) => v === got[i]);
  return { correct: ok, earned: ok ? marks : 0 };
}

// blanks and cells are the two kinds that carry PARTIAL credit, because the
// paper does: 2025 Q21(a) is three table cells for [2], and 2025 Q25 is
// "x = ......, y = ......" for [4]. Marks are shared as evenly as they divide,
// remainder to the earliest blanks, and the part total is never exceeded.
// ⚠ `partial: false` means ALL-OR-NOTHING, and it is not a convenience - the
//   papers mark this way. NCE 2024 Q14(a) asks for five decimals in ascending
//   order and is worth [1]: the order is right or it is not, and five blanks
//   cannot share one mark. Table completion is the opposite case (2025 Q21(a),
//   three cells for [2]) and keeps partial credit, which is the default.
function markSlots(response, given) {
  const marks = response._marks || 1;
  const want = response.answer || [];
  let got = given;
  if (typeof given === 'string') { try { got = JSON.parse(given || '[]'); } catch { got = []; } }
  if (!Array.isArray(got)) got = [];
  const allOrNothing = response.partial === false;
  // ⚠ `marksByCorrect` indexed by HOW MANY blanks are right, because that is
  //   how a real mark scheme is written. NCE 2025 Q21(a) is three table cells
  //   for [2] - three cells cannot split two marks evenly, and the marker's
  //   rule is "1 mark for two correct, 2 marks for all three". Expressing that
  //   as a table is honest; inventing 0.67 of a mark per cell is not.
  const byCorrect = Array.isArray(response.marksByCorrect) ? response.marksByCorrect : null;
  const per = (allOrNothing || byCorrect) ? want.map(() => 0) : shareMarks(marks, want.length);
  let earned = 0, right = 0;
  for (let i = 0; i < want.length; i++) {
    const alts = Array.isArray(want[i]) ? want[i] : [want[i]];
    const sub = { answer: alts[0], accept: alts.slice(1), _marks: per[i], tolerance: response.tolerance, unit: response.unit };
    const r = response.numeric === false ? markExpression(sub, got[i]) : markNumber(sub, got[i]);
    if (r.correct) { earned += per[i]; right++; }
  }
  const allRight = right === want.length && want.length > 0;
  if (byCorrect) return { correct: allRight, earned: byCorrect[right] || 0 };
  if (allOrNothing) return { correct: allRight, earned: allRight ? marks : 0 };
  return { correct: allRight, earned };
}

function shareMarks(total, n) {
  if (n <= 0) return [];
  const base = Math.floor(total / n);
  let rem = total - base * n;
  const out = [];
  for (let i = 0; i < n; i++) out.push(base + (rem-- > 0 ? 1 : 0));
  return out;
}

const MARKERS = {
  choice: markChoice, multi: markMulti, number: markNumber,
  expression: markExpression, blanks: markSlots, cells: markSlots,
};

// The single entry point every consumer uses. A non-auto-marked part always
// answers { correct: null } - "a machine cannot say", which is a different
// thing from "wrong" and must stay different all the way to the report.
function markPart(part, given) {
  const kind = part.response && part.response.kind;
  if (!isAutoMarked(kind)) return { correct: null, earned: 0, manual: true };
  const res = Object.assign({}, part.response, { _marks: part.marks });
  return Object.assign({ manual: false }, MARKERS[kind](res, given));
}

// ── Validation ────────────────────────────────────────────────────────────
// Throwing at authoring time is the point. A question that is wrong in a way
// the schema can see must never reach a child, and a silent default is how
// `subsection` went missing from makeSymmetry for six questions.

function validateTask(task) {
  const errs = [];
  const at = w => `task ${task && task.id ? task.id : '(no id)'}: ${w}`;

  if (!task || typeof task !== 'object') return ['task is not an object'];
  if (!task.id) errs.push(at('no id'));
  if (!task.chapterId) errs.push(at('no chapterId'));
  if (!(task.difficulty >= 1 && task.difficulty <= 4)) errs.push(at('difficulty must be 1-4'));
  if (!Array.isArray(task.parts) || !task.parts.length) errs.push(at('no parts'));
  if (task.stimulus && !task.stimulus.altText && /<(img|svg)/i.test(task.stimulus.html || '')) {
    errs.push(at('stimulus has a picture but no altText'));
  }

  const labels = new Set();
  (task.parts || []).forEach((p, i) => {
    const pat = w => at(`part ${p && p.label ? p.label : i + 1}: ${w}`);
    if (!p || typeof p !== 'object') { errs.push(pat('not an object')); return; }
    if (!p.label) errs.push(pat('no label'));
    if (labels.has(p.label)) errs.push(pat('duplicate label'));
    labels.add(p.label);
    if (!p.prompt) errs.push(pat('no prompt'));
    if (!Number.isInteger(p.marks) || p.marks < 1) errs.push(pat('marks must be a positive integer'));
    const r = p.response;
    if (!r || !r.kind) { errs.push(pat('no response.kind')); return; }
    if (!RESPONSE_KINDS[r.kind]) { errs.push(pat(`unknown response.kind "${r.kind}"`)); return; }

    if (r.kind === 'choice') {
      if (!Array.isArray(r.options) || r.options.length < 2) errs.push(pat('choice needs 2+ options'));
      else {
        if (new Set(r.options.map(normaliseText)).size !== r.options.length) errs.push(pat('choice options are not distinct'));
        const hits = r.options.filter(o => normaliseText(o) === normaliseText(r.answer)).length;
        if (hits !== 1) errs.push(pat(`the keyed answer appears ${hits} times among the options, expected exactly 1`));
      }
      if (r.variant && RESPONSE_KINDS.choice.variants.indexOf(r.variant) === -1) {
        errs.push(pat(`unknown choice variant "${r.variant}"`));
      }
    }
    if (r.kind === 'multi') {
      if (!Array.isArray(r.options) || r.options.length < 3) errs.push(pat('multi needs 3+ options'));
      if (!Array.isArray(r.answer) || r.answer.length < 1) errs.push(pat('multi needs 1+ keyed answers'));
      else if (Array.isArray(r.options)) {
        const opts = r.options.map(normaliseText);
        for (const a of r.answer) if (opts.indexOf(normaliseText(a)) === -1) errs.push(pat(`keyed answer "${a}" is not one of the options`));
      }
    }
    if (r.kind === 'number' || r.kind === 'expression') {
      if (r.answer == null || r.answer === '') errs.push(pat(`${r.kind} needs an answer`));
      if (r.tolerance != null && !(typeof r.tolerance === 'number' && r.tolerance >= 0)) {
        errs.push(pat('tolerance must be a non-negative number'));
      }
    }
    if (r.kind === 'blanks' || r.kind === 'cells') {
      if (!Array.isArray(r.answer) || !r.answer.length) errs.push(pat(`${r.kind} needs an answer array`));
      if (Array.isArray(r.marksByCorrect)) {
        if (r.marksByCorrect.length !== r.answer.length + 1) {
          errs.push(pat(`marksByCorrect needs ${r.answer.length + 1} entries (0 correct up to ${r.answer.length} correct), got ${r.marksByCorrect.length}`));
        }
        if (Math.max.apply(null, r.marksByCorrect) !== p.marks) {
          errs.push(pat(`marksByCorrect tops out at ${Math.max.apply(null, r.marksByCorrect)} but the part is worth ${p.marks}`));
        }
        for (let i = 1; i < r.marksByCorrect.length; i++) {
          if (r.marksByCorrect[i] < r.marksByCorrect[i - 1]) {
            errs.push(pat('marksByCorrect must not decrease - getting one more blank right cannot lose marks'));
            break;
          }
        }
      }
      else if (r.answer.length > p.marks && r.partial !== false) {
        // shareMarks would hand some blank 0 marks, i.e. a blank the child can
        // get right for nothing.
        // ⚠ Unless the part is marked all-or-nothing, which the papers do use:
        //   NCE 2024 Q14(a) is five decimals in ascending order for [1]. Set
        //   `partial: false` to say so, rather than inventing marks the paper
        //   does not award.
        errs.push(pat(`${r.answer.length} blanks cannot share ${p.marks} mark(s) - set partial: false if the paper marks it all-or-nothing`));
      }
    }
    if (!isAutoMarked(r.kind) && !p.rubric) {
      errs.push(pat(`${r.kind} cannot be auto-marked, so it must carry a rubric`));
    }
    if (isAutoMarked(r.kind) && !p.explanation) errs.push(pat('no explanation'));
    if (p.dependsOn && !(task.parts || []).some(o => o && o.label === p.dependsOn)) {
      errs.push(pat(`dependsOn "${p.dependsOn}" is not a label on this task`));
    }
  });

  return errs;
}

// ── The factory ───────────────────────────────────────────────────────────

function makeTask(spec) {
  const task = {
    id: spec.id,
    chapterId: spec.chapterId,
    subsection: spec.subsection,
    difficulty: spec.difficulty,
    type: 'task',
    // ⚠ The stem that comes BEFORE the diagram. The real papers read
    //   "28. The diagram shows a rectangular water tank A with dimensions
    //   80 cm by 30 cm by 60 cm." then the figure, then (a), (b). Without a
    //   place for that sentence it was folded into part (a)'s prompt, and the
    //   printed page put the diagram above text that introduced it.
    intro: spec.intro || null,
    stimulus: spec.stimulus || null,
    sectionId: spec.sectionId || null,
    source: spec.source || null,
    parts: (spec.parts || []).map(p => ({
      label: p.label,
      prompt: p.prompt,
      marks: p.marks,
      response: p.response,
      dependsOn: p.dependsOn || null,
      hint: p.hint,
      explanation: p.explanation,
      rubric: p.rubric || null,
      workingLines: p.workingLines,
    })),
  };
  task.marks = task.parts.reduce((s, p) => s + (p.marks || 0), 0);
  const errs = validateTask(task);
  if (errs.length) throw new Error('makeTask: ' + errs.join('; '));
  return task;
}

// ── Numbering ─────────────────────────────────────────────────────────────
// 'a' -> "(a)", 'b.i' -> "(b)(i)". The label is authored as a dotted path so
// the notation lives in one place instead of in every question file.
const _ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
function partNotation(label) {
  return String(label || '').split('.').map(s => `(${s})`).join('');
}
function nextRoman(n) { return _ROMAN[n] || String(n + 1); }

// ── Projection to the legacy online shape ─────────────────────────────────
// ⚠ This is the ONLY bridge between a task and the existing practice/exam
//   renderers, and it deliberately drops the parts a machine cannot mark.
//   Those parts are not lost - the printable generator reads the task itself.
//   Dropping them here is what stops a "draw the perpendicular bisector"
//   instruction from reaching a child as a number pad.
function projectToItems(task) {
  const out = [];
  // ⚠ The intro travels with the projected item as well. Without it an online
  //   question reads "Tank A is 2/3 full of water" with no tank ever having
  //   been described - the sentence that sets the question up lives on the
  //   task, not on the part.
  const lead = task.intro ? task.intro + '\n' : '';
  const stim = task.stimulus && !task.stimulus.printOnly ? task.stimulus.html + '\n' : '';
  task.parts.forEach(p => {
    const kind = p.response && p.response.kind;
    if (!isAutoMarked(kind)) return;
    // A part that consumes an earlier part's answer makes no sense on its own.
    if (p.dependsOn) return;
    const base = {
      id: `${task.id}-${String(p.label).replace(/\./g, '')}`,
      taskId: task.id, partLabel: p.label,
      chapterId: task.chapterId, subsection: task.subsection,
      difficulty: task.difficulty, marks: p.marks,
      question: lead + stim + p.prompt,
      hint: p.hint, explanation: p.explanation,
    };
    const r = p.response;
    if (kind === 'choice') {
      out.push(Object.assign(base, {
        type: 'mcq', options: r.options.slice(), answer: r.answer,
        acceptableAnswers: [r.answer],
      }));
    } else if (kind === 'multi') {
      out.push(Object.assign(base, {
        type: 'multi', options: r.options.slice(), answer: r.answer.slice(),
        acceptableAnswers: [],
      }));
    } else if (kind === 'number' || kind === 'expression') {
      // ⚠ 'expression' gets its OWN type, not 'numeric'. The numeric renderer
      //   sets inputmode="decimal" and draws a digit pad - under "Simplify
      //   (a⁵)⁴" that is the same defect a French passage hit, and a digit pad
      //   cannot even type the answer. `expr` is a plain text input marked by
      //   markExpression(), so a^8 and 8+4x behave properly.
      out.push(Object.assign(base, {
        type: kind === 'expression' ? 'expr' : 'numeric',
        question: base.question + (r.unit ? ` <span class="q-unit">(answer in ${r.unit})</span>` : ''),
        answer: String(r.answer),
        acceptableAnswers: [String(r.answer)].concat((r.accept || []).map(String)),
        unit: r.unit, prefix: r.prefix, tolerance: r.tolerance,
        responseKind: kind,
      }));
    } else if (kind === 'blanks' || kind === 'cells') {
      // ⚠ Both project to ONE type, 'slots'. They differ only in how the
      //   paper prints them - a run of answer boxes versus cells in a table -
      //   and on screen a child types into a row of boxes either way. The
      //   response object rides along so the renderer can lay out the right
      //   number of boxes and markSlots() can apply this part's own rule for
      //   sharing its marks.
      out.push(Object.assign(base, {
        type: 'slots',
        answer: (r.answer || []).map(a => String(Array.isArray(a) ? a[0] : a)).join(', '),
        acceptableAnswers: [],
        slotResponse: r,
        responseKind: kind,
      }));
    }
  });
  return out;
}

// ── Expanding a whole list of questions ───────────────────────────────────
// ⚠ ONE IMPLEMENTATION, CALLED FROM EVERY SIDE. A task is invisible to the
//   app until it is projected, and three places need the same answer: the
//   browser (question_loader.js), the bundle builder (netlify/build-questions
//   .js) and the sandbox the question service, the importer and assignment
//   re-grading all load through (netlify/lib/questions-sandbox.js). Writing
//   the loop three times is how `learnMore` and `subsection` were silently
//   stripped for months while every source file read correctly.
//
// ⚠ IDEMPOTENT BY ID, and it has to be. A bundle already carries the
//   projected items, but file:// dev injects the SOURCE files and carries
//   only tasks; a subject can also be re-fetched after a failed load. Adding
//   an item twice would be de-duped later by getMixedQuestions(), which
//   would look correct while halving the effective pool.
function expandTasks(list) {
  const have = new Set();
  for (const q of list) if (q && q.id) have.add(q.id);
  const out = [];
  for (const q of list) {
    if (!q || q.type !== 'task') continue;
    let items;
    try { items = projectToItems(q); } catch (e) { continue; }
    for (const it of items) {
      if (have.has(it.id)) continue;
      have.add(it.id);
      out.push(it);
    }
  }
  return out;
}
const API = {
  RESPONSE_KINDS, isAutoMarked,
  normaliseText, normaliseExpression, toRational, toPiForm, ratEq,
  markPart, markNumber, markExpression, markChoice, markMulti, markSlots,
  shareMarks, validateTask, makeTask, partNotation, nextRoman, projectToItems,
  expandTasks,
};

if (typeof module !== 'undefined' && module.exports) module.exports = API;
root.Assessment = API;
// The factory is also a bare global so a question file can call makeTask()
// the same way it calls makeMCQ(), with no module ceremony.
root.makeTask = makeTask;

})(typeof globalThis !== 'undefined' ? globalThis : this);
