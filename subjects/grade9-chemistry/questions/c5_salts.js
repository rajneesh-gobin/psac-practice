'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - C5 · Salts   (examWeight 1, lowered from 3 after this
//  file was written; see below)
//
//  ⚠ THE WEIGHT HAS SINCE BEEN LOWERED TO 1 - this file was written against 3.
//    blueprint-science §M.6.7 asked for it, and the whole grade9-science set was
//    rederived on 2026-09-08 (derivation block in _manifest.js). C5 sits at the
//    floor of 1 on a measured 9.6% of Chemistry marks.
//    ⚠ THAT 9.6% IS RISING EVERY YEAR - 0, 4, 5, 7, 8 marks across the five
//    papers, the only clear directional trend in the whole corpus - so 1 is a
//    reading of the past, not a settled figure. The 30 questions here are
//    deliberately NOT trimmed to match the weight: revisit the weight when a
//    2026 paper exists, and the content will already be there.
//
//  ⚠ NEUTRALISATION IN DAILY LIFE IS A NAMED SYLLABUS OUTCOME and it is where
//    the marks are: indigestion, insect stings, acid soil, acid rain in lakes.
//    Every example here is one of those four, which is what the papers ask.
//
//  ⚠ NO TITRATION CALCULATIONS AND NO MOLES. Preparing a salt is examined as a
//    method - which acid, which base, filter or evaporate - never as a
//    concentration sum (§M.6.6).
//
//  ⚠ SOLUBILITY RULES ARE SUPPLIED IN THE PAPERS, not memorised, so the two
//    items that need them state the rule in the stem.
//
//  Source: NCE Science (Chemistry) 2021-2025; NCF Grades 7-9 §C5.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-c5-salts';

const MCQ = [
  ['g9s-c5-001', 'neutralisation', 1,
   'What is a <b>neutralisation</b> reaction?',
   ['An acid reacting with a base to form a salt and water',
    'An acid reacting with a metal to form hydrogen',
    'A solid dissolving completely in water',
    'A liquid boiling and turning into a gas'],
   'An acid reacting with a base to form a salt and water',
   'Two products are always formed, and one of them is water.',
   'Acid + base gives a salt and water: that is neutralisation.'],

  ['g9s-c5-002', 'neutralisation', 1,
   'What is the pH of a neutral solution?',
   ['7', '0', '1', '14'], '7',
   'It sits exactly in the middle of the scale.',
   'A neutral solution has a pH of 7; below that is acidic and above it is alkaline.'],

  ['g9s-c5-003', 'neutralisation', 2,
   'An acid of pH 2 is slowly neutralised by adding an alkali. What happens to the pH?',
   ['It rises towards 7', 'It falls towards 0',
    'It stays at 2 throughout', 'It jumps straight to 14'],
   'It rises towards 7',
   'Neutralising means moving towards neutral.',
   'Adding alkali to an acid raises the pH towards 7, the neutral point.'],

  ['g9s-c5-004', 'neutralisation', 2,
   'Which two products are always formed when an acid neutralises an alkali?',
   ['A salt and water', 'A salt and hydrogen',
    'An oxide and hydrogen', 'A carbonate and oxygen'],
   'A salt and water',
   'One of them is the commonest liquid on Earth.',
   'Acid + alkali always gives a salt and water.'],

  ['g9s-c5-005', 'neutralisation', 3,
   'Which colour does universal indicator show in a strongly acidic solution?',
   ['Red', 'Green', 'Blue', 'Purple'], 'Red',
   'Green is neutral; the acid end is the warm colour.',
   'Universal indicator is red in strong acid, green at neutral and purple in strong alkali.'],

  ['g9s-c5-006', 'neutralisation', 3,
   'Hydrochloric acid neutralises sodium hydroxide. Which salt is formed?',
   ['Sodium chloride', 'Sodium sulfate', 'Sodium nitrate', 'Sodium carbonate'],
   'Sodium chloride',
   'The metal comes from the base, the rest from the acid.',
   'Sodium comes from the sodium hydroxide and chloride from the hydrochloric acid, giving sodium chloride.'],

  ['g9s-c5-007', 'neutralisation', 3,
   'Sulfuric acid neutralises potassium hydroxide. Which salt is formed?',
   ['Potassium sulfate', 'Potassium chloride',
    'Potassium nitrate', 'Potassium hydroxide'],
   'Potassium sulfate',
   'Sulfuric acid always gives a sulfate.',
   'Potassium from the base and sulfate from the sulfuric acid gives potassium sulfate.'],

  ['g9s-c5-008', 'soluble_insoluble', 1,
   'A salt that dissolves in water is described as:',
   ['Soluble', 'Insoluble', 'Neutral', 'Saturated'], 'Soluble',
   'The word comes from "dissolve".',
   'A soluble salt dissolves in water; an insoluble one does not.'],

  ['g9s-c5-009', 'soluble_insoluble', 2,
   'All sodium and potassium salts are soluble. Which of these dissolves in water?',
   ['Sodium chloride', 'Silver chloride',
    'Barium sulfate', 'Lead carbonate'],
   'Sodium chloride',
   'Use the rule given in the question.',
   'The rule states that all sodium salts are soluble, so sodium chloride dissolves.'],

  ['g9s-c5-010', 'soluble_insoluble', 3,
   'All nitrates are soluble, but most carbonates are insoluble. Which of these does NOT dissolve in water?',
   ['Calcium carbonate', 'Sodium nitrate',
    'Potassium nitrate', 'Magnesium nitrate'],
   'Calcium carbonate',
   'Apply both halves of the rule given.',
   'Every nitrate listed is soluble; calcium carbonate is a carbonate and is insoluble.'],

  ['g9s-c5-011', 'soluble_insoluble', 3,
   'An insoluble salt is made by mixing two solutions. How is the salt separated from the mixture?',
   ['By filtration, because the salt is a solid that does not dissolve',
    'By distillation, because the salt boils off before the water',
    'By crystallisation, because the salt is already dissolved',
    'By sublimation, because the salt turns straight into a gas'],
   'By filtration, because the salt is a solid that does not dissolve',
   'An insoluble solid in a liquid is a filtration job.',
   'The insoluble salt forms as a solid precipitate, so it is filtered off, washed and dried.'],

  ['g9s-c5-012', 'soluble_insoluble', 3,
   'A soluble salt has been made by neutralising an acid with a base. How is the solid salt obtained from the solution?',
   ['By crystallisation, evaporating the water away',
    'By filtration, using a filter paper',
    'By adding more acid to the solution',
    'By cooling the solution until it freezes'],
   'By crystallisation, evaporating the water away',
   'The salt is dissolved, so a paper will not catch it.',
   'A dissolved salt passes through filter paper, so the water is evaporated and the salt crystallises out.'],

  ['g9s-c5-013', 'neutralisation_in_daily_life', 2,
   'Indigestion tablets contain a base. How do they work?',
   ['They neutralise excess acid in the stomach',
    'They add more acid to the stomach',
    'They stop the stomach producing any fluid',
    'They coat the food so it cannot be digested'],
   'They neutralise excess acid in the stomach',
   'The problem is too much acid.',
   'The base in the tablet neutralises the excess hydrochloric acid that causes the pain.'],

  ['g9s-c5-014', 'neutralisation_in_daily_life', 3,
   'Why is a weak base, rather than a strong alkali, used in an indigestion tablet?',
   ['A strong alkali would damage the lining of the stomach',
    'A weak base tastes much better than a strong alkali',
    'A strong alkali would not react with the stomach acid at all',
    'A weak base works far more slowly than is needed'],
   'A strong alkali would damage the lining of the stomach',
   'Think about what a strong alkali would do to tissue.',
   'Strong alkalis are corrosive and would injure the stomach; a mild base neutralises the acid safely.'],

  ['g9s-c5-015', 'neutralisation_in_daily_life', 2,
   'A bee sting is acidic. Which treatment would relieve it by neutralisation?',
   ['A mild base such as baking soda', 'Vinegar, which is an acid',
    'Lemon juice, which is an acid', 'Pure water, which is neutral'],
   'A mild base such as baking soda',
   'Neutralise an acid with a base.',
   'Baking soda is a mild base, so it neutralises the acidic sting.'],

  ['g9s-c5-016', 'neutralisation_in_daily_life', 3,
   'A wasp sting is alkaline. Which treatment would relieve it by neutralisation?',
   ['Vinegar, which is an acid', 'Baking soda, which is a base',
    'Soap solution, which is alkaline', 'Pure water, which is neutral'],
   'Vinegar, which is an acid',
   'This time the sting is alkaline, so the opposite is needed.',
   'An alkaline sting is neutralised by a weak acid such as vinegar.'],

  ['g9s-c5-017', 'neutralisation_in_daily_life', 2,
   'A farmer finds that a field is too acidic for a crop. What is added to the soil?',
   ['Lime, which is a base', 'More acid fertiliser',
    'Sand, which is neutral', 'Extra water only'],
   'Lime, which is a base',
   'Neutralise acid with a base.',
   'Lime is a base, so it neutralises the acid in the soil and raises its pH.'],

  ['g9s-c5-018', 'neutralisation_in_daily_life', 3,
   'Powdered limestone is sometimes added to a lake damaged by acid rain. Why?',
   ['It neutralises the acid so that fish can live there again',
    'It makes the water more acidic for the fish',
    'It removes all the oxygen dissolved in the water',
    'It makes the lake deeper and colder'],
   'It neutralises the acid so that fish can live there again',
   'Limestone is a carbonate, and carbonates react with acids.',
   'Limestone neutralises the acid, raising the pH back towards a level that water life can survive.'],

  ['g9s-c5-019', 'neutralisation_in_daily_life', 3,
   'Which everyday problem is NOT solved by a neutralisation reaction?',
   ['Filtering mud out of river water',
    'Treating acid indigestion with a tablet',
    'Adding lime to acid soil',
    'Putting baking soda on a bee sting'],
   'Filtering mud out of river water',
   'Three of these involve an acid and a base.',
   'Removing mud is a physical separation by filtration; the other three are neutralisation.'],

  ['g9s-c5-020', 'uses_of_salts', 1,
   'Which salt is used to flavour and preserve food?',
   ['Sodium chloride', 'Calcium carbonate',
    'Copper sulfate', 'Silver nitrate'],
   'Sodium chloride',
   'It is the salt found on every table.',
   'Sodium chloride is common table salt, used for flavouring and for preserving food.'],

  ['g9s-c5-021', 'uses_of_salts', 2,
   'Calcium carbonate is the main compound in limestone. What is it widely used for?',
   ['Making cement and neutralising acid soil',
    'Flavouring and preserving food',
    'Filling the batteries in a torch',
    'Bleaching cloth in a laundry'],
   'Making cement and neutralising acid soil',
   'Think about building, and about farming.',
   'Limestone is used to make cement and, as lime, to neutralise acid soils.'],

  ['g9s-c5-022', 'uses_of_salts', 3,
   'Which salt is used in agriculture as a fertiliser because plants need its nitrogen?',
   ['Ammonium nitrate', 'Sodium chloride',
    'Calcium carbonate', 'Barium sulfate'],
   'Ammonium nitrate',
   'Look for the salt whose name contains nitrogen twice over.',
   'Ammonium nitrate supplies nitrogen, which plants need for growth, so it is used as a fertiliser.'],

  ['g9s-c5-023', 'uses_of_salts', 3,
   'Why must a fertiliser salt be soluble in water?',
   ['So the plant roots can take it up in solution',
    'So it can be stored more easily in a shed',
    'So it neutralises the acid in the air',
    'So it can be filtered back out of the soil later'],
   'So the plant roots can take it up in solution',
   'How does a root take anything in?',
   'Roots absorb dissolved substances, so a fertiliser has to dissolve before the plant can use it.'],

  ['g9s-c5-024', 'uses_of_salts', 2,
   'Which statement about a salt is correct?',
   ['It is formed when the hydrogen of an acid is replaced by a metal',
    'It is always sodium chloride and never any other compound',
    'It is always completely insoluble in water, whatever it is',
    'It is formed only when two different metals react together'],
   'It is formed when the hydrogen of an acid is replaced by a metal',
   'Salt is a general chemical word, not just the one on the table.',
   'A salt is the compound formed when the hydrogen in an acid is replaced by a metal, so there are very many salts.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-c5-025', 'neutralisation', 1,
   'Give the pH of a neutral solution.',
   '7', ['seven', 'ph 7'],
   'The middle of the pH scale.', 'A neutral solution has a pH of 7.'],
  ['g9s-c5-026', 'neutralisation', 2,
   'Complete the general equation: acid + base &rarr; salt + ______',
   'Water', ['h2o', 'water.'],
   'It is the commonest liquid on Earth.',
   'Acid + base gives a salt and water.'],
  ['g9s-c5-027', 'neutralisation', 2,
   'Give the term for the reaction between an acid and a base that gives a salt and water.',
   'Neutralisation', ['neutralization', 'neutralising', 'neutralizing'],
   'The product is neither acidic nor alkaline.',
   'Acid + base is a neutralisation reaction.'],
  ['g9s-c5-028', 'neutralisation_in_daily_life', 2,
   'Name the substance a farmer adds to soil that is too acidic.',
   'Lime', ['limestone', 'calcium carbonate', 'quicklime'],
   'It is a base.',
   'Lime neutralises the acid in the soil and raises its pH.'],
  ['g9s-c5-029', 'uses_of_salts', 1,
   'Give the chemical name of common table salt.',
   'Sodium chloride', ['nacl', 'sodium-chloride'],
   'Two words.', 'Table salt is sodium chloride.'],
  ['g9s-c5-030', 'soluble_insoluble', 2,
   'Give the term for a salt that does not dissolve in water.',
   'Insoluble', ['insoluble salt', 'not soluble'],
   'The opposite of soluble.',
   'A salt that does not dissolve is insoluble, and can be filtered off.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
