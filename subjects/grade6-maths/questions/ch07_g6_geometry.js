'use strict';
// Grade 6 Maths — Chapter: Geometry (angles, triangles, parallel/perpendicular)
// IDs format: g6m-geo-NNN

// Angle types diagram
const _SVG_ANGLES = `<svg viewBox="0 0 300 80" width="300" height="80" style="display:block;margin:6px auto;background:#fefce8;border-radius:8px;border:1px solid #fde68a">
  <line x1="10" y1="65" x2="70" y2="65" stroke="#1e40af" stroke-width="2"/>
  <line x1="10" y1="65" x2="45" y2="30" stroke="#1e40af" stroke-width="2"/>
  <path d="M28,65 A18,18 0 0,0 22,47" fill="none" stroke="#dc2626" stroke-width="1.5"/>
  <text x="40" y="75" font-size="7.5" fill="#1e40af" text-anchor="middle">Acute</text>
  <text x="40" y="83" font-size="6.5" fill="#64748b" text-anchor="middle">&lt;90°</text>
  <line x1="95" y1="65" x2="165" y2="65" stroke="#1e40af" stroke-width="2"/>
  <line x1="95" y1="65" x2="95" y2="15" stroke="#1e40af" stroke-width="2"/>
  <rect x="95" y="55" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>
  <text x="130" y="75" font-size="7.5" fill="#1e40af" text-anchor="middle">Right angle</text>
  <text x="130" y="83" font-size="6.5" fill="#64748b" text-anchor="middle">= 90°</text>
  <line x1="185" y1="65" x2="265" y2="65" stroke="#1e40af" stroke-width="2"/>
  <line x1="185" y1="65" x2="230" y2="20" stroke="#1e40af" stroke-width="2"/>
  <path d="M205,65 A20,20 0 0,0 212,47" fill="none" stroke="#dc2626" stroke-width="1.5"/>
  <text x="225" y="75" font-size="7.5" fill="#1e40af" text-anchor="middle">Obtuse</text>
  <text x="225" y="83" font-size="6.5" fill="#64748b" text-anchor="middle">90°–180°</text>
</svg>`;

// Triangle types
const _SVG_TRIANGLES = `<svg viewBox="0 0 300 70" width="300" height="70" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <polygon points="10,65 60,10 110,65" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="60" y="75" font-size="7" fill="#14532d" text-anchor="middle">Equilateral</text>
  <text x="60" y="83" font-size="6" fill="#64748b" text-anchor="middle">3 equal sides &amp; angles</text>
  <polygon points="120,65 155,10 210,65" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="165" y="75" font-size="7" fill="#14532d" text-anchor="middle">Isosceles</text>
  <text x="165" y="83" font-size="6" fill="#64748b" text-anchor="middle">2 equal sides</text>
  <polygon points="220,65 235,10 295,65" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="258" y="75" font-size="7" fill="#14532d" text-anchor="middle">Scalene</text>
  <text x="258" y="83" font-size="6" fill="#64748b" text-anchor="middle">No equal sides</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-geo-001', chapterId:'g6-geometry', difficulty:1,
    question:`${_SVG_ANGLES}Look at the diagram. Which type of angle is LESS than 90°?`,
    options:['Obtuse angle','Right angle','Acute angle','Reflex angle'],
    answer:'Acute angle',
    hint:'The leftmost angle in the diagram is smaller than a right angle.',
    explanation:'An <b>acute angle</b> is any angle that measures less than 90°. A right angle is exactly 90°, and an obtuse angle is between 90° and 180°.' }),

  makeMCQ({ id:'g6m-geo-002', chapterId:'g6-geometry', difficulty:1,
    question:'What is the sum of angles in ANY triangle?',
    options:['90°','180°','270°','360°'],
    answer:'180°',
    hint:'A straight line = 180°. A triangle fits neatly into this.',
    explanation:'The three interior angles of any triangle always add up to <b>180°</b>. This is true for equilateral, isosceles, scalene, and right-angled triangles.' }),

  makeNum({ id:'g6m-geo-003', chapterId:'g6-geometry', difficulty:2,
    question:'A triangle has angles of 65° and 78°. What is the THIRD angle?',
    answer:'37', acceptableAnswers:['37','37°'],
    hint:'All three angles sum to 180°. Subtract the two known angles from 180°.',
    explanation:'65° + 78° = 143°. Third angle = 180° − 143° = <b>37°</b>.' }),

  makeMCQ({ id:'g6m-geo-004', chapterId:'g6-geometry', difficulty:1,
    question:`${_SVG_TRIANGLES}An EQUILATERAL triangle has three equal angles. What is each angle?`,
    options:['45°','60°','90°','180°'],
    answer:'60°',
    hint:'All three angles are equal and must sum to 180°. Divide 180° by 3.',
    explanation:'Equilateral triangle: all three angles equal. 180° ÷ 3 = <b>60°</b> per angle.' }),

  makeMCQ({ id:'g6m-geo-005', chapterId:'g6-geometry', difficulty:2,
    question:'Two lines are PARALLEL. What does this mean?',
    options:[
      'They cross at a right angle',
      'They are the same line',
      'They never meet and stay the same distance apart',
      'They cross at an acute angle'
    ],
    answer:'They never meet and stay the same distance apart',
    hint:'Think of railway tracks — they go in the same direction forever without crossing.',
    explanation:'<b>Parallel lines</b> always remain the same distance apart and <b>never intersect</b>, no matter how far they are extended. They are marked with arrows (→→) on diagrams.' }),

  makeMCQ({ id:'g6m-geo-006', chapterId:'g6-geometry', difficulty:2,
    question:'Two lines are PERPENDICULAR. What angle do they make at the point of intersection?',
    options:['45°','60°','90°','180°'],
    answer:'90°',
    hint:'Perpendicular means "at a right angle".',
    explanation:'<b>Perpendicular lines</b> meet at a <b>right angle (90°)</b>. A small square is drawn at the intersection to indicate perpendicularity.' }),

  makeNum({ id:'g6m-geo-007', chapterId:'g6-geometry', difficulty:2,
    question:'A right-angled triangle has one angle of 90° and another of 35°. What is the THIRD angle?',
    answer:'55', acceptableAnswers:['55','55°'],
    hint:'Three angles sum to 180°. Subtract 90° and 35°.',
    explanation:'90° + 35° = 125°. Third angle = 180° − 125° = <b>55°</b>.' }),

  makeMCQ({ id:'g6m-geo-008', chapterId:'g6-geometry', difficulty:2,
    question:'What is the sum of angles around a full point (complete revolution)?',
    options:['90°','180°','270°','360°'],
    answer:'360°',
    hint:'Think of turning all the way around in a circle.',
    explanation:'Angles around a point always add up to <b>360°</b> (a full turn or complete revolution). Angles on a straight line add up to 180°.' }),

  makeTF({ id:'g6m-geo-009', chapterId:'g6-geometry', difficulty:1,
    question:'An isosceles triangle has TWO equal sides and TWO equal base angles.',
    answer:true,
    hint:'Iso- means equal. An isosceles triangle has two matching sides and two matching angles.',
    explanation:'<b>True</b>. An <b>isosceles triangle</b> has two equal sides (the "legs") and two equal angles (the "base angles" at the bottom of the equal sides).' }),

  makeNum({ id:'g6m-geo-010', chapterId:'g6-geometry', difficulty:2,
    question:'On a straight line, two angles are formed: one is 3x° and the other is x°. Find the value of x. (Angles on a straight line sum to 180°)',
    answer:'45', acceptableAnswers:['45'],
    hint:'3x + x = 180. So 4x = 180.',
    explanation:'Angles on a straight line: 3x + x = 180. 4x = 180. x = 180 ÷ 4 = <b>45</b>.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-geo-011', chapterId:'g6-geometry', difficulty:2,
    question:'The angles of a triangle are x°, 2x° and 3x°. Find the value of x.',
    answer:'30', acceptableAnswers:['30'],
    hint:'Angles in a triangle always sum to 180°. So x + 2x + 3x = 180°.',
    explanation:'x + 2x + 3x = 180. 6x = 180. x = 180 ÷ 6 = <b>30°</b>. The three angles are 30°, 60° and 90° — this is a right-angled triangle!' }),

  makeNum({ id:'g6m-geo-012', chapterId:'g6-geometry', difficulty:2,
    question:'In a quadrilateral, three angles are 95°, 110° and 85°. Find the FOURTH angle.',
    answer:'70', acceptableAnswers:['70','70°'],
    hint:'Angles in any quadrilateral sum to 360°.',
    explanation:'Sum of all angles = 360°. Known angles: 95 + 110 + 85 = 290°. Fourth angle = 360 − 290 = <b>70°</b>. This applies to all quadrilaterals (square, rectangle, parallelogram, trapezium, irregular).' }),

  makeMCQ({ id:'g6m-geo-013', chapterId:'g6-geometry', difficulty:1,
    question:'How many FACES does a CYLINDER have?',
    options:['2','3','4','1'],
    answer:'3',
    hint:'A cylinder has a curved surface and two circular ends.',
    explanation:'A cylinder has <b>3</b> faces: 2 flat circular faces (top and bottom) and 1 curved face (the lateral surface). It has 0 vertices and 2 edges (the circles where the flat faces meet the curved surface). MIE Grade 6 3D shapes: cube (6F, 8V, 12E), cuboid (6F, 8V, 12E), cylinder (3F, 0V, 2E), cone (2F, 1V, 1E).' }),

  makeMCQ({ id:'g6m-geo-014', chapterId:'g6-geometry', difficulty:1,
    question:'A REGULAR HEXAGON has all its angles equal. What is each interior angle?',
    options:['90°','108°','120°','135°'],
    answer:'120°',
    hint:'Sum of interior angles of a hexagon = (6−2) × 180° = 720°. Divide by 6.',
    explanation:'Sum of interior angles = (n−2) × 180° = (6−2) × 180° = 4 × 180° = 720°. Each angle = 720° ÷ 6 = <b>120°</b>. MIE Grade 6 formula: sum of interior angles = (n−2) × 180°, where n = number of sides.' }),

  makeTF({ id:'g6m-geo-015', chapterId:'g6-geometry', difficulty:1,
    question:'A scalene triangle has all three sides of DIFFERENT lengths.',
    answer:true,
    hint:'Think about the three types of triangles by side length.',
    explanation:'<b>True.</b> Triangle types by side: <b>Scalene</b> = all 3 sides different lengths; <b>Isosceles</b> = 2 sides equal; <b>Equilateral</b> = all 3 sides equal. By angles: acute (all angles < 90°), right-angled (one 90° angle), obtuse (one angle > 90°).' }),

  makeNum({ id:'g6m-geo-016', chapterId:'g6-geometry', difficulty:2,
    question:'An isosceles triangle has a base angle of 55°. What is the APEX (top) angle?',
    answer:'70', acceptableAnswers:['70','70°'],
    hint:'Isosceles: the two base angles are equal. All 3 angles sum to 180°.',
    explanation:'Both base angles = 55°. Apex = 180 − 55 − 55 = 180 − 110 = <b>70°</b>. In an isosceles triangle, the two base angles are always equal.' }),

  makeMCQ({ id:'g6m-geo-017', chapterId:'g6-geometry', difficulty:2,
    question:'A shape has 4 lines of symmetry. Which shape could it be?',
    options:['Rectangle','Equilateral triangle','Square','Regular pentagon'],
    answer:'Square',
    hint:'Count lines of symmetry: square has 4 (2 through midpoints of sides, 2 through corners).',
    explanation:'A <b>square</b> has <b>4 lines of symmetry</b>: 2 through midpoints of opposite sides, and 2 through opposite corners. A rectangle has 2, an equilateral triangle has 3, a regular pentagon has 5, a regular hexagon has 6.' }),

  makeNum({ id:'g6m-geo-018', chapterId:'g6-geometry', difficulty:2,
    question:'An angle is 250°. What type of angle is it, and what is its REFLEX supplement? (i.e., what is 360° − 250°?)',
    answer:'110', acceptableAnswers:['110','110°'],
    hint:'360° − 250° = ?',
    explanation:'250° is a <b>reflex angle</b> (between 180° and 360°). 360° − 250° = <b>110°</b>. This 110° is the remaining angle when you \'wrap around\' a full circle. Angle types: acute (0°–90°), right (90°), obtuse (90°–180°), straight (180°), reflex (180°–360°), full turn (360°).' }),

  makeNum({ id:'g6m-geo-019', chapterId:'g6-geometry', difficulty:4,
    question:'In the diagram (not shown), two straight lines cross. One of the four angles formed is 68°. What are the sizes of the OTHER three angles?',
    answer:'112', acceptableAnswers:['112','112°'],
    hint:'Vertically opposite angles are equal. Adjacent angles on a straight line sum to 180°. What is the angle adjacent to 68°?',
    explanation:'Vertically opposite to 68° = 68° (equal). Adjacent angle = 180° − 68° = <b>112°</b>. The four angles: 68°, 112°, 68°, 112°. Vertically opposite angles are always equal; adjacent angles sum to 180° (supplementary).' })

);
