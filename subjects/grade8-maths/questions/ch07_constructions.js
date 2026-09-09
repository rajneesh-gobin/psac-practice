'use strict';
(function () {

// Grade 8 Maths — Construction of Triangles (g8m-constructions)
// Subsections: construct_triangles · given_conditions · construct_problems
// Source: MIE Grade 8 Maths textbook pp.254-266

STATIC_QUESTIONS.push(

  // ── construct_triangles (001–025) ────────────────────────────────────────────

  makeMCQ({ id:'g8m-con-001', chapterId:'g8m-constructions', difficulty:1,
    subsection:'construct_triangles',
    question:'Which instruments are used to construct a triangle accurately?',
    options:[
      'Pencil and paper only',
      'Ruler, compass and protractor',
      'Calculator and graph paper',
      'Ruler and set square only'
    ], answer:'Ruler, compass and protractor',
    hint:'You need to draw straight lines, arcs, and measure angles.',
    explanation:'<b>Ruler, compass and protractor</b> are the standard tools. A compass draws arcs for precise lengths; a protractor measures angles; a ruler draws straight sides.' }),

  makeMCQ({ id:'g8m-con-002', chapterId:'g8m-constructions', difficulty:1,
    subsection:'construct_triangles',
    question:'What is the minimum information needed to construct a UNIQUE triangle?',
    options:[
      'One side length',
      'Two side lengths',
      'Three angles',
      'Three side lengths (SSS)'
    ], answer:'Three side lengths (SSS)',
    hint:'Three angles alone don\'t give a unique triangle — many similar triangles fit.',
    explanation:'Three sides (SSS) uniquely determine a triangle. Three angles alone give a family of similar triangles, not a unique one.' }),

  makeTF({ id:'g8m-con-003', chapterId:'g8m-constructions', difficulty:1,
    subsection:'construct_triangles',
    question:'You can construct a unique triangle if you know all three side lengths.',
    answer:true,
    explanation:'TRUE. Three given side lengths (SSS) uniquely determine a triangle — if such a triangle exists (the triangle inequality must hold).' }),

  makeMCQ({ id:'g8m-con-004', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'SSS construction means constructing a triangle given:',
    options:['Three angles','Three sides','Two sides and one angle','Two angles and one side'],
    answer:'Three sides',
    hint:'SSS = Side, Side, Side.',
    explanation:'SSS stands for <b>Side-Side-Side</b>: constructing a triangle when all three side lengths are known.' }),

  makeMCQ({ id:'g8m-con-005', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'SAS construction means constructing a triangle given:',
    options:['Three sides','Three angles','Two sides and the included angle','Two angles and one side'],
    answer:'Two sides and the included angle',
    hint:'SAS = Side-Angle-Side. The angle is between the two given sides.',
    explanation:'SAS = <b>Side-Angle-Side</b>: two side lengths and the angle BETWEEN them (the included angle).' }),

  makeMCQ({ id:'g8m-con-006', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'ASA construction means constructing a triangle given:',
    options:['Three angles','Two angles and the included side','Two sides and an angle','Three sides'],
    answer:'Two angles and the included side',
    hint:'ASA = Angle-Side-Angle. The side is between the two angles.',
    explanation:'ASA = <b>Angle-Side-Angle</b>: two angles and the side that lies between them.' }),

  makeTF({ id:'g8m-con-007', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'It is impossible to construct a triangle with sides 3 cm, 4 cm and 9 cm.',
    answer:true,
    explanation:'TRUE. For a valid triangle, the sum of any two sides must exceed the third. 3 + 4 = 7 < 9, so this violates the triangle inequality — no such triangle exists.' }),

  makeMCQ({ id:'g8m-con-008', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'In an SSS construction, after drawing the base of 6 cm, why do you use a compass to draw arcs?',
    options:[
      'To measure the angles',
      'To mark the exact distances of the other two sides',
      'To draw right angles',
      'To erase mistakes'
    ], answer:'To mark the exact distances of the other two sides',
    hint:'A compass set to a specific radius marks the correct distance from a given point.',
    explanation:'In SSS, after drawing the base, you set the compass to each of the other side lengths and draw arcs from the endpoints. Their intersection gives the third vertex.' }),

  makeMCQ({ id:'g8m-con-009', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'To construct a triangle with sides 5 cm, 6 cm and 7 cm, you should use which method?',
    options:['ASA','SAS','SSS','AAS'], answer:'SSS',
    hint:'You are given three sides — no angles mentioned.',
    explanation:'Three given sides means <b>SSS (Side-Side-Side)</b> construction.' }),

  makeTF({ id:'g8m-con-010', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'Knowing three angles of a triangle (AAA) is enough to construct a unique triangle.',
    answer:false,
    explanation:'FALSE. Three angles only give the <b>shape</b> (the triangle\'s angles), but not the size. There are infinitely many similar triangles with the same three angles.' }),

  makeMCQ({ id:'g8m-con-011', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_triangles',
    question:'For a valid triangle, the sum of any two sides must be:',
    options:[
      'Equal to the third side',
      'Less than the third side',
      'Greater than the third side',
      'Equal to twice the third side'
    ], answer:'Greater than the third side',
    hint:'This is the triangle inequality.',
    explanation:'The <b>triangle inequality</b> states: for any triangle with sides a, b, c: a + b > c, a + c > b, and b + c > a.' }),

  makeMCQ({ id:'g8m-con-012', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'Which set of lengths CAN form a valid triangle?',
    options:['2 cm, 3 cm, 6 cm','4 cm, 5 cm, 10 cm','7 cm, 8 cm, 9 cm','1 cm, 2 cm, 4 cm'],
    answer:'7 cm, 8 cm, 9 cm',
    hint:'Check the triangle inequality for each: sum of two smaller sides > largest side.',
    explanation:'7 + 8 = 15 > 9 ✓. The other sets fail: 2+3=5<6, 4+5=9<10, 1+2=3<4. Only <b>7, 8, 9</b> forms a valid triangle.' }),

  makeMCQ({ id:'g8m-con-013', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'In an AAS (Angle-Angle-Side) construction, which information is given?',
    options:[
      'Two adjacent angles and the included side',
      'Two angles and a non-included side',
      'One angle and two sides',
      'Three sides'
    ], answer:'Two angles and a non-included side',
    hint:'AAS differs from ASA in that the side is NOT between the two angles.',
    explanation:'AAS: <b>two angles and a non-included side</b> — the side is not between the two given angles.' }),

  // ── given_conditions (026–050) ───────────────────────────────────────────────

  makeMCQ({ id:'g8m-con-026', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'To construct a triangle with sides 4 cm, 5 cm and 6 cm, what is the FIRST step?',
    options:[
      'Draw the shortest side (4 cm)',
      'Draw the longest side (6 cm) as the base',
      'Draw any side as the base',
      'Draw a 90° angle first'
    ], answer:'Draw any side as the base',
    hint:'In SSS construction, you can start with any side.',
    explanation:'You can choose <b>any side</b> as the base. Conventionally, the longest side is often drawn first for stability, but any choice works.' }),

  makeMCQ({ id:'g8m-con-027', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'In an SAS construction of a triangle with sides 5 cm, 7 cm and included angle 40°, which step comes after drawing the base of 5 cm?',
    options:[
      'Draw a 40° angle at one end using a protractor, then mark 7 cm along the new ray',
      'Draw a 7 cm arc from each end',
      'Draw the third side without measuring',
      'Measure 40° from the midpoint of the base'
    ], answer:'Draw a 40° angle at one end using a protractor, then mark 7 cm along the new ray',
    hint:'SAS: after the base, draw the included angle, then measure the second side along the new direction.',
    explanation:'After the base: use a protractor at one endpoint to draw a 40° ray, then mark 7 cm along it. Join the two endpoints to complete the triangle.' }),

  makeMCQ({ id:'g8m-con-028', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'In an ASA construction, angles of 50° and 70° are given at the ends of a base of 6 cm. What is the angle at the THIRD vertex?',
    options:['50°','70°','60°','120°'], answer:'60°',
    hint:'Angles in a triangle sum to 180°.',
    explanation:'50° + 70° = 120°. Third angle = 180° − 120° = <b>60°</b>.' }),

  makeMCQ({ id:'g8m-con-029', chapterId:'g8m-constructions', difficulty:3,
    subsection:'given_conditions',
    question:'A triangle has sides 8 cm and 5 cm with the included angle being 55°. Which construction method is used?',
    options:['SSS','SAS','ASA','AAA'], answer:'SAS',
    hint:'Two sides and the angle BETWEEN them.',
    explanation:'Two sides and the <b>included</b> angle → <b>SAS</b> construction.' }),

  makeMCQ({ id:'g8m-con-030', chapterId:'g8m-constructions', difficulty:3,
    subsection:'given_conditions',
    question:'Which of the following sets of information does NOT uniquely determine a triangle?',
    options:['SSS','SAS','ASA','SSA (two sides and a non-included angle)'],
    answer:'SSA (two sides and a non-included angle)',
    hint:'SSA can sometimes give two different triangles (the "ambiguous case").',
    explanation:'<b>SSA</b> (two sides and a non-included angle) can give <b>0, 1 or 2</b> different triangles — it does not always uniquely determine a triangle.' }),

  makeTF({ id:'g8m-con-031', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'To construct a right-angled triangle with legs 3 cm and 4 cm, you can use SAS with the right angle (90°) as the included angle.',
    answer:true,
    explanation:'TRUE. The right angle is the included angle between the two legs. Draw one leg (3 cm), then draw 90° at one end, then mark 4 cm along the perpendicular ray. This is <b>SAS with 90°</b>.' }),

  makeMCQ({ id:'g8m-con-032', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'After constructing a triangle, how would you VERIFY the third side was drawn correctly?',
    options:[
      'Count the squares on graph paper',
      'Measure the third side with a ruler',
      'Add the three angles',
      'Multiply the base by the height'
    ], answer:'Measure the third side with a ruler',
    hint:'Verification means checking with measurement.',
    explanation:'After construction, <b>measure the third side</b> with a ruler to verify it matches the intended length.' }),

  makeMCQ({ id:'g8m-con-033', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'How many arcs are drawn in a standard SSS construction (after the base is drawn)?',
    options:['1','2','3','4'], answer:'2',
    hint:'One arc from each end of the base, set to the other two side lengths.',
    explanation:'<b>Two arcs</b>: one from each end of the base, set to the lengths of the other two sides. Their intersection is the third vertex.' }),

  makeMCQ({ id:'g8m-con-034', chapterId:'g8m-constructions', difficulty:3,
    subsection:'given_conditions',
    question:'A triangle has angles 60°, 60° and 60°. All sides are equal. What type of triangle is this?',
    options:['Scalene','Right-angled','Isosceles','Equilateral'], answer:'Equilateral',
    hint:'Three equal angles in a triangle means three equal sides.',
    explanation:'Three equal angles (60° each) → three equal sides → <b>equilateral triangle</b>.' }),

  makeMCQ({ id:'g8m-con-035', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'In an ASA construction, what is drawn BETWEEN the two angles?',
    options:[
      'A perpendicular bisector',
      'An arc',
      'The included side',
      'A parallel line'
    ], answer:'The included side',
    hint:'ASA = Angle-Side-Angle. The side lies between the two angles.',
    explanation:'The <b>included side</b> is the known side that lies between the two given angles.' }),

  makeMCQ({ id:'g8m-con-036', chapterId:'g8m-constructions', difficulty:3,
    subsection:'given_conditions',
    question:'Construct a triangle with base BC = 7 cm, angle B = 45° and angle C = 75°. What is angle A?',
    options:['60°','55°','75°','45°'], answer:'60°',
    hint:'Angles in a triangle sum to 180°.',
    explanation:'Angle A = 180° − 45° − 75° = <b>60°</b>.' }),

  makeTF({ id:'g8m-con-037', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'In SAS construction, the included angle must be drawn between the two given sides.',
    answer:true,
    explanation:'TRUE. In SAS, the <b>angle is included</b> — it sits between the two known sides. The angle determines how the sides are oriented relative to each other.' }),

  // ── construct_problems (051–075) ─────────────────────────────────────────────

  makeMCQ({ id:'g8m-con-051', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'You are told to construct a triangle with base 8 cm, and angles at each end of the base measuring 40° and 65°. Which method do you use?',
    options:['SSS','SAS','ASA','SSA'], answer:'ASA',
    hint:'Base is the side between the two angles.',
    explanation:'A side and the angles at <b>both</b> its ends → <b>ASA (Angle-Side-Angle)</b>.' }),

  makeMCQ({ id:'g8m-con-052', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'You are given: AB = 6 cm, BC = 8 cm, and angle ABC = 30°. Which method gives a unique triangle?',
    options:['SSS','SAS','ASA','AAA'], answer:'SAS',
    hint:'You have two sides (AB and BC) and the angle between them (angle ABC).',
    explanation:'AB and BC are two sides; angle ABC is the angle BETWEEN them — this is <b>SAS</b>.' }),

  makeMCQ({ id:'g8m-con-053', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'A triangular plot of land has sides 50 m, 60 m and 70 m. A surveyor wants to make a scale drawing. Which construction method is appropriate?',
    options:['ASA','SAS','SSS','AAA'], answer:'SSS',
    hint:'Three sides are known.',
    explanation:'All three sides are known → <b>SSS</b> is the appropriate method.' }),

  makeMCQ({ id:'g8m-con-054', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'An isosceles triangle has two equal sides of 5 cm and a base of 6 cm. Which construction method?',
    options:['SAS','ASA','SSS','AAS'], answer:'SSS',
    hint:'All three sides are known: 5 cm, 5 cm, 6 cm.',
    explanation:'Even though the triangle is isosceles, we know all three sides (5, 5, 6) so we use <b>SSS</b>.' }),

  makeMCQ({ id:'g8m-con-055', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'A right-angled triangle is constructed with hypotenuse 10 cm and one angle of 30°. The third angle is:',
    options:['30°','60°','45°','90°'], answer:'60°',
    hint:'The three angles must sum to 180°. One is 90°, one is 30°.',
    explanation:'90° + 30° + third angle = 180°. Third angle = 180° − 90° − 30° = <b>60°</b>.' }),

  makeMCQ({ id:'g8m-con-056', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'After completing an SSS construction, you measure the third side and find it is 0.2 cm shorter than expected. The most likely cause is:',
    options:[
      'The triangle inequality was not satisfied',
      'A small measurement or arc-drawing error',
      'The compass was not used',
      'The angles were wrong'
    ], answer:'A small measurement or arc-drawing error',
    hint:'Small discrepancies in construction are due to measurement precision.',
    explanation:'A small difference is due to <b>measurement error</b> — imprecision when setting the compass or drawing arcs. Always check and try to minimize such errors.' }),

  makeTF({ id:'g8m-con-057', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'An equilateral triangle with side 5 cm can be constructed using SSS.',
    answer:true,
    explanation:'TRUE. All three sides equal 5 cm. You know all three sides, so SSS works. Set the compass to 5 cm and draw arcs from both ends of the 5 cm base.' }),

  makeMCQ({ id:'g8m-con-058', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'When constructing with a compass, why must the compass width be set BEFORE drawing each arc?',
    options:[
      'To ensure the arc is the correct radius (side length)',
      'To make the arc look neat',
      'So the protractor can be used after',
      'To check the triangle inequality'
    ], answer:'To ensure the arc is the correct radius (side length)',
    hint:'The compass radius equals the side length being constructed.',
    explanation:'Setting the compass to the correct width ensures the arc is drawn at the <b>exact required radius</b>, matching the given side length.' }),

  makeMCQ({ id:'g8m-con-059', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'A construction of triangle PQR uses PQ = 6 cm, angle PQR = 55°, angle QPR = 70°. This is which type?',
    options:['SSS','SAS','ASA','AAS'], answer:'AAS',
    hint:'You have two angles (PQR and QPR) and a non-included side (PQ — note PQ is opposite angle R).',
    explanation:'Angles PQR and QPR are given, and side PQ is the side opposite angle R (not between the two given angles) — this is <b>AAS</b>.' }),

  makeMCQ({ id:'g8m-con-060', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'In which case does a construction give TWO possible triangles?',
    options:['SSS','ASA','AAS','SSA'], answer:'SSA',
    hint:'SSA is the "ambiguous case".',
    explanation:'<b>SSA (Side-Side-Angle)</b> can produce two distinct triangles (the ambiguous case), depending on whether the given angle is acute and the second side is shorter than the first.' }),

  makeMCQ({ id:'g8m-con-061', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'Which of these constructions uses a protractor?',
    options:['SSS only','SAS and ASA','SSS and SAS','None — only a compass is used'],
    answer:'SAS and ASA',
    hint:'When you need to draw a specific angle, you use a protractor.',
    explanation:'<b>SAS and ASA</b> both require drawing a given angle — this requires a protractor. SSS only needs a ruler and compass for arc lengths.' }),

  makeTF({ id:'g8m-con-062', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'The triangle with sides 5, 12 and 13 can be constructed uniquely using SSS, and it will be a right-angled triangle.',
    answer:true,
    explanation:'TRUE. 5² + 12² = 25 + 144 = 169 = 13². So the triangle is right-angled. SSS construction will produce this unique right-angled triangle.' }),

  makeMCQ({ id:'g8m-con-063', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'You construct a triangle using SAS: sides 4 cm and 7 cm with included angle 120°. The triangle will be:',
    options:['Acute-angled','Right-angled','Obtuse-angled','Equilateral'],
    answer:'Obtuse-angled',
    hint:'The included angle is 120°, which is already more than 90°.',
    explanation:'The included angle is 120° > 90°, so the triangle is <b>obtuse-angled</b>.' }),

  // ── construct_triangles top-up (064–070) ──────────────────────────────────
  makeMCQ({ id:'g8m-con-064', chapterId:'g8m-constructions', difficulty:1,
    subsection:'construct_triangles',
    question:'To construct a triangle using SSS, what measurements must be given?',
    options:['All three side lengths','Two sides and one angle','Two angles and one side','One side and one angle'],
    answer:'All three side lengths',
    hint:'SSS stands for Side-Side-Side.',
    explanation:'<b>SSS</b> requires all three <b>side lengths</b>. With three sides, the triangle is uniquely determined.' }),

  makeMCQ({ id:'g8m-con-065', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'Which step comes FIRST when constructing a triangle with a compass and ruler?',
    options:['Draw the base side with ruler','Draw any arc','Set the compass to the longest side','Mark all angles with protractor'],
    answer:'Draw the base side with ruler',
    hint:'You always start with one side drawn straight.',
    explanation:'The first step is to <b>draw the base side</b> accurately with a ruler. Then use compass arcs from each end for the other sides.' }),

  makeTF({ id:'g8m-con-066', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'A triangle with sides 3 cm, 4 cm and 9 cm can be constructed.',
    answer:false,
    explanation:'FALSE. Triangle inequality: the sum of any two sides must exceed the third. 3 + 4 = 7 < 9. This triangle <b>cannot exist</b>.' }),

  makeMCQ({ id:'g8m-con-067', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_triangles',
    question:'After drawing the base BC = 6 cm for an SSS construction (AB = 5 cm, AC = 4 cm), the compass is opened to 5 cm and an arc is drawn from B. The compass is then opened to 4 cm and an arc from C is drawn. Point A is:',
    options:['Where the two arcs intersect','The midpoint of BC','Any point above BC','Found by extending BC'],
    answer:'Where the two arcs intersect',
    hint:'Both arcs must cross — the crossing point is the exact distance from each end.',
    explanation:'A is exactly 5 cm from B and 4 cm from C — so A is the point where the two arcs <b>intersect</b>.' }),

  makeMCQ({ id:'g8m-con-068', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_triangles',
    question:'A triangle has sides 5 cm, 5 cm and 5 cm. What type of triangle will the SSS construction produce?',
    options:['Equilateral','Isosceles','Scalene','Right-angled'],
    answer:'Equilateral',
    hint:'All three sides are equal.',
    explanation:'Three equal sides ⇒ three equal angles of 60° ⇒ <b>equilateral</b> triangle.' }),

  makeMCQ({ id:'g8m-con-069', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_triangles',
    question:'The arcs in an SSS construction do NOT intersect. This means:',
    options:['The triangle cannot be constructed','You need a bigger compass','The drawing board is too small','The base must be redrawn shorter'],
    answer:'The triangle cannot be constructed',
    hint:'Non-intersecting arcs mean the distances cannot meet — the triangle violates the triangle inequality.',
    explanation:'When the arcs do not intersect, the given sides do <b>not satisfy the triangle inequality</b> — the triangle cannot exist and cannot be constructed.' }),

  makeMCQ({ id:'g8m-con-070', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_triangles',
    question:'In an SSS construction, which triangle with sides 6 cm, 8 cm and 10 cm will be produced?',
    options:['Right-angled','Acute-angled','Obtuse-angled','Equilateral'],
    answer:'Right-angled',
    hint:'Check: 6² + 8² = 10².',
    explanation:'6² + 8² = 36 + 64 = 100 = 10². By the converse of Pythagoras, this is a <b>right-angled</b> triangle.' }),

  // ── given_conditions top-up (071–078) ────────────────────────────────────
  makeMCQ({ id:'g8m-con-071', chapterId:'g8m-constructions', difficulty:1,
    subsection:'given_conditions',
    question:'SAS means: two sides and the angle…',
    options:['Between them (included angle)','Opposite the longest side','At the base','Formed at any vertex'],
    answer:'Between them (included angle)',
    hint:'S-A-S: side, ANGLE, side — the angle is sandwiched between the two sides.',
    explanation:'In SAS, the angle is the <b>included angle</b> — it sits between the two known sides.' }),

  makeTF({ id:'g8m-con-072', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'For ASA construction you must know two angles and the side between them.',
    answer:true,
    explanation:'TRUE. ASA = Angle–Side–Angle. The side is the <b>included side</b> between the two known angles.' }),

  makeMCQ({ id:'g8m-con-073', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'Triangle PQR: PQ = 7 cm, ∠P = 45°, ∠Q = 60°. What is the third angle, ∠R?',
    options:['75°','90°','80°','85°'],
    answer:'75°',
    hint:'Angles in a triangle add to 180°.',
    explanation:'∠R = 180° − 45° − 60° = <b>75°</b>.' }),

  makeMCQ({ id:'g8m-con-074', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'To draw the SAS triangle with AB = 5 cm, ∠A = 50°, AC = 3 cm, which step follows drawing AB?',
    options:['Draw ∠A = 50° at A with a protractor, then mark C at 3 cm along that ray','Draw any angle at B','Extend AB to 3 cm','Draw the perpendicular bisector of AB'],
    answer:'Draw ∠A = 50° at A with a protractor, then mark C at 3 cm along that ray',
    hint:'The angle is at vertex A — use a protractor there.',
    explanation:'After drawing AB = 5 cm, use a protractor to draw the 50° angle at A, then mark C exactly 3 cm along that ray. Join B to C.' }),

  makeMCQ({ id:'g8m-con-075', chapterId:'g8m-constructions', difficulty:3,
    subsection:'given_conditions',
    question:'Which set of conditions is NOT sufficient to uniquely construct a triangle?',
    options:['SSA (two sides and a non-included angle)','SSS','SAS','ASA'],
    answer:'SSA (two sides and a non-included angle)',
    hint:'Think about how many different triangles the same SSA data can produce.',
    explanation:'SSA can produce <b>two different triangles</b> (or none). The angle is not between the two sides so the triangle is ambiguous — this is the "ambiguous case".' }),

  makeTF({ id:'g8m-con-076', chapterId:'g8m-constructions', difficulty:2,
    subsection:'given_conditions',
    question:'AAS gives the same triangle as ASA when the third angle is calculated.',
    answer:true,
    explanation:'TRUE. In AAS you know two angles (so the third is known) and one side. Once all three angles and one side are known, the triangle is uniquely determined — equivalent to ASA.' }),

  makeMCQ({ id:'g8m-con-077', chapterId:'g8m-constructions', difficulty:3,
    subsection:'given_conditions',
    question:'You are given two sides of length 4 cm and 4 cm and the included angle 90°. What type of triangle is produced?',
    options:['Right-angled isosceles','Equilateral','Scalene','Obtuse-angled isosceles'],
    answer:'Right-angled isosceles',
    hint:'Two equal sides and a 90° angle between them.',
    explanation:'Two equal sides (4 cm, 4 cm) and the 90° included angle — the result is a <b>right-angled isosceles</b> triangle with base angles of 45° each.' }),

  makeMCQ({ id:'g8m-con-078', chapterId:'g8m-constructions', difficulty:3,
    subsection:'given_conditions',
    question:'In ASA construction of triangle XYZ, ∠X = 40°, XY = 6 cm, ∠Y = 70°. What is ∠Z?',
    options:['70°','40°','80°','110°'],
    answer:'70°',
    hint:'∠Z = 180° − ∠X − ∠Y.',
    explanation:'∠Z = 180° − 40° − 70° = <b>70°</b>. Triangle XYZ is isosceles (∠Y = ∠Z).' }),

  // ── construct_problems top-up (079–085) ───────────────────────────────────
  makeMCQ({ id:'g8m-con-079', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'After constructing a triangle, which instrument verifies that a drawn angle is correct?',
    options:['Protractor','Compass','Set square','Ruler'],
    answer:'Protractor',
    hint:'Angles are measured in degrees — the tool for degrees.',
    explanation:'A <b>protractor</b> measures angles in degrees and is used to verify that a constructed angle matches the required value.' }),

  makeTF({ id:'g8m-con-080', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'When constructing a triangle with sides 7 cm, 7 cm and 7 cm, only one unique triangle is possible.',
    answer:true,
    explanation:'TRUE. SSS with all sides equal uniquely determines an equilateral triangle — there is exactly one such shape.' }),

  makeMCQ({ id:'g8m-con-081', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'A plot of land is triangular with sides 80 m, 90 m and 100 m. A scale drawing uses 1 cm : 10 m. What are the three lengths on the drawing?',
    options:['8 cm, 9 cm and 10 cm','80 mm, 90 mm and 100 mm','8 m, 9 m and 10 m','0.8 cm, 0.9 cm and 1 cm'],
    answer:'8 cm, 9 cm and 10 cm',
    hint:'Divide each length by 10 to get centimetres.',
    explanation:'80 ÷ 10 = 8 cm, 90 ÷ 10 = 9 cm, 100 ÷ 10 = 10 cm. The scale drawing triangle has sides <b>8 cm, 9 cm, 10 cm</b>.' }),

  makeMCQ({ id:'g8m-con-082', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'You construct triangle ABC with AB = 5 cm, BC = 6 cm and AC = 7 cm. What is the largest angle of the triangle?',
    options:['The angle opposite AC (angle B)','The angle opposite BC (angle A)','The angle opposite AB (angle C)','All angles are equal'],
    answer:'The angle opposite AC (angle B)',
    hint:'The largest angle is always opposite the longest side.',
    explanation:'AC = 7 cm is the longest side. The angle opposite to it is ∠B — so <b>∠B is the largest angle</b>.' }),

  makeMCQ({ id:'g8m-con-083', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'A triangle constructed with ∠A = 90°, AB = 3 cm and AC = 4 cm (SAS). The hypotenuse BC will be:',
    options:['5 cm','7 cm','3.5 cm','6 cm'],
    answer:'5 cm',
    hint:'Use Pythagoras: BC² = AB² + AC².',
    explanation:'BC² = 3² + 4² = 9 + 16 = 25. BC = <b>5 cm</b>.' }),

  makeMCQ({ id:'g8m-con-084', chapterId:'g8m-constructions', difficulty:3,
    subsection:'construct_problems',
    question:'A child measures the constructed triangle and finds the third side is 0.3 cm longer than expected. The most likely cause is:',
    options:['Inaccurate arc radius from incorrect compass setting','Wrong type of triangle','Wrong scale used','The compass was opened too wide initially'],
    answer:'Inaccurate arc radius from incorrect compass setting',
    hint:'Small construction errors usually come from the compass slipping.',
    explanation:'If the compass slips or is not set precisely, the arc radius changes — this gives an inaccurate vertex position and a third side that does not match. <b>Accurate compass setting</b> is the key control.' }),

  makeTF({ id:'g8m-con-085', chapterId:'g8m-constructions', difficulty:2,
    subsection:'construct_problems',
    question:'Given ∠P = 60°, ∠Q = 60° and PQ = 5 cm (ASA), the triangle produced is equilateral.',
    answer:true,
    explanation:'TRUE. ∠P = ∠Q = 60° so ∠R = 60° too. All angles equal ⇒ all sides equal ⇒ <b>equilateral</b>. Each side is 5 cm.' }),

);

})();
