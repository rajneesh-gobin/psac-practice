'use strict';
// @enrichment - Derived from the Energy Sources chapter.
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-enr-ene-018', chapterId:'g5sci-enr-energy', difficulty:2,
    subsection:'renewable',
    question:'In Mauritius, some electricity is made by burning <b>bagasse</b> - the dry fibre left over after sugar cane has been crushed. Why is bagasse counted as a <b>renewable</b> energy source?',
    options:['A new cane crop grows every year',
             'Cane fibre never burns away fully',
             'It was formed millions of years ago',
             'It is dug out of underground mines'],
    answer:'A new cane crop grows every year',
    hint:'Ask whether we can get more of it next year, or whether the supply is fixed forever.',
    explanation:'Bagasse is <b>renewable</b> because the cane is replanted and harvested again, so the supply comes back each season. Coal and oil took millions of years to form and are dug from the ground, which is exactly what makes them <b>non-renewable</b> - the last two answers describe fossil fuels, not bagasse. And bagasse does burn away; it is the crop growing back, not the fibre lasting, that makes it renewable.' }),

  makeMCQ({ id:'g5sci-enr-ene-019', chapterId:'g5sci-enr-energy', difficulty:2,
    subsection:'sources',
    question:'The wind turns the blades of a wind turbine, and the turbine lights a lamp. Which line shows the energy changes in the <b>correct order</b>?',
    options:['Movement energy → electrical energy → light energy',
             'Light energy → movement energy → electrical energy',
             'Electrical energy → movement energy → light energy',
             'Heat energy → electrical energy → movement energy'],
    answer:'Movement energy → electrical energy → light energy',
    hint:'Start with what the wind does first, and finish with what you can see at the end.',
    explanation:'The wind gives the blades <b>movement</b> energy, the generator turns that into <b>electrical</b> energy, and the lamp turns that into <b>light</b>. The other lines put the chain in the wrong order: light is what comes out at the end, not what goes in, and the turbine is not driven by electricity or by heat - it is driven by moving air.' })
);
