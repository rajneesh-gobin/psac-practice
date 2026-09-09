'use strict';

const G3HE_SYLLABUS = {
  'g3he-hygiene': { subsections: [
    { id: 'body_hygiene',     name: 'Body Hygiene' },
    { id: 'disease_prevention', name: 'Preventing Disease' },
    { id: 'community_hygiene', name: 'Hygiene in the Community' },
  ]},
  'g3he-nutrition': { subsections: [
    { id: 'nutrients',        name: 'Nutrients and Their Functions' },
    { id: 'food_energy',      name: 'Food for Energy, Growth and Health' },
    { id: 'water_diet',       name: 'Water and a Balanced Diet' },
  ]},
  'g3he-safety': { subsections: [
    { id: 'accident_prevention', name: 'Preventing Accidents' },
    { id: 'road_water_safety',   name: 'Road and Water Safety' },
    { id: 'emergency_response',  name: 'Emergency Response' },
  ]},
};

registerSubject({
  id:         'grade3-health',
  name:       'Health Education',
  grade:      3,
  icon:       '❤️',
  subject:    'Health Education',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  syllabus:   G3HE_SYLLABUS,
  chapters: [
    { id: 'g3he-hygiene',   name: 'Hygiene and Disease Prevention', icon: '🧼', examWeight: 3,
      syllabus: 'Understand personal body hygiene in detail. Know how communicable diseases spread and are prevented. Understand the importance of community hygiene: clean water, waste disposal and environment.' },
    { id: 'g3he-nutrition', name: 'Nutrition and Healthy Eating', icon: '🥗', examWeight: 3,
      syllabus: 'Know the main nutrients (carbohydrates, proteins, fats, vitamins, minerals, water) and their functions. Understand which foods provide energy, growth and health maintenance. Know why water is essential and what a balanced diet is.' },
    { id: 'g3he-safety',    name: 'Safety and First Aid', icon: '⛑️', examWeight: 2,
      syllabus: 'Identify and prevent accidents at home, school and in the community. Know road and water safety rules. Know what to do in an emergency and when to call for help.' },
  ],
});
