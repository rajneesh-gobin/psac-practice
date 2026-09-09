'use strict';

const G1M_SYLLABUS = {
  'g1mth-numbers': { subsections: [
    { id: 'counting_ordering', name: 'Counting & Ordering' },
    { id: 'number_words',      name: 'Number Words' },
    { id: 'odd_even',          name: 'Odd and Even Numbers' },
  ]},
  'g1mth-addition': { subsections: [
    { id: 'adding_within_10',  name: 'Adding to 10' },
    { id: 'adding_within_20',  name: 'Adding to 20' },
    { id: 'number_sentences',  name: 'Number Sentences' },
  ]},
  'g1mth-subtraction': { subsections: [
    { id: 'subtracting_within_10', name: 'Taking Away within 10' },
    { id: 'subtracting_within_20', name: 'Taking Away within 20' },
    { id: 'missing_numbers',       name: 'Finding the Missing Number' },
  ]},
  'g1mth-shapes': { subsections: [
    { id: '2d_shapes',          name: '2D Shapes' },
    { id: 'properties_shapes',  name: 'Sides and Corners' },
    { id: 'position_direction', name: 'Position Words' },
  ]},
  'g1mth-measurement': { subsections: [
    { id: 'comparing_length',   name: 'Comparing Length' },
    { id: 'comparing_mass',     name: 'Comparing Mass' },
    { id: 'comparing_capacity', name: 'Comparing Capacity' },
  ]},
  'g1mth-patterns': { subsections: [
    { id: 'repeating_patterns', name: 'Repeating Patterns' },
    { id: 'number_patterns',    name: 'Number Patterns' },
    { id: 'odd_even_patterns',  name: 'Odd and Even' },
  ]},
};

registerSubject({
  id:         'grade1-maths',
  name:       'Mathematics',
  grade:      1,
  icon:       '🔢',
  subject:    'Maths',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  noDifficulty: false,
  syllabus:   G1M_SYLLABUS,
  chapters: [
    { id: 'g1mth-numbers', name: 'Numbers to 20', icon: '🔢', examWeight: 3,
      syllabus: 'Count, read and write numbers from 1 to 20. Order numbers — what comes before, after and between. Recognise odd and even numbers. Write number words: one to twenty.' },
    { id: 'g1mth-addition', name: 'Addition', icon: '➕', examWeight: 3,
      syllabus: 'Combine groups of objects and count the total. Learn addition facts to 10 and to 20. Write and solve number sentences: 5 + 3 = □. Understand the + sign and = sign.' },
    { id: 'g1mth-subtraction', name: 'Subtraction', icon: '➖', examWeight: 3,
      syllabus: 'Take away objects from a group and count what is left. Learn subtraction facts within 20. Write and solve subtraction sentences: 8 − 3 = □. Find the missing number.' },
    { id: 'g1mth-shapes', name: 'Shapes and Space', icon: '🔷', examWeight: 2,
      syllabus: 'Name and recognise 2D shapes: circle, square, rectangle and triangle. Count the sides and corners of each shape. Describe position using words: above, below, left, right, in front, behind.' },
    { id: 'g1mth-measurement', name: 'Measurement', icon: '📏', examWeight: 2,
      syllabus: 'Compare the length of objects: longer, shorter, tallest, shortest. Compare the mass of objects: heavier, lighter, same. Compare capacity: which container holds more, less or the same.' },
    { id: 'g1mth-patterns', name: 'Patterns', icon: '🔁', examWeight: 2,
      syllabus: 'Create and continue repeating patterns with shapes and colours. Count in 2s, 5s and 10s. Identify odd numbers (1, 3, 5…) and even numbers (2, 4, 6…).' },
  ],
});
