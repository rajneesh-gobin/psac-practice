'use strict';
// Straight-line drawing questions model the ruler task on an exam paper. The
// old cell-shading symmetry type remains available as a different activity.
(() => {
  const rect = (x, y, width, height) => ({ kind:'rect', x, y, width, height });
  const poly = points => ({ kind:'polygon', points });
  const ellipse = (cx, cy, rx, ry) => ({ kind:'ellipse', cx, cy, rx, ry });
  const base = {
    chapterId:'g6-geometry', subsection:'symmetry', type:'symmetry-line',
    canvas:{ width:320, height:240 }, angleTolerance:9, positionTolerance:11,
    minLengthRatio:0.55, snapAngles:[0,45,90,135], snapTolerance:7,
    question:'Draw <b>all</b> the lines of symmetry on the shape. Use the ruler tool below.',
    hint:'Match corners and edges as if you were folding the shape into two identical halves.',
  };
  const specs = [
    { id:'g6m-sline-001', difficulty:2, imageAlt:'A right-angled isosceles triangle',
      shapes:[poly([[70,35],[70,205],[240,205]])], answer:[[70,205,155,120]],
      explanation:'The right-angled isosceles triangle has one diagonal symmetry line from the right angle to the midpoint of the opposite side.' },
    { id:'g6m-sline-002', difficulty:2, imageAlt:'A kite tilted diagonally',
      shapes:[poly([[80,200],[100,60],[240,40],[220,180]])], answer:[[80,200,240,40]],
      explanation:'The tilted kite has one diagonal line of symmetry joining its pointed ends.' },
    { id:'g6m-sline-003', difficulty:2, imageAlt:'An isosceles trapezium',
      shapes:[poly([[105,45],[215,45],[270,195],[50,195]])], answer:[[160,45,160,195]],
      explanation:'An isosceles trapezium has one vertical line of symmetry through the midpoints of its parallel sides.' },
    { id:'g6m-sline-004', difficulty:2, imageAlt:'A non-square rectangle',
      shapes:[rect(55,52,210,136)], answer:[[160,52,160,188],[55,120,265,120]],
      explanation:'A non-square rectangle has two symmetry lines, through the horizontal and vertical midpoints.' },
    { id:'g6m-sline-005', difficulty:2, imageAlt:'A tall ellipse',
      shapes:[ellipse(160,120,72,102)], answer:[[160,18,160,222],[88,120,232,120]],
      explanation:'The ellipse is symmetric across both its long and short central axes.' },
    { id:'g6m-sline-006', difficulty:3, imageAlt:'A kite with a horizontal symmetry line',
      shapes:[poly([[40,120],[150,48],[275,120],[150,192]])], answer:[[40,120,275,120]],
      explanation:'Because the left and right pointed ends are unequal, only the horizontal fold makes matching halves.' },
    { id:'g6m-sline-007', difficulty:3, imageAlt:'An irregular hexagon with matching left and right halves',
      shapes:[poly([[160,25],[248,72],[225,170],[160,215],[95,170],[72,72]])],
      answer:[[160,25,160,215]], explanation:'This hexagon was designed with one vertical line of symmetry.' },
    { id:'g6m-sline-008', difficulty:3, imageAlt:'A double-headed arrow',
      shapes:[poly([[35,120],[100,55],[100,88],[220,88],[220,55],[285,120],[220,185],[220,152],[100,152],[100,185]])],
      answer:[[35,120,285,120],[160,55,160,185]], explanation:'The double-headed arrow has horizontal and vertical symmetry.' },
    { id:'g6m-sline-009', difficulty:3, imageAlt:'An hourglass outline',
      shapes:[poly([[60,35],[260,35],[205,120],[260,205],[60,205],[115,120]])],
      answer:[[160,35,160,205],[60,120,260,120]], explanation:'Both a vertical fold and a horizontal fold divide this hourglass into matching halves.' },
    { id:'g6m-sline-010', difficulty:3, imageAlt:'A shield-shaped polygon',
      shapes:[poly([[75,45],[245,45],[235,145],[160,215],[85,145]])], answer:[[160,45,160,215]],
      explanation:'The shield outline has one vertical line of symmetry.' },
    { id:'g6m-sline-011', difficulty:3, imageAlt:'A right-angled isosceles triangle facing the other way',
      shapes:[poly([[250,35],[250,205],[80,205]])], answer:[[250,205,165,120]],
      explanation:'The symmetry line bisects the right angle and meets the midpoint of the hypotenuse.' },
    { id:'g6m-sline-012', difficulty:3, imageAlt:'A diamond-shaped rhombus',
      shapes:[poly([[160,20],[275,120],[160,220],[45,120]])],
      answer:[[160,20,160,220],[45,120,275,120]], explanation:'The two diagonals of a rhombus are its two lines of symmetry.' },
  ];
  STATIC_QUESTIONS.push(...specs.map(q => Object.assign({}, base, q)));
})();

