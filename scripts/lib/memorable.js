'use strict';
// What counts as a MEMORABLE STIMULUS — one definition, shared.
//
// `docs/implenent.md` sets the bar: a subject's pool must generate "at least
// five blueprint-compliant full papers without repeating the same memorable
// passage, dataset or visual stimulus". A child remembers the picture, the table
// or the story — not the question id. Two different questions drawing the same
// cuboid are ONE memorable stimulus, and that is true across chapters and across
// files. Counting questions says the bank is deep; counting distinct stimuli says
// whether a paper can avoid looking familiar.
//
// ⚠⚠ WHY THIS IS A SHARED MODULE AND NOT A LOCAL FUNCTION.
//   `nce-pool-depth.js` had this definition inline and it understood exactly one
//   bank shape: `grade9-maths`, whose items are authored `task` rows carrying
//   `stimulus` / `intro` / multi-mark parts. Measured 2026-09-08, the probe could
//   not run AT ALL on the four packs that ship an adapted bank —
//
//       grade9-maths      g9m-trigonometry ... needs about 1 more
//       grade9-biology    No tasks in the built bundle for grade9-biology.
//       grade9-chemistry  No tasks in the built bundle for grade9-chemistry.
//       grade9-physics    No tasks in the built bundle for grade9-physics.
//       grade9-ict        No tasks in the built bundle for grade9-ict.
//
//   — because it filters the bundle for `type === 'task'`, and Biology, Chemistry,
//   Physics and ICT hold plain mcq/text/numeric rows that `tasksFromBank()` wraps
//   at generation time. The exit message reads "run the build", which is the wrong
//   diagnosis: the probe simply did not understand the pack. Four live subjects
//   therefore had ZERO measurement against the brief's five-paper rule while the
//   tool reported nothing wrong.
//
// ⚠ A FIGURE IN AN ADAPTED BANK LIVES IN THE QUESTION HTML, not in a `stimulus`
//   field. That is the whole reason the shapes differ, and any reader that only
//   knows `t.stimulus` sees an illustrated pack as text-only.
//
// ⚠ THE KEY IS THE SHAPE A CHILD WOULD RECOGNISE, DELIBERATELY NOT THE ID.
//   Prefer alt text: two hand-drawn SVGs of the same apparatus differ byte for
//   byte and are the same picture to the child. Fall back to a structural digest
//   only when there is no alt text to key on.

const PASSAGE_CHARS = 200;   // below this a "passage" is just a worded question
const INTRO_CHARS = 60;      // matches the original nce-pool-depth threshold
const EXTENDED_MARKS = 5;    // a 5-mark task is a story a child remembers

function _text(html) {
  return String(html == null ? '' : html)
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// A cheap stable digest. Not a hash for security — only for grouping.
function _digest(s) {
  let h = 2166136261;
  const str = String(s == null ? '' : s);
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}

// The alt/aria label a figure carries, which is the child-visible identity of it.
function _figureLabel(html) {
  const s = String(html == null ? '' : html);
  const svg = s.match(/<svg[^>]*aria-label\s*=\s*["']([^"']+)["']/i);
  if (svg) return svg[1];
  const img = s.match(/<img[^>]*\balt\s*=\s*["']([^"']+)["']/i);
  if (img) return img[1];
  return null;
}

function _figureMarkup(html) {
  const s = String(html == null ? '' : html);
  const svg = s.match(/<svg[\s\S]*?<\/svg>/i);
  if (svg) return svg[0];
  const img = s.match(/<img[^>]*>/i);
  if (img) return img[0];
  return null;
}

function _marks(task) {
  return (task.parts || []).reduce((a, p) => a + (p.marks || 0), 0);
}

// ⚠⚠ KEY THE SOURCE ROW, NEVER THE GROUPED TASK. `groupSingleMarkTasks()` bundles
//   8-10 unrelated one-mark questions under a single numbered question with
//   (a)(b)(c) parts. Reading `task.parts` therefore concatenates ten different
//   questions into one blob, and ANY length threshold then fires on the blob
//   rather than on a stimulus.
//   ⚠ MEASURED 2026-09-08, which is how this was caught: a first cut keyed on the
//     task and reported 195 "memorable stimuli" among 319 Biology questions — 61%
//     of the pack. The real distribution says that is impossible: median question
//     text is 64-71 characters across these packs, p99 is 122-136 and the LONGEST
//     single question in any of them is 223. Nothing in an adapted bank is a
//     passage; the memorable content is the FIGURES (Biology 21, Chemistry 23,
//     ICT 12) and nothing else. A metric that labels two thirds of a pack
//     memorable is not measuring memorability.
//
// `task` is a task as the assembler sees it. `source` is the bank row it was
// wrapped from, when there is one — an adapted pack keeps its figure there.
function memorableKey(task, source) {
  // An adapted bank: the row is the unit a child remembers, so judge it alone.
  if (source) return _keyOfHtml(source.question, source.image) ||
    (source.type === 'task' ? _keyOfTask(source) : null);
  return _keyOfTask(task);
}

function _keyOfHtml(html, imageUrl) {
  const label = _figureLabel(html);
  if (label) return 'fig|' + label.slice(0, 60);
  const markup = _figureMarkup(html);
  if (markup) return 'fig|' + _digest(markup);
  if (imageUrl) return 'fig|' + String(imageUrl);
  if (/<table/i.test(String(html == null ? '' : html))) return 'data|' + _digest(_text(html));
  const words = _text(html);
  if (words.length > PASSAGE_CHARS) return 'passage|' + _digest(words.slice(0, PASSAGE_CHARS));
  return null;
}

function _keyOfTask(task) {
  if (!task) return null;
  if (task.stimulus && task.stimulus.html) {
    return 'fig|' + (task.stimulus.altText || _digest(task.stimulus.html)).slice(0, 60);
  }
  if (task.intro && task.intro.length > INTRO_CHARS) {
    return 'intro|' + task.intro.slice(0, 40);
  }
  if (_marks(task) >= EXTENDED_MARKS) return 'ext|' + task.id;
  return null;
}

module.exports = { memorableKey, PASSAGE_CHARS, INTRO_CHARS, EXTENDED_MARKS };
