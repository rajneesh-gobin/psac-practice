'use strict';
// ══════════════════════════════════════════════
//  Science Labs — Food Groups & Teeth (Science, PSAC Grade 6).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every food group, food item,
//    tooth type, food test, guide step, discovery, mission question, hazard text
//    and coach fact comes from this file. lab_nutrition.js only draws and moves.
//    If a food goes to the wrong group, fix it HERE.
//  ⚠ Grounded in grade6-science chapter g6-animals (examWeight 10, the highest
//    in the pack), subsections `diet` ("The 5 food groups: carbohydrates,
//    proteins, fats, vitamins and minerals, water. Importance of a balanced
//    diet") and `teeth` ("Human teeth: milk teeth vs permanent teeth. Types of
//    teeth: incisors, canines, premolars, molars. Functions of each type of
//    tooth").
//  ⚠ Food tests (iodine, Benedict\'s, Biuret, grease spot) are named and their
//    colour changes stated. Grade 6 pupils name the test and colour only;
//    they do not run it at PSAC.
//  ⚠ Primary lab (docs/labs/LAB_SPEC.md §8): every guide, mission and discovery
//    carries `grades: [6]`. Sentences are ≤15 words for a 9-11-year-old reader.
// ══════════════════════════════════════════════
const LabNutritionData = (() => {

  const GRADES = [6];
  const G6 = [6];
  const forGrade = (list, g) => list.filter(x => (x.grades || G6).includes(Number(g)));

  // ── Food groups ─────────────────────────────────────────────────────────────
  const FOOD_GROUPS = {
    carbs: {
      name: 'Carbohydrates', short: 'Carbs',
      color: '#F9C74F', icon: '🍞',
      function: 'Give energy for movement and thinking.',
      foods_text: 'Bread, rice, potato, pasta, cereals.',
      deficiency: 'You feel tired. You have no energy.',
    },
    protein: {
      name: 'Proteins', short: 'Protein',
      color: '#F08030', icon: '🥚',
      function: 'Build and repair muscles and body parts.',
      foods_text: 'Meat, fish, eggs, beans, gelatine.',
      deficiency: 'Children grow slowly. Muscles are weak.',
    },
    fat: {
      name: 'Fats & Oils', short: 'Fats',
      color: '#FFD97D', icon: '🧈',
      function: 'Store energy and keep the body warm.',
      foods_text: 'Butter, cooking oil, cheese, nuts.',
      deficiency: 'The body cannot absorb some vitamins.',
    },
    vitamins: {
      name: 'Vitamins & Minerals', short: 'Vitamins',
      color: '#80B918', icon: '🍊',
      function: 'Keep you healthy and protect against illness.',
      foods_text: 'Fruit and vegetables of all kinds.',
      deficiency: 'Lack of vitamin C causes scurvy. Lack of vitamin D causes rickets.',
    },
    water: {
      name: 'Water', short: 'Water',
      color: '#90E0EF', icon: '💧',
      function: 'Carry nutrients around the body.',
      foods_text: 'Drinking water, soup, fruit, vegetables.',
      deficiency: 'Dehydration: the body cannot work properly.',
    },
  };
  const GROUP_IDS = ['carbs', 'protein', 'fat', 'vitamins', 'water'];

  // ── Food items ───────────────────────────────────────────────────────────────
  // group: which food group it mainly belongs to.
  // testPos: which food tests give a positive result.
  const FOODS = {
    bread:   { name: 'Bread',   icon: '🍞', group: 'carbs',    testPos: ['iodine'],           swatch: '#E8D5A0' },
    rice:    { name: 'Rice',    icon: '🍚', group: 'carbs',    testPos: ['iodine'],           swatch: '#F4F2EC' },
    potato:  { name: 'Potato',  icon: '🥔', group: 'carbs',    testPos: ['iodine'],           swatch: '#E8C87A' },
    pasta:   { name: 'Pasta',   icon: '🍝', group: 'carbs',    testPos: ['iodine'],           swatch: '#F0D99C' },
    egg:     { name: 'Egg',     icon: '🥚', group: 'protein',  testPos: ['biuret'],           swatch: '#FFF8DC' },
    meat:    { name: 'Meat',    icon: '🥩', group: 'protein',  testPos: ['biuret'],           swatch: '#C0392B' },
    fish:    { name: 'Fish',    icon: '🐟', group: 'protein',  testPos: ['biuret'],           swatch: '#7FB3D3' },
    beans:   { name: 'Beans',   icon: '🫘', group: 'protein',  testPos: ['iodine', 'biuret'], swatch: '#8B6363' },
    butter:  { name: 'Butter',  icon: '🧈', group: 'fat',      testPos: ['grease'],           swatch: '#F7D97D' },
    oil:     { name: 'Oil',     icon: '🫙', group: 'fat',      testPos: ['grease'],           swatch: '#E8C528' },
    cheese:  { name: 'Cheese',  icon: '🧀', group: 'fat',      testPos: ['biuret', 'grease'], swatch: '#F5C518' },
    orange:  { name: 'Orange',  icon: '🍊', group: 'vitamins', testPos: ['benedict'],         swatch: '#FF8C00' },
    mango:   { name: 'Mango',   icon: '🥭', group: 'vitamins', testPos: ['benedict'],         swatch: '#FFB347' },
    spinach: { name: 'Spinach', icon: '🥬', group: 'vitamins', testPos: [],                   swatch: '#228B22' },
    water_g: { name: 'Water',   icon: '💧', group: 'water',    testPos: [],                   swatch: '#90E0EF' },
    soup:    { name: 'Soup',    icon: '🍲', group: 'water',    testPos: [],                   swatch: '#D2691E' },
  };
  const FOOD_IDS = Object.keys(FOODS);
  const SHELF_FOODS = ['bread', 'rice', 'egg', 'meat', 'butter', 'oil', 'orange', 'mango', 'water_g', 'fish', 'potato', 'beans', 'cheese', 'spinach', 'soup'];

  // ── Food tests ───────────────────────────────────────────────────────────────
  const FOOD_TESTS = {
    iodine:   { name: 'Iodine solution',     short: 'Iodine',     nutrient: 'starch (carbohydrates)',
                before: 'orange-brown', after: 'blue-black',
                note: 'Iodine turns blue-black when starch is present.' },
    benedict: { name: "Benedict\'s solution", short: "Benedict\'s", nutrient: 'sugar',
                before: 'blue', after: 'orange or red',
                note: "Benedict\'s turns orange or red when sugar is present." },
    biuret:   { name: 'Biuret solution',     short: 'Biuret',     nutrient: 'protein',
                before: 'blue', after: 'purple',
                note: 'Biuret solution turns purple when protein is present.' },
    grease:   { name: 'Grease-spot test',    short: 'Grease spot', nutrient: 'fat',
                before: 'no spot', after: 'see-through spot',
                note: 'Fat leaves a see-through spot on brown paper.' },
  };
  const TEST_IDS = Object.keys(FOOD_TESTS);

  // Subset used in the iodine guided experiment.
  const IODINE_FOODS = ['bread', 'rice', 'orange', 'butter'];

  // ── Teeth ────────────────────────────────────────────────────────────────────
  // position in half-jaw (canvas x-index, 0 = centre): 0 incisor, 1 incisor,
  // 2 canine, 3 premolar, 4 premolar, 5 molar, 6 molar.
  const TEETH = {
    incisor:  { name: 'Incisor',  count: 8,  shape: 'chisel-shaped, flat',
                position: 'front of the mouth',         function: 'Biting and cutting food.' },
    canine:   { name: 'Canine',   count: 4,  shape: 'pointed',
                position: 'corners of the mouth',        function: 'Tearing food.' },
    premolar: { name: 'Premolar', count: 8,  shape: 'flat with ridges',
                position: 'between canines and molars',  function: 'Grinding and crushing food.' },
    molar:    { name: 'Molar',    count: 12, shape: 'large and flat',
                position: 'back of the mouth',           function: 'Grinding tough food.' },
  };
  const TOOTH_IDS = ['incisor', 'canine', 'premolar', 'molar'];
  const TOTAL_TEETH = 32;

  // Half-jaw layout: type of each visible tooth slot, left (back) to right (centre).
  const JAW_SLOTS = ['molar', 'molar', 'premolar', 'premolar', 'canine', 'incisor', 'incisor'];

  // ── Guide vocabulary (tokens for recipes) ────────────────────────────────────
  const SETS = {
    food:    FOOD_IDS,
    group:   GROUP_IDS,
    tooth:   TOOTH_IDS,
    test:    TEST_IDS,
    station: ['meal', 'teeth'],
  };
  const ACTS = ['check', 'read', 'label', 'reset'];

  // ── Guided experiments ────────────────────────────────────────────────────────
  const GUIDES = [
    { id: 'balanced_meal', icon: '🍽️', title: 'Build a balanced meal', grades: G6,
      blurb: 'Put one food from each group onto the plate.',
      lesson: 'A balanced meal has all five food groups. Every group does a different job.',
      steps: [
        { on: 'station:meal',  say: 'Tap the 🍽️ Meal Builder tab.' },
        { on: 'food:bread',    say: 'Tap 🍞 bread - or drag it onto the plate!' },
        { on: 'food:egg',      say: 'Now tap 🥚 egg for protein.' },
        { on: 'food:butter',   say: 'Tap 🧈 butter for the fats group.' },
        { on: 'food:orange',   say: 'Tap 🍊 orange for vitamins.' },
        { on: 'food:water_g',  say: 'Tap 💧 water - every meal needs water!' },
        { on: 'check',         say: 'Tap ✅ Check - is your meal balanced?' },
      ],
    },
    { id: 'iodine_test', icon: '🔵', title: 'Which foods have starch?', grades: G6,
      blurb: 'Dip iodine onto four foods and watch the colour.',
      lesson: 'Iodine turns blue-black on foods with starch. Bread and rice have starch.',
      steps: [
        { on: 'station:meal',    say: 'Tap the 🍽️ Meal Builder tab.' },
        { on: 'test:iodine',     say: 'Tap the 🔵 iodine dropper in the test tools.' },
        { on: 'food:bread',      say: 'Tap 🍞 bread - does the colour change?' },
        { on: 'food:rice',       say: 'Now tap 🍚 rice.' },
        { on: 'food:orange',     say: 'Now tap 🍊 orange.' },
        { on: 'food:butter',     say: 'Now tap 🧈 butter.' },
        { on: 'read',            say: 'Tap 🔎 Read to see the results!' },
      ],
    },
    { id: 'label_teeth', icon: '🦷', title: 'Label the teeth', grades: G6,
      blurb: 'Tap each tooth in the diagram and learn its job.',
      lesson: 'Adults have four types of teeth. Each type has a different shape and job.',
      steps: [
        { on: 'station:teeth',   say: 'Tap the 🦷 Teeth Lab tab.' },
        { on: 'tooth:incisor',   say: 'Tap an incisor on the diagram - the flat front tooth.' },
        { on: 'tooth:canine',    say: 'Tap the pointed canine tooth.' },
        { on: 'tooth:premolar',  say: 'Tap a premolar - it has small ridges on top.' },
        { on: 'tooth:molar',     say: 'Tap a large flat molar at the back.' },
        { on: 'label',           say: 'Tap 🏷️ Label to name all four types!' },
      ],
    },
  ];

  // ── Discoveries ───────────────────────────────────────────────────────────────
  // `how` tokens are from SETS (key:value) or ACTS (bare word).
  // Placing a food unlocks its group discovery. Check unlocks balanced_plate.
  // Tapping a tooth unlocks its discovery. Label unlocks dental_health or dental_acid.
  const DISCOVERIES = [
    { id: 'carbs_energy', icon: '🍞', title: 'Carbohydrates give energy', grades: G6,
      hint: 'Put a bread on the plate.',
      how: ['food:bread'],
      saw: 'Bread went into the carbohydrates section.',
      learn: 'Carbohydrates give energy for movement. Bread, rice and potato are carbohydrates.' },
    { id: 'protein_repair', icon: '🥚', title: 'Proteins build and repair', grades: G6,
      hint: 'Put an egg on the plate.',
      how: ['food:egg'],
      saw: 'Egg went into the protein section.',
      learn: 'Proteins build muscles and repair the body. Meat, fish and eggs are proteins.' },
    { id: 'fat_store', icon: '🧈', title: 'Fats store energy', grades: G6,
      hint: 'Put butter on the plate.',
      how: ['food:butter'],
      saw: 'Butter went into the fats and oils section.',
      learn: 'Fats store energy and keep the body warm. Butter, oil and cheese are fats.' },
    { id: 'vit_protect', icon: '🍊', title: 'Vitamins keep you healthy', grades: G6,
      hint: 'Put an orange on the plate.',
      how: ['food:orange'],
      saw: 'Orange went into the vitamins and minerals section.',
      learn: 'Vitamins and minerals protect you from illness. Fruit and vegetables are full of them.' },
    { id: 'water_life', icon: '💧', title: 'Water is essential', grades: G6,
      hint: 'Put water on the plate.',
      how: ['food:water_g'],
      saw: 'Water went into the water section.',
      learn: 'Water carries nutrients around your body. All foods contain some water.' },
    { id: 'balanced_plate', icon: '🍽️', title: 'A balanced meal', grades: G6,
      hint: 'Fill all five sections on the plate, then check.',
      how: ['food:bread', 'food:egg', 'food:butter', 'food:orange', 'food:water_g', 'check'],
      saw: 'All five sections were filled. The plate was balanced!',
      learn: 'A balanced meal has food from all five groups. This keeps you healthy.' },
    { id: 'incisor_cuts', icon: '🦷', title: 'Incisors cut food', grades: G6,
      hint: 'Tap an incisor in the diagram.',
      how: ['station:teeth', 'tooth:incisor'],
      saw: 'The incisor lit up. It is chisel-shaped and at the front.',
      learn: 'Incisors are the eight front teeth. They bite and cut food into pieces.' },
    { id: 'canine_tears', icon: '🦷', title: 'Canines tear food', grades: G6,
      hint: 'Tap a canine in the diagram.',
      how: ['station:teeth', 'tooth:canine'],
      saw: 'The canine lit up. It is pointed and at the corner.',
      learn: 'Canines are four pointed teeth. They tear food apart.' },
    { id: 'premolar_crush', icon: '🦷', title: 'Premolars crush food', grades: G6,
      hint: 'Tap a premolar in the diagram.',
      how: ['station:teeth', 'tooth:premolar'],
      saw: 'The premolar lit up. It has ridges on top.',
      learn: 'Premolars are eight teeth. They are between canines and molars. They grind and crush.' },
    { id: 'molar_grind', icon: '🦷', title: 'Molars grind food', grades: G6,
      hint: 'Tap a molar in the diagram.',
      how: ['station:teeth', 'tooth:molar'],
      saw: 'The molar lit up. It is large and at the back.',
      learn: 'Molars are twelve large back teeth. They grind tough food.' },
    { id: 'starch_iodine', icon: '🔵', title: 'Iodine test for starch', grades: G6,
      hint: 'Test bread with iodine solution.',
      how: ['test:iodine', 'food:bread', 'read'],
      saw: 'The iodine turned blue-black on the bread.',
      learn: 'Iodine is orange-brown. It turns blue-black when starch is present.' },
    { id: 'protein_biuret', icon: '🟣', title: 'Biuret test for protein', grades: G6,
      hint: 'Test egg with Biuret solution.',
      how: ['test:biuret', 'food:egg', 'read'],
      saw: 'The Biuret solution turned purple on the egg.',
      learn: 'Biuret solution turns purple when protein is present.' },
    { id: 'fat_spot', icon: '📄', title: 'Grease-spot test for fat', grades: G6,
      hint: 'Test butter with the grease-spot test.',
      how: ['test:grease', 'food:butter', 'read'],
      saw: 'Butter left a see-through spot on brown paper.',
      learn: 'Fat leaves a see-through spot on brown paper. The spot stays after drying.' },
    { id: 'dental_acid', icon: '🦷', title: 'Acid erodes tooth enamel', grades: G6,
      hint: 'Tap a molar, then tap Label.',
      how: ['station:teeth', 'tooth:molar', 'label'],
      saw: 'The diagram showed acid attacking the outer layer of the tooth.',
      learn: 'Fizzy drinks are acidic. The acid wears away tooth enamel over time.' },
    { id: 'dental_health', icon: '🪥', title: 'How to keep teeth healthy', grades: G6,
      hint: 'Tap all four tooth types, then tap Label.',
      how: ['station:teeth', 'tooth:incisor', 'tooth:canine', 'tooth:premolar', 'tooth:molar', 'label'],
      saw: 'All four tooth types were tapped and labelled.',
      learn: 'Brush twice a day. Eat less sugar. Fizzy drinks erode enamel.' },
  ];

  // ── Hazards ────────────────────────────────────────────────────────────────────
  const HAZARDS = {
    missing_group: {
      signs: ['warning'], fx: 'missing',
      title: () => 'Unbalanced diet warning',
      happened: () => 'Your meal is missing a food group. It is not balanced.',
      why: 'Each food group does a different job. Missing one causes problems.',
      instead: 'Add food from the missing group to balance the meal.',
      exam: '📝 In the PSAC exam: name all five food groups for a balanced diet.',
    },
    sugar_decay: {
      signs: ['warning'], fx: 'decay',
      title: () => 'Too much sugar causes tooth decay',
      happened: () => 'The meal has too much sugar. Bacteria make acid from sugar.',
      why: 'The acid attacks tooth enamel. This causes holes called cavities.',
      instead: 'Cut down on sugary foods. Brush teeth twice a day.',
      exam: '📝 In the PSAC exam: explain how sugar causes tooth decay.',
    },
    fizzy_enamel: {
      signs: ['warning'], fx: 'erosion',
      title: () => 'Fizzy drinks erode enamel',
      happened: () => 'A fizzy drink was given to the model. Acid wore at the enamel.',
      why: 'Fizzy drinks contain carbonic acid. It dissolves the hard enamel layer.',
      instead: 'Drink water instead of fizzy drinks. Rinse with water afterwards.',
      exam: '📝 In the PSAC exam: state one way to keep teeth healthy.',
    },
  };

  // ── Result cards (wrong but safe) ─────────────────────────────────────────────
  const RESULTS = {
    too_much_fat: {
      icon: '🧈', title: 'Too much fat in the meal',
      happened: () => 'You added two fatty foods. The meal has more fat than needed.',
      instead: 'One portion of fat per meal is enough. The body stores the rest.',
      exam: '📝 In the PSAC exam: too much fat is stored as energy in the body.',
    },
    deficiency: {
      icon: '⚠️', title: 'Missing vitamins - deficiency',
      happened: () => 'There are no fruit or vegetables on the plate.',
      instead: 'Add fruit or vegetables to get vitamins and minerals.',
      exam: '📝 In the PSAC exam: lack of vitamin C causes scurvy. Lack of vitamin D causes rickets.',
    },
    wrong_group: {
      icon: '❌', title: 'Wrong food group',
      happened: c => 'That food is in the wrong group on the plate.',
      instead: 'Check which group each food belongs to and try again.',
      exam: '📝 In the PSAC exam: match each food to its correct food group.',
    },
  };

  // ── Missions ──────────────────────────────────────────────────────────────────
  const MISSIONS = [
    { id: 'meal_challenge', icon: '🍽️', title: 'Balanced Meal Challenge', grades: G6,
      blurb: 'Place five foods on the plate - one from each group.',
      intro: 'Balanced Meal Challenge! Place one food from each group. Then answer five questions.',
      foods: ['bread', 'egg', 'butter', 'orange', 'water_g'],
      quiz: [
        { q: 'Which food group gives you energy for movement?',
          options: ['Carbohydrates', 'Proteins', 'Fats', 'Water'],
          why: 'Carbohydrates are the main energy source. Bread, rice and potato are carbohydrates.' },
        { q: 'Which food group builds and repairs your body?',
          options: ['Proteins', 'Carbohydrates', 'Vitamins', 'Fats'],
          why: 'Proteins build muscles and repair tissues. Eggs, meat and fish are proteins.' },
        { q: 'Which foods belong to vitamins and minerals?',
          options: ['Orange and spinach', 'Bread and rice', 'Butter and oil', 'Egg and meat'],
          why: 'Fruit and vegetables give vitamins and minerals. Orange and spinach both are.' },
        { q: 'A meal has bread, egg and orange - but no water. What is missing?',
          options: ['Water', 'Fats', 'Carbohydrates', 'Protein'],
          why: 'The meal has carbs, protein and vitamins. Water is the missing group.' },
        { q: 'Why is water important in a balanced diet?',
          options: ['It carries nutrients around the body', 'It gives energy for sport', 'It builds strong bones', 'It repairs muscles'],
          why: 'Water transports nutrients and waste around the body.' },
      ],
    },
    { id: 'know_teeth', icon: '🦷', title: 'Know Your Teeth', grades: G6,
      blurb: 'Label the teeth in the diagram. Answer five questions.',
      intro: 'Know Your Teeth! Tap each tooth type, then answer five questions.',
      teeth: ['incisor', 'canine', 'premolar', 'molar'],
      quiz: [
        { q: 'Which teeth are at the front and cut food?',
          options: ['Incisors', 'Canines', 'Premolars', 'Molars'],
          why: 'Incisors are the eight chisel-shaped front teeth. They bite and cut food.' },
        { q: 'Which teeth are pointed and used for tearing food?',
          options: ['Canines', 'Incisors', 'Premolars', 'Molars'],
          why: 'Canines are four pointed teeth, one at each corner. They tear food.' },
        { q: 'How many teeth does a healthy adult have?',
          options: ['32', '28', '20', '24'],
          why: 'A full adult set is 32: 8 incisors, 4 canines, 8 premolars and 12 molars.' },
        { q: 'Which teeth grind food at the back of the mouth?',
          options: ['Molars', 'Incisors', 'Canines', 'Premolars'],
          why: 'Molars are twelve large flat teeth at the back. They grind tough food.' },
        { q: 'How can you stop acid in fizzy drinks from damaging teeth?',
          options: ['Rinse with water after drinking', 'Drink more fizzy drinks', 'Brush straight away', 'Eat more sugar'],
          why: 'Rinsing removes the acid before it can attack enamel.' },
      ],
    },
  ];

  // ── Coach facts ────────────────────────────────────────────────────────────────
  const FACTS = [
    'Carbohydrates give energy. Rice, bread and potato are all carbohydrates.',
    'Protein builds your muscles. Eggs, beans and fish are good sources.',
    'Fats keep you warm and store energy. Too much fat is stored in the body.',
    'Vitamins protect you from illness. Fruit and vegetables are full of vitamins.',
    'Water makes up about 60% of your body. You need it every day.',
    'A balanced diet has all five food groups - not the same amount of each.',
    'Adults have 32 teeth: 8 incisors, 4 canines, 8 premolars and 12 molars.',
    'Incisors are at the front. They are chisel-shaped and cut food.',
    'Canines are pointed. They sit at the corners and tear food.',
    'Molars are the large back teeth. They grind food into small pieces.',
    'Lack of vitamin C causes scurvy. Lack of vitamin D causes rickets.',
    'Bacteria on your teeth turn sugar into acid. That acid makes holes in teeth.',
    'Brush your teeth twice a day. This removes plaque and keeps teeth healthy.',
    'Iodine turns blue-black when starch is present. Bread and rice have starch.',
  ];

  // ── Words the lab assistant speaks when a tooth is tapped ─────────────────────
  const SAY = {
    incisor:  'Incisors are at the front. They bite and cut food.',
    canine:   'Canines are at the corners. They tear food.',
    premolar: 'Premolars have ridges. They crush and grind food.',
    molar:    'Molars are at the back. They grind tough food.',
    balanced: 'Well done! Your meal has all five food groups. That is balanced.',
    missing:  'One or more food groups are missing. Try to fill every section.',
  };

  // ── Pure helpers ───────────────────────────────────────────────────────────────
  function blankMeal() {
    const plate = {};
    GROUP_IDS.forEach(g => { plate[g] = null; });
    return { plate, activeTest: null, testedFoods: [] };
  }

  function foodGroup(foodId) {
    return (FOODS[foodId] || {}).group || null;
  }

  function isBalanced(plate) {
    return GROUP_IDS.every(g => plate[g] !== null);
  }

  function missingGroups(plate) {
    return GROUP_IDS.filter(g => plate[g] === null);
  }

  function testResult(testId, foodId) {
    const f = FOODS[foodId];
    const t = FOOD_TESTS[testId];
    if (!f || !t) return null;
    const pos = f.testPos.includes(testId);
    return { positive: pos, word: pos ? t.after : t.before, color: pos ? '#7B3FA8' : '#B8651B' };
  }

  // ── Experiments (lab_experiment.js, LAB_SPEC.md §10) ─────────────────────────
  // Re-cut from GUIDES (steps), MISSIONS[].quiz (check) and DISCOVERIES (see).
  // Every token is one the bench performs; scripts/test-labs-nutrition-data.js
  // replays setup + the right answer of each step and checks the See is true.
  // ⚠ The PSAC paper sorts food into "energy / growth / health" (2019 Q6, 2023);
  //   the five-group plate is the syllabus. Experiment 1 bridges the two.
  const EXPERIMENTS = [
    { id: 'energy_food', grades: G6, chapter: 'g6-animals', icon: '🍞',
      title: 'Which food gives us energy?',
      aim: 'The PSAC paper sorts food into energy, growth and health. Put one food of each kind on the plate.',
      setup: ['station:meal'],
      predict: { q: 'Which food gives you energy to run and play?', answer: 'bread',
        options: [{ id: 'bread', icon: '🍞', label: 'Bread' }, { id: 'egg', icon: '🥚', label: 'Egg' }, { id: 'orange', icon: '🍊', label: 'Orange' }, { id: 'water', icon: '💧', label: 'Water' }] },
      steps: [
        { ask: 'First, a food for ENERGY. Which one goes on the plate?', on: 'food:bread', options: ['food:bread', 'food:egg', 'food:orange', 'food:water_g'],
          wrong: { 'food:egg': 'Egg is a protein. Proteins build and repair the body. They are not the main energy food.',
                   'food:orange': 'Orange gives vitamins to keep you healthy. It is not an energy food.',
                   'food:water_g': 'Water carries nutrients around the body. It gives no energy at all.' } },
        { ask: 'Now a food for GROWTH, to build muscles. Which one?', on: 'food:egg', options: ['food:egg', 'food:potato', 'food:orange'],
          wrong: { 'food:potato': 'Potato is a carbohydrate, like bread. It gives energy. It does not build the body.',
                   'food:orange': 'Orange is full of vitamins. Vitamins protect you. They do not build muscles.' } },
        { ask: 'Last, a food for HEALTH, to protect you from illness. Which one?', on: 'food:orange', options: ['food:orange', 'food:rice', 'food:oil'],
          wrong: { 'food:rice': 'Rice is a carbohydrate. It gives energy, not vitamins.',
                   'food:oil': 'Oil is a fat. Fats store energy and keep you warm. They do not protect you from illness.' } },
      ],
      see: { saw: 'Bread went into Carbs, egg into Protein and orange into Vitamins. Three sections filled.',
             learn: 'Carbohydrates like bread give energy. Proteins like egg help you grow. Fruit and vegetables keep you healthy.' },
      check: ['meal_challenge:0', 'meal_challenge:1', 'meal_challenge:2'],
      exam: 'PSAC 2019 sorts food three ways. Bread gives energy, fish helps you grow, carrots keep you healthy.' },
    { id: 'balanced_meal', grades: G6, chapter: 'g6-animals', icon: '🍽️',
      title: 'Can you build a balanced meal?',
      aim: 'Bread is already on the plate. Fill the other four sections, then check the meal.',
      setup: ['station:meal', 'food:bread'],
      predict: { q: 'How many food groups does a balanced meal need?', answer: 'five',
        options: [{ id: 'five', label: 'All five groups' }, { id: 'three', label: 'Three groups' }, { id: 'two', label: 'Just carbs and protein' }] },
      steps: [
        { ask: 'Protein builds and repairs the body. Which food?', any: ['food:egg', 'food:fish', 'food:meat'], options: ['food:egg', 'food:fish', 'food:meat', 'food:butter'],
          wrong: { 'food:butter': 'Butter is a fat. It stores energy. It does not build the body. Pick a protein.' } },
        { ask: 'Fats store energy and keep you warm. Which food?', any: ['food:butter', 'food:oil', 'food:cheese'], options: ['food:butter', 'food:oil', 'food:cheese', 'food:rice'],
          wrong: { 'food:rice': 'Rice is a carbohydrate. Bread already fills that section. Pick a fat.' } },
        { ask: 'Vitamins and minerals keep you healthy. Which food?', any: ['food:orange', 'food:mango', 'food:spinach'], options: ['food:orange', 'food:mango', 'food:spinach', 'food:water_g'],
          wrong: { 'food:water_g': 'Water carries nutrients around. It has no vitamins of its own. Pick a fruit or vegetable.' } },
        { ask: 'Every meal needs water. Which one goes in the water section?', any: ['food:water_g', 'food:soup'], options: ['food:water_g', 'food:soup', 'food:potato'],
          wrong: { 'food:potato': 'Potato is a carbohydrate. Bread already fills that section. Pick a drink.' } },
        { on: 'check', say: 'Tap ✅ Check my meal. Is every section full?' },
      ],
      see: { saw: 'All five sections were filled. The plate showed a tick: the meal was balanced.',
             learn: 'A balanced meal has food from all five groups. Every group does a different job in the body.' },
      check: ['meal_challenge:3', 'meal_challenge:4'],
      exam: 'PSAC 2022 asks which meal is balanced. Bread, fish and lettuce: energy, growth and health together.' },
    { id: 'starch_iodine', grades: G6, chapter: 'g6-animals', icon: '🔵',
      title: 'Which foods have starch?',
      aim: 'Iodine solution is orange-brown. On starch it turns blue-black. Test bread, orange, rice and butter.',
      setup: ['station:meal', 'test:iodine'],
      predict: { q: 'Which foods will turn the iodine blue-black?', answer: 'carbs',
        options: [{ id: 'carbs', label: 'Bread and rice' }, { id: 'others', label: 'Orange and butter' }, { id: 'all', label: 'All four foods' }, { id: 'none', label: 'None of them' }] },
      steps: [
        { on: 'food:bread', say: 'Tap 🍞 Bread. Iodine drops on it. Watch the colour.' },
        { on: 'food:orange', say: 'Now tap 🍊 Orange. Does the colour change?' },
        { ask: 'Rice or butter: which one goes blue-black like bread? Tap it.', on: 'food:rice', options: ['food:rice', 'food:butter'],
          wrong: { 'food:butter': 'Butter is a fat. Iodine stays orange-brown on it. No starch. Try the other one.' } },
        { on: 'food:butter', say: 'Tap 🧈 Butter to test it too.' },
        { on: 'read', say: 'Tap 🔎 Read to see all four results.' },
      ],
      see: { saw: 'Bread and rice turned the iodine blue-black. Orange and butter left it orange-brown.',
             learn: 'Iodine turns blue-black when starch is present. Bread and rice are starchy carbohydrates.' },
      check: [
        { q: 'Iodine solution is dropped on a food and turns blue-black. What is in the food?',
          options: ['Starch', 'Protein', 'Fat', 'Vitamin C'],
          why: 'Iodine is the test for starch. Orange-brown to blue-black means starch is present.' },
        { q: 'Which food group do the starchy foods bread and rice belong to?',
          options: ['Carbohydrates', 'Proteins', 'Fats and oils', 'Vitamins and minerals'],
          why: 'Starch is a carbohydrate. Bread, rice, potato and pasta are all carbohydrates.' },
        { q: 'Iodine stayed orange-brown on the butter. What does that show?',
          options: ['Butter has no starch', 'Butter has starch', 'The iodine was old', 'Butter is a carbohydrate'],
          why: 'No colour change means no starch. Butter is a fat, not a carbohydrate.' },
      ],
      exam: 'In the exam you may be asked which test shows starch. Iodine solution turns from orange-brown to blue-black.' },
    { id: 'teeth_jobs', grades: G6, chapter: 'g6-animals', icon: '🦷',
      title: 'Which tooth cuts, which tooth grinds?',
      aim: 'Look at the half jaw in the picture. Four kinds of teeth, four different jobs. Find the right tooth for each job.',
      setup: ['station:teeth'],
      predict: { q: 'Which tooth grinds food at the back of the mouth?', answer: 'molar',
        options: [{ id: 'molar', label: 'Molar' }, { id: 'incisor', label: 'Incisor' }, { id: 'canine', label: 'Canine' }] },
      steps: [
        { ask: 'You bite into an apple. Which tooth cuts the piece off?', on: 'tooth:incisor', options: ['tooth:incisor', 'tooth:canine', 'tooth:molar'],
          wrong: { 'tooth:canine': 'Canines are pointed. They tear food. They do not cut a clean slice.',
                   'tooth:molar': 'Molars are at the back of the mouth. They grind. They cannot reach to bite.' } },
        { ask: 'Now you chew the apple into mush. Which tooth grinds it?', on: 'tooth:molar', options: ['tooth:molar', 'tooth:incisor', 'tooth:canine'],
          wrong: { 'tooth:incisor': 'Incisors are thin and flat at the front. They cut. They do not grind.',
                   'tooth:canine': 'Canines are pointed, not flat. They tear meat. They cannot grind.' } },
        { ask: 'Which pointed tooth tears a piece of meat?', on: 'tooth:canine', options: ['tooth:canine', 'tooth:premolar'],
          wrong: { 'tooth:premolar': 'Premolars have flat tops with ridges. They crush and grind. They do not tear.' } },
        { on: 'tooth:premolar', say: 'Tap 🦷 Premolar, between the canine and the molar.' },
        { on: 'label', say: 'Tap 🏷️ Label teeth to name all four.' },
      ],
      see: { saw: 'All four teeth lit up and were labelled: incisor, canine, premolar and molar.',
             learn: 'Incisors cut, canines tear, premolars crush and molars grind. An adult has 32 teeth.' },
      check: ['know_teeth:0', 'know_teeth:1', 'know_teeth:3'],
      exam: 'PSAC 2022: the flat cutting teeth at the front are incisors. PSAC 2021: name a molar, a canine and an incisor from a diagram.' },
  ];

  return {
    GRADES, forGrade,
    FOOD_GROUPS, GROUP_IDS,
    FOODS, FOOD_IDS, SHELF_FOODS,
    FOOD_TESTS, TEST_IDS, IODINE_FOODS,
    TEETH, TOOTH_IDS, TOTAL_TEETH, JAW_SLOTS,
    SETS, ACTS,
    GUIDES, DISCOVERIES, HAZARDS, RESULTS, MISSIONS, FACTS, SAY, EXPERIMENTS,
    blankMeal, foodGroup, isBalanced, missingGroups, testResult,
  };
})();
if (typeof window !== 'undefined') window.LabNutritionData = LabNutritionData;
