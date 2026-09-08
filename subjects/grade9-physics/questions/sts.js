'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - Science, Technology & Society   (examWeight 2)
//
//  ⚠ EVERY NAMED FACT HERE IS REAL AND CHECKABLE. Christiaan Barnard performed
//    the first human-to-human heart transplant in Cape Town in December 1967;
//    the patient, Louis Washkansky, survived 18 days and died of pneumonia.
//    Those are the facts, and the 18 days is the part that carries the lesson -
//    a first is not the same as a success. A science bank that rounds that off
//    into "the operation was a success" teaches the wrong thing about science.
//
//  ⚠ CHROMATOGRAPHY IS A SYLLABUS OUTCOME HERE, NOT IN C2. The manifest puts
//    `applications_of_chromatography` under STS - drugs in sport, pesticide
//    residues, food contaminants, testing purity - so this chapter carries the
//    applications and C2 keeps the separation techniques. Do not duplicate it.
//
//  ⚠ THE CORRELATION ITEM IS THE POINT OF `interpreting_climate_data`. Two
//    lines rising together is a correlation; saying which causes which needs
//    more than the graph. That distinction is the mark, and it is the same
//    reasoning as the salt/heart-disease item in B1 - deliberately so.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science 2021-2025; NCF Grades 7-9 §STS.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-sts';

// ── Two rising lines on one pair of axes: global temperature and atmospheric
//    carbon dioxide. Drawn to be READ, and the point is the correlation.
const climateGraph = () => {
  const X0 = 44, Y0 = 118, X1 = 226, Y1 = 22;
  const co2  = [[0, 20], [1, 32], [2, 46], [3, 62], [4, 78]];
  const temp = [[0, 14], [1, 24], [2, 40], [3, 54], [4, 72]];
  const sx = i => X0 + (i / 4) * (X1 - X0);
  const sy = v => Y0 - (v / 100) * (Y0 - Y1);
  const path = pts => pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join(' ');
  let g = '<svg viewBox="0 0 250 178" width="270" role="img" aria-label="a graph with two lines on shared axes">';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  ['1960', '1980', '2000', '2010', '2020'].forEach((t, i) => {
    g += '<text x="' + sx(i).toFixed(1) + '" y="' + (Y0 + 13) + '" font-size="8" text-anchor="middle" fill="#334155">' + t + '</text>';
  });
  g += '<path d="' + path(co2) + '" fill="none" stroke="#b91c1c" stroke-width="2.5"/>';
  g += '<path d="' + path(temp) + '" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="6 4"/>';
  g += '<line x1="60" y1="162" x2="86" y2="162" stroke="#b91c1c" stroke-width="2.5"/>';
  g += '<text x="90" y="165" font-size="8" fill="#334155">carbon dioxide</text>';
  g += '<line x1="152" y1="162" x2="178" y2="162" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="6 4"/>';
  g += '<text x="182" y="165" font-size="8" fill="#334155">temperature</text>';
  // ⚠ The x label sat at y=136, five pixels under tick labels at y=131, and
  //   printed over the "2000". The vertical axis carried no label at all, which
  //   for a two-line plot is worse than untidy: the lines are different
  //   quantities on different scales and the figure has to SAY so. Both found by
  //   rendering the sheet and looking at it; both were inside the viewBox, so
  //   the clipping check passed them.
  g += '<text x="140" y="146" font-size="8" text-anchor="middle" fill="#334155">year</text>';
  g += '<text x="13" y="72" font-size="8" text-anchor="middle" fill="#334155" transform="rotate(-90 13 72)">each line on its own scale</text>';
  return g + '</svg>';
};

const CLIMATE = climateGraph();

const MCQ = [
  ['g9s-sts-026', 'optical_fibres', 1,
   'What travels along an optical fibre?',
   ['Light', 'Electricity', 'Water', 'Sound waves'], 'Light',
   'The clue is in the word optical.',
   'An optical fibre carries information as pulses of light.'],

  ['g9s-sts-027', 'optical_fibres', 2,
   'How are optical fibres used in medicine?',
   ['In an endoscope, to see inside the body without major surgery',
    'To measure a patient&rsquo;s temperature from a distance',
    'To replace the bones that have been broken',
    'To carry blood from one part of the body to another'],
   'In an endoscope, to see inside the body without major surgery',
   'They carry an image out of a narrow space.',
   'An endoscope uses optical fibres to light the inside of the body and carry an image back to the doctor.'],

  ['g9s-sts-028', 'optical_fibres', 3,
   'What is the main advantage of optical fibres over copper wires for communication?',
   ['They carry far more information and lose less of the signal',
    'They are much heavier and so much harder to damage',
    'They need no equipment at either end',
    'They work only over very short distances'],
   'They carry far more information and lose less of the signal',
   'Think about capacity and about signal loss.',
   'Fibres carry much more data with less loss and no electrical interference, which is why they carry long-distance traffic.'],

  ['g9s-sts-029', 'optical_fibres', 3,
   'Why is an island such as Mauritius connected to the rest of the world by undersea optical fibre cables?',
   ['They carry internet traffic across the ocean at high capacity',
    'They supply the island with its electricity',
    'They anchor the island against the strongest currents',
    'They carry fresh water from the mainland'],
   'They carry internet traffic across the ocean at high capacity',
   'Think about what a fibre carries.',
   'Undersea fibre cables carry the island&rsquo;s internet and telephone traffic to other continents.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});
const SHORT = [
  ['g9s-sts-033', 'optical_fibres', 1,
   'State what travels along an optical fibre.',
   'Light', ['light pulses', 'pulses of light'],
   'The clue is in the word optical.',
   'Information travels along an optical fibre as pulses of light.'],
  ['g9s-sts-034', 'optical_fibres', 2,
   'Name the medical instrument that uses optical fibres to see inside the body.',
   'Endoscope', ['an endoscope', 'endoscopy'],
   'One word.', 'An endoscope uses optical fibres to look inside the body.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});
})();
