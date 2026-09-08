'use strict';
const G3SC_SYLLABUS = {};
registerSubject({
  id:         'grade3-science',
  name:       'Science',
  grade:      3,
  icon:       '🔬',
  subject:    'Science',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G3SC_SYLLABUS,
  chapters: [
    { id: 'g3sc-senses', name: 'The Senses', icon: '👁️', examWeight: 1,
      syllabus: 'Identify and name the five sense organs: eyes, ears, nose, tongue and skin. Relate each sense to its function — seeing, hearing, smelling, tasting and touching. Show understanding of how we use the senses to observe and gather information from the environment around us.' },
    { id: 'g3sc-living-nonliving', name: 'Living and Non-Living Things', icon: '🌿', examWeight: 1,
      syllabus: 'Recognise and identify a variety of things in the immediate environment. Observe and classify things as living or non-living and state differences between them. State that there is a large variety of plants and animals around us. Show understanding that living things grow, need food and breathe.' },
    { id: 'g3sc-materials', name: 'Materials in our Environment', icon: '🪵', examWeight: 1,
      syllabus: 'Observe and name a variety of common materials found in everyday life such as wood, plastic, paper and glass. Identify the types of common materials. Compare and classify objects made of wood, plastic, paper and glass.' },
    { id: 'g3sc-water', name: 'Water', icon: '💧', examWeight: 1,
      syllabus: 'Identify and name some common sources of water. List some common uses of water. State the physical properties of water. Investigate and recognise the presence of water around us. Demonstrate understanding of the need to conserve water so we do not waste it.' },
    { id: 'g3sc-air', name: 'Air', icon: '💨', examWeight: 1,
      syllabus: 'State that air is all around us and that we breathe air all the time. List some common uses of air. Investigate and recognise the presence of air around us through simple observations. State that air is present in empty bottles, soil and water.' },
    { id: 'g3sc-environment', name: 'Protecting our Environment', icon: '🌍', examWeight: 1,
      syllabus: 'Explore and observe the given environment and list problems such as domestic waste, noise, smoke and stagnant water. Recognise ways to keep our environment clean. Explain how air and water can become dirty and suggest ways to solve the problem. Infer how problems in the environment affect people and other living things.' },
  ],
});
