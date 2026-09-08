'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - C4 · Metals & the Reactivity Series   (weight 3)
//
//  ⚠ THE REACTIVITY SERIES IS SUPPLIED, NOT MEMORISED, in the real papers - it
//    is printed as a list and the candidate reads off it. That is the format
//    used here: the series is drawn as an inline-SVG ladder and the items ask
//    what can be deduced FROM it. A question that requires a child to have
//    learned the order by heart is testing recall the exam does not test.
//
//  ⚠ THE OBSERVATION TABLE IS THE OTHER FORMAT. Results are supplied for four
//    unknown metals and the candidate orders them. Drawn as SVG below.
//
//  ⚠ NO REACTING MASSES AND NO MOLES (blueprint-science §M.6.6). Balanced
//    equations ARE in scope - the syllabus asks for them by name - but only as
//    coefficients, never as grams of product.
//
//  ⚠ POTASSIUM AND SODIUM WITH WATER ARE DESCRIBED, NEVER SUGGESTED AS A
//    SCHOOL PRACTICAL. They are teacher demonstrations; an item that reads as
//    an instruction to a 14-year-old to try one is not written here.
//
//  Source: NCE Science (Chemistry) 2021-2025; NCF Grades 7-9 §C4.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-c4-metals';

// ── The reactivity series as a supplied ladder, most reactive at the top.
const series = () => {
  const M = ['potassium', 'sodium', 'calcium', 'magnesium', 'zinc', 'iron', 'copper', 'gold'];
  const X = 96, TOP = 26, RH = 17;
  let g = '<svg viewBox="0 0 250 ' + (TOP + RH * M.length + 18) + '" width="240" role="img" aria-label="a list of metals in order">';
  g += '<text x="' + X + '" y="14" font-size="9" text-anchor="middle" fill="#0f172a">most reactive</text>';
  M.forEach((m, i) => {
    g += '<text x="' + X + '" y="' + (TOP + RH * i + 12) + '" font-size="10" text-anchor="middle" fill="#334155">' + m + '</text>';
  });
  g += '<text x="' + X + '" y="' + (TOP + RH * M.length + 12) + '" font-size="9" text-anchor="middle" fill="#0f172a">least reactive</text>';
  g += '<line x1="176" y1="' + (TOP - 4) + '" x2="176" y2="' + (TOP + RH * M.length + 4) + '" stroke="#1d4ed8" stroke-width="1.5"/>';
  g += '<polygon points="176,' + (TOP + RH * M.length + 10) + ' 172,' + (TOP + RH * M.length + 2) + ' 180,' + (TOP + RH * M.length + 2) + '" fill="#1d4ed8"/>';
  g += '<text x="188" y="' + (TOP + RH * M.length / 2) + '" font-size="8" fill="#1d4ed8">reactivity</text>';
  g += '<text x="188" y="' + (TOP + RH * M.length / 2 + 10) + '" font-size="8" fill="#1d4ed8">falls</text>';
  return g + '</svg>';
};

// ── Supplied observations for four unknown metals, as a table.
const obs = () => {
  const rows = [
    ['W', 'no reaction', 'no reaction'],
    ['X', 'very fast', 'fast'],
    ['Y', 'slow', 'no reaction'],
    ['Z', 'fast', 'slow'],
  ];
  const W = 260, X0 = 8, RH = 20, top = 22;
  let g = '<svg viewBox="0 0 ' + W + ' ' + (top + RH * (rows.length + 1) + 8) + '" width="270" role="img" aria-label="a table of observations">';
  g += '<text x="' + (W / 2) + '" y="14" font-size="10" text-anchor="middle" fill="#0f172a">Reaction of four metals</text>';
  const c1 = X0 + 44, c2 = X0 + 148;
  g += '<rect x="' + X0 + '" y="' + top + '" width="' + (W - 2 * X0) + '" height="' + (RH * (rows.length + 1)) + '" fill="none" stroke="#0f172a" stroke-width="1.5"/>';
  [c1, c2].forEach(x => { g += '<line x1="' + x + '" y1="' + top + '" x2="' + x + '" y2="' + (top + RH * (rows.length + 1)) + '" stroke="#0f172a" stroke-width="1.5"/>'; });
  g += '<line x1="' + X0 + '" y1="' + (top + RH) + '" x2="' + (W - X0) + '" y2="' + (top + RH) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<text x="' + (X0 + 6) + '" y="' + (top + 14) + '" font-size="9" fill="#0f172a">Metal</text>';
  g += '<text x="' + (c1 + 6) + '" y="' + (top + 14) + '" font-size="9" fill="#0f172a">with dilute acid</text>';
  g += '<text x="' + (c2 + 6) + '" y="' + (top + 14) + '" font-size="9" fill="#0f172a">with cold water</text>';
  rows.forEach((r, i) => {
    const y = top + RH * (i + 1);
    if (i) g += '<line x1="' + X0 + '" y1="' + y + '" x2="' + (W - X0) + '" y2="' + y + '" stroke="#cbd5e1" stroke-width="1"/>';
    g += '<text x="' + (X0 + 6) + '" y="' + (y + 14) + '" font-size="9" fill="#334155">' + r[0] + '</text>';
    g += '<text x="' + (c1 + 6) + '" y="' + (y + 14) + '" font-size="9" fill="#334155">' + r[1] + '</text>';
    g += '<text x="' + (c2 + 6) + '" y="' + (y + 14) + '" font-size="9" fill="#334155">' + r[2] + '</text>';
  });
  return g + '</svg>';
};

const SERIES = series(), OBS = obs();

const MCQ = [
  ['g9s-c4-001', 'metals_with_oxygen', 1,
   'What is formed when a metal burns in oxygen?',
   ['A metal oxide', 'A metal chloride', 'A metal carbonate', 'Hydrogen gas'],
   'A metal oxide',
   'The metal joins with the oxygen.',
   'A metal burning in oxygen forms the metal oxide.'],

  ['g9s-c4-002', 'metals_with_oxygen', 2,
   'Magnesium burns in air with a bright white flame. What is the white solid left behind?',
   ['Magnesium oxide', 'Magnesium chloride', 'Magnesium hydroxide', 'Magnesium carbonate'],
   'Magnesium oxide',
   'Only magnesium and oxygen were present.',
   'Magnesium reacts with the oxygen of the air to form white magnesium oxide.'],

  ['g9s-c4-003', 'metals_with_oxygen', 3,
   'Why does gold jewellery keep its shine for centuries while an iron nail rusts?',
   ['Gold is far less reactive than iron, so it does not react with air',
    'Gold is much harder than iron, so it cannot be scratched',
    'Gold is heavier than iron, so air cannot reach it',
    'Gold is polished more often than an iron nail'],
   'Gold is far less reactive than iron, so it does not react with air',
   'Look at where each metal sits in the reactivity series.',
   'Gold is at the bottom of the reactivity series and does not react with oxygen or water; iron does, and rusts.'],

  ['g9s-c4-004', 'metals_with_acids', 1,
   'What two products are formed when a metal reacts with a dilute acid?',
   ['A salt and hydrogen', 'A salt and oxygen',
    'An oxide and water', 'A carbonate and water'],
   'A salt and hydrogen',
   'One of them is a gas that pops with a lighted splint.',
   'Metal + acid gives a salt plus hydrogen gas.'],

  ['g9s-c4-005', 'metals_with_acids', 2,
   'How is the gas given off when zinc reacts with hydrochloric acid identified?',
   ['It gives a squeaky pop with a lighted splint',
    'It turns limewater milky',
    'It relights a glowing splint',
    'It turns damp litmus paper bright red'],
   'It gives a squeaky pop with a lighted splint',
   'The gas is hydrogen.',
   'Hydrogen gives the squeaky pop test; the milky limewater test is for carbon dioxide.'],

  ['g9s-c4-006', 'metals_with_acids', 2,
   'Which salt is formed when magnesium reacts with hydrochloric acid?',
   ['Magnesium chloride', 'Magnesium sulfate',
    'Magnesium nitrate', 'Magnesium oxide'],
   'Magnesium chloride',
   'The acid decides the second half of the salt name.',
   'Hydrochloric acid gives chlorides, so the salt is magnesium chloride.'],

  ['g9s-c4-007', 'metals_with_acids', 3,
   'Which salt is formed when zinc reacts with dilute sulfuric acid?',
   ['Zinc sulfate', 'Zinc chloride', 'Zinc nitrate', 'Zinc carbonate'],
   'Zinc sulfate',
   'The acid decides the second half of the salt name.',
   'Sulfuric acid gives sulfates, so the salt is zinc sulfate.'],

  ['g9s-c4-008', 'metals_with_acids', 3,
   'Copper does not react with dilute hydrochloric acid. What does this show?',
   ['Copper is below hydrogen in the reactivity series',
    'Copper is above hydrogen in the reactivity series',
    'Hydrochloric acid is too concentrated',
    'Copper reacts only with water instead'],
   'Copper is below hydrogen in the reactivity series',
   'A metal must be more reactive than hydrogen to push it out of an acid.',
   'Only metals above hydrogen displace it from an acid; copper is below it, so nothing happens.'],

  ['g9s-c4-009', 'metals_with_water_steam', 2,
   'What is formed when a very reactive metal reacts with cold water?',
   ['A metal hydroxide and hydrogen',
    'A metal oxide and oxygen',
    'A metal chloride and hydrogen gas',
    'A metal carbonate and water'],
   'A metal hydroxide and hydrogen',
   'The gas given off is the same one as with an acid.',
   'A reactive metal with cold water gives the metal hydroxide and hydrogen gas.'],

  ['g9s-c4-010', 'metals_with_water_steam', 2,
   'Magnesium reacts only very slowly with cold water but vigorously with steam. What does this show?',
   ['Hotter conditions make the reaction much faster',
    'Magnesium is less reactive than gold',
    'Steam is a different substance from water',
    'Magnesium does not react with water at all'],
   'Hotter conditions make the reaction much faster',
   'Steam is simply water that is far hotter.',
   'Steam is much hotter than cold water, so the same reaction goes far faster.'],

  ['g9s-c4-011', 'metals_with_water_steam', 3,
   'Which metal would you expect to react most vigorously with cold water?',
   ['Potassium', 'Zinc', 'Iron', 'Copper'], 'Potassium',
   'Use the reactivity series: the highest reacts most.',
   'Potassium sits at the top of the reactivity series, so it reacts most vigorously.'],

  ['g9s-c4-012', 'reactivity_series', 2,
   'Using the series shown, which metal is the most reactive?<br>' + SERIES,
   ['Potassium', 'Gold', 'Iron', 'Zinc'], 'Potassium',
   'Read the top of the list.',
   'Potassium is at the top of the list, which is the most reactive end.'],

  ['g9s-c4-013', 'reactivity_series', 2,
   'Using the series shown, which metal is the least reactive?<br>' + SERIES,
   ['Gold', 'Potassium', 'Calcium', 'Magnesium'], 'Gold',
   'Read the bottom of the list.',
   'Gold is at the bottom of the list, which is the least reactive end.'],

  ['g9s-c4-014', 'reactivity_series', 3,
   'Using the series shown, which of these pairs is in the correct order, more reactive first?<br>' + SERIES,
   ['Magnesium, then copper', 'Copper, then magnesium',
    'Gold, then zinc', 'Iron, then calcium'],
   'Magnesium, then copper',
   'The one higher in the list is the more reactive.',
   'Magnesium is above copper in the series, so magnesium is the more reactive of the two.'],

  ['g9s-c4-015', 'reactivity_series', 3,
   'Using the series shown, which metals would react with dilute acid to give hydrogen?<br>' + SERIES,
   ['Those above copper and gold in the list',
    'Only the two at the very bottom',
    'Every metal in the list, equally',
    'Only gold, because it is unreactive'],
   'Those above copper and gold in the list',
   'The unreactive metals at the bottom do not attack an acid.',
   'The metals higher in the series displace hydrogen from an acid; copper and gold, at the bottom, do not.'],

  ['g9s-c4-016', 'predicting_reactions', 3,
   'The table shows how four metals behave. Which is the most reactive?<br>' + OBS,
   ['X', 'W', 'Y', 'Z'], 'X',
   'Look for the metal that reacts fastest with both.',
   'X reacts very fast with acid and fast with cold water, so it is the most reactive of the four.'],

  ['g9s-c4-017', 'predicting_reactions', 3,
   'From the same table, which metal is the least reactive?<br>' + OBS,
   ['W', 'X', 'Y', 'Z'], 'W',
   'Look for the metal that does nothing at all.',
   'W does not react with the acid or with cold water, so it is the least reactive.'],

  ['g9s-c4-018', 'predicting_reactions', 3,
   'From the same table, what is the correct order, most reactive first?<br>' + OBS,
   ['X, Z, Y, W', 'W, Y, Z, X', 'X, Y, Z, W', 'Z, X, W, Y'],
   'X, Z, Y, W',
   'Rank them by how strongly each reacts with the acid.',
   'X is very fast, Z fast, Y slow and W not at all, so the order is X, Z, Y, W.'],

  ['g9s-c4-019', 'predicting_reactions', 2,
   'A more reactive metal is placed in a solution of a less reactive metal salt. What happens?',
   ['The more reactive metal displaces the less reactive one',
    'The less reactive metal displaces the more reactive one',
    'Nothing happens in any circumstances',
    'Both metals dissolve completely'],
   'The more reactive metal displaces the less reactive one',
   'The stronger competitor takes the place in the compound.',
   'In a displacement reaction the more reactive metal takes the place of the less reactive one in its compound.'],

  ['g9s-c4-020', 'predicting_reactions', 3,
   'An iron nail is placed in copper sulfate solution. What is observed?',
   ['A brown coating forms on the nail and the blue colour fades',
    'The nail dissolves completely and nothing is deposited',
    'Bubbles of hydrogen are given off rapidly',
    'Nothing at all happens to the nail or the solution'],
   'A brown coating forms on the nail and the blue colour fades',
   'Iron is above copper in the reactivity series.',
   'Iron displaces copper, so copper is deposited on the nail as a brown coating and the blue copper sulfate fades.'],

  ['g9s-c4-021', 'predicting_reactions', 3,
   'Why does no reaction occur when a copper strip is placed in magnesium sulfate solution?',
   ['Copper is less reactive than magnesium, so it cannot displace it',
    'Copper is more reactive than the magnesium, so it dissolves instead',
    'Magnesium sulfate does not dissolve in water',
    'Copper reacts only with acids, never with salts'],
   'Copper is less reactive than magnesium, so it cannot displace it',
   'Displacement only works one way round.',
   'A metal can only displace one below it in the series; copper is below magnesium, so nothing happens.'],

  ['g9s-c4-022', 'equations_for_metals', 2,
   'Which word equation describes magnesium reacting with dilute sulfuric acid?',
   ['magnesium + sulfuric acid &rarr; magnesium sulfate + hydrogen',
    'magnesium + sulfuric acid &rarr; magnesium sulfate + oxygen',
    'magnesium + sulfuric acid &rarr; magnesium oxide + water',
    'magnesium sulfate + hydrogen &rarr; magnesium + sulfuric acid'],
   'magnesium + sulfuric acid &rarr; magnesium sulfate + hydrogen',
   'Metal + acid gives a salt and one gas.',
   'Sulfuric acid gives a sulfate, and the gas released is hydrogen.'],

  ['g9s-c4-023', 'equations_for_metals', 3,
   'Which is the balanced equation for magnesium burning in oxygen?',
   ['2Mg + O<sub>2</sub> &rarr; 2MgO',
    'Mg + O<sub>2</sub> &rarr; MgO',
    'Mg + O &rarr; MgO',
    'Mg<sub>2</sub> + O<sub>2</sub> &rarr; 2MgO'],
   '2Mg + O<sub>2</sub> &rarr; 2MgO',
   'One O<sub>2</sub> supplies two oxygen atoms.',
   'Two magnesium atoms are needed to use both oxygen atoms of the O<sub>2</sub> molecule.'],

  ['g9s-c4-024', 'equations_for_metals', 3,
   'Which word equation describes iron displacing copper from copper sulfate?',
   ['iron + copper sulfate &rarr; iron sulfate + copper',
    'copper + iron sulfate &rarr; copper sulfate + iron',
    'iron + copper sulfate &rarr; iron oxide + copper',
    'iron + copper &rarr; iron sulfate + copper sulfate'],
   'iron + copper sulfate &rarr; iron sulfate + copper',
   'The more reactive metal ends up in the compound.',
   'Iron, being more reactive, takes the sulfate and copper is set free as the metal.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-c4-025', 'metals_with_acids', 1,
   'Name the gas given off when a metal reacts with a dilute acid.',
   'Hydrogen', ['hydrogen gas', 'h2'],
   'It pops with a lighted splint.',
   'Metal + acid always releases hydrogen.'],
  ['g9s-c4-026', 'metals_with_acids', 2,
   'State the test that identifies hydrogen gas.',
   'It pops with a lighted splint',
   ['squeaky pop', 'a squeaky pop with a lighted splint', 'lighted splint pops',
    'it gives a pop', 'burns with a pop'],
   'It involves a lighted splint.',
   'Hydrogen gives a squeaky pop when a lighted splint is held at the mouth of the tube.'],
  ['g9s-c4-027', 'metals_with_oxygen', 1,
   'Give the name of the compound formed when a metal burns in oxygen.',
   'Metal oxide', ['an oxide', 'oxide', 'the metal oxide'],
   'The metal joins with the oxygen.',
   'A metal burning in oxygen gives the metal oxide.'],
  ['g9s-c4-028', 'reactivity_series', 2,
   'Give the name for the list of metals arranged in order of how vigorously they react.',
   'Reactivity series', ['the reactivity series', 'reactivity-series'],
   'Two words.', 'The reactivity series ranks the metals from most to least reactive.'],
  ['g9s-c4-029', 'predicting_reactions', 3,
   'Give the term for a reaction in which a more reactive metal takes the place of a less reactive one in its compound.',
   'Displacement', ['displacement reaction', 'a displacement reaction'],
   'The less reactive metal is pushed out.',
   'This is a displacement reaction.'],
  ['g9s-c4-030', 'metals_with_water_steam', 2,
   'Name the gas released when a reactive metal reacts with cold water.',
   'Hydrogen', ['hydrogen gas', 'h2'],
   'The same gas as with an acid.',
   'A reactive metal with water gives the hydroxide and hydrogen.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
