'use strict';

(function () {

STATIC_QUESTIONS.push(

  // ── 3D SHAPES ────────────────────────────────────────────────────────────

  makeMCQ({
    id: 'g6m-geo-024', chapterId: 'g6-geometry', subsection: '3d_shapes', difficulty: 1,
    question: 'A CUBE has 6 faces, 8 vertices and 12 edges. How many FACES does a CUBOID have?',
    options: ['4', '6', '8', '12'],
    answer: '6',
    hint: 'A cuboid is like a rectangular box. Count the top, bottom and four sides.',
    explanation: 'A <b>cuboid</b> has <b>6 faces</b> (all rectangles), 8 vertices and 12 edges — exactly the same counts as a cube. The difference is that a cube has all faces as squares, while a cuboid has rectangular faces that may differ in size.'
  }),

  makeNum({
    id: 'g6m-geo-025', chapterId: 'g6-geometry', subsection: '3d_shapes', difficulty: 2,
    question: 'A triangular prism has 5 faces. How many EDGES does it have?',
    answer: '9', acceptableAnswers: ['9'],
    hint: 'A triangular prism has 2 triangular ends and 3 rectangular sides. Count the edges on each triangle and the edges connecting them.',
    explanation: 'A <b>triangular prism</b> has 3 edges on each triangular face (2 × 3 = 6) and 3 more edges connecting the two triangles together = <b>9 edges</b> in total. It also has 6 vertices (3 per triangular face). Memory check: Faces=5, Vertices=6, Edges=9. Use Euler\'s formula: F + V − E = 2 → 5 + 6 − 9 = 2 ✓'
  }),

  makeTF({
    id: 'g6m-geo-026', chapterId: 'g6-geometry', subsection: '3d_shapes', difficulty: 1,
    question: 'A CONE has 2 faces, 1 vertex (the apex) and 1 edge (the circle at the base).',
    answer: true,
    hint: 'Think of an ice cream cone — it has a circular flat base and a curved surface that meets at a point.',
    explanation: '<b>True.</b> A cone has: 2 faces (1 flat circular base + 1 curved surface), 1 vertex (the pointed apex at the top), and 1 edge (the circle where the base meets the curved surface). Compare with a cylinder: 3 faces, 0 vertices, 2 edges.'
  }),

  makeMCQ({
    id: 'g6m-geo-027', chapterId: 'g6-geometry', subsection: '3d_shapes', difficulty: 2,
    question: 'A SPHERE is a perfectly round 3D shape. How many faces, vertices and edges does it have?',
    options: [
      '1 face, 0 vertices, 0 edges',
      '2 faces, 1 vertex, 1 edge',
      '0 faces, 0 vertices, 0 edges',
      '1 face, 1 vertex, 1 edge'
    ],
    answer: '1 face, 0 vertices, 0 edges',
    hint: 'A sphere is a smooth curved surface — no flat faces, no sharp corners, no straight edges.',
    explanation: 'A <b>sphere</b> has <b>1 curved face</b>, <b>0 vertices</b> and <b>0 edges</b>. Because it is entirely smooth and curved, it has no corners (vertices) and no straight edges. The one curved face wraps all the way around continuously.'
  }),

  makeMCQ({
    id: 'g6m-geo-028', chapterId: 'g6-geometry', subsection: '3d_shapes', difficulty: 2,
    question: 'The NET of a 3D shape is what it looks like when unfolded flat. How many squares make up the net of a CUBE?',
    options: ['4', '5', '6', '8'],
    answer: '6',
    hint: 'A cube has 6 faces. Each face becomes one square in the net.',
    explanation: 'A cube has <b>6 square faces</b>, so its net consists of <b>6 squares</b> arranged so that when folded up they form the cube with no gaps and no overlaps. There are 11 different ways to arrange 6 squares into a valid net of a cube.'
  }),

  // ── 2D SHAPES ────────────────────────────────────────────────────────────

  makeMCQ({
    id: 'g6m-geo-029', chapterId: 'g6-geometry', subsection: '2d_shapes', difficulty: 1,
    question: 'A PARALLELOGRAM has opposite sides that are parallel. Which statement about its angles is also true?',
    options: [
      'All four angles are 90°',
      'Opposite angles are equal',
      'Adjacent angles are equal',
      'All four angles are equal'
    ],
    answer: 'Opposite angles are equal',
    hint: 'In a parallelogram, the angle at top-left equals the angle at bottom-right, and so on.',
    explanation: 'In a <b>parallelogram</b>, <b>opposite angles are equal</b>. Also, opposite sides are equal in length, and adjacent angles add up to 180°. A rectangle is a special parallelogram where all angles are 90°.'
  }),

  makeTF({
    id: 'g6m-geo-030', chapterId: 'g6-geometry', subsection: '2d_shapes', difficulty: 1,
    question: 'A RHOMBUS has all four sides of equal length, and its diagonals cross each other at right angles (90°).',
    answer: true,
    hint: 'Think of a diamond shape — all sides equal, and the two diagonals meet in a cross at the centre.',
    explanation: '<b>True.</b> A <b>rhombus</b> has all 4 sides equal (like a square), and its diagonals bisect each other at 90°. The diagonals also bisect the corner angles. Unlike a square, a rhombus does not need to have 90° corner angles.'
  }),

  makeMCQ({
    id: 'g6m-geo-031', chapterId: 'g6-geometry', subsection: '2d_shapes', difficulty: 1,
    question: 'A TRAPEZIUM is a quadrilateral with exactly ONE pair of parallel sides. Which shape below is NOT a trapezium?',
    options: ['A shape with one pair of parallel sides', 'A right-angled trapezium', 'A parallelogram', 'An isosceles trapezium'],
    answer: 'A parallelogram',
    hint: 'A parallelogram has TWO pairs of parallel sides — more than one pair.',
    explanation: 'A <b>trapezium</b> has exactly <b>one</b> pair of parallel sides. A <b>parallelogram</b> has TWO pairs of parallel sides, so it is NOT a trapezium. Special trapeziums include the right-angled trapezium (one 90° angle) and the isosceles trapezium (the non-parallel sides are equal).'
  }),

  makeNum({
    id: 'g6m-geo-032', chapterId: 'g6-geometry', subsection: '2d_shapes', difficulty: 1,
    question: 'A regular OCTAGON has 8 sides. How many SIDES does a regular PENTAGON have?',
    answer: '5', acceptableAnswers: ['5'],
    hint: 'Penta- means five in Greek.',
    explanation: 'Polygon sides by name: <b>Pentagon = 5</b> sides, Hexagon = 6, Heptagon = 7, Octagon = 8, Nonagon = 9, Decagon = 10. A <b>regular</b> polygon has all sides equal and all angles equal.'
  }),

  makeNum({
    id: 'g6m-geo-033', chapterId: 'g6-geometry', subsection: '2d_shapes', difficulty: 2,
    question: 'A parallelogram has one angle of 70°. What is the size of the ADJACENT angle (the angle next to it)?',
    answer: '110', acceptableAnswers: ['110', '110°'],
    hint: 'In a parallelogram, adjacent angles add up to 180° (they are supplementary).',
    explanation: 'In a <b>parallelogram</b>, adjacent angles are supplementary: they add up to 180°. So the adjacent angle = 180° − 70° = <b>110°</b>. Check: opposite angles are equal, so the four angles are 70°, 110°, 70°, 110°. Total = 360° ✓'
  }),

  // ── ANGLES ───────────────────────────────────────────────────────────────

  makeNum({
    id: 'g6m-geo-034', chapterId: 'g6-geometry', subsection: 'angles', difficulty: 2,
    question: 'Two angles are on a straight line. One angle is 73°. What is the OTHER angle?',
    answer: '107', acceptableAnswers: ['107', '107°'],
    hint: 'Angles on a straight line always add up to 180°.',
    explanation: 'Angles on a straight line are supplementary — they add to 180°. Other angle = 180° − 73° = <b>107°</b>. This pair of angles is called a <b>linear pair</b>.'
  }),

  makeNum({
    id: 'g6m-geo-035', chapterId: 'g6-geometry', subsection: 'angles', difficulty: 2,
    question: 'Two straight lines cross at a point. One of the angles formed is 48°. What is the size of the VERTICALLY OPPOSITE angle?',
    answer: '48', acceptableAnswers: ['48', '48°'],
    hint: 'Vertically opposite angles are always equal — they are the angles directly across from each other at a crossing point.',
    explanation: '<b>Vertically opposite angles are equal.</b> When two lines cross, they form two pairs of vertically opposite angles. The angle directly across from 48° is also <b>48°</b>. The other two angles are each 180° − 48° = 132°.'
  }),

  makeMCQ({
    id: 'g6m-geo-036', chapterId: 'g6-geometry', subsection: 'angles', difficulty: 2,
    question: 'What is the SUM of the interior angles of a PENTAGON (5-sided polygon)?',
    options: ['360°', '450°', '540°', '720°'],
    answer: '540°',
    hint: 'Formula: sum of interior angles = (n − 2) × 180°, where n is the number of sides.',
    explanation: 'Sum of interior angles = (n − 2) × 180° = (5 − 2) × 180° = 3 × 180° = <b>540°</b>. For reference: triangle (n=3): 180°; quadrilateral (n=4): 360°; pentagon (n=5): 540°; hexagon (n=6): 720°; octagon (n=8): 1080°.'
  }),

  makeNum({
    id: 'g6m-geo-037', chapterId: 'g6-geometry', subsection: 'angles', difficulty: 3,
    question: 'In a triangle, two interior angles are 64° and 55°. Using the exterior angle theorem, what is the EXTERIOR angle at the third vertex?',
    answer: '119', acceptableAnswers: ['119', '119°'],
    hint: 'The exterior angle of a triangle equals the sum of the two non-adjacent (remote) interior angles.',
    explanation: '<b>Exterior angle theorem:</b> The exterior angle equals the sum of the two remote interior angles. Exterior angle = 64° + 55° = <b>119°</b>. Check: third interior angle = 180° − 64° − 55° = 61°. Exterior = 180° − 61° = 119° ✓'
  }),

  makeTF({
    id: 'g6m-geo-038', chapterId: 'g6-geometry', subsection: 'angles', difficulty: 2,
    question: 'When a line crosses two parallel lines, the ALTERNATE angles (Z-angles) formed are equal.',
    answer: true,
    hint: 'Alternate angles are on opposite sides of the transversal and between the parallel lines — they form a Z-shape.',
    explanation: '<b>True.</b> When a transversal cuts two parallel lines, <b>alternate angles</b> (also called Z-angles) are <b>equal</b>. <b>Co-interior angles</b> (C-angles, on the same side) add up to 180°. <b>Corresponding angles</b> (F-angles, on the same side) are also equal.'
  }),

  // ── SYMMETRY ─────────────────────────────────────────────────────────────

  makeMCQ({
    id: 'g6m-geo-039', chapterId: 'g6-geometry', subsection: 'symmetry', difficulty: 1,
    question: 'The ORDER OF ROTATIONAL SYMMETRY of a shape is the number of times it looks the same during one full rotation (360°). What is the order of rotational symmetry of a SQUARE?',
    options: ['2', '3', '4', '8'],
    answer: '4',
    hint: 'Rotate a square: after 90°, 180°, 270° and 360° it looks the same. Count those positions.',
    explanation: 'A <b>square</b> has rotational symmetry of <b>order 4</b>: it looks identical after rotations of 90°, 180°, 270° and 360°. In general, for a regular polygon with n sides, the order of rotational symmetry = n. Rectangle = order 2; equilateral triangle = order 3; regular hexagon = order 6.'
  }),

  makeMCQ({
    id: 'g6m-geo-040', chapterId: 'g6-geometry', subsection: 'symmetry', difficulty: 2,
    question: 'A regular HEXAGON (6 sides) has both line symmetry and rotational symmetry. What is its order of ROTATIONAL symmetry?',
    options: ['3', '4', '6', '12'],
    answer: '6',
    hint: 'For a regular polygon with n sides, the order of rotational symmetry equals n.',
    explanation: 'A regular hexagon has rotational symmetry of <b>order 6</b>: it looks the same after rotations of 60°, 120°, 180°, 240°, 300° and 360°. It also has <b>6 lines of symmetry</b> (3 through opposite vertices and 3 through midpoints of opposite sides).'
  }),

  makeTF({
    id: 'g6m-geo-041', chapterId: 'g6-geometry', subsection: 'symmetry', difficulty: 1,
    question: 'A RECTANGLE has exactly 2 lines of symmetry.',
    answer: true,
    hint: 'Fold a rectangle left-to-right (through the midpoints of the long sides) and top-to-bottom (through the midpoints of the short sides). Do the diagonals work as fold lines?',
    explanation: '<b>True.</b> A rectangle has <b>2 lines of symmetry</b>: one through the midpoints of the longer sides and one through the midpoints of the shorter sides. Its diagonals are NOT lines of symmetry because folding along a diagonal does not make the two halves coincide (unlike a square, where all four — 2 diagonals + 2 midpoint lines — are lines of symmetry).'
  }),

  makeMCQ({
    id: 'g6m-geo-042', chapterId: 'g6-geometry', subsection: 'symmetry', difficulty: 2,
    question: 'A regular PENTAGON has 5 lines of symmetry. How many lines of symmetry does an EQUILATERAL TRIANGLE have?',
    options: ['1', '2', '3', '4'],
    answer: '3',
    hint: 'Each line of symmetry in an equilateral triangle goes from one vertex to the midpoint of the opposite side.',
    explanation: 'An <b>equilateral triangle</b> has <b>3 lines of symmetry</b>: one from each vertex to the midpoint of the opposite side. It also has rotational symmetry of order 3. In general, a regular polygon with n sides has n lines of symmetry and rotational symmetry of order n.'
  }),

  makeNum({
    id: 'g6m-geo-043', chapterId: 'g6-geometry', subsection: 'symmetry', difficulty: 3,
    question: 'A shape has rotational symmetry of order 8. Through how many degrees must you rotate it before it first looks the same again?',
    answer: '45', acceptableAnswers: ['45', '45°'],
    hint: 'Divide 360° by the order of rotational symmetry.',
    explanation: '360° ÷ 8 = <b>45°</b>. If the order of rotational symmetry is n, the shape first looks the same after rotating 360° ÷ n. Examples: order 2 → 180°; order 3 → 120°; order 4 → 90°; order 6 → 60°; order 8 → 45°.'
  })

);

})();
