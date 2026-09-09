'use strict';

const G2HE_SYLLABUS = {
  'g2he-hygiene': { subsections: [
    { id: 'grooming',         name: 'Grooming and Personal Care' },
    { id: 'hand_dental',      name: 'Hand Washing and Dental Care' },
    { id: 'illness_hygiene',  name: 'Preventing the Spread of Illness' },
  ]},
  'g2he-nutrition': { subsections: [
    { id: 'food_groups',      name: 'Food Groups and Nutrients' },
    { id: 'balanced_meals',   name: 'Balanced Meals' },
    { id: 'food_safety',      name: 'Clean and Safe Food' },
  ]},
  'g2he-safety': { subsections: [
    { id: 'home_safety',      name: 'Keeping Safe at Home' },
    { id: 'road_safety',      name: 'Road Safety' },
    { id: 'first_aid_basics', name: 'Basic First Aid' },
  ]},
};

registerSubject({
  id:         'grade2-health',
  name:       'Health Education',
  grade:      2,
  icon:       '❤️',
  subject:    'Health Education',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  syllabus:   G2HE_SYLLABUS,
  chapters: [
    { id: 'g2he-hygiene',   name: 'Hygiene and Grooming', icon: '🪥', examWeight: 3,
      syllabus: 'Understand the importance of daily grooming. Learn thorough hand washing and tooth brushing technique. Know how coughs, sneezes and dirty hands spread illness. Practise habits that prevent illness spreading.' },
    { id: 'g2he-nutrition', name: 'Food, Nutrition and Safety', icon: '🥗', examWeight: 3,
      syllabus: 'Know the main food groups and what each provides. Understand what makes a balanced meal. Learn how to choose healthy snacks and drinks. Understand safe food handling and storage.' },
    { id: 'g2he-safety',    name: 'Keeping Safe', icon: '⛑️', examWeight: 2,
      syllabus: 'Identify common hazards at home. Know road safety rules. Understand what to do in simple emergencies. Learn the basics of calling for help.' },
  ],
});
