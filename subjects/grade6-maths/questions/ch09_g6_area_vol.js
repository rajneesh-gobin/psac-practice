'use strict';
// Grade 6 Maths — Chapter: Area, Volume & Surface Area
// IDs format: g6m-av-NNN

// Cuboid SVG
const _SVG_CUBOID = `<svg viewBox="0 0 200 140" width="200" height="140" style="display:block;margin:6px auto;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <polygon points="40,100 140,100 140,30 40,30" fill="#bfdbfe" stroke="#1e40af" stroke-width="1.5"/>
  <polygon points="140,100 180,70 180,0 140,30" fill="#93c5fd" stroke="#1e40af" stroke-width="1.5"/>
  <polygon points="40,30 80,0 180,0 140,30" fill="#dbeafe" stroke="#1e40af" stroke-width="1.5"/>
  <line x1="40" y1="100" x2="80" y2="70" stroke="#1e40af" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="80" y1="70" x2="180" y2="70" stroke="#1e40af" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="80" y1="70" x2="80" y2="0" stroke="#1e40af" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="90" y="118" text-anchor="middle" font-size="9" fill="#1e40af" font-weight="bold">l = length</text>
  <text x="168" y="90" text-anchor="middle" font-size="9" fill="#1e40af" font-weight="bold">w</text>
  <text x="25" y="65" text-anchor="middle" font-size="9" fill="#1e40af" font-weight="bold">h</text>
  <text x="100" y="132" text-anchor="middle" font-size="7.5" fill="#475569">Volume = l × w × h</text>
  <text x="100" y="142" text-anchor="middle" font-size="6.5" fill="#64748b">Surface Area = 2(lw + lh + wh)</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-av-001', chapterId:'g6-area-vol', difficulty:1,
    question:'What is the AREA of a rectangle with length 9 cm and width 6 cm?',
    answer:'54', acceptableAnswers:['54','54 cm²','54 sq cm'],
    hint:'Area of rectangle = length × width.',
    explanation:'Area = 9 × 6 = <b>54 cm²</b>.' }),

  makeNum({ id:'g6m-av-002', chapterId:'g6-area-vol', difficulty:2,
    question:'What is the AREA of a triangle with base 10 cm and height 8 cm?',
    answer:'40', acceptableAnswers:['40','40 cm²','40 sq cm'],
    hint:'Area of triangle = ½ × base × height.',
    explanation:'Area = ½ × 10 × 8 = ½ × 80 = <b>40 cm²</b>.' }),

  makeNum({ id:'g6m-av-003', chapterId:'g6-area-vol', difficulty:2,
    question:`${_SVG_CUBOID}Find the VOLUME of a cuboid with length 5 cm, width 4 cm and height 3 cm.`,
    answer:'60', acceptableAnswers:['60','60 cm³','60 cubic cm'],
    hint:'Volume = length × width × height.',
    explanation:'Volume = 5 × 4 × 3 = <b>60 cm³</b>.' }),

  makeNum({ id:'g6m-av-004', chapterId:'g6-area-vol', difficulty:2,
    question:`${_SVG_CUBOID}Find the SURFACE AREA of a cuboid with length 6 cm, width 4 cm and height 3 cm.`,
    answer:'108', acceptableAnswers:['108','108 cm²'],
    hint:'Surface area = 2(lw + lh + wh) = 2(6×4 + 6×3 + 4×3).',
    explanation:'lw=24, lh=18, wh=12. SA = 2(24+18+12) = 2×54 = <b>108 cm²</b>.' }),

  makeNum({ id:'g6m-av-005', chapterId:'g6-area-vol', difficulty:2,
    question:'A room is 8 m long and 5 m wide. How many square tiles of side 1 m are needed to cover the floor?',
    answer:'40', acceptableAnswers:['40'],
    hint:'Area of floor = length × width. Each tile covers 1 m².',
    explanation:'Floor area = 8 × 5 = 40 m². Each tile is 1×1 = 1 m². So <b>40 tiles</b> are needed.' }),

  makeMCQ({ id:'g6m-av-006', chapterId:'g6-area-vol', difficulty:2,
    question:'A square has an area of 64 cm². What is the LENGTH of one side?',
    options:['6 cm','7 cm','8 cm','9 cm'],
    answer:'8 cm',
    hint:'Area of square = side². Find the square root of 64.',
    explanation:'Area = side². 64 = 8². So one side = √64 = <b>8 cm</b>.' }),

  makeNum({ id:'g6m-av-007', chapterId:'g6-area-vol', difficulty:2,
    question:'A swimming pool is 20 m long, 10 m wide and 2 m deep. How many cubic metres of water can it hold?',
    answer:'400', acceptableAnswers:['400','400 m³'],
    hint:'Volume = length × width × depth.',
    explanation:'Volume = 20 × 10 × 2 = <b>400 m³</b>.' }),

  makeMCQ({ id:'g6m-av-008', chapterId:'g6-area-vol', difficulty:2,
    question:'A rectangle has an area of 72 cm² and a length of 12 cm. What is its width?',
    options:['5 cm','6 cm','7 cm','8 cm'],
    answer:'6 cm',
    hint:'Area = length × width. 72 = 12 × width.',
    explanation:'Width = 72 ÷ 12 = <b>6 cm</b>.' }),

  makeTF({ id:'g6m-av-009', chapterId:'g6-area-vol', difficulty:1,
    question:'Volume is measured in cubic units (e.g. cm³), while area is measured in square units (e.g. cm²).',
    answer:true,
    hint:'Think about dimensions: area covers a flat surface (2D); volume fills a 3D space.',
    explanation:'<b>True</b>. <b>Area</b> is a 2D measurement (cm², m²). <b>Volume</b> is a 3D measurement (cm³, m³). This is why a volume formula multiplies three dimensions (l × w × h).' }),

  makeNum({ id:'g6m-av-010', chapterId:'g6-area-vol', difficulty:2,
    question:'A garden is L-shaped. It is a 10 m × 8 m rectangle with a 3 m × 4 m corner cut out. What is the area of the garden?',
    answer:'68', acceptableAnswers:['68','68 m²'],
    hint:'Find the area of the full rectangle, then subtract the cut-out corner.',
    explanation:'Full rectangle = 10 × 8 = 80 m². Cut-out = 3 × 4 = 12 m². Garden area = 80 − 12 = <b>68 m²</b>.' })

);
