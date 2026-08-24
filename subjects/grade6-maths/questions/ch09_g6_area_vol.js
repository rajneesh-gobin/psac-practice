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


STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-av-011', chapterId:'g6-area-vol', difficulty:1,
    question:'What is the formula for the AREA of a TRIANGLE?',
    options:['base x height','half x base x height','2 x (base + height)','base x height x 2'],
    answer:'half x base x height',
    hint:'A triangle is half of a rectangle with the same base and height.',
    explanation:'Area of triangle = <b>1/2 x base x height</b>. A triangle is exactly half the area of a parallelogram with the same base and height. MIE Grade 6: Area of triangle = 1/2 bh, where b = base and h = perpendicular height.' }),

  makeNum({ id:'g6m-av-012', chapterId:'g6-area-vol', difficulty:2,
    question:'Find the area of a TRIANGLE with base 8 cm and perpendicular height 5 cm.',
    answer:'20', acceptableAnswers:['20','20 cm2'],
    hint:'Area = 1/2 x base x height = 1/2 x 8 x 5.',
    explanation:'Area = 1/2 x 8 x 5 = 1/2 x 40 = <b>20 cm2</b>. The perpendicular height is the vertical distance from the base to the opposite vertex (apex).' }),

  makeNum({ id:'g6m-av-013', chapterId:'g6-area-vol', difficulty:2,
    question:'Find the area of a PARALLELOGRAM with base 12 cm and perpendicular height 7 cm.',
    answer:'84', acceptableAnswers:['84','84 cm2'],
    hint:'Area of parallelogram = base x perpendicular height.',
    explanation:'Area of parallelogram = base x height = 12 x 7 = <b>84 cm2</b>. The height must be perpendicular (at 90 degrees) to the base. MIE Grade 6: Area of parallelogram = b x h.' }),

  makeNum({ id:'g6m-av-014', chapterId:'g6-area-vol', difficulty:2,
    question:'Find the TOTAL SURFACE AREA of a CUBE with side 4 cm.',
    answer:'96', acceptableAnswers:['96','96 cm2'],
    hint:'A cube has 6 identical square faces. Surface area = 6 x (side)2.',
    explanation:'Each face = 4 x 4 = 16 cm2. 6 faces: 6 x 16 = <b>96 cm2</b>. Total surface area = 6s2 where s = side length.' }),

  makeNum({ id:'g6m-av-015', chapterId:'g6-area-vol', difficulty:2,
    question:'Find the VOLUME of a CUBOID with length 8 cm, width 5 cm and height 3 cm.',
    answer:'120', acceptableAnswers:['120','120 cm3'],
    hint:'Volume of cuboid = length x width x height.',
    explanation:'Volume = 8 x 5 x 3 = <b>120 cm3</b>. Volume measures 3D space. The MIE Grade 6 formula is V = l x w x h. Units are always cubic (cm3, m3).' }),

  makeNum({ id:'g6m-av-016', chapterId:'g6-area-vol', difficulty:2,
    question:'A triangle has an AREA of 30 m2 and a BASE of 12 m. What is its perpendicular HEIGHT?',
    answer:'5', acceptableAnswers:['5','5 m'],
    hint:'Area = 1/2 x base x height. Rearrange: height = (2 x Area) / base.',
    explanation:'30 = 1/2 x 12 x h. 30 = 6h. h = 30 / 6 = <b>5 m</b>. Rearranging: h = (2 x Area) / base = (2 x 30) / 12 = 60 / 12 = 5 m.' }),

  makeNum({ id:'g6m-av-017', chapterId:'g6-area-vol', difficulty:2,
    question:'Find the TOTAL SURFACE AREA of a CUBOID with length 5 cm, width 4 cm and height 3 cm.',
    answer:'94', acceptableAnswers:['94','94 cm2'],
    hint:'TSA of cuboid = 2(lw + lh + wh). There are 3 pairs of opposite rectangular faces.',
    explanation:'Top and bottom: 2 x (5x4) = 40 cm2. Front and back: 2 x (5x3) = 30 cm2. Left and right: 2 x (4x3) = 24 cm2. TSA = 40 + 30 + 24 = <b>94 cm2</b>. Formula: 2(lw + lh + wh) = 2(20 + 15 + 12) = 2 x 47 = 94 cm2.' }),

  makeNum({ id:'g6m-av-018', chapterId:'g6-area-vol', difficulty:3,
    question:'A compound shape is made by placing a triangle on top of a rectangle. The rectangle is 10 cm wide and 6 cm tall. The triangle has the same base (10 cm) and a height of 4 cm. What is the TOTAL AREA of the shape?',
    answer:'80', acceptableAnswers:['80','80 cm2'],
    hint:'Total area = area of rectangle + area of triangle.',
    explanation:'Rectangle area = 10 x 6 = 60 cm2. Triangle area = 1/2 x 10 x 4 = 20 cm2. Total = 60 + 20 = <b>80 cm2</b>. This "house shape" is a common compound area question in MIE Grade 6 exams.' }),

  makeNum({ id:'g6m-av-019', chapterId:'g6-area-vol', difficulty:4,
    question:'A room is 6 m long, 5 m wide and 3 m high. Floor tiles cost Rs 120 per m2. Painting the 4 walls costs Rs 80 per m2 (windows and doors account for 6 m2 of wall area and are NOT painted). What is the TOTAL COST of tiling the floor AND painting the walls?',
    answer:'8400', acceptableAnswers:['8400','Rs 8,400','8,400'],
    hint:'Step 1: floor area = 6 x 5. Step 2: wall area = 2(6x3) + 2(5x3), then subtract 6 m2 for windows. Step 3: floor cost + wall cost.',
    explanation:'Floor area = 6 x 5 = 30 m2. Floor cost = 30 x 120 = Rs 3,600. Wall area = 2(6x3) + 2(5x3) = 36 + 30 = 66 m2. Less windows/doors: 66 - 6 = 60 m2. Wall cost = 60 x 80 = Rs 4,800. Total = 3,600 + 4,800 = <b>Rs 8,400</b>.' })

);
