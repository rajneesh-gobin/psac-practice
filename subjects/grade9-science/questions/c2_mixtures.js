'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - C2 · Mixtures & Separation Techniques   (weight 3)
//
//  ⚠ "DRAW LABELLED DIAGRAMS SHOWING HOW EACH TECHNIQUE IS CARRIED OUT" IS THE
//    SYLLABUS OUTCOME, and blueprint-science §X.5.1 names the labelled line
//    diagram of apparatus as "the workhorse of all three papers, present in
//    every year of every science". This chapter is therefore built around four
//    inline-SVG rigs: distillation, filtration, crystallisation and
//    sublimation. Every one is drawn to be READ - the parts are lettered so an
//    item can ask which letter is the condenser without printing the word.
//
//  ⚠ THE APP CANNOT MARK A DRAWING, so the outcome is covered from the reading
//    side only: identify the part, spot the mistake in a rig, choose the
//    technique, state the principle. Producing the drawing stays uncovered and
//    is recorded as such rather than pretended at.
//
//  ⚠ A LETTERED FIGURE MUST NOT ALSO CARRY THE NAMES. The whole question is
//    which letter is which; printing both hands the answer over. `distil()`
//    and `filter()` take a flag for exactly this reason.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science (Chemistry) 2021-2025; NCF Grades 7-9 §C2.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-c2-mixtures';

const lab = (x, y, t) =>
  '<text x="' + x + '" y="' + y + '" font-size="11" font-weight="bold" text-anchor="middle" fill="#1d4ed8">' + t + '</text>';

// ── Simple distillation. Letters: A thermometer, B flask, C condenser,
//    D receiving beaker. Cold water enters low and leaves high.
const distil = (letters) => {
  let g = '<svg viewBox="0 0 300 190" width="290" role="img" aria-label="apparatus set up on a bench">';
  // flask + liquid
  g += '<path d="M 52 62 L 52 92 A 26 26 0 1 0 78 92 L 78 62 Z" fill="none" stroke="#0f172a" stroke-width="2"/>';
  g += '<path d="M 42 106 A 23 23 0 0 0 88 106 A 23 23 0 0 1 42 106 Z" fill="#bfdbfe" stroke="none"/>';
  g += '<path d="M 43 100 A 23 23 0 0 0 87 100" fill="#bfdbfe" stroke="none"/>';
  g += '<circle cx="65" cy="104" r="23" fill="none" stroke="#0f172a" stroke-width="2"/>';
  // thermometer in the neck
  g += '<line x1="65" y1="18" x2="65" y2="60" stroke="#0f172a" stroke-width="2"/>';
  g += '<circle cx="65" cy="62" r="3.5" fill="#b91c1c"/>';
  // side arm to the condenser
  g += '<line x1="78" y1="70" x2="122" y2="82" stroke="#0f172a" stroke-width="2"/>';
  // condenser: inner tube + outer jacket, sloping down to the right
  g += '<line x1="120" y1="80" x2="216" y2="106" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="118" y1="88" x2="214" y2="114" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="124" y1="70" x2="222" y2="97" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="112" y1="98" x2="210" y2="125" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="124" y1="70" x2="112" y2="98" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="222" y1="97" x2="210" y2="125" stroke="#0f172a" stroke-width="2"/>';
  // water in (low, near the far end) and out (high, near the flask)
  g += '<line x1="214" y1="112" x2="238" y2="128" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="120" y1="80" x2="100" y2="60" stroke="#0f172a" stroke-width="2"/>';
  g += '<text x="243" y="132" font-size="8" fill="#334155">water in</text>';
  // ⚠ Anchored START at 106, not END at 96: end-anchored it ran back across the
  //   flask neck and the thermometer stem and printed as an overlap. Inside the
  //   viewBox, so the clipping check passed it - found by rendering the sheet.
  g += '<text x="106" y="50" font-size="8" fill="#334155">water out</text>';
  // receiver
  g += '<rect x="216" y="136" width="40" height="38" fill="none" stroke="#0f172a" stroke-width="2"/>';
  g += '<rect x="217" y="158" width="38" height="15" fill="#bfdbfe"/>';
  g += '<line x1="214" y1="120" x2="236" y2="134" stroke="#0f172a" stroke-width="2"/>';
  // heat
  g += '<path d="M 58 150 Q 65 136 72 150 Q 65 144 58 150 Z" fill="#f59e0b"/>';
  g += '<line x1="52" y1="152" x2="78" y2="152" stroke="#0f172a" stroke-width="2"/>';
  g += '<text x="65" y="168" font-size="8" text-anchor="middle" fill="#334155">heat</text>';
  if (letters) {
    g += lab(78, 24, 'A');
    g += lab(30, 108, 'B');
    g += lab(168, 76, 'C');
    g += lab(268, 158, 'D');
  }
  return g + '</svg>';
};

// ── Filtration: funnel with folded paper over a conical flask.
//    Letters: P the residue on the paper, Q the filter paper, R the filtrate.
const filtration = (letters) => {
  let g = '<svg viewBox="0 0 210 190" width="220" role="img" aria-label="apparatus set up on a bench">';
  g += '<path d="M 55 30 L 145 30 L 100 96 Z" fill="none" stroke="#0f172a" stroke-width="2"/>';
  g += '<path d="M 66 42 L 134 42 L 100 92 Z" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3"/>';
  g += '<path d="M 74 50 L 126 50 L 100 84 Z" fill="#cbd5e1" stroke="none"/>';
  g += '<line x1="100" y1="96" x2="100" y2="116" stroke="#0f172a" stroke-width="2"/>';
  g += '<path d="M 62 186 L 62 150 L 92 118 L 108 118 L 138 150 L 138 186 Z" fill="none" stroke="#0f172a" stroke-width="2"/>';
  g += '<path d="M 63 185 L 63 158 L 137 158 L 137 185 Z" fill="#bfdbfe" stroke="none"/>';
  g += '<circle cx="100" cy="122" r="2" fill="#1d4ed8"/>';
  if (letters) {
    g += lab(158, 56, 'P');
    g += lab(46, 46, 'Q');
    g += lab(158, 176, 'R');
    g += '<line x1="150" y1="54" x2="112" y2="62" stroke="#1d4ed8" stroke-width="1"/>';
    g += '<line x1="54" y1="42" x2="70" y2="38" stroke="#1d4ed8" stroke-width="1"/>';
    g += '<line x1="150" y1="172" x2="132" y2="170" stroke="#1d4ed8" stroke-width="1"/>';
  }
  return g + '</svg>';
};

// ── Crystallisation: evaporating basin on a gauze and tripod over a flame.
const evaporate = () =>
  '<svg viewBox="0 0 210 170" width="210" role="img" aria-label="apparatus set up on a bench">' +
  '<path d="M 62 44 A 43 43 0 0 0 148 44 Z" fill="none" stroke="#0f172a" stroke-width="2"/>' +
  '<path d="M 68 56 A 36 36 0 0 0 142 56 Z" fill="#bfdbfe" stroke="none"/>' +
  '<line x1="62" y1="44" x2="148" y2="44" stroke="#0f172a" stroke-width="2"/>' +
  '<path d="M 84 34 q 4 -10 8 0 q 4 10 8 0" fill="none" stroke="#93c5fd" stroke-width="1.5"/>' +
  '<path d="M 112 30 q 4 -10 8 0 q 4 10 8 0" fill="none" stroke="#93c5fd" stroke-width="1.5"/>' +
  '<line x1="48" y1="92" x2="162" y2="92" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="58" y1="92" x2="58" y2="146" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="152" y1="92" x2="152" y2="146" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="56" y1="88" x2="154" y2="88" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>' +
  '<path d="M 96 130 Q 105 108 114 130 Q 105 120 96 130 Z" fill="#f59e0b"/>' +
  '<line x1="94" y1="132" x2="116" y2="132" stroke="#0f172a" stroke-width="2"/>' +
  '<text x="105" y="160" font-size="8" text-anchor="middle" fill="#334155">heat</text>' +
  '</svg>';

// ── Sublimation: solid heated in a beaker, vapour re-forming on a cooled dish.
const sublime = () =>
  '<svg viewBox="0 0 210 180" width="210" role="img" aria-label="apparatus set up on a bench">' +
  '<path d="M 66 40 A 40 12 0 0 0 146 40 L 146 118 L 66 118 Z" fill="none" stroke="#0f172a" stroke-width="2"/>' +
  '<ellipse cx="106" cy="40" rx="40" ry="12" fill="none" stroke="#0f172a" stroke-width="2"/>' +
  '<rect x="86" y="108" width="40" height="10" fill="#7c3aed"/>' +
  '<path d="M 96 100 q 5 -12 10 0 q 5 12 10 0" fill="none" stroke="#a78bfa" stroke-width="1.5"/>' +
  '<path d="M 92 82 q 5 -12 10 0 q 5 12 10 0" fill="none" stroke="#a78bfa" stroke-width="1.5"/>' +
  '<ellipse cx="106" cy="30" rx="46" ry="9" fill="none" stroke="#0f172a" stroke-width="2"/>' +
  '<path d="M 84 26 l 6 6 M 96 24 l 6 6 M 108 24 l 6 6 M 120 26 l 6 6" stroke="#7c3aed" stroke-width="1.5"/>' +
  '<text x="106" y="16" font-size="8" text-anchor="middle" fill="#334155">cold dish</text>' +
  '<path d="M 96 140 Q 105 120 114 140 Q 105 130 96 140 Z" fill="#f59e0b"/>' +
  '<line x1="94" y1="142" x2="116" y2="142" stroke="#0f172a" stroke-width="2"/>' +
  '<text x="105" y="166" font-size="8" text-anchor="middle" fill="#334155">heat</text>' +
  '</svg>';

const MCQ = [
  ['g9s-c2-001', 'distillation', 2,
   'In the apparatus shown, which letter marks the <b>condenser</b>?<br>' + distil(true),
   ['C', 'A', 'B', 'D'], 'C',
   'The condenser is the long sloping part with water flowing around it.',
   'C is the long jacketed tube with cold water passing round it, where the vapour is cooled back to a liquid.'],

  ['g9s-c2-002', 'distillation', 2,
   'In the apparatus shown, which letter marks the <b>thermometer</b>?<br>' + distil(true),
   ['A', 'B', 'C', 'D'], 'A',
   'It is placed at the top, where the vapour leaves.',
   'A is the thermometer, placed so its bulb sits where the vapour passes into the side arm.'],

  ['g9s-c2-003', 'distillation', 2,
   'In the apparatus shown, what collects in the vessel marked D?<br>' + distil(true),
   ['The distillate, the liquid that has evaporated and condensed',
    'The residue, the solid that is left behind after heating',
    'The cooling water that flows through the jacket',
    'The mixture exactly as it was before heating'],
   'The distillate, the liquid that has evaporated and condensed',
   'It is at the far end, after the condenser.',
   'D receives the distillate: the substance that boiled off and was condensed back to a liquid.'],

  ['g9s-c2-004', 'distillation', 3,
   'Why is the cooling water fed in at the lower end of the condenser and out at the upper end?',
   ['So the jacket stays full and the water meets the vapour flow',
    'So the water flows more quickly through the jacket',
    'So the water is heated before it reaches the flask',
    'So less water is needed to fill the jacket'],
   'So the jacket stays full and the water meets the vapour flow',
   'Think about which way the vapour is travelling.',
   'Feeding in at the bottom keeps the jacket completely full and sends the water against the vapour flow, cooling it most effectively.'],

  ['g9s-c2-005', 'distillation', 2,
   'What is distillation used to separate?',
   ['A liquid from a solution, using differences in boiling point',
    'An insoluble solid from a liquid, using a filter paper',
    'Two solids that look identical',
    'A gas from the air, using a magnet'],
   'A liquid from a solution, using differences in boiling point',
   'The technique boils something off and cools it back down.',
   'Distillation separates a liquid from a solution, or two liquids, using their different boiling points.'],

  ['g9s-c2-006', 'distillation', 3,
   'Sea water is distilled to obtain pure water. Where does the salt go?',
   ['It stays behind in the flask',
    'It passes through the condenser with the vapour',
    'It collects in the receiving beaker',
    'It escapes into the air as a gas'],
   'It stays behind in the flask',
   'Does salt boil at the temperature of boiling water?',
   'Only the water evaporates; the salt has a far higher boiling point and remains in the flask.'],

  ['g9s-c2-007', 'crystallization', 2,
   'The apparatus shown is used to obtain crystals from a solution. What is happening?<br>' + evaporate(),
   ['The solvent is evaporating, leaving the solute behind',
    'The solute is evaporating, leaving the solvent behind',
    'The solution is being cooled to make it freeze',
    'The solution is being filtered through the basin'],
   'The solvent is evaporating, leaving the solute behind',
   'Follow the arrows leaving the surface.',
   'Heating drives the solvent off as vapour; the dissolved solid stays behind and crystallises.'],

  ['g9s-c2-008', 'crystallization', 1,
   'Crystallisation is used to obtain:',
   ['A dissolved solid from its solution',
    'An insoluble solid from a liquid',
    'A liquid from a solution',
    'A gas from a liquid'],
   'A dissolved solid from its solution',
   'The wanted substance is the one that was dissolved.',
   'Crystallisation recovers the dissolved solid (the solute) from its solution.'],

  ['g9s-c2-009', 'crystallization', 3,
   'Why is a solution usually evaporated only to the point of saturation rather than to dryness?',
   ['Slow cooling then gives larger, better formed crystals',
    'It saves the last of the solvent for later use',
    'Heating it to dryness would dissolve the crystals again',
    'The basin would become impossible to clean'],
   'Slow cooling then gives larger, better formed crystals',
   'Think about the size and shape of the crystals wanted.',
   'Evaporating to saturation and letting it cool slowly grows large, well-shaped crystals; boiling dry gives a fine powder.'],

  ['g9s-c2-010', 'crystallization', 3,
   'How is sea salt obtained on a large scale in a hot country?',
   ['Sea water is left in shallow pans and the water evaporates',
    'Sea water is filtered through a very fine filter paper',
    'Sea water is cooled until the salt in it freezes solid',
    'Sea water is passed slowly over a very strong magnet'],
   'Sea water is left in shallow pans and the water evaporates',
   'It is crystallisation, using the Sun.',
   'Shallow salt pans let the Sun evaporate the water, leaving the salt to crystallise - crystallisation on an industrial scale.'],

  ['g9s-c2-011', 'sublimation', 1,
   'What is <b>sublimation</b>?',
   ['A solid turning straight into a gas without melting',
    'A solid melting and then boiling into a gas',
    'A gas dissolving into a liquid',
    'A liquid freezing into a solid'],
   'A solid turning straight into a gas without melting',
   'One state is skipped.',
   'Sublimation is the change from solid directly to gas, with no liquid stage in between.'],

  ['g9s-c2-012', 'sublimation', 2,
   'In the apparatus shown, the purple solid is heated and re-forms on the cold dish above. What has happened?<br>' + sublime(),
   ['It sublimed to a gas and then formed a solid again on cooling',
    'It melted, boiled and then condensed back to a liquid',
    'It dissolved in the air and was filtered out',
    'It burned and produced a new substance'],
   'It sublimed to a gas and then formed a solid again on cooling',
   'The solid never became a liquid.',
   'The solid turned straight to vapour and, meeting the cold dish, turned straight back to a solid.'],

  ['g9s-c2-013', 'sublimation', 3,
   'A mixture of sand and a substance that sublimes is heated as shown. What is left in the beaker?<br>' + sublime(),
   ['The sand, because it does not sublime',
    'Nothing, because both substances sublime',
    'A clear liquid formed from the mixture',
    'The substance that sublimed, now melted'],
   'The sand, because it does not sublime',
   'Only one of the two leaves the beaker.',
   'The subliming substance leaves as a vapour and re-forms on the cold dish; the sand stays behind.'],

  ['g9s-c2-014', 'sublimation', 3,
   'Why can sublimation be used to separate a mixture of two solids?',
   ['Only one of them turns to a gas when it is heated',
    'They always have exactly the same melting point',
    'One of them dissolves in the other when warm',
    'Both of them turn into a gas at the same temperature'],
   'Only one of them turns to a gas when it is heated',
   'A separation always needs a difference between the two.',
   'If just one component sublimes, heating removes it as a vapour and leaves the other behind.'],

  ['g9s-c2-015', 'apparatus_diagrams', 2,
   'In the filtration shown, which letter marks the <b>residue</b>?<br>' + filtration(true),
   ['P', 'Q', 'R', 'None of them'], 'P',
   'The residue is what stays on the paper.',
   'P marks the solid trapped on the filter paper, which is the residue.'],

  ['g9s-c2-016', 'apparatus_diagrams', 2,
   'In the filtration shown, which letter marks the <b>filtrate</b>?<br>' + filtration(true),
   ['R', 'P', 'Q', 'None of them'], 'R',
   'The filtrate is the liquid that gets through.',
   'R marks the liquid collected in the flask below, which is the filtrate.'],

  ['g9s-c2-017', 'apparatus_diagrams', 2,
   'In the filtration shown, what is the part marked Q?<br>' + filtration(true),
   ['The filter paper', 'The residue', 'The filtrate', 'The condenser'],
   'The filter paper',
   'It is folded into the cone of the funnel.',
   'Q is the filter paper, folded into the funnel, whose small pores hold back the solid.'],

  ['g9s-c2-018', 'apparatus_diagrams', 3,
   'What is filtration used to separate?',
   ['An insoluble solid from a liquid',
    'A dissolved solid from its solution',
    'Two liquids with different boiling points',
    'Two gases from the air'],
   'An insoluble solid from a liquid',
   'Would a dissolved solid be stopped by the paper?',
   'Filtration removes an insoluble solid; anything dissolved passes straight through the paper with the liquid.'],

  ['g9s-c2-019', 'apparatus_diagrams', 3,
   'A pupil sets up a distillation but leaves the thermometer bulb well below the side arm, deep in the liquid. What is wrong?',
   ['It reads the liquid temperature, not that of the vapour leaving',
    'It will break, because the boiling liquid is far too hot',
    'It stops the vapour from reaching the condenser at all',
    'Nothing is wrong; that is exactly where the bulb should sit'],
   'It reads the liquid temperature, not that of the vapour leaving',
   'What is the thermometer there to measure?',
   'The bulb must sit level with the side arm so it reads the temperature of the vapour passing to the condenser.'],

  ['g9s-c2-020', 'choosing_a_technique', 2,
   'Which technique separates sand from water?',
   ['Filtration', 'Distillation', 'Crystallisation', 'Sublimation'],
   'Filtration',
   'Sand does not dissolve.',
   'Sand is insoluble, so it is trapped by a filter paper while the water passes through.'],

  ['g9s-c2-021', 'choosing_a_technique', 2,
   'Which technique obtains pure water from salt water?',
   ['Distillation', 'Filtration', 'Sublimation', 'Magnetism'],
   'Distillation',
   'The salt is dissolved, so a paper will not stop it.',
   'Distillation boils the water off and condenses it, leaving the dissolved salt behind.'],

  ['g9s-c2-022', 'choosing_a_technique', 2,
   'Which technique obtains solid salt from salt water?',
   ['Crystallisation', 'Filtration', 'Distillation', 'Sublimation'],
   'Crystallisation',
   'This time the wanted substance is the dissolved solid.',
   'Evaporating the water leaves the dissolved salt behind as crystals.'],

  ['g9s-c2-023', 'choosing_a_technique', 3,
   'A mixture contains sand, salt and water. Which order of steps separates all three?',
   ['Filter, then crystallise the filtrate',
    'Crystallise, then filter the crystals',
    'Distil, then filter the residue',
    'Filter twice through the same paper'],
   'Filter, then crystallise the filtrate',
   'Deal with the insoluble solid first.',
   'Filtering removes the sand; crystallising the filtrate then recovers the salt from the water.'],

  ['g9s-c2-024', 'choosing_a_technique', 3,
   'Which property is used to separate two liquids by distillation?',
   ['They have different boiling points',
    'They have different colours',
    'They have the same boiling point',
    'One of them is magnetic'],
   'They have different boiling points',
   'A separation needs a difference to work with.',
   'The liquid with the lower boiling point evaporates first and is condensed and collected separately.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-c2-025', 'distillation', 2,
   'Name the part of a distillation apparatus in which the vapour is cooled back to a liquid.',
   'Condenser', ['the condenser', 'a condenser'],
   'Cold water flows around it.',
   'The condenser cools the vapour so it turns back into a liquid.'],
  ['g9s-c2-026', 'distillation', 2,
   'Give the name of the liquid collected at the end of a distillation.',
   'Distillate', ['the distillate'],
   'It is named after the technique.',
   'The liquid that has evaporated and been condensed is the distillate.'],
  ['g9s-c2-027', 'apparatus_diagrams', 1,
   'Give the name for the solid left on the filter paper after filtration.',
   'Residue', ['the residue'],
   'It stays behind on the paper.',
   'The solid held back by the paper is the residue.'],
  ['g9s-c2-028', 'apparatus_diagrams', 1,
   'Give the name for the liquid that passes through the filter paper.',
   'Filtrate', ['the filtrate'],
   'It is named after the technique.',
   'The liquid that passes through is the filtrate.'],
  ['g9s-c2-029', 'sublimation', 2,
   'Give the term for a solid changing directly into a gas without melting.',
   'Sublimation', ['sublimes', 'subliming', 'to sublime'],
   'The liquid stage is skipped.',
   'Sublimation is the direct change from solid to gas.'],
  ['g9s-c2-030', 'choosing_a_technique', 2,
   'Name the technique used to separate an insoluble solid from a liquid.',
   'Filtration', ['filtering', 'filter'],
   'It uses a paper in a funnel.',
   'Filtration separates an insoluble solid from a liquid.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
