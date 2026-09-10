'use strict';

(function () {

const CH = 'g8s-food';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8s-food-016', chapterId: CH, difficulty: 2, subsection: 'food_groups_nutrients',
    question: 'A food sample is heated with Benedict’s solution and turns brick-red. Which nutrient is present?',
    options: ['Glucose', 'Starch', 'Protein', 'Fat'],
    answer: 'Glucose',
    hint: 'Benedict’s solution must be heated, and it changes from blue to brick-red for one kind of sugar.',
    explanation: 'Benedict’s solution tests for reducing sugars such as glucose and turns brick-red on heating. Starch is found with iodine (blue-black), protein with Biuret solution (purple) and fat with the grease-spot or ethanol test.'
  }),

  makeMCQ({
    id: 'g8s-food-017', chapterId: CH, difficulty: 2, subsection: 'deficiency_diseases',
    question: 'A woman is often tired and breathless, and the clinic finds she has too little haemoglobin in her blood. Which meal would help most?',
    options: ['Lentils and spinach', 'Cassava and honey', 'Butter and cream', 'Rice and noodles'],
    answer: 'Lentils and spinach',
    hint: 'Haemoglobin cannot be built without one particular mineral.',
    explanation: 'Low haemoglobin is anaemia, caused by a shortage of iron, and lentils and dark green leaves are rich in iron. Cassava and honey are mostly carbohydrate, butter and cream are mostly fat, and rice and noodles are starch — none of them supplies much iron.'
  }),

  makeText({
    id: 'g8s-food-018', chapterId: CH, difficulty: 2, subsection: 'deficiency_diseases',
    question: 'A person’s thyroid gland swells into a goitre because one mineral is missing from their diet. Name that mineral.',
    answer: 'iodine',
    alsoAccept: ['iodide'],
    hint: 'It is added to table salt in many countries for exactly this reason.',
    explanation: 'The thyroid gland needs iodine to make its hormone, and without it the gland swells into a goitre. Iron deficiency causes anaemia and calcium deficiency weakens bones — neither affects the thyroid.'
  }),

  makeMCQ({
    id: 'g8s-food-019', chapterId: CH, difficulty: 3, subsection: 'balanced_diet',
    question: 'A pupil eats bread with jam for breakfast, chips for lunch, and rice with oil for dinner. Which nutrient is most clearly missing from the whole day?',
    options: ['Protein', 'Starch', 'Fat', 'Sugar'],
    answer: 'Protein',
    hint: 'Look for the nutrient used to build and repair the body — which food on the list supplies it?',
    explanation: 'Every item listed is starch, fat or sugar, and nothing supplies protein for growth and repair — no fish, meat, egg, dal or milk appears. Starch comes from the bread, chips and rice, fat from the oil and chips, and sugar from the jam.'
  }),

  makeMCQ({
    id: 'g8s-food-020', chapterId: CH, difficulty: 2, subsection: 'food_groups_nutrients',
    question: 'Which nutrient class is needed in only tiny amounts each day, yet the body cannot work properly without it?',
    options: ['Vitamins', 'Carbohydrates', 'Proteins', 'Fats'],
    answer: 'Vitamins',
    hint: 'Think about which nutrients are measured in milligrams rather than in grams.',
    explanation: 'Vitamins are micronutrients: a few milligrams a day is enough, but a shortage causes diseases such as scurvy or rickets. Carbohydrates, proteins and fats are macronutrients, needed in tens or hundreds of grams a day.'
  })

);

})();
