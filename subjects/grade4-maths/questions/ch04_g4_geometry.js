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
