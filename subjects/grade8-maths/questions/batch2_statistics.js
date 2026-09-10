'use strict';
// Grade 8 Mathematics - Statistics, batch 2 (012-020).
// Two items read a real pie chart instead of being handed an angle in words.
// The averages are turned round - a missing value from a known mean, a median
// of an EVEN-sized list, the effect of adding a constant to every value, a
// combined mean and a target score - and the comparison item makes the child
// notice equal means with different spreads.
//
// ⚠ ORIGINAL SVG. The sectors are shaded in distinct greys AND labelled with
//   text inside them: a printed paper is monochrome and a child may be
//   colour-blind, so no sector is identified by its shade alone.

(function () {

const CX = 100, CY = 100, R = 75;
const SHADES = ['#ffffff', '#d0d0d0', '#a8a8a8', '#e8e8e8'];
const pt = (deg, r) => [
  (CX + r * Math.sin(deg * Math.PI / 180)).toFixed(1),
  (CY - r * Math.cos(deg * Math.PI / 180)).toFixed(1),
];

// sectors: [[angle in degrees, label]] - must add to 360.
function pie(sectors, alt) {
  let at = 0, g = '';
  sectors.forEach(([ang, label], i) => {
    const [x0, y0] = pt(at, R), [x1, y1] = pt(at + ang, R);
    g += `<path d="M ${CX} ${CY} L ${x0} ${y0} A ${R} ${R} 0 ${ang > 180 ? 1 : 0} 1 ${x1} ${y1} Z" fill="${SHADES[i % 4]}" stroke="#000" stroke-width="1.4"/>`;
    const [lx, ly] = pt(at + ang / 2, 47);
    g += `<text x="${lx}" y="${ly}" font-size="11" text-anchor="middle" dominant-baseline="middle">${label}</text>`;
    at += ang;
  });
  return `<svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${alt}">${g}</svg>`;
}

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8m-statistics-012', chapterId: 'g8m-statistics', difficulty: 2,
    subsection: 'pie_charts',
    question: 'The pie chart shows how <b>72 pupils</b> travel to school. The <b>Bus</b> sector is <b>150&deg;</b>.' +
      pie([[150, 'Bus'], [90, 'Walk'], [75, 'Car'], [45, 'Bike']],
          'A pie chart divided into four labelled sectors: Bus, Walk, Car and Bike.') +
      'How many pupils travel by <b>bus</b>?',
    options: ['30 pupils', '25 pupils', '36 pupils', '40 pupils'],
    answer: '30 pupils',
    hint: 'The whole circle is 360&deg; and stands for all 72 pupils. What fraction of the circle is 150&deg;?',
    explanation: '150/360 of 72 = 72 &times; 150 &divide; 360 = 30 pupils. 36 pupils would be half the school, which would need a 180&deg; sector, and 150 &divide; 5 = 30 only works here by accident of the numbers &mdash; the fraction of 360&deg; is the method that always works.'
  }),

  makeNum({
    id: 'g8m-statistics-013', chapterId: 'g8m-statistics', difficulty: 3,
    subsection: 'pie_charts',
    question: 'Three of the four sectors of this pie chart are labelled.' +
      pie([[120, '120&deg;'], [95, '95&deg;'], [65, '65&deg;'], [80, 'x']],
          'A pie chart divided into four sectors; three are labelled with an angle and the fourth is labelled x.') +
      'Find the angle <b>x</b>, in degrees.',
    answer: 80,
    hint: 'All the sectors of a pie chart must fit exactly into one full turn.',
    explanation: 'The three known sectors come to 120 + 95 + 65 = 280&deg;, and a full circle is 360&deg;, so x = 360 &minus; 280 = 80&deg;. Dividing 360 by 4 gives 90&deg;, which would only be right if all four sectors were equal.'
  }),

  makeMCQ({
    id: 'g8m-statistics-014', chapterId: 'g8m-statistics', difficulty: 4,
    subsection: 'pie_charts',
    question: 'A pie chart shows the family sizes of <b>240 families</b>. The sector for &ldquo;two children&rdquo; is <b>105&deg;</b>, and <b>45 families</b> have no children. How many <b>MORE</b> families have two children than have none?',
    options: ['25 families', '70 families', '45 families', '115 families'],
    answer: '25 families',
    hint: 'Turn the 105&deg; into a number of families first. Only then compare it with the 45.',
    explanation: '105/360 of 240 = 240 &times; 105 &divide; 360 = 70 families with two children, and 70 &minus; 45 = 25 more than the 45 with none. 70 families is the two-child count itself, and 115 adds the two groups instead of comparing them.'
  }),

  makeNum({
    id: 'g8m-statistics-015', chapterId: 'g8m-statistics', difficulty: 3,
    subsection: 'mean_median_mode',
    question: 'The <b>mean</b> of five numbers is <b>14</b>. Four of the numbers are <b>10, 12, 16 and 19</b>. What is the <b>fifth</b> number?',
    answer: 13,
    hint: 'Mean &times; how many numbers there are gives the total. Work that out first.',
    explanation: 'The five numbers must total 5 &times; 14 = 70, and the four given ones come to 57, so the fifth is 70 &minus; 57 = 13. Taking the mean of the four given numbers gives 14.25, which answers a different question.'
  }),

  makeMCQ({
    id: 'g8m-statistics-016', chapterId: 'g8m-statistics', difficulty: 3,
    subsection: 'mean_median_mode',
    question: 'Find the <b>median</b> of: <b>12, 5, 9, 14, 7, 11</b>',
    options: ['10', '9', '11', '9.5'],
    answer: '10',
    hint: 'Put them in order first. With an even number of values there is no single middle one.',
    explanation: 'In order: 5, 7, 9, 11, 12, 14. The two middle values are 9 and 11, so the median is (9 + 11) &divide; 2 = 10. Picking 9 or 11 chooses one middle value and ignores the other, and 9.5 is the mean of 9 and 10.'
  }),

  makeMCQ({
    id: 'g8m-statistics-017', chapterId: 'g8m-statistics', difficulty: 3,
    subsection: 'mean_median_mode',
    question: 'A set of numbers has a <b>mean of 20</b>. Every number in the set is then <b>increased by 5</b>. What is the <b>new mean</b>?',
    options: ['25', '20', '100', '15'],
    answer: '25',
    hint: 'If every value moves up by the same amount, what happens to their total, and to the total shared out?',
    explanation: 'Adding 5 to each of n values adds 5n to the total, and 5n shared between n values is 5, so the mean rises by 5 to 25. The mean does not stay at 20, and multiplying by 5 to get 100 would be the effect of scaling every value, not adding to it.'
  }),

  makeNum({
    id: 'g8m-statistics-018', chapterId: 'g8m-statistics', difficulty: 4,
    subsection: 'mean_median_mode',
    question: 'In a class, <b>12 boys</b> have a mean mark of <b>65</b> and <b>8 girls</b> have a mean mark of <b>75</b>. What is the mean mark of the <b>whole class</b>?',
    answer: 69,
    hint: 'You cannot average two means unless the groups are the same size. Find the two totals instead.',
    explanation: 'The boys total 12 &times; 65 = 780 and the girls 8 &times; 75 = 600, so the class of 20 totals 1,380 and the mean is 1,380 &divide; 20 = 69. Averaging 65 and 75 gives 70, which would only be right if there were equal numbers of boys and girls.'
  }),

  makeMCQ({
    id: 'g8m-statistics-019', chapterId: 'g8m-statistics', difficulty: 3,
    subsection: 'comparing_data',
    question: 'Two netball teams scored these goals in five matches.<br><b>Team X:</b> 3, 3, 4, 10, 10<br><b>Team Y:</b> 6, 6, 6, 6, 6<br>Which statement is correct?',
    options: ['Same mean, but X is more spread out', 'X has a higher mean and a bigger range', 'Same mode, but Y is more spread out', 'Y has a higher mean than X'],
    answer: 'Same mean, but X is more spread out',
    hint: 'Work out both means before you look at anything else, then compare the ranges.',
    explanation: 'Both teams total 30 goals over 5 matches, so both have a mean of 6. Team X ranges from 3 to 10 (a range of 7) while Team Y never varies (range 0), so X is far more spread out even though the averages match &mdash; which is why a mean on its own never tells the whole story.'
  }),

  makeNum({
    id: 'g8m-statistics-020', chapterId: 'g8m-statistics', difficulty: 4,
    subsection: 'comparing_data',
    question: 'Priya&rsquo;s <b>mean</b> mark over <b>4</b> tests is <b>72</b>. She wants her mean over <b>5</b> tests to be <b>75</b>. What must she score in the <b>fifth</b> test?',
    answer: 87,
    hint: 'Work out the total she has now and the total she needs, then compare them.',
    explanation: 'She has 4 &times; 72 = 288 marks and needs 5 &times; 75 = 375, so the fifth test must give 375 &minus; 288 = 87. Answering 75 assumes one test at the target mean is enough, but the four tests below it have to be pulled up as well.'
  })

);

})();
