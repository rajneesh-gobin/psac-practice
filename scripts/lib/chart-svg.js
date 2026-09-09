'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Inline-SVG figures for data-handling questions.
//
//  A data question that only DESCRIBES its chart ("A bar chart shows
//  Van=16, Bus=12…") is not testing the skill on the syllabus: reading a
//  chart. The child reads a sentence instead, and the picture the real MIE
//  paper puts in front of them is missing.
//
//  ⚠ SVG, not <img>: it cannot 404, it works offline, its bytes are known
//  exactly, and it needs no entry in assets/. That is this project's standing
//  preference for question figures - see CLAUDE.md, "Images".
//
//  ⚠ The output is BAKED INTO THE QUESTION TEXT at authoring time by
//  scripts/build-chart-figures.js. This file is never shipped to a browser and
//  never runs in a Lambda: in production question files are fetched as JSON and
//  never executed, so a figure that needed a function at read time would be
//  missing everywhere it mattered.
//
//  ⚠ EVERY BYTE HERE IS CACHE BUDGET. The offline question cache is budgeted in
//  BYTES (engine/question_loader.js, _BYTE_BUDGET) with very little headroom,
//  and the first draft of these charts - one <text> element per label carrying
//  its own font-family, fill and size - was 2,699 bytes each and pushed
//  grade5-english out of Grade 5's own offline cache. scripts/test-question-
//  cache-budget.js caught it. Hence: shared attributes hoisted onto <g>, the
//  gridlines drawn as ONE <path>, integer coordinates, no xmlns (the HTML
//  parser namespaces inline SVG on its own), and the fixed chrome moved to the
//  .q-chart rule in style.css. Same picture, ~55% of the bytes.
//
//  ⚠ Light card on purpose. The app has a dark theme; a chart drawn in
//  currentColor would vanish against it. A white plate with dark ink reads in
//  both, which is what the existing hand-drawn figures in
//  subjects/grade4-maths/questions/ch06_g4_data.js already do.
// ══════════════════════════════════════════════════════════════════════════

// Each bar differs in HEIGHT as well as hue - colour is never the thing being
// asked about, so a colour-blind child loses nothing.
const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];
const INK = '#1e293b', AXIS = '#334155', MUTED = '#64748b', GRID = '#e5e7eb';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const r = n => Math.round(n);

// A round ceiling above the tallest bar, and a step that lands 4-6 gridlines on
// it. A scale that stops exactly at the tallest value makes that bar touch the
// top of the plot, which reads as "off the chart" rather than as a maximum.
function niceScale(values) {
  const top = Math.max.apply(null, values);
  for (const step of [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]) {
    const max = Math.ceil(top / step) * step + (top % step === 0 ? step : 0);
    const lines = max / step;
    if (lines >= 4 && lines <= 6) return { max, step };
  }
  const step = Math.pow(10, Math.floor(Math.log10(top))) || 1;
  return { max: Math.ceil(top / step) * step + step, step };
}

function open(W, H, title) {
  // No xmlns: this is only ever inserted as innerHTML, where the HTML parser
  // namespaces it itself - and XMLSerializer puts the declaration back when the
  // zoom lightbox re-serialises the node, so the standalone copy is still valid.
  //
  // ⚠ No role="img" and no <title>. role="img" makes assistive tech announce
  // the NAME and skip the children, and the children are the data - the labels
  // and values a blind child needs are exactly what would be hidden. Left as a
  // plain graphic, the visible title <text> is read first and names the chart
  // anyway, then the bars are read in order.
  //
  // ⚠ The white plate is a <rect>, not CSS. Clicking a figure re-serialises it
  // into a data: URI shown over a black lightbox backdrop, where no stylesheet
  // of ours applies - a CSS-only background left dark ink on black.
  return '<svg class="q-chart" viewBox="0 0 ' + W + ' ' + H + '" font-family="sans-serif">'
    + '<rect width="100%" height="100%" rx="10" fill="#fff"/>'
    + '<text x="' + r(W / 2) + '" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="'
    + INK + '">' + esc(title) + '</text>';
}

// data: [[label, value], …]
// opts.unit    - caption above the scale, e.g. 'mm'
// opts.values  - print the value above each bar (default true). Turn it OFF
//                when the question is "read this bar off the scale": printing
//                the number answers it for the child.
// opts.colors  - override the palette. ⚠ Needed whenever the CATEGORIES are
//                themselves colours ("which colour of car is most common?") -
//                a bar labelled Red drawn in blue is a trick question nobody
//                intended.
function barChart(title, data, opts) {
  opts = opts || {};
  const showValues = opts.values !== false;
  const palette = opts.colors || COLORS;
  const { max, step } = opts.max ? { max: opts.max, step: opts.step } : niceScale(data.map(d => d[1]));

  // Wider bars when there are few of them, so four bars do not sit in a corner.
  const barW = data.length <= 4 ? 42 : data.length <= 5 ? 36 : 30;
  const gap = data.length <= 4 ? 30 : data.length <= 5 ? 24 : 18;
  const left = 46 + String(max).length * 6;
  const top = 34, bottom = 186;
  const W = left + data.length * (barW + gap) + 22;
  const H = 218;
  const right = W - 14;
  const perUnit = (bottom - top) / max;

  // One <path> for every gridline. Five <line> elements cost five times the
  // attributes for the same picture.
  // ⚠ font-size / fill / text-anchor are inheritable, so they hoist onto a <g>.
  // x, y and rx are NOT - those stay on every element that needs them.
  let grid = '', scale = '';
  for (let v = 0; v <= max; v += step) {
    const y = r(bottom - v * perUnit);
    grid += 'M' + left + ' ' + y + 'H' + right;
    scale += '<text x="' + (left - 8) + '" y="' + (y + 4) + '">' + v + '</text>';
  }

  // ⚠ Label and value INTERLEAVED, one bar at a time. Read-aloud speaks the
  // figure in document order, so two tidy groups - every label, then every
  // value - had a child hearing "Van Bus Car Foot 16 12 8 10" and having to
  // pair them up from memory. Bar by bar it reads "Van 16, Bus 12, …".
  // They share one <g> and carry no attributes of their own, which is also
  // cheaper than the two groups it replaces.
  let bars = '', marks = '';
  data.forEach((d, i) => {
    const h = r(d[1] * perUnit);
    const x = r(left + gap / 2 + i * (barW + gap));
    const mid = r(x + barW / 2);
    bars += '<rect x="' + x + '" y="' + (bottom - h) + '" width="' + barW + '" height="' + h
      + '" rx="3" fill="' + palette[i % palette.length] + '"/>';
    marks += '<text x="' + mid + '" y="' + (bottom + 17) + '">' + esc(d[0]) + '</text>';
    if (showValues) marks += '<text x="' + mid + '" y="' + (bottom - h - 6) + '">' + d[1] + '</text>';
  });

  return open(W, H, title)
    + (opts.unit ? '<text x="6" y="' + (top - 16) + '" font-size="10" fill="' + MUTED + '">'
        + esc(opts.unit) + '</text>' : '')
    + '<path d="M' + left + ' ' + top + 'V' + bottom + 'H' + right + '" stroke="' + AXIS
    + '" stroke-width="1.5" fill="none"/>'
    + '<path d="' + grid + '" stroke="' + GRID + '"/>'
    + '<g font-size="10" fill="' + MUTED + '" text-anchor="end">' + scale + '</g>'
    + bars
    + '<g font-size="11" fill="' + AXIS + '" text-anchor="middle">' + marks + '</g>'
    + '</svg>';
}

// rows: [[label, symbolCount], …]. Halves are drawn at 40% opacity, which is
// how every Mauritian paper draws them.
function pictogram(title, icon, keyLabel, rows) {
  const rowH = 30, top = 46, labelW = 96, iconW = 22;
  const widest = Math.max.apply(null, rows.map(x => x[1]));
  const W = Math.max(300, labelW + Math.ceil(widest) * iconW + 24);
  const H = top + rows.length * rowH + 34;
  let labels = '', icons = '', faded = '';
  rows.forEach((row, i) => {
    const y = top + i * rowH;
    labels += '<text x="10" y="' + (y + 5) + '">' + esc(row[0]) + '</text>';
    const full = Math.floor(row[1]);
    for (let s = 0; s < full; s++) {
      icons += '<text x="' + (labelW + s * iconW) + '" y="' + (y + 6) + '">' + icon + '</text>';
    }
    if (row[1] - full >= 0.5) {
      faded += '<text x="' + (labelW + full * iconW) + '" y="' + (y + 6) + '">' + icon + '</text>';
    }
  });
  return open(W, H, title)
    + '<g font-size="12" fill="' + AXIS + '">' + labels + '</g>'
    + '<g font-size="17">' + icons + '</g>'
    + (faded ? '<g font-size="17" fill-opacity="0.4">' + faded + '</g>' : '')
    + '<rect x="8" y="' + (H - 28) + '" width="' + (W - 16) + '" height="20" rx="4" fill="#f1f5f9"/>'
    + '<text x="16" y="' + (H - 14) + '" font-size="10" fill="' + AXIS + '">Key: ' + icon + ' = '
    + esc(keyLabel) + '</text></svg>';
}

module.exports = { barChart, pictogram, niceScale };
