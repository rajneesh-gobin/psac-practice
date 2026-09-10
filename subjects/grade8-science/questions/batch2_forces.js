'use strict';

(function () {

const CH = 'g8s-forces';

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8s-forces-016', chapterId: CH, difficulty: 2, subsection: 'measuring_force',
    question: 'A crate weighs 480 N on Earth. What is its mass, in kilograms? (g = 10 N/kg)',
    answer: 48,
    hint: 'Weight = mass × g, so here you need to work backwards from the weight.',
    explanation: 'Mass = weight &divide; g = 480 &divide; 10 = 48 kg. Multiplying instead gives 4800, which is far heavier than any crate a person could handle, and 480 is the weight in newtons, not a mass in kilograms.'
  }),

  makeMCQ({
    id: 'g8s-forces-017', chapterId: CH, difficulty: 2, subsection: 'types_forces',
    question: 'A pirogue floats still on the lagoon. Which pair of forces on it is balanced?',
    options: ['Weight and upthrust', 'Friction and tension', 'Weight and friction', 'Tension and upthrust'],
    answer: 'Weight and upthrust',
    hint: 'One force pulls the boat down and one pushes it up out of the water.',
    explanation: 'The weight pulls the pirogue down and the upthrust from the water pushes it up; because it neither rises nor sinks, the two must be equal. Tension needs a rope being pulled and friction needs surfaces sliding past each other, and neither is holding a still, floating boat up.'
  }),

  makeMCQ({
    id: 'g8s-forces-018', chapterId: CH, difficulty: 3, subsection: 'gravity_effects',
    question: 'An astronaut travels from Earth to the Moon. Which quantity changes on the way?',
    options: ['Their weight', 'Their mass', 'Their volume', 'Their density'],
    answer: 'Their weight',
    hint: 'One of these depends on the pull of gravity where you are; the others depend only on the astronaut.',
    explanation: 'Weight is the pull of gravity on a mass, and the Moon pulls about six times more weakly, so the astronaut weighs less there. Mass is the amount of matter and does not change, and since neither mass nor volume changes, the density stays the same too.'
  }),

  makeNum({
    id: 'g8s-forces-019', chapterId: CH, difficulty: 3, subsection: 'measuring_force',
    question: 'A spring in a spring balance stretches 2 cm for every 5 N hung on it. What force, in newtons, would stretch it 8 cm?',
    answer: 20,
    hint: 'Work out how many 2 cm steps fit into 8 cm first.',
    explanation: '8 cm is four lots of 2 cm, and each lot needs 5 N, so the force is 4 × 5 = 20 N. Answering 16 multiplies the extension by 2 instead of by the force per step, and answering 40 doubles the extension rather than dividing it.'
  }),

  makeText({
    id: 'g8s-forces-020', chapterId: CH, difficulty: 2, subsection: 'types_forces',
    question: 'A cyclist going fast feels a force pushing back against her as she moves through the air. Name this force.',
    answer: 'air resistance',
    alsoAccept: ['drag', 'air friction', 'air drag'],
    hint: 'It is a kind of friction, but with a gas rather than with a solid surface.',
    explanation: 'The backward push of the air is called air resistance, or drag; it grows as the cyclist goes faster, which is why racing cyclists crouch low. Gravity acts downwards, not backwards, and upthrust acts upwards.'
  })

);

})();
