'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Physics - P3 Energy, Heat & Temperature: thermal expansion
//
//  ⚠ THE P3 SYLLABUS STATEMENTS COVER ENERGY ONLY - conservation, production
//    and sources - but the chapter is titled Energy, Heat & Temperature and
//    the 2021 NCE Physics paper asks the bimetallic strip (Fig 4.1). That one
//    item was tagged `thermal_expansion` with no declaration behind it, so it
//    was hidden from the Practise screen. This file takes it to 20.
//
//  ⚠ A BIMETALLIC STRIP BENDS TOWARDS THE METAL THAT EXPANDS LESS. Getting
//    that the wrong way round is the single commonest error in this topic and
//    it decides which way the contacts of a thermostat or a fire alarm move,
//    so g9s-p3te-009, -010 and -011 turn on it.
//
//  ⚠ WATER IS THE EXCEPTION and is taught as one: between 0 and 4 degrees it
//    expands as it COOLS, which is why ice floats and pipes split. A child who
//    generalises "cooling always contracts" gets both of those wrong.
//
//  ⚠ IDS TAKE THEIR OWN `p3te` BLOCK - g9s-p3-NNN is shared with p3_energy.js
//    and p3_volume.js, and the importer keys on ids.
//
//  Source: NCE Physics 2021 Fig 4.1A/B; NCF Grades 7-9 §Energy, Heat and
//  Temperature.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-p3-energy';
const SUB = 'thermal_expansion';

// ── Figures. ⚠ aria-label describes the APPARATUS, never the outcome, and
//    every label sits well inside the viewBox.

// Two metals joined along their length, drawn straight and cold.
const FIG_STRIP =
  '<svg viewBox="0 0 250 116" width="255" role="img" aria-label="two different metals joined along their length to make a strip">' +
  '<rect x="40" y="44" width="170" height="12" fill="#f59e0b" stroke="#0f172a" stroke-width="1.4"/>' +
  '<rect x="40" y="56" width="170" height="12" fill="#94a3b8" stroke="#0f172a" stroke-width="1.4"/>' +
  '<rect x="26" y="36" width="14" height="40" fill="#475569" stroke="#0f172a" stroke-width="1.2"/>' +
  '<text x="216" y="52" font-size="9" fill="#334155">P</text>' +
  '<text x="216" y="66" font-size="9" fill="#334155">Q</text>' +
  '<text x="96" y="98" font-size="9" fill="#334155">heated from below</text>' +
  '</svg>';

// The same strip mounted under a pair of contacts in an alarm circuit.
const FIG_ALARM =
  '<svg viewBox="0 0 250 128" width="255" role="img" aria-label="a bimetallic strip mounted below a pair of contacts in a circuit">' +
  '<rect x="26" y="52" width="14" height="38" fill="#475569" stroke="#0f172a" stroke-width="1.2"/>' +
  '<rect x="40" y="62" width="150" height="10" fill="#f59e0b" stroke="#0f172a" stroke-width="1.4"/>' +
  '<rect x="40" y="72" width="150" height="10" fill="#94a3b8" stroke="#0f172a" stroke-width="1.4"/>' +
  '<circle cx="176" cy="44" r="5" fill="#0f172a"/>' +
  '<line x1="176" y1="18" x2="176" y2="39" stroke="#0f172a" stroke-width="2"/>' +
  '<text x="186" y="34" font-size="9" fill="#334155">contacts</text>' +
  '<text x="60" y="108" font-size="9" fill="#334155">strip, fixed at one end</text>' +
  '</svg>';

// A metal plate with a round hole, standing over a burner.
const FIG_PLATE =
  '<svg viewBox="0 0 200 140" width="205" role="img" aria-label="a metal plate with a round hole standing over a burner">' +
  '<rect x="46" y="20" width="104" height="66" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.6"/>' +
  '<circle cx="98" cy="53" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>' +
  '<polygon points="98,120 90,104 106,104" fill="#f97316" stroke="none"/>' +
  '<line x1="86" y1="126" x2="110" y2="126" stroke="#0f172a" stroke-width="2"/>' +
  '<text x="30" y="100" font-size="9" fill="#334155">plate heated evenly</text>' +
  '</svg>';

// Two rail sections meeting, with the gap drawn between them.
const FIG_RAILS =
  '<svg viewBox="0 0 250 116" width="255" role="img" aria-label="two lengths of steel rail meeting end to end over sleepers">' +
  '<rect x="20" y="44" width="98" height="14" fill="#94a3b8" stroke="#0f172a" stroke-width="1.4"/>' +
  '<rect x="130" y="44" width="98" height="14" fill="#94a3b8" stroke="#0f172a" stroke-width="1.4"/>' +
  '<rect x="34" y="64" width="26" height="30" fill="#a16207" stroke="#0f172a" stroke-width="1.2"/>' +
  '<rect x="112" y="64" width="26" height="30" fill="#a16207" stroke="#0f172a" stroke-width="1.2"/>' +
  '<rect x="188" y="64" width="26" height="30" fill="#a16207" stroke="#0f172a" stroke-width="1.2"/>' +
  '<line x1="118" y1="30" x2="130" y2="30" stroke="#0f172a" stroke-width="1.4"/>' +
  '<text x="150" y="30" font-size="9" fill="#334155">gap</text>' +
  '<text x="60" y="110" font-size="9" fill="#334155">rails laid on sleepers</text>' +
  '</svg>';

const MCQ = [
  ['g9s-p3te-001', 1,
   'Why does a metal bar become slightly longer when it is heated?',
   ['Its particles vibrate more and move further apart',
    'Its particles take in extra mass from the flame',
    'The bar draws in air through its outer surface',
    'Its particles stop moving and settle more loosely'],
   'Its particles vibrate more and move further apart',
   'Think about what heating does to the movement of particles.',
   'Heating makes the particles vibrate more strongly about their fixed positions, so their average spacing grows and the whole bar expands. Nothing is added, and the mass of the bar does not change.'],

  ['g9s-p3te-002', 1,
   'For the same rise in temperature, which of these expands the most?',
   ['A gas',
    'A solid',
    'A liquid',
    'All expand equally'],
   'A gas',
   'The weaker the forces holding the particles, the more room they take.',
   'Gases expand most for a given temperature rise, liquids less and solids least, because the forces between the particles are weakest in a gas and strongest in a solid.'],

  ['g9s-p3te-003', 1,
   FIG_RAILS + 'Why are small gaps left between the sections of a steel railway line?',
   ['To give the rails room to expand in hot weather',
    'To let rain water drain away from the track bed',
    'To make the ride quieter for the passengers',
    'To save steel and lower the cost of the track'],
   'To give the rails room to expand in hot weather',
   'Think about a rail on a very hot afternoon.',
   'Steel rails lengthen as they warm. With no gap the sections push hard against each other and the track can buckle sideways, so a gap is left for the expansion to take up.'],

  ['g9s-p3te-004', 2,
   'A long concrete bridge has a toothed metal joint built into each end of the deck. What is that joint for?',
   ['It lets the deck expand and contract without cracking',
    'It stops rain water from reaching the road surface',
    'It joins the electrical cables that run under the road',
    'It grips the tyres of vehicles crossing in wet weather'],
   'It lets the deck expand and contract without cracking',
   'Concrete and steel change size as the seasons change.',
   'The deck lengthens in hot weather and shortens in cold. The joint opens and closes to take up that movement; without it the forces would crack the deck or its supports.'],

  ['g9s-p3te-005', 2,
   'Why are overhead power lines strung with a slight sag between the poles?',
   ['So they do not snap when they contract in cold weather',
    'So that birds can perch along the whole of the line',
    'So that they can carry a larger current in the summer',
    'So that rain runs off instead of collecting on them'],
   'So they do not snap when they contract in cold weather',
   'Think about a cold night rather than a hot afternoon.',
   'Cables shorten and tighten as they cool. The sag left when they are strung gives them room to contract without the tension rising far enough to snap the cable or pull over a pole.'],

  ['g9s-p3te-006', 2,
   'A glass jar has a metal lid that is too tight to turn. Why does running hot water over the lid help?',
   ['The metal lid expands more than the glass jar does',
    'The hot water makes the glass jar expand faster',
    'The water washes away the air trapped in the jar',
    'The heat turns the lid into a much softer metal'],
   'The metal lid expands more than the glass jar does',
   'The lid and the jar are made of different materials.',
   'For the same temperature rise metal expands more than glass, so the warmed lid becomes slightly wider than the neck it grips and can be turned.'],

  ['g9s-p3te-007', 2,
   FIG_PLATE + 'A metal plate with a round hole cut in it is heated evenly. What happens to the hole?',
   ['It becomes larger',
    'It becomes smaller',
    'It stays exactly the same',
    'It becomes an oval shape'],
   'It becomes larger',
   'Every part of the plate expands by the same fraction.',
   'The whole plate expands and the metal around the hole moves outwards with it, so the hole widens - as though a photograph of the plate had been enlarged.'],

  ['g9s-p3te-008', 2,
   'How does a liquid-in-glass thermometer show that the temperature has risen?',
   ['The liquid expands and rises up the narrow tube',
    'The liquid changes colour as it becomes warmer',
    'The glass contracts and squeezes the liquid down',
    'The liquid boils and pushes bubbles up the tube'],
   'The liquid expands and rises up the narrow tube',
   'Watch what the liquid does, not the glass.',
   'The liquid expands more than the glass around it, and because the bore is very narrow a small increase in volume gives a long, easily read movement up the scale.'],

  ['g9s-p3te-009', 2,
   FIG_STRIP + 'Metals P and Q are riveted together along their whole length to make a bimetallic strip. Why does the strip curve when it is heated?',
   ['The two metals expand by different amounts',
    'Only one of the two metals is heated at a time',
    'The rivets holding the metals melt as it heats',
    'The strip loses metal from its outer surface'],
   'The two metals expand by different amounts',
   'The two halves are fixed, so neither can slide past the other.',
   'One metal expands more than the other, but they are joined along their whole length, so the strip is forced to bend - with the metal that expands more on the outside of the curve.'],

  ['g9s-p3te-010', 3,
   FIG_ALARM + 'In this fire alarm, the bimetallic strip must bend towards the contacts and close them when the room gets hot. How should it be built?',
   ['The metal that expands more goes on the far side from the contacts',
    'The metal that expands more goes on the side nearest the contacts',
    'Both metals are chosen so that they expand by the same amount',
    'The strip is made from a single metal so that it stays straight'],
   'The metal that expands more goes on the far side from the contacts',
   'A bimetallic strip bends towards the metal that expands less.',
   'The strip curves towards the side that expands less. Putting the metal that expands more on the side away from the contacts therefore swings the strip towards them as it heats, closing the circuit and ringing the bell.'],

  ['g9s-p3te-011', 2,
   'The bimetallic strip in an electric iron opens the contacts when the iron gets too hot. What happens as the iron then cools?',
   ['The strip straightens and the contacts close again',
    'The strip stays bent and the iron never heats again',
    'The strip melts a little and has to be replaced',
    'The strip bends further and the contacts stay open'],
   'The strip straightens and the contacts close again',
   'Cooling undoes what the heating did.',
   'Contraction on cooling straightens the strip, the contacts touch and the element switches on again. This repeated switching is what holds the iron near its set temperature.'],

  ['g9s-p3te-012', 3,
   'Why is a thick glass tumbler more likely to crack when boiling water is poured into it than a thin one?',
   ['The inside expands before the outside has warmed',
    'Thick glass has a higher boiling point than water',
    'Thick glass stores much more heat energy than water',
    'The outside of thick glass always expands first'],
   'The inside expands before the outside has warmed',
   'Glass is a poor conductor, so its two surfaces are not at one temperature.',
   'In a thick tumbler the inner surface heats and expands while the outer surface is still cold. The stress between them cracks the glass; a thin wall warms right through too quickly for that.'],

  ['g9s-p3te-013', 1,
   'Water pipes sometimes burst in very cold weather. What causes this?',
   ['Water expands as it freezes into ice',
    'Water contracts steadily as it cools',
    'Ice takes up less room than water',
    'The metal pipe expands in the cold'],
   'Water expands as it freezes into ice',
   'Water is unusual: think about whether ice floats or sinks.',
   'Below 4 degrees water expands as it cools, and expands again as it freezes, so the ice needs more room than the water did. The pipe cannot stretch, so it splits.'],

  ['g9s-p3te-014', 3,
   'In a cold country a pond freezes at the surface first and fish survive in the water below. Which property of water explains this?',
   ['Ice is less dense than water, so it floats on top',
    'Ice is denser than water, so it sinks to the bottom',
    'Water conducts heat well, so the pond cools evenly',
    'Water expands steadily as its temperature is lowered'],
   'Ice is less dense than water, so it floats on top',
   'Ask what floats, and what would happen if it did not.',
   'Water is densest at about 4 degrees, so the coldest water and the ice that forms stay at the surface. That ice layer insulates the water beneath, which stays liquid, and pond life survives.'],

  ['g9s-p3te-015', 2,
   'A hot steel rivet is hammered through two plates and then allowed to cool. Why does the joint become tight?',
   ['The rivet contracts and pulls the plates together',
    'The rivet expands and pushes the plates apart',
    'The plates expand and grip the rivet more firmly',
    'The rivet turns softer and fills the whole hole'],
   'The rivet contracts and pulls the plates together',
   'Think about the change in size as the rivet loses its heat.',
   'As the rivet cools it contracts, shortening slightly and drawing the two plates hard together. That contraction is what makes a hot-riveted joint so tight.'],

  ['g9s-p3te-016', 3,
   'A railway track is laid on a cool morning at 18 degrees and can reach 45 degrees in the afternoon sun. How wide should the expansion gaps be?',
   ['Wide enough to be still open at the hottest expected',
    'No gap at all, since bolts hold the rails down firmly',
    'Just wide enough to close at the coolest temperature',
    'Narrow enough that the rails cannot move at all'],
   'Wide enough to be still open at the hottest expected',
   'The gap has to survive the largest expansion, not the smallest.',
   'The gap must not close completely at 45 degrees, so it is sized for the whole temperature range the track will meet. A gap that shuts early lets the rails press together and buckle.'],

  ['g9s-p3te-017', 2,
   'Why are concrete pavements and driveways laid as separate slabs with lines between them?',
   ['So each slab can expand without cracking its neighbour',
    'So that rain water soaks straight down into the ground',
    'So that the concrete dries out faster after it is laid',
    'So that the pavement is easier to sweep clean each day'],
   'So each slab can expand without cracking its neighbour',
   'Concrete changes size with the weather as much as metal does.',
   'The lines are expansion joints. They let each slab grow and shrink as the temperature changes, so the movement is taken up at the joint instead of cracking the concrete.'],

  ['g9s-p3te-018', 3,
   'A student wants to show that a metal bar expands on heating, though the change is under a millimetre. Which method shows it best?',
   ['Let the bar press on a needle that turns a pointer',
    'Weigh the bar carefully before and after heating',
    'Measure the bar with a ruler as soon as it is hot',
    'Feel both ends of the bar with the back of a hand'],
   'Let the bar press on a needle that turns a pointer',
   'The problem is to magnify a very small movement.',
   'The expansion is far too small to read on a ruler, and the mass does not change at all, so weighing shows nothing. Letting the bar roll a needle turns a tiny movement into a large swing of a pointer.'],

  ['g9s-p3te-019', 4,
   'An engineer designs a 60 m steel footbridge for a site where the temperature runs from 12 degrees at night to 38 degrees at midday. Which design decision follows from thermal expansion?',
   ['Fix one end and let the other slide on rollers',
    'Bolt both ends firmly to their concrete supports',
    'Build it as one piece with no joints anywhere',
    'Paint the steel dark so it takes in more heat'],
   'Fix one end and let the other slide on rollers',
   'The deck has to be free to change length somewhere.',
   'Steel lengthens as the day warms. Fixing one end and mounting the other on rollers lets the deck grow and shrink freely; bolting both ends builds up forces large enough to buckle the deck or crack a support.'],
];

MCQ.forEach(([id, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection: SUB, difficulty,
    question, options, answer, hint, explanation }));
});

})();
