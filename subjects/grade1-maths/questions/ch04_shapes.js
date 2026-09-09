'use strict';
(function () {

// ── 2d_shapes (001–025) ───────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-shp-001', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape is round with no corners?',
    options:['circle','square','triangle','rectangle'], answer:'circle',
    hint:'Think of a wheel or a pizza.',
    explanation:'A <b>circle</b> is perfectly round and has no corners or straight sides.' }),

  makeMCQ({ id:'g1mth-shp-002', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'A shape with 4 equal sides is called a ___.',
    options:['square','rectangle','circle','triangle'], answer:'square',
    hint:'All 4 sides are the same length.',
    explanation:'A <b>square</b> has 4 equal sides and 4 corners.' }),

  makeMCQ({ id:'g1mth-shp-003', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'How many sides does a triangle have?',
    options:['3','4','2','5'], answer:'3',
    hint:'Tri- means three.',
    explanation:'A <b>triangle</b> has <b>3</b> sides.' }),

  makeMCQ({ id:'g1mth-shp-004', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape looks like a door?',
    options:['rectangle','square','circle','triangle'], answer:'rectangle',
    hint:'It has 4 sides but two sides are longer than the other two.',
    explanation:'A <b>rectangle</b> has 2 long sides and 2 short sides — just like a door.' }),

  makeMCQ({ id:'g1mth-shp-005', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape looks like the sun?',
    options:['circle','square','triangle','rectangle'], answer:'circle',
    hint:'The sun is perfectly round.',
    explanation:'The sun looks like a <b>circle</b> — round with no corners.' }),

  makeMCQ({ id:'g1mth-shp-006', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape looks like a pizza slice?',
    options:['triangle','circle','square','rectangle'], answer:'triangle',
    hint:'A pizza slice has 3 sides.',
    explanation:'A pizza slice is shaped like a <b>triangle</b> — it has 3 sides.' }),

  makeMCQ({ id:'g1mth-shp-007', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape do you see on a chess board (each small piece)?',
    options:['square','circle','triangle','rectangle'], answer:'square',
    hint:'Each tile on a chess board has 4 equal sides.',
    explanation:'Each tile on a chess board is a <b>square</b>.' }),

  makeMCQ({ id:'g1mth-shp-008', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'How many sides does a rectangle have?',
    options:['4','3','2','5'], answer:'4',
    hint:'Count the sides: top, bottom, left, right.',
    explanation:'A <b>rectangle</b> has <b>4</b> sides.' }),

  makeMCQ({ id:'g1mth-shp-009', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape has NO straight sides?',
    options:['circle','square','triangle','rectangle'], answer:'circle',
    hint:'A circle is completely curved.',
    explanation:'A <b>circle</b> has no straight sides — it is all curved.' }),

  makeMCQ({ id:'g1mth-shp-010', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape is like a book cover?',
    options:['rectangle','triangle','circle','square'], answer:'rectangle',
    hint:'A book cover has two long sides and two short sides.',
    explanation:'A book cover is shaped like a <b>rectangle</b>.' }),

  makeMCQ({ id:'g1mth-shp-011', chapterId:'g1mth-shapes', difficulty:2, subsection:'2d_shapes',
    question:'Rani draws a shape with 3 sides. What shape did she draw?',
    options:['triangle','square','circle','rectangle'], answer:'triangle',
    hint:'Which shape has exactly 3 sides?',
    explanation:'A shape with 3 sides is a <b>triangle</b>.' }),

  makeMCQ({ id:'g1mth-shp-012', chapterId:'g1mth-shapes', difficulty:2, subsection:'2d_shapes',
    question:'Tom draws a circle and a square. How many shapes does he draw altogether?',
    options:['2','1','3','4'], answer:'2',
    hint:'Count the shapes: circle, square.',
    explanation:'Tom draws <b>2</b> shapes: a circle and a square.' }),

  makeMCQ({ id:'g1mth-shp-013', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape has exactly 4 sides and 4 corners?',
    options:['square','triangle','circle','pentagon'], answer:'square',
    hint:'4 sides, 4 corners — and all sides are equal.',
    explanation:'A <b>square</b> has exactly 4 equal sides and 4 corners.' }),

  makeMCQ({ id:'g1mth-shp-014', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'A wheel is the shape of a ___.',
    options:['circle','square','rectangle','triangle'], answer:'circle',
    hint:'Wheels are round with no corners.',
    explanation:'A wheel is the shape of a <b>circle</b>.' }),

  makeMCQ({ id:'g1mth-shp-015', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape has 3 corners?',
    options:['triangle','square','rectangle','circle'], answer:'triangle',
    hint:'Corners = where two sides meet.',
    explanation:'A <b>triangle</b> has 3 corners (one at each vertex).' }),

  makeMCQ({ id:'g1mth-shp-016', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'A sandwich cut diagonally looks like a ___.',
    options:['triangle','circle','square','rectangle'], answer:'triangle',
    hint:'Cutting a square diagonally gives two triangles.',
    explanation:'A diagonally cut sandwich piece looks like a <b>triangle</b>.' }),

  makeMCQ({ id:'g1mth-shp-017', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'A coin is the shape of a ___.',
    options:['circle','square','triangle','rectangle'], answer:'circle',
    hint:'Coins are flat and round.',
    explanation:'A coin is shaped like a <b>circle</b>.' }),

  makeMCQ({ id:'g1mth-shp-018', chapterId:'g1mth-shapes', difficulty:2, subsection:'2d_shapes',
    question:'Mia sees 2 circles and 3 triangles. How many shapes does she see?',
    options:['5','4','6','3'], answer:'5',
    hint:'2 + 3 = ?',
    explanation:'2 + 3 = <b>5</b>. Mia sees 5 shapes.' }),

  makeMCQ({ id:'g1mth-shp-019', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape has 4 sides but they are NOT all equal?',
    options:['rectangle','square','circle','triangle'], answer:'rectangle',
    hint:'Two sides are longer, two sides are shorter.',
    explanation:'A <b>rectangle</b> has 4 sides — 2 long and 2 short.' }),

  makeMCQ({ id:'g1mth-shp-020', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'A page in your notebook is shaped like a ___.',
    options:['rectangle','circle','triangle','square'], answer:'rectangle',
    hint:'A page is long and has four corners.',
    explanation:'A notebook page is shaped like a <b>rectangle</b>.' }),

  makeMCQ({ id:'g1mth-shp-021', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape has no corners at all?',
    options:['circle','square','triangle','rectangle'], answer:'circle',
    hint:'Corners are where straight sides meet.',
    explanation:'A <b>circle</b> has no corners because it has no straight sides.' }),

  makeMCQ({ id:'g1mth-shp-022', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'A cheese slice (cut as a triangle) has ___ sides.',
    options:['3','4','2','0'], answer:'3',
    hint:'Think of a triangle.',
    explanation:'A triangular cheese slice has <b>3</b> sides.' }),

  makeMCQ({ id:'g1mth-shp-023', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Dev folds a square piece of paper diagonally. What shape does he get?',
    options:['triangle','circle','rectangle','square'], answer:'triangle',
    hint:'Folding a square diagonally creates a three-sided shape.',
    explanation:'Folding a square diagonally makes two <b>triangles</b>.' }),

  makeMCQ({ id:'g1mth-shp-024', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:'Which shape is a rectangle but not a square?',
    options:['A shape with 2 long and 2 short sides','A shape with 4 equal sides','A shape with 3 sides','A round shape'], answer:'A shape with 2 long and 2 short sides',
    hint:'A square has all equal sides; a rectangle does not.',
    explanation:'A rectangle that is not a square has <b>2 long sides and 2 short sides</b>.' }),

  makeMCQ({ id:'g1mth-shp-025', chapterId:'g1mth-shapes', difficulty:2, subsection:'2d_shapes',
    question:'Rani has 4 triangles and 2 circles. She gives away 1 circle. How many shapes does she have?',
    options:['5','4','6','3'], answer:'5',
    hint:'4 + 2 = 6, then take away 1.',
    explanation:'4 + 2 = 6 − 1 = <b>5</b> shapes.' })
);

// ── properties_shapes (026–050) ───────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-shp-026', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'A rectangle has ___ corners.',
    options:['4','3','2','5'], answer:'4',
    hint:'Count the corners of a door.',
    explanation:'A rectangle has <b>4</b> corners.' }),

  makeMCQ({ id:'g1mth-shp-027', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'Which shape has 0 sides and 0 corners?',
    options:['circle','square','triangle','rectangle'], answer:'circle',
    hint:'It is perfectly round.',
    explanation:'A <b>circle</b> has 0 sides and 0 corners.' }),

  makeMCQ({ id:'g1mth-shp-028', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'How many corners does a triangle have?',
    options:['3','4','2','0'], answer:'3',
    hint:'Each point of a triangle is a corner.',
    explanation:'A triangle has <b>3</b> corners.' }),

  makeMCQ({ id:'g1mth-shp-029', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'A square has ___ sides.',
    options:['4','3','2','0'], answer:'4',
    hint:'Count the edges of a square tile.',
    explanation:'A square has <b>4</b> sides, all equal.' }),

  makeMCQ({ id:'g1mth-shp-030', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'A triangle has ___ sides.',
    options:['3','4','2','5'], answer:'3',
    hint:'Tri- means three.',
    explanation:'A triangle has <b>3</b> sides.' }),

  makeMCQ({ id:'g1mth-shp-031', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'Which shape has 4 equal sides and 4 corners?',
    options:['square','rectangle','triangle','circle'], answer:'square',
    hint:'All 4 sides are the same length.',
    explanation:'A <b>square</b> has 4 equal sides and 4 corners.' }),

  makeMCQ({ id:'g1mth-shp-032', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'How many sides does a circle have?',
    options:['0','1','2','4'], answer:'0',
    hint:'A circle is curved — no straight sides.',
    explanation:'A circle has <b>0</b> straight sides.' }),

  makeMCQ({ id:'g1mth-shp-033', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'A rectangle and a square both have ___ corners.',
    options:['4','3','2','0'], answer:'4',
    hint:'Both shapes have 4 corners.',
    explanation:'Both shapes have <b>4</b> corners.' }),

  makeMCQ({ id:'g1mth-shp-034', chapterId:'g1mth-shapes', difficulty:2, subsection:'properties_shapes',
    question:'Rani draws a shape with 4 sides. Can it be a triangle?',
    options:['No — a triangle has only 3 sides','Yes — a triangle can have 4 sides','Yes — if it is big enough','No — because it is a circle'], answer:'No — a triangle has only 3 sides',
    hint:'How many sides does a triangle have?',
    explanation:'No — a triangle always has exactly <b>3</b> sides, not 4.' }),

  makeMCQ({ id:'g1mth-shp-035', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'Which two shapes have the same number of corners?',
    options:['square and rectangle','triangle and square','circle and triangle','triangle and rectangle'], answer:'square and rectangle',
    hint:'Which two shapes both have exactly 4 corners?',
    explanation:'A <b>square and a rectangle</b> both have 4 corners.' }),

  makeMCQ({ id:'g1mth-shp-036', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'How many corners does a rectangle have?',
    options:['4','3','2','0'], answer:'4',
    hint:'Count the corners of a door or window.',
    explanation:'A rectangle has <b>4</b> corners.' }),

  makeMCQ({ id:'g1mth-shp-037', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'A shape has 3 sides and 3 corners. What shape is it?',
    options:['triangle','square','circle','rectangle'], answer:'triangle',
    hint:'Tri- means three.',
    explanation:'A shape with 3 sides and 3 corners is a <b>triangle</b>.' }),

  makeMCQ({ id:'g1mth-shp-038', chapterId:'g1mth-shapes', difficulty:2, subsection:'properties_shapes',
    question:'Tom counts the corners of 2 triangles. How many corners does he count?',
    options:['6','4','8','3'], answer:'6',
    hint:'Each triangle has 3 corners. 3 + 3 = ?',
    explanation:'Each triangle has 3 corners, so 2 triangles have 3 + 3 = <b>6</b> corners.' }),

  makeMCQ({ id:'g1mth-shp-039', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'Which shape has MORE sides: a triangle or a square?',
    options:['square','triangle','they are the same','cannot tell'], answer:'square',
    hint:'Triangle = 3 sides, square = 4 sides.',
    explanation:'A <b>square</b> has 4 sides, which is more than a triangle\'s 3 sides.' }),

  makeMCQ({ id:'g1mth-shp-040', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'A circle has ___ corners.',
    options:['0','1','4','2'], answer:'0',
    hint:'A circle has no points or corners.',
    explanation:'A circle has <b>0</b> corners.' }),

  makeMCQ({ id:'g1mth-shp-041', chapterId:'g1mth-shapes', difficulty:2, subsection:'properties_shapes',
    question:'Mia counts the sides of 3 squares. How many sides does she count?',
    options:['12','9','8','6'], answer:'12',
    hint:'Each square has 4 sides. 4 × 3 = ?',
    explanation:'3 squares × 4 sides = <b>12</b> sides.' }),

  makeMCQ({ id:'g1mth-shp-042', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'Which shape has the fewest sides?',
    options:['circle','triangle','square','rectangle'], answer:'circle',
    hint:'Which shape has 0 sides?',
    explanation:'A <b>circle</b> has 0 sides — fewer than any other shape.' }),

  makeMCQ({ id:'g1mth-shp-043', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'A shape has 4 sides — 2 long and 2 short. What shape is it?',
    options:['rectangle','square','triangle','circle'], answer:'rectangle',
    hint:'All sides are not equal in this shape.',
    explanation:'A shape with 2 long and 2 short sides is a <b>rectangle</b>.' }),

  makeMCQ({ id:'g1mth-shp-044', chapterId:'g1mth-shapes', difficulty:2, subsection:'properties_shapes',
    question:'Dev counts the corners of 1 square and 1 triangle. How many corners altogether?',
    options:['7','6','8','5'], answer:'7',
    hint:'Square = 4 corners, triangle = 3 corners.',
    explanation:'4 + 3 = <b>7</b> corners.' }),

  makeMCQ({ id:'g1mth-shp-045', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'Which shape has MORE corners: a triangle or a rectangle?',
    options:['rectangle','triangle','they are the same','cannot tell'], answer:'rectangle',
    hint:'Triangle = 3 corners, rectangle = 4 corners.',
    explanation:'A <b>rectangle</b> has 4 corners — more than a triangle\'s 3.' }),

  makeMCQ({ id:'g1mth-shp-046', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'All 4 sides of a ___ are equal.',
    options:['square','rectangle','triangle','circle'], answer:'square',
    hint:'Only one of these shapes has all 4 equal sides.',
    explanation:'A <b>square</b> has all 4 sides equal in length.' }),

  makeMCQ({ id:'g1mth-shp-047', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'How many sides does a square have?',
    options:['4','3','5','0'], answer:'4',
    hint:'Count the sides of a tile.',
    explanation:'A square has <b>4</b> sides.' }),

  makeMCQ({ id:'g1mth-shp-048', chapterId:'g1mth-shapes', difficulty:2, subsection:'properties_shapes',
    question:'Rani has 2 circles and 1 triangle. She counts all the corners. How many does she count?',
    options:['3','0','6','4'], answer:'3',
    hint:'Circles have 0 corners each. Triangle has 3 corners.',
    explanation:'0 + 0 + 3 = <b>3</b> corners.' }),

  makeMCQ({ id:'g1mth-shp-049', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'A triangle has ___ corners.',
    options:['3','4','2','0'], answer:'3',
    hint:'Count the pointed tips of a triangle.',
    explanation:'A triangle has <b>3</b> corners.' }),

  makeMCQ({ id:'g1mth-shp-050', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:'Which shape has 4 sides and 4 corners — but two of its sides are longer?',
    options:['rectangle','square','triangle','circle'], answer:'rectangle',
    hint:'Think of a door or a book cover.',
    explanation:'A <b>rectangle</b> has 4 sides and 4 corners, but the sides are not all equal.' })
);

// ── position_direction (051–075) ──────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-shp-051', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The bird is sitting ON TOP of the tree. Which word best describes its position?',
    options:['above','below','beside','behind'], answer:'above',
    hint:'On top means higher than the tree.',
    explanation:'The bird is <b>above</b> (on top of) the tree.' }),

  makeMCQ({ id:'g1mth-shp-052', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The cat is UNDER the chair. Which word describes its position?',
    options:['below','above','in front of','behind'], answer:'below',
    hint:'Under means lower than the chair.',
    explanation:'The cat is <b>below</b> (under) the chair.' }),

  makeMCQ({ id:'g1mth-shp-053', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'Rani is standing IN FRONT of the school gate. She is ___ the gate.',
    options:['in front of','behind','above','beside'], answer:'in front of',
    hint:'In front means facing the gate.',
    explanation:'Rani is <b>in front of</b> the gate.' }),

  makeMCQ({ id:'g1mth-shp-054', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'Tom is BEHIND the door. He is ___ the door.',
    options:['behind','in front of','above','beside'], answer:'behind',
    hint:'Behind means on the other side, not visible.',
    explanation:'Tom is <b>behind</b> the door.' }),

  makeMCQ({ id:'g1mth-shp-055', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The book is to the RIGHT of the pencil. Which side is the book on?',
    options:['right','left','above','below'], answer:'right',
    hint:'Right is the side your right hand is on.',
    explanation:'The book is on the <b>right</b> side.' }),

  makeMCQ({ id:'g1mth-shp-056', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The bag is to the LEFT of the door. Which side is the bag on?',
    options:['left','right','above','below'], answer:'left',
    hint:'Left is the side your left hand is on.',
    explanation:'The bag is on the <b>left</b> side.' }),

  makeMCQ({ id:'g1mth-shp-057', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The sun is HIGH in the sky. The sun is ___ the clouds.',
    options:['above','below','beside','behind'], answer:'above',
    hint:'Above means higher up.',
    explanation:'The sun is <b>above</b> the clouds.' }),

  makeMCQ({ id:'g1mth-shp-058', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'Dev is NEXT TO Mia. He is ___ Mia.',
    options:['beside','above','below','behind'], answer:'beside',
    hint:'Next to means at the side of.',
    explanation:'Dev is <b>beside</b> Mia.' }),

  makeMCQ({ id:'g1mth-shp-059', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The fish is UNDER the water. The fish is ___ the surface.',
    options:['below','above','beside','in front of'], answer:'below',
    hint:'Under = below.',
    explanation:'The fish is <b>below</b> the water surface.' }),

  makeMCQ({ id:'g1mth-shp-060', chapterId:'g1mth-shapes', difficulty:2, subsection:'position_direction',
    question:'Mia puts a cup ON a table and a book UNDER the table. Which object is higher?',
    options:['the cup','the book','they are the same height','cannot tell'], answer:'the cup',
    hint:'On means above; under means below.',
    explanation:'The cup is <b>above</b> the book — the cup is on top, the book is below.' }),

  makeMCQ({ id:'g1mth-shp-061', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The bird flies OVER the house. The bird is ___ the house.',
    options:['above','below','beside','behind'], answer:'above',
    hint:'Over means higher than.',
    explanation:'The bird is <b>above</b> the house.' }),

  makeMCQ({ id:'g1mth-shp-062', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The dog is BEHIND the fence. Where is the dog?',
    options:['behind the fence','in front of the fence','above the fence','beside the fence'], answer:'behind the fence',
    hint:'Behind means on the far side.',
    explanation:'The dog is <b>behind</b> the fence.' }),

  makeMCQ({ id:'g1mth-shp-063', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The teacher stands IN FRONT of the class. She is ___ the children.',
    options:['in front of','behind','beside','below'], answer:'in front of',
    hint:'The teacher faces the children.',
    explanation:'The teacher is <b>in front of</b> the children.' }),

  makeMCQ({ id:'g1mth-shp-064', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'Turn LEFT. Which direction do you now face?',
    options:['left','right','forward','backward'], answer:'left',
    hint:'Your left hand shows you the left direction.',
    explanation:'Turning <b>left</b> means you now face the left direction.' }),

  makeMCQ({ id:'g1mth-shp-065', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'Rani is in front of Tom. Tom is ___ Rani.',
    options:['behind','in front of','above','beside'], answer:'behind',
    hint:'If Rani is in front, Tom must be at the back.',
    explanation:'Tom is <b>behind</b> Rani.' }),

  makeMCQ({ id:'g1mth-shp-066', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The aeroplane flies HIGH above the ground. The aeroplane is ___ us.',
    options:['above','below','beside','behind'], answer:'above',
    hint:'High means above.',
    explanation:'The aeroplane is <b>above</b> us.' }),

  makeMCQ({ id:'g1mth-shp-067', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'Dev puts his bag to his RIGHT side. His bag is on his ___ side.',
    options:['right','left','above','below'], answer:'right',
    hint:'Right is the side of your right hand.',
    explanation:'The bag is on Dev\'s <b>right</b> side.' }),

  makeMCQ({ id:'g1mth-shp-068', chapterId:'g1mth-shapes', difficulty:2, subsection:'position_direction',
    question:'A box is ON a shelf. A ball is UNDER the shelf. Which is higher — the box or the ball?',
    options:['the box','the ball','both are the same','cannot tell'], answer:'the box',
    hint:'On means above; under means below.',
    explanation:'The <b>box</b> is higher — it is on top of the shelf.' }),

  makeMCQ({ id:'g1mth-shp-069', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The moon is in the sky at night. The moon is ___ the houses.',
    options:['above','below','beside','in front of'], answer:'above',
    hint:'The sky is higher than the houses.',
    explanation:'The moon is <b>above</b> the houses.' }),

  makeMCQ({ id:'g1mth-shp-070', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'Mia stands to the LEFT of the door. She is on the ___ side.',
    options:['left','right','above','below'], answer:'left',
    hint:'Left is the direction of your left hand.',
    explanation:'Mia is on the <b>left</b> side.' }),

  makeMCQ({ id:'g1mth-shp-071', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The roots of a tree are UNDER the ground. They are ___ the surface.',
    options:['below','above','beside','in front of'], answer:'below',
    hint:'Under means below the surface.',
    explanation:'The roots are <b>below</b> the ground.' }),

  makeMCQ({ id:'g1mth-shp-072', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'Tom sits to the RIGHT of Dev. Dev sits to the ___ of Tom.',
    options:['left','right','above','below'], answer:'left',
    hint:'If Tom is to Dev\'s right, Dev is to Tom\'s left.',
    explanation:'Dev is to Tom\'s <b>left</b>.' }),

  makeMCQ({ id:'g1mth-shp-073', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The kite is flying HIGH in the sky. It is ___ the children.',
    options:['above','below','beside','behind'], answer:'above',
    hint:'High = above.',
    explanation:'The kite is <b>above</b> the children.' }),

  makeMCQ({ id:'g1mth-shp-074', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:'The ant is walking UNDER the leaf. The ant is ___ the leaf.',
    options:['below','above','in front of','behind'], answer:'below',
    hint:'Under means below.',
    explanation:'The ant is <b>below</b> the leaf.' }),

  makeMCQ({ id:'g1mth-shp-075', chapterId:'g1mth-shapes', difficulty:2, subsection:'position_direction',
    question:'Dev stands IN FRONT of the gate. Rani is BEHIND the gate. Are they on the same side?',
    options:['No — Dev is in front and Rani is behind','Yes — they are both at the gate','Yes — they face each other','No — Rani is to the left'], answer:'No — Dev is in front and Rani is behind',
    hint:'"In front" and "behind" are opposite positions.',
    explanation:'<b>No</b> — Dev is in front of the gate and Rani is behind it — they are on opposite sides.' })
);

})();
