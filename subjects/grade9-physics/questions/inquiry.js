'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - Scientific Inquiry   (examWeight 2)
//
//  ⚠ PRACTICAL SCIENCE IS EXAMINED ON PAPER, HEAVILY. blueprint-science §X.6:
//    none of the three papers is a practical exam, yet every one of them tests
//    practical work through diagrams and descriptions - naming apparatus,
//    choosing a technique, spotting a mistake in a rig, naming a controlled
//    variable, stating a safety precaution, identifying a source of error,
//    drawing a conclusion from a results table. Measured at roughly 8-12 marks
//    per paper, spread across questions rather than gathered into one.
//    That makes this the most under-weighted chapter in the manifest at 2, and
//    the most transferable: it earns marks in Biology, Chemistry AND Physics.
//
//  ⚠ VARIABLES ARE THE CORE OF IT. Independent, dependent, controlled - the
//    papers ask which is which by name, and a child who cannot separate them
//    cannot answer the "why is this not a fair test?" item that follows.
//
//  ⚠ `formula_rearrangement` IS A REAL SYLLABUS OUTCOME - "finding a missing
//    quantity from a simple relationship" - and it is written here as pure
//    rearrangement across the relationships this pack already uses (speed,
//    Q = It, magnification, density), so it reinforces rather than duplicates.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science 2021-2025, all three sciences; NCF Grades 7-9 §Inquiry.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-inquiry';

// ── A supplied results table: the shape every paper uses for the
//    "draw a conclusion" item.
const results = () => {
  const rows = [['20', '12'], ['30', '18'], ['40', '25'], ['50', '31'], ['60', '38']];
  const W = 250, X0 = 26, RH = 19, top = 24;
  let g = '<svg viewBox="0 0 ' + W + ' ' + (top + RH * (rows.length + 1) + 10) + '" width="260" role="img" aria-label="a table of results">';
  g += '<text x="' + (W / 2) + '" y="15" font-size="10" text-anchor="middle" fill="#0f172a">Bubbles counted from a water plant</text>';
  const c1 = X0 + 100;
  g += '<rect x="' + X0 + '" y="' + top + '" width="' + (W - 2 * X0) + '" height="' + (RH * (rows.length + 1)) + '" fill="none" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + c1 + '" y1="' + top + '" x2="' + c1 + '" y2="' + (top + RH * (rows.length + 1)) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + X0 + '" y1="' + (top + RH) + '" x2="' + (W - X0) + '" y2="' + (top + RH) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<text x="' + (X0 + 5) + '" y="' + (top + 13) + '" font-size="9" fill="#0f172a">Light / units</text>';
  g += '<text x="' + (c1 + 5) + '" y="' + (top + 13) + '" font-size="9" fill="#0f172a">Bubbles per min</text>';
  rows.forEach((r, i) => {
    const y = top + RH * (i + 1);
    if (i) g += '<line x1="' + X0 + '" y1="' + y + '" x2="' + (W - X0) + '" y2="' + y + '" stroke="#cbd5e1" stroke-width="1"/>';
    g += '<text x="' + (X0 + 5) + '" y="' + (y + 13) + '" font-size="9" fill="#334155">' + r[0] + '</text>';
    g += '<text x="' + (c1 + 5) + '" y="' + (y + 13) + '" font-size="9" fill="#334155">' + r[1] + '</text>';
  });
  return g + '</svg>';
};

const TABLE = results();

const NUM = [
  ['g9s-inq-025', 'formula_rearrangement', 2,
   'Speed = distance &divide; time. A car travels 150 m in 10 s. Calculate its speed, in m/s.',
   15, 'Substitute straight into the relationship.', '150 / 10 = 15 m/s.'],
  ['g9s-inq-026', 'formula_rearrangement', 3,
   'Speed = distance &divide; time. A car travels at 12 m/s for 9 s. Calculate the distance, in metres.',
   108, 'Rearrange to distance = speed &times; time.', '12 &times; 9 = 108 m.'],
  ['g9s-inq-027', 'formula_rearrangement', 3,
   'Q = It. A charge of 36 C flows in 6 s. Calculate the current, in amperes.',
   6, 'Rearrange to I = Q &divide; t.', '36 / 6 = 6 A.'],
  ['g9s-inq-028', 'formula_rearrangement', 3,
   'Density = mass &divide; volume. A block has a mass of 90 g and a volume of 30 cm&#179;. Calculate its density, in g/cm&#179;.',
   3, 'Substitute straight into the relationship.', '90 / 30 = 3 g/cm&#179;.'],
  ['g9s-inq-029', 'formula_rearrangement', 3,
   'Density = mass &divide; volume. A liquid of density 2 g/cm&#179; has a volume of 25 cm&#179;. Calculate its mass, in grams.',
   50, 'Rearrange to mass = density &times; volume.', '2 &times; 25 = 50 g.'],
  ['g9s-inq-030', 'formula_rearrangement', 3,
   'Magnification = drawing size &divide; real size. A drawing is 45 mm wide at a magnification of 9. Calculate the real size, in mm.',
   5, 'Rearrange to real size = drawing size &divide; magnification.', '45 / 9 = 5 mm.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
});
})();
