'use strict';
(function () {

// Visual questions for Grade 1 Shapes — inline SVG diagrams.
// IDs continue from ch04_shapes.js (076–092), across the three existing subsections.

// ── 2d_shapes visual (076–082) ────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-shp-076', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a coloured 2D shape">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="42" fill="#FDE68A" stroke="#F59E0B" stroke-width="3"/>' +
      '</svg></div>' +
      'What shape is shown?',
    options:['circle','square','triangle','rectangle'], answer:'circle',
    hint:'Does it have any straight sides or corners?',
    explanation:'This is a <b>circle</b> — it is perfectly round with no corners or straight sides.' }),

  makeMCQ({ id:'g1mth-shp-077', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a coloured 2D shape">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="10" y="10" width="80" height="80" fill="#BFDBFE" stroke="#3B82F6" stroke-width="3"/>' +
      '</svg></div>' +
      'What shape is shown?',
    options:['square','circle','triangle','rectangle'], answer:'square',
    hint:'Count the sides — are they all the same length?',
    explanation:'This is a <b>square</b> — it has 4 equal sides and 4 corners.' }),

  makeMCQ({ id:'g1mth-shp-078', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a coloured 2D shape">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="50,8 92,92 8,92" fill="#A7F3D0" stroke="#10B981" stroke-width="3"/>' +
      '</svg></div>' +
      'What shape is shown?',
    options:['triangle','square','circle','rectangle'], answer:'triangle',
    hint:'Count the sides.',
    explanation:'This is a <b>triangle</b> — it has 3 sides and 3 corners.' }),

  makeMCQ({ id:'g1mth-shp-079', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a coloured 2D shape">' +
      '<svg viewBox="0 0 160 80" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="8" y="8" width="144" height="64" fill="#FECDD3" stroke="#F43F5E" stroke-width="3"/>' +
      '</svg></div>' +
      'What shape is shown?',
    options:['rectangle','square','triangle','circle'], answer:'rectangle',
    hint:'It has 4 sides — but are all sides the same length?',
    explanation:'This is a <b>rectangle</b> — it has 4 sides, but 2 are longer than the other 2.' }),

  makeMCQ({ id:'g1mth-shp-080', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four different 2D shapes in a row">' +
      '<svg viewBox="0 0 300 90" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="38" cy="45" r="30" fill="#FDE68A" stroke="#F59E0B" stroke-width="2.5"/>' +
      '<rect x="87" y="13" width="60" height="60" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2.5"/>' +
      '<polygon points="210,10 248,80 172,80" fill="#A7F3D0" stroke="#10B981" stroke-width="2.5"/>' +
      '<rect x="265" y="22" width="25" height="50" fill="#FECDD3" stroke="#F43F5E" stroke-width="2.5"/>' +
      '</svg></div>' +
      'Which shape has <b>no corners</b>?',
    options:['the yellow shape','the blue shape','the green shape','the pink shape'], answer:'the yellow shape',
    hint:'Which shape is perfectly round?',
    explanation:'The <b>yellow shape</b> (circle) has no corners at all — it is completely round.' }),

  makeMCQ({ id:'g1mth-shp-081', chapterId:'g1mth-shapes', difficulty:2, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of shapes showing a repeating pattern ending with a question mark">' +
      '<svg viewBox="0 0 285 70" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="28" cy="35" r="22" fill="#FDE68A" stroke="#F59E0B" stroke-width="2"/>' +
      '<rect x="64" y="12" width="46" height="46" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<circle cx="138" cy="35" r="22" fill="#FDE68A" stroke="#F59E0B" stroke-width="2"/>' +
      '<rect x="174" y="12" width="46" height="46" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<circle cx="248" cy="35" r="22" fill="#FDE68A" stroke="#F59E0B" stroke-width="2"/>' +
      '<text x="275" y="42" font-size="22" fill="#9CA3AF" font-family="sans-serif">?</text>' +
      '</svg></div>' +
      'What shape comes <b>next</b> in the pattern?',
    options:['square','circle','triangle','rectangle'], answer:'square',
    hint:'The pattern repeats: circle, square, circle, square, …',
    explanation:'The pattern alternates circle then square. After the last circle comes a <b>square</b>.' }),

  makeMCQ({ id:'g1mth-shp-082', chapterId:'g1mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three 2D shapes: two round and one three-sided">' +
      '<svg viewBox="0 0 240 85" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="38" cy="42" r="30" fill="#FDE68A" stroke="#F59E0B" stroke-width="2.5"/>' +
      '<circle cx="110" cy="42" r="30" fill="#FDE68A" stroke="#F59E0B" stroke-width="2.5"/>' +
      '<polygon points="185,10 218,80 152,80" fill="#A7F3D0" stroke="#10B981" stroke-width="2.5"/>' +
      '</svg></div>' +
      'How many <b>circles</b> are there?',
    options:['2','1','3','0'], answer:'2',
    hint:'Count only the round shapes.',
    explanation:'There are <b>2</b> circles — the two yellow round shapes.' })

);

// ── properties_shapes visual (083–087) ───────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-shp-083', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a green shape with red dots marking each corner">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="50,8 92,92 8,92" fill="#A7F3D0" stroke="#10B981" stroke-width="2.5"/>' +
      '<circle cx="50" cy="8" r="6" fill="#DC2626"/>' +
      '<circle cx="92" cy="92" r="6" fill="#DC2626"/>' +
      '<circle cx="8" cy="92" r="6" fill="#DC2626"/>' +
      '</svg></div>' +
      'The red dots mark the corners. How many corners does this shape have?',
    options:['3','4','2','0'], answer:'3',
    hint:'Count the red dots.',
    explanation:'There are <b>3</b> red dots — so this shape has 3 corners. It is a triangle.' }),

  makeMCQ({ id:'g1mth-shp-084', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a blue shape with each side highlighted in orange">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="12" y="12" width="76" height="76" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<line x1="12" y1="12" x2="88" y2="12" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="88" y1="12" x2="88" y2="88" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="88" y1="88" x2="12" y2="88" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="12" y1="88" x2="12" y2="12" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>' +
      '</svg></div>' +
      'The orange lines are the sides. How many sides does this shape have?',
    options:['4','3','2','5'], answer:'4',
    hint:'Count the orange lines.',
    explanation:'There are <b>4</b> orange sides — this shape is a square.' }),

  makeMCQ({ id:'g1mth-shp-085', chapterId:'g1mth-shapes', difficulty:2, subsection:'properties_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two four-sided shapes labeled A and B">' +
      '<svg viewBox="0 0 220 90" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="10" y="10" width="70" height="70" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2.5"/>' +
      '<text x="45" y="86" text-anchor="middle" font-size="12" fill="#374151" font-family="sans-serif">A</text>' +
      '<rect x="120" y="22" width="90" height="46" fill="#FECDD3" stroke="#F43F5E" stroke-width="2.5"/>' +
      '<text x="165" y="86" text-anchor="middle" font-size="12" fill="#374151" font-family="sans-serif">B</text>' +
      '</svg></div>' +
      'Shape <b>A</b> has 4 equal sides. Shape <b>B</b> has 2 long and 2 short sides. Which shape is a <b>square</b>?',
    options:['Shape A','Shape B','both','neither'], answer:'Shape A',
    hint:'A square has all 4 sides the same length.',
    explanation:'<b>Shape A</b> is the square — all 4 sides are equal. Shape B is a rectangle.' }),

  makeMCQ({ id:'g1mth-shp-086', chapterId:'g1mth-shapes', difficulty:2, subsection:'properties_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a blue shape rotated at an angle">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="25" y="25" width="50" height="50" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2.5" transform="rotate(45 50 50)"/>' +
      '</svg></div>' +
      'This shape is <b>tilted</b>. What shape is it?',
    options:['square','circle','triangle','pentagon'], answer:'square',
    hint:'Count the sides — how many are there, and are they all equal?',
    explanation:'Even when tilted, this is still a <b>square</b> — it has 4 equal sides.' }),

  makeMCQ({ id:'g1mth-shp-087', chapterId:'g1mth-shapes', difficulty:1, subsection:'properties_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three different 2D shapes in a row">' +
      '<svg viewBox="0 0 240 90" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="40" cy="45" r="32" fill="#FDE68A" stroke="#F59E0B" stroke-width="2.5"/>' +
      '<polygon points="120,10 160,80 80,80" fill="#A7F3D0" stroke="#10B981" stroke-width="2.5"/>' +
      '<rect x="178" y="15" width="55" height="55" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2.5"/>' +
      '</svg></div>' +
      'Which shape has <b>exactly 3 corners</b>?',
    options:['the green shape','the yellow shape','the blue shape','all of them'], answer:'the green shape',
    hint:'Count the corners of each shape.',
    explanation:'The <b>green shape</b> (triangle) has exactly 3 corners.' })

);

// ── position_direction visual (088–092) ──────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-shp-088', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a diagram showing the position of a round object relative to a box">' +
      '<svg viewBox="0 0 110 145" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="55" cy="22" r="18" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2.5"/>' +
      '<rect x="15" y="65" width="80" height="65" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2.5" rx="3"/>' +
      '</svg></div>' +
      'Where is the <b>ball</b> compared to the box?',
    options:['above the box','below the box','beside the box','inside the box'], answer:'above the box',
    hint:'Is the ball higher or lower than the box?',
    explanation:'The ball is <b>above</b> the box — it is higher up.' }),

  makeMCQ({ id:'g1mth-shp-089', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a diagram showing the position of a round object relative to a box">' +
      '<svg viewBox="0 0 110 145" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="15" y="15" width="80" height="65" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2.5" rx="3"/>' +
      '<circle cx="55" cy="120" r="18" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2.5"/>' +
      '</svg></div>' +
      'Where is the <b>ball</b> compared to the box?',
    options:['below the box','above the box','beside the box','inside the box'], answer:'below the box',
    hint:'Is the ball higher or lower than the box?',
    explanation:'The ball is <b>below</b> (under) the box.' }),

  makeMCQ({ id:'g1mth-shp-090', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a diagram showing a box and a round object side by side">' +
      '<svg viewBox="0 0 190 90" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="10" y="10" width="75" height="70" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2.5" rx="3"/>' +
      '<circle cx="148" cy="45" r="28" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2.5"/>' +
      '</svg></div>' +
      'The ball is to the ___ of the box.',
    options:['right','left','above','below'], answer:'right',
    hint:'Look at which side the ball is on.',
    explanation:'The ball is to the <b>right</b> of the box.' }),

  makeMCQ({ id:'g1mth-shp-091', chapterId:'g1mth-shapes', difficulty:1, subsection:'position_direction',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a diagram showing a round object and a box side by side">' +
      '<svg viewBox="0 0 190 90" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="40" cy="45" r="28" fill="#FDE68A" stroke="#F59E0B" stroke-width="2.5"/>' +
      '<rect x="105" y="10" width="75" height="70" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2.5" rx="3"/>' +
      '</svg></div>' +
      'The yellow shape is to the ___ of the purple box.',
    options:['left','right','above','below'], answer:'left',
    hint:'Which side is the yellow shape on?',
    explanation:'The yellow shape is to the <b>left</b> of the box.' }),

  makeMCQ({ id:'g1mth-shp-092', chapterId:'g1mth-shapes', difficulty:2, subsection:'position_direction',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a diagram with three objects at different heights, labeled">' +
      '<svg viewBox="0 0 150 175" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="75" cy="20" r="15" fill="#FDE68A" stroke="#F59E0B" stroke-width="2"/>' +
      '<text x="75" y="42" text-anchor="middle" font-size="10" fill="#6B7280" font-family="sans-serif">sun</text>' +
      '<rect x="30" y="55" width="90" height="65" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2" rx="3"/>' +
      '<text x="75" y="132" text-anchor="middle" font-size="10" fill="#6B7280" font-family="sans-serif">house</text>' +
      '<polygon points="75,140 90,163 60,163" fill="#A7F3D0" stroke="#10B981" stroke-width="2"/>' +
      '<text x="75" y="175" text-anchor="middle" font-size="10" fill="#6B7280" font-family="sans-serif">tree</text>' +
      '</svg></div>' +
      'Which object is <b>highest</b>?',
    options:['the sun','the house','the tree','they are the same'], answer:'the sun',
    hint:'Which object is at the top of the picture?',
    explanation:'The <b>sun</b> is highest — it is above both the house and the tree.' })

);

})();
