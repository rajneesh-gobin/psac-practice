'use strict';

(function () {

const CH = 'g8s-pressure';

STATIC_QUESTIONS.push(

  makeTF({
    id: 'g8s-pressure-021', chapterId: CH, difficulty: 1, subsection: 'pressure_definition',
    question: 'The unit of pressure in the SI system is the pascal (Pa), which is equal to one newton per square metre (N/m²).',
    answer: true,
    hint: 'Think about the formula: pressure = force ÷ area.',
    explanation: '<b>True.</b> Pressure = force ÷ area, so one pascal means one newton of force spread over one square metre. Writing N/m² and Pa are interchangeable on any answer line.'
  }),

  makeMCQ({
    id: 'g8s-pressure-022', chapterId: CH, difficulty: 2, subsection: 'pressure_definition',
    question: 'A knife and a spoon are made of the same material and pushed into soft butter with the same force. Which one makes a deeper cut, and why?',
    options: ['The knife, because its blade has a smaller area', 'The spoon, because its bowl is rounder', 'Both cut equally deep', 'The spoon, because it has a larger area'],
    answer: 'The knife, because its blade has a smaller area',
    hint: 'Same force, two very different areas of contact.',
    explanation: 'Pressure = force ÷ area. The knife blade has a very thin edge with a tiny area, so the same force produces a much larger pressure — enough to slice through butter. The spoon has a broader bowl that spreads the force, giving lower pressure and little cutting effect.'
  }),

  makeNum({
    id: 'g8s-pressure-023', chapterId: CH, difficulty: 2, subsection: 'pressure_calculations',
    question: 'A pressure of 400 Pa acts over a surface of area 5 m². What force, in newtons, does this produce?',
    answer: 2000,
    hint: 'Rearrange pressure = force ÷ area to make force the subject.',
    explanation: 'Force = pressure × area = 400 × 5 = 2000 N. Dividing 400 by 5 gives 80, which applies the formula upside down, and adding 400 + 5 gives no meaningful physical quantity.'
  }),

  makeNum({
    id: 'g8s-pressure-024', chapterId: CH, difficulty: 2, subsection: 'pressure_calculations',
    question: 'A hydraulic piston has a pressure of 600 Pa acting on it. Its area is 3 m². What is the force on the piston, in newtons?',
    answer: 1800,
    hint: 'Force = pressure × area.',
    explanation: 'Force = 600 × 3 = 1800 N. Dividing 600 by 3 gives 200, which would be an area calculation going in the wrong direction.'
  }),

  makeMCQ({
    id: 'g8s-pressure-025', chapterId: CH, difficulty: 2, subsection: 'pressure_calculations',
    question: 'A boy weighing 500 N stands on two feet, each with a contact area of 0.05 m². A girl weighing 400 N stands on one foot with a contact area of 0.04 m². Whose pressure on the floor is greater?',
    options: ['The girl', 'The boy', 'They exert the same pressure', 'Neither exerts any pressure'],
    answer: 'The girl',
    hint: 'Calculate pressure = force ÷ area for each person. Remember the boy uses both feet.',
    explanation: 'Boy: total area = 2 × 0.05 = 0.1 m², pressure = 500 ÷ 0.1 = 5000 Pa. Girl: pressure = 400 ÷ 0.04 = 10 000 Pa. Even though the girl weighs less, her much smaller foot area gives her a higher pressure. A heavier weight alone does not mean more pressure.'
  }),

  makeMCQ({
    id: 'g8s-pressure-026', chapterId: CH, difficulty: 2, subsection: 'pressure_in_fluids',
    question: 'A tractor has very wide, broad tyres. What is the main reason for this design?',
    options: ["To spread the tractor's weight over a large area and reduce pressure on soft ground","To raise the tractor higher so the engine stays clear of mud and water on soft ground","To make the tractor travel faster across muddy fields without the engine working harder","To hold much more air inside so the ride over rough ground is smoother for the driver"],
    answer: 'To spread the tractor\'s weight over a large area and reduce pressure on soft ground',
    hint: 'Think about what happens to soft soil when a large weight is concentrated on a small area.',
    explanation: 'A wider tyre increases the contact area, so the same weight (force) produces lower pressure on the soil — the tractor sinks in less and does less damage. Speed, ride comfort and appearance are not the engineering reason for the width.'
  }),

  makeMCQ({
    id: 'g8s-pressure-027', chapterId: CH, difficulty: 2, subsection: 'pressure_in_fluids',
    question: 'A dam wall holds back a large reservoir. Engineers build the wall much thicker at the bottom than at the top. Why?',
    options: ['Water pressure is greatest at the bottom', 'The wall is heavier at the top', 'The water is hotter at the bottom', 'The top must be narrow to let water flow over it'],
    answer: 'Water pressure is greatest at the bottom',
    hint: 'Pressure in a liquid increases with depth.',
    explanation: 'The deeper the water, the greater the weight of water above and the higher the pressure pushing outward. The base of the dam must withstand the greatest outward force, so it is thickest there. The wall\'s own weight, the temperature of the water, and overflow design are separate considerations.'
  }),

  makeMCQ({
    id: 'g8s-pressure-028', chapterId: CH, difficulty: 3, subsection: 'pressure_in_fluids',
    question: 'A submarine dives from the surface to a depth of 300 m. What happens to the water pressure on its hull?',
    options: ['It increases greatly', 'It stays the same', 'It decreases', 'It first increases then decreases'],
    answer: 'It increases greatly',
    hint: 'Pressure in a liquid depends on depth.',
    explanation: 'Water pressure increases with depth because of the growing weight of water above. At 300 m the hull must withstand far greater pressure than at the surface, which is why submarines are built with thick, reinforced hulls. Pressure does not decrease at any depth, and it does not reverse direction.'
  }),

  makeTF({
    id: 'g8s-pressure-029', chapterId: CH, difficulty: 2, subsection: 'pressure_in_fluids',
    question: 'Atmospheric pressure decreases as you go higher up a mountain.',
    answer: true,
    hint: 'Think about the weight of the air column above you.',
    explanation: '<b>True.</b> Atmospheric pressure is caused by the weight of all the air above you. As you climb, there is less air above, so the pressure falls. This is why the air is "thinner" at high altitude and why unpressurised aircraft cabins become impossible to breathe in above a certain height.'
  }),

  makeMCQ({
    id: 'g8s-pressure-030', chapterId: CH, difficulty: 3, subsection: 'pressure_in_fluids',
    question: 'In a hydraulic braking system, the driver presses a small piston with a force of 50 N over an area of 0.01 m². This pressure is transmitted through oil to a larger piston of area 0.1 m². What force does the larger piston exert?',
    options: ['500 N', '50 N', '5000 N', '5 N'],
    answer: '500 N',
    hint: 'Pressure transmitted = F₁ ÷ A₁. Force at output = pressure × A₂.',
    explanation: 'Pressure = 50 ÷ 0.01 = 5000 Pa. This pressure acts on the larger piston: F₂ = 5000 × 0.1 = 500 N. The hydraulic system multiplies force because the output area is ten times the input area. 5000 N confuses area ratio with force, and 5 N is the input area divided by the output area.'
  }),

  makeNum({
    id: 'g8s-pressure-031', chapterId: CH, difficulty: 3, subsection: 'pressure_calculations',
    question: 'A rectangular block exerts a pressure of 300 Pa on the floor. Its base measures 2 m × 3 m. What is the weight of the block, in newtons?',
    answer: 1800,
    hint: 'Find the area of the base first, then use force = pressure × area.',
    explanation: 'Area = 2 × 3 = 6 m². Force (weight) = pressure × area = 300 × 6 = 1800 N. Adding the dimensions instead of multiplying gives an area of 5, not 6, and forgetting to multiply at all gives 300, which is the pressure alone.'
  }),

  makeMCQ({
    id: 'g8s-pressure-032', chapterId: CH, difficulty: 3, subsection: 'pressure_definition',
    question: 'Atmospheric pressure at sea level is approximately 100 000 Pa. Which statement correctly describes this pressure?',
    options: ["A force of 100 000 N presses on every square metre of surface at sea level","There are 100 000 gas molecules pressing inside every litre of air at sea level","A mass of 100 000 kg rests on every square metre of ground at sea level","The air moves at a speed of 100 000 metres every second at sea level"],
    answer: 'A force of 100 000 N presses on every square metre of surface at sea level',
    hint: 'Use the definition: pressure = force per unit area.',
    explanation: '100 000 Pa means 100 000 N/m², so a column of air above every square metre of the Earth\'s surface weighs about 100 000 N. Mass and force are different quantities, and pressure has nothing to do with speed or counting molecules directly.'
  })

);

})();
