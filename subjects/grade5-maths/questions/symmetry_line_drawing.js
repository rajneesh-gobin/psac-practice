'use strict';
// Exam-style line drawing. These supplement (and do not replace) the existing
// shaded-cell mirror puzzles in questions_diverse.js.
(() => {
  const rect = (x, y, width, height) => ({ kind:'rect', x, y, width, height });
  const poly = points => ({ kind:'polygon', points });
  const ellipse = (cx, cy, rx, ry) => ({ kind:'ellipse', cx, cy, rx, ry });
  const base = {
    chapterId:'geometry', subsection:'symmetry', type:'symmetry-line',
    canvas:{ width:320, height:240 }, angleTolerance:9, positionTolerance:11,
    minLengthRatio:0.55, snapAngles:[0,45,90,135], snapTolerance:7,
    question:'Draw <b>all</b> the lines of symmetry on the shape. Use the ruler tool below.',
    hint:'Imagine folding the shape. Where would both halves cover each other exactly?',
  };
  const specs = [
    { id:'g5m-sline-001', difficulty:1, imageAlt:'An isosceles triangle',
      shapes:[poly([[160,30],[65,200],[255,200]])], answer:[[160,30,160,200]],
      explanation:'An isosceles triangle has one line of symmetry, from the top vertex to the midpoint of its base.' },
    { id:'g5m-sline-002', difficulty:1, imageAlt:'A kite with a longer lower half',
      shapes:[poly([[160,24],[245,100],[160,216],[95,100]])], answer:[[160,24,160,216]],
      explanation:'This kite has one vertical line of symmetry through its top and bottom vertices.' },
    { id:'g5m-sline-003', difficulty:2, imageAlt:'A non-square rectangle',
      shapes:[rect(60,50,200,140)], answer:[[160,50,160,190],[60,120,260,120]],
      explanation:'A rectangle has two lines of symmetry: one vertical and one horizontal through its centre. Its diagonals are not symmetry lines.' },
    { id:'g5m-sline-004', difficulty:3, imageAlt:'A square',
      shapes:[rect(85,45,150,150)],
      answer:[[160,45,160,195],[85,120,235,120],[85,45,235,195],[235,45,85,195]],
      explanation:'A square has four lines of symmetry: vertical, horizontal and both diagonals.' },
    { id:'g5m-sline-005', difficulty:1, imageAlt:'A simple house-shaped outline',
      shapes:[poly([[160,25],[260,105],[235,105],[235,210],[85,210],[85,105],[60,105]])],
      answer:[[160,25,160,210]], explanation:'The house outline has one vertical line of symmetry.' },
    { id:'g5m-sline-006', difficulty:2, imageAlt:'An arrow pointing right',
      shapes:[poly([[45,85],[180,85],[180,45],[275,120],[180,195],[180,155],[45,155]])],
      answer:[[45,120,275,120]], explanation:'The arrow has one horizontal line of symmetry from its tail to its point.' },
    { id:'g5m-sline-007', difficulty:2, imageAlt:'A capital T-shaped polygon',
      shapes:[poly([[75,40],[245,40],[245,90],[190,90],[190,205],[130,205],[130,90],[75,90]])],
      answer:[[160,40,160,205]], explanation:'The T shape has one vertical line of symmetry.' },
    { id:'g5m-sline-008', difficulty:2, imageAlt:'A capital H-shaped polygon',
      shapes:[poly([[80,35],[130,35],[130,95],[190,95],[190,35],[240,35],[240,205],[190,205],[190,145],[130,145],[130,205],[80,205]])],
      answer:[[160,35,160,205],[80,120,240,120]], explanation:'This H shape has two lines of symmetry: vertical and horizontal.' },
    { id:'g5m-sline-009', difficulty:2, imageAlt:'A badge-shaped pentagon',
      shapes:[poly([[160,25],[255,95],[220,205],[100,205],[65,95]])],
      answer:[[160,25,160,205]], explanation:'This pentagon has one vertical line of symmetry.' },
    { id:'g5m-sline-010', difficulty:2, imageAlt:'A wide ellipse',
      shapes:[ellipse(160,120,110,72)], answer:[[160,48,160,192],[50,120,270,120]],
      explanation:'An ellipse has two lines of symmetry through its centre: one along each axis.' },
    { id:'g5m-sline-011', difficulty:3, imageAlt:'A diamond-shaped rhombus',
      shapes:[poly([[160,25],[270,120],[160,215],[50,120]])],
      answer:[[160,25,160,215],[50,120,270,120]], explanation:'A rhombus has two lines of symmetry, along its diagonals.' },
    { id:'g5m-sline-012', difficulty:3, imageAlt:'A bow-tie or hourglass-shaped polygon',
      shapes:[poly([[65,40],[255,40],[205,120],[255,200],[65,200],[115,120]])],
      answer:[[160,40,160,200],[65,120,255,120]], explanation:'This hourglass outline has a vertical and a horizontal line of symmetry.' },
  ];
  STATIC_QUESTIONS.push(...specs.map(q => Object.assign({}, base, q)));
})();

