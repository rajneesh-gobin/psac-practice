'use strict';
(function () {

// ── 2d_shapes visual (061–064) ────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-shp-061', chapterId:'g2mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 2D polygon">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="50,5 97,36 80,90 20,90 3,36" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="3"/>' +
      '</svg></div>' +
      'What shape is shown?',
    options:['pentagon','hexagon','square','triangle'], answer:'pentagon',
    hint:'"Penta" means five — count the sides.',
    explanation:'This is a <b>pentagon</b> — it has 5 sides and 5 corners.' }),

  makeMCQ({ id:'g2mth-shp-062', chapterId:'g2mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 2D polygon">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="50,5 92,27 92,73 50,95 8,73 8,27" fill="#FED7AA" stroke="#F97316" stroke-width="3"/>' +
      '</svg></div>' +
      'What shape is shown?',
    options:['hexagon','pentagon','octagon','rectangle'], answer:'hexagon',
    hint:'"Hexa" means six — count the sides.',
    explanation:'This is a <b>hexagon</b> — it has 6 sides and 6 corners.' }),

  makeMCQ({ id:'g2mth-shp-063', chapterId:'g2mth-shapes', difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 2D polygon">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="50,5 95,50 50,95 5,50" fill="#FCE7F3" stroke="#EC4899" stroke-width="3"/>' +
      '</svg></div>' +
      'What shape is shown?',
    options:['rhombus (diamond)','square','rectangle','triangle'], answer:'rhombus (diamond)',
    hint:'It has 4 equal sides but no right angles — it looks like a tilted square.',
    explanation:'This is a <b>rhombus</b> (also called a diamond) — 4 equal sides but angles are not right angles.' }),

  makeMCQ({ id:'g2mth-shp-064', chapterId:'g2mth-shapes', difficulty:2, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 2D polygon with marked corners">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="50,5 97,36 80,90 20,90 3,36" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="2.5"/>' +
      '<circle cx="50" cy="5" r="5" fill="#DC2626"/>' +
      '<circle cx="97" cy="36" r="5" fill="#DC2626"/>' +
      '<circle cx="80" cy="90" r="5" fill="#DC2626"/>' +
      '<circle cx="20" cy="90" r="5" fill="#DC2626"/>' +
      '<circle cx="3" cy="36" r="5" fill="#DC2626"/>' +
      '</svg></div>' +
      'The red dots mark the vertices (corners). How many vertices does this shape have?',
    options:['5','4','6','3'], answer:'5',
    hint:'Count the red dots.',
    explanation:'There are <b>5</b> red dots — so this shape has 5 vertices. It is a pentagon.' })
);

// ── 3d_shapes visual (065–072) ────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-shp-065', chapterId:'g2mth-shapes', difficulty:1, subsection:'3d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 3D solid shape">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="50,10 82,27 50,44 18,27" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<polygon points="82,27 82,67 50,84 50,44" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<polygon points="18,27 50,44 50,84 18,67" fill="#93C5FD" stroke="#3B82F6" stroke-width="2"/>' +
      '</svg></div>' +
      'What 3D shape is shown?',
    options:['cube','cuboid','sphere','cylinder'], answer:'cube',
    hint:'All faces of this shape are equal squares.',
    explanation:'This is a <b>cube</b> — it has 6 equal square faces, 12 edges and 8 vertices.' }),

  makeMCQ({ id:'g2mth-shp-066', chapterId:'g2mth-shapes', difficulty:1, subsection:'3d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 3D solid shape">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<ellipse cx="50" cy="22" rx="32" ry="11" fill="#A7F3D0" stroke="#10B981" stroke-width="2"/>' +
      '<rect x="18" y="22" width="64" height="55" fill="#D1FAE5" stroke="none"/>' +
      '<line x1="18" y1="22" x2="18" y2="77" stroke="#10B981" stroke-width="2"/>' +
      '<line x1="82" y1="22" x2="82" y2="77" stroke="#10B981" stroke-width="2"/>' +
      '<ellipse cx="50" cy="77" rx="32" ry="11" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>' +
      '</svg></div>' +
      'What 3D shape is shown?',
    options:['cylinder','cone','cube','sphere'], answer:'cylinder',
    hint:'It has two circular ends and a curved surface — like a tin can.',
    explanation:'This is a <b>cylinder</b> — two flat circular faces and one curved surface.' }),

  makeMCQ({ id:'g2mth-shp-067', chapterId:'g2mth-shapes', difficulty:1, subsection:'3d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 3D solid shape">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="50,8 82,82 18,82" fill="#FDE68A" stroke="#F59E0B" stroke-width="2"/>' +
      '<ellipse cx="50" cy="82" rx="32" ry="10" fill="#FCD34D" stroke="#F59E0B" stroke-width="2"/>' +
      '</svg></div>' +
      'What 3D shape is shown?',
    options:['cone','cylinder','pyramid','sphere'], answer:'cone',
    hint:'It has a circular base and comes to a point — like an ice cream cone.',
    explanation:'This is a <b>cone</b> — one flat circular face at the base and a curved surface up to a point.' }),

  makeMCQ({ id:'g2mth-shp-068', chapterId:'g2mth-shapes', difficulty:1, subsection:'3d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 3D solid shape">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="42" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3"/>' +
      '</svg></div>' +
      'What 3D shape is shown?',
    options:['sphere','circle','cylinder','cube'], answer:'sphere',
    hint:'It is perfectly round in every direction — like a ball.',
    explanation:'This is a <b>sphere</b> — perfectly round with no flat faces. The dashed line shows the equator.' }),

  makeMCQ({ id:'g2mth-shp-069', chapterId:'g2mth-shapes', difficulty:1, subsection:'3d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 3D solid shape">' +
      '<svg viewBox="0 0 110 90" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="55,10 95,22 55,35 15,22" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<polygon points="95,22 95,72 55,85 55,35" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<polygon points="15,22 55,35 55,85 15,72" fill="#93C5FD" stroke="#3B82F6" stroke-width="2"/>' +
      '</svg></div>' +
      'What 3D shape is shown?',
    options:['cuboid','cube','cylinder','cone'], answer:'cuboid',
    hint:'It looks like a box — 6 rectangular faces, but they are not all the same size.',
    explanation:'This is a <b>cuboid</b> — like a cereal box. It has 6 rectangular faces; unlike a cube, not all faces are equal.' }),

  makeMCQ({ id:'g2mth-shp-070', chapterId:'g2mth-shapes', difficulty:2, subsection:'3d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 3D solid with two faces labelled">' +
      '<svg viewBox="0 0 120 100" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<ellipse cx="60" cy="22" rx="32" ry="11" fill="#A7F3D0" stroke="#10B981" stroke-width="2"/>' +
      '<rect x="28" y="22" width="64" height="55" fill="#D1FAE5" stroke="none"/>' +
      '<line x1="28" y1="22" x2="28" y2="77" stroke="#10B981" stroke-width="2"/>' +
      '<line x1="92" y1="22" x2="92" y2="77" stroke="#10B981" stroke-width="2"/>' +
      '<ellipse cx="60" cy="77" rx="32" ry="11" fill="#6EE7B7" stroke="#10B981" stroke-width="2"/>' +
      '<text x="105" y="26" font-size="11" fill="#DC2626" font-family="sans-serif">&#x2460;</text>' +
      '<text x="105" y="81" font-size="11" fill="#DC2626" font-family="sans-serif">&#x2461;</text>' +
      '</svg></div>' +
      'The diagram shows a 3D shape. How many <b>flat faces</b> does it have?',
    options:['2','1','3','0'], answer:'2',
    hint:'The numbered circles mark each flat face.',
    explanation:'A cylinder has <b>2</b> flat circular faces — one at the top and one at the bottom.' }),

  makeMCQ({ id:'g2mth-shp-071', chapterId:'g2mth-shapes', difficulty:2, subsection:'3d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 3D solid with one face labelled">' +
      '<svg viewBox="0 0 120 100" style="width:100%;max-width:140px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="60,8 92,82 28,82" fill="#FDE68A" stroke="#F59E0B" stroke-width="2"/>' +
      '<ellipse cx="60" cy="82" rx="32" ry="10" fill="#FCD34D" stroke="#F59E0B" stroke-width="2"/>' +
      '<text x="100" y="86" font-size="11" fill="#DC2626" font-family="sans-serif">&#x2460;</text>' +
      '</svg></div>' +
      'The diagram shows a 3D shape. How many <b>flat faces</b> does it have?',
    options:['1','2','0','3'], answer:'1',
    hint:'The numbered circle marks the only flat face.',
    explanation:'A cone has <b>1</b> flat face — the circular base. The rest is a curved surface.' }),

  makeMCQ({ id:'g2mth-shp-072', chapterId:'g2mth-shapes', difficulty:2, subsection:'3d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a 3D solid with face labels">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:120px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="50,10 82,27 50,44 18,27" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<polygon points="82,27 82,67 50,84 50,44" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<polygon points="18,27 50,44 50,84 18,67" fill="#93C5FD" stroke="#3B82F6" stroke-width="2"/>' +
      '<text x="50" y="30" text-anchor="middle" font-size="9" fill="#1E40AF" font-family="sans-serif">top</text>' +
      '<text x="72" y="58" text-anchor="middle" font-size="9" fill="#1E40AF" font-family="sans-serif">right</text>' +
      '<text x="28" y="58" text-anchor="middle" font-size="9" fill="#1E40AF" font-family="sans-serif">left</text>' +
      '</svg></div>' +
      'A cube has 3 visible faces and 3 hidden faces. How many faces does a cube have <b>in total</b>?',
    options:['6','4','8','5'], answer:'6',
    hint:'3 visible + 3 hidden = ?',
    explanation:'3 visible + 3 hidden = <b>6</b> faces in total. Every cube has exactly 6 square faces.' })
);

// ── symmetry visual (073–078) ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-shp-073', chapterId:'g2mth-shapes', difficulty:1, subsection:'symmetry',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a shape with dashed lines">' +
      '<svg viewBox="0 0 200 120" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="10" y="20" width="180" height="80" fill="#FECDD3" stroke="#F43F5E" stroke-width="2"/>' +
      '<line x1="5" y1="60" x2="195" y2="60" stroke="#DC2626" stroke-width="2" stroke-dasharray="7,4"/>' +
      '<line x1="100" y1="15" x2="100" y2="105" stroke="#DC2626" stroke-width="2" stroke-dasharray="7,4"/>' +
      '</svg></div>' +
      'The red dashed lines are lines of symmetry. How many lines of symmetry does this rectangle have?',
    options:['2','1','4','0'], answer:'2',
    hint:'Count the dashed lines.',
    explanation:'A rectangle has <b>2</b> lines of symmetry — one horizontal and one vertical.' }),

  makeMCQ({ id:'g2mth-shp-074', chapterId:'g2mth-shapes', difficulty:1, subsection:'symmetry',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a shape with dashed lines">' +
      '<svg viewBox="0 0 200 180" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polygon points="100,10 190,165 10,165" fill="#A7F3D0" stroke="#10B981" stroke-width="2"/>' +
      '<line x1="100" y1="10" x2="100" y2="165" stroke="#DC2626" stroke-width="2" stroke-dasharray="7,4"/>' +
      '<line x1="10" y1="165" x2="145" y2="87" stroke="#DC2626" stroke-width="2" stroke-dasharray="7,4"/>' +
      '<line x1="190" y1="165" x2="55" y2="87" stroke="#DC2626" stroke-width="2" stroke-dasharray="7,4"/>' +
      '</svg></div>' +
      'How many lines of symmetry does this equilateral triangle have?',
    options:['3','1','2','0'], answer:'3',
    hint:'An equilateral triangle has 3 equal sides — one line through each vertex.',
    explanation:'An equilateral triangle has <b>3</b> lines of symmetry, one from each vertex to the midpoint of the opposite side.' }),

  makeMCQ({ id:'g2mth-shp-075', chapterId:'g2mth-shapes', difficulty:2, subsection:'symmetry',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a shape with dashed lines">' +
      '<svg viewBox="0 0 160 160" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="20" y="20" width="120" height="120" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<line x1="5" y1="80" x2="155" y2="80" stroke="#DC2626" stroke-width="2" stroke-dasharray="6,4"/>' +
      '<line x1="80" y1="5" x2="80" y2="155" stroke="#DC2626" stroke-width="2" stroke-dasharray="6,4"/>' +
      '<line x1="20" y1="20" x2="140" y2="140" stroke="#DC2626" stroke-width="2" stroke-dasharray="6,4"/>' +
      '<line x1="140" y1="20" x2="20" y2="140" stroke="#DC2626" stroke-width="2" stroke-dasharray="6,4"/>' +
      '</svg></div>' +
      'How many lines of symmetry does a square have?',
    options:['4','2','1','0'], answer:'4',
    hint:'A square can be folded in half 4 ways: left/right, top/bottom, and both diagonals.',
    explanation:'A square has <b>4</b> lines of symmetry — horizontal, vertical, and both diagonals.' }),

  makeMCQ({ id:'g2mth-shp-076', chapterId:'g2mth-shapes', difficulty:1, subsection:'symmetry',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a letter shape with a dashed line">' +
      '<svg viewBox="0 0 200 170" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="10" y="15" width="180" height="45" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2"/>' +
      '<rect x="75" y="60" width="50" height="100" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2"/>' +
      '<line x1="100" y1="5" x2="100" y2="165" stroke="#DC2626" stroke-width="2" stroke-dasharray="7,4"/>' +
      '</svg></div>' +
      'Does the letter <b>T</b> have a line of symmetry?',
    options:['Yes — a vertical line','No — it has no symmetry','Yes — a horizontal line','Yes — 4 lines'], answer:'Yes — a vertical line',
    hint:'Try folding the T in half down the middle.',
    explanation:'<b>Yes</b> — the letter T has a vertical line of symmetry. The left and right halves are mirror images.' }),

  makeMCQ({ id:'g2mth-shp-077', chapterId:'g2mth-shapes', difficulty:1, subsection:'symmetry',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a letter shape">' +
      '<svg viewBox="0 0 180 180" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="20" y="15" width="40" height="150" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/>' +
      '<rect x="60" y="15" width="100" height="45" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/>' +
      '<rect x="60" y="78" width="75" height="35" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/>' +
      '</svg></div>' +
      'Does the letter <b>F</b> have a line of symmetry?',
    options:['No','Yes — a vertical line','Yes — a horizontal line','Yes — 2 lines'], answer:'No',
    hint:'Try folding it in half in any direction — do both halves match?',
    explanation:'<b>No</b> — the letter F has no line of symmetry. The horizontal bars are only on one side, so no fold gives matching halves.' }),

  makeMCQ({ id:'g2mth-shp-078', chapterId:'g2mth-shapes', difficulty:2, subsection:'symmetry',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="diagram of a butterfly shape with a dashed centre line">' +
      '<svg viewBox="0 0 200 180" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<ellipse cx="65" cy="80" rx="50" ry="65" fill="#FDE68A" stroke="#F59E0B" stroke-width="2" transform="rotate(-20 65 80)"/>' +
      '<ellipse cx="135" cy="80" rx="50" ry="65" fill="#FDE68A" stroke="#F59E0B" stroke-width="2" transform="rotate(20 135 80)"/>' +
      '<ellipse cx="100" cy="90" rx="9" ry="55" fill="#78350F" stroke="#451A03" stroke-width="1.5"/>' +
      '<line x1="100" y1="5" x2="100" y2="175" stroke="#DC2626" stroke-width="2" stroke-dasharray="7,4"/>' +
      '</svg></div>' +
      'Is this butterfly shape symmetrical?',
    options:['Yes — the wings match on both sides','No — the wings are different','Only one side is correct','Cannot tell'], answer:'Yes — the wings match on both sides',
    hint:'The dashed red line is the mirror line — do the wings look the same on each side?',
    explanation:'<b>Yes</b> — the butterfly is symmetrical. The left wing is a mirror image of the right wing along the vertical line.' })
);

})();
