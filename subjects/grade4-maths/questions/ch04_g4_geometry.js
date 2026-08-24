'use strict';
// Grade 4 Maths — Chapter: Geometry & Angles (2-D/3-D shapes, lines, angles)
// IDs format: g4m-geo-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-geo-001', chapterId:'g4-geometry', difficulty:1,
    question:'How many FACES does a CUBE have?',
    options:['4','5','6','8'],
    answer:'6',
    hint:'A cube is like a dice. Count each flat square surface.',
    explanation:'A cube has <b>6 faces</b> (all square and equal), 8 vertices (corners) and 12 edges. MIE Grade 4 3-D shapes: cube, cuboid, cone, cylinder and sphere.' }),

  makeMCQ({ id:'g4m-geo-002', chapterId:'g4-geometry', difficulty:1,
    question:'Which 3-D shape has 2 circular FLAT faces and 1 curved surface?',
    options:['Cone','Cylinder','Sphere','Cuboid'],
    answer:'Cylinder',
    hint:'Think of a tin can or a drinking glass.',
    explanation:'A <b>cylinder</b> has 2 flat circular faces (top and bottom) and 1 curved lateral surface. Examples: a tin can, a battery, a drum.' }),

  makeMCQ({ id:'g4m-geo-003', chapterId:'g4-geometry', difficulty:1,
    question:'What type of lines NEVER MEET, no matter how far they are extended?',
    options:['Intersecting lines','Perpendicular lines','Parallel lines','Inclined lines'],
    answer:'Parallel lines',
    hint:'Think of railway tracks or opposite sides of a rectangle.',
    explanation:'<b>Parallel lines</b> always stay the same distance apart and never meet. They are shown with matching arrow symbols (>> >>) in diagrams. Examples: railway tracks, opposite sides of a rectangle.' }),

  makeTF({ id:'g4m-geo-004', chapterId:'g4-geometry', difficulty:1,
    question:'A rectangle has 4 right angles (90° corners).',
    answer:true,
    hint:'All four corners of a rectangle are square corners.',
    explanation:'<b>True.</b> All four interior angles of a rectangle are right angles (90°). This is what makes it different from a general parallelogram, which has two pairs of equal angles that are not necessarily 90°.' }),

  makeNum({ id:'g4m-geo-005', chapterId:'g4-geometry', difficulty:2,
    question:'A cube has edges of 4 cm each. A cube has 12 edges. What is the TOTAL length of all its edges (in cm)?',
    answer:'48', acceptableAnswers:['48','48 cm'],
    hint:'Total length = number of edges x length of one edge.',
    explanation:'12 edges x 4 cm = <b>48 cm</b>. A cube has 12 equal edges — 4 on the top face, 4 on the bottom face and 4 vertical edges joining them.' }),

  makeMCQ({ id:'g4m-geo-006', chapterId:'g4-geometry', difficulty:1,
    question:'A HORIZONTAL line goes in which direction?',
    options:['Up and down','Diagonally','Left and right','In a circle'],
    answer:'Left and right',
    hint:'The word "horizontal" comes from "horizon" — the line where the sky meets the sea.',
    explanation:'A <b>horizontal line</b> goes left and right (like the horizon). A <b>vertical</b> line goes up and down. An <b>inclined</b> line goes at a diagonal angle. MIE Grade 4: horizontal, vertical, parallel and inclined lines.' }),

  makeMCQ({ id:'g4m-geo-007', chapterId:'g4-geometry', difficulty:2,
    question:'Which of these angles is the GREATEST?',
    options:['25 degrees','90 degrees','45 degrees','115 degrees'],
    answer:'115 degrees',
    hint:'A right angle = 90 degrees. Obtuse angles are GREATER than 90 degrees.',
    explanation:'<b>115 degrees</b> is the greatest. 25 degrees and 45 degrees are acute (less than 90 degrees). 90 degrees is a right angle. 115 degrees is obtuse (greater than 90 degrees). MIE Grade 4: recognise and compare angles.' }),

  makeNum({ id:'g4m-geo-008', chapterId:'g4-geometry', difficulty:1,
    question:'A SPHERE has how many flat FACES?',
    answer:'0', acceptableAnswers:['0'],
    hint:'Roll a sphere on the floor. Does it have any flat sides?',
    explanation:'A sphere has <b>0 flat faces</b>, 0 edges and 0 vertices. It is perfectly round — like a ball or a globe. Unlike a cube or cylinder, there are no flat surfaces.' }),

  makeTF({ id:'g4m-geo-009', chapterId:'g4-geometry', difficulty:1,
    question:'A CUBOID has 12 edges.',
    answer:true,
    hint:'Count the edges on a box: 4 on top, 4 on bottom, 4 vertical.',
    explanation:'<b>True.</b> A cuboid has 6 faces, 8 vertices and <b>12 edges</b>: 4 edges on the top face, 4 on the bottom face and 4 vertical edges connecting them. Examples: a brick, a book, a matchbox.' }),

  makeMCQ({ id:'g4m-geo-010', chapterId:'g4-geometry', difficulty:2,
    question:'Which 3-D shape has a CIRCULAR base and comes to a POINT (apex) at the top?',
    options:['Cylinder','Sphere','Cone','Pyramid'],
    answer:'Cone',
    hint:'Think of an ice cream cone or a traffic cone.',
    explanation:'A <b>cone</b> has a circular base, 1 curved lateral surface and 1 apex (point) at the top. It has 2 faces (1 flat circle + 1 curved), 1 edge and 1 vertex. Examples: ice cream cone, party hat, traffic cone.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-geo-011', chapterId:'g4-geometry', difficulty:1,
    question:'An angle that is LESS THAN 90° is called:',
    options:['A right angle','An obtuse angle','An acute angle','A reflex angle'],
    answer:'An acute angle',
    hint:'"Acute" means sharp — these are small, pointy angles.',
    explanation:'An <b>acute angle</b> is any angle less than 90°. A right angle is exactly 90°. An obtuse angle is between 90° and 180°. A reflex angle is more than 180°. MIE Grade 4: classify angles as acute, right, obtuse.' }),

  makeMCQ({ id:'g4m-geo-012', chapterId:'g4-geometry', difficulty:1,
    question:'An angle of 135° is best described as:',
    options:['Acute','Right','Obtuse','Reflex'],
    answer:'Obtuse',
    hint:'Is 135° between 90° and 180°?',
    explanation:'135° is between 90° and 180°, so it is an <b>obtuse angle</b>. Memory tip: Obtuse = Over 90° but Under 180°.' }),

  makeMCQ({ id:'g4m-geo-013', chapterId:'g4-geometry', difficulty:2,
    question:'A triangle with ALL THREE sides EQUAL is called:',
    options:['Scalene','Isosceles','Equilateral','Right-angled'],
    answer:'Equilateral',
    hint:'"Equi" means equal, "lateral" means sides.',
    explanation:'An <b>equilateral triangle</b> has all three sides equal and all three angles equal (each 60°). An isosceles triangle has two equal sides. A scalene triangle has no equal sides.' }),

  makeNum({ id:'g4m-geo-014', chapterId:'g4-geometry', difficulty:2,
    question:'What is the PERIMETER of a square with side length 9 cm?',
    answer:'36', acceptableAnswers:['36','36 cm'],
    hint:'A square has 4 equal sides. Perimeter = 4 × side length.',
    explanation:'Perimeter = 4 × 9 cm = <b>36 cm</b>. Perimeter is the total distance around a shape (sum of all side lengths). For a square: P = 4 × side.' }),

  makeNum({ id:'g4m-geo-015', chapterId:'g4-geometry', difficulty:2,
    question:'A rectangle is 8 cm long and 5 cm wide. What is its PERIMETER (in cm)?',
    answer:'26', acceptableAnswers:['26','26 cm'],
    hint:'Perimeter of a rectangle = 2 × (length + width).',
    explanation:'P = 2 × (8 + 5) = 2 × 13 = <b>26 cm</b>. Or: add all four sides — 8+5+8+5=26. Either method works.' }),

  makeTF({ id:'g4m-geo-016', chapterId:'g4-geometry', difficulty:2,
    question:'A SQUARE is a special type of RECTANGLE.',
    answer:true,
    hint:'Does a square have all the properties of a rectangle (4 right angles, 2 pairs of equal parallel sides)?',
    explanation:'<b>True.</b> A square satisfies every property of a rectangle (4 right angles, opposite sides parallel and equal) AND has all four sides equal. Therefore it is a special rectangle.' }),

  makeMCQ({ id:'g4m-geo-017', chapterId:'g4-geometry', difficulty:2,
    question:'How many LINES OF SYMMETRY does a square have?',
    options:['1','2','3','4'],
    answer:'4',
    hint:'A line of symmetry folds the shape so both halves match perfectly. Try horizontal, vertical and both diagonal folds.',
    explanation:'A square has <b>4 lines of symmetry</b>: 1 horizontal, 1 vertical and 2 diagonal lines. A rectangle has only 2 (horizontal and vertical — the diagonals do NOT work for a non-square rectangle).' }),

  makeNum({ id:'g4m-geo-018', chapterId:'g4-geometry', difficulty:3,
    question:'A rectangular garden is 12 m long and 7 m wide. What is the TOTAL LENGTH of the path that runs around the outside (perimeter) in metres?',
    answer:'38', acceptableAnswers:['38','38 m'],
    hint:'Perimeter = 2 × (length + width) = 2 × (12 + 7).',
    explanation:'P = 2 × (12 + 7) = 2 × 19 = <b>38 m</b>. Real-life perimeter: fencing a garden, framing a picture, or marking out a field.' }),

  makeMCQ({ id:'g4m-geo-019', chapterId:'g4-geometry', difficulty:4,
    question:'Priya fences a rectangular field 30 m long and 15 m wide. Fencing costs Rs 50 per metre. What is the TOTAL COST of the fence?',
    options:['Rs 2,250','Rs 3,750','Rs 4,500','Rs 22,500'],
    answer:'Rs 4,500',
    hint:'Step 1: find the perimeter. Step 2: multiply by the cost per metre.',
    explanation:'Perimeter = 2 × (30 + 15) = 2 × 45 = 90 m. Cost = 90 × Rs 50 = <b>Rs 4,500</b>. Two-step geometry word problem: calculate perimeter, then apply unit cost.' })

);
