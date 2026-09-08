'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  floor-check — finds questions that sit BELOW the grade's floor.
//
//  THE RULE IT ENFORCES
//    An item belongs in a grade only if a competent child two years younger
//    would plausibly get it wrong.
//
//  ⚠ This is NOT a difficulty checker. Difficulty 1 is legitimate and the
//    product's teaching claim depends on it — many simple questions across the
//    whole syllabus beat a handful of hard ones. What this looks for is items
//    below the floor ENTIRELY: "Quel jour vient après mercredi ?" is not a
//    Basic Grade 5 question, it is a Grade 2 question wearing a Grade 5 tag.
//    Retagging such an item to L2 fixes nothing, which is why the output is a
//    rewrite/retire list and never a difficulty suggestion.
//
//  ⚠ FLAGS ARE HINTS, NOT VERDICTS. Every rule here is a heuristic over text.
//    A flagged item is one a human should look at; it is not proven bad, and
//    nothing is edited or deleted. Read the rules that fired, not the score.
//
//  ⚠ It reads the BUILT BUNDLES, not the source files. A field can be present
//    in source and stripped at build time — that has happened here before with
//    `learnMore` and `subsection` — so the bundle is the only honest answer to
//    "what does a child actually receive". Build first:
//        node netlify/build-questions.js
//
//  USAGE
//    node scripts/floor-check.js                       # every live grade
//    node scripts/floor-check.js --grade 5             # one grade
//    node scripts/floor-check.js --pack grade5-french  # one pack
//    node scripts/floor-check.js --grade 5 --sample 8  # print example flags
//    node scripts/floor-check.js --grade 5 --json out.json
//
//  EXIT CODE is always 0. This reports; it does not gate a build. A flag rate
//  is a judgement about content, and failing CI on one would only teach people
//  to silence it.
// ══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');

// ── Exam calibration ────────────────────────────────────────────────────────
// Measured 2026-09-08 from the MES Grade 5 papers in past-papers/psac5-mes/.
// Re-derive with: pdftotext -layout -enc UTF-8 <paper>.pdf, then count words in
// the Question 1 reading text. These are the numbers a passage has to reach
// before it resembles the real thing.
const EXAM = {
  passageWords: { english: [413, 447], french: [305, 743] },
  // Share of words of 7+ letters in the real passages. The bank is compared
  // against the LOW end, so a flag means "well below the paper", not "below
  // average".
  longWordRate: { english: 0.12, french: 0.19 },
};

// ── Thresholds ──────────────────────────────────────────────────────────────
const T = {
  shortPrompt: 12,        // words — a prompt this short carries no context
  shortOption: 2,         // words — one- or two-word options
  thinExplanation: 25,    // words — nothing was actually explained
  longWordLen: 7,         // letters, matching the exam measurement
  closedSetHits: 3,       // options drawn from one Grade 1-2 closed set
  trivialOperand: 20,     // maths: every number in the prompt below this
  passageFloor: 250,      // words — below this a "passage" is not exam-shaped
  flagAt: 2,              // rule weight needed before an item is listed
};

// ── Grade 1–2 closed sets ───────────────────────────────────────────────────
// Vocabulary a child owns years before this grade. An item whose options all
// come from ONE of these sets is testing recall of that set, not the subject.
const CLOSED = {
  'days (en)': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  'days (fr)': ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
  'months (en)': ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
                  'september', 'october', 'november', 'december'],
  'months (fr)': ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout',
                  'septembre', 'octobre', 'novembre', 'decembre'],
  'colours (en)': ['red', 'blue', 'green', 'yellow', 'black', 'white', 'orange', 'brown',
                   'pink', 'purple', 'grey', 'gray'],
  'colours (fr)': ['rouge', 'bleu', 'bleue', 'vert', 'verte', 'jaune', 'noir', 'noire',
                   'blanc', 'blanche', 'orange', 'marron', 'rose', 'violet', 'gris'],
  'number words (en)': ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
                        'seventeen', 'eighteen', 'nineteen', 'twenty'],
  'number words (fr)': ['un', 'une', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit',
                        'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize',
                        'vingt', 'trente', 'quarante', 'cinquante', 'cent', 'mille'],
  'seasons (en)': ['spring', 'summer', 'autumn', 'winter', 'fall'],
  'seasons (fr)': ['printemps', 'ete', 'automne', 'hiver'],
  'greetings (en)': ['hello', 'hi', 'goodbye', 'bye', 'please', 'thanks', 'thank you', 'sorry',
                     'good morning', 'good afternoon', 'good evening', 'good night'],
  'greetings (fr)': ['bonjour', 'bonsoir', 'salut', 'au revoir', 'merci', 'bonne nuit',
                     'sil vous plait', 'sil te plait', 'de rien', 'pardon'],
};

// Prompts that ask for a straight translation or a dictionary gloss. At this
// grade the exam never does this — it asks the child to USE the word.
const TRANSLATION_PROMPT =
  /(comment (dit|ecrit)-on|comment dit on|que (veut dire|signifie)|how do you say|what is the (english|french) (word|for)|what does .{1,30} mean|translate)/i;

// ── Text helpers ────────────────────────────────────────────────────────────
const plain = h => String(h == null ? '' : h)
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&[a-z]+;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

// Strip accents so "été" and "ete" compare equal; the closed sets are unaccented.
const fold = s => String(s).toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’']/g, '');

const words = s => plain(s).split(/\s+/).filter(w => /[A-Za-zÀ-ÿ0-9]/.test(w));
const wordCount = s => words(s).length;

function hasStimulus(q) {
  const raw = String(q.question || '');
  if (/<img|<svg|<table/i.test(raw)) return true;
  return wordCount(raw) >= 40;   // a real passage or scenario, not a bare prompt
}

// ⚠ An item that mirrors an EXAM TASK is not below the floor, however short its
// prompt is. The paper's Q4 (17 marks) is literally "write the verb in brackets
// in the correct tense" and its Q7 (10 marks) "write the correct form of the word
// in brackets" — both are a one-line cue with a one-word answer. Without this
// exemption bare-recall fired on 94% of the French verb chapters, which is the
// exam's own exercise, and the report was useless.
const GAP = /(_{2,}|\u2026{2,}|\.{4,})/;
const BRACKET_CUE = /\([A-Za-z\u00C0-\u00FF\u2019' -]{2,24}\)/;
const PRODUCE = /(conjugue|conjuguez|complete|completez|complétez|mets |mettez |transforme|accorde|ecris|écris|ecrivez|écrivez|fill in|write the (correct|right) form|put the verb|complete the)/i;
// ⚠ KNOWN BLIND SPOT: a trivial item that happens to carry a blank is exempted
// too — "Le chat est ___ la table. (under)" is a Grade 2 preposition item in an
// exam-shaped wrapper. Shape alone cannot separate those, so this errs towards
// NOT flagging: a false flag on the exam's own exercise wastes a reviewer's
// time on 900 correct items, while a miss costs one item that a human reading
// the chapter will still catch.
function examShaped(q) {
  const p = plain(q.question);
  return GAP.test(p) || BRACKET_CUE.test(p) || PRODUCE.test(fold(p));
}
// Normalised question stem: lowercase, tags and punctuation gone, and the
// scaffolding words that differ between two askings of the same thing removed
// ("Which of the following is a renewable source" vs "Which one of these is a
// renewable energy source" collapse to the same stem).
function normAnswer(q) {
  return plain(q.answer).toLowerCase().replace(/[^a-z0-9.]/g, '');
}

function stemOf(q) {
  return plain(q.question).toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\b(which|of|the|these|this|following|is|are|a|an|one|what|in|below|from|list)\b/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function optionTexts(q) {
  return Array.isArray(q.options) ? q.options.map(plain).filter(Boolean) : [];
}

function longWordRate(text) {
  const ws = words(text).map(w => w.replace(/[^A-Za-zÀ-ÿ]/g, '')).filter(Boolean);
  if (!ws.length) return 1;
  return ws.filter(w => w.length >= T.longWordLen).length / ws.length;
}

function packLanguage(packId) {
  if (/-french$/.test(packId)) return 'french';
  if (/-english$/.test(packId)) return 'english';
  return null;
}

// ── Rules ───────────────────────────────────────────────────────────────────
// Each returns a reason string when it fires, or null. `weight` is how much it
// argues the item is below the floor; the flag threshold is T.flagAt.
const RULES = [
  {
    id: 'closed-set',
    weight: 3,
    why: 'options come from a set a Grade 1-2 child already owns',
    test(q) {
      const opts = optionTexts(q).map(fold);
      if (opts.length < 3) return null;
      for (const [name, members] of Object.entries(CLOSED)) {
        const hits = opts.filter(o => members.includes(o)).length;
        if (hits >= T.closedSetHits && hits >= opts.length - 1) {
          return `${hits}/${opts.length} options are ${name}`;
        }
      }
      return null;
    },
  },
  {
    id: 'translation',
    weight: 3,
    why: 'asks for a translation or gloss rather than use of the word',
    test(q) {
      // ⚠ A vocabulary question ABOUT A PASSAGE is the exam's own Q1 type
      // ("In the passage, what does 'thicken' mean?"), not a gloss. Without
      // this guard the rule flagged good in-context vocabulary items purely
      // for containing the words "what does ... mean".
      if (hasStimulus(q)) return null;
      const p = plain(q.question);
      if (!TRANSLATION_PROMPT.test(fold(p))) return null;
      const ans = plain(q.answer);
      if (wordCount(ans) > 3) return null;
      return `prompt asks for a direct gloss; answer is ${wordCount(ans)} word(s)`;
    },
  },
  {
    id: 'bare-recall',
    weight: 2,
    why: 'short prompt, no stimulus, one-word options, nothing explained',
    // ⚠ LANGUAGE PACKS ONLY. The premise — that a one-word answer to a short
    // prompt means trivial recall — holds for vocabulary but NOT for content
    // subjects, where the answers simply are single words: condensation,
    // battery, copper, chemical energy. Run unrestricted it flagged 75 of 424
    // Grade 5 science items, most of them perfectly good Grade 5 questions,
    // which is worse than reporting nothing: a list that is mostly wrong stops
    // being read. Science and history need the diagram and duplication signals
    // below, not this one.
    test(q, ctx) {
      if (!ctx.language) return null;
      if (hasStimulus(q) || examShaped(q)) return null;
      const pw = wordCount(q.question);
      if (pw > T.shortPrompt) return null;
      const opts = optionTexts(q);
      if (!opts.length || !opts.every(o => wordCount(o) <= T.shortOption)) return null;
      if (wordCount(q.explanation) > T.thinExplanation) return null;
      return `prompt ${pw}w, all options <=${T.shortOption}w, explanation ${wordCount(q.explanation)}w`;
    },
  },
  {
    id: 'low-lexis',
    weight: 1,
    why: 'vocabulary well below the reading level of the real paper',
    test(q, ctx) {
      const lang = ctx.language;
      if (!lang) return null;
      if (hasStimulus(q) || examShaped(q)) return null;
      const text = plain(q.question) + ' ' + optionTexts(q).join(' ');
      if (wordCount(text) < 6) return null;
      const rate = longWordRate(text);
      const floor = EXAM.longWordRate[lang] * 0.5;
      if (rate > floor) return null;
      return `${(rate * 100).toFixed(0)}% long words vs ${(EXAM.longWordRate[lang] * 100).toFixed(0)}% in the ${lang} paper`;
    },
  },
  {
    id: 'trivial-arithmetic',
    weight: 2,
    why: 'single small-number operation, below the grade in itself',
    test(q, ctx) {
      if (!ctx.isMaths) return null;
      if (hasStimulus(q)) return null;
      const p = plain(q.question);
      if (wordCount(p) > T.shortPrompt) return null;
      const nums = (p.match(/\d+(?:[.,]\d+)?/g) || []).map(Number);
      if (nums.length < 2 || nums.length > 3) return null;
      if (!nums.every(n => n < T.trivialOperand)) return null;
      const ops = (p.match(/[+\-×x*÷/]/g) || []).length;
      if (ops !== 1) return null;
      return `one operation on numbers all below ${T.trivialOperand}`;
    },
  },
  {
    id: 'short-passage',
    weight: 2,
    why: 'a comprehension stimulus far below exam passage length',
    test(q, ctx) {
      if (!ctx.isPassageChapter) return null;
      // ⚠ GENRE SETS THE LENGTH. A poster, a notice and a poem are short because
      // that is what they are — a 400-word affiche is not more exam-like, it is
      // simply no longer an affiche. The paper's Question 1 is a prose narrative
      // every year and never tests these forms, so the 413-447 word target does
      // not apply to them. Judging them by it flagged twenty perfectly good
      // items across fr-textes and eng-passages.
      if (/poeme|poem|affiche|annonce|advert|notice|poster/i.test(q.subsection || '')) return null;
      const pw = wordCount(q.question);
      if (pw < 60) return null;           // a follow-up question, not the stimulus
      if (pw >= T.passageFloor) return null;
      const lang = ctx.language;
      const range = lang ? EXAM.passageWords[lang] : null;
      return `stimulus ${pw}w` + (range ? ` vs ${range[0]}-${range[1]}w in the real paper` : '');
    },
  },
  {
    id: 'duplicate-stem',
    weight: 2,
    why: 'another question in the pack asks the same thing',
    // Objective and subject-neutral. Two items with the same stem are not two
    // questions: whichever the child meets second is free, and the pack looks
    // larger than it is. Measured on Grade 5 science: 11 groups, 24 questions.
    // ⚠ SAME STEM IS NOT ENOUGH — the answer must match too. Grade 5 maths has
    // twelve makeSymmetry items whose prompt is a fixed rubric ("Draw all the
    // lines of symmetry on the shape"): the question lives in the SHAPE and the
    // answer, not the words, and each one is a different shape. Stem alone
    // flagged all twelve. The same guard clears "Convert 3 hours to minutes"
    // against "Convert 3½ hours to minutes", where the fraction is stripped by
    // the normaliser but the answers are 180 and 210.
    // ⚠ Known miss: a genuine twin whose answer is written differently ("4" vs
    //   "Four") slips through. That is the right trade — one miss beats twelve
    //   false positives, because a list that is mostly wrong stops being read.
    test(q, ctx) {
      if (!ctx.stems) return null;
      const twins = ctx.stems.get(stemOf(q));
      if (!twins || twins.length < 2) return null;
      const mine = normAnswer(q);
      const others = twins.filter(t => t.id !== q.id && normAnswer(t.q) === mine).map(t => t.id);
      if (!others.length) return null;
      return `same stem as ${others.slice(0, 2).join(', ')}${others.length > 2 ? ' and ' + (others.length - 2) + ' more' : ''}`;
    },
  },
  {
    id: 'answer-stands-out',
    weight: 1,
    why: 'the correct option is guessable from its shape alone',
    test(q) {
      const opts = optionTexts(q);
      if (opts.length < 3) return null;
      const ans = plain(q.answer);
      const idx = opts.indexOf(ans);
      if (idx < 0) return null;
      const others = opts.filter((_, i) => i !== idx).map(o => o.length);
      const longest = Math.max(...others);
      const shortest = Math.min(...others);
      if (ans.length >= longest + 8) return 'correct option is much the longest';
      if (ans.length <= shortest - 8) return 'correct option is much the shortest';
      return null;
    },
  },
];

// ── Load bundles ────────────────────────────────────────────────────────────
function loadPacks(opts) {
  if (!fs.existsSync(BUNDLES)) {
    console.error('No question bundles found. Build them first:\n  node netlify/build-questions.js');
    process.exit(0);
  }
  const packs = new Map();
  const grades = opts.grade ? [opts.grade] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (const g of grades) {
    const f = path.join(BUNDLES, `grade${g}.json`);
    if (!fs.existsSync(f)) continue;
    let data;
    try { data = JSON.parse(fs.readFileSync(f, 'utf8')); }
    catch (e) { console.error(`skipping grade${g}.json — ${e.message}`); continue; }
    for (const [packId, qs] of Object.entries(data)) {
      if (opts.pack && packId !== opts.pack) continue;
      if (Array.isArray(qs) && qs.length) packs.set(packId, qs);
    }
  }
  return packs;
}

// ── Run ─────────────────────────────────────────────────────────────────────
function inspect(packId, qs) {
  const language = packLanguage(packId);
  const isMaths = /-maths$/.test(packId);
  const flagged = [];
  const ruleCounts = {};
  const byChapter = new Map();

  // Stem index for duplicate-stem, built once per pack.
  const stems = new Map();
  for (const q of qs) {
    const k = stemOf(q);
    if (k.length < 12) continue;
    if (!stems.has(k)) stems.set(k, []);
    stems.get(k).push({ id: q.id, q });
  }

  for (const q of qs) {
    const ctx = {
      language, isMaths,
      isPassageChapter: /passage|lecture|comprehension|texte/i.test(q.chapterId || ''),
      stems,
    };
    let score = 0;
    const fired = [];
    for (const rule of RULES) {
      let reason = null;
      try { reason = rule.test(q, ctx); }
      catch (_) { reason = null; }   // a malformed item must not stop the sweep
      if (!reason) continue;
      score += rule.weight;
      fired.push({ id: rule.id, why: rule.why, detail: reason });
      ruleCounts[rule.id] = (ruleCounts[rule.id] || 0) + 1;
    }
    const ch = q.chapterId || '(none)';
    if (!byChapter.has(ch)) byChapter.set(ch, { total: 0, flagged: 0 });
    byChapter.get(ch).total++;
    if (score >= T.flagAt) {
      byChapter.get(ch).flagged++;
      flagged.push({
        id: q.id, chapterId: ch, difficulty: q.difficulty, score,
        prompt: plain(q.question).slice(0, 110),
        rules: fired,
      });
    }
  }
  flagged.sort((a, b) => b.score - a.score || a.chapterId.localeCompare(b.chapterId));
  return { packId, total: qs.length, flagged, ruleCounts, byChapter };
}

function pct(n, d) { return d ? (100 * n / d).toFixed(1) + '%' : '—'; }
const pad = (s, n) => String(s).padEnd(n);
const lpad = (s, n) => String(s).padStart(n);

function report(results, opts) {
  let grandTotal = 0, grandFlagged = 0;

  console.log('\nFLOOR CHECK — items a child two years younger would plausibly get right');
  console.log('flags are hints for review, not verdicts; nothing is edited\n');

  console.log(pad('pack', 26) + lpad('items', 7) + lpad('flagged', 9) + lpad('rate', 8));
  console.log('-'.repeat(50));
  for (const r of results) {
    grandTotal += r.total; grandFlagged += r.flagged.length;
    console.log(pad(r.packId, 26) + lpad(r.total, 7) + lpad(r.flagged.length, 9) +
                lpad(pct(r.flagged.length, r.total), 8));
  }
  console.log('-'.repeat(50));
  console.log(pad('all', 26) + lpad(grandTotal, 7) + lpad(grandFlagged, 9) +
              lpad(pct(grandFlagged, grandTotal), 8));

  for (const r of results) {
    if (!r.flagged.length) continue;
    console.log(`\n══ ${r.packId} — ${r.flagged.length} flagged of ${r.total}`);

    const chapters = [...r.byChapter.entries()]
      .filter(([, v]) => v.flagged > 0)
      .sort((a, b) => (b[1].flagged / b[1].total) - (a[1].flagged / a[1].total));
    console.log('\n  worst chapters (by share of the chapter flagged)');
    for (const [ch, v] of chapters.slice(0, 8)) {
      const bar = '#'.repeat(Math.round(20 * v.flagged / v.total));
      console.log('    ' + pad(ch, 24) + lpad(v.flagged + '/' + v.total, 10) +
                  lpad(pct(v.flagged, v.total), 8) + '  ' + bar);
    }

    console.log('\n  rules fired');
    Object.entries(r.ruleCounts).sort((a, b) => b[1] - a[1]).forEach(([id, n]) => {
      const rule = RULES.find(x => x.id === id);
      console.log('    ' + pad(id, 22) + lpad(n, 6) + '  ' + rule.why);
    });

    if (opts.sample) {
      console.log('\n  examples (highest score first)');
      for (const f of r.flagged.slice(0, opts.sample)) {
        console.log(`    [${f.id}] L${f.difficulty} ${f.chapterId} · score ${f.score}`);
        console.log(`      "${f.prompt}"`);
        f.rules.forEach(x => console.log(`      ↳ ${x.id}: ${x.detail}`));
      }
    }
  }

  console.log('\nNext: read the flagged items, then rewrite or retire them.');
  console.log('A flag is a prompt to look, not proof the item is wrong.\n');
}

function main() {
  const argv = process.argv.slice(2);
  const opts = { grade: null, pack: null, sample: 0, json: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--grade') opts.grade = Number(argv[++i]);
    else if (a === '--pack') opts.pack = argv[++i];
    else if (a === '--sample') opts.sample = Number(argv[++i]) || 5;
    else if (a === '--json') opts.json = argv[++i];
    else if (a === '--help' || a === '-h') {
      console.log('usage: node scripts/floor-check.js [--grade N] [--pack ID] [--sample N] [--json FILE]');
      return;
    }
  }

  const packs = loadPacks(opts);
  if (!packs.size) {
    console.error('No packs matched. Did you run: node netlify/build-questions.js ?');
    return;
  }

  const results = [...packs.entries()]
    .map(([id, qs]) => inspect(id, qs))
    .sort((a, b) => (b.flagged.length / b.total) - (a.flagged.length / a.total));

  report(results, opts);

  if (opts.json) {
    const out = {
      generatedAt: new Date().toISOString(),
      rule: 'an item belongs in a grade only if a child two years younger would plausibly get it wrong',
      thresholds: T,
      examCalibration: EXAM,
      packs: results.map(r => ({
        pack: r.packId, total: r.total, flagged: r.flagged.length,
        chapters: [...r.byChapter.entries()].map(([ch, v]) => ({ chapter: ch, ...v })),
        items: r.flagged,
      })),
    };
    fs.writeFileSync(opts.json, JSON.stringify(out, null, 1), 'utf8');
    console.log(`wrote ${opts.json}`);
  }
}

main();
