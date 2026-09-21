'use strict';

(function () {

const CH = 'g7s-changes';

STATIC_QUESTIONS.push(

  makeTF({
    id: 'g7s-changes-021', chapterId: CH, difficulty: 1, subsection: 'physical_changes',
    question: 'Melting ice to form water is a physical change because no new substance is produced.',
    answer: true,
    hint: 'Ask yourself: does melting ice create something that was not ice or water before?',
    explanation: '<b>True.</b> Melting is a change of state — water molecules are the same in ice and liquid water, just arranged differently. The composition is unchanged, and the process is easily reversed by freezing. Physical changes do not produce new substances.'
  }),

  makeMCQ({
    id: 'g7s-changes-022', chapterId: CH, difficulty: 1, subsection: 'physical_changes',
    question: 'Which of the following is a <b>physical</b> change?',
    options: ['Dissolving sugar in water', 'Burning wood', 'Rusting iron', 'Cooking an egg'],
    answer: 'Dissolving sugar in water',
    hint: 'Look for the change where no new substance is permanently created.',
    explanation: 'Dissolving sugar is physical — the sugar molecules separate but remain sugar and can be recovered by evaporating the water. Burning wood, rusting iron and cooking an egg all form new substances (ash/CO₂, iron oxide, and denatured proteins respectively), making them chemical changes.'
  }),

  makeMCQ({
    id: 'g7s-changes-023', chapterId: CH, difficulty: 2, subsection: 'chemical_changes',
    question: 'Which observation is the <b>best</b> evidence that a chemical change has taken place?',
    options: ['A new substance with different properties is formed', 'The temperature drops slightly', 'The mixture changes colour temporarily', 'The solid dissolves in water'],
    answer: 'A new substance with different properties is formed',
    hint: 'The defining feature of a chemical change is what it produces.',
    explanation: 'Forming a new substance with different properties is the key criterion for a chemical change — it cannot be easily reversed to recover the original materials. A temperature change or colour change alone can occur in physical changes too; dissolving is a physical change.'
  }),

  makeTF({
    id: 'g7s-changes-024', chapterId: CH, difficulty: 2, subsection: 'chemical_changes',
    question: 'The total mass of substances increases during a chemical change.',
    answer: false,
    hint: 'Think about the law of conservation of mass.',
    explanation: '<b>False.</b> The law of conservation of mass states that mass is neither created nor destroyed in a chemical reaction — the total mass of products equals the total mass of reactants. What changes is how atoms are arranged, not how many there are.'
  }),

  makeMCQ({
    id: 'g7s-changes-025', chapterId: CH, difficulty: 2, subsection: 'examples_changes',
    question: 'Why is burning classified as a <b>chemical</b> change?',
    options: ['New substances (ash, CO₂ and water vapour) are formed', 'The material gets very hot', 'The material changes shape', 'It happens very quickly'],
    answer: 'New substances (ash, CO₂ and water vapour) are formed',
    hint: 'Focus on what is produced, not on how fast it happens or how hot it gets.',
    explanation: 'Burning (combustion) produces completely new substances — carbon dioxide, water vapour and ash — that have different properties from the original fuel. Getting hot and changing shape can happen in physical changes too; speed alone does not determine whether a change is chemical.'
  }),

  makeText({
    id: 'g7s-changes-026', chapterId: CH, difficulty: 2, subsection: 'examples_changes',
    question: 'Iron reacts slowly with oxygen and water to form a reddish-brown substance on its surface. What is the name of this substance?',
    answer: 'rust',
    alsoAccept: ['iron rust', 'iron oxide', 'iron(III) oxide', 'hydrated iron oxide'],
    hint: 'It has a reddish-brown colour and flakes off iron left in damp air.',
    explanation: '<b>Rust</b> (hydrated iron oxide) is the new substance formed when iron reacts with oxygen and water. Because a new substance forms, rusting is a chemical change — and an irreversible one, since the rust cannot spontaneously turn back into shiny iron.'
  }),

  makeMCQ({
    id: 'g7s-changes-027', chapterId: CH, difficulty: 2, subsection: 'examples_changes',
    question: 'Photosynthesis is a chemical change. Which equation best summarises what happens?',
    options: [
      'CO₂ + H₂O → glucose + O₂ (using light energy)',
      'glucose + O₂ → CO₂ + H₂O + energy',
      'iron + oxygen → iron oxide',
      'water → hydrogen + oxygen'
    ],
    answer: 'CO₂ + H₂O → glucose + O₂ (using light energy)',
    hint: 'Photosynthesis builds up sugar using light; it is the opposite of respiration.',
    explanation: 'Photosynthesis converts carbon dioxide and water into glucose and oxygen using light energy. The second option is respiration (the reverse process), the third is rusting, and the fourth is the electrolysis of water — a different chemical reaction entirely.'
  }),

  makeMCQ({
    id: 'g7s-changes-028', chapterId: CH, difficulty: 2, subsection: 'examples_changes',
    question: 'A hard-boiled egg cannot be turned back into a raw egg. This shows that cooking is a —',
    options: ['Chemical change, because it is irreversible', 'Physical change, because heat was used', 'Physical change, because the shape did not change', 'Chemical change, because it happened quickly'],
    answer: 'Chemical change, because it is irreversible',
    hint: 'Can you reverse the process and get the original substance back?',
    explanation: 'Cooking denatures (permanently changes) the proteins in the egg white and yolk, forming new substances with different properties. Because the original proteins cannot be recovered, the change is irreversible — the hallmark of a chemical change. Heat being applied or the speed of the change does not make it physical.'
  }),

  makeTF({
    id: 'g7s-changes-029', chapterId: CH, difficulty: 2, subsection: 'physical_changes',
    question: 'Tearing a piece of paper in half is a physical change.',
    answer: true,
    hint: 'Does tearing paper create a new type of substance?',
    explanation: '<b>True.</b> Tearing paper changes its shape and size but does not change its chemical composition — both halves are still paper. No new substance is formed, so it is a physical change. (Burning the paper would be chemical, since ash and gases would form.)'
  }),

  makeMCQ({
    id: 'g7s-changes-030', chapterId: CH, difficulty: 3, subsection: 'chemical_changes',
    question: 'Which set of observations provides the <b>strongest</b> evidence of a chemical change when two clear liquids are mixed?',
    options: [
      'A white solid forms and the mixture becomes warm',
      'The colour of the mixture becomes slightly lighter',
      'The volume of the liquid increases',
      'The mixture becomes easier to pour'
    ],
    answer: 'A white solid forms and the mixture becomes warm',
    hint: 'Look for evidence of a new substance being produced.',
    explanation: 'A white solid (precipitate) forming from two clear liquids is strong evidence of a new substance being created. The warmth suggests an exothermic reaction releasing energy. A slight colour change or change in volume or viscosity could have purely physical explanations and does not by itself confirm a chemical change.'
  }),

  makeMCQ({
    id: 'g7s-changes-031', chapterId: CH, difficulty: 3, subsection: 'examples_changes',
    question: 'During respiration in cells, glucose reacts with oxygen. What kind of change is this, and why?',
    options: [
      'Chemical — new substances (CO₂ and water) are formed and energy is released',
      'Physical — glucose simply dissolves in cell fluid',
      'Physical — the change happens inside the body',
      'Chemical — the cell gets smaller'
    ],
    answer: 'Chemical — new substances (CO₂ and water) are formed and energy is released',
    hint: 'Ask whether new substances with different properties are produced.',
    explanation: 'Respiration produces carbon dioxide and water — substances with completely different properties from glucose and oxygen — and releases energy. This tick-list (new substances, energy change, irreversible) confirms it is a chemical change. Dissolving is physical; location inside the body and cell size are not the criteria.'
  }),

  makeMCQ({
    id: 'g7s-changes-032', chapterId: CH, difficulty: 3, subsection: 'physical_changes',
    question: 'Salt is dissolved in water to make seawater. Which of the following correctly classifies this change and justifies it?',
    options: [
      'Physical — the salt can be recovered by evaporating the water',
      'Chemical — salt looks different once dissolved',
      'Chemical — the water changes colour when salt is added',
      'Physical — heat was needed to speed up dissolving'
    ],
    answer: 'Physical — the salt can be recovered by evaporating the water',
    hint: 'Can the original substances be got back without a chemical reaction?',
    explanation: 'Dissolving is a physical change: the salt ions spread through the water but remain sodium chloride. Evaporate the water and you recover the original salt crystals — reversibility is the test. A change in appearance does not make something chemical, and heat is often used in physical changes too.'
  })

);

})();
