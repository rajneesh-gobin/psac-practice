'use strict';

const G1HE_SYLLABUS = {
  'g1he-hygiene': { subsections: [
    { id: 'personal_hygiene', name: 'Personal Hygiene' },
    { id: 'hand_washing',     name: 'Hand Washing' },
    { id: 'dental_care',      name: 'Caring for Our Teeth' },
  ]},
  'g1he-nutrition': { subsections: [
    { id: 'food_groups',      name: 'Food Groups' },
    { id: 'healthy_meals',    name: 'Healthy Meals' },
    { id: 'healthy_snacks',   name: 'Healthy Snacks' },
  ]},
  'g1he-safety': { subsections: [
    { id: 'school_safety',    name: 'Keeping Safe at School' },
    { id: 'home_safety',      name: 'Keeping Safe at Home' },
    { id: 'environment',      name: 'Dangers in Our Environment' },
  ]},
};

registerSubject({
  id:         'grade1-health',
  name:       'Health Education',
  grade:      1,
  icon:       '❤️',
  subject:    'Health Education',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  syllabus:   G1HE_SYLLABUS,
  chapters: [
    { id: 'g1he-hygiene',   name: 'Personal Hygiene', icon: '🪥', examWeight: 3,
      syllabus: 'Learn good hygiene habits: washing hands, brushing teeth, taking a shower and wearing clean clothes. Learn the 5 steps of proper hand washing. Understand why being clean keeps us healthy. Learn how to manage coughing and sneezing safely.' },
    { id: 'g1he-nutrition', name: 'Food and Nutrition', icon: '🥗', examWeight: 3,
      syllabus: 'Learn about the different foods we eat every day. Know what is healthy and less healthy. Understand breakfast, lunch and dinner. Choose healthy snacks. Eat clean and safe foods.' },
    { id: 'g1he-safety',    name: 'Keeping Safe', icon: '⛑️', examWeight: 2,
      syllabus: 'Learn how to keep safe at school indoors and outdoors. Identify dangers in the school environment. Know what to do in unsafe situations. Understand basic safety rules.' },
  ],
});
