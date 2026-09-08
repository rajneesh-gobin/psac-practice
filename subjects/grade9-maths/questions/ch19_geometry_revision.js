'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Geometry Revision (Grades 7-8)
//
//  ⚠ THIS IS NOT A GRADE 9 SYLLABUS CONTENT AREA, and neither was
//    g9m-number-revision. The same gap, in a different strand: §3.9 lists only
//    Trigonometry, Coordinates and Vectors under Geometry, yet the papers keep
//    testing angle work, sets and compound shapes, all taught in Grades 7-8.
//
//    Witnesses, all read off the page:
//      NCE 2025 Q11(c)  angle x in a figure with a right angle and 55 degrees
//      NCE 2025 Q15(b)  shade A union B on a Venn diagram                  [1]
//      NCE 2024 Q17     two-set Venn word problem, 30 students             [5]
//      NCE 2024 Q20     find angle a between two parallel lines            [2]
//      NCE 2024 Q28(b)  the pie-chart angle for one category               [2]
//
//    Without a home these questions simply could not be written, and a
//    generated paper would keep missing a kind of question the real one has
//    every year. Recorded in docs/nce-grade9/syllabus-map.md.
//
//  ⚠ WRITTEN TO FILL THE LAST STARVED ROLE. After batch 10 the bank held 54
//    diagram-carrying tasks against the ~80 a ten-paper run wants, and a
//    generated set of ten papers used only 19 DISTINCT figures. Every item
//    here carries a figure, and they come from six families that did not
//    exist in the bank before: angles at a point, angles on parallel lines,
//    Venn diagrams, compound shapes, pie charts and shapes on a grid.
//
//  ⚠ All original SVG, monochrome, no network. Angles are marked with arcs and
//    parallel lines with arrowheads, exactly as the papers draw them.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-geometry-revision';
const SRC = 'Grade 7-8 geometry carried into the NCE paper; NCE 2025 Q11(c), Q15(b), '
          + '2024 Q17, Q20, Q28(b) witnesses.';

// ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//   The HTML parser leaves foreign content on i/b/em/font/..., so an <i> in a
//   <text> node TERMINATED the svg element: everything after it was reparsed
//   as sibling HTML and printed in the corner of the page. Nine of the
//   twenty-one figures below were cut in half by it, and nothing failed -
//   the questions loaded, the tests passed, and only rendering the pages to
//   PNG and looking at them showed it. Italic inside svg is a tspan.
const ITAL = t => '<tspan font-style="italic">' + t + '</tspan>';

const SVG_OPEN = (w, h) => '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg" role="img">';

// ── 1. Angles meeting at a point on a straight line ────────────────────
// ⚠ The slices are the TRUE angles. The first cut shared the half-turn out in
//   the RATIO of the labels, which drew the right picture only because every
//   caller happened to sum to 180 - and would have drawn a confident lie the
//   first time one did not. It now throws instead.
function anglesOnLine(labels) {
  const cx = 150, cy = 96, r = 78;
  const total = labels.reduce((s, l) => s + l.deg, 0);
  if (total !== 180) throw new Error('anglesOnLine: angles sum to ' + total + ', not 180');
  const rad = d => d * Math.PI / 180;
  const P = (deg, rr) => [cx + rr * Math.cos(rad(deg)), cy - rr * Math.sin(rad(deg))];
  const n = v => v.toFixed(1);
  let g = `<line x1="${cx - 130}" y1="${cy}" x2="${cx + 130}" y2="${cy}" stroke="#000" stroke-width="1.6"/>`;
  let acc = 180;
  labels.forEach((l, i) => {
    const start = acc, end = acc - l.deg;
    if (i < labels.length - 1) {
      const [ex, ey] = P(end, r);
      g += `<line x1="${cx}" y1="${cy}" x2="${n(ex)}" y2="${n(ey)}" stroke="#000" stroke-width="1.5"/>`;
    }
    if (l.square) {
      const [ux, uy] = P(start, 15), [vx, vy] = P(end, 15);
      g += `<path d="M ${n(ux)} ${n(uy)} L ${n(ux + vx - cx)} ${n(uy + vy - cy)} L ${n(vx)} ${n(vy)}" fill="none" stroke="#000" stroke-width="1.2"/>`;
    } else {
      const [ax, ay] = P(start, 24), [bx, by] = P(end, 24);
      g += `<path d="M ${n(ax)} ${n(ay)} A 24 24 0 0 1 ${n(bx)} ${n(by)}" fill="none" stroke="#000" stroke-width="1.1"/>`;
    }
    if (l.text) {
      const [tx, ty] = P((start + end) / 2, 46);
      g += `<text x="${n(tx)}" y="${n(ty + 5)}" font-size="13" text-anchor="middle">${l.text}</text>`;
    }
    acc = end;
  });
  g += `<circle cx="${cx}" cy="${cy}" r="2.4" fill="#000"/>`;
  return SVG_OPEN(300, 130) + g + '</svg>';
}
const ALT_ANGLE_LINE = 'Several angles meeting at a point on a straight line, each marked with an arc and a label or a value in degrees.';

// ── 2. Two parallel lines cut by a transversal ────────────────────────
// ⚠ THE CALLER NAMES THE REGION, because the relationship IS the position.
//   Three questions - corresponding, alternate and co-interior - were all drawn
//   from one figure with the same two labels, so at most one of them could have
//   been true. Each region is a point measured against where the transversal
//   actually crosses each line; see the crossings computed below.
//     transversal (88,142) -> (234,10);  x(y) = 88 + 1.1061 * (142 - y)
//     crosses the top line y=40 at x=200.8 and the bottom line y=108 at x=125.6
const PL_REGIONS = {
  topInRight:  [221,  60],
  topInLeft:   [153,  60],
  botInRight:  [166,  94],
  botInLeft:   [ 84,  94],
  botOutRight: [156, 128],
};
function parallelLines(marks) {
  const y1 = 40, y2 = 108, x0 = 26, x1 = 274;
  let g = `<line x1="${x0}" y1="${y1}" x2="${x1}" y2="${y1}" stroke="#000" stroke-width="1.6"/>`
        + `<line x1="${x0}" y1="${y2}" x2="${x1}" y2="${y2}" stroke="#000" stroke-width="1.6"/>`
        + `<line x1="${x0 + 62}" y1="${y2 + 34}" x2="${x1 - 40}" y2="${y1 - 30}" stroke="#000" stroke-width="1.5"/>`;
  // Arrowheads mark the two lines as parallel, which is how the papers show it.
  [y1, y2].forEach(y => {
    g += `<path d="M ${x0 + 34} ${y - 6} L ${x0 + 44} ${y} L ${x0 + 34} ${y + 6}" fill="none" stroke="#000" stroke-width="1.4"/>`;
  });
  Object.keys(marks).forEach(k => {
    const p = PL_REGIONS[k];
    if (!p) throw new Error('parallelLines: unknown region ' + k);
    g += `<text x="${p[0]}" y="${p[1]}" font-size="13" text-anchor="middle">${marks[k]}</text>`;
  });
  return SVG_OPEN(300, 152) + g + '</svg>';
}
const ALT_PARALLEL = 'Two parallel lines, each marked with an arrowhead, cut by a slanting line, with two of the angles labelled.';

// ── 3. A two-set Venn diagram ──────────────────────────────────
function venn(aLabel, bLabel, regions, shade) {
  const cy = 88, r = 50, ax = 118, bx = 182;
  let g = '';
  if (shade === 'union') {
    g += `<circle cx="${ax}" cy="${cy}" r="${r}" fill="#d5d5d5"/><circle cx="${bx}" cy="${cy}" r="${r}" fill="#d5d5d5"/>`;
  } else if (shade === 'intersection') {
    g += `<defs><clipPath id="vclip"><circle cx="${ax}" cy="${cy}" r="${r}"/></clipPath></defs>`
       + `<circle cx="${bx}" cy="${cy}" r="${r}" fill="#c2c2c2" clip-path="url(#vclip)"/>`;
  }
  g += `<rect x="34" y="22" width="232" height="132" fill="none" stroke="#000" stroke-width="1.4"/>`
     + `<circle cx="${ax}" cy="${cy}" r="${r}" fill="none" stroke="#000" stroke-width="1.5"/>`
     + `<circle cx="${bx}" cy="${cy}" r="${r}" fill="none" stroke="#000" stroke-width="1.5"/>`
     + `<text x="250" y="40" font-size="13" font-style="italic">&xi;</text>`
     + `<text x="${ax - 30}" y="${cy - r - 4}" font-size="13" font-weight="bold" text-anchor="middle">${aLabel}</text>`
     + `<text x="${bx + 30}" y="${cy - r - 4}" font-size="13" font-weight="bold" text-anchor="middle">${bLabel}</text>`;
  if (regions) {
    const pos = [[ax - 28, cy], [(ax + bx) / 2, cy], [bx + 28, cy], [250, 144]];
    regions.forEach((t, i) => {
      if (t == null) return;
      g += `<text x="${pos[i][0]}" y="${pos[i][1] + 5}" font-size="13" text-anchor="middle">${t}</text>`;
    });
  }
  return SVG_OPEN(300, 168) + g + '</svg>';
}
const ALT_VENN = 'A Venn diagram: two overlapping circles inside a rectangle representing the universal set.';

// ── 4. A compound L-shape with four of its six sides labelled ─────────
// ⚠ x0 IS 48, NOT 30. The left-hand dimension is anchored at x0-8 and reads
//   right-to-left, so at x0=30 every one of them ran off the left edge of the
//   viewBox and printed as ") cm" / "3 cm" / "0 cm".
// ⚠ The c label belongs BESIDE THE STEP, not under the shape. Printed at
//   y0+H+16 it sat below the bottom edge and read as its length - which is
//   a-c, a different number - so the figure gave the wrong measurement.
function lShape(a, b, c, d) {
  if (c <= 0 || d <= 0 || c >= a || d >= b) throw new Error('lShape: not an L (' + [a, b, c, d] + ')');
  // The step measurement is printed inside the cut-out, so the cut-out has to
  // be tall and wide enough to hold it.
  if (d * 5.2 < 15 || c * 5.2 < 26) throw new Error('lShape: notch too small to label (' + [c, d] + ')');
  const s = 5.2, x0 = 48, y0 = 20;
  const W = a * s, H = b * s, w2 = c * s, h2 = d * s;
  const n = v => v.toFixed(1);
  const pts = [[0, 0], [W, 0], [W, H - h2], [W - w2, H - h2], [W - w2, H], [0, H]]
    .map(([x, y]) => n(x0 + x) + ',' + n(y0 + y)).join(' ');
  const g = `<polygon points="${pts}" fill="none" stroke="#000" stroke-width="1.6"/>`
        + `<text x="${n(x0 + W / 2)}" y="${y0 - 6}" font-size="12" text-anchor="middle">${a} cm</text>`
        + `<text x="${n(x0 + W + 8)}" y="${n(y0 + (H - h2) / 2 + 4)}" font-size="12" text-anchor="start">${b - d} cm</text>`
        + `<text x="${x0 - 8}" y="${n(y0 + H / 2 + 4)}" font-size="12" text-anchor="end">${b} cm</text>`
        + `<text x="${n(x0 + W - w2 / 2)}" y="${n(y0 + H - h2 / 2 + 3.5)}" font-size="10" text-anchor="middle">${c} cm</text>`;
  return SVG_OPEN(Math.round(x0 + W + 60), Math.round(y0 + H + 22)) + g + '</svg>';
}
const ALT_LSHAPE = 'A compound shape made of two rectangles joined to form an L, with four of its six sides labelled in centimetres.';

// ── 4b. A plain rectangle ────────────────────────────────────
// A rectangle was being drawn by calling lShape(a, b, 0, 0), which produced a
// polygon with two duplicate vertices and printed a side labelled "0 cm".
function rectShape(a, b) {
  const s = 5.2, x0 = 48, y0 = 20, W = a * s, H = b * s;
  const n = v => v.toFixed(1);
  const g = `<rect x="${x0}" y="${y0}" width="${n(W)}" height="${n(H)}" fill="none" stroke="#000" stroke-width="1.6"/>`
        + `<text x="${n(x0 + W / 2)}" y="${y0 - 6}" font-size="12" text-anchor="middle">${a} cm</text>`
        + `<text x="${x0 - 8}" y="${n(y0 + H / 2 + 4)}" font-size="12" text-anchor="end">${b} cm</text>`;
  return SVG_OPEN(Math.round(x0 + W + 30), Math.round(y0 + H + 16)) + g + '</svg>';
}
const ALT_RECT = 'A rectangle with its length and its width labelled in centimetres.';

// ── 5. A pie chart ────────────────────────────────────────
function pieChart(slices) {
  const cx = 100, cy = 100, r = 78;
  const total = slices.reduce((s, x) => s + x.v, 0);
  let acc = -90, g = '';
  const n = v => v.toFixed(1);
  const P = (aa, rad) => [cx + rad * Math.cos(aa * Math.PI / 180), cy + rad * Math.sin(aa * Math.PI / 180)];
  slices.forEach((sl, i) => {
    const sweep = (sl.v / total) * 360, end = acc + sweep;
    const [x1, y1] = P(acc, r), [x2, y2] = P(end, r);
    const large = sweep > 180 ? 1 : 0;
    const fill = ['#ffffff', '#dcdcdc', '#b9b9b9', '#9a9a9a'][i % 4];
    g += `<path d="M ${cx} ${cy} L ${n(x1)} ${n(y1)} A ${r} ${r} 0 ${large} 1 ${n(x2)} ${n(y2)} Z" fill="${fill}" stroke="#000" stroke-width="1.3"/>`;
    const [lx, ly] = P(acc + sweep / 2, r * 0.62);
    g += `<text x="${n(lx)}" y="${n(ly + 4)}" font-size="11" text-anchor="middle">${sl.label}</text>`;
    acc = end;
  });
  return SVG_OPEN(200, 200) + g + '</svg>';
}
const ALT_PIE = 'A pie chart divided into labelled sectors of different sizes, shaded in different greys.';

// ── 6. A triangle drawn FROM its own angles ──────────────────────
// ⚠ The vertices are solved from the two given angles, so the picture cannot
//   drift from the question. A fixed triangle was tried first and drew a 99
//   degree corner where the question said 75. A triangle question was also
//   being illustrated with anglesOnLine - the wrong shape entirely.
function triangle(degA, degB, labels) {
  const degC = 180 - degA - degB;
  if (degC <= 5) throw new Error('triangle: angles ' + [degA, degB, degC] + ' do not draw');
  const R = d => d * Math.PI / 180, base = 150;
  const ac = base * Math.sin(R(degB)) / Math.sin(R(degC));
  let V = [[0, 0], [base, 0], [ac * Math.cos(R(degA)), -ac * Math.sin(R(degA))]];
  const minx = Math.min(...V.map(p => p[0])), miny = Math.min(...V.map(p => p[1]));
  const w = Math.max(...V.map(p => p[0])) - minx, h = Math.max(...V.map(p => p[1])) - miny;
  const sc = Math.min(1, 108 / h);
  V = V.map(([x, y]) => [46 + (x - minx) * sc, 26 + (y - miny) * sc]);
  const n = v => v.toFixed(1);
  let g = `<polygon points="${V.map(p => n(p[0]) + ',' + n(p[1])).join(' ')}" fill="none" stroke="#000" stroke-width="1.6"/>`;
  V.forEach((v, i) => {
    const unit = t => { const dx = t[0] - v[0], dy = t[1] - v[1], m = Math.hypot(dx, dy); return [dx / m, dy / m]; };
    const [ux, uy] = unit(V[(i + 1) % 3]), [vx, vy] = unit(V[(i + 2) % 3]);
    const cross = ux * vy - uy * vx;
    g += `<path d="M ${n(v[0] + 22 * ux)} ${n(v[1] + 22 * uy)} A 22 22 0 0 ${cross > 0 ? 1 : 0} ${n(v[0] + 22 * vx)} ${n(v[1] + 22 * vy)}" fill="none" stroke="#000" stroke-width="1.1"/>`;
    const bx = ux + vx, by = uy + vy, bm = Math.hypot(bx, by);
    g += `<text x="${n(v[0] + 40 * bx / bm)}" y="${n(v[1] + 40 * by / bm + 4)}" font-size="13" text-anchor="middle">${labels[i]}</text>`;
  });
  return SVG_OPEN(Math.round(92 + w * sc), Math.round(52 + h * sc)) + g + '</svg>';
}
const ALT_TRIANGLE = 'A triangle with each of its three interior angles marked by an arc and labelled.';

// ── 7. Angles at a point ──────────────────────────────────────
// Distinct from anglesOnLine: a full turn, no straight line to sit on, and
// the sum the child needs is 360 rather than 180. NCE 2024 Q20 sits angle
// work like this beside the parallel-line question every year.
function anglesAtPoint(labels) {
  const cx = 150, cy = 92, r = 74;
  const total = labels.reduce((s, l) => s + l.deg, 0);
  if (total !== 360) throw new Error('anglesAtPoint: angles sum to ' + total + ', not 360');
  const rad = d => d * Math.PI / 180;
  const P = (deg, rr) => [cx + rr * Math.cos(rad(deg)), cy - rr * Math.sin(rad(deg))];
  const n = v => v.toFixed(1);
  let g = "", acc = 90;
  labels.forEach(l => {
    const start = acc, end = acc - l.deg;
    const [ex, ey] = P(start, r);
    g += `<line x1="${cx}" y1="${cy}" x2="${n(ex)}" y2="${n(ey)}" stroke="#000" stroke-width="1.5"/>`;
    const [ax, ay] = P(start, 22), [bx, by] = P(end, 22);
    g += `<path d="M ${n(ax)} ${n(ay)} A 22 22 0 0 1 ${n(bx)} ${n(by)}" fill="none" stroke="#000" stroke-width="1.1"/>`;
    const [tx, ty] = P((start + end) / 2, 46);
    g += `<text x="${n(tx)}" y="${n(ty + 5)}" font-size="13" text-anchor="middle">${l.text}</text>`;
    acc = end;
  });
  g += `<circle cx="${cx}" cy="${cy}" r="2.4" fill="#000"/>`;
  return SVG_OPEN(300, 180) + g + '</svg>';
}
const ALT_AT_POINT = 'Several angles meeting at a single point and filling a complete turn, each marked with an arc and a label or a value in degrees.';


// [ id, subsection, difficulty, marks, prompt, response, hint, explanation, svg, alt ]
const ITEMS = [

  // ── angles ────────────────────────────────────────────────────────────
  ['g9m-geo-001', 'grade7_8_geometry', 2, 2,
   'Find the value of angle <i>x</i> in the diagram.',
   { kind: 'number', answer: '35', unit: '°' },
   'Angles on a straight line add up to 180&deg;, and the square marks a right angle.',
   'The square marks a right angle of 90&deg; and the other marked angle is 55&deg;, so '
   + 'x = 180 &minus; 90 &minus; 55 = 35&deg;.',
   anglesOnLine([{ deg: 90, square: true }, { deg: 35, text: ITAL('x') }, { deg: 55, text: '55&deg;' }]),
   ALT_ANGLE_LINE],

  ['g9m-geo-002', 'grade7_8_geometry', 2, 2,
   'Find the value of angle <i>y</i> in the diagram.',
   { kind: 'number', answer: '65', unit: '°' },
   'The three angles sit on a straight line.',
   'Angles on a straight line add up to 180&deg;, so y = 180 &minus; 70 &minus; 45 = 65&deg;.',
   anglesOnLine([{ deg: 70, text: '70&deg;' }, { deg: 65, text: ITAL('y') }, { deg: 45, text: '45&deg;' }]),
   ALT_ANGLE_LINE],

  ['g9m-geo-003', 'grade7_8_geometry', 1, 1,
   'Two angles on a straight line are 120&deg; and <i>p</i>. Find <i>p</i>.',
   { kind: 'number', answer: '60', unit: '°' },
   'They must add to 180&deg;.',
   'p = 180 &minus; 120 = 60&deg;.',
   anglesOnLine([{ deg: 120, text: '120&deg;' }, { deg: 60, text: ITAL('p') }]),
   ALT_ANGLE_LINE],

  ['g9m-geo-004', 'grade7_8_geometry', 3, 2,
   'In the diagram the two horizontal lines are <b>parallel</b>. Find the value of angle <i>a</i>.',
   { kind: 'number', answer: '110', unit: '°' },
   'Angles in matching positions on parallel lines are equal.',
   'The marked 110&deg; and a are corresponding angles on parallel lines, so they are equal and '
   + 'a = 110&deg;.',
   parallelLines({ topInRight: '110&deg;', botOutRight: ITAL('a') }), ALT_PARALLEL],

  ['g9m-geo-005', 'grade7_8_geometry', 3, 2,
   'In the diagram the two horizontal lines are <b>parallel</b>. Find the value of angle <i>b</i>.',
   { kind: 'number', answer: '65', unit: '°' },
   'Alternate angles on parallel lines are equal.',
   'The 65&deg; angle and b are alternate angles, on opposite sides of the slanting line, '
   + 'so b = 65&deg;.',
   parallelLines({ topInLeft: '65&deg;', botInRight: ITAL('b') }), ALT_PARALLEL],

  ['g9m-geo-006', 'grade7_8_geometry', 3, 2,
   'The two horizontal lines are <b>parallel</b>. Given that the marked angle is 130&deg;, find the '
   + '<b>co-interior</b> angle <i>c</i>.',
   { kind: 'number', answer: '50', unit: '°' },
   'Co-interior angles on parallel lines add up to 180&deg;.',
   'Co-interior angles between parallel lines are supplementary, so c = 180 &minus; 130 = 50&deg;.',
   parallelLines({ topInRight: '130&deg;', botInRight: ITAL('c') }), ALT_PARALLEL],

  ['g9m-geo-007', 'grade7_8_geometry', 2, 2,
   'The angles of a triangle are 40&deg;, 75&deg; and <i>t</i>. Find <i>t</i>.',
   { kind: 'number', answer: '65', unit: '°' },
   'The angles of any triangle add up to 180&deg;.',
   't = 180 &minus; 40 &minus; 75 = 65&deg;.',
   triangle(40, 75, ['40&deg;', '75&deg;', ITAL('t')]), ALT_TRIANGLE],

  ['g9m-geo-008', 'grade7_8_geometry', 3, 2,
   'Four angles meet at a point on a straight line. Three of them are 30&deg;, 50&deg; and 40&deg;. '
   + 'Find the fourth angle <i>q</i>.',
   { kind: 'number', answer: '60', unit: '°' },
   'They still add to 180&deg;.',
   'q = 180 &minus; 30 &minus; 50 &minus; 40 = 60&deg;.',
   anglesOnLine([{ deg: 30, text: '30&deg;' }, { deg: 50, text: '50&deg;' },
                 { deg: 40, text: '40&deg;' }, { deg: 60, text: ITAL('q') }]),
   ALT_ANGLE_LINE],

  // ── sets ──────────────────────────────────────────────────────────────
  ['g9m-geo-009', 'grade7_8_geometry', 2, 1,
   'The Venn diagram shows two sets. Which region is shaded?',
   { kind: 'choice', variant: 'options',
     options: ['A &cup; B', 'A &cap; B', 'A only', 'Neither A nor B'], answer: 'A &cup; B' },
   'Union means everything in either circle.',
   'Both circles are shaded completely, which is A union B - everything that is in A, in B, '
   + 'or in both.',
   venn('A', 'B', null, 'union'), ALT_VENN],

  ['g9m-geo-010', 'grade7_8_geometry', 2, 1,
   'Which region of the Venn diagram below has been shaded?',
   { kind: 'choice', variant: 'options',
     options: ['A &cap; B', 'A &cup; B', 'B only', 'A only'], answer: 'A &cap; B' },
   'Only the overlap is shaded.',
   'The shaded part is the overlap alone, which is A intersection B - the members that are '
   + 'in both sets.',
   venn('A', 'B', null, 'intersection'), ALT_VENN],

  ['g9m-geo-011', 'grade7_8_geometry', 3, 2,
   'The Venn diagram shows the numbers in each region. How many elements are in <b>A &cup; B</b>?',
   { kind: 'number', answer: '23' },
   'Add every region inside either circle - but count the overlap once.',
   '9 + 5 + 9 = 23. The 4 outside both circles is not part of A union B, and the overlap of 5 '
   + 'must be counted once, not twice.',
   venn('A', 'B', ['9', '5', '9', '4'], null), ALT_VENN],

  ['g9m-geo-012', 'grade7_8_geometry', 3, 2,
   'The Venn diagram shows the numbers in each region. How many elements are in the <b>universal '
   + 'set</b>?',
   { kind: 'number', answer: '27' },
   'The universal set is everything inside the rectangle.',
   '9 + 5 + 9 + 4 = 27, including the 4 that lie outside both circles.',
   venn('A', 'B', ['9', '5', '9', '4'], null), ALT_VENN],

  ['g9m-geo-013', 'grade7_8_geometry', 4, 3,
   'In a class of 30 students, 14 play football, 17 play volleyball, <i>x</i> play both and 6 play '
   + 'neither. Find the value of <i>x</i>.',
   { kind: 'number', answer: '7', label: 'x' },
   'Everything inside the rectangle adds to 30. Take care not to double-count the overlap.',
   'Football only is (14 &minus; x), both is x, volleyball only is (17 &minus; x), and 6 play '
   + 'neither. So (14 &minus; x) + x + (17 &minus; x) + 6 = 30, giving 37 &minus; x = 30 and x = 7.',
   venn('Football', 'Volleyball', ['14 &minus; ' + ITAL('x'), ITAL('x'), '17 &minus; ' + ITAL('x'), '6'], null),
   ALT_VENN],

  ['g9m-geo-014', 'grade7_8_geometry', 4, 2,
   'In the same class of 30 students, 14 play football, 17 play volleyball, 7 play both and 6 play '
   + 'neither. How many play <b>volleyball only</b>?',
   { kind: 'number', answer: '10', unit: 'students' },
   'Take the ones who play both away from the volleyball total.',
   '17 &minus; 7 = 10 students play volleyball but not football.',
   venn('Football', 'Volleyball', ['7', '7', '10', '6'], null), ALT_VENN],

  // ── compound shapes ───────────────────────────────────────────────────
  ['g9m-geo-015', 'grade7_8_geometry', 3, 3,
   'Calculate the <b>area</b> of the compound shape.',
   { kind: 'number', answer: '76', unit: 'cm²' },
   'Split it into two rectangles, or take a piece away from a big rectangle.',
   'The whole rectangle would be 10 &times; 10 = 100 cm&sup2;. The piece cut away is '
   + '6 &times; 4 = 24 cm&sup2;. So the area is 100 &minus; 24 = 76 cm&sup2;.',
   lShape(10, 10, 6, 4), ALT_LSHAPE],

  ['g9m-geo-016', 'grade7_8_geometry', 3, 3,
   'A floor tile has the shape shown. Calculate its <b>area</b>.',
   { kind: 'number', answer: '78', unit: 'cm²' },
   'Work out the area of the full rectangle, then subtract the missing corner.',
   'The full rectangle is 12 &times; 8 = 96 cm&sup2; and the missing corner is 6 &times; 3 = '
   + '18 cm&sup2;, so the area is 96 &minus; 18 = 78 cm&sup2;.',
   lShape(12, 8, 6, 3), ALT_LSHAPE],

  ['g9m-geo-017', 'grade7_8_geometry', 4, 3,
   'Calculate the <b>perimeter</b> of the compound shape.',
   { kind: 'number', answer: '40', unit: 'cm' },
   'Every side must be counted, including the two you are not told directly.',
   'Going round: 11 + 5 + 5 + 4 + 6 + 9 = 40 cm. The two sides that carry no label are '
   + 'found by subtraction: 9 &minus; 5 = 4 and 11 &minus; 5 = 6.',
   lShape(11, 9, 5, 4), ALT_LSHAPE],

  ['g9m-geo-018', 'grade7_8_geometry', 2, 2,
   'A rectangle measures 9 cm by 5 cm. Calculate its <b>area</b>.',
   { kind: 'number', answer: '45', unit: 'cm²' },
   'Length times width.',
   '9 &times; 5 = 45 cm&sup2;.',
   rectShape(9, 5), ALT_RECT],

  // ── pie charts ────────────────────────────────────────────────────────
  ['g9m-geo-019', 'grade7_8_geometry', 3, 2,
   'The pie chart shows how 36 pupils travel to school. The sector for <b>bus</b> is 120&deg;. '
   + 'How many pupils travel by <b>bus</b>?',
   { kind: 'number', answer: '12', unit: 'pupils' },
   'A whole pie chart is 360&deg;, shared between 36 pupils.',
   'Each pupil is represented by 360 &divide; 36 = 10&deg;. So 120&deg; represents '
   + '120 &divide; 10 = 12 pupils.',
   pieChart([{ label: 'Bus', v: 120 }, { label: 'Walk', v: 100 },
             { label: 'Car', v: 90 }, { label: 'Bike', v: 50 }]), ALT_PIE],

  ['g9m-geo-020', 'grade7_8_geometry', 3, 2,
   'In a pie chart of 60 people, one sector represents 15 people. Calculate the <b>angle</b> of '
   + 'that sector.',
   { kind: 'number', answer: '90', unit: '°' },
   'Find the angle for one person first.',
   '360 &divide; 60 = 6&deg; per person, so 15 people are represented by 15 &times; 6 = 90&deg;.',
   pieChart([{ label: '15', v: 90 }, { label: '20', v: 120 },
             { label: '25', v: 150 }]), ALT_PIE],

  ['g9m-geo-021', 'grade7_8_geometry', 4, 3,
   'A pie chart shows four sectors of 120&deg;, 100&deg;, 90&deg; and <i>x</i>&deg;. Find <i>x</i>.',
   { kind: 'number', answer: '50', label: 'x', unit: '°' },
   'The four sectors must make a complete turn.',
   'The angles round the centre add to 360&deg;, so x = 360 &minus; 120 &minus; 100 &minus; 90 = 50&deg;.',
   pieChart([{ label: '120&deg;', v: 120 }, { label: '100&deg;', v: 100 },
             { label: '90&deg;', v: 90 }, { label: ITAL('x'), v: 50 }]), ALT_PIE],

  ['g9m-geo-022', 'grade7_8_geometry', 3, 2,
   'A pie chart of 72 families has a sector of 60&deg; for &ldquo;no car&rdquo;. How many families '
   + 'have <b>no car</b>?',
   { kind: 'number', answer: '12', unit: 'families' },
   'Work out how many degrees represent one family.',
   '360 &divide; 72 = 5&deg; per family, so 60&deg; represents 60 &divide; 5 = 12 families.',
   pieChart([{ label: 'No car', v: 60 }, { label: 'One car', v: 200 },
             { label: 'Two cars', v: 100 }]), ALT_PIE],

  // ── angles at a point ────────────────────────────────────────────────
  ['g9m-geo-024', 'grade7_8_geometry', 2, 2,
   'Three angles meet at a point. Two of them are 145&deg; and 120&deg;. Find the third angle <i>m</i>.',
   { kind: 'number', answer: '95', unit: '°' },
   'Angles that fill one complete turn add up to 360&deg;.',
   'm = 360 &minus; 145 &minus; 120 = 95&deg;.',
   anglesAtPoint([{ deg: 145, text: '145&deg;' }, { deg: 120, text: '120&deg;' },
                  { deg: 95, text: ITAL('m') }]), ALT_AT_POINT],

  ['g9m-geo-025', 'grade7_8_geometry', 3, 2,
   'Four angles meet at a point. Three of them are 90&deg;, 85&deg; and 110&deg;. Find the remaining angle <i>n</i>.',
   { kind: 'number', answer: '75', unit: '°' },
   'Add the three you are given, then take the total from a complete turn.',
   '90 + 85 + 110 = 285, so n = 360 &minus; 285 = 75&deg;.',
   anglesAtPoint([{ deg: 90, text: '90&deg;' }, { deg: 85, text: '85&deg;' },
                  { deg: 110, text: '110&deg;' }, { deg: 75, text: ITAL('n') }]), ALT_AT_POINT],

  // ── two more triangles; the helper solves the vertices from the angles, 
  //    so each of these draws a genuinely different shape.
  ['g9m-geo-026', 'grade7_8_geometry', 2, 2,
   'The diagram shows an <b>isosceles</b> triangle. Two of its angles are 50&deg; each. Find the third angle <i>k</i>.',
   { kind: 'number', answer: '80', unit: '°' },
   'The three angles of a triangle add up to 180&deg;.',
   'k = 180 &minus; 50 &minus; 50 = 80&deg;.',
   triangle(50, 50, ['50&deg;', '50&deg;', ITAL('k')]), ALT_TRIANGLE],

  ['g9m-geo-027', 'grade7_8_geometry', 3, 2,
   'In the triangle shown, one angle is 90&deg; and another is 35&deg;. Find the third angle <i>h</i>.',
   { kind: 'number', answer: '55', unit: '°' },
   'The angles of any triangle, right-angled or not, add up to 180&deg;.',
   'h = 180 &minus; 90 &minus; 35 = 55&deg;.',
   triangle(90, 35, ['90&deg;', '35&deg;', ITAL('h')]), ALT_TRIANGLE],
];

ITEMS.forEach(([id, subsection, difficulty, marks, prompt, response, hint, explanation, svg, alt]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty, source: SRC,
    stimulus: { html: svg, altText: alt },
    parts: [{ label: 'a', prompt, marks, hint, explanation, response }],
  }));
});

// ── The paper's Venn shading task: not auto-markable ────────────────────
// NCE 2025 Q15(b) is "shade the region representing A ∪ B" - a mark for a
// drawing, which stays on the printed paper with a rubric.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-geo-023', chapterId: CH, subsection: 'grade7_8_geometry', difficulty: 2, source: SRC,
  stimulus: { html: venn('A', 'B', null, null), altText: ALT_VENN },
  parts: [{
    label: 'a',
    prompt: 'In the Venn diagram above, <b>shade</b> the region representing <b>A &cup; B</b>.',
    marks: 1,
    rubric: 'One mark for shading BOTH circles completely, including the overlap. '
          + 'Shading only the overlap is A &cap; B and scores zero; shading one circle alone '
          + 'scores zero. The region outside both circles must be left unshaded.',
    response: { kind: 'drawing' },
  }],
}));

})();
