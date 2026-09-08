'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Trigonometry
//
//  Syllabus: NCF Grades 7-9, §3.9 "Geometry: Trigonometry" (PDF p.49,
//  printed 43): recognise and apply the sine, cosine and tangent ratios for
//  acute angles; solve trigonometric problems in two dimensions to find
//  unknown sides and angles.
//
//  ⚠ ANGLE OF ELEVATION AND DEPRESSION ARE EXCLUDED at Grade 9 - the syllabus
//    says so in the same line. Nothing in this file uses them, and nothing
//    should be added that does.
//
//  ⚠ CALCULATORS ARE FORBIDDEN, so every trigonometric value a candidate
//    cannot know by heart is SUPPLIED in the stem, exactly as NCE 2025 Q30
//    does: "[Given sin 60 = 0.87, cos 60 = 0.5, tan 60 = 1.73]". A question
//    that needs sin 37 without giving it is unanswerable on this paper.
//    scripts/test-grade9-maths-content.js asserts that every item naming a
//    non-standard angle also supplies its ratio.
//
//  ⚠ Original SVG, monochrome, right angle shown as a square as the papers do.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-trigonometry';

// A right-angled triangle, right angle at the bottom left.
// Labels are placed OUTSIDE the triangle so nothing is drawn over a side.
function rightTriangle(baseLabel, heightLabel, hypLabel, angleLabel) {
  const x0 = 46, y0 = 20, w = 160, h = 110;
  const bx = x0, by = y0 + h;          // right-angle corner
  const tx = x0, ty = y0;              // top
  const rx = x0 + w, ry = y0 + h;      // right
  const sq = 12;
  let g = `<polygon points="${tx},${ty} ${bx},${by} ${rx},${ry}" fill="none" stroke="#000" stroke-width="1.6"/>`;
  g += `<polyline points="${bx},${by - sq} ${bx + sq},${by - sq} ${bx + sq},${by}" fill="none" stroke="#000" stroke-width="1.1"/>`;
  if (baseLabel)   g += `<text x="${bx + w / 2}" y="${by + 18}" font-size="12" text-anchor="middle">${baseLabel}</text>`;
  if (heightLabel) g += `<text x="${bx - 8}" y="${y0 + h / 2 + 4}" font-size="12" text-anchor="end">${heightLabel}</text>`;
  if (hypLabel)    g += `<text x="${(tx + rx) / 2 + 14}" y="${(ty + ry) / 2 - 6}" font-size="12" text-anchor="start">${hypLabel}</text>`;
  if (angleLabel) {
    g += `<path d="M ${rx - 26} ${ry} A 26 26 0 0 0 ${rx - 20} ${ry - 16}" fill="none" stroke="#000" stroke-width="1"/>`;
    g += `<text x="${rx - 34}" y="${ry - 8}" font-size="12" text-anchor="end">${angleLabel}</text>`;
  }
  return `<svg viewBox="0 0 ${x0 + w + 44} ${y0 + h + 28}" width="${x0 + w + 44}" height="${y0 + h + 28}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}
const ALT_TRI = 'A right-angled triangle with the right angle marked by a small square and its sides labelled.';

// [ id, difficulty, marks, prompt, answer, accept, hint, explanation, svg ]
const ITEMS = [
  ['g9m-trg-001', 1, 1,
   'In a right-angled triangle, which ratio is <b>opposite &divide; hypotenuse</b>?',
   'sine', ['sin'], 'Remember SOH CAH TOA.',
   'SOH: Sine = Opposite &divide; Hypotenuse.', null],

  ['g9m-trg-002', 1, 1,
   'In a right-angled triangle, which ratio is <b>adjacent &divide; hypotenuse</b>?',
   'cosine', ['cos'], 'Remember SOH CAH TOA.',
   'CAH: Cosine = Adjacent &divide; Hypotenuse.', null],

  ['g9m-trg-003', 1, 1,
   'In a right-angled triangle, which ratio is <b>opposite &divide; adjacent</b>?',
   'tangent', ['tan'], 'Remember SOH CAH TOA.',
   'TOA: Tangent = Opposite &divide; Adjacent.', null],

  ['g9m-trg-004', 2, 2,
   'In a right-angled triangle the side opposite angle <i>&theta;</i> is 6 cm and the hypotenuse is 10 cm. Find sin <i>&theta;</i>.',
   '0.6', ['3/5'], 'Sine is opposite over hypotenuse.',
   'sin &theta; = opposite &divide; hypotenuse = 6/10 = 3/5 = 0.6.', null],

  ['g9m-trg-005', 2, 2,
   'In a right-angled triangle the side adjacent to angle <i>&theta;</i> is 8 cm and the hypotenuse is 10 cm. Find cos <i>&theta;</i>.',
   '0.8', ['4/5'], 'Cosine is adjacent over hypotenuse.',
   'cos &theta; = adjacent &divide; hypotenuse = 8/10 = 4/5 = 0.8.', null],

  ['g9m-trg-006', 2, 2,
   'In a right-angled triangle the side opposite angle <i>&theta;</i> is 3 cm and the side adjacent is 4 cm. Find tan <i>&theta;</i>.',
   '0.75', ['3/4'], 'Tangent is opposite over adjacent.',
   'tan &theta; = opposite &divide; adjacent = 3/4 = 0.75.', null],

  ['g9m-trg-007', 3, 2,
   'The diagram shows a right-angled triangle. Find the length of <b>BC</b>. '
   + '<span style="white-space:nowrap">[Given sin 30&deg; = 0.5]</span>',
   '6', [], 'The side you want is opposite the 30&deg; angle, and you are given the hypotenuse.',
   'sin 30&deg; = BC &divide; 12, so BC = 12 &times; 0.5 = 6 cm.', 'cm',
   rightTriangle('', 'BC', '12 cm', '30&deg;')],

  ['g9m-trg-008', 3, 2,
   'The diagram shows a right-angled triangle. Find the length of <b>AB</b>. '
   + '<span style="white-space:nowrap">[Given cos 60&deg; = 0.5]</span>',
   '7', [], 'The side you want lies next to the 60&deg; angle, and the hypotenuse is given.',
   'cos 60&deg; = AB &divide; 14, so AB = 14 &times; 0.5 = 7 cm.', 'cm',
   rightTriangle('AB', '', '14 cm', '60&deg;')],

  ['g9m-trg-009', 3, 2,
   'In a right-angled triangle, the side adjacent to a 45&deg; angle is 5 cm. Find the length of the <b>opposite</b> side. '
   + '<span style="white-space:nowrap">[Given tan 45&deg; = 1]</span>',
   '5', [], 'Tangent relates the opposite side to the adjacent side.',
   'tan 45&deg; = opposite &divide; 5, so opposite = 5 &times; 1 = 5 cm.', 'cm', null],

  ['g9m-trg-010', 3, 3,
   'A ladder 10 m long leans against a wall, making an angle of 60&deg; with the ground. Find the <b>height</b> it reaches up the wall, to the nearest whole number. '
   + '<span style="white-space:nowrap">[Given sin 60&deg; = 0.87]</span>',
   '9', [], 'The wall is opposite the 60&deg; angle and the ladder is the hypotenuse.',
   'sin 60&deg; = height &divide; 10, so height = 10 &times; 0.87 = 8.7 m, which is 9 m to the nearest whole number.',
   'm', null],

  ['g9m-trg-011', 3, 2,
   'In a right-angled triangle, the hypotenuse is 20 cm and one angle is 30&deg;. Find the side <b>opposite</b> that angle. '
   + '<span style="white-space:nowrap">[Given sin 30&deg; = 0.5]</span>',
   '10', [], 'Opposite and hypotenuse means sine.',
   'sin 30&deg; = opposite &divide; 20, so opposite = 20 &times; 0.5 = 10 cm.', 'cm', null],

  ['g9m-trg-012', 4, 3,
   'The diagram shows a right-angled triangle. Find the length of <b>AC</b>, giving your answer to the <b>nearest whole number</b>. '
   + '<span style="white-space:nowrap">[Given sin 60&deg; = 0.87, cos 60&deg; = 0.5, tan 60&deg; = 1.73]</span>',
   '12', [], 'Decide first which two sides the 60&deg; angle connects: you have the hypotenuse and want the opposite side.',
   'AC is opposite the 60&deg; angle and 14 cm is the hypotenuse, so sin 60&deg; = AC &divide; 14. '
   + 'AC = 14 &times; 0.87 = 12.18 cm, which is 12 cm to the nearest whole number.', 'cm',
   rightTriangle('', 'AC', '14 cm', '60&deg;')],

  ['g9m-trg-013', 2, 2,
   'A right-angled triangle has sides 5 cm, 12 cm and 13 cm, with 13 cm as the hypotenuse. Find the sine of the angle opposite the 5 cm side.',
   '5/13', [], 'Sine is opposite over hypotenuse.',
   'The side opposite is 5 cm and the hypotenuse is 13 cm, so the sine is 5/13.', null],

  ['g9m-trg-014', 2, 2,
   'A right-angled triangle has sides 5 cm, 12 cm and 13 cm, with 13 cm as the hypotenuse. Find the tangent of the angle opposite the 12 cm side.',
   '12/5', ['2.4'], 'Tangent is opposite over adjacent, and the adjacent side here is 5 cm.',
   'The side opposite is 12 cm and the adjacent side is 5 cm, so the tangent is 12/5 = 2.4.', null],

  ['g9m-trg-015', 3, 2,
   'In a right-angled triangle, tan <i>&theta;</i> = 1. Find the size of angle <i>&theta;</i>.',
   '45', [], 'A tangent of 1 means the opposite and adjacent sides are equal.',
   'tan &theta; = 1 means opposite = adjacent, so the triangle is isosceles and &theta; = 45&deg;.',
   ],

  ['g9m-trg-016', 3, 2,
   'In a right-angled triangle, sin <i>&theta;</i> = 0.5. Find the size of angle <i>&theta;</i>.',
   '30', [], 'This is one of the angles worth knowing by heart.',
   'sin 30&deg; = 0.5, so &theta; = 30&deg;.', ],

  ['g9m-trg-017', 4, 3,
   'A right-angled triangle has a base of 8 cm and a height of 8 cm. Find the size of the angle between the base and the hypotenuse.',
   '45', [], 'Work out the tangent of the angle first.',
   'tan &theta; = opposite &divide; adjacent = 8/8 = 1, and tan 45&deg; = 1, so the angle is 45&deg;.',
   ],

  ['g9m-trg-018', 3, 2,
   'In a right-angled triangle, the side adjacent to a 60&deg; angle is 9 cm. Find the length of the <b>opposite</b> side, to the nearest whole number. '
   + '<span style="white-space:nowrap">[Given tan 60&deg; = 1.73]</span>',
   '16', [], 'Adjacent and opposite means tangent.',
   'tan 60&deg; = opposite &divide; 9, so opposite = 9 &times; 1.73 = 15.57 cm, which is 16 cm to the nearest whole number.',
   'cm', null],

  ['g9m-trg-019', 4, 3,
   'The diagram shows a right-angled triangle with hypotenuse 20 cm. Find the length of <b>PQ</b>. '
   + '<span style="white-space:nowrap">[Given cos 30&deg; = 0.87]</span>',
   '17.4', [], 'PQ lies next to the 30&deg; angle, so use cosine.',
   'cos 30&deg; = PQ &divide; 20, so PQ = 20 &times; 0.87 = 17.4 cm.', 'cm',
   rightTriangle('PQ', '', '20 cm', '30&deg;')],

  ['g9m-trg-020', 4, 3,
   'A right-angled triangle has a hypotenuse of 25 cm and one side of 15 cm. Find the <b>sine</b> of the angle opposite the 15 cm side, and hence the size of that angle.',
   '37', ['36.87', '36.9'],
   'Find the sine first, then recall which common angle it belongs to.',
   'sin &theta; = 15/25 = 0.6. The angle whose sine is 0.6 is approximately 37&deg;.',
   ],
];

ITEMS.forEach(([id, difficulty, marks, prompt, answer, accept, hint, explanation, unitOrSvg, maybeSvg]) => {
  // The table carries either a unit or an SVG in the ninth slot, and an SVG in
  // the tenth when both are present.
  const unit = typeof unitOrSvg === 'string' && unitOrSvg.indexOf('<svg') === -1 ? unitOrSvg : undefined;
  const svg = maybeSvg || (typeof unitOrSvg === 'string' && unitOrSvg.indexOf('<svg') === 0 ? unitOrSvg : null);
  const isNumeric = /^-?[\d.\/]+$/.test(answer);
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'ratios_and_2d_problems', difficulty,
    source: 'NCF Grades 7-9 §3.9 Geometry: Trigonometry; NCE 2025 Q30 pattern (ratios supplied in the stem).',
    stimulus: svg ? { html: svg, altText: ALT_TRI } : null,
    parts: [{
      label: 'a', prompt, marks, hint, explanation,
      response: { kind: isNumeric ? 'number' : 'expression', answer, accept, unit },
    }],
  }));
});

// ── The paper's extended trigonometry question ───────────────────────────
// NCE 2025 Q30: a sector figure, (a) use a supplied ratio to find a length,
// (b) find an arc length with pi given, (c) use BOTH answers for a perimeter.
// ⚠ Part (c) depends on two earlier parts. `dependsOn` names only one, so it
//   names the later of the two and the explanation states both - the schema
//   deliberately does not pretend to model a dependency graph it cannot mark.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-trg-021', chapterId: CH, subsection: 'ratios_and_2d_problems', difficulty: 4,
  source: 'NCF §3.9 Trigonometry; NCE 2025 Q30 three-part dependent structure.',
  intro: 'In the right-angled triangle <b>ABC</b>, angle <b>B</b> is 90&deg;, angle <b>C</b> is 60&deg; '
       + 'and <b>AC</b> = 12 cm.<br>'
       + '<span style="white-space:nowrap">[Given sin 60&deg; = 0.87, cos 60&deg; = 0.5, tan 60&deg; = 1.73]</span>',
  stimulus: { html: rightTriangle('BC', 'AB', '12 cm', '60&deg;'), altText: ALT_TRI },
  parts: [
    { label: 'a', prompt: 'Find the length of <b>BC</b>.', marks: 2,
      hint: 'BC lies next to the 60&deg; angle and AC is the hypotenuse.',
      explanation: 'cos 60&deg; = BC &divide; 12, so BC = 12 &times; 0.5 = 6 cm.',
      response: { kind: 'number', answer: '6', unit: 'cm' } },
    { label: 'b', prompt: 'Find the length of <b>AB</b>, to the nearest whole number.', marks: 2,
      hint: 'AB is opposite the 60&deg; angle.',
      explanation: 'sin 60&deg; = AB &divide; 12, so AB = 12 &times; 0.87 = 10.44 cm, which is 10 cm to the nearest whole number.',
      response: { kind: 'number', answer: '10', unit: 'cm' } },
    { label: 'c', prompt: 'Using your answers to <b>part (a)</b> and <b>part (b)</b>, find the <b>perimeter</b> of triangle <b>ABC</b>.',
      marks: 2, dependsOn: 'b',
      hint: 'Add all three sides, including the hypotenuse you were given.',
      explanation: 'Perimeter = AB + BC + AC = 10 + 6 + 12 = 28 cm. '
                 + 'Follow-through applies: a candidate who found different values in (a) and (b) still earns both marks for adding their own three sides correctly.',
      response: { kind: 'number', answer: '28', unit: 'cm' } },
  ],
}));

})();
