'use strict';

const G3SC_SYLLABUS = {
  'g3sc-senses': { subsections: [
    { id:'sense_organs',    name:'The Five Sense Organs' },
    { id:'sense_functions', name:'What Each Sense Does' },
    { id:'using_senses',    name:'Using Our Senses' },
  ]},
  'g3sc-living-nonliving': { subsections: [
    { id:'classifying',            name:'Living or Non-Living?' },
    { id:'characteristics_living', name:'Characteristics of Living Things' },
    { id:'variety_organisms',      name:'Plants and Animals Around Us' },
  ]},
  'g3sc-materials': { subsections: [
    { id:'types_materials',      name:'Types of Materials' },
    { id:'properties_materials', name:'Properties of Materials' },
    { id:'uses_objects',         name:'Uses of Materials' },
  ]},
  'g3sc-water': { subsections: [
    { id:'sources_water',     name:'Sources of Water' },
    { id:'uses_water',        name:'How We Use Water' },
    { id:'properties_water',  name:'Properties of Water' },
    { id:'conservation_water',name:'Saving Water' },
  ]},
  'g3sc-air': { subsections: [
    { id:'presence_air',   name:'Air is All Around Us' },
    { id:'uses_air',       name:'How We Use Air' },
    { id:'properties_air', name:'Properties of Air' },
  ]},
  'g3sc-environment': { subsections: [
    { id:'pollution_types',   name:'Types of Pollution' },
    { id:'keeping_clean',     name:'Keeping Our Environment Clean' },
    { id:'effects_pollution', name:'Effects of Pollution' },
  ]},
};

registerSubject({
  id:         'grade3-science',
  name:       'Science',
  grade:      3,
  icon:       '🔬',
  subject:    'Science',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  noDifficulty: true,
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
