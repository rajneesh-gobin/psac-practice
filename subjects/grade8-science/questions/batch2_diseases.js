'use strict';

(function () {

const CH = 'g8s-diseases';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8s-diseases-016', chapterId: CH, difficulty: 3, subsection: 'prevention_control',
    question: 'After heavy cyclone rain, health teams in Mauritius go house to house asking families to empty flower-pot saucers, old tyres and buckets. Which disease are they fighting?',
    options: ['Dengue', 'Cholera', 'Tetanus', 'Rabies'],
    answer: 'Dengue',
    hint: 'The rubbish they name all holds one thing after rain, and one kind of insect needs it.',
    explanation: 'Dengue is carried by <i>Aedes</i> mosquitoes, which lay their eggs in small pools of clean standing water, so emptying containers removes the breeding sites. Cholera comes from contaminated drinking water, tetanus from spores in soil entering a wound, and rabies from an animal bite — none of them breeds in a flower-pot saucer.'
  }),

  makeMCQ({
    id: 'g8s-diseases-017', chapterId: CH, difficulty: 2, subsection: 'disease_spread',
    question: 'Explain why emptying containers of standing water lowers the number of dengue cases.',
    options: ['It removes breeding sites', 'It kills the dengue virus', 'It cleans the drinking water', 'It stops flies reaching food'],
    answer: 'It removes breeding sites',
    hint: 'The measure works on the insect that carries the disease, not on the germ itself.',
    explanation: 'Mosquito larvae can only develop in standing water, so removing it breaks the life cycle and fewer adult mosquitoes are around to bite. Tipping water out does not kill the virus, dengue is not spread by drinking water, and houseflies play no part in it.'
  }),

  makeText({
    id: 'g8s-diseases-018', chapterId: CH, difficulty: 2, subsection: 'communicable_noncommunicable',
    question: 'Diabetes, cancer and heart disease cannot be passed from one person to another. What type of disease are they called?',
    answer: 'non-communicable',
    alsoAccept: ['noncommunicable', 'non communicable', 'non-communicable disease', 'non-communicable diseases', 'non-infectious'],
    hint: 'The word is the opposite of the one used for diseases that ARE passed on.',
    explanation: 'They are non-communicable diseases: they have no germ to pass on and are linked to diet, exercise, smoking and inherited factors. Communicable diseases such as flu or cholera are caused by pathogens and can spread from person to person.'
  }),

  makeMCQ({
    id: 'g8s-diseases-019', chapterId: CH, difficulty: 2, subsection: 'communicable_noncommunicable',
    question: 'Which of these diseases is caused by a virus?',
    options: ['Chikungunya', 'Cholera', 'Tetanus', 'Scurvy'],
    answer: 'Chikungunya',
    hint: 'One of the four cannot be treated with antibiotics, and one is not caused by a germ at all.',
    explanation: 'Chikungunya is a viral disease spread by mosquitoes. Cholera and tetanus are both caused by bacteria, and scurvy is not caused by a germ at all — it is a deficiency disease from too little vitamin C.'
  }),

  makeMCQ({
    id: 'g8s-diseases-020', chapterId: CH, difficulty: 3, subsection: 'prevention_control',
    question: 'A cyclone damages the water pipes in a village, and families are told to boil all drinking water. Which disease is this mainly protecting them from?',
    options: ['Typhoid', 'Asthma', 'Anaemia', 'Rickets'],
    answer: 'Typhoid',
    hint: 'Boiling kills germs in water, so the disease must be one carried by water.',
    explanation: 'Typhoid is caused by bacteria carried in water contaminated with sewage, and boiling kills them. Asthma is triggered by dust and allergens in the air, while anaemia and rickets are deficiency conditions caused by too little iron and too little vitamin D.'
  })

);

})();
