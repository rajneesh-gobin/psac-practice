'use strict';
// Grade 7 Maths — g7m-constructions, batch 2A (009–020)

function _b2aRuler(fromCm, toCm) {
  const X0 = 24, PX = 34;
  let s = '<svg viewBox="0 0 400 132" width="400" height="132" style="display:block;margin:6px auto;max-width:100%;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1" role="img" aria-label="a diagram of a ruler and a drawn line">';
  s += '<rect x="' + X0 + '" y="58" width="' + (10 * PX) + '" height="54" rx="3" fill="#fef9c3" stroke="#1e293b" stroke-width="2"/>';
  for (let h = 0; h <= 20; h++) {
    const x = X0 + h * PX / 2, whole = h % 2 === 0;
    s += '<line x1="' + x + '" y1="58" x2="' + x + '" y2="' + (whole ? 80 : 71) + '" stroke="#1e293b" stroke-width="' + (whole ? 2 : 1) + '"/>';
    if (whole) s += '<text x="' + x + '" y="98" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">' + (h / 2) + '</text>';
  }
  s += '<text x="' + (X0 + 10 * PX + 6) + '" y="98" font-size="11" font-family="sans-serif" fill="#64748b">cm</text>';
  const a = X0 + fromCm * PX, b = X0 + toCm * PX;
  s += '<line x1="' + a + '" y1="34" x2="' + b + '" y2="34" stroke="#dc2626" stroke-width="3"/>';
  s += '<line x1="' + a + '" y1="26" x2="' + a + '" y2="42" stroke="#dc2626" stroke-width="3"/>';
  s += '<line x1="' + b + '" y1="26" x2="' + b + '" y2="42" stroke="#dc2626" stroke-width="3"/>';
  s += '<text x="' + (a - 10) + '" y="20" font-size="13" font-weight="bold" font-family="sans-serif" fill="#dc2626">A</text>';
  s += '<text x="' + (b + 3) + '" y="20" font-size="13" font-weight="bold" font-family="sans-serif" fill="#dc2626">B</text>';
  return s + '</svg>';
}

const _B2A_TRANSVERSAL = '<svg viewBox="0 0 320 210" width="320" height="210" style="display:block;margin:6px auto;max-width:100%;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1" role="img" aria-label="a diagram of two straight lines crossed by a third line">'
  + '<line x1="25" y1="50" x2="295" y2="50" stroke="#1e293b" stroke-width="2"/>'
  + '<line x1="25" y1="160" x2="295" y2="160" stroke="#1e293b" stroke-width="2"/>'
  + '<polygon points="150,44 160,50 150,56" fill="#1e293b"/><polygon points="150,154 160,160 150,166" fill="#1e293b"/>'
  + '<line x1="211" y1="23" x2="144" y2="188" stroke="#2563eb" stroke-width="2"/>'
  + '<circle cx="200" cy="50" r="3" fill="#1e293b"/><circle cx="156" cy="160" r="3" fill="#1e293b"/>'
  + '<text x="160" y="74" font-size="14" font-weight="600" font-family="sans-serif" fill="#1e293b">68&#176;</text>'
  + '<text x="118" y="146" font-size="15" font-weight="bold" font-family="sans-serif" fill="#dc2626">x</text>'
  + '</svg>';

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-constructions-009', chapterId:'g7m-constructions', difficulty:2,
    subsection:'using_instruments',
    question:'While measuring an angle, Priya sees the arm of the angle crossing the protractor at both 65 and 115. The angle is clearly OBTUSE. Which reading should she write down?',
    options:['115°','65°','180°','90°'],
    answer:'115°',
    hint:'An obtuse angle is bigger than a right angle but smaller than a straight line.',
    explanation:'An obtuse angle lies between 90° and 180°, so of the two readings on the protractor only 115° can be right; 65° is the acute reading from the other scale. 90° would be a right angle and 180° a straight line, and neither matches the picture.' }),

  makeMCQ({ id:'g7m-constructions-010', chapterId:'g7m-constructions', difficulty:1,
    subsection:'using_instruments',
    question:'Which instrument copies a length of exactly 6.4 cm from one line onto another without measuring it twice?',
    options:['Compasses','Protractor','Set square','Pencil'],
    answer:'Compasses',
    hint:'Think of the tool that can be opened to a fixed width and then locked there.',
    explanation:'Compasses hold the opening fixed, so the same length can be stepped off anywhere. A protractor measures angles, a set square draws right angles and parallels, and a pencil only marks the paper.' }),

  makeNum({ id:'g7m-constructions-011', chapterId:'g7m-constructions', difficulty:2,
    subsection:'using_instruments',
    question:'The line AB below has been drawn beside a centimetre ruler. How long is AB, in centimetres?' + _b2aRuler(1, 7.5),
    answer:6.5,
    hint:'The line does not begin at the zero mark. Subtract the reading at A from the reading at B.',
    explanation:'A is at 1 cm and B is at 7.5 cm, so AB = 7.5 − 1 = 6.5 cm. Reading only the mark at B and answering 7.5 is what happens when the start of the line is assumed to be zero.' }),

  makeMCQ({ id:'g7m-constructions-012', chapterId:'g7m-constructions', difficulty:3,
    subsection:'using_instruments',
    question:'Sanjay is asked to construct a triangle with sides of 5 cm, 6 cm and 12 cm. What does he find when he tries?',
    options:['The triangle is impossible','The triangle is isosceles','The triangle is equilateral','The triangle is right-angled'],
    answer:'The triangle is impossible',
    hint:'Add the two shorter sides together and compare the total with the longest side.',
    explanation:'5 + 6 = 11, which is less than 12, so the two short arcs never meet and no triangle closes. It cannot be isosceles or equilateral because all three lengths differ, and a right angle would need 5² + 6² = 12², which is 61 against 144.' }),

  makeMCQ({ id:'g7m-constructions-013', chapterId:'g7m-constructions', difficulty:1,
    subsection:'parallel_perpendicular',
    question:'Two straight lines drawn on the same flat page never meet, however far they are extended. The lines are …',
    options:['parallel','perpendicular','intersecting','congruent'],
    answer:'parallel',
    hint:'Think of the two rails of the Metro Express track.',
    explanation:'Lines that never meet and stay the same distance apart are parallel. Perpendicular lines meet at 90°, intersecting lines meet somewhere, and congruent describes two shapes that are identical in size.' }),

  makeNum({ id:'g7m-constructions-014', chapterId:'g7m-constructions', difficulty:2,
    subsection:'parallel_perpendicular',
    question:'In the diagram the two lines marked with arrows are parallel. What is the size of the angle marked <b>x</b>, in degrees?' + _B2A_TRANSVERSAL,
    answer:112,
    hint:'The two marked angles are both between the parallel lines and on the same side of the crossing line.',
    explanation:'They are co-interior (allied) angles, which add to 180°, so x = 180 − 68 = 112°. Answering 68 treats them as alternate angles, which are the ones on OPPOSITE sides of the crossing line.' }),

  makeMCQ({ id:'g7m-constructions-015', chapterId:'g7m-constructions', difficulty:2,
    subsection:'parallel_perpendicular',
    question:'When a straight line crosses two parallel lines, which pair of angles ADD UP TO 180°?',
    options:['Co-interior angles','Alternate angles','Vertical angles','Corresponding angles'],
    answer:'Co-interior angles',
    hint:'Look for the pair that sits inside the parallel lines on the SAME side of the crossing line.',
    explanation:'Co-interior angles form a C-shape and are supplementary, so they total 180°. Alternate, vertical and corresponding angles are all pairs of EQUAL angles, and they only total 180° in the special case where every angle is 90°.' }),

  makeNum({ id:'g7m-constructions-016', chapterId:'g7m-constructions', difficulty:3,
    subsection:'parallel_perpendicular',
    question:'A straight line crosses two parallel lines. One of the two co-interior angles it makes is three times the size of the other. What is the size of the SMALLER angle, in degrees?',
    answer:45,
    hint:'Call the smaller angle x, write the larger as 3x, and use the total that co-interior angles must reach.',
    explanation:'x + 3x = 180, so 4x = 180 and x = 45°; the larger angle is 135°. Dividing 180 by 3 gives 60 and ignores that the two angles together must make up the 180°.' }),

  makeMCQ({ id:'g7m-constructions-017', chapterId:'g7m-constructions', difficulty:3,
    subsection:'parallel_perpendicular',
    question:'To construct a line perpendicular to AB through a point P that lies ON AB, using compasses only, the FIRST step is to …',
    options:['mark two points either side of P','draw one long arc through point P','measure a right angle at point P','join P to a point above the line'],
    answer:'mark two points either side of P',
    hint:'The perpendicular is really the perpendicular bisector of a short piece of AB centred on P.',
    explanation:'Opening the compasses and cutting AB on both sides of P gives two points the same distance from P; bisecting that piece gives the perpendicular. A single arc leaves nothing to bisect, a protractor is not compasses, and joining P to any point above AB gives a line at some random angle.' }),

  makeNum({ id:'g7m-constructions-018', chapterId:'g7m-constructions', difficulty:2,
    subsection:'bisecting',
    question:'An angle of 126° is bisected. What is the size of each of the two new angles, in degrees?',
    answer:63,
    hint:'To bisect means to cut into two equal parts.',
    explanation:'126 ÷ 2 = 63°, and the two 63° angles add back to 126°. Answering 252 doubles the angle instead of halving it, which is what happens when the two halves are added to the original.' }),

  makeMCQ({ id:'g7m-constructions-019', chapterId:'g7m-constructions', difficulty:3,
    subsection:'bisecting',
    question:'The perpendicular bisector of a 9 cm line segment PQ is drawn. How far from P does it cross PQ?',
    options:['4.5 cm','3 cm','9 cm','18 cm'],
    answer:'4.5 cm',
    hint:'A perpendicular bisector does two jobs: it makes a right angle, and it cuts the segment in half.',
    explanation:'The bisector crosses at the midpoint, so 9 ÷ 2 = 4.5 cm from P. 3 cm would be a third of the way along, 9 cm is the whole segment, and 18 cm doubles it.' }),

  makeNum({ id:'g7m-constructions-020', chapterId:'g7m-constructions', difficulty:4,
    subsection:'bisecting',
    question:'In triangle ABC, angle A = 84° and angle B = 58°. The bisector of angle A is drawn and meets BC at the point D. What is the size of angle ADB, in degrees?',
    answer:80,
    hint:'Work out the half of angle A that sits inside triangle ABD, then use the angle sum of that smaller triangle.',
    explanation:'The bisector splits angle A into two 42° angles, so in triangle ABD the angles are 42° at A and 58° at B, leaving 180 − 42 − 58 = 80° at D. Using the full 84° instead of its half gives 38°, and answering 38 is the usual slip.' })

);
