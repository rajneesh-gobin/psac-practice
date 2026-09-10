'use strict';
// Grade 7 Maths — g7m-polygons, batch 2A (012–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-polygons-012', chapterId:'g7m-polygons', difficulty:1,
    subsection:'classifying_polygons',
    question:'What is the name of a polygon with 10 sides?',
    options:['Decagon','Nonagon','Octagon','Heptagon'],
    answer:'Decagon',
    hint:'The prefix "dec-" appears in decade and decimal.',
    explanation:'A decagon has 10 sides. A nonagon has 9, an octagon has 8 and a heptagon has 7, so each of the others is short by one or more sides.' }),

  makeMCQ({ id:'g7m-polygons-013', chapterId:'g7m-polygons', difficulty:2,
    subsection:'classifying_polygons',
    question:'A four-sided shape has all four sides equal in length, but its angles are NOT all equal. What is it?',
    options:['Rhombus','Square','Rectangle','Regular hexagon'],
    answer:'Rhombus',
    hint:'Equal sides alone do not make a shape regular — the angles have to match too.',
    explanation:'A rhombus has four equal sides with two acute and two obtuse angles. A square has equal sides AND equal angles, a rectangle has equal angles but unequal sides, and a regular hexagon has six sides, not four.' }),

  makeMCQ({ id:'g7m-polygons-014', chapterId:'g7m-polygons', difficulty:2,
    subsection:'classifying_polygons',
    question:'One interior angle of a polygon measures more than 180°, so the shape appears "dented". What kind of polygon is this?',
    options:['Concave','Convex','Regular','Similar'],
    answer:'Concave',
    hint:'An angle bigger than 180° is a reflex angle, and it pushes a vertex inwards.',
    explanation:'A polygon with a reflex interior angle is concave. A convex polygon has every interior angle under 180°, "regular" describes equal sides and angles, and "similar" compares two different shapes.' }),

  makeNum({ id:'g7m-polygons-015', chapterId:'g7m-polygons', difficulty:4,
    subsection:'classifying_polygons',
    question:'A vegetable bed at a school garden in Curepipe is a regular octagon, and each of its sides is 1.5 m long. Wire fencing costs Rs 240 per metre. How many rupees will it cost to fence the whole bed?',
    answer:2880,
    hint:'How many sides does an octagon have? Find the perimeter before you touch the price.',
    explanation:'An octagon has 8 equal sides, so the perimeter is 8 × 1.5 = 12 m, and the fencing costs 12 × 240 = Rs 2 880. Multiplying 1.5 × 240 prices one side only (Rs 360), and using 6 sides for a hexagon gives Rs 2 160.' }),

  makeNum({ id:'g7m-polygons-016', chapterId:'g7m-polygons', difficulty:3,
    subsection:'angles_polygons',
    question:'Three of the interior angles of a quadrilateral are 85°, 95° and 110°. What is the size of the fourth angle, in degrees?',
    answer:70,
    hint:'The four interior angles of any quadrilateral add to a fixed total.',
    explanation:'The angles of a quadrilateral total 360°, and 85 + 95 + 110 = 290, so the fourth is 360 − 290 = 70°. Using 180° as the total (the rule for a triangle) would leave a negative angle, which is impossible.' }),

  makeNum({ id:'g7m-polygons-017', chapterId:'g7m-polygons', difficulty:3,
    subsection:'angles_polygons',
    question:'The interior angles of a polygon add up to 1 080°. How many sides does the polygon have?',
    answer:8,
    hint:'The sum of the interior angles is (n − 2) × 180°. Work backwards from 1 080.',
    explanation:'1 080 ÷ 180 = 6, so n − 2 = 6 and n = 8: it is an octagon. Answering 6 stops one step early and forgets to add the 2 back on.' }),

  makeNum({ id:'g7m-polygons-018', chapterId:'g7m-polygons', difficulty:3,
    subsection:'angles_polygons',
    question:'Each interior angle of a regular polygon measures 150°. What is the SUM of all its interior angles, in degrees?',
    answer:1800,
    hint:'Each exterior angle is what is left of a straight line, and the exterior angles of any polygon total 360°.',
    explanation:'The exterior angle is 180 − 150 = 30°, and 360 ÷ 30 = 12 sides. The sum is then (12 − 2) × 180 = 1 800°. Multiplying 150 by 12 gives 1 800 as well — a useful check — but 150 × 10 = 1 500 uses the wrong number of sides.' }),

  makeMCQ({ id:'g7m-polygons-019', chapterId:'g7m-polygons', difficulty:2,
    subsection:'triangles_quadrilaterals',
    question:'Which quadrilateral has diagonals that are equal in length AND cut each other at right angles?',
    options:['Square','Rhombus','Rectangle','Kite'],
    answer:'Square',
    hint:'You need both properties at once, not just one of them.',
    explanation:'Only a square has diagonals that are equal and perpendicular and bisect each other. A rhombus has perpendicular diagonals that are not equal, a rectangle has equal diagonals that are not perpendicular, and a kite has perpendicular diagonals of different lengths.' }),

  makeNum({ id:'g7m-polygons-020', chapterId:'g7m-polygons', difficulty:3,
    subsection:'triangles_quadrilaterals',
    question:'In an isosceles triangle the apex angle is 116°. What is the size of EACH base angle, in degrees?',
    answer:32,
    hint:'The two base angles of an isosceles triangle are equal, and all three add to 180°.',
    explanation:'180 − 116 = 64° is shared equally by the two base angles, so each is 64 ÷ 2 = 32°. Answering 64 gives the two base angles together rather than one of them.' })

);
