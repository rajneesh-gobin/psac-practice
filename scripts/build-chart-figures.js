'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Bakes a real chart into every data-handling question that only described
//  one in words.
//
//  Run:  node scripts/build-chart-figures.js          (rewrites the sources)
//        node scripts/build-chart-figures.js --check  (fails if any drifted)
//
//  ⚠ The figure is written INTO the question text, not rendered at read time.
//  In production question files are fetched as JSON and never executed, so a
//  figure that needed a helper function at display time would be missing
//  everywhere a child actually sees a question. This script is therefore an
//  authoring tool: it is the only thing that ever calls scripts/lib/chart-svg.js.
//
//  ⚠ Nothing here is scraped. Every value below was read off the question it
//  replaces and is written out by hand, because a regex that pulls "Van=16"
//  out of prose will one day pull the wrong number out of a sentence that
//  merely looks the same, and a wrong bar is a wrong answer key.
//
//  ⚠ `values:false` where the whole question is READING A BAR off the scale.
//  Printing the number above the bar answers those outright - the three past
//  paper items are exactly that, and they are the reason this option exists.
// ══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const { barChart } = require('./lib/chart-svg.js');

const G4 = 'subjects/grade4-maths/questions/';
const G5 = 'subjects/grade5-maths/questions/';
const G6 = 'subjects/grade6-maths/questions/';

const SPORTS = [['Football', 30], ['Cricket', 25], ['Swimming', 20], ['Badminton', 15]];
const KUMAR  = [['Mon', 14], ['Tue', 10], ['Wed', 6], ['Thu', 8], ['Fri', 18]];
const FISH   = [['Mon', 9], ['Tue', 5], ['Wed', 10], ['Thu', 3], ['Fri', 3]];

const FIGURES = [
  // ── grade4-maths ────────────────────────────────────────────────────────
  { id: 'g4m-data-003', file: G4 + 'ch06_g4_data.js',
    title: 'Favourite sport - class survey', data: SPORTS,
    tail: 'Which sport is <b>LEAST</b> popular?' },

  { id: 'g4m-data-004', file: G4 + 'ch06_g4_data.js',
    title: 'Favourite sport - class survey', data: SPORTS,
    tail: 'How many <b>MORE</b> students prefer Football than Badminton?' },

  { id: 'g4m-data-007', file: G4 + 'ch06_g4_data.js',
    title: 'Favourite sport - class survey', data: SPORTS,
    tail: 'How many students were surveyed in <b>TOTAL</b>?' },

  { id: 'g4m-data-017', file: G4 + 'ch06_g4_data.js',
    title: 'Monthly rainfall', unit: 'mm',
    data: [['Jan', 80], ['Feb', 60], ['Mar', 100], ['Apr', 40]],
    tail: 'What is the <b>MEAN</b> (average) rainfall per month?' },

  // ⚠ The categories ARE colours here, so the bars must be drawn in them. A
  // bar labelled Red drawn in blue is a trick nobody intended.
  { id: 'g4m-data-053', file: G4 + 'topup_g4_maths.js',
    title: 'Cars in the car park',
    data: [['Red', 18], ['Blue', 25], ['White', 12], ['Green', 20]],
    colors: ['#dc2626', '#2563eb', '#cbd5e1', '#16a34a'],
    tail: 'Which colour is most common?' },

  // ── grade5-maths ────────────────────────────────────────────────────────
  { id: 'GR04', file: G5 + 'core.js',
    title: 'Marks by subject',
    data: [['Maths', 80], ['English', 70], ['French', 60], ['Science', 50], ['History', 65]],
    tail: 'What is the <b>average mark</b> across all subjects?' },

  { id: 'GR07', file: G5 + 'questions_extra.js',
    title: 'Items sold each day',
    data: [['Mon', 50], ['Tue', 35], ['Wed', 45], ['Thu', 30]],
    tail: 'On which day were the <b>fewest</b> items sold?' },

  { id: 'CH_GRP01', file: G5 + 'questions_challenge2.js',
    title: 'Monthly totals',
    data: [['Jan', 45], ['Feb', 60], ['Mar', 75], ['Apr', 55]],
    tail: 'What is the total for all four months?' },

  { id: 'CH_GRP05', file: G5 + 'questions_challenge2.js',
    title: 'Club chosen by pupils',
    data: [['Sports', 40], ['Art', 30], ['Music', 20], ['Drama', 10]],
    tail: 'What <b>percentage</b> chose Sports?' },

  { id: 'CH_GRP09', file: G5 + 'questions_challenge2.js',
    title: 'Daily rainfall', unit: 'mm',
    data: [['Mon', 12], ['Tue', 8], ['Wed', 15], ['Thu', 6], ['Fri', 19]],
    tail: 'A gardener says "the average daily rainfall was more than 11 mm." Is she correct?' },

  { id: 'CH_GRP17', file: G5 + 'questions_challenge2.js',
    title: 'My marks',
    data: [['Maths', 72], ['English', 68], ['Science', 80], ['History', 64]],
    tail: 'A student says "I scored at least 70 in half my subjects." Is this true?' },

  { id: 'DGR02', file: G5 + 'questions_diverse.js',
    title: "Pupils' favourite sport",
    data: [['Football', 18], ['Cricket', 12], ['Swimming', 8], ['Tennis', 6]],
    tail: 'What fraction of pupils chose <b>Cricket</b>? (simplest form)' },

  { id: 'EGR01', file: G5 + 'questions_examstyle.js',
    title: 'Water bottles sold by Mr Kumar', data: KUMAR,
    tail: 'On which day did Mr Kumar sell the <b>least</b> number of bottles?<br><i>Type the day name.</i>' },

  // ⚠ Friday is deliberately NOT on this chart - the question is about a day
  // the chart does not show. Drawing all five bars would answer it.
  { id: 'EGR03', file: G5 + 'questions_examstyle.js',
    title: 'Water bottles sold by Mr Kumar',
    data: [['Mon', 14], ['Tue', 10], ['Wed', 6], ['Thu', 8]],
    tail: 'Mr Kumar sold <b>three times as many</b> bottles on Friday as on Wednesday.<br>How many did he sell on <b>Friday</b>?' },

  { id: 'EGR04', file: G5 + 'questions_examstyle.js',
    title: 'How pupils travel to school',
    data: [['Van', 16], ['Bus', 12], ['Car', 8], ['Foot', 10]],
    tail: 'Which means of transport is used by <b>most</b> pupils?' },

  { id: 'BAR03', file: G5 + 'questions_subsections.js',
    title: 'Cookies sold each day',
    data: [['Mon', 35], ['Tue', 42], ['Wed', 28], ['Thu', 50], ['Fri', 45]],
    tail: 'What is the <b>total cookies sold</b> for the week?' },

  { id: 'GR_W01', file: G5 + 'questions_wordproblems.js',
    title: 'Fruit sales this week',
    data: [['Apple', 240], ['Banana', 180], ['Mango', 320], ['Orange', 120], ['Pineapple', 200]],
    tail: 'Which fruit sold <b>twice as many</b> as Orange?' },

  { id: 'GR_W03', file: G5 + 'questions_wordproblems.js',
    title: 'Visitors to the park',
    data: [['Mon', 120], ['Tue', 95], ['Wed', 140], ['Thu', 85], ['Fri', 160]],
    tail: 'What is the <b>average</b> number of visitors per day?' },

  // ── grade6-maths past papers ────────────────────────────────────────────
  // The real papers printed a chart with NO numbers on the bars and asked the
  // child to read one off the scale. Printing the values would turn a
  // graph-reading question into no question at all.
  { id: 'g6m-pp19-033', file: G6 + 'past_paper_2019.js',
    title: 'Pets preferred by pupils', values: false, max: 500, step: 50,
    data: [['Dogs', 450], ['Cats', 300], ['Birds', 400], ['Fish', 200]],
    tail: 'How many pupils prefer <b>Dogs</b>?' },

  { id: 'g6m-pp22-031', file: G6 + 'past_paper_2022.js',
    title: 'Fish caught', values: false, max: 10, step: 1, data: FISH,
    tail: 'How many fish did the fisherman catch on <b>Tuesday</b>?' },

  { id: 'g6m-pp22-032', file: G6 + 'past_paper_2022.js',
    title: 'Fish caught', values: false, max: 10, step: 1, data: FISH,
    tail: 'What is the <b>average</b> number of fish caught from Monday to Friday?' },
];

// ── The rewriter ────────────────────────────────────────────────────────────
// Replaces the WHOLE `question:` literal rather than splicing into it. Splicing
// means parsing prose; replacing means the table above is the single source of
// truth for what the question says, and re-running is naturally idempotent.
function readLiteral(src, from) {
  const quote = src[from];
  if (quote !== "'" && quote !== '"' && quote !== '`') return null;
  for (let i = from + 1; i < src.length; i++) {
    if (src[i] === '\\') { i++; continue; }
    if (src[i] === quote) return { start: from, end: i + 1, raw: src.slice(from, i + 1) };
  }
  return null;
}

function jsString(text) {
  return "'" + text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n') + "'";
}

function locate(src, id) {
  // id:'X' with any spacing, and the id must match whole - 'GR04' must not
  // find 'GR04B'.
  const re = new RegExp("id\\s*:\\s*(['\"])" + id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\1");
  const m = re.exec(src);
  if (!m) return null;
  const qAt = src.indexOf('question:', m.index);
  if (qAt < 0) return null;
  let i = qAt + 'question:'.length;
  while (i < src.length && /\s/.test(src[i])) i++;
  return readLiteral(src, i);
}

module.exports = { FIGURES };

// Nothing below runs when this file is only required for its table.
if (require.main !== module) return;

const check = process.argv.includes('--check');
const root = path.resolve(__dirname, '..');
const edits = new Map();
const problems = [];

for (const fig of FIGURES) {
  const file = path.join(root, fig.file);
  if (!edits.has(file)) {
    if (!fs.existsSync(file)) { problems.push(fig.id + ': no such file ' + fig.file); continue; }
    edits.set(file, fs.readFileSync(file, 'utf8'));
  }
  const src = edits.get(file);
  const lit = locate(src, fig.id);
  if (!lit) { problems.push(fig.id + ': no question literal found in ' + fig.file); continue; }

  const svg = barChart(fig.title, fig.data, {
    unit: fig.unit, values: fig.values, colors: fig.colors, max: fig.max, step: fig.step,
  });
  const text = (fig.lead ? fig.lead + '<br>' : '') + svg + fig.tail;
  const next = jsString(text);
  if (lit.raw === next) continue;
  edits.set(file, src.slice(0, lit.start) + next + src.slice(lit.end));
  problems.push(check ? fig.id + ': figure is out of date' : null);
}

const stale = problems.filter(Boolean);
if (check) {
  if (stale.length) {
    console.error('Chart figures out of date. Run: node scripts/build-chart-figures.js');
    stale.forEach(p => console.error('  ' + p));
    process.exitCode = 1;
  } else {
    console.log('Chart figures: all ' + FIGURES.length + ' are current.');
  }
} else {
  let written = 0;
  for (const [file, src] of edits) {
    if (src !== fs.readFileSync(file, 'utf8')) { fs.writeFileSync(file, src); written++; }
  }
  console.log('Chart figures: ' + FIGURES.length + ' baked into ' + written + ' file(s).');
  stale.filter(p => !/out of date/.test(p)).forEach(p => console.error('  ! ' + p));
}
