'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Volume
//
//  Syllabus: NCF Grades 7-9, §3.9 "Measurement: Volume" (PDF p.50, printed 44):
//  find the volume of a cylinder and of a right prism, and solve problems
//  involving them.
//
//  Paper style: NCE 2025 Q28 - a labelled 3-D tank, "Tank A is 2/3 full of
//  water, calculate the volume of water" [3], then the water poured into a
//  cylinder with the answer left in terms of pi [4]. This chapter is where the
//  paper's diagrams live, so most items here carry one.
//
//  ⚠ ORIGINAL SVG, drawn for this repository. Nothing is traced or cropped
//    from a past paper. Black and grey only: a generated paper prints in
//    monochrome, so depth is shown with dashed hidden edges rather than colour.
//
//  ⚠ Because calculators are forbidden, every value is chosen so the
//    arithmetic works by hand, and pi is SUPPLIED as 22/7 wherever a numeric
//    answer is wanted - exactly as the real papers do.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-volume';

// ── Diagrams ─────────────────────────────────────────────────────────────
// A cuboid drawn in oblique projection with its three dimensions labelled.
// `fillFrac` optionally shades the lower part, for "the tank is 2/3 full".
function cuboid(wLabel, dLabel, hLabel, fillFrac) {
  // ⚠ x0 IS 46, NOT 40. The height label is anchored at x0-8 and reads
  //   right-to-left, so at x0=40 a five-character label started at x=-2 and
  //   the viewBox cut its first digit: 10 cm printed as "0 cm".
  const x0 = 46, y0 = 30, w = 150, h = 100, dx = 45, dy = -28;
  const P = (x, y) => `${x},${y}`;
  const fl = y0 + h, fr = x0 + w;
  let shade = '';
  if (fillFrac) {
    const top = fl - h * fillFrac;
    shade = `<polygon points="${P(x0, top)} ${P(fr, top)} ${P(fr, fl)} ${P(x0, fl)}" fill="#d9d9d9"/>`
          + `<polygon points="${P(x0, top)} ${P(x0 + dx, top + dy)} ${P(fr + dx, top + dy)} ${P(fr, top)}" fill="#eaeaea"/>`
          + `<polygon points="${P(fr, top)} ${P(fr + dx, top + dy)} ${P(fr + dx, fl + dy)} ${P(fr, fl)}" fill="#c9c9c9"/>`;
  }
  return `<svg viewBox="0 0 312 180" width="312" height="180" xmlns="http://www.w3.org/2000/svg" role="img">
    ${shade}
    <polygon points="${P(x0, y0)} ${P(fr, y0)} ${P(fr, fl)} ${P(x0, fl)}" fill="none" stroke="#000" stroke-width="1.5"/>
    <polyline points="${P(x0, y0)} ${P(x0 + dx, y0 + dy)} ${P(fr + dx, y0 + dy)} ${P(fr, y0)}" fill="none" stroke="#000" stroke-width="1.5"/>
    <polyline points="${P(fr + dx, y0 + dy)} ${P(fr + dx, fl + dy)} ${P(fr, fl)}" fill="none" stroke="#000" stroke-width="1.5"/>
    <polyline points="${P(x0, fl)} ${P(x0 + dx, fl + dy)} ${P(fr + dx, fl + dy)}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="${x0 + dx}" y1="${y0 + dy}" x2="${x0 + dx}" y2="${fl + dy}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="${x0 + w / 2}" y="${fl + 20}" font-size="12" text-anchor="middle">${wLabel}</text>
    <text x="${x0 - 8}" y="${y0 + h / 2}" font-size="12" text-anchor="end">${hLabel}</text>
    <!-- Printed: this overlapped the right-hand vertical edge. Moved out
         past the solid and anchored to its left so it reads clear. -->
    <text x="${fr + dx + 6}" y="${fl + dy + 26}" font-size="12" text-anchor="start">${dLabel}</text>
  </svg>`;
}

// A cylinder with its radius and height labelled.
function cylinder(rLabel, hLabel) {
  // ⚠ Same trap as the cuboid: the height label sits at cx-rx-24.
  const cx = 124, top = 34, bot = 140, rx = 58, ry = 17;
  return `<svg viewBox="0 0 244 185" width="244" height="185" xmlns="http://www.w3.org/2000/svg" role="img">
    <path d="M ${cx - rx} ${top} L ${cx - rx} ${bot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L ${cx + rx} ${top}"
          fill="none" stroke="#000" stroke-width="1.5"/>
    <ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" fill="none" stroke="#000" stroke-width="1.5"/>
    <path d="M ${cx - rx} ${bot} A ${rx} ${ry} 0 0 1 ${cx + rx} ${bot}"
          fill="none" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="${cx}" y1="${top}" x2="${cx + rx}" y2="${top}" stroke="#000" stroke-width="1"/>
    <circle cx="${cx}" cy="${top}" r="2" fill="#000"/>
    <!-- Printed: at y = top - 6 this label sat ON the top ellipse and the
         curve drew straight through it. Lifted clear of the rim. -->
    <text x="${cx + rx / 2 + 6}" y="${top - 22}" font-size="12" text-anchor="middle">${rLabel}</text>
    <line x1="${cx + rx / 2 + 6}" y1="${top - 19}" x2="${cx + rx / 2 + 6}" y2="${top - 3}" stroke="#000" stroke-width="0.7"/>
    <line x1="${cx - rx - 14}" y1="${top}" x2="${cx - rx - 14}" y2="${bot}" stroke="#000" stroke-width="1"/>
    <line x1="${cx - rx - 19}" y1="${top}" x2="${cx - rx - 9}" y2="${top}" stroke="#000" stroke-width="1"/>
    <line x1="${cx - rx - 19}" y1="${bot}" x2="${cx - rx - 9}" y2="${bot}" stroke="#000" stroke-width="1"/>
    <text x="${cx - rx - 24}" y="${(top + bot) / 2 + 4}" font-size="12" text-anchor="end">${hLabel}</text>
  </svg>`;
}

const ALT_CUBOID = 'A cuboid drawn in three dimensions, with its length, width and height each labelled.';
const ALT_CYL = 'A cylinder drawn in three dimensions, with its radius marked on the top circle and its height marked at the side.';

// [ id, difficulty, marks, prompt, answer, accept, hint, explanation, unit, stimulus ]
const ITEMS = [
  ['g9m-vol-001', 2, 2, 'The diagram shows a cuboid. Calculate its <b>volume</b>.',
   '120', [], 'Volume of a cuboid is length &times; width &times; height.',
   '8 &times; 5 &times; 3 = 120 cm&sup3;.', 'cm³',
   cuboid('8 cm', '5 cm', '3 cm')],

  ['g9m-vol-002', 2, 2, 'A wooden block has the shape of the cuboid shown. Calculate the <b>volume</b> of the block.',
   '240', [], 'Multiply the three dimensions together.',
   '10 &times; 4 &times; 6 = 240 cm&sup3;.', 'cm³',
   cuboid('10 cm', '4 cm', '6 cm')],

  ['g9m-vol-003', 1, 1, 'Find the volume of a cube of side 6 cm.',
   '216', [], 'All three edges of a cube are equal.',
   '6 &times; 6 &times; 6 = 216 cm&sup3;.', 'cm³', null],

  ['g9m-vol-004', 3, 3, 'The diagram shows a cylinder of radius 7 cm and height 10 cm. Calculate its <b>volume</b>. <span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '1540', [], 'Volume of a cylinder is &pi; &times; radius&sup2; &times; height.',
   'V = (22/7) &times; 7 &times; 7 &times; 10. The 7 in the denominator cancels one of the 7s, leaving 22 &times; 7 &times; 10 = 1 540 cm&sup3;.',
   'cm³', cylinder('7 cm', '10 cm')],

  ['g9m-vol-005', 3, 3, 'A cylinder has radius 3.5 cm and height 8 cm. Calculate its <b>volume</b>. <span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '308', [], 'Square the radius first, then use &pi; = 22/7.',
   'V = (22/7) &times; 3.5 &times; 3.5 &times; 8. Since 3.5 = 7/2, this is (22/7) &times; (49/4) &times; 8 = 22 &times; 1.75 &times; 8 = 308 cm&sup3;.',
   'cm³', cylinder('3.5 cm', '8 cm')],

  ['g9m-vol-006', 2, 2, 'A rectangular water tank measures 80 cm by 30 cm by 60 cm. Calculate the <b>volume</b> of the tank.',
   '144000', [], 'Multiply the three dimensions.',
   '80 &times; 30 &times; 60 = 144 000 cm&sup3;.', 'cm³',
   cuboid('80 cm', '30 cm', '60 cm')],

  ['g9m-vol-007', 4, 3, 'The diagram shows a rectangular water tank measuring 80 cm by 30 cm by 60 cm. The tank is <sup>2</sup>&frasl;<sub>3</sub> full of water. Calculate the <b>volume of water</b> in the tank.',
   '96000', [], 'Find the volume of the whole tank first, then take two thirds of it.',
   'The tank holds 80 &times; 30 &times; 60 = 144 000 cm&sup3;. Two thirds of that is 144 000 &divide; 3 &times; 2 = 96 000 cm&sup3;.',
   'cm³', cuboid('80 cm', '30 cm', '60 cm', 2 / 3)],

  ['g9m-vol-008', 2, 2, 'A triangular prism has a cross-section of area 12 cm&sup2; and a length of 9 cm. Find its <b>volume</b>.',
   '108', [], 'Volume of any prism is the area of its cross-section times its length.',
   '12 &times; 9 = 108 cm&sup3;.', 'cm³', null],

  ['g9m-vol-009', 3, 2, 'A cylinder has radius 10 cm and height 5 cm. Find its volume, leaving your answer <b>in terms of &pi;</b>.',
   '500pi', ['500π'], 'Do not replace &pi; with a number - leave it in the answer.',
   'V = &pi; &times; 10&sup2; &times; 5 = &pi; &times; 100 &times; 5 = 500&pi; cm&sup3;.', 'cm³',
   cylinder('10 cm', '5 cm')],

  ['g9m-vol-010', 3, 2, 'A cuboid has a volume of 240 cm&sup3;. Its base measures 8 cm by 5 cm. Find its <b>height</b>.',
   '6', [], 'Divide the volume by the area of the base.',
   'The base area is 8 &times; 5 = 40 cm&sup2;. The height is 240 &divide; 40 = 6 cm.', 'cm', null],

  ['g9m-vol-011', 2, 2, 'Convert 1 500 cm&sup3; into litres.',
   '1.5', [], 'One litre is 1 000 cm&sup3;.',
   '1 500 &divide; 1 000 = 1.5 litres.', 'L', null],

  ['g9m-vol-012', 3, 2, 'A cube has a volume of 125 cm&sup3;. Find the length of <b>one side</b>.',
   '5', [], 'Which number cubed gives 125?',
   '5 &times; 5 &times; 5 = 125, so each side is 5 cm.', 'cm', null],

  ['g9m-vol-013', 1, 1, 'A prism has a cross-sectional area of 25 cm&sup2; and a length of 12 cm. Find its <b>volume</b>.',
   '300', [], 'Cross-sectional area times length.',
   '25 &times; 12 = 300 cm&sup3;.', 'cm³', null],

  ['g9m-vol-014', 4, 3, 'A cylinder has a volume of 100&pi; cm&sup3; and a height of 4 cm. Find its <b>radius</b>.',
   '5', [], 'Write down the formula and divide both sides by &pi; and by the height.',
   '&pi;r&sup2;h = 100&pi;, so &pi; &times; r&sup2; &times; 4 = 100&pi;. Dividing by &pi; gives 4r&sup2; = 100, so r&sup2; = 25 and r = 5 cm.',
   'cm', null],

  ['g9m-vol-015', 1, 1, 'A storage crate has the shape of the cuboid shown. Find the <b>volume</b> of the crate.',
   '240', [], 'Multiply the three dimensions.',
   '12 &times; 5 &times; 4 = 240 cm&sup3;.', 'cm³',
   cuboid('12 cm', '5 cm', '4 cm')],

  ['g9m-vol-016', 3, 2, 'A rectangular container measures 20 cm by 15 cm by 10 cm. Water is poured in to a depth of 6 cm. Calculate the <b>volume of water</b>.',
   '1800', [], 'Use the depth of the water, not the height of the container.',
   'The water forms a cuboid 20 cm by 15 cm by 6 cm, so its volume is 20 &times; 15 &times; 6 = 1 800 cm&sup3;.',
   'cm³', cuboid('20 cm', '15 cm', '10 cm', 0.6)],

  ['g9m-vol-017', 4, 3, 'A cylinder has radius 14 cm and height 5 cm. Calculate its <b>volume</b>. <span style="white-space:nowrap">(Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>)</span>',
   '3080', [], 'Cancel the 7 in &pi; against the radius before multiplying.',
   'V = (22/7) &times; 14 &times; 14 &times; 5. Since 14 &divide; 7 = 2, this becomes 22 &times; 2 &times; 14 &times; 5 = 3 080 cm&sup3;.',
   'cm³', cylinder('14 cm', '5 cm')],

  ['g9m-vol-018', 3, 2, 'A cube has sides of 10 cm. Find its volume in <b>litres</b>.',
   '1', [], 'Work out the volume in cm&sup3; first; 1 000 cm&sup3; is one litre.',
   '10 &times; 10 &times; 10 = 1 000 cm&sup3;, and 1 000 cm&sup3; = 1 litre.', 'L', null],

  ['g9m-vol-019', 3, 2, 'A prism has a volume of 360 cm&sup3; and a length of 15 cm. Find the area of its <b>cross-section</b>.',
   '24', [], 'Divide the volume by the length.',
   '360 &divide; 15 = 24 cm&sup2;.', 'cm²', null],

  ['g9m-vol-020', 3, 2, 'A tank measuring 50 cm by 40 cm by 30 cm is <b>half</b> full of water. Calculate the volume of water in the tank.',
   '30000', [], 'Find the full volume, then halve it.',
   'The tank holds 50 &times; 40 &times; 30 = 60 000 cm&sup3;. Half of that is 30 000 cm&sup3;.',
   'cm³', cuboid('50 cm', '40 cm', '30 cm', 0.5)],
];

ITEMS.forEach(([id, difficulty, marks, prompt, answer, accept, hint, explanation, unit, svg]) => {
  const isNumeric = /^-?[\d.\/]+$/.test(answer);
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'prisms_and_cylinders', difficulty,
    source: 'NCF Grades 7-9 §3.9 Measurement: Volume; NCE 2025 Q28 pattern.',
    stimulus: svg ? { html: svg, altText: /cylinder/i.test(prompt) ? ALT_CYL : ALT_CUBOID } : null,
    parts: [{
      label: 'a', prompt, marks, hint, explanation,
      response: { kind: isNumeric ? 'number' : 'expression', answer, accept, unit },
    }],
  }));
});

// ── The paper's extended two-part volume question ────────────────────────
// NCE 2025 Q28: a tank, then the water poured into a cylinder, answer in terms
// of pi. Part (b) genuinely consumes part (a)'s answer.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-vol-021', chapterId: CH, subsection: 'prisms_and_cylinders', difficulty: 4,
  source: 'NCF §3.9 Volume; NCE 2025 Q28 shared-stimulus, dependent-parts pattern.',
  // ⚠ The stem goes in `intro`, not into part (a)'s prompt. Printed, the
  //   figure came out ABOVE the sentence introducing it; the real papers
  //   read stem, then diagram, then (a).
  intro: 'The diagram shows a rectangular tank measuring 60 cm by 20 cm by 30 cm.',
  stimulus: { html: cuboid('60 cm', '20 cm', '30 cm', 0.5), altText: ALT_CUBOID },
  parts: [
    { label: 'a', prompt: 'The tank is <b>half</b> full of water. Calculate the <b>volume of water</b> in the tank.',
      marks: 3,
      hint: 'Find the volume of the whole tank first.',
      explanation: 'The tank holds 60 &times; 20 &times; 30 = 36 000 cm&sup3;. Half full means 18 000 cm&sup3; of water.',
      response: { kind: 'number', answer: '18000', unit: 'cm³' } },
    { label: 'b', prompt: 'All the water is poured into a cylindrical container of radius 10 cm. Find the <b>depth</b> of the water, <i>h</i> cm, in the container. Give your answer <b>in terms of &pi;</b>.',
      marks: 4, dependsOn: 'a',
      hint: 'The volume does not change when the water is poured. Use &pi;r&sup2;h = volume.',
      explanation: 'The water still has volume 18 000 cm&sup3;. For the cylinder, &pi; &times; 10&sup2; &times; h = 18 000, '
                 + 'so 100&pi;h = 18 000 and h = 180/&pi; cm.',
      response: { kind: 'expression', answer: '180/pi', accept: ['180/π'], label: 'h', unit: 'cm' } },
  ],
}));

})();
