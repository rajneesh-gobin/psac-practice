'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Social & Modern Studies — DEPTH BATCH C
//  Chapters: g9sms-map-data-skills and g9sms-population.
//  IDs: g9sms-dpc-001 … g9sms-dpc-120. Block chosen because no id in this
//  pack begins g9sms-dpc- (checked 2026-09-19); six other batches were
//  writing other chapters of this pack at the same time and the importer
//  keys on the id, so a collision would have been silent.
//
//  ⚠ THIS IS THE VISUAL PAIR. g9sms-map-data-skills tests reading a map, a
//    table, a graph or a pyramid; a text-only substitute does not test the
//    outcome. Most items below carry a real stimulus the pupil reads a value
//    off — an HTML table facsimile, or an inline SVG sketch map, shaded map,
//    line graph, bar chart, pie chart or population pyramid. pyramid_
//    construction in particular cannot be taught in prose.
//
//  ⚠ FIGURES ARE INLINE SVG on a fixed light plate with dark ink. The
//    practice screen forces a pale ink colour, so a figure that inherits its
//    colour is invisible there. Every aria-label names the SHAPES, never the
//    values the question asks the pupil to read off. Italic inside an svg is
//    <tspan font-style="italic"> — <i>, <b> and <span> exit foreign content
//    and take the rest of the figure with them.
//
//  ⚠ L4 HERE IS THE APPLIED BAND, not harder recall. Reading a value off a
//    table is L2; deciding which of two defensible readings the data actually
//    supports, or tracing a consequence twenty years out, is L4.
//
//  ⚠ EVERY FIGURE IS SAMPLE DATA and says so. Invented figures inside a
//    drawn stimulus are ordinary exam practice; invented figures asserted as
//    facts about Mauritius in a stem or an explanation are not. The only
//    real claims made about Mauritius here are ones this pack already makes.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const INK = '#1e293b';
const SUB = '#334155';
const GRID = '#cbd5e1';
const FAINT = '#eef2f6';

function svgOpen(w, h, label) {
  return '<div class="q-scroll" style="text-align:center">'
    + '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" role="img" aria-label="' + label + '">'
    + '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="8" fill="#ffffff"/>';
}
const SVG_END = '</svg></div>';

function tx(x, y, s, size, anchor, fill) {
  return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 9) + '"'
    + ' text-anchor="' + (anchor || 'middle') + '" fill="' + (fill || SUB) + '"'
    + ' font-family="system-ui,-apple-system,sans-serif">' + s + '</text>';
}

function tbl(headers, rows, caption) {
  return '<div class="q-scroll"><table class="q-table"><tr>'
    + headers.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>'
    + rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('')
    + '</table>'
    + (caption ? '<div style="font-size:12px;opacity:.85;margin-top:2px">' + caption + '</div>' : '')
    + '</div>';
}

// ── TABLE 1: population and area of six regions ───────────────────────────
const T_REGION = tbl(
  ['Region', 'Population (2020)', 'Area (km²)'],
  [['A', '186 000', '62'], ['B', '96 000', '48'], ['C', '24 000', '120'],
   ['D', '63 000', '90'], ['E', '152 000', '38'], ['F', '39 000', '150']],
  'Sample data for the imaginary island of Île Verte.');

// ── TABLE 2: annual rainfall of the same six regions ──────────────────────
const T_RAIN = tbl(
  ['Region', 'Annual rainfall (mm)'],
  [['A', '1 200'], ['B', '2 700'], ['C', '900'], ['D', '1 800'], ['E', '1 450'], ['F', '3 100']],
  'Sample data for the imaginary island of Île Verte.');

// ── TABLE 3: four villages at two census dates ────────────────────────────
const T_GROWTH = tbl(
  ['Village', 'Population 2000', 'Population 2020'],
  [['Bel-Étang', '4 000', '5 200'], ['Trou-Sable', '12 000', '13 200'],
   ['Mont-Clair', '2 500', '3 500'], ['Petite-Anse', '9 000', '9 450']],
  'Sample data. The village names are invented for this exercise.');

// ── TABLE 4: vital statistics of one country over fifty years ─────────────
const T_VITAL = tbl(
  ['Year', 'Births per 1,000', 'Deaths per 1,000', 'Life expectancy (years)'],
  [['1970', '30', '9', '62'], ['1980', '25', '7', '66'], ['1990', '20', '6', '69'],
   ['2000', '15', '7', '71'], ['2010', '12', '7', '73'], ['2020', '10', '8', '75']],
  'Country Y: sample data.');

// ── TABLE 5: the figures behind the part-built pyramid ────────────────────
const T_PYR = tbl(
  ['Age group', 'Males (thousands)', 'Females (thousands)'],
  [['75 and over', '20', '35'], ['60 – 74', '70', '85'], ['45 – 59', '105', '110'],
   ['30 – 44', '130', '125'], ['15 – 29', '115', '118'], ['0 – 14', '95', '92']],
  'Sample data.');

// ── FIGURE 1: a village sketch map with a key and a scale bar ─────────────
const VILLAGE = (function () {
  let g = svgOpen(350, 300, 'a sketch map of a village with a key box and a scale bar');
  g += tx(175, 15, 'Sketch map of Bel-Étang village (sample)', 10, 'middle', INK);
  g += '<rect x="10" y="24" width="214" height="196" fill="#f8fafc" stroke="' + INK + '" stroke-width="1.4"/>';
  g += '<polyline points="150,24 142,86 160,140 152,220" fill="none" stroke="#3b82f6" stroke-width="3"/>';
  g += '<line x1="10" y1="150" x2="224" y2="150" stroke="#475569" stroke-width="5"/>';
  g += '<polyline points="64,150 52,112 66,74" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-dasharray="5 4"/>';
  g += '<rect x="88" y="96" width="13" height="13" fill="' + INK + '"/>';
  g += '<circle cx="186" cy="184" r="7" fill="#ffffff" stroke="' + INK + '" stroke-width="1.8"/>';
  g += '<polygon points="66,62 74,76 58,76" fill="' + INK + '"/>';
  g += '<path d="M196 84 v18 M188 92 h16" stroke="' + INK + '" stroke-width="2.4" fill="none"/>';
  g += '<polygon points="28,38 24,50 32,50" fill="' + INK + '"/>' + tx(28, 62, 'N', 9, 'middle', INK);
  g += '<rect x="232" y="24" width="110" height="196" fill="#ffffff" stroke="' + INK + '" stroke-width="1.2"/>';
  g += tx(287, 38, 'KEY', 9, 'middle', INK);
  g += '<rect x="238" y="46" width="11" height="11" fill="' + INK + '"/>' + tx(258, 56, 'School', 8.5, 'start', INK);
  g += '<circle cx="244" cy="74" r="6" fill="#ffffff" stroke="' + INK + '" stroke-width="1.6"/>' + tx(258, 78, 'Health centre', 8.5, 'start', INK);
  g += '<polygon points="244,92 251,104 237,104" fill="' + INK + '"/>' + tx(258, 101, 'Water tank', 8.5, 'start', INK);
  g += '<path d="M244 116 v14 M238 122 h12" stroke="' + INK + '" stroke-width="2.2" fill="none"/>' + tx(258, 127, 'Church', 8.5, 'start', INK);
  g += '<line x1="236" y1="148" x2="252" y2="148" stroke="#3b82f6" stroke-width="3"/>' + tx(258, 151, 'River', 8.5, 'start', INK);
  g += '<line x1="236" y1="172" x2="252" y2="172" stroke="#475569" stroke-width="5"/>' + tx(258, 175, 'Main road', 8.5, 'start', INK);
  g += '<line x1="236" y1="196" x2="252" y2="196" stroke="' + INK + '" stroke-width="1.6" stroke-dasharray="5 4"/>' + tx(258, 199, 'Footpath', 8.5, 'start', INK);
  g += '<rect x="20" y="244" width="40" height="8" fill="' + INK + '"/>';
  g += '<rect x="60" y="244" width="40" height="8" fill="#ffffff" stroke="' + INK + '" stroke-width="1"/>';
  g += '<rect x="100" y="244" width="40" height="8" fill="' + INK + '"/>';
  [[20, '0'], [60, '1'], [100, '2'], [140, '3 km']].forEach(function (p) {
    g += '<line x1="' + p[0] + '" y1="240" x2="' + p[0] + '" y2="256" stroke="' + INK + '" stroke-width="1"/>';
    g += tx(p[0], 268, p[1], 8, 'middle', INK);
  });
  g += tx(20, 288, 'Scale 1 : 50 000', 10, 'start', INK);
  return g + SVG_END;
})();

// ── FIGURE 2 and 3: the same island, two shaded (choropleth) maps ─────────
function islandMap(title, shades, dashed, key, note, label) {
  const cells = [['A', 24, 44], ['B', 90, 44], ['C', 156, 44],
                 ['D', 24, 120], ['E', 90, 120], ['F', 156, 120]];
  let g = svgOpen(350, 234, label);
  g += tx(175, 15, title, 9.5, 'middle', INK);
  cells.forEach(function (c, i) {
    g += '<rect x="' + c[1] + '" y="' + c[2] + '" width="66" height="76" fill="' + shades[i] + '" stroke="' + INK
      + '" stroke-width="1.2"' + (dashed.indexOf(c[0]) >= 0 ? ' stroke-dasharray="6 4"' : '') + '/>';
    g += '<circle cx="' + (c[1] + 33) + '" cy="' + (c[2] + 38) + '" r="11" fill="#ffffff" stroke="' + INK + '" stroke-width="1"/>';
    g += tx(c[1] + 33, c[2] + 42, c[0], 11, 'middle', INK);
  });
  g += '<rect x="24" y="44" width="198" height="152" fill="none" stroke="' + INK + '" stroke-width="2.6"/>';
  g += '<rect x="234" y="44" width="110" height="' + (key.length * 24 + 24) + '" fill="#ffffff" stroke="' + INK + '" stroke-width="1.2"/>';
  g += tx(289, 60, 'KEY', 9, 'middle', INK);
  key.forEach(function (k, i) {
    const y = 68 + i * 24;
    g += '<rect x="242" y="' + y + '" width="18" height="13" fill="' + k[1] + '" stroke="' + INK + '" stroke-width="1"/>';
    g += tx(266, y + 11, k[0], 8, 'start', INK);
  });
  if (note) g += tx(24, 214, note, 8.5, 'start', INK);
  return g + SVG_END;
}

const CHORO_DENSITY = islandMap(
  'Île Verte: population density by region (sample data)',
  ['#1e40af', '#3b82f6', '#dbeafe', '#93c5fd', '#1e40af', '#ffffff'], ['F'],
  [['under 500', '#dbeafe'], ['500 – 999', '#93c5fd'],
   ['1 000 – 2 999', '#3b82f6'], ['3 000 and over', '#1e40af']],
  'People per km². Region F is not yet shaded.',
  'a simplified island map divided into six lettered regions, with a key box of four shades');

const CHORO_RAIN = islandMap(
  'Île Verte: annual rainfall by region (sample data)',
  ['#fef3c7', '#ffffff', '#fef3c7', '#fdba74', '#ffffff', '#c2410c'], ['B', 'E'],
  [['under 1 500 mm', '#fef3c7'], ['1 500 – 2 499 mm', '#fdba74'],
   ['2 500 mm and over', '#c2410c']],
  'Regions B and E are not yet shaded.',
  'a simplified island map divided into six lettered regions, with a key box of three shades');

// ── FIGURE 4: birth rate and death rate, one country, sixty years ─────────
const LINE_RATES = (function () {
  const yrs = [1960, 1970, 1980, 1990, 2000, 2010, 2020];
  const birth = [40, 30, 25, 20, 15, 12, 10];
  const death = [10, 9, 7, 6, 6, 7, 8];
  const X = function (i) { return 46 + i * 43; };
  const Y = function (v) { return 200 - v * 170 / 45; };
  let g = svgOpen(330, 252, 'a line graph with two lines plotted against years');
  g += tx(165, 14, 'Country X: birth rate and death rate per 1,000 (sample data)', 9.5, 'middle', INK);
  for (let v = 0; v <= 45; v += 5) {
    g += '<line x1="46" y1="' + Y(v).toFixed(1) + '" x2="306" y2="' + Y(v).toFixed(1)
      + '" stroke="' + (v % 10 === 0 ? GRID : FAINT) + '" stroke-width="1"/>';
    g += tx(42, Y(v) + 3, String(v), 8, 'end', SUB);
  }
  g += '<line x1="46" y1="30" x2="46" y2="200" stroke="' + INK + '" stroke-width="2"/>';
  g += '<line x1="46" y1="200" x2="306" y2="200" stroke="' + INK + '" stroke-width="2"/>';
  yrs.forEach(function (y, i) { g += tx(X(i), 214, String(y), 8, 'middle', SUB); });
  g += '<polyline points="' + birth.map(function (v, i) { return X(i) + ',' + Y(v).toFixed(1); }).join(' ')
    + '" fill="none" stroke="#b91c1c" stroke-width="2.2"/>';
  g += '<polyline points="' + death.map(function (v, i) { return X(i) + ',' + Y(v).toFixed(1); }).join(' ')
    + '" fill="none" stroke="#1d4ed8" stroke-width="2.2" stroke-dasharray="6 4"/>';
  birth.forEach(function (v, i) { g += '<circle cx="' + X(i) + '" cy="' + Y(v).toFixed(1) + '" r="3.2" fill="#b91c1c"/>'; });
  death.forEach(function (v, i) { g += '<rect x="' + (X(i) - 3) + '" y="' + (Y(v) - 3).toFixed(1) + '" width="6" height="6" fill="#1d4ed8"/>'; });
  g += '<line x1="46" y1="232" x2="68" y2="232" stroke="#b91c1c" stroke-width="2.2"/>' + tx(73, 235, 'Birth rate', 8.5, 'start', INK);
  g += '<line x1="160" y1="232" x2="182" y2="232" stroke="#1d4ed8" stroke-width="2.2" stroke-dasharray="6 4"/>' + tx(187, 235, 'Death rate', 8.5, 'start', INK);
  return g + SVG_END;
})();

// ── FIGURE 5: share of the population aged 60 and over, six census years ──
const BAR_AGEING = (function () {
  const yrs = [1970, 1980, 1990, 2000, 2010, 2020];
  const vals = [4, 6, 8, 10, 14, 20];
  const Y = function (v) { return 190 - v * 160 / 22; };
  let g = svgOpen(320, 224, 'a bar chart with one bar for each of six census years');
  g += tx(160, 14, 'Country X: share aged 60 and over (sample data)', 9.5, 'middle', INK);
  for (let v = 0; v <= 22; v += 2) {
    g += '<line x1="44" y1="' + Y(v).toFixed(1) + '" x2="306" y2="' + Y(v).toFixed(1)
      + '" stroke="' + (v % 4 === 0 ? GRID : FAINT) + '" stroke-width="1"/>';
    if (v % 4 === 0) g += tx(40, Y(v) + 3, v + '%', 8, 'end', SUB);
  }
  vals.forEach(function (v, i) {
    const x = 52 + i * 42;
    g += '<rect x="' + x + '" y="' + Y(v).toFixed(1) + '" width="30" height="' + (190 - Y(v)).toFixed(1)
      + '" fill="#93c5fd" stroke="' + INK + '" stroke-width="1.5"/>';
    g += tx(x + 15, 204, String(yrs[i]), 8, 'middle', SUB);
  });
  g += '<line x1="44" y1="30" x2="44" y2="190" stroke="' + INK + '" stroke-width="2"/>';
  g += '<line x1="44" y1="190" x2="306" y2="190" stroke="' + INK + '" stroke-width="2"/>';
  return g + SVG_END;
})();

// ── FIGURE 6: the workforce by sector, as a pie chart ─────────────────────
const PIE_SECTORS = (function () {
  const data = [['Services', 62, '#3b82f6', '#ffffff'], ['Manufacturing', 20, '#93c5fd', INK],
                ['Construction', 10, '#cbd5e1', INK], ['Agriculture', 8, '#e2e8f0', INK]];
  const cx = 108, cy = 118, r = 76;
  let g = svgOpen(320, 224, 'a pie chart divided into four slices with a key beside it');
  g += tx(160, 14, 'Country X: workforce by sector (sample data)', 9.5, 'middle', INK);
  let a0 = 0;
  data.forEach(function (d) {
    const a1 = a0 + d[1] / 100 * Math.PI * 2;
    const x0 = cx + r * Math.sin(a0), y0 = cy - r * Math.cos(a0);
    const x1 = cx + r * Math.sin(a1), y1 = cy - r * Math.cos(a1);
    const big = (a1 - a0) > Math.PI ? 1 : 0;
    g += '<path d="M' + cx + ',' + cy + ' L' + x0.toFixed(1) + ',' + y0.toFixed(1)
      + ' A' + r + ',' + r + ' 0 ' + big + ' 1 ' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' Z" fill="'
      + d[2] + '" stroke="' + INK + '" stroke-width="1.2"/>';
    const am = (a0 + a1) / 2;
    g += tx(cx + r * 0.62 * Math.sin(am), cy - r * 0.62 * Math.cos(am) + 4, d[1] + '%', 9, 'middle', d[3]);
    a0 = a1;
  });
  data.forEach(function (d, i) {
    const y = 62 + i * 26;
    g += '<rect x="206" y="' + y + '" width="16" height="13" fill="' + d[2] + '" stroke="' + INK + '" stroke-width="1"/>';
    g += tx(228, y + 11, d[0], 8.5, 'start', INK);
  });
  return g + SVG_END;
})();

// ── FIGURE 7: a part-built population pyramid, one bar missing ────────────
const PYR_PART = (function () {
  const rows = [['75+', 20, 35], ['60–74', 70, null], ['45–59', 105, 110],
                ['30–44', 130, 125], ['15–29', 115, 118], ['0–14', 95, 92]];
  const px = function (v) { return v * 110 / 150; };
  let g = svgOpen(350, 262, 'a population pyramid with six age bands and one bar left undrawn');
  g += tx(175, 14, 'Country Z: population by age and sex (sample data)', 9.5, 'middle', INK);
  g += tx(100, 30, 'Males', 9, 'middle', INK) + tx(175, 30, 'Age', 9, 'middle', INK) + tx(250, 30, 'Females', 9, 'middle', INK);
  rows.forEach(function (r, i) {
    const y = 36 + i * 30;
    g += '<rect x="' + (150 - px(r[1])).toFixed(1) + '" y="' + y + '" width="' + px(r[1]).toFixed(1)
      + '" height="24" fill="#bfdbfe" stroke="' + INK + '" stroke-width="1.2"/>';
    if (r[2] === null) {
      g += '<rect x="200" y="' + y + '" width="30" height="24" fill="#ffffff" stroke="' + INK
        + '" stroke-width="1.2" stroke-dasharray="5 4"/>' + tx(215, y + 17, '?', 12, 'middle', INK);
    } else {
      g += '<rect x="200" y="' + y + '" width="' + px(r[2]).toFixed(1)
        + '" height="24" fill="#fbcfe8" stroke="' + INK + '" stroke-width="1.2"/>';
    }
    g += tx(175, y + 16, r[0], 8.5, 'middle', INK);
  });
  g += '<line x1="30" y1="216" x2="320" y2="216" stroke="' + INK + '" stroke-width="1.8"/>';
  [0, 50, 100, 150].forEach(function (v) {
    [150 - px(v), 200 + px(v)].forEach(function (x) {
      g += '<line x1="' + x.toFixed(1) + '" y1="212" x2="' + x.toFixed(1) + '" y2="220" stroke="' + INK + '" stroke-width="1.2"/>';
      g += tx(x, 232, String(v), 8, 'middle', SUB);
    });
  });
  g += tx(175, 250, 'thousands', 8.5, 'middle', SUB);
  return g + SVG_END;
})();

// ── FIGURE 8: two pyramids of contrasting shape, same scale ───────────────
const PYR_TWO = (function () {
  const bands = ['60+', '45–59', '30–44', '15–29', '0–14'];
  const A = [14, 26, 38, 50, 60];
  const B = [30, 48, 44, 32, 26];
  let g = svgOpen(360, 236, 'two population pyramids drawn side by side, each with five age bands');
  g += tx(180, 15, 'Two populations drawn to the same scale (sample data)', 9.5, 'middle', INK);
  g += tx(110, 36, 'Pyramid A', 10, 'middle', INK) + tx(280, 36, 'Pyramid B', 10, 'middle', INK);
  bands.forEach(function (b, i) {
    const y = 48 + i * 24;
    g += tx(40, y + 15, b, 7.5, 'end', SUB);
    [[110, A[i], '#bfdbfe'], [280, B[i], '#fbcfe8']].forEach(function (p) {
      g += '<rect x="' + (p[0] - p[1]) + '" y="' + y + '" width="' + (p[1] * 2)
        + '" height="20" fill="' + p[2] + '" stroke="' + INK + '" stroke-width="1.2"/>';
    });
  });
  [110, 280].forEach(function (cx) {
    g += '<line x1="' + cx + '" y1="44" x2="' + cx + '" y2="172" stroke="' + INK + '" stroke-width="1"/>';
    g += '<line x1="' + (cx - 70) + '" y1="172" x2="' + (cx + 70) + '" y2="172" stroke="' + INK + '" stroke-width="1.6"/>';
  });
  g += tx(180, 196, 'Males left of each centre line, females right.', 8.5, 'middle', SUB);
  g += tx(180, 212, 'Both pyramids use the same age bands and the same scale.', 8.5, 'middle', SUB);
  return g + SVG_END;
})();

// ── FIGURE 9: life expectancy of males and females over fifty years ───────
const LINE_LIFE = (function () {
  const yrs = [1970, 1980, 1990, 2000, 2010, 2020];
  const male = [60, 64, 68, 71, 73, 75];
  const female = [67, 70, 73, 75, 77, 79];
  const X = function (i) { return 52 + i * 48; };
  const Y = function (v) { return 200 - (v - 55) * 170 / 25; };
  let g = svgOpen(330, 252, 'a line graph with two lines plotted against years');
  g += tx(165, 14, 'Country X: life expectancy at birth, in years (sample data)', 9.5, 'middle', INK);
  for (let v = 55; v <= 80; v += 1) {
    const major = v % 5 === 0;
    g += '<line x1="52" y1="' + Y(v).toFixed(1) + '" x2="300" y2="' + Y(v).toFixed(1)
      + '" stroke="' + (major ? GRID : FAINT) + '" stroke-width="1"/>';
    if (major) g += tx(48, Y(v) + 3, String(v), 8, 'end', SUB);
  }
  g += '<line x1="52" y1="30" x2="52" y2="200" stroke="' + INK + '" stroke-width="2"/>';
  g += '<line x1="52" y1="200" x2="300" y2="200" stroke="' + INK + '" stroke-width="2"/>';
  yrs.forEach(function (y, i) { g += tx(X(i), 214, String(y), 8, 'middle', SUB); });
  g += '<polyline points="' + female.map(function (v, i) { return X(i) + ',' + Y(v).toFixed(1); }).join(' ')
    + '" fill="none" stroke="#b91c1c" stroke-width="2.2"/>';
  g += '<polyline points="' + male.map(function (v, i) { return X(i) + ',' + Y(v).toFixed(1); }).join(' ')
    + '" fill="none" stroke="#1d4ed8" stroke-width="2.2" stroke-dasharray="6 4"/>';
  female.forEach(function (v, i) { g += '<circle cx="' + X(i) + '" cy="' + Y(v).toFixed(1) + '" r="3.2" fill="#b91c1c"/>'; });
  male.forEach(function (v, i) { g += '<rect x="' + (X(i) - 3) + '" y="' + (Y(v) - 3).toFixed(1) + '" width="6" height="6" fill="#1d4ed8"/>'; });
  g += '<line x1="52" y1="232" x2="74" y2="232" stroke="#b91c1c" stroke-width="2.2"/>' + tx(79, 235, 'Females', 8.5, 'start', INK);
  g += '<line x1="168" y1="232" x2="190" y2="232" stroke="#1d4ed8" stroke-width="2.2" stroke-dasharray="6 4"/>' + tx(195, 235, 'Males', 8.5, 'start', INK);
  return g + SVG_END;
})();

const CH_MAP = 'g9sms-map-data-skills';
const CH_POP = 'g9sms-population';

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-map-data-skills · map_key_and_scale — dpc-001 … 011
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-001', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:1,
  question:'Study the sketch map.' + VILLAGE + 'According to the key, which feature is marked by a small filled black square?',
  options:['The school','The church','The water tank','The health centre'],
  answer:'The school',
  hint:'Match the shape drawn on the map to the same shape listed in the key box.',
  explanation:'A key pairs each symbol with the feature it stands for. The filled square in the key is listed against the school, so the filled square drawn north of the main road is the school. The church is drawn as a cross and the water tank as a triangle.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-002', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:1,
  question:'Study the sketch map.' + VILLAGE + 'What does the thin broken (dashed) line on the map represent?',
  options:['A footpath','A main road','A river','A parish boundary'],
  answer:'A footpath',
  hint:'Three kinds of line appear in the key. Compare their thickness and their pattern.',
  explanation:'The key gives three line symbols: a thick grey line for the main road, a blue line for the river and a thin broken line for the footpath. The broken line is therefore the footpath. Reading the line symbols in the key is exactly the skill being tested.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-003', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:2,
  question:'Study the sketch map.' + VILLAGE + 'Where does the health centre lie in relation to the main road and to the river?',
  options:['South of the road and east of the river','North of the road and east of the river',
           'South of the road and west of the river','North of the road and west of the river'],
  answer:'South of the road and east of the river',
  hint:'The north arrow fixes the directions. Take the two features one at a time.',
  explanation:'North is towards the top of the map, so south is towards the bottom. The open circle that stands for the health centre sits below the thick road line and to the right of the blue river line, which makes it south of the road and east of the river.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-004', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:2,
  question:'A map is drawn to a scale of 1 : 50 000. Two places are measured as 7 cm apart on the map. How many <b>kilometres</b> apart are they on the ground?',
  answer:3.5, acceptableAnswers:['3.5', '3,5'],
  hint:'First work out what one centimetre on this map stands for on the ground.',
  explanation:'A scale of 1 : 50 000 means 1 cm on the map is 50 000 cm on the ground, which is 500 m or 0.5 km. So 7 cm stands for 7 &#215; 0.5 = 3.5 km. The common slip is to stop at 350 000 cm and forget that 100 000 cm make one kilometre.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-005', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:2,
  question:'A footpath measures 12 cm on a map drawn to a scale of 1 : 25 000. What is its length on the ground, in <b>metres</b>?',
  answer:3000,
  hint:'Change the map length into ground centimetres first, then into the unit asked for.',
  explanation:'12 cm &#215; 25 000 = 300 000 cm on the ground. There are 100 cm in a metre, so 300 000 cm is 3 000 m (3 km). Dividing by 1 000 instead of 100 gives 300 m, which is the mistake this question is set to catch.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-006', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:3,
  question:'Two villages are 9 km apart on the ground. On a map drawn to a scale of 1 : 150 000, how many <b>centimetres</b> apart will they appear?',
  answer:6,
  hint:'This runs the usual calculation backwards, so the scale divides rather than multiplies.',
  explanation:'9 km is 900 000 cm. Dividing by the scale factor, 900 000 &#247; 150 000 = 6 cm. Working forwards instead of backwards, and multiplying by 150 000, gives an impossible answer of over a kilometre of paper, which is a useful check that the operation is the wrong way round.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-007', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:3,
  question:'A map is photocopied at a smaller size for a school booklet. Why does a <b>linear scale bar</b> stay reliable when the stated ratio does not?',
  options:['The bar shrinks with the map, so it still matches the distances',
           'The bar is printed larger than the ratio, so it is easier to read',
           'The ratio is only an estimate, while the bar is measured on the ground',
           'The bar shows kilometres, while a ratio can only show centimetres'],
  answer:'The bar shrinks with the map, so it still matches the distances',
  hint:'Ask what happens to each of the two when every length on the page changes.',
  explanation:'A scale bar is part of the drawing, so reducing the page reduces the bar by the same amount and the bar still measures the map correctly. The printed ratio 1 : 50 000 is only text; it does not change when the page is reduced, so it becomes wrong.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-008', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:4,
  question:'An ambulance service needs to know how far its vehicle will travel from a clinic to a hospital along a winding coast road. One pupil measures the straight line between the two points; another lays a piece of string along the road and then measures the string. Which measurement should the service use?',
  options:['Along the road, because the ambulance cannot leave the road',
           'The straight line, because it is the shortest distance between them',
           'Along the road, because a string is always more accurate than a ruler',
           'The straight line, because roads are not drawn to scale on any map'],
  answer:'Along the road, because the ambulance cannot leave the road',
  hint:'Decide what the number is going to be used for before deciding how to measure it.',
  explanation:'The service wants driving distance, and a vehicle must follow the road, so the string measurement is the one that answers the question. The straight line is a real measurement, but it answers a different question &#8212; how far apart the two places are, not how far the ambulance drives.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-009', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:4,
  question:'A council must do two jobs. First, plan where to place street lights along one village road. Second, show visitors where the village sits within the whole country. Which pair of scales suits the two jobs?',
  options:['1 : 2 500 for the street lights and 1 : 500 000 for the country map',
           '1 : 500 000 for the street lights and 1 : 2 500 for the country map',
           '1 : 2 500 for both jobs, because one scale keeps the maps consistent',
           '1 : 500 000 for both jobs, because a small scale fits onto one sheet'],
  answer:'1 : 2 500 for the street lights and 1 : 500 000 for the country map',
  hint:'A small ratio shows a small area in great detail; a large ratio shows a large area with little.',
  explanation:'Placing street lights needs detail measured in metres, which only a large-scale map such as 1 : 2 500 can show. A whole country will not fit on a sheet at that scale, so the second job needs a small-scale map such as 1 : 500 000. Using one scale for both means either no detail or no country.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-010', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:4,
  question:'Study the sketch map.' + VILLAGE + 'The council builds a new bus shelter beside the main road, and a pupil marks it on this map with a small filled black square. Why will that cause a problem for anyone reading the map?',
  options:['The filled square already stands for the school in the key',
           'The filled square is too small to be seen beside a thick road',
           'The bus shelter should be drawn where the footpath meets the road',
           'A sketch map must never be altered once its key has been printed'],
  answer:'The filled square already stands for the school in the key',
  hint:'A symbol can only do one job. Check the key before you decide what has gone wrong.',
  explanation:'A key works because one symbol means one feature. Using the filled square for the bus shelter as well as the school means a reader cannot tell which square is which. A new feature needs a new symbol added to the key, not a symbol borrowed from something else.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-011', chapterId:CH_MAP, subsection:'map_key_and_scale', difficulty:3,
  question:'Why do map makers use symbols and a key rather than writing the name of every feature on the map itself?',
  options:['Symbols keep the map uncluttered and are quicker to read at a glance',
           'Symbols are the only way of showing features that have not been named',
           'A key is required by law on every map that is published in a country',
           'Names would have to be written out in every language spoken locally'],
  answer:'Symbols keep the map uncluttered and are quicker to read at a glance',
  hint:'Imagine the same map with a written label on every single building.',
  explanation:'Written names take far more space than a symbol, so a map labelled that way quickly becomes unreadable, and the eye has to read rather than recognise. A key lets one small mark stand for a feature wherever it occurs, and the reader learns the marks once.' }));

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-map-data-skills · map_shading — dpc-012 … 027
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-012', chapterId:CH_MAP, subsection:'map_shading', difficulty:1,
  question:'Study the shaded map.' + CHORO_DENSITY + 'How many classes are listed in the key?',
  options:['Four','Three','Five','Six'],
  answer:'Four',
  hint:'Count the shaded boxes inside the key box, not the regions on the map.',
  explanation:'The key lists four shaded boxes, each against a range of values, so the map uses four classes. Counting the six lettered regions instead gives six, but the number of regions and the number of classes are different things &#8212; two regions here share the darkest class.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-013', chapterId:CH_MAP, subsection:'map_shading', difficulty:1,
  question:'Study the shaded map.' + CHORO_DENSITY + 'Which class is shown by the <b>darkest</b> shade in the key?',
  options:['3 000 and over per km²','Under 500 per km²','500 to 999 per km²','1 000 to 2 999 per km²'],
  answer:'3 000 and over per km²',
  hint:'On a shaded map the tones run in order. Look at which end of the key the darkest box sits.',
  explanation:'On a choropleth map the shades run from pale for the lowest class to dark for the highest, and the key is listed in that order. The darkest box is the last one, against 3 000 and over per km². A reader who guesses from the middle of the key loses the ordering that makes the map work.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-014', chapterId:CH_MAP, subsection:'map_shading', difficulty:1,
  question:'Study the shaded map.' + CHORO_DENSITY + 'Which region has been left unshaded?',
  options:['Region F','Region A','Region C','Region D'],
  answer:'Region F',
  hint:'One region is drawn with a broken border and carries no tone at all.',
  explanation:'Region F is drawn with a broken border and left white, and the note under the map says so. Region C is shaded, but in the palest tone of the key, which is easy to mistake for no shading at all if the key is not checked.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-015', chapterId:CH_MAP, subsection:'map_shading', difficulty:2,
  question:'Study the shaded map.' + CHORO_DENSITY + 'Into which class does Region C fall?',
  options:['Under 500 per km²','500 to 999 per km²','1 000 to 2 999 per km²','3 000 and over per km²'],
  answer:'Under 500 per km²',
  hint:'Match the tone printed inside Region C against the boxes listed in the key.',
  explanation:'Region C carries the palest tone on the map, and the key lists that tone against under 500 people per km². Reading a shade is always a two-step job: find the tone on the map, then find the same tone in the key and read the range beside it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-016', chapterId:CH_MAP, subsection:'map_shading', difficulty:2,
  question:'Study the shaded map.' + CHORO_DENSITY + 'Which two regions carry the darkest shade?',
  options:['Regions A and E','Regions A and B','Regions B and E','Regions C and F'],
  answer:'Regions A and E',
  hint:'Two regions share one class. Compare the tones against the last box in the key.',
  explanation:'Regions A and E are both filled with the darkest tone, so both fall in the highest class, 3 000 and over per km². Region B is the next tone down. A shaded map deliberately groups regions into classes, so two regions sharing a shade is normal, not an error.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-017', chapterId:CH_MAP, subsection:'map_shading', difficulty:2,
  question:'Study the table.' + T_REGION + 'Calculate the population <b>density</b> of Region F, in people per km².',
  answer:260,
  hint:'Density puts the two columns together. Decide which one is divided by which.',
  explanation:'Density is population divided by area: 39 000 &#247; 150 = 260 people per km². Dividing the other way round gives a tiny decimal and no useful meaning, which is the quickest way to tell that the division has been done backwards.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-018', chapterId:CH_MAP, subsection:'map_shading', difficulty:3,
  question:'Study the map and the table.' + CHORO_DENSITY + T_REGION + 'Region F has been left unshaded. Which shade should it be given?',
  options:['The palest shade, under 500 per km²','The second shade, 500 to 999 per km²',
           'The third shade, 1 000 to 2 999 per km²','The darkest shade, 3 000 and over per km²'],
  answer:'The palest shade, under 500 per km²',
  hint:'Work out the figure from the table first, then find which class in the key contains it.',
  explanation:'Region F holds 39 000 people in 150 km², a density of 260 per km², which falls in the lowest class and so takes the palest tone. Region F covers the largest area of the six, which tempts a reader towards a dark shade, but area alone tells you nothing about density.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-019', chapterId:CH_MAP, subsection:'map_shading', difficulty:3,
  question:'Why does a shaded map group values into a few classes instead of giving every region a shade of its own?',
  options:['A reader can tell a few tones apart, but not dozens of them',
           'A map may never show more than four colours at the same time',
           'Each region must be given the same tone as the region beside it',
           'Classes make every region appear to hold the same population'],
  answer:'A reader can tell a few tones apart, but not dozens of them',
  hint:'Think about what the eye can actually do with a row of very similar greys.',
  explanation:'Shading works because the eye reads darker as more, and that only survives while the tones are clearly different. Twenty tones of one colour cannot be told apart or matched to a key, so the values are grouped into a handful of classes. Nothing forbids more than four classes; the limit is what a reader can distinguish.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-020', chapterId:CH_MAP, subsection:'map_shading', difficulty:4,
  question:'Study the map and the table.' + CHORO_DENSITY + T_REGION + 'A pupil says Region D should be shaded darker than Region B, because D covers more land. Which statement corrects the pupil?',
  options:['Density compares people with area, and B has more people per km²',
           'A larger area always earns a darker shade on a map of this kind',
           'Shading on this map is decided by total population, not by area',
           'Any tone may be used as long as the key lists that tone somewhere'],
  answer:'Density compares people with area, and B has more people per km²',
  hint:'Work out both densities before judging the claim. A big region is not the same as a crowded one.',
  explanation:'Region B holds 96 000 people in 48 km², a density of 2 000 per km², while Region D holds 63 000 in 90 km², only 700 per km². So B is the darker of the two. A large area, taken alone, tends to push density <b>down</b>, because the same people are spread over more ground.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-021', chapterId:CH_MAP, subsection:'map_shading', difficulty:2,
  question:'Study the rainfall map.' + CHORO_RAIN + 'Which regions have not yet been shaded?',
  options:['Regions B and E','Regions A and C','Regions D and F','Regions C and E'],
  answer:'Regions B and E',
  hint:'Two regions are drawn with a broken border and carry no tone.',
  explanation:'Regions B and E are drawn with broken borders and left white, and the note under the map says so. Regions A and C are shaded, but in the palest tone of the three, which is easy to confuse with an unshaded region unless the key is checked.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-022', chapterId:CH_MAP, subsection:'map_shading', difficulty:2,
  question:'Study the rainfall map and the table.' + CHORO_RAIN + T_RAIN + 'Which shade should Region B be given?',
  options:['The darkest shade, 2 500 mm and over','The middle shade, 1 500 to 2 499 mm',
           'The palest shade, under 1 500 mm','A new shade, because 2 700 mm is not listed'],
  answer:'The darkest shade, 2 500 mm and over',
  hint:'Find the figure in the table, then read down the key until you meet the class that holds it.',
  explanation:'Region B receives 2 700 mm, which is more than 2 500 mm, so it falls in the highest class and takes the darkest tone. A value does not need its own line in the key: each key entry covers a whole range, and 2 700 sits inside the top range.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-023', chapterId:CH_MAP, subsection:'map_shading', difficulty:3,
  question:'Study the rainfall map and the table.' + CHORO_RAIN + T_RAIN + 'Region E receives 1 450 mm and Region D receives 1 800 mm. Why will they be given different shades, even though the difference is small?',
  options:['They fall on opposite sides of the 1 500 mm class boundary',
           'The map gives each of its six regions a tone of its own by design',
           'Rainfall totals are always rounded to the nearest 1 000 mm first',
           'Region D is the larger region, so it must take the darker shade'],
  answer:'They fall on opposite sides of the 1 500 mm class boundary',
  hint:'Look at where the class boundary sits, not at how far apart the two numbers are.',
  explanation:'1 450 mm falls in the class below 1 500 mm and 1 800 mm falls in the class above it, so the two regions take different tones even though they differ by only 350 mm. This is a real weakness of shaded maps: a small difference across a boundary shows up, while a large difference inside one class does not.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-024', chapterId:CH_MAP, subsection:'map_shading', difficulty:4,
  question:'A pupil designs a key with the classes 0 – 1 500 mm, 1 500 – 3 000 mm and 3 000 – 4 500 mm. The teacher says the key cannot be used as it stands. What is the fault?',
  options:['A value of exactly 1 500 mm would belong to two classes at once',
           'The classes are far too wide for rainfall to be shown properly',
           'The lowest class should always begin below zero on a rainfall key',
           'Three classes are never enough to shade a map with six regions'],
  answer:'A value of exactly 1 500 mm would belong to two classes at once',
  hint:'Test the key by picking a value that sits exactly on a boundary.',
  explanation:'The boundary values 1 500 and 3 000 appear in two classes each, so a region with exactly that rainfall could be given either tone and two people would shade the map differently. Classes must not overlap: 0 – 1 499, 1 500 – 2 999 and 3 000 and over fixes it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-025', chapterId:CH_MAP, subsection:'map_shading', difficulty:4,
  question:'A region on a shaded map has no figure at all, because no measurement was ever taken there. How should that region appear on the finished map?',
  options:['Left white, with a no-data entry added to the key',
           'Shaded with the palest tone, since the value may be low',
           'Shaded with the same tone as the region beside it',
           'Given the middle tone, which is the safest estimate'],
  answer:'Left white, with a no-data entry added to the key',
  hint:'Ask which choice tells the reader the truth about what is known.',
  explanation:'Shading a region in any tone tells the reader a measurement exists, which would be false. Leaving it white and saying so in the key keeps the map honest. Guessing the palest, the middle or a neighbour\'s tone all invent a figure the map has no right to show.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-026', chapterId:CH_MAP, subsection:'map_shading', difficulty:4,
  question:'Two pupils shade the same density data. One uses five tones of a single blue; the other uses red, green, yellow, blue and brown. Why is the first map easier to read?',
  options:['Darker blue reads at once as more, while five colours have no order',
           'A single colour costs less to print than five different colours do',
           'Blue is the colour always used for maps of rainfall and of water',
           'Five colours cannot be listed in a key, but five tones can be listed'],
  answer:'Darker blue reads at once as more, while five colours have no order',
  hint:'Ask whether a reader can rank the classes without going back to the key each time.',
  explanation:'Tones of one colour carry a built-in order, so the reader sees which regions are higher without checking the key. Five unrelated colours carry no order at all &#8212; there is no reason why green should mean more than yellow &#8212; so every region has to be looked up one by one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-027', chapterId:CH_MAP, subsection:'map_shading', difficulty:3,
  question:'Study the shaded map.' + CHORO_DENSITY + 'What does the pattern of shading show about where people live on this island?',
  options:['They are spread unevenly, crowded in some regions and thin in others',
           'They are spread evenly, with each region holding a similar number',
           'They live mainly in the region with the largest area of farmland',
           'They live in the regions that lie furthest from the coast of the island'],
  answer:'They are spread unevenly, crowded in some regions and thin in others',
  hint:'Compare the range of tones on the map. A single tone everywhere would mean something different.',
  explanation:'The map runs from the palest class to the darkest across six regions, so density differs sharply from place to place &#8212; an uneven distribution. If people were spread evenly, every region would carry the same tone. The map says nothing about farmland or about the coast, so neither can be read from it.' }));

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-map-data-skills · table_reading — dpc-028 … 042
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-028', chapterId:CH_MAP, subsection:'table_reading', difficulty:1,
  question:'Study the table.' + T_GROWTH + 'What was the population of Mont-Clair in 2000?',
  answer:2500,
  hint:'Find the row for the village first, then move across to the column for the year.',
  explanation:'A table is read by crossing a row with a column. The Mont-Clair row meets the 2000 column at 2 500. Reading along the wrong row gives 12 000 or 9 000, which is why finding the row before the column is worth doing every time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-029', chapterId:CH_MAP, subsection:'table_reading', difficulty:1,
  question:'Study the table.' + T_GROWTH + 'Which village had the largest population in 2020?',
  options:['Trou-Sable','Bel-Étang','Mont-Clair','Petite-Anse'],
  answer:'Trou-Sable',
  hint:'Compare only the final column. The earlier column is not being asked about.',
  explanation:'Reading down the 2020 column gives 5 200, 13 200, 3 500 and 9 450, so Trou-Sable is the largest. Petite-Anse is the largest in neither year despite being close; comparing the wrong column is the usual cause of a wrong answer here.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-030', chapterId:CH_MAP, subsection:'table_reading', difficulty:2,
  question:'Study the table.' + T_GROWTH + 'By how many people did Petite-Anse grow between 2000 and 2020?',
  answer:450,
  hint:'Take the two figures from the same row and find the difference between them.',
  explanation:'9 450 &#8722; 9 000 = 450 people. Subtracting the earlier figure from the later one gives the growth; doing it the other way round gives &#8722;450, which would say the village had shrunk when in fact it grew.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-031', chapterId:CH_MAP, subsection:'table_reading', difficulty:2,
  question:'Study the table.' + T_GROWTH + 'What was the total population of the four villages in 2000?',
  answer:27500,
  hint:'Add down one column only, and check that you have used all four rows.',
  explanation:'4 000 + 12 000 + 2 500 + 9 000 = 27 500 people. A column total is only meaningful when every row is included, so the count of rows added is worth checking against the number of rows in the table before writing the answer down.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-032', chapterId:CH_MAP, subsection:'table_reading', difficulty:2,
  question:'Study the table.' + T_GROWTH + 'Which two villages grew by exactly the same <b>number</b> of people?',
  options:['Bel-Étang and Trou-Sable','Bel-Étang and Mont-Clair',
           'Trou-Sable and Petite-Anse','Mont-Clair and Petite-Anse'],
  answer:'Bel-Étang and Trou-Sable',
  hint:'Work out the change for each village before comparing any of them.',
  explanation:'Bel-Étang grew by 5 200 &#8722; 4 000 = 1 200 and Trou-Sable by 13 200 &#8722; 12 000 = 1 200. Mont-Clair grew by 1 000 and Petite-Anse by 450. The two villages that match on growth do not match on size, which the next questions turn on.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-033', chapterId:CH_MAP, subsection:'table_reading', difficulty:3,
  question:'Study the table.' + T_GROWTH + 'Calculate the <b>percentage</b> increase in the population of Mont-Clair between 2000 and 2020.',
  answer:40, acceptableAnswers:['40', '40%'],
  hint:'A percentage change is always measured against the starting figure, not the finishing one.',
  explanation:'The increase is 3 500 &#8722; 2 500 = 1 000, and 1 000 &#247; 2 500 = 0.4, which is 40 per cent. Dividing by the 2020 figure instead gives about 29 per cent; the starting value is the base a percentage change is measured from.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-034', chapterId:CH_MAP, subsection:'table_reading', difficulty:3,
  question:'Study the table.' + T_GROWTH + 'Which village grew fastest in relation to its own size?',
  options:['Mont-Clair, which grew by 40 per cent','Trou-Sable, which grew by 1 200 people',
           'Bel-Étang, which grew by 1 200 people','Petite-Anse, which grew by 450 people'],
  answer:'Mont-Clair, which grew by 40 per cent',
  hint:'In relation to its own size means a rate, not a count. Two of the options give a count.',
  explanation:'Mont-Clair grew 1 000 on a base of 2 500, which is 40 per cent, against 30 per cent for Bel-Étang, 10 per cent for Trou-Sable and 5 per cent for Petite-Anse. The largest number of extra people belongs to two other villages, so a count and a rate give different winners here.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-035', chapterId:CH_MAP, subsection:'table_reading', difficulty:4,
  question:'Study the table.' + T_GROWTH + 'A newspaper reports that Bel-Étang and Trou-Sable grew at the same rate between 2000 and 2020. Is the report fair?',
  options:['No, they gained the same number but Bel-Étang grew three times as fast',
           'Yes, both villages gained 1 200 people, which is what a rate measures',
           'No, Trou-Sable grew faster because it holds far more people overall',
           'Yes, because the two villages were counted in the same census years'],
  answer:'No, they gained the same number but Bel-Étang grew three times as fast',
  hint:'Test the claim by working out each village\'s growth as a share of what it started with.',
  explanation:'Both gained 1 200 people, but Bel-Étang started at 4 000 (a 30 per cent rise) and Trou-Sable at 12 000 (a 10 per cent rise). A rate measures the gain against the starting size, so the report has quietly swapped a count for a rate &#8212; the commonest way a true figure is used to support a false claim.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-036', chapterId:CH_MAP, subsection:'table_reading', difficulty:1,
  question:'Study the table.' + T_VITAL + 'According to the table, what was the number of births per 1,000 people in 1980?',
  answer:25,
  hint:'Three figures share the 1980 row. Check the column heading before reading one off.',
  explanation:'The 1980 row meets the births column at 25 per 1,000. The same row also holds 7 and 66, which belong to deaths and to life expectancy, so a table with several value columns has to be read by heading as well as by row.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-037', chapterId:CH_MAP, subsection:'table_reading', difficulty:2,
  question:'Study the table.' + T_VITAL + 'Calculate the natural increase per 1,000 people in 1970.',
  answer:21,
  hint:'Natural increase uses two of the three columns. Migration plays no part in it.',
  explanation:'Natural increase is the birth rate minus the death rate: 30 &#8722; 9 = 21 per 1,000. Adding the two rates instead gives 39, a figure that means nothing, because births add to a population and deaths take away from it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-038', chapterId:CH_MAP, subsection:'table_reading', difficulty:2,
  question:'Study the table.' + T_VITAL + 'In which year shown was the death rate at its lowest?',
  options:['1990','1970','2000','2020'],
  answer:'1990',
  hint:'Read down the deaths column only, and remember the lowest value may not be the last one.',
  explanation:'The deaths column runs 9, 7, 6, 7, 7, 8, so the lowest value is 6 in 1990. A reader who expects the figure to keep falling picks 2020 and gets it wrong: the rate falls to a low point and then rises again.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-039', chapterId:CH_MAP, subsection:'table_reading', difficulty:3,
  question:'Study the table.' + T_VITAL + 'What happened to the natural increase between 1970 and 2020?',
  options:['It fell from 21 to 2 per 1,000, so growth slowed sharply',
           'It rose from 2 to 21 per 1,000, so growth speeded up sharply',
           'It stayed near 21 per 1,000, so growth hardly changed at all',
           'It fell below zero, so the population began to shrink in size'],
  answer:'It fell from 21 to 2 per 1,000, so growth slowed sharply',
  hint:'Work the figure out for the first year and for the last year, then compare the two.',
  explanation:'In 1970 the natural increase was 30 &#8722; 9 = 21 per 1,000; in 2020 it was 10 &#8722; 8 = 2 per 1,000. The population is still growing, but far more slowly. It has not fallen below zero, which would need deaths to outnumber births.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-040', chapterId:CH_MAP, subsection:'table_reading', difficulty:4,
  question:'Study the table.' + T_VITAL + 'The death rate falls from 9 in 1970 to 6 in 1990 and then rises again to 8 by 2020, while life expectancy rises throughout. Which explanation fits both columns?',
  options:['More people are now old, so more deaths occur although people live longer',
           'Health care worsened after 1990, so people began to die at younger ages',
           'The table must hold an error, since the two figures cannot both rise',
           'Births fell after 1990, and a lower birth rate always raises the deaths'],
  answer:'More people are now old, so more deaths occur although people live longer',
  hint:'A crude death rate counts deaths against the whole population, whatever its age.',
  explanation:'A crude death rate is deaths per 1,000 people of all ages. As a population ages, a larger share of it is in the age groups where deaths occur, so the rate can rise even while every individual can expect to live longer. Worsening health care would pull life expectancy down, which the table does not show.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpc-041', chapterId:CH_MAP, subsection:'table_reading', difficulty:4,
  question:'Study the table.' + T_VITAL + 'The table gives rates per 1,000 people but never the number of births. Name the <b>one</b> extra figure needed before the actual number of births in 2020 can be worked out.',
  answer:'population',
  alsoAccept:['the population', 'total population', 'the total population', 'population size', 'the population size', 'the number of people', 'number of people'],
  hint:'A rate is always a figure measured against something. Ask what that something is here.',
  explanation:'A rate of 10 per 1,000 only becomes a number of births once you know how many thousands of people there are. With a population of 1.2 million the same rate gives 12 000 births; with 600 000 it gives 6 000. The table carries rates, so the population is the missing piece.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-042', chapterId:CH_MAP, subsection:'table_reading', difficulty:4,
  question:'Study the table.' + T_REGION + 'A pupil ranks the regions by population and concludes that Region A is the most crowded. Which column must the pupil also use before making that claim?',
  options:['The area column, because crowding compares people with space',
           'The year column, because crowding changes from year to year',
           'The region column, because crowding is named after its region',
           'No other column, because the largest population is the most crowded'],
  answer:'The area column, because crowding compares people with space',
  hint:'Decide what crowding actually measures before deciding which columns are needed.',
  explanation:'Crowding means density, which needs both population and area. Region A has the largest population, but Region E has 152 000 people in only 38 km², a density of 4 000 per km² against A\'s 3 000, so E is the more crowded. Ranking by one column alone answers a different question.' }));

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-map-data-skills · graph_reading — dpc-043 … 053
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-043', chapterId:CH_MAP, subsection:'graph_reading', difficulty:1,
  question:'Study the graph.' + LINE_RATES + 'What was the <b>birth rate</b> per 1,000 in 1980?',
  answer:25,
  hint:'Two lines cross the graph. Check the legend before reading a value off either of them.',
  explanation:'Going up from 1980 to the solid red line and across to the axis gives 25 per 1,000. The dashed blue line at the same year gives 7, which is the death rate, so the legend has to be read before the value is taken.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-044', chapterId:CH_MAP, subsection:'graph_reading', difficulty:2,
  question:'Study the graph.' + LINE_RATES + 'In which decade did the birth rate fall most steeply?',
  options:['1960 to 1970','1980 to 1990','2000 to 2010','2010 to 2020'],
  answer:'1960 to 1970',
  hint:'Steepness is about the size of the drop across one decade, not about how low the line ends.',
  explanation:'The birth rate falls from 40 to 30 between 1960 and 1970, a drop of 10 points, against 5 points from 1980 to 1990, 3 from 2000 to 2010 and 2 from 2010 to 2020. The line is lowest at the end of the graph, but it is steepest at the start.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-045', chapterId:CH_MAP, subsection:'graph_reading', difficulty:4,
  question:'Study the graph.' + LINE_RATES + 'Two pupils describe the death-rate line after 2000. One says health care has got worse; the other says the population has got older. Which reading is better supported by the graph, and why?',
  options:['The ageing reading, because the rise is small and follows a long fall',
           'The worse-care reading, because any rise in deaths means worse care',
           'The ageing reading, because a death rate always rises after the year 2000',
           'The worse-care reading, because the birth rate fell over the same years'],
  answer:'The ageing reading, because the rise is small and follows a long fall',
  hint:'Weigh how big the rise is against how far the line had already fallen, and against what a crude rate counts.',
  explanation:'The death rate falls from 10 to 6 and then edges back only to 8, a small rise after a long improvement &#8212; the pattern a country gets when a larger share of its people are elderly. Collapsing health care would push the rate well above its starting level, which the graph does not show, and a falling birth rate is not evidence about care at all.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-046', chapterId:CH_MAP, subsection:'graph_reading', difficulty:3,
  question:'Study the graph.' + LINE_RATES + 'The gap between the two lines narrows after 1960. What does a narrowing gap show?',
  options:['Natural increase is getting smaller, so the population grows more slowly',
           'Natural increase is getting larger, so the population grows more quickly',
           'More people are leaving the country than are arriving in it each year',
           'The two rates are measured on different scales and cannot be compared'],
  answer:'Natural increase is getting smaller, so the population grows more slowly',
  hint:'The vertical distance between the two lines has a name. Work out what it measures.',
  explanation:'The vertical gap between the birth line and the death line is the natural increase. It shrinks from 30 per 1,000 in 1960 to 2 per 1,000 in 2020, so the population is still growing but much more slowly. Migration is not plotted here, so nothing can be said about who leaves or arrives.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-047', chapterId:CH_MAP, subsection:'graph_reading', difficulty:2,
  question:'Study the graph.' + LINE_RATES + 'What was the natural increase per 1,000 in 1960?',
  answer:30,
  hint:'Read both lines at the same year, then combine them the way natural increase is defined.',
  explanation:'In 1960 the birth rate is 40 per 1,000 and the death rate is 10 per 1,000, so the natural increase is 40 &#8722; 10 = 30 per 1,000. Reading only the upper line gives 40, which is the birth rate rather than the increase.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-048', chapterId:CH_MAP, subsection:'graph_reading', difficulty:1,
  question:'Study the bar chart.' + BAR_AGEING + 'In 1990, what percentage of the population was aged 60 and over?',
  answer:8, acceptableAnswers:['8', '8%'],
  hint:'Find the bar for the year, then follow its top across to the labelled axis.',
  explanation:'The 1990 bar reaches the gridline labelled 8 per cent. Each labelled line is four points apart with an unlabelled line between, so a bar that stops on an unlabelled line has to be read as the midpoint of the two labels either side of it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-049', chapterId:CH_MAP, subsection:'graph_reading', difficulty:2,
  question:'Study the bar chart.' + BAR_AGEING + 'Between which two census years did the share aged 60 and over rise by exactly 4 percentage points?',
  options:['2000 and 2010','1970 and 1980','1980 and 1990','2010 and 2020'],
  answer:'2000 and 2010',
  hint:'Work out the rise for each pair of neighbouring bars before choosing.',
  explanation:'The bars read 4, 6, 8, 10, 14 and 20, so the rises are 2, 2, 2, 4 and 6 points. Only 2000 to 2010 rises by exactly 4. The last pair rises the most, which is the tempting answer if the question is read as asking for the biggest rise.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-050', chapterId:CH_MAP, subsection:'graph_reading', difficulty:3,
  question:'Study the bar chart.' + BAR_AGEING + 'What does the shape of the chart tell you about this population?',
  options:['It is ageing, and the pace of ageing has quickened since 2000',
           'It is ageing, but the pace of ageing has slowed down since 2000',
           'It is getting younger, because each later bar is taller than before',
           'It is unchanged, because every bar covers the same span of years'],
  answer:'It is ageing, and the pace of ageing has quickened since 2000',
  hint:'Look at how much each bar adds to the one before it, not only at whether the bars rise.',
  explanation:'Every bar is taller than the last, so the share of older people is rising and the population is ageing. The steps are 2, 2, 2, then 4 and 6, so the rise is speeding up rather than slowing. A taller bar for an older age group means a younger population in no reading of the chart.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-051', chapterId:CH_MAP, subsection:'graph_reading', difficulty:1,
  question:'Study the pie chart.' + PIE_SECTORS + 'Which sector employs the largest share of this workforce?',
  options:['Services','Manufacturing','Construction','Agriculture'],
  answer:'Services',
  hint:'On a pie chart the size of the slice is the share. Check the key to name it.',
  explanation:'The services slice fills 62 per cent of the circle, more than the other three together. A pie chart is read by comparing slice sizes, and the whole circle always stands for 100 per cent of whatever is being divided up &#8212; here, the workforce.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-052', chapterId:CH_MAP, subsection:'graph_reading', difficulty:4,
  question:'Study the pie chart.' + PIE_SECTORS + 'Ten years later agriculture is still shown as 8 per cent, but the workforce has grown from 400 000 to 500 000 people. What has happened to the <b>number</b> of people working in agriculture?',
  options:['It has risen from 32 000 to 40 000, although the share is unchanged',
           'It has stayed at 32 000, because the share of the pie is unchanged',
           'It has fallen, because the other sectors have taken a larger share',
           'It cannot be worked out, because a pie chart shows no numbers at all'],
  answer:'It has risen from 32 000 to 40 000, although the share is unchanged',
  hint:'A percentage is a share of a total. Ask what has happened to the total.',
  explanation:'8 per cent of 400 000 is 32 000, and 8 per cent of 500 000 is 40 000. The slice looks identical because the share has not moved, but the pie itself is bigger, so the number behind the slice has grown by 8 000. A pie chart hides the total, which is why the total has to be given separately.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-053', chapterId:CH_MAP, subsection:'graph_reading', difficulty:4,
  question:'Study the graph.' + LINE_RATES + 'A pupil says the population must have started falling after 2000, because the birth-rate line keeps dropping. Why is the pupil wrong?',
  options:['Births still outnumber deaths, so the population is still growing',
           'The birth rate has dropped below the death rate, so the fall began earlier',
           'A birth rate cannot fall for forty years without an error in the data',
           'The graph shows rates for a single year only, so no trend can be read'],
  answer:'Births still outnumber deaths, so the population is still growing',
  hint:'A falling line and a line below another line are two different things. Compare the two lines.',
  explanation:'A falling birth rate means the population grows more slowly, not that it shrinks. The birth line stays above the death line throughout, ending at 10 against 8 per 1,000, so natural increase is still positive. A population only falls when the death line rises above the birth line, or when many people emigrate.' }));

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-map-data-skills · pyramid_construction — dpc-054 … 070
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-054', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:1,
  question:'When a population pyramid is drawn, what is set out along the vertical axis in the centre?',
  options:['The age groups','The number of males','The number of females','The years of the census'],
  answer:'The age groups',
  hint:'One axis carries groups of people; the other carries how many there are.',
  explanation:'A population pyramid puts the age groups up the middle, youngest at the bottom, and the number of people along the horizontal axis on each side. Putting numbers up the centre would leave nowhere to show age, which is the whole point of the figure.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-055', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:1,
  question:'By convention, which part of a population pyramid shows the males?',
  options:['The left-hand side','The right-hand side','The upper half','The lower half'],
  answer:'The left-hand side',
  hint:'The convention splits the figure down the middle rather than across it.',
  explanation:'Males are drawn to the left of the central age axis and females to the right. The upper and lower halves show old and young, not male and female, so a pyramid split that way would lose the comparison between the sexes entirely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-056', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:1,
  question:'Study the part-built pyramid.' + PYR_PART + 'Which bar has been left undrawn?',
  options:['Females aged 60 to 74','Males aged 60 to 74','Females aged 75 and over','Males aged 30 to 44'],
  answer:'Females aged 60 to 74',
  hint:'One bar is outlined with a broken line and carries a question mark instead of a length.',
  explanation:'The broken outline with the question mark sits on the right of the centre line, which is the female side, in the 60 to 74 band. The male bar for the same band is drawn in full, so reading the side as well as the band is what identifies the gap.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-057', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:2,
  question:'Study the pyramid and the table.' + PYR_PART + T_PYR + 'How many thousand should the missing bar show?',
  answer:85,
  hint:'Find the age band in the table, then take the figure from the column for the correct sex.',
  explanation:'The 60 to 74 row of the table gives 70 thousand males and 85 thousand females, and the missing bar is on the female side, so it should show 85 thousand. Taking 70 would draw the female bar to the same length as the male one and hide a real difference between the sexes.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-058', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:2,
  question:'A pupil is drawing a population pyramid on which 50 thousand people are represented by a bar 30 mm long. How long, in <b>millimetres</b>, should a bar of 85 thousand people be?',
  answer:51,
  hint:'Work out what one thousand people is worth in millimetres before scaling up.',
  explanation:'50 thousand is 30 mm, so 1 thousand is 0.6 mm and 85 thousand is 85 &#215; 0.6 = 51 mm. Setting up the proportion the other way round, 50 &#247; 30, gives 1.67 and then an answer of about 141, which is far too long for the axis drawn.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-059', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:2,
  question:'Study the table.' + T_PYR + 'How many thousand people in this country are aged <b>60 and over</b>?',
  answer:210,
  hint:'More than one row of the table counts as 60 and over, and each row has two columns.',
  explanation:'Two bands qualify: 75 and over (20 + 35 = 55 thousand) and 60 to 74 (70 + 85 = 155 thousand), giving 210 thousand in all. Using only the top row gives 55, and using only the male column gives 90, so both rows and both columns are needed.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-060', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:2,
  question:'Study the table.' + T_PYR + 'How many thousand <b>males</b> are there in this country altogether?',
  answer:535,
  hint:'Add down one column only, and check you have used every age band in the table.',
  explanation:'20 + 70 + 105 + 130 + 115 + 95 = 535 thousand males. Adding across a row instead gives the size of one age band, and adding the whole table gives the total population, so the column heading decides which sum is the right one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-061', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:2,
  question:'Study the table.' + T_PYR + 'In which age band do males outnumber females by the greatest number?',
  options:['30 to 44','0 to 14','15 to 29','45 to 59'],
  answer:'30 to 44',
  hint:'Take the difference for every band, and keep track of which sex is ahead in each.',
  explanation:'Males lead by 5 thousand at 30 to 44 and by 3 thousand at 0 to 14; females lead at 15 to 29, at 45 to 59 and in both older bands. So the largest male lead is in the 30 to 44 band. Checking only whether a band has a difference, rather than its size and direction, gives the wrong band here.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-062', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:3,
  question:'Why must both sides of a population pyramid be drawn to the same scale?',
  options:['Otherwise the two sexes cannot be compared by the length of the bars',
           'Otherwise the age bands will not line up across the central axis',
           'Otherwise the bars will not fit inside the frame drawn for them',
           'Otherwise the total population cannot be printed under the figure'],
  answer:'Otherwise the two sexes cannot be compared by the length of the bars',
  hint:'The figure is built so that one glance answers a question. Ask which question that is.',
  explanation:'The whole point of drawing males and females back to back is that a longer bar means more people, so the reader can compare the sexes at a glance. Two different scales break that, and a reader has no way of telling from the picture that it has happened. The age bands line up because the rows are the same height, whatever the horizontal scale.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-063', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:3,
  question:'Why is the youngest age band always placed at the bottom of a population pyramid and the oldest at the top?',
  options:['Each group moves up the chart as it ages, so change is easy to follow',
           'The oldest group is drawn last, so it has to be placed at the top',
           'Printing presses require the youngest group to be placed at the base',
           'The bottom of any chart is always kept for the largest bar of the set'],
  answer:'Each group moves up the chart as it ages, so change is easy to follow',
  hint:'Think about what happens to one particular bar over the next twenty years.',
  explanation:'Because age runs upwards, a bulge in one band today is the same people higher up the pyramid twenty years later, so a reader can follow a generation through the figure. Nothing about printing or bar size decides the order; the order is what makes the pyramid readable over time.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-064', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:3,
  question:'Study the table.' + T_PYR + 'The total population of this country is 1 100 thousand. What percentage of it is aged <b>under 15</b>? Give your answer to the nearest whole number.',
  answer:17, acceptableAnswers:['17', '17%'],
  hint:'Find the size of the youngest band first, remembering that it has two columns.',
  explanation:'The 0 to 14 band holds 95 + 92 = 187 thousand. As a share of 1 100 thousand that is 187 &#247; 1 100 = 0.170, or 17 per cent to the nearest whole number. Using only the male figure gives about 9 per cent, which would halve the country\'s children.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-065', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:3,
  question:'Study the pyramid and the table.' + PYR_PART + T_PYR + 'Once the missing bar has been drawn, which description best fits the shape of the whole pyramid?',
  options:['A narrow base with the widest bars in the middle age groups',
           'A wide base that narrows steadily towards the oldest group',
           'Bars of nearly equal width from the base to the very top',
           'A wide top with the narrowest bars in the middle age groups'],
  answer:'A narrow base with the widest bars in the middle age groups',
  hint:'Compare the youngest band with the bands above it before describing the shape.',
  explanation:'The 0 to 14 band holds 187 thousand, but 15 to 29 holds 233 and 30 to 44 holds 255, so the figure is widest in the middle and narrower at the base. That shape belongs to a country whose birth rate has been falling, not to a fast-growing one with a broad base.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-066', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:4,
  question:'A pupil draws the male bars of a pyramid using a scale of 1 cm to 25 thousand people, and the female bars using 1 cm to 50 thousand. What will the finished pyramid wrongly suggest?',
  options:['That there are far more males than females at every age',
           'That there are far more females than males at every age',
           'That the population has stopped growing altogether by now',
           'That the oldest age group is the largest one in the country'],
  answer:'That there are far more males than females at every age',
  hint:'Work out how long each side would draw the same number of people.',
  explanation:'At 1 cm to 25 thousand, 100 thousand males is drawn 4 cm long; at 1 cm to 50 thousand, the same 100 thousand females is only 2 cm. Every male bar is therefore twice as long as it should be next to the female one, and the picture invents a shortage of women that the figures do not contain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-067', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:4,
  question:'Country P has 12 million people and Country Q has 1 million. A pupil draws both pyramids in raw numbers on the same axis in order to compare their age structures. What should the pupil do instead, and why?',
  options:['Use percentages, so that the two shapes can be compared fairly',
           'Use raw numbers, because percentages hide the real totals here',
           'Draw Country Q twelve times larger so that the bars match up',
           'Draw only Country P, since the smaller country adds nothing'],
  answer:'Use percentages, so that the two shapes can be compared fairly',
  hint:'The question asks about structure, not about size. Which of the two is being compared?',
  explanation:'In raw numbers every bar of Country P dwarfs every bar of Country Q, so the drawing compares size and says nothing about structure. Drawing each band as a percentage of its own country puts both pyramids on one scale, and the shapes can then be compared directly.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-068', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:4,
  question:'A pupil is given figures in five-year age bands but draws the pyramid in fifteen-year bands to save time. What is lost by doing that?',
  options:['The detail that would show a sudden dip or bulge in one band',
           'The total population, which can no longer be worked out at all',
           'The split between males and females, which the bands carry',
           'The order of the age groups, which the wider bands reverse'],
  answer:'The detail that would show a sudden dip or bulge in one band',
  hint:'Ask what a narrow band can show that a wide band would average away.',
  explanation:'Wider bands average three five-year groups together, so a sharp notch &#8212; a year of few births, or a group that emigrated &#8212; disappears into the surrounding figures. The total, the split by sex and the order of the bands all survive the change; only the detail does not.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-069', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:4,
  question:'Study the table.' + T_PYR + 'A planner wants to know whether this country has more dependants (under 15 and 60 or over) than workers (15 to 59). Which statement is correct?',
  options:['There are fewer dependants than workers, about 56 for every 100',
           'There are more dependants than workers, about 156 for every 100',
           'There are as many dependants as workers, about 100 for every 100',
           'The table cannot answer this, since it gives no employment figures'],
  answer:'There are fewer dependants than workers, about 56 for every 100',
  hint:'Group the bands into the two categories first, then compare the two totals.',
  explanation:'Dependants are 187 thousand under 15 plus 210 thousand aged 60 and over, giving 397 thousand; workers aged 15 to 59 number 703 thousand. That is about 56 dependants for every 100 people of working age. The table does not say who actually has a job, but the age-based dependency ratio is calculated from age alone, so it can be worked out here.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-070', chapterId:CH_MAP, subsection:'pyramid_construction', difficulty:4,
  question:'Study the two pyramids.' + PYR_TWO + 'Which service will the country shown by Pyramid B need most in twenty years\' time, and why?',
  options:['Care for older people, because its widest bars will have aged by then',
           'Primary schools, because its narrow base will have widened by then',
           'Maternity wards, because its middle bars are of child-bearing age',
           'Primary schools, because more children are born as a country ages'],
  answer:'Care for older people, because its widest bars will have aged by then',
  hint:'Pick the widest bars of B and work out which band they will be in after twenty years.',
  explanation:'Pyramid B is widest at 45 to 59, and those people will be 65 to 79 in twenty years, so demand will fall on pensions, hospitals and care for the elderly. Its base is the narrowest band, so the number of primary-age children is set to fall, not rise. Pyramid A, with its broad base, is the one that needs schools.' }));

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-population · density_distribution — dpc-071 … 075
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-071', chapterId:CH_POP, subsection:'density_distribution', difficulty:1,
  question:'Which two figures must you know before you can calculate the population density of a district?',
  options:['Its total population and its area','Its birth rate and its death rate',
           'Its total population and its age','Its area and its annual rainfall'],
  answer:'Its total population and its area',
  hint:'Density is written as people per square kilometre. The unit names both figures needed.',
  explanation:'Density is population divided by area, so both figures are needed and the unit &#8212; people per km² &#8212; says exactly that. Birth and death rates describe how a population changes over time, not how tightly packed it is at one moment.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-072', chapterId:CH_POP, subsection:'density_distribution', difficulty:3,
  question:'Study the table.' + T_REGION + 'How many times greater is the population density of Region E than that of Region C?',
  answer:20,
  hint:'Two densities have to be worked out before they can be compared.',
  explanation:'Region E holds 152 000 people in 38 km², a density of 4 000 per km²; Region C holds 24 000 in 120 km², a density of 200 per km². 4 000 &#247; 200 = 20 times greater. Comparing the populations alone gives about 6 times, which is a different and much smaller answer.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-073', chapterId:CH_POP, subsection:'density_distribution', difficulty:4,
  question:'Study the map and the table.' + CHORO_DENSITY + T_REGION + 'A company wants to open a shop where the greatest number of customers live within a short walk. Which region suits it best, and why?',
  options:['Region E, because it has the most people packed into each km²',
           'Region A, because it holds the largest population of the six',
           'Region F, because it covers the largest area of the six regions',
           'Region C, because land is cheapest where very few people live'],
  answer:'Region E, because it has the most people packed into each km²',
  hint:'A short walk covers a small area. Decide whether that makes total population or density the useful figure.',
  explanation:'Within a short walk only a small area can be reached, so what matters is how many people live in each km². Region E has 4 000 per km², the highest of the six, against 3 000 in Region A. Region A has more people in total, but they are spread over half as much space again, so fewer of them are within walking distance of any one shop.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-074', chapterId:CH_POP, subsection:'density_distribution', difficulty:4,
  question:'Two districts have exactly the same population density. In one, almost everybody lives in a single town along one road; in the other, people are spread evenly across the farmland. What does this show about density as a measure?',
  options:['Density is an average and hides how people are spread inside a region',
           'Density is wrong whenever people are not spread evenly on the ground',
           'Density can only be used for towns, never for country districts',
           'Density and distribution mean the same thing when totals match'],
  answer:'Density is an average and hides how people are spread inside a region',
  hint:'Ask what one number for a whole district can and cannot tell you about the places inside it.',
  explanation:'Density divides everybody in a district by all of its land, so it is an average and two very different patterns can give the same figure. That is why geographers use density alongside distribution, which describes where inside the district the people actually are. Density is not wrong in the uneven case; it is simply answering a narrower question.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-075', chapterId:CH_POP, subsection:'density_distribution', difficulty:4,
  question:'A district of steep mountain slopes has a low population density, while a flat coastal district next to it has a high one. Which factor best explains the difference?',
  options:['Flat land is easier to build on and to farm than steep slopes',
           'Mountains receive no rainfall, so nobody is able to settle there',
           'Coastal districts are always smaller than mountain districts are',
           'People are required by law to live within reach of the coastline'],
  answer:'Flat land is easier to build on and to farm than steep slopes',
  hint:'Think about what a builder or a farmer needs from the ground itself.',
  explanation:'Relief is one of the strongest controls on where people settle: flat land takes roads, houses and fields cheaply, while steep slopes make all three difficult and expensive. Mountains usually receive <b>more</b> rain rather than none, and no law ties anyone to the coast, so neither alternative explains the pattern.' }));

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-population · structure_pyramids — dpc-076 … 082
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-076', chapterId:CH_POP, subsection:'structure_pyramids', difficulty:1,
  question:'Which people are shown by the bars at the very top of a population pyramid?',
  options:['The oldest people','The youngest people','The working adults','The newborn babies'],
  answer:'The oldest people',
  hint:'Age increases in one direction up the central axis. Decide which.',
  explanation:'Age runs upwards on a pyramid, so the top bars are the oldest age band and the bottom bars are the newborn and the youngest children. Working adults occupy the middle bands, between the two.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-077', chapterId:CH_POP, subsection:'structure_pyramids', difficulty:2,
  question:'Study the two pyramids.' + PYR_TWO + 'Which pyramid shows the larger share of children, and how can you tell?',
  options:['Pyramid A, because its base is the widest part of the figure',
           'Pyramid B, because its middle is the widest part of the figure',
           'Pyramid A, because its top is the narrowest part of the figure',
           'Pyramid B, because its base is the narrowest part of the figure'],
  answer:'Pyramid A, because its base is the widest part of the figure',
  hint:'Children sit in the lowest band, so compare the width of the bottom bar in each figure.',
  explanation:'The 0 to 14 band is the bottom bar, and it is the widest bar in Pyramid A while it is the narrowest in Pyramid B. A wide base therefore means a large share of children. A narrow top tells you about old people, not about children, so it cannot answer this question.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-078', chapterId:CH_POP, subsection:'structure_pyramids', difficulty:2,
  question:'Study the two pyramids.' + PYR_TWO + 'Which pyramid has its widest bars in the middle age bands?',
  options:['Pyramid B','Pyramid A','Both pyramids','Neither pyramid'],
  answer:'Pyramid B',
  hint:'Compare the middle bars of each figure with the bars above and below them.',
  explanation:'Pyramid B widens from a narrow base to its widest bar at 45 to 59, then narrows again at the top. Pyramid A is widest at its base and narrows steadily upwards. The two shapes belong to very different stages of population change.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-079', chapterId:CH_POP, subsection:'structure_pyramids', difficulty:3,
  question:'Study the two pyramids.' + PYR_TWO + 'Pyramid B shows the same country as Pyramid A, forty years later. What must have happened in between?',
  options:['The birth rate fell, so fewer children entered at the base',
           'The birth rate rose, so more children entered at the base',
           'The death rate rose sharply among adults of working age',
           'Large numbers of older people moved into the country'],
  answer:'The birth rate fell, so fewer children entered at the base',
  hint:'Follow the widest bar of A upward through forty years, and ask what replaced it at the base.',
  explanation:'The broad base of A has moved up to become the broad middle of B, and the new base is narrow, which means far fewer children are being born than forty years earlier. A rising death rate among working adults would thin the middle bars rather than widen them, and migration of the elderly would not narrow the base at all.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-080', chapterId:CH_POP, subsection:'structure_pyramids', difficulty:4,
  question:'Study the two pyramids.' + PYR_TWO + 'A government reading Pyramid B must plan primary school places for the next ten years. What should it expect?',
  options:['Fewer pupils, because the base is narrower than the bars above it',
           'More pupils, because the middle bars are the widest on the chart',
           'The same number, because a pyramid cannot show future pupils',
           'More pupils, because older people now have more grandchildren'],
  answer:'Fewer pupils, because the base is narrower than the bars above it',
  hint:'Primary pupils come from the youngest band. Ask whether that band is growing or shrinking.',
  explanation:'The children who will fill primary schools over the next ten years are already in or near the bottom band, and that band is the narrowest in Pyramid B. So the government should plan for falling numbers &#8212; perhaps merging schools &#8212; rather than for growth. The wide middle bars are adults, who will need pensions later, not school places now.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-081', chapterId:CH_POP, subsection:'structure_pyramids', difficulty:4,
  question:'A population pyramid shows a deep notch in the bars for men aged 60 to 74, but no notch in the bars for women of the same age. Which explanation fits best?',
  options:['Men of that generation left the country to work and did not return',
           'Boys were simply not counted in the census taken in that one year',
           'Women of that age group were counted twice by mistake in the census',
           'Men and women are always drawn on two completely different scales'],
  answer:'Men of that generation left the country to work and did not return',
  hint:'The gap affects one sex in one band only. Which causes act on a single sex?',
  explanation:'A notch on one side only points to something that affected one sex: labour migration abroad is the classic cause, since it has usually drawn away young men. A census error would be very unlikely to miss one sex in one band alone, and the two sides of a pyramid are always drawn to the same scale, so a scale difference could not produce a notch in a single band.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-082', chapterId:CH_POP, subsection:'structure_pyramids', difficulty:4,
  question:'Study the table.' + T_PYR + 'A planner says that within fifteen years more people will be leaving work than joining it. Which feature of the figures supports that?',
  options:['The 45 to 59 band holds more people than the 0 to 14 band',
           'The 0 to 14 band holds more people than the 45 to 59 band',
           'Females outnumber males in every one of the six age bands',
           'The 75 and over band is the smallest band in the whole table'],
  answer:'The 45 to 59 band holds more people than the 0 to 14 band',
  hint:'Work out which band will reach retirement and which will reach working age over that period.',
  explanation:'The 45 to 59 band (215 thousand) reaches retirement within about fifteen years, while the 0 to 14 band (187 thousand) is what replaces them at the bottom of the workforce. More leaving than arriving is exactly what those two figures say. Females do not outnumber males in every band &#8212; males lead at 0 to 14 and at 30 to 44 &#8212; so that option is false as well as irrelevant.' }));

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-population · birth_death_rates — dpc-083 … 093
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-083', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:1,
  question:'What does the crude <b>death</b> rate of a country measure?',
  options:['The number of deaths per 1,000 people in one year',
           'The number of deaths in every family during one year',
           'The number of deaths per 1,000 births during one year',
           'The number of deaths among people over 60 each year'],
  answer:'The number of deaths per 1,000 people in one year',
  hint:'The word crude tells you the whole population is counted, not one part of it.',
  explanation:'The crude death rate counts deaths per 1,000 of the whole population in a year. Deaths per 1,000 live births is the infant mortality rate, a different measure, and counting deaths among the over-60s alone would leave out every other age group.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-084', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:1,
  question:'In which units is a crude birth rate normally given?',
  options:['Births per 1,000 people per year','Births per 100 families per year',
           'Births per 1,000 women in a lifetime','Births per year in the whole country'],
  answer:'Births per 1,000 people per year',
  hint:'A rate has to allow two countries of different sizes to be compared fairly.',
  explanation:'A crude birth rate is births per 1,000 people in one year, which lets a small country and a large one be compared directly. A plain count of births cannot do that, and births per woman over a lifetime is the fertility rate, a separate measure.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-085', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:2,
  question:'Study the table.' + T_VITAL + 'What was the natural increase per 1,000 people in 2010?',
  answer:5,
  hint:'Take the two rate columns for that row and combine them the way natural increase is defined.',
  explanation:'In 2010 the birth rate is 12 per 1,000 and the death rate is 7 per 1,000, so the natural increase is 12 &#8722; 7 = 5 per 1,000. The life expectancy column plays no part in this calculation, although it sits in the same row.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-086', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:2,
  question:'A country has 1 200 000 people and a crude birth rate of 15 per 1,000. How many births were there in that year?',
  answer:18000,
  hint:'Work out how many thousands of people there are before applying the rate.',
  explanation:'1 200 000 people is 1 200 thousands, and each thousand produced 15 births, so 1 200 &#215; 15 = 18 000 births. Multiplying the whole population by 15 gives 18 million, which is more births than there are people &#8212; a useful check that the division by 1 000 has been missed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-087', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:2,
  question:'Study the graph.' + LINE_RATES + 'In which year shown are the birth rate and the death rate closest together?',
  options:['2020','1960','1980','2000'],
  answer:'2020',
  hint:'Compare the vertical gap between the two lines at each labelled year.',
  explanation:'In 2020 the birth rate is 10 and the death rate 8, a gap of 2 per 1,000, the narrowest on the graph. In 2010 the gap is 5, and in 1960 it is 30. The two lines are closest where the population is growing most slowly by natural increase.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-088', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:3,
  question:'Why can a country\'s population keep growing for many years after its birth rate has fallen sharply?',
  options:['Many young adults born earlier are still having children',
           'A falling birth rate raises the death rate at the same time',
           'Births are counted twice whenever the birth rate is falling',
           'Older people are removed from the count once they retire'],
  answer:'Many young adults born earlier are still having children',
  hint:'Think about how many people are of child-bearing age, not only about the rate itself.',
  explanation:'This is population momentum. A generation born when the birth rate was high is now of child-bearing age, so even a low rate applied to a large number of young adults still produces many births and keeps the total rising. A falling birth rate does not raise deaths, and nobody leaves a population count on retiring.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-089', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:3,
  question:'Which change would tend to <b>lower</b> a country\'s crude birth rate?',
  options:['More women staying in education and working for longer',
           'More young couples moving into the country each year',
           'Better health care for babies in their first year of life',
           'A rise in the number of women of child-bearing age'],
  answer:'More women staying in education and working for longer',
  hint:'Two of the options add more potential parents. Ask what each change does to the number of births.',
  explanation:'Longer education and paid work tend to delay marriage and childbearing and to reduce family size, which lowers the birth rate. More young couples and more women of child-bearing age both push the rate up, and better infant health care usually lowers it only indirectly and much later, once parents come to expect their children to survive.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-090', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:3,
  question:'Study the table.' + T_VITAL + 'By how many points per 1,000 did the birth rate fall between 1970 and 2020?',
  answer:20,
  hint:'Use the first and last rows of the births column only, and find the difference.',
  explanation:'The birth rate falls from 30 per 1,000 in 1970 to 10 per 1,000 in 2020, a fall of 20 points. Note that this is a fall of 20 <b>points</b>, not 20 per cent &#8212; measured as a percentage the rate has fallen by two thirds.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-091', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:4,
  question:'Study the table.' + T_VITAL + 'A minister argues that the country is getting less healthy, because the death rate rose from 6 in 1990 to 8 in 2020. Using the whole table, why is that reading unsafe?',
  options:['Life expectancy rose over the same years, so people are living longer',
           'Life expectancy fell over the same years, so the rise was expected',
           'The birth rate also rose, so both rates must move in step with each other',
           'A death rate of 8 per 1,000 is far too small a figure to mean anything'],
  answer:'Life expectancy rose over the same years, so people are living longer',
  hint:'Check the other columns of the table before accepting a claim built on only one.',
  explanation:'Life expectancy rises from 69 to 75 years across the same period, which is the opposite of a country getting less healthy. The crude death rate rose because a larger share of the population is now elderly, not because health worsened. The birth rate fell rather than rose, so the third option is false as well as beside the point.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-092', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:4,
  question:'Two countries both record a crude death rate of 9 per 1,000. One is a wealthy country with many elderly people; the other is a poorer country with a very young population. What does this tell you about the crude death rate?',
  options:['It depends on age structure, so it cannot rank health on its own',
           'It is the surest single measure of how healthy a country really is',
           'It must have been measured wrongly in one of the two countries',
           'It shows that the two countries have the same age structure'],
  answer:'It depends on age structure, so it cannot rank health on its own',
  hint:'Ask which country would be expected to have more deaths simply because of who lives there.',
  explanation:'An elderly population produces more deaths for the same standard of health, so a wealthy ageing country can match a poorer young country on crude death rate while being much healthier. That is why life expectancy and infant mortality are used alongside it; neither is distorted by age structure in the same way.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-093', chapterId:CH_POP, subsection:'birth_death_rates', difficulty:4,
  question:'A district records more births than deaths in every year of a decade, yet its total population falls over that decade. What must be happening?',
  options:['More people are leaving the district than are moving into it',
           'More people are moving into the district than are leaving it',
           'The birth rate and the death rate are exactly equal there',
           'Deaths are counted in the year after they actually happen'],
  answer:'More people are leaving the district than are moving into it',
  hint:'Natural increase is only one of the two things that change a district\'s population.',
  explanation:'A population changes through natural increase and through migration. Natural increase is positive here, so the fall can only come from net out-migration greater than the natural increase. If the two rates were equal, natural increase would be zero and the population would be steady rather than falling.' }));

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-population · life_expectancy — dpc-094 … 108
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-094', chapterId:CH_POP, subsection:'life_expectancy', difficulty:1,
  question:'Study the table.' + T_VITAL + 'According to the table, what was the life expectancy, in years, in 1990?',
  answer:69,
  hint:'Find the row for the year, then move across to the last column.',
  explanation:'The 1990 row meets the life expectancy column at 69 years. The same row holds 20 and 6, which are rates per 1,000 and not ages, so the column heading decides which of the three figures answers the question.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-095', chapterId:CH_POP, subsection:'life_expectancy', difficulty:1,
  question:'Life expectancy at birth is normally worked out for which group of people?',
  options:['Everyone born in a given year','Only people who reach the age of 60',
           'Only the men of a given country','Only people who die in a given year'],
  answer:'Everyone born in a given year',
  hint:'The phrase at birth points at when the group is chosen, not at when it ends.',
  explanation:'Life expectancy at birth is the average number of years a baby born this year could expect to live if current conditions continued, so it covers everyone born in that year. Figures for people who have already reached 60 are quoted separately, as life expectancy at 60.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-096', chapterId:CH_POP, subsection:'life_expectancy', difficulty:1,
  question:'Study the graph.' + LINE_LIFE + 'Which line lies higher throughout the whole period?',
  options:['The line for females','The line for males','They are equal throughout','They cross in mid-period'],
  answer:'The line for females',
  hint:'Check the legend to see which line is which, then compare them at both ends.',
  explanation:'The solid red line, given in the legend as females, lies above the dashed blue male line at every year plotted. The two lines come closer together over time but never meet, so they do not cross.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-097', chapterId:CH_POP, subsection:'life_expectancy', difficulty:2,
  question:'Study the graph.' + LINE_LIFE + 'What was the life expectancy of <b>males</b> in 1970, in years?',
  answer:60,
  hint:'Read the legend first: one line is drawn solid and the other broken.',
  explanation:'Going up from 1970 to the dashed blue male line and across to the axis gives 60 years. The solid red line at the same year gives 67, which is the female figure, so the legend must be checked before a value is taken off either line.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-098', chapterId:CH_POP, subsection:'life_expectancy', difficulty:2,
  question:'Study the graph.' + LINE_LIFE + 'What was the life expectancy of <b>females</b> in 1980, in years?',
  answer:70,
  hint:'Find the year on the horizontal axis first, then follow the correct line up to it.',
  explanation:'Above 1980 the solid red female line sits exactly on the labelled gridline at 70 years. The labelled lines are five years apart with four unlabelled lines between, so a point that lands on a labelled line can be read off directly.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-099', chapterId:CH_POP, subsection:'life_expectancy', difficulty:2,
  question:'Study the table.' + T_VITAL + 'By how many years did life expectancy rise between 1970 and 2020?',
  answer:13,
  hint:'Use the first and last rows of the life expectancy column only.',
  explanation:'Life expectancy rises from 62 years in 1970 to 75 years in 2020, an increase of 13 years. Reading the wrong column gives 20 (the fall in the birth rate), which is a change in a rate per 1,000 rather than a change in years.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-100', chapterId:CH_POP, subsection:'life_expectancy', difficulty:3,
  question:'Study the graph.' + LINE_LIFE + 'What has happened to the gap between male and female life expectancy since 1970?',
  options:['It has narrowed, from about seven years to about four',
           'It has widened, from about four years to about seven',
           'It has stayed at about seven years for the whole period',
           'It has closed completely, with the two lines now meeting'],
  answer:'It has narrowed, from about seven years to about four',
  hint:'Measure the vertical distance between the lines at the start and at the end.',
  explanation:'In 1970 the lines are 67 and 60, a gap of seven years; by 2020 they are 79 and 75, a gap of four. Both lines rise, but the male line rises faster, so the gap closes without the lines ever meeting. A reader who looks only at the rising lines misses that the distance between them is changing.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-101', chapterId:CH_POP, subsection:'life_expectancy', difficulty:3,
  question:'Why does life expectancy at birth rise sharply when the number of infant deaths falls?',
  options:['Deaths of babies pull the average down more than any other deaths',
           'Babies who survive are counted twice in the average for that year',
           'The measure counts only the people who live past their first year',
           'Falling infant deaths always raise the birth rate in the same year'],
  answer:'Deaths of babies pull the average down more than any other deaths',
  hint:'Life expectancy is an average of ages at death. Ask which death pulls that average furthest.',
  explanation:'A death at a few months old enters the average as almost zero years, while a death at 80 enters it as 80, so infant deaths drag the mean down hardest. Preventing them therefore raises life expectancy faster than any other single improvement, which is why the measure rose so steeply once clean water and vaccination spread.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-102', chapterId:CH_POP, subsection:'life_expectancy', difficulty:3,
  question:'Life expectancy at birth in a country is 75 years, yet a man who has already reached 70 is told that his own life expectancy is 82. Why are the two figures different?',
  options:['He has already survived the risks that lower the figure at birth',
           'Life expectancy is recalculated upwards on every birthday he has',
           'Men aged over 70 are measured on a different scale from others',
           'The figure of 75 years applies only to women born in that year'],
  answer:'He has already survived the risks that lower the figure at birth',
  hint:'The figure at birth is an average over everybody, including those who die young.',
  explanation:'Life expectancy at birth averages in every death at every age, including infancy and middle age. Someone who has reached 70 is no longer at risk of those earlier deaths, so their remaining expectation is measured from a group that has already survived them, and the total comes out higher than 75.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-103', chapterId:CH_POP, subsection:'life_expectancy', difficulty:3,
  question:'In one country life expectancy rose from 55 years in 1960 to 79 years in 2020. On average, by how many years did it rise per <b>decade</b>?',
  answer:4,
  hint:'Work out the whole rise first, then how many decades it was spread across.',
  explanation:'The rise is 79 &#8722; 55 = 24 years, spread over six decades from 1960 to 2020, so 24 &#247; 6 = 4 years per decade. Dividing by 60 instead of 6 gives 0.4 and answers a different question &#8212; the average rise per year.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-104', chapterId:CH_POP, subsection:'life_expectancy', difficulty:3,
  question:'Which change usually does MOST to raise life expectancy in a poor country?',
  options:['Clean drinking water and vaccination for young children',
           'More hospital beds for people over the age of seventy',
           'A larger number of private clinics in the capital city',
           'Longer opening hours at the pharmacies in each village'],
  answer:'Clean drinking water and vaccination for young children',
  hint:'Look back at which deaths pull the average down the hardest.',
  explanation:'Clean water and vaccination prevent deaths in early childhood, and those are the deaths that drag life expectancy down furthest, so they raise the figure fastest and reach the whole population. Beds for the very old add years at the end of life only, and clinics in the capital reach a small share of the people.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-105', chapterId:CH_POP, subsection:'life_expectancy', difficulty:4,
  question:'Country X has a life expectancy of 74 years and Country Y of 73, but Country Y has far fewer doctors per person. What is the safest conclusion?',
  options:['Health depends on more than doctors, such as water, food and housing',
           'The figure for Country Y must have been recorded wrongly at some point',
           'Doctors make no difference at all to how long people live anywhere',
           'Country Y must have a much younger population than Country X does'],
  answer:'Health depends on more than doctors, such as water, food and housing',
  hint:'Ask what else, besides medical staff, decides whether people reach old age.',
  explanation:'Clean water, sanitation, diet, housing and vaccination all raise life expectancy, and a country can do well on those with relatively few doctors. That is a long way from saying doctors do not matter &#8212; they plainly do &#8212; and nothing in the two figures justifies assuming an error or guessing at age structure.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-106', chapterId:CH_POP, subsection:'life_expectancy', difficulty:4,
  question:'A newspaper reports that because life expectancy is now 75 years, almost everybody in the country will live to about 75. Why is that reading wrong?',
  options:['It is an average, so many die earlier and many live much longer',
           'It is a maximum, so nobody in the country can live past 75 years',
           'It is a minimum, so everybody in the country will pass 75 years',
           'It is only an estimate made for the men of that country alone'],
  answer:'It is an average, so many die earlier and many live much longer',
  hint:'Ask what an average does and does not tell you about the individuals behind it.',
  explanation:'Life expectancy is a mean age at death, and a mean says nothing about the spread around it. Two countries with the same figure can differ greatly in how many die young. Treating an average as a maximum or a minimum is the same mistake made in two opposite directions.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-107', chapterId:CH_POP, subsection:'life_expectancy', difficulty:4,
  question:'A health planner must choose between building more maternity wards and more wards for the elderly. Over fifty years, life expectancy has risen by 15 years and the birth rate has halved. Which choice do the figures support, and why?',
  options:['Wards for the elderly, because more people are reaching old age',
           'Maternity wards, because a longer life means more children born',
           'Wards for the elderly, because a falling birth rate raises deaths',
           'Maternity wards, because the halved birth rate will soon recover'],
  answer:'Wards for the elderly, because more people are reaching old age',
  hint:'Two options name the same building. Judge them by the reason attached to each.',
  explanation:'Rising life expectancy means more people surviving into old age, and a halved birth rate means fewer births to serve, so both figures point the same way. The reason matters: a falling birth rate does not itself raise deaths, so that option reaches the right building by an argument the data does not support.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-108', chapterId:CH_POP, subsection:'life_expectancy', difficulty:4,
  question:'Two villages record exactly the same life expectancy. In one, many people die young and many live to a great age; in the other, most die close to the average. What extra information would reveal that difference?',
  options:['The spread of ages at death, not just their average',
           'The total number of people living in each village',
           'The number of doctors working in each of the villages',
           'The year in which each of the villages was first settled'],
  answer:'The spread of ages at death, not just their average',
  hint:'The two villages agree on one statistic. Ask what a second statistic would have to describe.',
  explanation:'An average is a single number and cannot show how widely the values are scattered around it. The spread &#8212; for example the share dying before 40 and the share living past 80 &#8212; separates the two villages at once. Population size and the number of doctors describe the villages but not the pattern of ages at death.' }));

// ══════════════════════════════════════════════════════════════════════════
//  g9sms-population · ageing — dpc-109 … 120
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-109', chapterId:CH_POP, subsection:'ageing', difficulty:1,
  question:'What is meant by an <b>ageing population</b>?',
  options:['One in which the share of older people is rising',
           'One in which the total population is rising fast',
           'One in which people of every age are getting older',
           'One in which the number of births is rising fast'],
  answer:'One in which the share of older people is rising',
  hint:'The phrase describes a change in the make-up of a population, not in its size.',
  explanation:'An ageing population is one where older people make up a growing share of the total. Everyone gets older every year, so that alone describes nothing; and a population can be ageing while its total size rises, falls or holds steady.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-110', chapterId:CH_POP, subsection:'ageing', difficulty:2,
  question:'Which two changes together produce an ageing population?',
  options:['A falling birth rate and a rising life expectancy',
           'A rising birth rate and a rising life expectancy',
           'A falling birth rate and a falling life expectancy',
           'A rising birth rate and a falling life expectancy'],
  answer:'A falling birth rate and a rising life expectancy',
  hint:'One change thins the bottom of the pyramid and the other thickens the top.',
  explanation:'Fewer births narrow the base of the pyramid, and longer lives widen the top, so together they raise the share of older people. A rising birth rate would widen the base again and work against ageing, and a falling life expectancy would thin the top.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpc-111', chapterId:CH_POP, subsection:'ageing', difficulty:2,
  question:'Study the table.' + T_PYR + 'The total population of this country is 1 100 thousand. What percentage of it is aged <b>60 and over</b>? Give your answer to the nearest whole number.',
  answer:19, acceptableAnswers:['19', '19%'],
  hint:'Two of the age bands count as 60 and over, and each band has two columns.',
  explanation:'The two oldest bands hold 20 + 35 + 70 + 85 = 210 thousand people. As a share of 1 100 thousand that is 210 &#247; 1 100 = 0.191, or 19 per cent to the nearest whole number. Using only the 75 and over band gives 5 per cent and leaves out most of the elderly.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-112', chapterId:CH_POP, subsection:'ageing', difficulty:2,
  question:'Study the bar chart.' + BAR_AGEING + 'By 2020, what share of the population was aged 60 and over?',
  options:['20 per cent','14 per cent','10 per cent','4 per cent'],
  answer:'20 per cent',
  hint:'Find the final bar and follow its top across to the labelled axis.',
  explanation:'The 2020 bar reaches the gridline labelled 20 per cent. The bar beside it, for 2010, reaches 14 per cent, so reading the second-to-last bar by mistake understates the share by six points &#8212; a large error when pensions are being planned from it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-113', chapterId:CH_POP, subsection:'ageing', difficulty:3,
  question:'Why does an ageing population put pressure on a country\'s pension system?',
  options:['Fewer workers pay in while more pensioners draw out',
           'More workers pay in while fewer pensioners draw out',
           'Pensions are paid from taxes on children under fifteen',
           'Older people stop paying every kind of tax once retired'],
  answer:'Fewer workers pay in while more pensioners draw out',
  hint:'Follow the money: who contributes to a pension system, and who receives from it?',
  explanation:'Pensions are largely funded from the taxes of people in work. Ageing raises the number of pensioners drawing out and, because the birth rate has fallen, lowers the number of workers paying in, so the burden on each worker rises. Children pay no tax, so they cannot be the source.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-114', chapterId:CH_POP, subsection:'ageing', difficulty:3,
  question:'Why does an ageing population change the <b>kind</b> of illness a health service has to treat?',
  options:['Long-term illnesses of old age replace childhood infections',
           'Childhood infections replace the long-term illnesses of old age',
           'Older people catch the same infections as children do more often',
           'The number of illnesses stays the same whatever the age structure'],
  answer:'Long-term illnesses of old age replace childhood infections',
  hint:'Ask which illnesses belong mainly to the young and which belong mainly to the old.',
  explanation:'A young population keeps a health service busy with infections and childbirth; an older one shifts demand towards diabetes, heart disease, cancer and dementia, which need long-term care rather than a short course of treatment. The change is in the kind of care needed, not only in how much.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-115', chapterId:CH_POP, subsection:'ageing', difficulty:3,
  question:'Mauritius has an ageing population. Which measure would do most to keep up the number of people in work?',
  options:['Raising the age at which people retire from work',
           'Lowering the age at which people retire from work',
           'Paying a larger pension to everyone aged over sixty',
           'Closing some schools to save money on teachers now'],
  answer:'Raising the age at which people retire from work',
  hint:'Ask which measure moves people from one side of the dependency ratio to the other.',
  explanation:'Raising the retirement age keeps experienced people in work for longer, so they continue to earn and to pay tax instead of drawing a pension. Lowering it does the opposite, and a larger pension helps pensioners without adding a single worker. Closing schools saves money but does nothing about the size of the workforce.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-116', chapterId:CH_POP, subsection:'ageing', difficulty:4,
  question:'A pupil argues that an ageing population is simply bad news for a country. Which is the strongest argument against that view?',
  options:['Older people pass on skills, mind grandchildren and spend money',
           'Older people need fewer doctors than the children of school age',
           'Older people are always replaced by young migrants from abroad',
           'Older people pay more tax than workers because they own houses'],
  answer:'Older people pass on skills, mind grandchildren and spend money',
  hint:'Look for the option that is actually true, not just the one that sounds most positive.',
  explanation:'Older people contribute experience, unpaid childcare that frees parents to work, volunteering and spending that supports jobs, so the picture is not one-sided. The other options are simply false: older people use more health care, not less; migration is not automatic; and retired people generally pay less income tax, not more.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-117', chapterId:CH_POP, subsection:'ageing', difficulty:4,
  question:'Study the bar chart.' + BAR_AGEING + 'A minister must plan pension spending for 2030. Which reading of the chart is the safer basis for that plan?',
  options:['The share aged 60 and over is rising faster after 2000 than before',
           'The share aged 60 and over has risen by 2 points in every decade',
           'The share aged 60 and over will fall once the oldest bars pass on',
           'The chart shows a single country, so it can predict nothing at all'],
  answer:'The share aged 60 and over is rising faster after 2000 than before',
  hint:'Check the size of each step before assuming the rise is steady.',
  explanation:'The steps are 2, 2, 2, then 4 and 6 points, so the rise has accelerated and a plan built on a steady 2 points a decade would badly understate 2030. The bars carry no information about deaths among the oldest group, and a chart of one country is exactly the right evidence for planning that country.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-118', chapterId:CH_POP, subsection:'ageing', difficulty:4,
  question:'Two countries each have 20 per cent of their people aged 60 and over. Country M took sixty years to reach that level; Country N took twenty. Which faces the harder task, and why?',
  options:['Country N, because it has had far less time to prepare',
           'Country M, because it has been ageing for three times as long',
           'Country N, because a faster rise always means fewer old people',
           'Neither, because the share of old people is the same in both'],
  answer:'Country N, because it has had far less time to prepare',
  hint:'The two countries agree on the level. Ask what the speed of the change costs a government.',
  explanation:'Building pension funds, care homes and a trained care workforce takes decades, so a country that ages in twenty years must find the money and the staff in a third of the time. The level being equal is exactly why the speed is the thing that separates them, and a fast rise does not mean fewer old people &#8212; the share is the same.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-119', chapterId:CH_POP, subsection:'ageing', difficulty:4,
  question:'A government answers an ageing population by encouraging families to have more children. Why will that not ease the pressure on pensions for at least twenty years?',
  options:['Babies born today will not pay tax until they are adults',
           'Babies born today raise the death rate before they raise taxes',
           'Pensions are paid out of savings, so more births never help',
           'A higher birth rate lowers life expectancy for twenty years'],
  answer:'Babies born today will not pay tax until they are adults',
  hint:'Work out when a child born this year first joins the group that funds pensions.',
  explanation:'A child born today joins the workforce in about twenty years and until then is a dependant, needing schooling and health care, so in the short run the policy raises costs rather than lowering them. It can still be the right policy; it simply cannot be a short-term answer to a pension gap.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpc-120', chapterId:CH_POP, subsection:'ageing', difficulty:4,
  question:'An island provides free transport, free health care and a universal old-age pension, and its population is ageing quickly. What is the main risk to those measures?',
  options:['A smaller share of workers must fund a larger share of pensioners',
           'A larger share of workers must fund a smaller share of pensioners',
           'Older people will use the free transport less than younger people',
           'Free health care becomes cheaper as a population grows older'],
  answer:'A smaller share of workers must fund a larger share of pensioners',
  hint:'Universal measures are paid for out of taxation. Ask who pays and who draws.',
  explanation:'Universal benefits are funded from the taxes of people in work, so ageing squeezes them from both sides at once: fewer workers paying in and more claimants drawing out, with health care the most expensive of the three for the elderly. Health costs rise rather than fall with age, and free transport is used heavily by older people.' }));

})();
