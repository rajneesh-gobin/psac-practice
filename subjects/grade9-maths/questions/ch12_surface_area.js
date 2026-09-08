'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Surface Area
//
//  Syllabus: NCF Grades 7-9, §3.9 "Measurement: Surface area" (PDF p.50,
//  printed 44): understand nets of a cylinder and of a right prism; find the
//  circumference and the area of a circle; find the surface area of a cylinder
//  - closed, semi-open and hollow - and of a right prism.
//
//  ⚠ THE CHAPTER USED TO BE CALLED "Surface Area of a Right Prism", which left
//    the cylinder out of its own content area. Renamed in batch 2; this file
//    covers both, and the closed / semi-open / hollow distinction the syllabus
//    names explicitly.
//
//  ⚠ NETS ARE THE DIAGRAM VARIETY THIS BANK NEEDED. Measured in batch 7, the
//    repeated-stimulus rate across ten generated papers was 86.5% - only 13
//    distinct diagrams existed, so a candidate kept meeting the same cuboid.
//    A net is a different picture of a familiar solid, and it is what the
//    syllabus asks a child to understand.
//
//  ⚠ pi is SUPPLIED as 22/7 wherever a numeric answer is wanted, because
//    calculators are forbidden.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-surface-area';

// ── The net of a cuboid, laid out as a cross. Original SVG, monochrome. ──
function cuboidNet(l, w, h) {
  const u = 26, x0 = 30, y0 = 14;
  const L = 3.2 * u, W = 2.0 * u, H = 1.7 * u;   // drawn proportions, not to scale
  const bx = x0 + W, by = y0 + H;
  const R = (x, y, w2, h2) => `<rect x="${x}" y="${y}" width="${w2}" height="${h2}" fill="none" stroke="#000" stroke-width="1.4"/>`;
  let g = R(bx, y0, L, H)                    // top
        + R(x0, by, W, W)                    // left
        + R(bx, by, L, W)                    // base
        + R(bx + L, by, W, W)                // right
        + R(bx, by + W, L, H)                // bottom flap
        + R(bx, by + W + H, L, W);           // far face
  g += `<text x="${bx + L / 2}" y="${by + W / 2 + 4}" font-size="11" text-anchor="middle">${l} &times; ${w}</text>`;
  g += `<text x="${bx + L / 2}" y="${y0 + H / 2 + 4}" font-size="11" text-anchor="middle">${l} &times; ${h}</text>`;
  g += `<text x="${x0 + W / 2}" y="${by + W / 2 + 4}" font-size="11" text-anchor="middle">${h} &times; ${w}</text>`;
  const wd = bx + L + W + 24, ht = by + W + H + W + 16;
  return `<svg viewBox="0 0 ${wd} ${ht}" width="${wd}" height="${ht}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}
const ALT_CUBOID_NET = 'The net of a cuboid, drawn as six rectangles joined in a cross, with the dimensions of three different faces marked.';

// ── The net of a cylinder: two circles and a rectangle. ─────────────────
function cylinderNet(rLabel, hLabel) {
  const cr = 24, rw = 150, rh = 74, x0 = 20, y0 = 22;
  const rx = x0 + 2 * cr + 16;
  let g = `<circle cx="${x0 + cr}" cy="${y0 + cr}" r="${cr}" fill="none" stroke="#000" stroke-width="1.4"/>`;
  g += `<circle cx="${x0 + cr}" cy="${y0 + rh - cr + 34}" r="${cr}" fill="none" stroke="#000" stroke-width="1.4"/>`;
  g += `<rect x="${rx}" y="${y0}" width="${rw}" height="${rh}" fill="none" stroke="#000" stroke-width="1.4"/>`;
  g += `<line x1="${x0 + cr}" y1="${y0 + cr}" x2="${x0 + 2 * cr}" y2="${y0 + cr}" stroke="#000" stroke-width="1"/>`;
  g += `<circle cx="${x0 + cr}" cy="${y0 + cr}" r="1.8" fill="#000"/>`;
  g += `<text x="${x0 + cr + 12}" y="${y0 + cr - 5}" font-size="11" text-anchor="middle">${rLabel}</text>`;
  g += `<text x="${rx + rw / 2}" y="${y0 + rh + 16}" font-size="11" text-anchor="middle">circumference</text>`;
  g += `<text x="${rx + rw + 8}" y="${y0 + rh / 2 + 4}" font-size="11" text-anchor="start">${hLabel}</text>`;
  const wd = rx + rw + 62, ht = y0 + rh + 62;
  return `<svg viewBox="0 0 ${wd} ${ht}" width="${wd}" height="${ht}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}
const ALT_CYL_NET = 'The net of a cylinder, drawn as two circles and a rectangle, with the radius marked on one circle and the height marked on the rectangle.';

// [ id, difficulty, marks, prompt, answer, accept, unit, hint, explanation, svg ]
const ITEMS = [
  ['g9m-sfa-001', 2, 2, 'A cuboid measures 5 cm by 4 cm by 3 cm. Calculate its <b>total surface area</b>.',
   '94', [], 'cm²', 'A cuboid has three pairs of identical faces.',
   'The three different faces are 5&times;4 = 20, 5&times;3 = 15 and 4&times;3 = 12 cm&sup2;. '
   + 'Each occurs twice, so the total is 2(20 + 15 + 12) = 2 &times; 47 = 94 cm&sup2;.',
   cuboidNet('5', '4', '3')],

  ['g9m-sfa-002', 2, 2, 'The net shown folds into a cuboid measuring 6 cm by 4 cm by 2 cm. Calculate the <b>total surface area</b> of the cuboid.',
   '88', [], 'cm²', 'Add the areas of all six rectangles in the net.',
   'The faces are 6&times;4 = 24, 6&times;2 = 12 and 4&times;2 = 8 cm&sup2;, each appearing twice. '
   + 'The total is 2(24 + 12 + 8) = 2 &times; 44 = 88 cm&sup2;.',
   cuboidNet('6', '4', '2')],

  ['g9m-sfa-003', 1, 1, 'How many faces does the net of a cuboid have?',
   '6', [], null, 'Count the rectangles in the net.',
   'A cuboid has six faces, so its net is made of six rectangles.', cuboidNet('l', 'w', 'h')],

  ['g9m-sfa-004', 2, 2, 'Find the <b>surface area</b> of a cube of side 4 cm.',
   '96', [], 'cm²', 'All six faces of a cube are identical squares.',
   'One face has area 4 &times; 4 = 16 cm&sup2;, and there are six faces, so the total is 6 &times; 16 = 96 cm&sup2;.',
   null],

  ['g9m-sfa-005', 2, 2, 'Find the <b>circumference</b> of a circle of radius 7 cm. '
   + '<span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '44', [], 'cm', 'Circumference is 2&pi;r.',
   'C = 2 &times; (22/7) &times; 7 = 2 &times; 22 = 44 cm.', null],

  ['g9m-sfa-006', 2, 2, 'Find the <b>area</b> of a circle of radius 7 cm. '
   + '<span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '154', [], 'cm²', 'Area is &pi;r&sup2;.',
   'A = (22/7) &times; 7 &times; 7 = 22 &times; 7 = 154 cm&sup2;.', null],

  ['g9m-sfa-007', 3, 2, 'Find the <b>circumference</b> of a circle of radius 14 cm. '
   + '<span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '88', [], 'cm', 'Cancel the 7 in &pi; against the radius.',
   'C = 2 &times; (22/7) &times; 14 = 2 &times; 22 &times; 2 = 88 cm.', null],

  ['g9m-sfa-008', 3, 2, 'Find the <b>area</b> of a circle of radius 10 cm, leaving your answer <b>in terms of &pi;</b>.',
   '100pi', ['100π'], 'cm²', 'Do not replace &pi; with a number.',
   'A = &pi; &times; 10&sup2; = 100&pi; cm&sup2;.', null],

  ['g9m-sfa-009', 3, 3, 'The net shown folds into a <b>closed</b> cylinder of radius 7 cm and height 10 cm. '
   + 'Calculate its <b>total surface area</b>. '
   + '<span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '748', [], 'cm²', 'The net is two circles plus a rectangle whose width is the circumference.',
   'Curved surface = 2&pi;rh = 2 &times; (22/7) &times; 7 &times; 10 = 440 cm&sup2;. '
   + 'Each circle = &pi;r&sup2; = (22/7) &times; 49 = 154 cm&sup2;, and there are two, giving 308 cm&sup2;. '
   + 'Total = 440 + 308 = 748 cm&sup2;.',
   cylinderNet('7 cm', '10 cm')],

  ['g9m-sfa-010', 3, 3, 'Calculate the <b>curved surface area</b> of a cylinder of radius 7 cm and height 5 cm. '
   + '<span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '220', [], 'cm²', 'The curved surface unrolls into a rectangle of width 2&pi;r.',
   'Curved surface = 2&pi;rh = 2 &times; (22/7) &times; 7 &times; 5 = 220 cm&sup2;.',
   cylinderNet('7 cm', '5 cm')],

  ['g9m-sfa-011', 4, 3, 'A cylinder of radius 7 cm and height 10 cm is <b>open at one end</b>. '
   + 'Calculate its total surface area. '
   + '<span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '594', [], 'cm²', 'An open cylinder has only ONE circular face.',
   'Curved surface = 2&pi;rh = 440 cm&sup2;. One circle = &pi;r&sup2; = 154 cm&sup2;. '
   + 'Open at one end means only one circle, so the total is 440 + 154 = 594 cm&sup2;.',
   cylinderNet('7 cm', '10 cm')],

  ['g9m-sfa-012', 4, 3, 'A cylindrical pipe is <b>hollow</b>, that is open at both ends. It has radius 7 cm '
   + 'and length 20 cm. Calculate its curved surface area. '
   + '<span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '880', [], 'cm²', 'A hollow pipe has no circular faces at all.',
   'A pipe open at both ends is only the curved surface: 2&pi;rh = 2 &times; (22/7) &times; 7 &times; 20 = 880 cm&sup2;.',
   null],

  ['g9m-sfa-013', 2, 2, 'A triangular prism has two triangular faces of area 6 cm&sup2; each and three '
   + 'rectangular faces of areas 20, 15 and 12 cm&sup2;. Find its <b>total surface area</b>.',
   '59', [], 'cm²', 'Add every face, remembering there are two triangles.',
   'Total = 2(6) + 20 + 15 + 12 = 12 + 47 = 59 cm&sup2;.', null],

  ['g9m-sfa-014', 3, 2, 'A cuboid measures 10 cm by 6 cm by 5 cm. Calculate its <b>total surface area</b>.',
   '280', [], 'cm²', 'Three pairs of faces.',
   'The faces are 10&times;6 = 60, 10&times;5 = 50 and 6&times;5 = 30 cm&sup2;, each twice: '
   + '2(60 + 50 + 30) = 2 &times; 140 = 280 cm&sup2;.', cuboidNet('10', '6', '5')],

  ['g9m-sfa-015', 3, 2, 'A cube has a total surface area of 150 cm&sup2;. Find the length of <b>one edge</b>.',
   '5', [], 'cm', 'Divide by 6 to get one face, then take the square root.',
   'One face has area 150 &divide; 6 = 25 cm&sup2;, so each edge is &radic;25 = 5 cm.', null],

  ['g9m-sfa-016', 3, 2, 'Find the <b>area</b> of a circle of diameter 14 cm. '
   + '<span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '154', [], 'cm²', 'The formula needs the radius, not the diameter.',
   'The radius is 14 &divide; 2 = 7 cm, so A = (22/7) &times; 49 = 154 cm&sup2;.', null],

  ['g9m-sfa-017', 4, 3, 'The curved surface area of a cylinder is 176 cm&sup2; and its radius is 7 cm. '
   + 'Find its <b>height</b>. <span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '4', [], 'cm', 'Write down 2&pi;rh and work backwards.',
   '2&pi;rh = 2 &times; (22/7) &times; 7 &times; h = 44h. Setting 44h = 176 gives h = 4 cm.', null],

  ['g9m-sfa-019', 3, 2, 'A cuboid measures 8 cm by 5 cm by 2 cm. Calculate its <b>total surface area</b>.',
   '132', [], 'cm²', 'Three pairs of faces.',
   'The faces are 8&times;5 = 40, 8&times;2 = 16 and 5&times;2 = 10 cm&sup2;, each twice: '
   + '2(40 + 16 + 10) = 2 &times; 66 = 132 cm&sup2;.', cuboidNet('8', '5', '2')],

  ['g9m-sfa-020', 4, 3, 'A closed cylinder has radius 3.5 cm and height 6 cm. Calculate its <b>total '
   + 'surface area</b>. <span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '209', [], 'cm²', 'Curved surface plus two circles.',
   'Curved surface = 2 &times; (22/7) &times; 3.5 &times; 6 = 132 cm&sup2;. '
   + 'Each circle = (22/7) &times; 3.5 &times; 3.5 = 38.5 cm&sup2;, so two give 77 cm&sup2;. '
   + 'Total = 132 + 77 = 209 cm&sup2;.', cylinderNet('3.5 cm', '6 cm')],
];

// ⚠ FIXED POSITIONS, ALWAYS. This table briefly allowed a response OBJECT in
//   the answer slot and shuffled every later argument along to compensate.
//   That silently pushed the hint into `unit`, the explanation into `hint` and
//   the SVG into `explanation` - which the harness caught as "no hint" and
//   "stimulus is not inline SVG". A positional table whose shape changes per
//   row is never worth the lines it saves; the one multiple-choice item is
//   written out separately below.
const SRC = 'NCF Grades 7-9 §3.9 Measurement: Surface area (nets, circle, cylinder, right prism).';
// The alt text follows which helper drew the figure, not a guess from its markup.
const altFor = svg => (svg && svg.indexOf('<circle') !== -1) ? ALT_CYL_NET : ALT_CUBOID_NET;

ITEMS.forEach(([id, difficulty, marks, prompt, answer, accept, unit, hint, explanation, svg]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'nets_and_surface_area', difficulty, source: SRC,
    stimulus: svg ? { html: svg, altText: altFor(svg) } : null,
    parts: [{ label: 'a', prompt, marks, hint, explanation,
              response: { kind: /^-?[\d.\/]+$/.test(answer) ? 'number' : 'expression',
                          answer, accept, unit } }],
  }));
});

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-sfa-018', chapterId: CH, subsection: 'nets_and_surface_area', difficulty: 2, source: SRC,
  stimulus: { html: cylinderNet('r', 'h'), altText: ALT_CYL_NET },
  parts: [{
    label: 'a',
    prompt: 'A net of a cylinder is made of two circles and one rectangle. '
          + 'What does the <b>length</b> of that rectangle represent?',
    marks: 1,
    hint: 'Imagine unrolling the curved surface.',
    explanation: 'When the curved surface is unrolled it becomes a rectangle whose length '
               + 'wrapped once around the circle, so that length is the circumference.',
    response: { kind: 'choice', variant: 'options',
                options: ['The circumference of the circle', 'The radius of the circle',
                          'The diameter of the circle', 'The area of the circle'],
                answer: 'The circumference of the circle' },
  }],
}));

})();
