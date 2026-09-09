'use strict';
// Top-up: 5 × mass_kg_g, 5 × perimeter_area (both subsections were at 15).

(function () {

// ── ch07 measurement — mass_kg_g top-up ──────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3mth-msr-056', chapterId:'g3mth-measurement', difficulty:1, subsection:'mass_kg_g',
    question:'A bag of flour weighs 2 kg. How many grams is that?',
    options:['2000 g','200 g','20 g','2 g'],
    answer:'2000 g',
    hint:'1 kg = 1000 g. Multiply the kilograms by 1000.',
    explanation:'<b>2000 g</b>. 2 kg × 1000 = 2000 g.' }),

  makeMCQ({ id:'g3mth-msr-057', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'Rani\'s school bag weighs 3 kg 200 g. How many grams is that altogether?',
    options:['3200 g','3020 g','3002 g','320 g'],
    answer:'3200 g',
    hint:'Change the kg to g first (3 kg = 3000 g), then add the extra grams.',
    explanation:'<b>3200 g</b>. 3 kg = 3000 g, plus 200 g = 3200 g.' }),

  makeMCQ({ id:'g3mth-msr-058', chapterId:'g3mth-measurement', difficulty:2, subsection:'mass_kg_g',
    question:'Which is heavier: 2500 g or 3 kg?',
    options:['3 kg','2500 g','they are equal','cannot tell'],
    answer:'3 kg',
    hint:'Convert 3 kg to grams first.',
    explanation:'<b>3 kg</b>. 3 kg = 3000 g, which is more than 2500 g.' }),

  makeMCQ({ id:'g3mth-msr-059', chapterId:'g3mth-measurement', difficulty:3, subsection:'mass_kg_g',
    question:'Dev buys 1 kg 500 g of rice and 800 g of sugar. What is the total mass?',
    options:['2300 g','2100 g','1300 g','2500 g'],
    answer:'2300 g',
    hint:'1 kg 500 g = 1500 g. Add 800 g.',
    explanation:'<b>2300 g</b>. 1500 g + 800 g = 2300 g (or 2 kg 300 g).' }),

  makeMCQ({ id:'g3mth-msr-060', chapterId:'g3mth-measurement', difficulty:4, subsection:'mass_kg_g',
    question:'A box of apples weighs 4 kg. Priya takes out 750 g. How much is left in the box?',
    options:['3250 g','3750 g','3500 g','4750 g'],
    answer:'3250 g',
    hint:'4 kg = 4000 g. Subtract 750 g.',
    explanation:'<b>3250 g</b>. 4000 g − 750 g = 3250 g.' })

);

// ── ch08 geometry — perimeter_area top-up ─────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3mth-geo-056', chapterId:'g3mth-geometry', difficulty:1, subsection:'perimeter_area',
    question:'What is the perimeter of a square with sides of 6 cm?',
    options:['24 cm','12 cm','36 cm','18 cm'],
    answer:'24 cm',
    hint:'A square has 4 equal sides. Multiply one side by 4.',
    explanation:'<b>24 cm</b>. 6 cm × 4 = 24 cm.' }),

  makeMCQ({ id:'g3mth-geo-057', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'A rectangle is 9 cm long and 4 cm wide. What is its perimeter?',
    options:['26 cm','36 cm','13 cm','22 cm'],
    answer:'26 cm',
    hint:'Perimeter = 2 × (length + width).',
    explanation:'<b>26 cm</b>. 2 × (9 + 4) = 2 × 13 = 26 cm.' }),

  makeMCQ({ id:'g3mth-geo-058', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'A shape is made of 12 square units. What is its area?',
    options:['12 square units','6 square units','24 square units','10 square units'],
    answer:'12 square units',
    hint:'Area = the number of unit squares inside the shape.',
    explanation:'<b>12 square units</b>. Count all the squares: 12.' }),

  makeMCQ({ id:'g3mth-geo-059', chapterId:'g3mth-geometry', difficulty:3, subsection:'perimeter_area',
    question:'A rectangle is 7 m long and 3 m wide. What is its area?',
    options:['21 m²','20 m²','10 m²','14 m²'],
    answer:'21 m²',
    hint:'Area of a rectangle = length × width.',
    explanation:'<b>21 m²</b>. 7 m × 3 m = 21 m².' }),

  makeMCQ({ id:'g3mth-geo-060', chapterId:'g3mth-geometry', difficulty:4, subsection:'perimeter_area',
    question:'A garden is 8 m long and 5 m wide. Raj wants to put a fence all the way around it. How many metres of fence does he need?',
    options:['26 m','40 m','13 m','16 m'],
    answer:'26 m',
    hint:'Fence length = perimeter. Perimeter = 2 × (length + width).',
    explanation:'<b>26 m</b>. 2 × (8 + 5) = 2 × 13 = 26 m.' })

);

})();
