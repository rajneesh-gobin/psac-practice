'use strict';
// Grade 7 Maths — g7m-symmetry, batch 2A (009–020)

function _b2aSquares(cols, rows, cell, shaded, mirrorCol) {
  const X0 = 24, Y0 = 22;
  let s = '<svg viewBox="0 0 ' + (X0 * 2 + cols * cell) + ' ' + (Y0 * 2 + rows * cell) + '" width="' + (X0 * 2 + cols * cell) + '" height="' + (Y0 * 2 + rows * cell) + '" style="display:block;margin:6px auto;max-width:100%;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1" role="img" aria-label="a diagram of shaded squares on a grid">';
  for (const c of shaded) {
    s += '<rect x="' + (X0 + c[0] * cell) + '" y="' + (Y0 + c[1] * cell) + '" width="' + cell + '" height="' + cell + '" fill="#60a5fa"/>';
  }
  for (let i = 0; i <= cols; i++) {
    const x = X0 + i * cell;
    s += '<line x1="' + x + '" y1="' + Y0 + '" x2="' + x + '" y2="' + (Y0 + rows * cell) + '" stroke="#cbd5e1" stroke-width="1"/>';
  }
  for (let j = 0; j <= rows; j++) {
    const y = Y0 + j * cell;
    s += '<line x1="' + X0 + '" y1="' + y + '" x2="' + (X0 + cols * cell) + '" y2="' + y + '" stroke="#cbd5e1" stroke-width="1"/>';
  }
  const mx = X0 + mirrorCol * cell;
  s += '<line x1="' + mx + '" y1="' + (Y0 - 12) + '" x2="' + mx + '" y2="' + (Y0 + rows * cell + 12) + '" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4"/>';
  return s + '</svg>';
}

const _B2A_TRAPEZIUM = '<svg viewBox="0 0 220 150" width="220" height="150" style="display:block;margin:6px auto;max-width:100%;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1" role="img" aria-label="a diagram of a four-sided shape">'
  + '<polygon points="40,118 180,118 150,38 70,38" fill="rgba(37,99,235,0.12)" stroke="#2563eb" stroke-width="2"/>'
  + '</svg>';

const _B2A_MIRROR_POINT = '<svg viewBox="0 0 260 200" width="260" height="200" style="display:block;margin:6px auto;max-width:100%;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1" role="img" aria-label="a diagram of a point beside a mirror line">'
  + '<line x1="20" y1="100" x2="240" y2="100" stroke="#1e293b" stroke-width="2"/>'
  + '<line x1="130" y1="20" x2="130" y2="180" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4"/>'
  + '<text x="136" y="34" font-size="11" font-family="sans-serif" fill="#dc2626">x = 0</text>'
  + '<circle cx="76" cy="64" r="4" fill="#2563eb"/>'
  + '<text x="56" y="58" font-size="13" font-weight="bold" font-family="sans-serif" fill="#2563eb">P</text>'
  + '<text x="76" y="118" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#64748b">&#8722;3</text>'
  + '<text x="184" y="118" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#64748b">3</text>'
  + '<line x1="76" y1="96" x2="76" y2="104" stroke="#1e293b" stroke-width="2"/>'
  + '<line x1="184" y1="96" x2="184" y2="104" stroke="#1e293b" stroke-width="2"/>'
  + '</svg>';

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-symmetry-009', chapterId:'g7m-symmetry', difficulty:1,
    subsection:'lines_symmetry',
    question:'How many lines of symmetry does a rectangle that is NOT a square have?',
    options:['2','1','4','0'],
    answer:'2',
    hint:'Try folding a rectangular sheet of paper so that the two halves match exactly.',
    explanation:'A rectangle folds neatly across its middle in two ways: one horizontal fold and one vertical fold. Its diagonals look tempting, but folding along a diagonal leaves the two halves overlapping unevenly, so 4 belongs to a square, not a rectangle.' }),

  makeMCQ({ id:'g7m-symmetry-010', chapterId:'g7m-symmetry', difficulty:2,
    subsection:'lines_symmetry',
    question:'Which capital letter has exactly ONE line of symmetry?',
    options:['A','H','X','S'],
    answer:'A',
    hint:'Picture a mirror placed down the middle of each letter, and then across it.',
    explanation:'A has a single vertical line of symmetry. H and X each have two (one vertical, one horizontal), and S has none at all — it has rotational symmetry instead, which is a different thing.' }),

  makeMCQ({ id:'g7m-symmetry-011', chapterId:'g7m-symmetry', difficulty:2,
    subsection:'lines_symmetry',
    question:'How many lines of symmetry does the shape below have?' + _B2A_TRAPEZIUM,
    options:['1','0','2','4'],
    answer:'1',
    hint:'Check a vertical fold, then a horizontal fold. Do both halves match?',
    explanation:'The shape is an isosceles trapezium: a vertical fold down the middle matches the two sloping sides exactly, so there is one line of symmetry. A horizontal fold fails because the top edge is shorter than the bottom edge, so it cannot have 2 or 4.' }),

  makeNum({ id:'g7m-symmetry-012', chapterId:'g7m-symmetry', difficulty:3,
    subsection:'lines_symmetry',
    question:'A regular polygon has 8 lines of symmetry. What is the size of EACH of its exterior angles, in degrees?',
    answer:45,
    hint:'For a regular polygon the number of lines of symmetry equals the number of sides.',
    explanation:'Eight lines of symmetry means 8 sides, and the exterior angles of any polygon total 360°, so each one is 360 ÷ 8 = 45°. Answering 135 gives the INTERIOR angle, which is what is left of a straight line.' }),

  makeMCQ({ id:'g7m-symmetry-013', chapterId:'g7m-symmetry', difficulty:1,
    subsection:'rotational_symmetry',
    question:'What is the order of rotational symmetry of a rectangle that is NOT a square?',
    options:['2','1','4','0'],
    answer:'2',
    hint:'Turn the shape through one full circle and count how many times it looks unchanged.',
    explanation:'A rectangle matches itself after a half turn and again after a full turn, so the order is 2. Order 4 belongs to the square, and no shape has order 0 — every shape matches itself after a full turn.' }),

  makeMCQ({ id:'g7m-symmetry-014', chapterId:'g7m-symmetry', difficulty:2,
    subsection:'rotational_symmetry',
    question:'Which of these shapes has NO rotational symmetry, that is an order of only 1?',
    options:['Kite','Rhombus','Rectangle','Parallelogram'],
    answer:'Kite',
    hint:'Turn each one through a half turn. Which one no longer looks the same?',
    explanation:'A kite only matches itself after a complete turn, so its order is 1. A rhombus, a rectangle and a parallelogram all match themselves after a half turn, giving each of them order 2.' }),

  makeNum({ id:'g7m-symmetry-015', chapterId:'g7m-symmetry', difficulty:2,
    subsection:'rotational_symmetry',
    question:'A regular pentagon is turned about its centre until it first looks exactly as it did before. Through how many degrees has it been turned?',
    answer:72,
    hint:'A full turn is shared equally between the five positions in which the shape matches itself.',
    explanation:'360 ÷ 5 = 72°, so the smallest turn that works is 72°. Answering 180 works for a rectangle but not for a pentagon, and 108° is the size of an interior angle rather than a turn.' }),

  makeMCQ({ id:'g7m-symmetry-016', chapterId:'g7m-symmetry', difficulty:3,
    subsection:'rotational_symmetry',
    question:'A pattern has rotational symmetry of order 6. Through which of these angles will it NOT look the same?',
    options:['100°','120°','180°','240°'],
    answer:'100°',
    hint:'Work out the smallest turn that works, then check which angle is not a multiple of it.',
    explanation:'The smallest turn is 360 ÷ 6 = 60°, so the pattern matches itself at 60°, 120°, 180°, 240° and 300°. 100° is not a multiple of 60, so the pattern is caught halfway between two matching positions.' }),

  makeMCQ({ id:'g7m-symmetry-017', chapterId:'g7m-symmetry', difficulty:2,
    subsection:'completing_figures',
    question:'The point P below is part of a figure that is being completed by reflection in the dashed mirror line x = 0. Where does the mirror image of P land?' + _B2A_MIRROR_POINT,
    options:['(3, 2)','(−3, −2)','(2, 3)','(3, −2)'],
    answer:'(3, 2)',
    hint:'A reflection in a vertical mirror keeps the height the same and moves the point across.',
    explanation:'P is at (−3, 2), three units left of the mirror, so its image is three units to the right at the same height: (3, 2). (−3, −2) and (3, −2) reflect in the wrong direction, downwards, and (2, 3) swaps the two coordinates.' }),

  makeNum({ id:'g7m-symmetry-018', chapterId:'g7m-symmetry', difficulty:2,
    subsection:'completing_figures',
    question:'The diagram shows part of a pattern beside a dashed mirror line. When the pattern is completed by reflection, how many shaded squares will there be altogether?'
      + _b2aSquares(8, 6, 24, [[3, 2], [3, 3], [2, 3], [3, 4], [2, 4]], 4),
    answer:10,
    hint:'Count the squares already shaded, then remember every one of them gains a partner.',
    explanation:'There are 5 shaded squares, and reflecting adds 5 more, giving 10 in the finished pattern. Answering 5 stops at the half that is already drawn, and no square here lies ON the mirror line, so none of them is shared.' }),

  makeNum({ id:'g7m-symmetry-019', chapterId:'g7m-symmetry', difficulty:3,
    subsection:'completing_figures',
    question:'A figure is being completed by reflection. On one side of the mirror line 4 squares are shaded, and 1 further square lies exactly ON the mirror line and is also shaded. How many shaded squares does the completed figure have?',
    answer:9,
    hint:'A square sitting on the mirror line is its own reflection, so it is not drawn twice.',
    explanation:'The 4 squares on one side gain 4 partners, giving 8, and the square on the line counts once more: 8 + 1 = 9. Doubling everything gives 10 and counts the square on the mirror line twice, which would place two shaded squares in one cell.' }),

  makeNum({ id:'g7m-symmetry-020', chapterId:'g7m-symmetry', difficulty:4,
    subsection:'completing_figures',
    question:'A square floor tile is designed with two lines of symmetry at right angles and rotational symmetry of order 4. One quarter of the tile carries 6 coloured triangles, and no triangle touches a line of symmetry. Colouring one triangle costs Rs 15. How many rupees does it cost to colour one whole tile?',
    answer:360,
    hint:'Order 4 means the quarter you can see is repeated. Count the triangles on the whole tile first.',
    explanation:'The quarter is repeated four times, so the tile carries 6 × 4 = 24 triangles, and 24 × 15 = Rs 360. Pricing the quarter alone gives Rs 90, and doubling instead of quadrupling gives Rs 180 — the tile has four quarters, not two.' })

);
