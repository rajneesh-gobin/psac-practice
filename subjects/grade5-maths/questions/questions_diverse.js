'use strict';
// ═══════════════════════════════════════════════════════════
//  MathMaster Grade 5 — Diverse Question Bank
//  Fills gaps identified from MIE 2023/2024/2025 papers:
//  3D shapes, symmetry, angles, compound perimeter/area,
//  mixed numbers, equivalent fractions, unit conversions,
//  division with remainder, age problems, ordering
// ═══════════════════════════════════════════════════════════

(function () {

const DV = [

  // ══════════════════════════════════════════════
  //  GEOMETRY — 3D Shapes
  // ══════════════════════════════════════════════
  makeMCQ({ id:'DG01', chapterId:'geometry', difficulty:1,
    question:'How many <b>flat faces</b> does a <b>cylinder</b> have?',
    options:['0','1','2','3'],
    answer:'2',
    hint:'A cylinder has a circular face on top and one on the bottom.',
    explanation:'A cylinder has <b>2</b> flat (circular) faces.' }),

  makeMCQ({ id:'DG02', chapterId:'geometry', difficulty:1,
    question:'How many <b>faces</b> does a <b>cuboid</b> have?',
    options:['4','6','8','12'],
    answer:'6',
    hint:'Think of a cereal box — count top, bottom, front, back, left, right.',
    explanation:'A cuboid has <b>6</b> rectangular faces.' }),

  makeMCQ({ id:'DG03', chapterId:'geometry', difficulty:1,
    question:'How many <b>edges</b> does a <b>cuboid</b> have?',
    options:['6','8','10','12'],
    answer:'12',
    hint:'A cuboid has 4 edges along the top, 4 along the bottom, and 4 vertical edges.',
    explanation:'A cuboid has <b>12</b> edges.' }),

  makeMCQ({ id:'DG04', chapterId:'geometry', difficulty:1,
    question:'How many <b>vertices (corners)</b> does a <b>cuboid</b> have?',
    options:['4','6','8','12'],
    answer:'8',
    hint:'Count the corners of a box.',
    explanation:'A cuboid has <b>8</b> vertices.' }),

  makeMCQ({ id:'DG05', chapterId:'geometry', difficulty:1,
    question:'A <b>sphere</b> has how many <b>flat faces</b>?',
    options:['0','1','2','4'],
    answer:'0',
    hint:'A sphere is perfectly round — it has no flat surfaces.',
    explanation:'A sphere has <b>0</b> flat faces. Its entire surface is curved.' }),

  makeMCQ({ id:'DG06', chapterId:'geometry', difficulty:2,
    question:'Which <b>3D shape</b> has <b>1 circular flat face</b> and <b>1 curved surface</b> coming to a point?',
    options:['Cylinder','Sphere','Cone','Cuboid'],
    answer:'Cone',
    hint:'Think of an ice-cream cone.',
    explanation:'A <b>cone</b> has 1 circular flat face (base) and 1 curved surface ending in a point (apex).' }),

  makeMCQ({ id:'DG07', chapterId:'geometry', difficulty:2,
    question:'Which <b>3D shape</b> has <b>5 faces, 8 edges and 5 vertices</b>?',
    options:['Triangular prism','Square pyramid','Cuboid','Cylinder'],
    answer:'Square pyramid',
    hint:'A square base + 4 triangular faces = 5 faces.',
    explanation:'A <b>square pyramid</b>: 1 square base + 4 triangular faces = 5 faces, 8 edges, 5 vertices.' }),

  makeMCQ({ id:'DG08', chapterId:'geometry', difficulty:2,
    question:'A <b>triangular prism</b> has how many <b>faces</b>?',
    options:['3','4','5','6'],
    answer:'5',
    hint:'2 triangular ends + 3 rectangular sides.',
    explanation:'A triangular prism has <b>5</b> faces: 2 triangles + 3 rectangles.' }),

  makeMCQ({ id:'DG09', chapterId:'geometry', difficulty:3,
    question:'Priya says: <i>"My 3D shape has 2 triangular faces and 3 rectangular faces."</i><br>What is the name of Priya\'s shape?',
    options:['Square pyramid','Triangular prism','Cuboid','Triangular pyramid'],
    answer:'Triangular prism',
    hint:'2 triangular ends + 3 rectangular sides = which shape?',
    explanation:'A <b>triangular prism</b> has 2 triangular faces and 3 rectangular faces.' }),

  makeNum({ id:'DG10', chapterId:'geometry', difficulty:3,
    question:'A cuboid has <b>6 faces, 12 edges</b> and <b>___ vertices</b>.<br>How many vertices does it have?',
    answer:'8',
    hint:'Count the corners of a box — each corner is a vertex.',
    explanation:'A cuboid has <b>8</b> vertices.' }),

  // ══════════════════════════════════════════════
  //  GEOMETRY — Lines of Symmetry
  // ══════════════════════════════════════════════
  makeMCQ({ id:'DG11', chapterId:'geometry', difficulty:1,
    question:'How many <b>lines of symmetry</b> does a <b>rectangle</b> have?',
    options:['1','2','4','0'],
    answer:'2',
    hint:'One line cuts it horizontally, one cuts it vertically.',
    explanation:'A rectangle (that is not a square) has <b>2</b> lines of symmetry.' }),

  makeMCQ({ id:'DG12', chapterId:'geometry', difficulty:1,
    question:'How many <b>lines of symmetry</b> does an <b>isosceles triangle</b> have?',
    options:['0','1','2','3'],
    answer:'1',
    hint:'An isosceles triangle has 2 equal sides and 1 line from the apex to the midpoint of the base.',
    explanation:'An isosceles triangle has <b>1</b> line of symmetry.' }),

  makeMCQ({ id:'DG13', chapterId:'geometry', difficulty:2,
    question:'Which shape has <b>exactly 4 lines of symmetry</b>?',
    options:['Rectangle','Rhombus','Square','Parallelogram'],
    answer:'Square',
    hint:'4 sides + 4 diagonals of symmetry.',
    explanation:'A <b>square</b> has 4 lines of symmetry (2 through opposite sides, 2 through opposite corners).' }),

  makeMCQ({ id:'DG14', chapterId:'geometry', difficulty:2,
    question:'A <b>regular pentagon</b> has how many <b>lines of symmetry</b>?',
    options:['3','4','5','6'],
    answer:'5',
    hint:'A regular polygon with n sides has n lines of symmetry.',
    explanation:'A regular pentagon has <b>5</b> lines of symmetry — one through each vertex and opposite side.' }),

  makeMCQ({ id:'DG15', chapterId:'geometry', difficulty:2,
    question:'Which shape has <b>0 lines of symmetry</b>?',
    options:['Square','Rectangle','Parallelogram','Rhombus'],
    answer:'Parallelogram',
    hint:'A parallelogram cannot be folded onto itself along any straight line.',
    explanation:'A <b>parallelogram</b> (non-rhombus) has <b>0</b> lines of symmetry.' }),

  makeMCQ({ id:'DG16', chapterId:'geometry', difficulty:3,
    question:'Riya draws a shape. It has <b>only 1 line of symmetry</b> and <b>2 equal sides</b>.<br>Which shape is it most likely to be?',
    options:['Equilateral triangle','Isosceles triangle','Scalene triangle','Equilateral triangle'],
    answer:'Isosceles triangle',
    hint:'2 equal sides, 1 line of symmetry from the apex to the base.',
    explanation:'An <b>isosceles triangle</b> has 2 equal sides and exactly 1 line of symmetry.' }),

  makeNum({ id:'DG17', chapterId:'geometry', difficulty:4,
    question:'A shape has <b>6 lines of symmetry</b>. It is a regular polygon.<br>How many <b>sides</b> does it have?',
    answer:'6',
    hint:'A regular polygon with n sides has n lines of symmetry.',
    explanation:'n lines of symmetry = n sides. The shape is a regular <b>hexagon</b> with <b>6</b> sides.' }),

  // ══════════════════════════════════════════════
  //  GEOMETRY — Angles
  // ══════════════════════════════════════════════
  makeMCQ({ id:'DG18', chapterId:'geometry', difficulty:1,
    question:'An angle of <b>130°</b> is called a(n) ___.',
    options:['Acute angle','Right angle','Obtuse angle','Reflex angle'],
    answer:'Obtuse angle',
    hint:'Obtuse angles are between 90° and 180°.',
    explanation:'130° is between 90° and 180°, so it is an <b>obtuse angle</b>.' }),

  makeMCQ({ id:'DG19', chapterId:'geometry', difficulty:1,
    question:'An angle of <b>45°</b> is called a(n) ___.',
    options:['Acute angle','Right angle','Obtuse angle','Reflex angle'],
    answer:'Acute angle',
    hint:'Acute angles are less than 90°.',
    explanation:'45° is less than 90°, so it is an <b>acute angle</b>.' }),

  makeMCQ({ id:'DG20', chapterId:'geometry', difficulty:1,
    question:'An angle of <b>270°</b> is called a(n) ___.',
    options:['Acute angle','Right angle','Obtuse angle','Reflex angle'],
    answer:'Reflex angle',
    hint:'Reflex angles are greater than 180°.',
    explanation:'270° is greater than 180°, so it is a <b>reflex angle</b>.' }),

  makeNum({ id:'DG21', chapterId:'geometry', difficulty:2,
    question:'Two angles of a triangle are <b>55°</b> and <b>72°</b>.<br>Find the <b>third angle</b>.',
    answer:'53', acceptableAnswers:['53','53°'],
    hint:'All angles in a triangle add up to 180°. Third = 180 − 55 − 72.',
    explanation:'180 − 55 − 72 = <b>53°</b>.' }),

  makeNum({ id:'DG22', chapterId:'geometry', difficulty:2,
    question:'In an <b>equilateral triangle</b>, each angle measures ___°.',
    answer:'60',
    hint:'All 3 angles are equal. 180 ÷ 3 = ?',
    explanation:'180 ÷ 3 = <b>60°</b>. Each angle in an equilateral triangle is 60°.' }),

  makeNum({ id:'DG23', chapterId:'geometry', difficulty:3,
    question:'One angle of an <b>isosceles triangle</b> is <b>100°</b>. The other two angles are equal.<br>Find the size of <b>each</b> equal angle.',
    answer:'40', acceptableAnswers:['40','40°'],
    hint:'Equal angles sum = 180 − 100 = 80. Each = 80 ÷ 2.',
    explanation:'Remaining = 180−100 = 80°. Each equal angle = 80÷2 = <b>40°</b>.' }),

  makeNum({ id:'DG24', chapterId:'geometry', difficulty:3,
    question:'Three angles of a <b>quadrilateral</b> are <b>85°, 95°</b> and <b>110°</b>.<br>Find the <b>fourth angle</b>.',
    answer:'70', acceptableAnswers:['70','70°'],
    hint:'Angles in a quadrilateral sum to 360°. Fourth = 360 − 85 − 95 − 110.',
    explanation:'360 − 85 − 95 − 110 = <b>70°</b>.' }),

  makeMCQ({ id:'DG25', chapterId:'geometry', difficulty:3,
    question:'The sum of angles in a <b>triangle</b> is 180°. The sum of angles in a <b>quadrilateral</b> is ___.',
    options:['180°','270°','360°','540°'],
    answer:'360°',
    hint:'A quadrilateral can be split into 2 triangles: 2 × 180° = ?',
    explanation:'A quadrilateral = 2 triangles = 2 × 180° = <b>360°</b>.' }),

  // ══════════════════════════════════════════════
  //  GEOMETRY — Compound shapes (L-shapes, perimeter, area)
  // ══════════════════════════════════════════════
  makeNum({ id:'DG26', chapterId:'geometry', difficulty:3,
    question:'An L-shaped playground has the following measurements:<br>Total length = <b>10 m</b>, width = <b>6 m</b>. A rectangular piece of <b>4 m × 3 m</b> is cut from one corner.<br>Find the <b>perimeter</b> of the L-shape.',
    answer:'32', acceptableAnswers:['32','32m'],
    hint:'Trace the outline: bottom (10) + right (6) + step in (4) + step down (3) + top-left (6) + left side (3).',
    explanation:'10 + 6 + 4 + 3 + 6 + 3 = <b>32 m</b>.' }),

  makeNum({ id:'DG27', chapterId:'geometry', difficulty:3,
    question:'A rectangular garden is <b>14 m long</b> and <b>9 m wide</b>.<br>Fencing is needed on <b>3 sides only</b> (one long side has a wall).<br>Find the length of fencing needed.',
    answer:'32', acceptableAnswers:['32','32m'],
    hint:'3 sides: 14 + 9 + 9.',
    explanation:'14 + 9 + 9 = <b>32 m</b>.' }),

  makeNum({ id:'DG28', chapterId:'geometry', difficulty:4,
    question:'A rectangular field is <b>15 m long</b> and <b>8 m wide</b>. It costs <b>Rs 120 per metre</b> to fence the entire perimeter.<br>Find the <b>total cost of fencing</b>.',
    answer:'5520', acceptableAnswers:['5520','Rs 5520'],
    hint:'Perimeter = 2(15+8) = 46 m. Cost = 46 × 120.',
    explanation:'P = 2 × 23 = 46 m. Cost = 46 × 120 = <b>Rs 5,520</b>.' }),

  makeNum({ id:'DG29', chapterId:'geometry', difficulty:4,
    question:'A compound shape is made of a rectangle (<b>8 cm × 5 cm</b>) with a smaller rectangle (<b>3 cm × 2 cm</b>) removed from one corner.<br>Find the <b>area</b> of the remaining shape.',
    answer:'34', acceptableAnswers:['34','34cm2'],
    hint:'Large rectangle area − small rectangle area. 8×5 − 3×2.',
    explanation:'40 − 6 = <b>34 cm²</b>.' }),

  makeNum({ id:'DG30', chapterId:'geometry', difficulty:4,
    question:'A rectangle measuring <b>12 cm × 5 cm</b> has a right-angled triangle removed from one corner. The triangle has base <b>4 cm</b> and height <b>5 cm</b>.<br>Find the <b>area</b> of the remaining shape.',
    answer:'50', acceptableAnswers:['50','50cm2'],
    hint:'Rectangle − triangle. 12×5 − ½×4×5.',
    explanation:'60 − 10 = <b>50 cm²</b>.' }),

  // ══════════════════════════════════════════════
  //  FRACTIONS — Mixed numbers, improper fractions, equivalent
  // ══════════════════════════════════════════════
  makeNum({ id:'DFR01', chapterId:'fractions', difficulty:2,
    question:'Convert the mixed number <b>2¾</b> to an <b>improper fraction</b>.',
    answer:'11/4',
    hint:'2¾ = (2×4 + 3)/4.',
    explanation:'(2 × 4) + 3 = 11. Answer = <b>11/4</b>.' }),

  makeNum({ id:'DFR02', chapterId:'fractions', difficulty:2,
    question:'Convert <b>17/5</b> to a <b>mixed number</b>.',
    answer:'3 2/5', acceptableAnswers:['3 2/5','3⅖','3 and 2/5'],
    hint:'17 ÷ 5 = 3 remainder 2.',
    explanation:'17 ÷ 5 = 3 r 2. Mixed number = <b>3 2/5</b>.' }),

  makeNum({ id:'DFR03', chapterId:'fractions', difficulty:2,
    question:'Find the missing number: <b>3/4 = ?/16</b>',
    answer:'12',
    hint:'Multiply numerator and denominator by 4. 3×4=?, 4×4=16.',
    explanation:'3/4 = 12/16. Missing number = <b>12</b>.' }),

  makeNum({ id:'DFR04', chapterId:'fractions', difficulty:2,
    question:'Find the missing number: <b>2/3 = ?/15</b>',
    answer:'10',
    hint:'3 × 5 = 15. Multiply numerator by 5 too.',
    explanation:'2 × 5 = 10. Answer = <b>10</b>.' }),

  makeNum({ id:'DFR05', chapterId:'fractions', difficulty:2,
    question:'Find the missing number: <b>?/8 = 3/4</b>',
    answer:'6',
    hint:'4 × 2 = 8. Multiply numerator by 2 too.',
    explanation:'3 × 2 = 6. Answer = <b>6</b>.' }),

  makeNum({ id:'DFR06', chapterId:'fractions', difficulty:3,
    question:'Write <b>27/6</b> as a mixed number in its <b>simplest form</b>.',
    answer:'4 1/2', acceptableAnswers:['4 1/2','4½','4 and 1/2'],
    hint:'27÷6=4 r3. So 4 3/6 — now simplify 3/6.',
    explanation:'27÷6=4 r3 → 4 3/6. Simplify: 3/6 = 1/2. Answer = <b>4½</b>.' }),

  makeMCQ({ id:'DFR07', chapterId:'fractions', difficulty:3,
    question:'Which fraction is <b>equivalent</b> to <b>4/6</b>?',
    options:['1/2','2/3','3/4','5/8'],
    answer:'2/3',
    hint:'Simplify 4/6: divide top and bottom by 2.',
    explanation:'4÷2=2, 6÷2=3. So 4/6 = <b>2/3</b>.' }),

  makeNum({ id:'DFR08', chapterId:'fractions', difficulty:3,
    question:'Arrange these fractions in <b>ascending order</b> (smallest first):<br><b>1/2, 1/4, 3/4, 1/3</b>',
    answer:'1/4, 1/3, 1/2, 3/4', acceptableAnswers:['1/4, 1/3, 1/2, 3/4','1/4 1/3 1/2 3/4'],
    hint:'Convert to a common denominator (12): 6/12, 3/12, 9/12, 4/12.',
    explanation:'3/12 < 4/12 < 6/12 < 9/12 → <b>1/4, 1/3, 1/2, 3/4</b>.' }),

  makeNum({ id:'DFR09', chapterId:'fractions', difficulty:3,
    question:'What is <b>2/5</b> of <b>40</b>?',
    answer:'16',
    hint:'Find 1/5 first: 40÷5=8. Then × 2.',
    explanation:'40÷5=8. 8×2=<b>16</b>.' }),

  makeNum({ id:'DFR10', chapterId:'fractions', difficulty:3,
    question:'What is <b>3/4</b> of <b>64</b>?',
    answer:'48',
    hint:'64÷4=16. 16×3=?',
    explanation:'64÷4=16. 16×3=<b>48</b>.' }),

  makeNum({ id:'DFR11', chapterId:'fractions', difficulty:4,
    question:'Priya spends <b>1/3</b> of her money on food and <b>1/4</b> on transport.<br>She has <b>Rs 350</b> left.<br>How much money did she have <b>at first</b>?',
    answer:'840', acceptableAnswers:['840','Rs 840'],
    hint:'Spent = 1/3+1/4 = 7/12. Left = 5/12. If 5/12 = Rs350, total = 350×12÷5.',
    explanation:'Spent = 7/12. Left = 5/12 = Rs 350. Total = 350÷5×12 = <b>Rs 840</b>.' }),

  makeNum({ id:'DFR12', chapterId:'fractions', difficulty:4,
    question:'A class has <b>36 pupils</b>. <b>5/9</b> of them are girls.<br>How many <b>boys</b> are in the class?',
    answer:'16',
    hint:'Girls = 5/9 × 36 = 20. Boys = 36 − 20.',
    explanation:'Girls = 5/9 × 36 = 20. Boys = 36−20 = <b>16</b>.' }),

  // ══════════════════════════════════════════════
  //  DECIMALS — Unit conversions
  // ══════════════════════════════════════════════
  makeNum({ id:'DD01', chapterId:'decimals', difficulty:2,
    question:'Convert <b>3.5 kg</b> to <b>grams</b>.',
    answer:'3500', acceptableAnswers:['3500','3500g'],
    hint:'1 kg = 1000 g. Multiply by 1000.',
    explanation:'3.5 × 1000 = <b>3,500 g</b>.' }),

  makeNum({ id:'DD02', chapterId:'decimals', difficulty:2,
    question:'Convert <b>2.75 m</b> to <b>cm</b>.',
    answer:'275', acceptableAnswers:['275','275cm'],
    hint:'1 m = 100 cm. Multiply by 100.',
    explanation:'2.75 × 100 = <b>275 cm</b>.' }),

  makeNum({ id:'DD03', chapterId:'decimals', difficulty:2,
    question:'Convert <b>4.2 L</b> to <b>mL</b>.',
    answer:'4200', acceptableAnswers:['4200','4200mL'],
    hint:'1 L = 1000 mL. Multiply by 1000.',
    explanation:'4.2 × 1000 = <b>4,200 mL</b>.' }),

  makeNum({ id:'DD04', chapterId:'decimals', difficulty:2,
    question:'Convert <b>850 cm</b> to <b>metres</b>.',
    answer:'8.5', acceptableAnswers:['8.5','8.5m'],
    hint:'Divide by 100 to convert cm to m.',
    explanation:'850 ÷ 100 = <b>8.5 m</b>.' }),

  makeMCQ({ id:'DD05', chapterId:'decimals', difficulty:2,
    question:'Which is <b>greater</b>: <b>0.6</b> or <b>0.59</b>?',
    options:['0.59 is greater','0.6 is greater','They are equal','Cannot tell'],
    answer:'0.6 is greater',
    hint:'0.6 = 0.60. Compare: 0.60 vs 0.59.',
    explanation:'0.60 > 0.59 because 60 hundredths > 59 hundredths. <b>0.6 is greater</b>.' }),

  makeNum({ id:'DD06', chapterId:'decimals', difficulty:3,
    question:'Arrange in <b>ascending order</b>:<br><b>0.45, 0.5, 0.39, 0.4</b>',
    answer:'0.39, 0.4, 0.45, 0.5', acceptableAnswers:['0.39, 0.4, 0.45, 0.5','0.39 0.4 0.45 0.5'],
    hint:'Convert to hundredths: 0.39, 0.40, 0.45, 0.50.',
    explanation:'Smallest to largest: <b>0.39, 0.40, 0.45, 0.50</b>.' }),

  makeNum({ id:'DD07', chapterId:'decimals', difficulty:3,
    question:'Rs 6.05 equals how many <b>cents</b>?',
    answer:'605', acceptableAnswers:['605','605 cents'],
    hint:'1 Rs = 100 cents. Rs 6.05 = 6.05 × 100.',
    explanation:'6.05 × 100 = <b>605 cents</b>.' }),

  makeNum({ id:'DD08', chapterId:'decimals', difficulty:3,
    question:'A ribbon is <b>1.8 m</b> long. A piece of <b>65 cm</b> is cut off.<br>How much ribbon is left? Give in <b>cm</b>.',
    answer:'115', acceptableAnswers:['115','115cm'],
    hint:'1.8 m = 180 cm. 180 − 65 = ?',
    explanation:'180 − 65 = <b>115 cm</b>.' }),

  // ══════════════════════════════════════════════
  //  FOUR OPERATIONS — Division with remainder
  // ══════════════════════════════════════════════
  makeNum({ id:'DF01', chapterId:'four_ops', difficulty:2,
    question:'A teacher has <b>65 drinking straws</b>. She packs them in bags of <b>8</b>.<br>How many <b>full bags</b> can she make?',
    answer:'8',
    hint:'65 ÷ 8 = 8 remainder 1.',
    explanation:'65 ÷ 8 = 8 r 1. She can make <b>8</b> full bags.' }),

  makeNum({ id:'DF02', chapterId:'four_ops', difficulty:2,
    question:'A teacher has <b>65 drinking straws</b>. She packs them in bags of <b>8</b>.<br>How many straws are <b>left over</b>?',
    answer:'1',
    hint:'65 ÷ 8 = 8 remainder ?',
    explanation:'65 = 8×8 + 1. <b>1 straw</b> is left over.' }),

  makeNum({ id:'DF03', chapterId:'four_ops', difficulty:3,
    question:'A farmer has <b>150 mangoes</b> to pack into boxes of <b>12</b>.<br>How many <b>complete boxes</b> can he fill?',
    answer:'12',
    hint:'150 ÷ 12 = ? remainder ?',
    explanation:'150 ÷ 12 = 12 remainder 6. He fills <b>12</b> complete boxes.' }),

  makeNum({ id:'DF04', chapterId:'four_ops', difficulty:3,
    question:'A farmer has <b>150 mangoes</b> to pack into boxes of <b>12</b>. After filling complete boxes, how many mangoes are <b>left</b>?',
    answer:'6',
    hint:'150 = 12×12 + ? ',
    explanation:'12 × 12 = 144. 150 − 144 = <b>6 mangoes</b> left over.' }),

  makeNum({ id:'DF05', chapterId:'four_ops', difficulty:4,
    question:'Keshav has <b>97 sweets</b>. He wants to share them <b>equally</b> among <b>8 friends</b>.<br>How many sweets does <b>each friend</b> get, and how many are <b>left for Keshav</b>?<br>Type: each friend gets ___ and ___ left. (just the two numbers separated by comma)',
    answer:'12, 1', acceptableAnswers:['12, 1','12,1','12 and 1'],
    hint:'97 ÷ 8 = ? remainder ?',
    explanation:'97 ÷ 8 = 12 r 1. Each friend gets <b>12</b> sweets, <b>1</b> left for Keshav.' }),

  // ══════════════════════════════════════════════
  //  FOUR OPERATIONS — Age problems
  // ══════════════════════════════════════════════
  makeNum({ id:'DF06', chapterId:'four_ops', difficulty:3,
    question:'Riya is <b>9 years old</b>. Her mother is <b>4 times</b> as old as Riya.<br>How old is Riya\'s mother?',
    answer:'36', acceptableAnswers:['36','36 years'],
    hint:'4 × 9 = ?',
    explanation:'4 × 9 = <b>36 years</b>.' }),

  makeNum({ id:'DF07', chapterId:'four_ops', difficulty:3,
    question:'Dev is <b>12 years old</b>. His father is <b>3 times older</b> than Dev.<br>In <b>4 years</b>, how old will Dev\'s father be?',
    answer:'40', acceptableAnswers:['40','40 years'],
    hint:'Father now = 3×12 = 36. In 4 years: 36+4.',
    explanation:'Father now = 36. In 4 years = 36+4 = <b>40 years</b>.' }),

  makeNum({ id:'DF08', chapterId:'four_ops', difficulty:4,
    question:'Ahmad is <b>8 years old</b>. His grandfather is <b>7 times</b> as old as Ahmad.<br>How many years ago was the grandfather <b>5 times</b> as old as Ahmad?',
    answer:'4', acceptableAnswers:['4','4 years'],
    hint:'Grandfather now = 56. Let x years ago: 56-x = 5(8-x). Solve.',
    explanation:'56-x = 5(8-x) = 40-5x. 4x=−16. x=4. <b>4 years ago</b> (grandfather was 52, Ahmad was 4, 52=5×4 ✓).' }),

  // ══════════════════════════════════════════════
  //  NUMERATION — Ordering and place value
  // ══════════════════════════════════════════════
  makeNum({ id:'DN01', chapterId:'numeration', difficulty:2,
    question:'Arrange in <b>descending order</b> (greatest first):<br><b>5,432 &nbsp; 4,523 &nbsp; 5,243 &nbsp; 4,532</b>',
    answer:'5432, 5243, 4532, 4523', acceptableAnswers:['5432, 5243, 4532, 4523','5432 5243 4532 4523'],
    hint:'Compare thousands digit first, then hundreds.',
    explanation:'Thousands: 5>4. Between 5432 and 5243: hundreds 4>2. Order: <b>5,432 → 5,243 → 4,532 → 4,523</b>.' }),

  makeNum({ id:'DN02', chapterId:'numeration', difficulty:2,
    question:'Write the number <b>forty-seven thousand and sixty-five</b> in figures.',
    answer:'47065',
    hint:'47,000 + 65 = 47,065. Be careful: "sixty-five" means no hundreds.',
    explanation:'47,000 + 0 hundreds + 65 = <b>47,065</b>.' }),

  makeMCQ({ id:'DN03', chapterId:'numeration', difficulty:2,
    question:'What is the value of the digit <b>4</b> in the number <b>24,750</b>?',
    options:['4','40','400','4,000'],
    answer:'4,000',
    hint:'24,750: the 4 is in the thousands position.',
    explanation:'4 × 1,000 = <b>4,000</b>.' }),

  makeNum({ id:'DN04', chapterId:'numeration', difficulty:3,
    question:'Round <b>38,462</b> to the nearest <b>thousand</b>.',
    answer:'38000', acceptableAnswers:['38000','38,000'],
    hint:'Hundreds digit = 4. Since 4 < 5, round down.',
    explanation:'Hundreds digit is 4, so round down: <b>38,000</b>.' }),

  makeNum({ id:'DN05', chapterId:'numeration', difficulty:3,
    question:'A number rounded to the nearest <b>ten</b> gives <b>450</b>.<br>What is the <b>smallest</b> possible original number?',
    answer:'445',
    hint:'For rounding to 450, original must be 445 to 454.',
    explanation:'The smallest number that rounds to 450 is <b>445</b>.' }),

  // ══════════════════════════════════════════════
  //  LENGTH — More conversions and word problems
  // ══════════════════════════════════════════════
  makeNum({ id:'DL01', chapterId:'length', difficulty:2,
    question:'Convert <b>3 km 450 m</b> to <b>metres</b>.',
    answer:'3450', acceptableAnswers:['3450','3450m'],
    hint:'1 km = 1000 m. 3 km = 3000 m. 3000 + 450.',
    explanation:'3 × 1000 + 450 = <b>3,450 m</b>.' }),

  makeNum({ id:'DL02', chapterId:'length', difficulty:2,
    question:'Convert <b>4250 m</b> to <b>km and m</b>.',
    answer:'4km 250m', acceptableAnswers:['4km 250m','4 km 250 m'],
    hint:'4250 ÷ 1000 = 4 km remainder 250 m.',
    explanation:'4250 m = <b>4 km 250 m</b>.' }),

  makeNum({ id:'DL03', chapterId:'length', difficulty:3,
    question:'A running track is <b>400 m</b> long. Mia runs around it <b>5 times</b>.<br>How many <b>km</b> does she run in total?',
    answer:'2', acceptableAnswers:['2','2km','2 km'],
    hint:'Total metres = 400 × 5 = 2000. 2000 m = ? km.',
    explanation:'400 × 5 = 2,000 m = <b>2 km</b>.' }),

  makeNum({ id:'DL04', chapterId:'length', difficulty:4,
    question:'A piece of rope is <b>12 m 60 cm</b> long. It is cut into <b>6 equal pieces</b>.<br>How long is <b>each piece</b> in <b>cm</b>?',
    answer:'210', acceptableAnswers:['210','210cm'],
    hint:'12 m 60 cm = 1260 cm. 1260 ÷ 6.',
    explanation:'1260 ÷ 6 = <b>210 cm</b>.' }),

  // ══════════════════════════════════════════════
  //  AREA — More problems
  // ══════════════════════════════════════════════
  makeNum({ id:'DAR01', chapterId:'area', difficulty:2,
    question:'Find the area of a <b>square</b> with side <b>9 cm</b>.',
    answer:'81', acceptableAnswers:['81','81cm2'],
    hint:'Area of square = side × side.',
    explanation:'9 × 9 = <b>81 cm²</b>.' }),

  makeNum({ id:'DAR02', chapterId:'area', difficulty:3,
    question:'A room is <b>6 m long</b> and <b>5 m wide</b>. Tiles cost <b>Rs 85 per m²</b>.<br>Find the <b>cost</b> of tiling the entire floor.',
    answer:'2550', acceptableAnswers:['2550','Rs 2550'],
    hint:'Area = 6×5=30 m². Cost = 30×85.',
    explanation:'30 × 85 = <b>Rs 2,550</b>.' }),

  makeNum({ id:'DAR03', chapterId:'area', difficulty:3,
    question:'A rectangle has an area of <b>72 cm²</b> and a length of <b>9 cm</b>.<br>Find its <b>width</b>.',
    answer:'8', acceptableAnswers:['8','8cm'],
    hint:'Width = area ÷ length.',
    explanation:'72 ÷ 9 = <b>8 cm</b>.' }),

  makeNum({ id:'DAR04', chapterId:'area', difficulty:4,
    question:'A path of <b>1 m width</b> runs all around the outside of a garden that is <b>8 m × 5 m</b>.<br>Find the area of the <b>path only</b>.',
    answer:'28', acceptableAnswers:['28','28m2'],
    hint:'Outer rectangle = (8+2)×(5+2)=70. Inner = 8×5=40. Path = 70−40.',
    explanation:'Outer = 10×7=70. Inner=40. Path = 70−40 = <b>28 m²</b>.' }),

  // ══════════════════════════════════════════════
  //  MASS — More problems
  // ══════════════════════════════════════════════
  makeNum({ id:'DM01', chapterId:'mass', difficulty:2,
    question:'Convert <b>3 kg 250 g</b> to <b>grams</b>.',
    answer:'3250', acceptableAnswers:['3250','3250g'],
    hint:'3 kg = 3000 g. Add 250.',
    explanation:'3000 + 250 = <b>3,250 g</b>.' }),

  makeNum({ id:'DM02', chapterId:'mass', difficulty:3,
    question:'Rita buys <b>3.5 kg</b> of flour and <b>750 g</b> of sugar. What is the <b>total mass</b> in grams?',
    answer:'4250', acceptableAnswers:['4250','4250g'],
    hint:'3.5 kg = 3500 g. 3500 + 750.',
    explanation:'3500 + 750 = <b>4,250 g</b>.' }),

  makeNum({ id:'DM03', chapterId:'mass', difficulty:4,
    question:'A sack of rice weighs <b>50 kg</b>. Mala uses <b>2 kg 500 g</b> every week.<br>How many <b>weeks</b> will the sack last?',
    answer:'20',
    hint:'2 kg 500 g = 2.5 kg. 50 ÷ 2.5 = ?',
    explanation:'50 ÷ 2.5 = <b>20 weeks</b>.' }),

  // ══════════════════════════════════════════════
  //  CAPACITY — More problems
  // ══════════════════════════════════════════════
  makeNum({ id:'DC01', chapterId:'capacity', difficulty:2,
    question:'Convert <b>2 L 350 mL</b> to <b>mL</b>.',
    answer:'2350', acceptableAnswers:['2350','2350mL'],
    hint:'2 L = 2000 mL. Add 350.',
    explanation:'2000 + 350 = <b>2,350 mL</b>.' }),

  makeNum({ id:'DC02', chapterId:'capacity', difficulty:3,
    question:'A jug holds <b>1 L 200 mL</b>. It is <b>¾ full</b>.<br>How much water is in the jug?',
    answer:'900', acceptableAnswers:['900','900mL'],
    hint:'1200 mL × ¾ = 1200×3÷4.',
    explanation:'1200 × 3 ÷ 4 = <b>900 mL</b>.' }),

  // ══════════════════════════════════════════════
  //  MONEY — More word problems
  // ══════════════════════════════════════════════
  makeNum({ id:'DMO01', chapterId:'money', difficulty:3,
    question:'A stall sells:<br>• Mango juice: Rs 25 per cup<br>• Coconut water: Rs 30 per cup<br>Priya buys <b>3 mango juices</b> and <b>2 coconut waters</b>.<br>How much does she pay?',
    answer:'135', acceptableAnswers:['135','Rs 135'],
    hint:'3×25 + 2×30 = 75 + 60.',
    explanation:'75 + 60 = <b>Rs 135</b>.' }),

  makeNum({ id:'DMO02', chapterId:'money', difficulty:4,
    question:'Rani earns <b>Rs 4,500 per month</b>. She spends <b>Rs 1,800 on rent</b> and <b>Rs 950 on food</b>.<br>She saves the rest. What <b>fraction</b> of her salary does she save? (Give in simplest form)',
    answer:'7/18',
    hint:'Spent = 1800+950=2750. Saved = 4500-2750=1750. Fraction = 1750/4500. Simplify by GCF=250.',
    explanation:'Saved = Rs 1,750. 1750/4500: GCF = 250. 1750÷250 = 7, 4500÷250 = 18. Answer = <b>7/18</b>.' }),

  makeNum({ id:'DMO03', chapterId:'money', difficulty:4,
    question:'Vegetables cost: <b>Carrot Rs 70.50/kg, Peas Rs 116/kg, Cabbage Rs 60/kg</b>.<br>Amira buys <b>½ kg of peas</b> and <b>1 kg of cabbage</b>.<br>She pays with a <b>Rs 200 note</b>. What change does she receive?',
    answer:'82', acceptableAnswers:['82','Rs 82'],
    hint:'Peas = 0.5×116=58. Cabbage = 60. Total = 118. Change = 200−118.',
    explanation:'58 + 60 = Rs 118. Change = 200−118 = <b>Rs 82</b>.' }),

  // ══════════════════════════════════════════════
  //  TIME — More word problems
  // ══════════════════════════════════════════════
  makeNum({ id:'DT01', chapterId:'time', difficulty:2,
    question:'A train journey takes <b>2 hours 35 minutes</b>.<br>The train departs at <b>09:20</b>. At what time does it arrive?',
    answer:'11:55', acceptableAnswers:['11:55','11:55am'],
    hint:'09:20 + 2h = 11:20. 11:20 + 35min = 11:55.',
    explanation:'09:20 + 2h 35min = <b>11:55</b>.' }),

  makeNum({ id:'DT02', chapterId:'time', difficulty:2,
    question:'Convert <b>3 hours 20 minutes</b> to <b>minutes</b>.',
    answer:'200', acceptableAnswers:['200','200 minutes'],
    hint:'3 hours = 3×60=180 min. 180+20.',
    explanation:'180 + 20 = <b>200 minutes</b>.' }),

  makeNum({ id:'DT03', chapterId:'time', difficulty:3,
    question:'Reza takes <b>50 minutes less</b> than Eshan to travel to work.<br>Eshan takes <b>1 hour 45 minutes</b>.<br>How long does Reza\'s journey take?',
    answer:'55min', acceptableAnswers:['55min','55 min','55 minutes'],
    hint:'1h45min = 105 min. 105 − 50.',
    explanation:'105 − 50 = 55 minutes = <b>55 min</b>.' }),

  makeNum({ id:'DT04', chapterId:'time', difficulty:3,
    question:'A school day starts at <b>08:45</b> and ends at <b>14:45</b>.<br>There are <b>two breaks</b> of <b>20 minutes</b> each.<br>How many minutes of <b>lesson time</b> are there?',
    answer:'320', acceptableAnswers:['320','320 minutes'],
    hint:'Total time = 6h = 360 min. Break = 2×20=40 min. Lessons = 360−40.',
    explanation:'360 − 40 = <b>320 minutes</b>.' }),

  makeNum({ id:'DT05', chapterId:'time', difficulty:4,
    question:'A film lasts <b>2 hours 15 minutes</b>. It ends at <b>6:00 p.m.</b><br>At what time did it <b>start</b>?',
    answer:'3:45pm', acceptableAnswers:['3:45pm','3:45 pm','15:45'],
    hint:'Work backwards: 6:00 − 2h = 4:00. 4:00 − 15 min = 3:45.',
    explanation:'6:00 − 2h 15min = <b>3:45 p.m.</b>' }),

  // ══════════════════════════════════════════════
  //  AVERAGE — More word problems
  // ══════════════════════════════════════════════
  makeNum({ id:'DAV01', chapterId:'average', difficulty:3,
    question:'The ages of 5 children are: <b>8, 11, 9, 7, 10</b>.<br>Find their <b>average age</b>.',
    answer:'9', acceptableAnswers:['9','9 years'],
    hint:'Sum = 8+11+9+7+10 = 45. Average = 45 ÷ 5.',
    explanation:'45 ÷ 5 = <b>9 years</b>.' }),

  makeNum({ id:'DAV02', chapterId:'average', difficulty:4,
    question:'The average score of 4 pupils is <b>72</b>. A fifth pupil joins and the new average becomes <b>70</b>.<br>What is the <b>fifth pupil\'s score</b>?',
    answer:'62',
    hint:'Old total = 4×72=288. New total = 5×70=350. Fifth = 350−288.',
    explanation:'4×72=288. 5×70=350. Fifth pupil = 350−288 = <b>62</b>.' }),

  makeNum({ id:'DAV03', chapterId:'average', difficulty:4,
    question:'The average mass of <b>3 bags</b> is <b>8.4 kg</b>. Two of the bags weigh <b>9.2 kg</b> and <b>7.6 kg</b>.<br>What is the mass of the <b>third bag</b>?',
    answer:'8.4', acceptableAnswers:['8.4','8.4kg'],
    hint:'Total = 3×8.4=25.2. Third = 25.2 − 9.2 − 7.6.',
    explanation:'Total = 25.2. Third = 25.2 − 9.2 − 7.6 = <b>8.4 kg</b>.' }),

  // ══════════════════════════════════════════════
  //  RATIO — More word problems
  // ══════════════════════════════════════════════
  makeNum({ id:'DR01', chapterId:'ratio', difficulty:3,
    question:'Orange juice and mango juice are mixed in the ratio <b>2:3</b>.<br>If there are <b>250 mL</b> of orange juice, how much <b>mango juice</b> is there?',
    answer:'375', acceptableAnswers:['375','375mL'],
    hint:'2 parts = 250 mL. 1 part = 125 mL. Mango = 3 parts.',
    explanation:'1 part = 125. Mango = 3×125 = <b>375 mL</b>.' }),

  makeNum({ id:'DR02', chapterId:'ratio', difficulty:3,
    question:'A recipe for <b>12 cupcakes</b> needs:<br>• 175 g butter &nbsp;• 150 g sugar &nbsp;• 200 g flour<br>How much <b>flour</b> is needed for <b>36 cupcakes</b>?',
    answer:'600', acceptableAnswers:['600','600g'],
    hint:'36 ÷ 12 = 3. All quantities × 3.',
    explanation:'Scale factor = 3. Flour = 200 × 3 = <b>600 g</b>.' }),

  makeNum({ id:'DR03', chapterId:'ratio', difficulty:4,
    question:'A cupcake recipe for <b>12</b> needs <b>175 g butter, 150 g sugar, 200 g flour</b>.<br>Mother makes <b>24 cupcakes</b> from a <b>500 g packet</b> of flour.<br>How much <b>flour is left</b>?',
    answer:'100', acceptableAnswers:['100','100g'],
    hint:'For 24: scale=2. Flour needed = 200×2=400g. Left = 500−400.',
    explanation:'400g used. 500−400 = <b>100 g left</b>.' }),

  makeNum({ id:'DR04', chapterId:'ratio', difficulty:4,
    question:'Ahmad and Leila share <b>Rs 2,800</b> in the ratio <b>3:4</b>.<br>How much does <b>Leila</b> get?',
    answer:'1600', acceptableAnswers:['1600','Rs 1600'],
    hint:'Total parts = 7. One part = 2800÷7=400. Leila = 4 parts.',
    explanation:'1 part = 400. Leila = 4×400 = <b>Rs 1,600</b>.' }),

  // ══════════════════════════════════════════════
  //  GRAPHS — True/False and varied
  // ══════════════════════════════════════════════
  makeMCQ({ id:'DGR01', chapterId:'graphs', difficulty:2,
    question:`A pictogram shows loaves baked in a bakery:
<div class="picto-wrap">
<table class="picto-table">
  <tr><th>Day</th><th>Symbols</th></tr>
  <tr><td>Monday</td><td><span class="picto-sym">🍞🍞🍞🍞🍞🍞</span></td></tr>
  <tr><td>Tuesday</td><td><span class="picto-sym">🍞🍞🍞🍞</span></td></tr>
  <tr><td>Wednesday</td><td><span class="picto-sym">🍞🍞🍞</span></td></tr>
</table>
<span class="picto-key">🔑 Key: 🍞 = 50 loaves</span>
</div>
How many loaves were baked on <b>Monday</b>?`,
    options:['56','250','300','350'],
    answer:'300',
    hint:'6 symbols × 50 loaves each.',
    explanation:'6 × 50 = <b>300 loaves</b>.' }),

  makeMCQ({ id:'DGR02', chapterId:'graphs', difficulty:3,
    question:'A bar chart shows pupils\' favourite sport:<br>Football=18, Cricket=12, Swimming=8, Tennis=6.<br>What fraction of pupils chose <b>Cricket</b>? (simplest form)',
    options:['12/44','3/11','4/15','1/4'],
    answer:'3/11',
    hint:'Total = 18+12+8+6=44. Cricket = 12/44. Simplify.',
    explanation:'12/44 ÷ 4 = <b>3/11</b>.' }),

  makeNum({ id:'DGR03', chapterId:'graphs', difficulty:4,
    question:'A bar chart of weekly sales (Mon–Fri): 45, 60, 38, 55, 52.<br>Find the <b>average daily sales</b>.',
    answer:'50',
    hint:'Total = 45+60+38+55+52=250. Average = 250÷5.',
    explanation:'Total = 250. Average = 250÷5 = <b>50</b>.' }),

  // ══════════════════════════════════════════════
  //  SQUARE NUMBERS — extra L4 word problems
  // ══════════════════════════════════════════════
  makeNum({ id:'SQ_W01', chapterId:'square_nums', difficulty:4,
    question:'A square room has a <b>perimeter of 48 m</b>.<br>Find the <b>area</b> of the room.',
    answer:'144', acceptableAnswers:['144','144m2'],
    hint:'Perimeter = 4 × side. Find the side first, then Area = side².',
    explanation:'Side = 48 ÷ 4 = 12 m. Area = 12² = <b>144 m²</b>.' }),

  makeNum({ id:'SQ_W02', chapterId:'square_nums', difficulty:4,
    question:'A square floor has an <b>area of 64 m²</b>. Tiles cost <b>Rs 95 per m²</b>.<br>Find the <b>total cost</b> of tiling the floor.',
    answer:'6080', acceptableAnswers:['6080','Rs 6080'],
    hint:'Area is already given. Total cost = 64 × 95.',
    explanation:'64 × 95 = <b>Rs 6,080</b>.' }),

  makeNum({ id:'SQ_W03', chapterId:'square_nums', difficulty:4,
    question:'Mia makes square tile patterns: Pattern 1 = 1 tile, Pattern 2 = 4 tiles, Pattern 3 = 9 tiles…<br>In which <b>pattern number</b> does she first use <b>more than 50 tiles</b>?',
    answer:'8',
    hint:'Square numbers: 1,4,9,16,25,36,49,64… Which is the first one greater than 50?',
    explanation:'7² = 49 (not more than 50). 8² = 64 > 50. Answer: Pattern <b>8</b>.' }),

  makeNum({ id:'SQ_W04', chapterId:'square_nums', difficulty:4,
    question:'Keshav has the <b>6th square pattern</b> of tiles. He wants to build the <b>7th square pattern</b>.<br>How many <b>more tiles</b> does he need?',
    answer:'13',
    hint:'6th square = 6² = 36. 7th square = 7² = 49. Extra = 49 − 36.',
    explanation:'49 − 36 = <b>13 tiles</b>.' }),

  makeNum({ id:'SQ_W05', chapterId:'square_nums', difficulty:4,
    question:'Square garden A has a side of <b>9 m</b>. Square garden B has a side of <b>6 m</b>.<br>How much <b>greater</b> is the area of garden A than garden B?',
    answer:'45', acceptableAnswers:['45','45m2'],
    hint:'Area A = 9² = 81. Area B = 6² = 36. Difference = 81 − 36.',
    explanation:'81 − 36 = <b>45 m²</b>.' }),

  makeNum({ id:'SQ_W06', chapterId:'square_nums', difficulty:4,
    question:'A farmer divides his land into <b>196 equal square plots</b> arranged in a perfect square grid.<br>How many plots are there in <b>each row</b>?',
    answer:'14',
    hint:'Find the square root of 196. Which number × itself = 196?',
    explanation:'14 × 14 = 196. Each row has <b>14 plots</b>.' }),

  makeNum({ id:'SQ_W07', chapterId:'square_nums', difficulty:4,
    question:'A square park has an <b>area of 121 m²</b>. One side needs fencing. Fencing costs <b>Rs 35 per metre</b>.<br>What is the <b>total fencing cost</b>?',
    answer:'385', acceptableAnswers:['385','Rs 385'],
    hint:'Side = √121. Cost = side × 35.',
    explanation:'Side = 11 m. Cost = 11 × 35 = <b>Rs 385</b>.' }),

  makeNum({ id:'SQ_W08', chapterId:'square_nums', difficulty:4,
    question:'Priya arranges stamps in a <b>7 × 7</b> square grid.<br>She wants to make the <b>next bigger</b> square grid.<br>How many <b>more stamps</b> does she need?',
    answer:'15',
    hint:'Next square = 8 × 8 = 64. Current = 7 × 7 = 49. Extra = 64 − 49.',
    explanation:'64 − 49 = <b>15 stamps</b>.' }),

  makeNum({ id:'SQ_W09', chapterId:'square_nums', difficulty:4,
    question:'A square swimming pool has a side of <b>12 m</b>. A square changing room has a side of <b>5 m</b>.<br>The <b>combined area</b> of both is paved at <b>Rs 200 per m²</b>.<br>Find the <b>total paving cost</b>.',
    answer:'33800', acceptableAnswers:['33800','Rs 33800'],
    hint:'Pool = 12² = 144. Changing room = 5² = 25. Total area = 169. Cost = 169 × 200.',
    explanation:'144 + 25 = 169 m². 169 × 200 = <b>Rs 33,800</b>.' }),

  makeMCQ({ id:'SQ_W10', chapterId:'square_nums', difficulty:4,
    question:'Leila has 36 counters in a <b>6×6 square</b>. She adds counters to make the <b>8th square pattern</b>.<br>How many <b>extra counters</b> does she need?',
    options:['13','15','28','16'],
    answer:'28',
    hint:'8th square = 8² = 64. Current = 6² = 36. Extra = 64 − 36.',
    explanation:'64 − 36 = <b>28 counters</b>.' }),

  // ══════════════════════════════════════════════
  //  SYMMETRY — Interactive grid questions
  //  Grid layout: 6×7 (vertical axis at col 3)
  //               7×6 (horizontal axis at row 3)
  //  given = cells already filled (left/top side)
  //  answer = auto-mirrored (right/bottom side)
  // ══════════════════════════════════════════════

  // SYM01 — Cross / plus shape (vertical axis)
  // . . . | . . .
  // . . X | X . .
  // X X X | X X X
  // . . X | X . .
  // . . . | . . .
  // . . . | . . .
  makeSymmetry({ id:'SYM01', chapterId:'geometry', difficulty:2,
    rows:6, cols:7, axis:'vertical', axisPos:3,
    question:'<b>Complete the symmetric pattern</b> by clicking the empty cells on the right side of the yellow line.',
    given:[[1,2],[2,0],[2,1],[2,2],[3,2]],
    hint:'Find where each filled cell is, then click its mirror position on the other side.' }),

  // SYM02 — Arrow pointing right (vertical axis)
  // . . . | . . .
  // . X . | . X .
  // . X X | X X .
  // . X . | . X .
  // . . . | . . .
  // . . . | . . .
  makeSymmetry({ id:'SYM02', chapterId:'geometry', difficulty:2,
    rows:6, cols:7, axis:'vertical', axisPos:3,
    question:'<b>Complete the symmetric pattern</b> — click the cells to mirror the shape across the yellow line.',
    given:[[1,1],[2,1],[2,2],[3,1]],
    hint:'The shape is like an arrow. Mirror each filled cell to its opposite position.' }),

  // SYM03 — Zigzag staircase (vertical axis)
  // X . . | . . X
  // . X . | . X .
  // . . X | X . .
  // . X . | . X .
  // X . . | . . X
  // . . . | . . .
  makeSymmetry({ id:'SYM03', chapterId:'geometry', difficulty:3,
    rows:6, cols:7, axis:'vertical', axisPos:3,
    question:'<b>Complete the symmetric pattern.</b> The shape is a zigzag — mirror it across the yellow line.',
    given:[[0,0],[1,1],[2,2],[3,1],[4,0]],
    hint:'Each cell at column 0 mirrors to column 6, column 1 to column 5, column 2 to column 4.' }),

  // SYM04 — L-shape (vertical axis)
  // . . X | X . .
  // . . X | X . .
  // . . X | X . .
  // X X X | X X X
  // . . . | . . .
  // . . . | . . .
  makeSymmetry({ id:'SYM04', chapterId:'geometry', difficulty:3,
    rows:6, cols:7, axis:'vertical', axisPos:3,
    question:'<b>Complete the symmetric pattern.</b> The left side shows an L-shape — mirror it to the right.',
    given:[[0,2],[1,2],[2,2],[3,0],[3,1],[3,2]],
    hint:'The vertical part (column 2) mirrors to column 4. The horizontal part mirrors across the axis.' }),

  // SYM05 — T-shape (horizontal axis)
  // . X X X X .
  // . . X X . .
  // . . X X . .
  // ============ (axis row 3)
  // . . X X . .  ← student fills
  // . . X X . .
  // . X X X X .
  makeSymmetry({ id:'SYM05', chapterId:'geometry', difficulty:3,
    rows:7, cols:6, axis:'horizontal', axisPos:3,
    question:'<b>Complete the symmetric pattern</b> below the yellow line — mirror the shape from the top half.',
    given:[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[2,2],[2,3]],
    hint:'Row 0 mirrors to row 6. Row 1 mirrors to row 5. Row 2 mirrors to row 4.' }),

  // SYM06 — Flag / triangle (horizontal axis)
  // X X X X . .
  // . X X X . .
  // . . X X . .
  // ============
  // . . X X . .  ← student fills
  // . X X X . .
  // X X X X . .
  makeSymmetry({ id:'SYM06', chapterId:'geometry', difficulty:4,
    rows:7, cols:6, axis:'horizontal', axisPos:3,
    question:'<b>Complete the symmetric pattern</b> — the bottom half should mirror the top half across the yellow line.',
    given:[[0,0],[0,1],[0,2],[0,3],[1,1],[1,2],[1,3],[2,2],[2,3]],
    hint:'Row 0 mirrors to row 6, row 1 to row 5, row 2 to row 4.' }),

];  // ← closes DV array (moved closing bracket here)

DV.forEach(q => { if (q) STATIC_QUESTIONS.push(q); });
console.log(`✅ Diverse bank loaded. Added ${DV.filter(Boolean).length} questions (3D shapes, symmetry, angles, compound shapes, fractions, conversions).`);

})();
