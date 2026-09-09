(function () {
'use strict';

// ── shapes_properties ─────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3mth-geo-001', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'How many faces does a cube have?',
    options:['6','4','8','5'], answer:'6',
    hint:'A cube looks like a dice. Count the flat sides.',
    explanation:'A cube has <b>6</b> flat square faces.' }),

  makeMCQ({ id:'g3mth-geo-002', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'A triangular prism has ___ triangular faces.',
    options:['2','3','4','1'], answer:'2',
    hint:'Look at the two ends of a triangular prism.',
    explanation:'A triangular prism has <b>2</b> triangular faces (one at each end).' }),

  makeMCQ({ id:'g3mth-geo-003', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'Which 3D shape has no flat faces?',
    options:['sphere','cube','cylinder','cone'], answer:'sphere',
    hint:'This shape is perfectly round like a ball.',
    explanation:'A <b>sphere</b> has no flat faces — it is completely curved.' }),

  makeMCQ({ id:'g3mth-geo-004', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'How many edges does a cuboid have?',
    options:['12','8','6','10'], answer:'12',
    hint:'Count the lines where two faces meet.',
    explanation:'A cuboid has <b>12</b> edges.' }),

  makeMCQ({ id:'g3mth-geo-005', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'How many vertices (corners) does a square-based pyramid have?',
    options:['5','4','6','8'], answer:'5',
    hint:'4 at the base and 1 at the top.',
    explanation:'A square-based pyramid has <b>5</b> vertices: 4 at the base and 1 at the apex.' }),

  makeMCQ({ id:'g3mth-geo-006', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'How many sides does a pentagon have?',
    options:['5','4','6','3'], answer:'5',
    hint:'"Penta" means five.',
    explanation:'A pentagon has <b>5</b> sides.' }),

  makeMCQ({ id:'g3mth-geo-007', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'How many corners does a rectangle have?',
    options:['4','2','6','3'], answer:'4',
    hint:'Count the corners of a rectangle.',
    explanation:'A rectangle has <b>4</b> corners (right angles).' }),

  makeMCQ({ id:'g3mth-geo-008', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'A cone has ___ flat face(s).',
    options:['1','2','0','3'], answer:'1',
    hint:'The flat circular base counts as a face.',
    explanation:'A cone has <b>1</b> flat circular face (the base).' }),

  makeMCQ({ id:'g3mth-geo-009', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'Which shape has 6 faces, 8 vertices and 12 edges?',
    options:['cuboid','cone','sphere','cylinder'], answer:'cuboid',
    hint:'A cuboid is like a box.',
    explanation:'A <b>cuboid</b> has 6 faces, 8 vertices and 12 edges.' }),

  makeMCQ({ id:'g3mth-geo-010', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'How many sides does a hexagon have?',
    options:['6','5','7','8'], answer:'6',
    hint:'"Hexa" means six.',
    explanation:'A hexagon has <b>6</b> sides.' }),

  makeMCQ({ id:'g3mth-geo-011', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'Which 3D shape looks like a can of food?',
    options:['cylinder','sphere','cone','cube'], answer:'cylinder',
    hint:'It has two circular faces.',
    explanation:'A <b>cylinder</b> is shaped like a can of food.' }),

  makeMCQ({ id:'g3mth-geo-012', chapterId:'g3mth-geometry', difficulty:2, subsection:'shapes_properties',
    question:'A triangular pyramid (tetrahedron) has ___ faces.',
    options:['4','3','5','6'], answer:'4',
    hint:'Count the triangular faces: one base and three sides.',
    explanation:'A triangular pyramid has <b>4</b> triangular faces.' }),

  makeMCQ({ id:'g3mth-geo-013', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'How many right angles does a square have?',
    options:['4','2','1','3'], answer:'4',
    hint:'Each corner of a square is a right angle.',
    explanation:'A square has <b>4</b> right angles.' }),

  makeMCQ({ id:'g3mth-geo-014', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'Which 2D shape has 3 sides and 3 angles?',
    options:['triangle','square','rectangle','pentagon'], answer:'triangle',
    hint:'Tri = three.',
    explanation:'A <b>triangle</b> has 3 sides and 3 angles.' }),

  makeMCQ({ id:'g3mth-geo-015', chapterId:'g3mth-geometry', difficulty:2, subsection:'shapes_properties',
    question:'How many faces does a cylinder have in total?',
    options:['3','2','4','1'], answer:'3',
    hint:'2 flat circular faces + 1 curved surface.',
    explanation:'A cylinder has <b>3</b> faces: 2 flat circles and 1 curved face.' }),

  makeMCQ({ id:'g3mth-geo-016', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'All 4 sides of a square are ___.',
    options:['equal','different','curved','longer at the top'], answer:'equal',
    hint:'A square is a special rectangle with equal sides.',
    explanation:'In a square, all <b>4</b> sides are equal in length.' }),

  makeMCQ({ id:'g3mth-geo-017', chapterId:'g3mth-geometry', difficulty:2, subsection:'shapes_properties',
    question:'How many vertices does a cuboid have?',
    options:['8','6','12','4'], answer:'8',
    hint:'Count the corners of a box.',
    explanation:'A cuboid has <b>8</b> vertices (corners).' }),

  makeMCQ({ id:'g3mth-geo-018', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'Which shape has all sides equal and all angles equal?',
    options:['equilateral triangle','right-angled triangle','rectangle','oval'], answer:'equilateral triangle',
    hint:'All 3 sides and all 3 angles are the same.',
    explanation:'An <b>equilateral triangle</b> has all sides equal and all angles equal (60°).' }),

  makeMCQ({ id:'g3mth-geo-019', chapterId:'g3mth-geometry', difficulty:2, subsection:'shapes_properties',
    question:'A cube has 6 faces. How many faces of a cube are squares?',
    options:['6','4','2','3'], answer:'6',
    hint:'Every face of a cube is a square.',
    explanation:'All <b>6</b> faces of a cube are squares.' }),

  makeMCQ({ id:'g3mth-geo-020', chapterId:'g3mth-geometry', difficulty:1, subsection:'shapes_properties',
    question:'What is the name of a 2D shape with 4 equal sides and 4 right angles?',
    options:['square','rectangle','rhombus','trapezium'], answer:'square',
    hint:'Equal sides AND right angles.',
    explanation:'A <b>square</b> has 4 equal sides and 4 right angles.' }),

// ── angles_symmetry ───────────────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-geo-021', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'A right angle is ___ degrees.',
    options:['90','45','180','360'], answer:'90',
    hint:'A right angle looks like the corner of a square.',
    explanation:'A right angle is <b>90</b> degrees.' }),

  makeMCQ({ id:'g3mth-geo-022', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'An angle smaller than a right angle is called ___.',
    options:['acute','obtuse','right','straight'], answer:'acute',
    hint:'"Acute" means sharp and small.',
    explanation:'An angle smaller than 90° is called <b>acute</b>.' }),

  makeMCQ({ id:'g3mth-geo-023', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'An angle bigger than a right angle (but less than 180°) is called ___.',
    options:['obtuse','acute','right','reflex'], answer:'obtuse',
    hint:'Obtuse means wide and blunt.',
    explanation:'An angle between 90° and 180° is called <b>obtuse</b>.' }),

  makeMCQ({ id:'g3mth-geo-024', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'A square has ___ lines of symmetry.',
    options:['4','2','1','0'], answer:'4',
    hint:'You can fold a square along its middle in 4 different ways.',
    explanation:'A square has <b>4</b> lines of symmetry: 2 along the sides and 2 along the diagonals.' }),

  makeMCQ({ id:'g3mth-geo-025', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'An equilateral triangle has ___ lines of symmetry.',
    options:['3','1','2','0'], answer:'3',
    hint:'You can fold it through each vertex to the middle of the opposite side.',
    explanation:'An equilateral triangle has <b>3</b> lines of symmetry.' }),

  makeMCQ({ id:'g3mth-geo-026', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'A straight angle is ___ degrees.',
    options:['180','90','360','270'], answer:'180',
    hint:'A straight line makes a straight angle.',
    explanation:'A straight angle is <b>180</b> degrees — it looks like a straight line.' }),

  makeMCQ({ id:'g3mth-geo-027', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'A rectangle has ___ lines of symmetry.',
    options:['2','4','1','0'], answer:'2',
    hint:'You can fold a rectangle through the middle horizontally or vertically.',
    explanation:'A rectangle (that is not a square) has <b>2</b> lines of symmetry.' }),

  makeMCQ({ id:'g3mth-geo-028', chapterId:'g3mth-geometry', difficulty:2, subsection:'angles_symmetry',
    question:'How many right angles does the letter "L" have?',
    options:['1','2','3','0'], answer:'1',
    hint:'Look at the corner inside the letter L.',
    explanation:'The letter "L" has <b>1</b> right angle (the inside corner).' }),

  makeMCQ({ id:'g3mth-geo-029', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'A circle has ___ lines of symmetry.',
    options:['infinitely many','1','4','0'], answer:'infinitely many',
    hint:'You can fold a circle through its centre in any direction.',
    explanation:'A circle has <b>infinitely many</b> lines of symmetry.' }),

  makeMCQ({ id:'g3mth-geo-030', chapterId:'g3mth-geometry', difficulty:2, subsection:'angles_symmetry',
    question:'Which of these angles is obtuse?',
    options:['120°','45°','90°','30°'], answer:'120°',
    hint:'Obtuse is between 90° and 180°.',
    explanation:'<b>120°</b> is between 90° and 180°, so it is obtuse.' }),

  makeMCQ({ id:'g3mth-geo-031', chapterId:'g3mth-geometry', difficulty:2, subsection:'angles_symmetry',
    question:'Which of these angles is acute?',
    options:['35°','90°','120°','180°'], answer:'35°',
    hint:'Acute angles are less than 90°.',
    explanation:'<b>35°</b> is less than 90°, so it is acute.' }),

  makeMCQ({ id:'g3mth-geo-032', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'A regular hexagon has ___ lines of symmetry.',
    options:['6','3','4','2'], answer:'6',
    hint:'A regular hexagon has as many lines of symmetry as it has sides.',
    explanation:'A regular hexagon has <b>6</b> lines of symmetry.' }),

  makeMCQ({ id:'g3mth-geo-033', chapterId:'g3mth-geometry', difficulty:2, subsection:'angles_symmetry',
    question:'How many right angles are in the letter "F"?',
    options:['3','2','4','1'], answer:'3',
    hint:'Count the corners in the letter F.',
    explanation:'The letter "F" has <b>3</b> right angles (at each horizontal bar and the back).' }),

  makeMCQ({ id:'g3mth-geo-034', chapterId:'g3mth-geometry', difficulty:2, subsection:'angles_symmetry',
    question:'Priya folds a heart shape and both halves match exactly. This shows the heart has ___.',
    options:['a line of symmetry','no angles','4 sides','a right angle'], answer:'a line of symmetry',
    hint:'When two halves match, that is symmetry.',
    explanation:'When you fold a shape and both sides match, the fold line is called a <b>line of symmetry</b>.' }),

  makeMCQ({ id:'g3mth-geo-035', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'An isosceles triangle has ___ lines of symmetry.',
    options:['1','2','3','0'], answer:'1',
    hint:'It has only one fold line through the middle.',
    explanation:'An isosceles triangle has <b>1</b> line of symmetry.' }),

  makeMCQ({ id:'g3mth-geo-036', chapterId:'g3mth-geometry', difficulty:2, subsection:'angles_symmetry',
    question:'How many right angles does the letter "T" have?',
    options:['2','1','3','4'], answer:'2',
    hint:'Look at each corner in the letter T.',
    explanation:'The letter "T" has <b>2</b> right angles.' }),

  makeMCQ({ id:'g3mth-geo-037', chapterId:'g3mth-geometry', difficulty:2, subsection:'angles_symmetry',
    question:'Which of these shapes has NO line of symmetry?',
    options:['scalene triangle','square','equilateral triangle','rectangle'], answer:'scalene triangle',
    hint:'A scalene triangle has all sides different lengths.',
    explanation:'A <b>scalene triangle</b> has no lines of symmetry because all its sides are different.' }),

  makeMCQ({ id:'g3mth-geo-038', chapterId:'g3mth-geometry', difficulty:1, subsection:'angles_symmetry',
    question:'A full turn is ___ degrees.',
    options:['360','180','90','270'], answer:'360',
    hint:'A complete rotation brings you back to where you started.',
    explanation:'A full turn is <b>360</b> degrees.' }),

  makeMCQ({ id:'g3mth-geo-039', chapterId:'g3mth-geometry', difficulty:2, subsection:'angles_symmetry',
    question:'Raj draws a shape with 5 lines of symmetry. Which shape could it be?',
    options:['regular pentagon','square','equilateral triangle','rectangle'], answer:'regular pentagon',
    hint:'A regular polygon has as many lines of symmetry as sides.',
    explanation:'A <b>regular pentagon</b> has 5 sides and 5 lines of symmetry.' }),

  makeMCQ({ id:'g3mth-geo-040', chapterId:'g3mth-geometry', difficulty:2, subsection:'angles_symmetry',
    question:'Which angle is the odd one out: 85°, 47°, 63°, 95°?',
    options:['95°','85°','47°','63°'], answer:'95°',
    hint:'Which one is larger than 90°?',
    explanation:'<b>95°</b> is obtuse; the others (85°, 47°, 63°) are all acute.' }),

// ── perimeter_area ────────────────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-geo-041', chapterId:'g3mth-geometry', difficulty:1, subsection:'perimeter_area',
    question:'Find the perimeter of a square with sides of 5 cm.',
    options:['20 cm','25 cm','10 cm','15 cm'], answer:'20 cm',
    hint:'Perimeter of square = 4 × side.',
    explanation:'4 × 5 = <b>20 cm</b>.' }),

  makeMCQ({ id:'g3mth-geo-042', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'A rectangle is 8 m long and 3 m wide. What is its perimeter?',
    options:['22 m','24 m','11 m','16 m'], answer:'22 m',
    hint:'Perimeter = 2 × (length + width) = 2 × (8 + 3).',
    explanation:'2 × (8 + 3) = 2 × 11 = <b>22 m</b>.' }),

  makeMCQ({ id:'g3mth-geo-043', chapterId:'g3mth-geometry', difficulty:1, subsection:'perimeter_area',
    question:'A shape covers 6 squares on a grid. Its area is ___ square units.',
    options:['6','12','3','8'], answer:'6',
    hint:'Count each square — each is 1 square unit.',
    explanation:'The area is <b>6</b> square units.' }),

  makeMCQ({ id:'g3mth-geo-044', chapterId:'g3mth-geometry', difficulty:1, subsection:'perimeter_area',
    question:'A rectangle is 4 cm × 3 cm. What is its area?',
    options:['12 cm²','14 cm²','7 cm²','10 cm²'], answer:'12 cm²',
    hint:'Area = length × width.',
    explanation:'Area = 4 × 3 = <b>12 cm²</b>.' }),

  makeMCQ({ id:'g3mth-geo-045', chapterId:'g3mth-geometry', difficulty:1, subsection:'perimeter_area',
    question:'Find the perimeter of a square with sides of 7 cm.',
    options:['28 cm','14 cm','49 cm','21 cm'], answer:'28 cm',
    hint:'4 × 7 = ?',
    explanation:'4 × 7 = <b>28 cm</b>.' }),

  makeMCQ({ id:'g3mth-geo-046', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'A rectangle has a length of 6 cm and a width of 4 cm. What is its area?',
    options:['24 cm²','20 cm²','10 cm²','12 cm²'], answer:'24 cm²',
    hint:'Area = 6 × 4.',
    explanation:'Area = 6 × 4 = <b>24 cm²</b>.' }),

  makeMCQ({ id:'g3mth-geo-047', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'Rani\'s garden is a square with each side 9 m. What is the perimeter?',
    options:['36 m','18 m','81 m','24 m'], answer:'36 m',
    hint:'4 × 9 = ?',
    explanation:'4 × 9 = <b>36 m</b>.' }),

  makeMCQ({ id:'g3mth-geo-048', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'A rectangle has a perimeter of 20 cm and a length of 6 cm. What is its width?',
    options:['4 cm','8 cm','7 cm','3 cm'], answer:'4 cm',
    hint:'20 = 2 × (6 + w). 10 = 6 + w.',
    explanation:'20 = 2 × (6 + w) → 10 = 6 + w → w = <b>4 cm</b>.' }),

  makeMCQ({ id:'g3mth-geo-049', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'A rectangle is 10 cm long and 5 cm wide. What is its area?',
    options:['50 cm²','30 cm²','15 cm²','25 cm²'], answer:'50 cm²',
    hint:'Area = 10 × 5.',
    explanation:'Area = 10 × 5 = <b>50 cm²</b>.' }),

  makeMCQ({ id:'g3mth-geo-050', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'Dev counts 15 squares in a shape on a grid. What is the area of the shape?',
    options:['15 square units','30 square units','7 square units','5 square units'], answer:'15 square units',
    hint:'Each grid square = 1 square unit.',
    explanation:'The area is <b>15 square units</b>.' }),

  makeMCQ({ id:'g3mth-geo-051', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'A football pitch is 100 m long and 60 m wide. What is its perimeter?',
    options:['320 m','200 m','160 m','360 m'], answer:'320 m',
    hint:'Perimeter = 2 × (100 + 60).',
    explanation:'2 × (100 + 60) = 2 × 160 = <b>320 m</b>.' }),

  makeMCQ({ id:'g3mth-geo-052', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'A square has an area of 36 cm². What is the length of one side?',
    options:['6 cm','9 cm','4 cm','12 cm'], answer:'6 cm',
    hint:'Which number × itself = 36?',
    explanation:'6 × 6 = 36, so each side is <b>6 cm</b>.' }),

  makeMCQ({ id:'g3mth-geo-053', chapterId:'g3mth-geometry', difficulty:3, subsection:'perimeter_area',
    question:'Nadia draws a rectangle with perimeter 28 m and width 4 m. What is the area?',
    options:['40 m²','56 m²','28 m²','20 m²'], answer:'40 m²',
    hint:'Perimeter 28 = 2×(l+4), so l=10. Area = 10 × 4.',
    explanation:'28 = 2×(l+4) → 14 = l+4 → l=10. Area = 10 × 4 = <b>40 m²</b>.' }),

  makeMCQ({ id:'g3mth-geo-054', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'Which has a larger area: a rectangle 5 cm × 6 cm or a square with sides 5 cm?',
    options:['rectangle (5 × 6)','square (5 × 5)','They are equal','Cannot tell'], answer:'rectangle (5 × 6)',
    hint:'Rectangle: 5×6=30 cm². Square: 5×5=25 cm².',
    explanation:'30 cm² > 25 cm², so the <b>rectangle</b> has a larger area.' }),

  makeMCQ({ id:'g3mth-geo-055', chapterId:'g3mth-geometry', difficulty:2, subsection:'perimeter_area',
    question:'Priya tiles a floor with 8 × 5 cm square tiles. How many tiles cover a 40 cm × 20 cm floor?',
    options:['20','10','40','16'], answer:'20',
    hint:'Area of floor = 40 × 20 = 800 cm². Area of each tile = 8 × 5 = 40 cm². 800 ÷ 40 = ?',
    explanation:'Floor = 800 cm². Tile = 40 cm². 800 ÷ 40 = <b>20</b> tiles.' })
);

})();
