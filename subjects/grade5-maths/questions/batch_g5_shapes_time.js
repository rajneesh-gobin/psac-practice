'use strict';

(function () {

STATIC_QUESTIONS.push(

  makeTF({ id:'G5SH01', chapterId:'geometry', subsection:'2d_shapes', difficulty:1,
    question:'A rectangle has two pairs of equal opposite sides and ALL four angles are right angles (90°).',
    answer:true,
    hint:'Think about the corners of a rectangle — are they all the same?',
    explanation:'<b>True.</b> A rectangle has 2 pairs of equal opposite sides and 4 right angles (90°). A square is a special rectangle where ALL 4 sides are equal.' }),

  makeMCQ({ id:'G5SH02', chapterId:'geometry', subsection:'2d_shapes', difficulty:1,
    question:'How many lines of symmetry does a SQUARE have?',
    options:['2','3','4','1'],
    answer:'4',
    hint:'Try folding along: both diagonals, and both lines through midpoints of opposite sides.',
    explanation:'A square has <b>4 lines of symmetry</b>: 2 through the midpoints of opposite sides, and 2 through opposite corners (the diagonals). A rectangle (that is not a square) has only 2.' }),

  makeMCQ({ id:'G5SH03', chapterId:'geometry', subsection:'2d_shapes', difficulty:1,
    question:'An EQUILATERAL triangle has three equal sides. What is the size of EACH angle?',
    options:['45°','60°','90°','30°'],
    answer:'60°',
    hint:'All three angles are equal and must add up to 180°. Divide 180° by 3.',
    explanation:'In an equilateral triangle all 3 angles are equal. 180° ÷ 3 = <b>60°</b>. An equilateral triangle also has 3 lines of symmetry.' }),

  makeTF({ id:'G5SH04', chapterId:'geometry', subsection:'2d_shapes', difficulty:1,
    question:'An isosceles triangle has EXACTLY TWO equal sides and exactly TWO equal angles.',
    answer:true,
    hint:'Iso- means equal. Picture a triangle where two legs are the same length.',
    explanation:'<b>True.</b> An isosceles triangle has 2 equal sides (the legs) and 2 equal base angles. It has 1 line of symmetry running from the apex to the midpoint of the base.' }),

  makeMCQ({ id:'G5SH05', chapterId:'geometry', subsection:'2d_shapes', difficulty:2,
    question:'A SCALENE triangle has — ',
    options:[
      'all three sides equal',
      'two sides equal',
      'no two sides equal',
      'one right angle'
    ],
    answer:'no two sides equal',
    hint:'Scalene means uneven — think of three completely different side lengths.',
    explanation:'A <b>scalene triangle</b> has <b>no two sides equal</b> and no two angles equal. It has no lines of symmetry. (A triangle can be scalene AND right-angled at the same time.)' }),

  makeTF({ id:'G5SH06', chapterId:'geometry', subsection:'2d_shapes', difficulty:1,
    question:'A right-angled triangle always contains one angle that is exactly 90°.',
    answer:true,
    hint:'The little square symbol in a corner of a triangle marks a right angle.',
    explanation:'<b>True.</b> A right-angled triangle always has one 90° angle. The other two angles must add up to 90° (since all three angles sum to 180°).' }),

  makeMCQ({ id:'G5SH07', chapterId:'geometry', subsection:'2d_shapes', difficulty:1,
    question:'The DIAMETER of a circle is — ',
    options:[
      'the distance from the centre to the edge',
      'the distance all the way around the outside',
      'a line from one side to the other passing through the centre',
      'half the radius'
    ],
    answer:'a line from one side to the other passing through the centre',
    hint:'Diameter goes all the way across. Radius only goes halfway.',
    explanation:'The <b>diameter</b> passes through the centre from one side of the circle to the other. Diameter = 2 × radius. The distance from the centre to the edge is the <b>radius</b>, and the distance all the way round is the <b>circumference</b>.' }),

  makeNum({ id:'G5SH08', chapterId:'geometry', subsection:'2d_shapes', difficulty:2,
    question:'A circle has a radius of 7 cm. What is its DIAMETER in centimetres?',
    answer:14,
    hint:'Diameter = 2 × radius.',
    explanation:'Diameter = 2 × 7 = <b>14 cm</b>. The radius is the distance from the centre to any point on the circle; the diameter is twice that.' }),

  makeMCQ({ id:'G5SH09', chapterId:'geometry', subsection:'2d_shapes', difficulty:2,
    question:'A REGULAR polygon has all sides equal and all angles equal. Which of these is a regular polygon with 6 sides?',
    options:['Pentagon','Octagon','Hexagon','Heptagon'],
    answer:'Hexagon',
    hint:'Count: penta=5, hexa=6, hepta=7, octa=8.',
    explanation:'A <b>hexagon</b> has 6 sides. A regular hexagon has all 6 sides equal and all 6 angles equal (each angle = 120°). A regular pentagon has 5 sides, a regular octagon has 8 sides.' }),

  makeTF({ id:'G5SH10', chapterId:'geometry', subsection:'2d_shapes', difficulty:1,
    question:'The four angles of any quadrilateral always add up to 360°.',
    answer:true,
    hint:'A quadrilateral can be split into 2 triangles, each with angles summing to 180°.',
    explanation:'<b>True.</b> Any quadrilateral (4-sided shape) has interior angles summing to 360°. This is true for squares, rectangles, parallelograms, trapeziums and any irregular 4-sided shape.' }),

  makeMCQ({ id:'G5SH11', chapterId:'geometry', subsection:'2d_shapes', difficulty:2,
    question:'Which statement about a PARALLELOGRAM is correct?',
    options:[
      'All four angles are right angles',
      'Opposite sides are equal and parallel, opposite angles are equal',
      'All four sides are equal',
      'It has 4 lines of symmetry'
    ],
    answer:'Opposite sides are equal and parallel, opposite angles are equal',
    hint:'A parallelogram is like a pushed-over rectangle.',
    explanation:'A <b>parallelogram</b> has opposite sides that are equal and parallel, and opposite angles that are equal. Unlike a rectangle, its angles are not 90° (unless it is a rectangle). A rhombus is a parallelogram with all 4 sides equal.' }),

  makeNum({ id:'G5SH12', chapterId:'geometry', subsection:'2d_shapes', difficulty:2,
    question:'How many DIAGONALS does a rectangle have? (A diagonal joins two non-adjacent corners.)',
    answer:2,
    hint:'Draw a rectangle. How many straight lines can you draw from corner to corner without going along a side?',
    explanation:'A rectangle has <b>2 diagonals</b> — one from each pair of opposite corners. Both diagonals of a rectangle are equal in length and bisect each other (cut each other in half at the midpoint).' }),

  // ── Time questions ──────────────────────────────────────────────

  makeMCQ({ id:'G5TM01', chapterId:'time', subsection:'reading', difficulty:1,
    question:'What does "quarter to 8" mean in digital (12-hour) format?',
    options:['8:15','7:45','8:45','7:15'],
    answer:'7:45',
    hint:'"Quarter to 8" means 15 minutes BEFORE 8 o\'clock.',
    explanation:'"Quarter to 8" = 15 minutes before 8:00 = <b>7:45</b>. "Quarter past" means 15 minutes after the hour; "quarter to" means 15 minutes before the next hour.' }),

  makeMCQ({ id:'G5TM02', chapterId:'time', subsection:'reading', difficulty:1,
    question:'A clock shows the minute hand pointing to the 5 and the hour hand between 4 and 5. What time does the clock show?',
    options:['5:20','4:25','4:05','5:25'],
    answer:'4:25',
    hint:'The minute hand on the 5 means 25 minutes past. The hour hand is between 4 and 5, so the hour is 4.',
    explanation:'Minute hand on 5 = 5 × 5 = <b>25 minutes</b>. Hour hand between 4 and 5 = hour is 4. So the time is <b>4:25</b>.' }),

  makeNum({ id:'G5TM03', chapterId:'time', subsection:'conversion', difficulty:1,
    question:'How many MINUTES are there in 3 hours and 30 minutes?',
    answer:210,
    hint:'1 hour = 60 minutes. Find the minutes for 3 hours, then add 30.',
    explanation:'3 hours = 3 × 60 = 180 minutes. 180 + 30 = <b>210 minutes</b>.' }),

  makeMCQ({ id:'G5TM04', chapterId:'time', subsection:'conversion', difficulty:2,
    question:'Convert 135 minutes into hours and minutes.',
    options:['1 hour 35 minutes','2 hours 15 minutes','2 hours 35 minutes','1 hour 45 minutes'],
    answer:'2 hours 15 minutes',
    hint:'How many complete hours fit into 135 minutes? 60 fits twice (120). What is left over?',
    explanation:'135 ÷ 60 = 2 remainder 15. So 135 minutes = <b>2 hours 15 minutes</b>.' }),

  makeMCQ({ id:'G5TM05', chapterId:'time', subsection:'duration', difficulty:2,
    question:'A TV programme starts at 6:30 pm and lasts 45 minutes. At what time does it end?',
    options:['7:15 pm','7:05 pm','7:25 pm','7:30 pm'],
    answer:'7:15 pm',
    hint:'Add 45 minutes to 6:30. 6:30 + 30 min = 7:00, then add 15 more minutes.',
    explanation:'6:30 pm + 30 min = 7:00 pm. 7:00 pm + 15 min = <b>7:15 pm</b>. Total added: 30 + 15 = 45 minutes ✓' }),

  makeNum({ id:'G5TM06', chapterId:'time', subsection:'duration', difficulty:1,
    question:'How many hours are there from 9:00 am to 3:00 pm?',
    answer:6,
    hint:'Count forward from 9 am: 10, 11, 12 noon, 1, 2, 3.',
    explanation:'From 9:00 am to 3:00 pm = <b>6 hours</b>. (9 am → 12 noon = 3 hours; 12 noon → 3 pm = 3 hours; 3 + 3 = 6.)' }),

  makeNum({ id:'G5TM07', chapterId:'time', subsection:'duration', difficulty:1,
    question:'It is 11:50 am. How many minutes until 12:00 noon?',
    answer:10,
    hint:'Count from 11:50 up to 12:00.',
    explanation:'From 11:50 to 12:00 = <b>10 minutes</b>. 12:00 − 11:50 = 10.' }),

  makeMCQ({ id:'G5TM08', chapterId:'time', subsection:'duration', difficulty:2,
    question:'A family arrives at a restaurant at 4:15 pm and leaves at 6:00 pm. How long did they stay?',
    options:['1 hour 30 minutes','1 hour 45 minutes','2 hours','1 hour 15 minutes'],
    answer:'1 hour 45 minutes',
    hint:'From 4:15 to 5:15 = 1 hour. From 5:15 to 6:00 = 45 minutes. Add them.',
    explanation:'4:15 to 5:15 = 1 hour. 5:15 to 6:00 = 45 minutes. Total = <b>1 hour 45 minutes</b>.' })

);

})();
