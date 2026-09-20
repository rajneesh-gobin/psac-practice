'use strict';
// ══════════════════════════════════════════════
//  Science Labs — the science behind Physical & Chemical Changes
//  (Science, Grades 7 and 8 — LAB_SPEC §8 and §9)
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every scenario name,
//    classification, sign, word equation, symbol equation, discovery,
//    guide step, quiz question and mistake card comes from this file.
//    lab_changes.js only animates and draws. If a classification looks
//    wrong on screen, fix it HERE.
//  ⚠ Grounded in:
//    Grade 7 — subjects/grade7-science/_manifest.js chapter g7s-changes:
//      "Distinguish between physical and chemical changes. Recognise that
//       a chemical change forms new substances. Explain why changes of
//       state are physical changes. Explain why burning, rusting,
//       respiration and photosynthesis are chemical changes."
//    Grade 8 — subjects/grade8-science/_manifest.js chapters g8s-chem-language
//      and g8s-acids: write and balance word/symbol equations, identify
//      signs of chemical change, conservation of mass, exothermic vs
//       endothermic.
//  ⚠ TWO GRADES (LAB_SPEC §9): Labs.grade() is 7 or 8. Every guide,
//    mission and discovery carries `grades`. Grade 7 ids start with
//    no prefix; Grade 8 extras start `g8_` so progress never collides.
// ══════════════════════════════════════════════
const LabChangesData = (() => {

  const GRADES = [7, 8];
  const forGrade = (list, g) => list.filter(x => (x.grades || [7, 8]).includes(Number(g)));

  // ── Scenarios: what the bench can show ────────────────────────────
  // type: 'physical' | 'chemical'
  // newSubstance: true = new substance formed (always true for chemical)
  // reversible: true = the original can be recovered (guide, not law)
  // signs: Grade 8 observable signs (colour_change, gas, heat, light,
  //         precipitate, temperature_drop) — empty for physical changes
  // wordEq: word equation for chemical changes
  // sym: symbol equation (Grade 8, balanced — tested by test-labs-changes-data.js)
  // disc: discovery id to unlock when correctly classified
  // short: the one line the bench shows after a right answer in an experiment
  const SCENARIOS = [
    { id: 'melting', name: 'Ice melts into water', icon: '🧊', type: 'physical',
      newSubstance: false, reversible: true, signs: [], grades: [7, 8],
      explanation: 'Ice and water are the same substance — H₂O — just in different states. Freezing the water turns it back into ice. No new substance was made.',
      short: 'Still water. Freeze it and the ice is back.',
      disc: 'disc_melting' },
    { id: 'dissolving', name: 'Salt dissolves in water', icon: '🧂', type: 'physical',
      newSubstance: false, reversible: true, signs: [], grades: [7, 8],
      explanation: 'The salt is still there: evaporate the water and it comes back. Dissolving does not make a new substance.',
      short: 'The salt is still there. Dry the water and it is back.',
      disc: 'disc_dissolving' },
    { id: 'cutting', name: 'Paper is cut', icon: '✂️', type: 'physical',
      newSubstance: false, reversible: false, signs: [], grades: [7, 8],
      explanation: 'Cutting changes shape but not substance. The pieces are still paper — no new substance formed. Physical, even though it is hard to reverse.',
      note: 'Reversibility is a guide, not the test. Cutting is physical because no new substance forms.',
      short: 'Still paper, just in pieces. Nothing new was made.',
      disc: 'disc_two_questions' },
    { id: 'boiling', name: 'Water boils to steam', icon: '♨️', type: 'physical',
      newSubstance: false, reversible: true, signs: [], grades: [7, 8],
      explanation: 'Steam is water in the gas state. Cooling it condenses it back to liquid water. Same substance, different state.',
      short: 'Steam is still water, as a gas. Cool it and it is water again.',
      disc: null },
    { id: 'burning', name: 'Candle burns', icon: '🕯️', type: 'chemical',
      newSubstance: true, reversible: false, signs: ['heat', 'light', 'gas'], grades: [7, 8],
      explanation: 'Burning makes new substances: carbon dioxide and water vapour. The wax is gone for ever — you cannot un-burn it.',
      wordEq: 'wax + oxygen → carbon dioxide + water',
      short: 'The wax became carbon dioxide and water. New substances.',
      disc: 'disc_burning' },
    { id: 'rusting', name: 'Iron nail rusts', icon: '🔩', type: 'chemical',
      newSubstance: true, reversible: false, signs: ['colour_change'], grades: [7, 8],
      explanation: 'Rust is iron oxide — a different substance from iron. The brown colour shows a new substance formed. Rusting is slow but chemical.',
      wordEq: 'iron + oxygen + water → iron oxide (rust)',
      short: 'Rust is iron oxide, not iron. A new brown substance.',
      disc: 'disc_rusting' },
    { id: 'cooking', name: 'Egg white is cooked', icon: '🍳', type: 'chemical',
      newSubstance: true, reversible: false, signs: ['heat', 'colour_change'], grades: [7, 8],
      explanation: 'Cooking denatures the protein: heat breaks and forms new chemical bonds. A cooked egg cannot be made raw again.',
      short: 'Heat changed the egg for good. It can never be raw again.',
      disc: 'disc_cooking' },
    { id: 'fizzing', name: 'Vinegar + baking soda', icon: '🫧', type: 'chemical',
      newSubstance: true, reversible: false, signs: ['gas', 'temperature_drop'], grades: [7, 8],
      explanation: 'Vinegar (an acid) reacts with baking soda (a carbonate) to make carbon dioxide gas, water and a salt. The fizzing shows CO₂ — a new substance.',
      wordEq: 'acetic acid + sodium hydrogencarbonate → sodium acetate + water + carbon dioxide',
      short: 'The bubbles are carbon dioxide, a brand new gas.',
      disc: 'disc_fizzing' },
    { id: 'combustion', name: 'Magnesium ribbon burns', icon: '✨', type: 'chemical',
      newSubstance: true, reversible: false, signs: ['heat', 'light', 'colour_change'], grades: [8],
      explanation: 'Magnesium burns with a brilliant white flame, making white magnesium oxide powder. The silver ribbon is gone; a new white solid has formed. Mass is conserved: the oxide weighs more than the ribbon because it also contains oxygen.',
      wordEq: 'magnesium + oxygen → magnesium oxide',
      sym: '2Mg + O₂ → 2MgO',
      short: 'The ribbon is gone. White magnesium oxide is left.',
      disc: 'g8_disc_combustion' },
    { id: 'precipitate', name: 'Copper hydroxide forms', icon: '🔵', type: 'chemical',
      newSubstance: true, reversible: false, signs: ['colour_change', 'precipitate'], grades: [8],
      explanation: 'Mixing blue copper sulfate with sodium hydroxide makes copper hydroxide — a blue-green solid that settles to the bottom — and sodium sulfate. The precipitate is a new substance.',
      wordEq: 'copper sulfate + sodium hydroxide → copper hydroxide + sodium sulfate',
      sym: 'CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄',
      short: 'A solid that was not there before: copper hydroxide.',
      disc: 'g8_disc_precipitate' },
  ];

  // ── Observable signs of chemical change (Grade 8 layer) ───────────
  const SIGNS = {
    colour_change:    { name: 'Colour changed',      icon: '🎨', desc: 'A new colour appeared, showing a new substance formed.' },
    gas:              { name: 'Gas produced',         icon: '💨', desc: 'Bubbles or smoke appeared, showing a new gas substance was made.' },
    heat:             { name: 'Heat given out',       icon: '🔥', desc: 'The reaction released heat (exothermic). Temperature rose.' },
    light:            { name: 'Light given out',      icon: '✨', desc: 'Light was emitted during the reaction.' },
    precipitate:      { name: 'Precipitate formed',   icon: '🟡', desc: 'A solid appeared in a liquid — a new insoluble substance.' },
    temperature_drop: { name: 'Temperature dropped',  icon: '❄️', desc: 'The reaction absorbed heat from the surroundings (endothermic). Temperature fell.' },
  };

  // ── Discoveries ────────────────────────────────────────────────────
  // `how` recipe — bench guide vocabulary:
  //   'watch:<scenario_id>'  — select and watch a scenario
  //   'classify'             — correctly classify the current scenario
  //   'sign:<sign_id>'       — identify a sign (Grade 8)
  // A question\'s FIRST option is the answer (bench shuffles them).
  const DISCOVERIES = [
    // ── Grade 7: definition and classification ──
    { id: 'disc_physical', icon: '🔄', title: 'What makes a change physical', grades: [7, 8],
      hint: 'No new substance — usually reversible',
      how: ['watch:melting', 'classify'],
      saw: 'The ice melted into water: same substance, just a different state. Freezing turns it back.',
      learn: 'A physical change does not make a new substance. Only shape, size or state changes. Physical changes are often (but not always) reversible.' },
    { id: 'disc_chemical', icon: '⚗️', title: 'What makes a change chemical', grades: [7, 8],
      hint: 'A new substance is always made',
      how: ['watch:burning', 'classify'],
      saw: 'The candle burned: wax and oxygen turned into carbon dioxide and water. New substances, cannot be undone.',
      learn: 'A chemical change always makes at least one new substance. Chemical changes are usually irreversible. The key question: "Was a new substance formed?"' },
    { id: 'disc_melting', icon: '🧊', title: 'Melting is a physical change', grades: [7, 8],
      hint: 'Ice → water: same or different substance?',
      how: ['watch:melting', 'classify'],
      saw: 'Ice melted into water. Same substance (H₂O), just in liquid state instead of solid.',
      learn: 'Melting is a change of state: ice, water and steam are all H₂O. Freezing reverses it. No new substance: physical.' },
    { id: 'disc_dissolving', icon: '🧂', title: 'Dissolving is a physical change', grades: [7, 8],
      hint: 'Salt disappears in water — but can you get it back?',
      how: ['watch:dissolving', 'classify'],
      saw: 'Salt grains disappeared into the water, but the water tasted salty. Evaporate it: the salt comes back.',
      learn: 'Dissolving is a physical change. The salt and the water are both still there, just mixed. Evaporation separates them again.' },
    { id: 'disc_burning', icon: '🕯️', title: 'Burning is a chemical change', grades: [7, 8],
      hint: 'A candle burns — can you turn the smoke back into wax?',
      how: ['watch:burning', 'classify'],
      saw: 'The candle flame made heat, light, carbon dioxide and water vapour. The wax is gone for ever.',
      learn: 'Burning (combustion) is a chemical change: fuel + oxygen → carbon dioxide + water. New substances form and it cannot be undone.' },
    { id: 'disc_rusting', icon: '🔩', title: 'Rusting is a chemical change', grades: [7, 8],
      hint: 'A brown coat on iron — is rust the same as iron?',
      how: ['watch:rusting', 'classify'],
      saw: 'The iron nail slowly turned orange-brown. Rust (iron oxide) is a new substance with different properties from iron.',
      learn: 'Rusting is a slow chemical change: iron + oxygen + water → iron oxide. The orange-brown product is a new substance.' },
    { id: 'disc_cooking', icon: '🍳', title: 'Cooking is a chemical change', grades: [7, 8],
      hint: 'Cooked egg white — can you make it raw again?',
      how: ['watch:cooking', 'classify'],
      saw: 'The clear egg white turned white and solid as it cooked. The protein changed shape permanently.',
      learn: 'Cooking denatures proteins: heat breaks and reforms chemical bonds, making new structures. A cooked egg cannot be made raw: chemical change.' },
    { id: 'disc_two_questions', icon: '❓', title: 'The two test questions', grades: [7, 8],
      hint: 'Cutting is not reversible — is it physical or chemical?',
      how: ['watch:cutting', 'classify', 'watch:fizzing', 'classify'],
      saw: 'Cutting paper: still paper (physical). Vinegar + baking soda: CO₂ gas forms (chemical).',
      learn: 'Ask: 1. Is a new substance formed? 2. Is it reversible? If yes to (1): chemical. If no: physical. Reversibility is a clue, not the rule — cutting is physical even though you cannot un-cut the paper.' },
    { id: 'disc_fizzing', icon: '🫧', title: 'Fizzing shows a new substance', grades: [7, 8],
      hint: 'Vinegar meets baking soda — and fizzes',
      how: ['watch:fizzing', 'classify'],
      saw: 'Mixing vinegar and baking soda made lots of carbon dioxide bubbles.',
      learn: 'Gas bubbles mean a new substance (a gas) was made. That is a sign of chemical change. Acid + carbonate → salt + water + carbon dioxide.' },
    // ── Grade 8: signs and deeper understanding ──
    { id: 'g8_disc_signs', icon: '🔍', title: 'Signs of chemical change', grades: [8],
      hint: 'Four things you can see that tell you a chemical change happened',
      how: ['watch:rusting', 'classify', 'sign:colour_change', 'watch:fizzing', 'classify', 'sign:gas'],
      saw: 'Rusting: colour change (orange-brown iron oxide). Fizzing: gas produced (CO₂ bubbles).',
      learn: 'Observable signs of chemical change: colour change, gas produced, precipitate formed, temperature change. At least one is always present.' },
    { id: 'g8_disc_conservation', icon: '⚖️', title: 'Conservation of mass', grades: [8],
      hint: 'Mass cannot appear or disappear in a reaction',
      how: ['watch:combustion', 'classify'],
      saw: 'Magnesium burned and left a white powder. The powder weighed more than the ribbon — because it also contained the oxygen from the air.',
      learn: 'Law of conservation of mass: total mass of products = total mass of reactants. Atoms are rearranged, not created or destroyed.' },
    { id: 'g8_disc_exothermic', icon: '🔥', title: 'Exothermic reactions give out heat', grades: [8],
      hint: 'Burning, combustion — temperature rises',
      how: ['watch:burning', 'classify', 'sign:heat'],
      saw: 'The candle flame raised the temperature of the air around it. The reaction released energy as heat and light.',
      learn: 'An exothermic reaction releases energy as heat (and sometimes light). Temperature rises. Burning and neutralisation are exothermic.' },
    { id: 'g8_disc_endothermic', icon: '❄️', title: 'Endothermic reactions absorb heat', grades: [8],
      hint: 'Some reactions cool things down',
      how: ['watch:fizzing', 'classify', 'sign:temperature_drop'],
      saw: 'The vinegar-and-baking-soda mixture felt slightly cool: the reaction absorbed heat from the surroundings.',
      learn: 'An endothermic reaction absorbs heat from the surroundings. Temperature falls. Photosynthesis is also endothermic.' },
    { id: 'g8_disc_combustion', icon: '✨', title: 'Magnesium combustion', grades: [8],
      hint: 'A bright flash, then white powder — and mass is conserved',
      how: ['watch:combustion', 'classify'],
      saw: 'The silver ribbon flared white-hot, then left white magnesium oxide powder. 2Mg + O₂ → 2MgO.',
      learn: 'Magnesium burns in oxygen to make magnesium oxide. The white powder weighs more than the ribbon because it contains oxygen atoms. ⚠ Never look directly at burning magnesium.' },
    { id: 'g8_disc_precipitate', icon: '🔵', title: 'A precipitate is a new substance', grades: [8],
      hint: 'Two clear liquids mixed — and a solid appears',
      how: ['watch:precipitate', 'classify', 'sign:precipitate'],
      saw: 'Blue copper sulfate and colourless sodium hydroxide made a blue-green solid: copper hydroxide settled to the bottom.',
      learn: 'A precipitate is an insoluble solid that forms when two solutions react. It shows a new substance was made: sign of chemical change.' },
  ];

  // ── Guided experiments ─────────────────────────────────────────────
  // One action per step. `on` tokens:
  //   'watch:<id>'   — fires when a scenario starts
  //   'classify'     — fires when correctly classified
  //   'sign:<id>'    — fires when a sign is identified (Grade 8)
  // A step with `btn` gets a button under the stage.
  const GUIDES = [
    { id: 'sort', icon: '🔍', title: 'Sort the changes', grades: [7, 8],
      blurb: 'Watch 4 scenarios and classify each as physical or chemical.',
      lesson: 'Physical changes do not make new substances (melting, dissolving, cutting). Chemical changes always make new substances (burning, rusting, cooking). The key question: "Was a new substance formed?"',
      steps: [
        { on: 'watch:melting',    say: 'Tap the 🧊 ice card to start!' },
        { on: 'classify',         say: 'Now drag the card — is ice still H₂O after melting?' },
        { on: 'watch:burning',    say: 'Tap the 🕯️ candle card next.' },
        { on: 'classify',         say: 'Burning makes CO₂ and water — new substances. Drag your answer!' },
        { on: 'watch:rusting',    say: 'Tap the 🔩 iron nail.' },
        { on: 'classify',         say: 'Is rust the same as iron? Drag it to your answer!' },
        { on: 'watch:dissolving', say: 'Tap the 🧂 salt card.' },
        { on: 'classify',         say: 'Could you get the salt back? Drag to your answer!' },
      ] },
    { id: 'signs_guide', icon: '🔎', title: 'Signs of a chemical change', grades: [8],
      blurb: 'Watch 4 reactions. For each one, identify which sign of chemical change you observe.',
      lesson: 'Chemical changes show at least one sign: colour change, gas produced, precipitate formed, or temperature change.',
      steps: [
        { on: 'watch:rusting',      say: 'Tap 🔩 iron nail — watch what happens.' },
        { on: 'sign:colour_change', say: 'The nail turned brown! Tap the sign that matches.' },
        { on: 'watch:fizzing',      say: 'Tap 🫧 vinegar + baking soda next.' },
        { on: 'sign:gas',           say: 'See the bubbles? Tap the matching sign!' },
        { on: 'watch:burning',      say: 'Tap 🕯️ candle — does it give off heat?' },
        { on: 'sign:heat',          say: 'Feel the heat! Tap the sign that matches.' },
        { on: 'watch:precipitate',  say: 'Tap 🔵 copper hydroxide to watch it form.' },
        { on: 'sign:precipitate',   say: 'A solid appeared in the liquid! Tap that sign.' },
      ] },
    { id: 'reverse', icon: '↩️', title: 'Can you reverse it?', grades: [7, 8],
      blurb: 'Try to reverse each change. Physical changes usually can be reversed — chemical usually cannot.',
      lesson: 'Physical changes are usually reversible: melt back, dissolve back. Chemical changes make new substances, so the original usually cannot be recovered. But reversibility is a guide, not the test.',
      steps: [
        { on: 'watch:melting',    say: 'Tap 🧊 ice — can it turn back to ice again?' },
        { on: 'classify',         say: 'Freeze it and you get ice back! Drag your answer.' },
        { on: 'watch:dissolving', say: 'Tap 🧂 salt — does it disappear forever?' },
        { on: 'classify',         say: 'Evaporate the water and salt returns. Drag your answer!' },
        { on: 'watch:burning',    say: 'Tap 🕯️ candle — can you un-burn it?' },
        { on: 'classify',         say: 'Ash can\'t turn back to wax — gone for good! Drag your answer.' },
        { on: 'watch:cutting',    say: 'Tap ✂️ paper — is cutting reversible?' },
        { on: 'classify',         say: 'Hard to tape back — but paper is still paper. Drag it!' },
      ] },
  ];

  // ── Missions ─────────────────────────────────────────────────────
  // A question\'s FIRST option is the answer; the bench shuffles them.
  const MISSIONS = [
    { id: 'classify_m', icon: '🔬', title: 'Physical or Chemical?', grades: [7, 8],
      blurb: 'Classify 5 changes. Use the two key questions.',
      intro: 'Physical or Chemical? For each scenario ask: "Is a new substance formed?" and "Is it reversible?" Then choose.',
      quiz: [
        { q: 'Butter melts in a hot pan. Which type of change is this?',
          options: ['Physical — butter is still butter, just liquid', 'Chemical — a new substance forms', 'Chemical — it is irreversible when it solidifies', 'Physical — nothing changed colour'],
          why: 'Melting is a change of state. Butter is still butter. Cool it and it solidifies again: physical change.' },
        { q: 'Wood burns in a fireplace, leaving ash and smoke. Which type of change is this?',
          options: ['Chemical — new substances (ash, CO₂) form', 'Physical — you can collect the ash and remake the wood', 'Physical — the wood just changes shape', 'Chemical — because it changes colour'],
          why: 'Burning wood makes ash, carbon dioxide and water — new substances. Irreversible: chemical change.' },
        { q: 'Which change is PHYSICAL?',
          options: ['Ice melting', 'Iron rusting', 'Cooking an egg', 'Paper burning'],
          why: 'Ice melting is a change of state — same substance, no new substance formed. The others all produce new substances.' },
        { q: 'Salt is dissolved in water. What can you do to get the salt back?',
          options: ['Evaporate the water', 'Filter the solution', 'Cool it down quickly', 'You cannot get it back — it is gone'],
          why: 'Evaporating the water leaves the salt behind. Dissolving is reversible, so it is a physical change.' },
        { q: 'A student says "Cutting paper is chemical because you cannot reverse it." What is wrong?',
          options: ['No new substance is formed, so it must be physical', 'The paper changes colour when cut', 'Chemical changes are always reversible', 'Cutting always makes a new substance'],
          why: 'The key test is "new substance formed?" — not reversibility. Cutting does not make a new substance, so it is physical.' },
      ] },
    { id: 'signs_m', icon: '🔎', title: 'Spot the Signs', grades: [8],
      blurb: 'Identify signs of chemical change in 5 scenarios.',
      intro: 'Spot the Signs! For each reaction, decide which sign of chemical change you would observe.',
      quiz: [
        { q: 'Iron left in damp air turns orange-brown. Which sign of chemical change is this?',
          options: ['Colour change', 'Gas produced', 'Precipitate formed', 'Temperature drop'],
          why: 'The orange-brown rust (iron oxide) is a colour change. A new substance with a new colour has formed.' },
        { q: 'Baking soda is added to vinegar. Which sign do you see?',
          options: ['Gas produced (CO₂ bubbles)', 'Colour change', 'Precipitate formed', 'Temperature rise'],
          why: 'Carbon dioxide gas (fizzing) is produced — a sign that a new substance formed: chemical change.' },
        { q: 'Magnesium burns with a brilliant white flame. Which sign best shows a chemical change?',
          options: ['A new white solid (magnesium oxide) forms', 'The ribbon gets shorter', 'The flame is bright', 'The ribbon bends in the heat'],
          why: 'The white solid (magnesium oxide) is a new substance — the clearest sign. Heat and light also show it, but the new product is definitive.' },
        { q: 'Two colourless solutions are mixed and a solid immediately appears. What is this solid called?',
          options: ['A precipitate', 'A catalyst', 'A solvent', 'An indicator'],
          why: 'A precipitate is an insoluble solid that forms when two solutions react. It shows a new substance was made.' },
        { q: 'A reaction makes the test tube feel cold. What does this tell you?',
          options: ['The reaction is endothermic — it absorbed heat from the surroundings', 'The reaction is exothermic — it released heat', 'No chemical change occurred', 'The reaction produced a gas'],
          why: 'An endothermic reaction absorbs heat from its surroundings, so the container feels cold. Temperature drop is a sign of chemical change.' },
      ] },
  ];

  // ── Mistake result cards (wrong-but-safe reasoning) ───────────────
  const RESULTS = {
    dissolving_chemical: {
      icon: '🧂', title: 'Dissolving is not a chemical change',
      happened: () => 'You classified dissolving as a chemical change — but salt dissolves in water without making any new substance.',
      instead: 'Ask "Can you get the original substance back?" For dissolving, yes: evaporate the water. The salt reappears. No new substance was made: physical change.',
      exam: 'Dissolving is a physical change: no new substance is formed and it is reversible.',
    },
    burning_reversible: {
      icon: '🕯️', title: 'Burning is not reversible',
      happened: () => 'You chose "reversible" for burning. Ash and CO₂ cannot be turned back into a candle.',
      instead: 'Burning makes new substances (CO₂ and water). New substances cannot become the original reactants again just by cooling.',
      exam: 'Burning (combustion) is a chemical change and it is irreversible.',
    },
    heat_means_reversibility: {
      icon: '🌡️', title: 'Temperature change shows type, not reversibility',
      happened: () => 'You used the temperature change to decide whether a change is reversible. But temperature change is a sign of a CHEMICAL change — it says nothing about whether it is reversible.',
      instead: 'Temperature change (exothermic or endothermic) tells you the TYPE: chemical. To decide reversibility, ask "Can you recover the original substance?"',
      exam: 'Signs of chemical change (colour, gas, precipitate, temperature change) identify the type — not whether it is reversible.',
    },
  };

  // ── Short facts for the 💡 button ─────────────────────────────────
  const FACTS = [
    'The key test for a physical change: no new substance forms. The material stays the same.',
    'The key test for a chemical change: at least one new substance always forms.',
    'Melting, dissolving, cutting and boiling are physical changes — same substance, different form.',
    'Burning, rusting, cooking and fermentation are chemical changes — new substances form.',
    'Reversibility is a guide, not the rule. Cutting paper is physical even though you cannot un-cut it.',
    'Every chemical change shows at least one observable sign: colour change, gas, precipitate or temperature change.',
    'Burning is exothermic: it gives out heat and light. Wood burning in a fireplace warms the room.',
    'Rusting is slow, but it is still chemical: iron + oxygen + water → iron oxide.',
    'Conservation of mass: in any chemical change, total mass before = total mass after.',
    'Photosynthesis is a chemical change: CO₂ + water + light energy → glucose + oxygen.',
    'Cooking is a chemical change: heat breaks and makes new chemical bonds in the food molecules.',
    'An endothermic reaction absorbs heat; the container cools down. Some dissolving reactions are endothermic.',
  ];

  // ── Experiments (lab_experiment.js, LAB_SPEC.md §10) ──────────────────
  // Every step is a decision on a scenario the bench has already put on the
  // canvas. Tokens:
  //   'watch:<scenario>'          — set-up only: put the scenario on the bench
  //   'sort:<scenario>:<zone>'    — the child drops the scenario card in a zone
  //                                 (zone = physical | chemical)
  //   'spot:<scenario>:<sign>'    — Grade 8: the child taps the sign they saw
  // The right zone is SCENARIOS[id].type and the right signs are
  // SCENARIOS[id].signs — test-labs-changes-data.js replays every step
  // through them, so a See line can only claim what the bench shows.
  // Check refs: '<mission id>:<quiz index>' or an inline { q, options, why }
  // (first option is the answer; the bench shuffles).
  const EXPERIMENTS = [
    // ── Grade 7 — g7s-changes ──
    { id: 'melt_freeze', grades: [7], chapter: 'g7s-changes', icon: '🧊',
      title: 'Melting and freezing: physical or chemical?',
      aim: 'Ice melts, water boils and salt vanishes into water. Is anything NEW being made each time?',
      setup: ['watch:melting'],
      predict: { q: 'When ice melts into water, is a new substance made?', answer: 'no',
        options: [{ id: 'no', label: 'No', sub: 'it is still water' }, { id: 'yes', label: 'Yes', sub: 'water is a new substance' }, { id: 'boil', label: 'Only when it boils', sub: 'steam is new' }] },
      steps: [
        { ask: 'Ice melts into water. Physical Change or Chemical Change?', on: 'sort:melting:physical', options: ['sort:melting:physical', 'sort:melting:chemical'],
          wrong: { 'sort:melting:chemical': 'You can freeze the water back into ice. Nothing new was made, so it is a physical change.' } },
        { ask: 'Water boils to steam. Which zone?', on: 'sort:boiling:physical', options: ['sort:boiling:physical', 'sort:boiling:chemical'],
          wrong: { 'sort:boiling:chemical': 'Steam is still water, just as a gas. Cool it and it turns back into water: no new substance.' } },
        { ask: 'Salt dissolves in water. Which zone?', on: 'sort:dissolving:physical', options: ['sort:dissolving:physical', 'sort:dissolving:chemical'],
          wrong: { 'sort:dissolving:chemical': 'The salt is still there. Evaporate the water and it comes back: a physical change.' } },
      ],
      see: { saw: 'Ice melting, water boiling and salt dissolving all went in the Physical zone. Nothing new was made each time.',
             learn: 'A change of state (melting, boiling, freezing) is a physical change: the substance stays the same, only its state changes. Dissolving is physical too - evaporate the water and the salt is back.' },
      check: ['classify_m:0', 'classify_m:3', 'classify_m:2'],
      exam: 'Grade 7 asks why ice melting is a physical change: the substance keeps the same identity - ice, water and steam are all the same substance.' },
    { id: 'burn_rust', grades: [7], chapter: 'g7s-changes', icon: '🕯️',
      title: 'Burning and rusting: what is new?',
      aim: 'A candle burns, a nail rusts and water boils into steam. Two of these make something new - which two?',
      setup: ['watch:burning'],
      predict: { q: 'Which of these makes a NEW substance?', answer: 'both',
        options: [{ id: 'both', label: 'Burning and rusting' }, { id: 'burn', label: 'Only burning', sub: 'rusting is too slow' }, { id: 'rust', label: 'Only rusting', sub: 'it changes colour' }, { id: 'none', label: 'Neither', sub: 'they are still wax and iron' }] },
      steps: [
        { ask: 'The candle burns. Physical Change or Chemical Change?', on: 'sort:burning:chemical', options: ['sort:burning:chemical', 'sort:burning:physical'],
          wrong: { 'sort:burning:physical': 'The wax is gone for ever. It became carbon dioxide and water - new substances, so a chemical change.' } },
        { ask: 'The iron nail rusts. Which zone?', on: 'sort:rusting:chemical', options: ['sort:rusting:chemical', 'sort:rusting:physical'],
          wrong: { 'sort:rusting:physical': 'Rust is iron oxide, not iron. A new brown substance formed: chemical, even though it is slow.' } },
        { ask: 'Water boils and steams. Which zone?', on: 'sort:boiling:physical', options: ['sort:boiling:physical', 'sort:boiling:chemical'],
          wrong: { 'sort:boiling:chemical': 'Steam looks like smoke but it is only water as a gas. Nothing new was made: physical.' } },
      ],
      see: { saw: 'The candle and the rusty nail went in the Chemical zone: new substances were made. Boiling water went in Physical: steam is still water.',
             learn: 'Burning and rusting are chemical changes: a substance joins with oxygen and something new is made (carbon dioxide and water; iron oxide). Fast or slow, that is the test.' },
      check: ['classify_m:1',
        { q: 'Burning wood and rusting iron are both chemical changes. What do they share?',
          options: ['Both join a substance with oxygen', 'Both happen very fast', 'Both can be reversed by cooling', 'Both make the same new substance'],
          why: 'Burning is fast and rusting is slow, but in both a substance combines with oxygen to make something new.' },
        { q: 'Why is burning a chemical change?',
          options: ['New substances are formed', 'It gives out light', 'The candle gets shorter', 'It cannot be seen happening'],
          why: 'Light and a shorter candle are what you notice, but the test is the new substances: carbon dioxide and water.' }],
      exam: 'Grade 7 asks why burning is a chemical change (new substances are formed) and which two things iron needs to rust: oxygen and water.' },
    { id: 'cook_bake', grades: [7], chapter: 'g7s-changes', icon: '🍳',
      title: 'Cooking an egg: can you make it raw again?',
      aim: 'Three kitchen changes: an egg white cooks, baking soda fizzes in vinegar, salt dissolves. Which ones can never be undone?',
      setup: ['watch:cooking'],
      predict: { q: 'Can a cooked egg white be made raw again by cooling it?', answer: 'no',
        options: [{ id: 'no', label: 'No', sub: 'it is changed for good' }, { id: 'yes', label: 'Yes', sub: 'cooling undoes heating' }, { id: 'fridge', label: 'Only in a fridge' }] },
      steps: [
        { ask: 'The egg white cooks. Physical Change or Chemical Change?', on: 'sort:cooking:chemical', options: ['sort:cooking:chemical', 'sort:cooking:physical'],
          wrong: { 'sort:cooking:physical': 'Cooling a cooked egg never makes it raw again. Heat made new substances in the egg: a chemical change.' } },
        { ask: 'Baking soda fizzes in vinegar. Which zone?', on: 'sort:fizzing:chemical', options: ['sort:fizzing:chemical', 'sort:fizzing:physical'],
          wrong: { 'sort:fizzing:physical': 'The bubbles are carbon dioxide, a brand new gas. Something new was made: chemical.' } },
        { ask: 'Salt dissolves in water. Which zone?', on: 'sort:dissolving:physical', options: ['sort:dissolving:physical', 'sort:dissolving:chemical'],
          wrong: { 'sort:dissolving:chemical': 'Let the water dry and the salt is back, unchanged. No new substance: physical.' } },
      ],
      see: { saw: 'The cooked egg and the fizzing baking soda went in the Chemical zone. Salt dissolving went in Physical: it comes back when the water dries.',
             learn: 'Cooking makes new substances: heat changes the egg for good, and baking soda in vinegar gives off carbon dioxide gas. In the kitchen, dissolving sugar or salt is the physical one.' },
      check: [
        { q: 'A cake is baked from flour, eggs and sugar. Why can it not be turned back into flour, eggs and sugar?',
          options: ['Baking made new substances - a chemical change', 'The oven was too hot to reverse it', 'The ingredients only changed shape', 'The cake is the same substances, just mixed'],
          why: 'Baking is like cooking the egg: heat makes new substances, and new substances cannot be un-made by cooling.' },
        { q: 'What gas makes the bubbles when vinegar meets baking soda?',
          options: ['Carbon dioxide', 'Oxygen', 'Hydrogen', 'Steam'],
          why: 'Vinegar (an acid) and baking soda (a carbonate) react to make carbon dioxide gas, water and a salt.' },
        'classify_m:0'],
      exam: 'Grade 7 asks whether cooking rice is physical or chemical (chemical - it cannot be undone) and what vinegar and baking soda make: carbon dioxide, water and a salt.' },
    { id: 'real_test', grades: [7], chapter: 'g7s-changes', icon: '❓',
      title: 'Which test counts: undo it, or something new?',
      aim: 'Cut paper cannot be un-cut, yet melted ice can be re-frozen. Does "can you undo it?" tell you which change is chemical?',
      setup: ['watch:cutting'],
      predict: { q: 'Paper is cut in two. You cannot undo it. Is that a chemical change?', answer: 'no',
        options: [{ id: 'no', label: 'No', sub: 'it is still paper' }, { id: 'yes', label: 'Yes', sub: 'you cannot undo it' }] },
      steps: [
        { ask: 'Paper is cut. Physical Change or Chemical Change?', on: 'sort:cutting:physical', options: ['sort:cutting:physical', 'sort:cutting:chemical'],
          wrong: { 'sort:cutting:chemical': 'Hard to undo, but the pieces are still paper. No new substance was made, so it is physical.' } },
        { ask: 'The iron nail rusts. Which zone?', on: 'sort:rusting:chemical', options: ['sort:rusting:chemical', 'sort:rusting:physical'],
          wrong: { 'sort:rusting:physical': 'Rust is iron oxide - a new brown substance. Slow, but chemical.' } },
        { ask: 'Ice melts into water. Which zone?', on: 'sort:melting:physical', options: ['sort:melting:physical', 'sort:melting:chemical'],
          wrong: { 'sort:melting:chemical': 'Water and ice are the same substance. Freeze it and the ice is back: physical.' } },
        { ask: 'Baking soda fizzes in vinegar. Which zone?', on: 'sort:fizzing:chemical', options: ['sort:fizzing:chemical', 'sort:fizzing:physical'],
          wrong: { 'sort:fizzing:physical': 'The bubbles are a new gas, carbon dioxide. Something new was made: chemical.' } },
      ],
      see: { saw: 'Cut paper and melted ice went in Physical. The rusty nail and the fizzing mixture went in Chemical. One question decided it: was something new made?',
             learn: '"Can you undo it?" is only a clue. The real test is "was a new substance made?" Cutting paper cannot be undone, yet it is physical: the paper is still paper.' },
      check: ['classify_m:4', 'classify_m:3',
        { q: 'Which pair of observations best shows that a chemical change has taken place?',
          options: ['A new gas is given off and the colour changes', 'It melts and then freezes again', 'It is cut into smaller pieces', 'It dissolves and can be evaporated back'],
          why: 'A new gas and a new colour both mean a new substance. The other three are physical: the substance is unchanged.' }],
      exam: 'Grade 7 asks why tearing paper is a physical change: the paper is still paper, only in smaller pieces. Whether you can undo a change is not the test.' },
    // ── Grade 8 — g8s-chem-language ──
    { id: 'spot_signs', grades: [8], chapter: 'g8s-chem-language', icon: '🔎',
      title: 'Which sign shows a reaction happened?',
      aim: 'Four reactions, and each one gives a clue that something new was made. Spot the sign: colour, gas, precipitate or temperature.',
      setup: ['watch:rusting'],
      predict: { q: 'The nail rusts. Which sign tells you a reaction happened?', answer: 'colour',
        options: [{ id: 'colour', label: 'Colour changed', icon: '🎨' }, { id: 'gas', label: 'Gas produced', icon: '💨' }, { id: 'precipitate', label: 'Precipitate formed', icon: '🟡' }, { id: 'heat', label: 'Heat given out', icon: '🔥' }] },
      steps: [
        { ask: 'The iron nail went orange-brown. Which sign did you see?', on: 'spot:rusting:colour_change', options: ['spot:rusting:colour_change', 'spot:rusting:gas', 'spot:rusting:precipitate', 'spot:rusting:heat'],
          wrong: { 'spot:rusting:gas': 'No bubbles came off the nail. What changed was its colour: grey iron to orange-brown rust.',
                   'spot:rusting:precipitate': 'A precipitate is a solid that appears in a liquid. The nail was already solid: its colour changed.',
                   'spot:rusting:heat': 'The nail did not get hot. Rusting is slow, and the sign you saw was a colour change.' } },
        { ask: 'Vinegar meets baking soda. Which sign did you see?', on: 'spot:fizzing:gas', options: ['spot:fizzing:gas', 'spot:fizzing:colour_change', 'spot:fizzing:precipitate', 'spot:fizzing:heat'],
          wrong: { 'spot:fizzing:colour_change': 'The mixture stayed pale. What you saw was bubbles: a gas, carbon dioxide, was made.',
                   'spot:fizzing:precipitate': 'Bubbles rise up and escape; a precipitate sinks. This was a gas.',
                   'spot:fizzing:heat': 'This mixture goes slightly COOLER, not hot. The sign was the bubbles of gas.' } },
        { ask: 'Copper sulfate meets sodium hydroxide. Which sign did you see?', on: 'spot:precipitate:precipitate', options: ['spot:precipitate:precipitate', 'spot:precipitate:gas', 'spot:precipitate:heat', 'spot:precipitate:temperature_drop'],
          wrong: { 'spot:precipitate:gas': 'No bubbles. A solid appeared in the liquid and sank to the bottom: a precipitate.',
                   'spot:precipitate:heat': 'The beaker did not warm up. The sign was the solid that formed in the liquid: a precipitate.',
                   'spot:precipitate:temperature_drop': 'The beaker did not go cold. The sign was the solid that formed in the liquid: a precipitate.' } },
        { ask: 'The candle burns. Which sign did you see?', on: 'spot:burning:heat', options: ['spot:burning:heat', 'spot:burning:temperature_drop', 'spot:burning:precipitate', 'spot:burning:colour_change'],
          wrong: { 'spot:burning:temperature_drop': 'Hold a hand near a flame: it is warm. The candle gives heat OUT - the temperature rises.',
                   'spot:burning:precipitate': 'No liquid, so nothing can settle in it. The candle gave out heat and light.',
                   'spot:burning:colour_change': 'The wax did not change colour - it turned into gases. The sign was heat and light.' } },
      ],
      see: { saw: 'Rust: the colour changed. Vinegar and baking soda: gas bubbles. Copper sulfate and sodium hydroxide: a precipitate. The candle: heat given out.',
             learn: 'A chemical reaction shows at least one sign: a colour change, a gas given off, a precipitate (a solid forming in a liquid) or a temperature change.' },
      check: ['signs_m:0', 'signs_m:1', 'signs_m:3'],
      exam: 'In the exam you may be asked which observation shows a chemical reaction has taken place: a colour change, a gas, a precipitate or a temperature change.' },
    { id: 'hot_cold', grades: [8], chapter: 'g8s-chem-language', icon: '🌡️',
      title: 'Exothermic or endothermic: which way does heat go?',
      aim: 'Some reactions warm their surroundings and a few make them colder. Three reactions - for each one, say which way the heat went.',
      setup: ['watch:burning'],
      predict: { q: 'Vinegar and baking soda: will the tube get warmer or cooler?', answer: 'cooler',
        options: [{ id: 'cooler', label: 'Cooler', icon: '❄️' }, { id: 'warmer', label: 'Warmer', icon: '🔥' }, { id: 'same', label: 'No change', icon: '🌡️' }] },
      steps: [
        { ask: 'The candle burns. Heat given out, or temperature dropped?', on: 'spot:burning:heat', options: ['spot:burning:heat', 'spot:burning:temperature_drop'],
          wrong: { 'spot:burning:temperature_drop': 'Hold a hand near a candle: it is warm. The flame gives heat OUT to the air - exothermic.' } },
        { ask: 'Vinegar meets baking soda. Heat given out, or temperature dropped?', on: 'spot:fizzing:temperature_drop', options: ['spot:fizzing:temperature_drop', 'spot:fizzing:heat'],
          wrong: { 'spot:fizzing:heat': 'The tube feels slightly cool. This reaction takes heat IN from around it - endothermic.' } },
        { ask: 'Magnesium burns with a white flash. Heat given out, or temperature dropped?', on: 'spot:combustion:heat', options: ['spot:combustion:heat', 'spot:combustion:temperature_drop'],
          wrong: { 'spot:combustion:temperature_drop': 'That white flash is energy leaving as heat and light. Exothermic - never look straight at it.' } },
      ],
      see: { saw: 'The candle and the magnesium gave heat out. The vinegar and baking soda took heat in, and the tube went cooler.',
             learn: 'Exothermic reactions give out heat, so the temperature rises (burning). Endothermic reactions take in heat, so the temperature falls (vinegar and baking soda).' },
      check: ['signs_m:4',
        { q: 'A candle burns and warms the air around it. What kind of reaction is burning?',
          options: ['Exothermic - it gives out heat', 'Endothermic - it takes in heat', 'Physical - no new substance forms', 'Not a reaction - a flame is only light'],
          why: 'Heat leaving the reaction and warming the surroundings is the meaning of exothermic. Burning also makes new substances, so it is chemical.' }],
      exam: 'In the exam you may be asked to say whether a reaction is exothermic (gives out heat) or endothermic (takes in heat) from a temperature reading.' },
    { id: 'mg_burns', grades: [8], chapter: 'g8s-chem-language', icon: '✨',
      title: 'Magnesium burns: what is the white powder?',
      aim: 'A silver ribbon of magnesium is lit, then two liquids are mixed. Both make something new - and both can be written as an equation.',
      setup: ['watch:combustion'],
      predict: { q: 'After the magnesium burns, what will be left?', answer: 'powder',
        options: [{ id: 'powder', label: 'A white powder' }, { id: 'ribbon', label: 'The same silver ribbon' }, { id: 'nothing', label: 'Nothing at all', sub: 'it burns away' }] },
      steps: [
        { ask: 'The ribbon burned to a white powder. Physical Change or Chemical Change?', on: 'sort:combustion:chemical', options: ['sort:combustion:chemical', 'sort:combustion:physical'],
          wrong: { 'sort:combustion:physical': 'The silver ribbon is gone and a white powder is left: magnesium oxide, a new substance. Chemical.' } },
        { ask: 'Which sign did the burning magnesium show?', on: 'spot:combustion:light', options: ['spot:combustion:light', 'spot:combustion:gas', 'spot:combustion:precipitate'],
          wrong: { 'spot:combustion:gas': 'No bubbles - the oxygen went IN to the metal, nothing came off. The sign was a brilliant white light.',
                   'spot:combustion:precipitate': 'No liquid, so no precipitate. The sign was a blinding white light and heat.' } },
        { ask: 'Blue copper sulfate meets sodium hydroxide. Which zone?', on: 'sort:precipitate:chemical', options: ['sort:precipitate:chemical', 'sort:precipitate:physical'],
          wrong: { 'sort:precipitate:physical': 'Two liquids made a solid that was not there before: copper hydroxide. A new substance, so chemical.' } },
      ],
      see: { saw: 'The ribbon flared white and left white magnesium oxide powder. The blue and clear liquids made a blue-green solid. Both chemical changes.',
             learn: 'Magnesium + oxygen → magnesium oxide (2Mg + O₂ → 2MgO). The powder weighs more than the ribbon because oxygen atoms joined it. Atoms are never lost, so an equation must balance.' },
      check: ['signs_m:2',
        { q: 'Which balanced equation shows magnesium burning in oxygen?',
          options: ['2Mg + O₂ → 2MgO', 'Mg + O₂ → MgO', 'Mg + O → MgO₂', '2Mg + O₂ → MgO₂'],
          why: 'Two magnesium atoms and one O₂ molecule make two MgO: the same atoms on both sides of the arrow.' },
        { q: 'The magnesium oxide weighs more than the ribbon did. Where did the extra mass come from?',
          options: ['Oxygen from the air joined the magnesium', 'The heat of the flame turned into mass', 'The ribbon soaked up water', 'The balance was wrong'],
          why: 'Mass is conserved: the oxide is magnesium plus the oxygen it took from the air, so it weighs more than the ribbon alone.' }],
      exam: 'Grade 8 asks you to balance equations such as 2H₂ + O₂ → 2H₂O and Fe + O₂ → Fe₂O₃, and why: no atoms are created or destroyed.' },
    { id: 'reaction_or_not', grades: [8], chapter: 'g8s-chem-language', icon: '⚗️',
      title: 'Which changes are chemical reactions?',
      aim: 'Only a chemical change is a reaction, so only a chemical change gets a word equation. Sort four changes - which ones earn an equation?',
      setup: ['watch:boiling'],
      predict: { q: 'Water boils into steam. Is that a chemical reaction?', answer: 'no',
        options: [{ id: 'no', label: 'No', sub: 'steam is still water' }, { id: 'yes', label: 'Yes', sub: 'a gas was made' }] },
      steps: [
        { ask: 'Water boils to steam. Physical Change or Chemical Change?', on: 'sort:boiling:physical', options: ['sort:boiling:physical', 'sort:boiling:chemical'],
          wrong: { 'sort:boiling:chemical': 'Steam is still H₂O, only as a gas. No new substance, so no reaction and no equation to write.' } },
        { ask: 'Copper sulfate meets sodium hydroxide. Which zone?', on: 'sort:precipitate:chemical', options: ['sort:precipitate:chemical', 'sort:precipitate:physical'],
          wrong: { 'sort:precipitate:physical': 'A solid appeared that was not there before: copper hydroxide. A new substance means a reaction.' } },
        { ask: 'Salt dissolves in water. Which zone?', on: 'sort:dissolving:physical', options: ['sort:dissolving:physical', 'sort:dissolving:chemical'],
          wrong: { 'sort:dissolving:chemical': 'Evaporate the water and the salt is back unchanged. No new substance: physical, no equation.' } },
        { ask: 'Vinegar meets baking soda. Which zone?', on: 'sort:fizzing:chemical', options: ['sort:fizzing:chemical', 'sort:fizzing:physical'],
          wrong: { 'sort:fizzing:physical': 'The bubbles are carbon dioxide, a new gas. A new substance means a reaction - and an equation.' } },
      ],
      see: { saw: 'Boiling water and dissolving salt went in Physical: no new substance. The precipitate and the fizzing mixture went in Chemical: something new was made.',
             learn: 'Only a chemical change is a reaction, so only a chemical change gets a word equation: copper sulfate + sodium hydroxide → copper hydroxide + sodium sulfate. A physical change has no new products to write.' },
      check: ['classify_m:3', 'signs_m:3',
        { q: 'Which line is a correct word equation for a chemical change?',
          options: ['iron + oxygen + water → iron oxide', 'ice → water', 'salt + water → salt water', 'water → steam'],
          why: 'Only rusting makes a new substance, so only rusting has products to write after the arrow. The other three are physical changes.' }],
      exam: 'Grade 8 asks what the arrow in a word equation means: "reacts to form". Only a chemical change has new products to put after it.' },
  ];

  return {
    GRADES, forGrade,
    SCENARIOS, SIGNS,
    DISCOVERIES, GUIDES, MISSIONS, RESULTS, FACTS, EXPERIMENTS,
  };
})();
if (typeof window !== 'undefined') window.LabChangesData = LabChangesData;
