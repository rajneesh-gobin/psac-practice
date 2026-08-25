'use strict';
// ══════════════════════════════════════════════
//  MathMaster Grade 5 - Chapter Help Data
//  CHAPTER_HELP maps chapterId → {
//    videoId: YouTube embed ID,
//    title:   video title for display,
//    channel: channel name,
//    bullets: key concept bullet points
//  }
// ══════════════════════════════════════════════

const CHAPTER_HELP = {

  numeration: {
    videoId: 'Yjc87rAqIYs',
    title:   'Place Value - Grade 5',
    channel: 'Khan Academy',
    bullets: [
      '📍 Place value: each digit\'s position shows its value (units, tens, hundreds… up to millions)',
      '🔢 A 7-digit number: Millions | Hundred-thousands | Ten-thousands | Thousands | Hundreds | Tens | Units',
      '🔼 Rounding: look at the digit to the right - if it\'s 5 or more, round up; if less, round down',
      '🏛️ Roman numerals: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Subtract when a smaller value comes before a larger (IX=9, CM=900)',
      '📈 Number sequences: find the pattern (add, subtract, multiply, or a combination)',
    ]
  },

  four_ops: {
    videoId: 'dAgfnK528RA',
    title:   'Order of Operations (BODMAS)',
    channel: 'Math Antics',
    bullets: [
      '🔤 BODMAS: Brackets → Orders (powers/roots) → Division → Multiplication → Addition → Subtraction',
      '✖️ Always do operations inside Brackets first',
      '➗ Division and Multiplication have equal priority - work left to right',
      '➕ Addition and Subtraction have equal priority - work left to right',
      '📝 Multi-step problems: read carefully, identify what is asked, work step by step',
    ]
  },

  square_nums: {
    videoId: 'Ro38G7t0Hkk',
    title:   'Square Numbers & Patterns - Grade 5',
    channel: 'Khan Academy',
    bullets: [
      '⬜ A square number is a number multiplied by itself: 4² = 4 × 4 = 16',
      '🔑 Square numbers to know: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225',
      '√ Square root is the inverse: √144 = 12 (because 12 × 12 = 144)',
      '📏 Practical use: finding side length of a square when area is given',
      '🔲 Difference between consecutive square numbers: (n+1)² − n² = 2n + 1',
    ]
  },

  geometry: {
    videoId: '_n3KZR1DSEo',
    title:   'Angles & Degrees',
    channel: 'Math Antics',
    bullets: [
      '📐 Angles: acute (<90°), right (90°), obtuse (91°–179°), straight (180°), reflex (>180°)',
      '🔺 Angles in a triangle always add to 180°',
      '🔷 Angles in a quadrilateral always add to 360°',
      '♻️ Lines of symmetry: a regular polygon with n sides has n lines of symmetry',
      '🗺️ Coordinates: (x, y) - x goes across (horizontal), y goes up (vertical)',
      '🔄 3D shapes: count faces (flat surfaces), edges (where faces meet), vertices (corners)',
    ]
  },

  fractions: {
    videoId: '17IgK9b6P2M',
    title:   'Types of Fractions',
    channel: 'Math Antics',
    bullets: [
      '🍕 Proper fraction: numerator < denominator (e.g. ¾)',
      '🔄 Improper fraction: numerator ≥ denominator (e.g. 7/4) - convert by dividing',
      '🔀 Mixed number: whole + fraction (e.g. 1¾)',
      '➕ To add/subtract fractions: find a common denominator first',
      '✖️ To find a fraction of a quantity: divide by denominator, multiply by numerator',
      '🔑 Simplify fractions by dividing numerator and denominator by their HCF',
    ]
  },

  decimals: {
    videoId: 'KG6ILNOiMgM',
    title:   'Decimal Place Value',
    channel: 'Math Antics',
    bullets: [
      '💧 Decimal places: tenths (0.1), hundredths (0.01), thousandths (0.001)',
      '🔢 3.75 means 3 ones + 7 tenths + 5 hundredths',
      '✖️ Multiplying by 10/100/1000: move decimal point right; dividing: move left',
      '📏 To compare decimals: line up decimal points and compare digit by digit',
      '🔄 Convert fraction to decimal: divide numerator by denominator (e.g. 3/4 = 0.75)',
      '⚠️ When adding/subtracting: always line up the decimal points',
    ]
  },

  percentage: {
    videoId: 'JeVSmq1Nrpw',
    title:   'What Are Percentages?',
    channel: 'Math Antics',
    bullets: [
      '% means "out of 100" - 45% = 45/100 = 0.45',
      '🔢 Finding % of a quantity: (percentage ÷ 100) × quantity',
      '📉 Discount: new price = original × (1 − discount%/100)',
      '📈 Percentage increase/decrease: (change ÷ original) × 100',
      '💰 Profit % = (profit ÷ cost price) × 100',
      '🔄 Finding original price: original = sale price ÷ (1 − discount%/100)',
    ]
  },

  powers: {
    videoId: '-zUmvpkhvW8',
    title:   'Intro to Exponents (Indices)',
    channel: 'Math Antics',
    bullets: [
      '🔢 Power notation: 3⁴ means 3 × 3 × 3 × 3 = 81 (base=3, index/exponent=4)',
      '⬜ Square = power of 2: 7² = 49',
      '🧊 Cube = power of 3: 4³ = 64',
      '2️⃣ Powers of 2: 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128',
      '3️⃣ Powers of 3: 3¹=3, 3²=9, 3³=27, 3⁴=81, 3⁵=243',
      '⚠️ Any number to the power 0 = 1 (e.g. 5⁰ = 1)',
    ]
  },

  average: {
    videoId: 'uhxtUt_-GyM',
    title:   'Mean (Average) - Statistics',
    channel: 'Khan Academy',
    bullets: [
      '📊 Mean (average) = total sum ÷ number of items',
      '🎯 Finding a missing value: Total = mean × count. Missing = Total − sum of known values',
      '📈 If mean is known and one value changes: new mean = (old total ± change) ÷ count',
      '📉 Range = maximum value − minimum value',
      '🔢 Mode = most frequently occurring value',
      '🏁 Median = middle value when data is arranged in order',
    ]
  },

  ratio: {
    videoId: 'RQ2nYUBVvqI',
    title:   'Ratios and Rates',
    channel: 'Math Antics',
    bullets: [
      '⚖️ A ratio compares two (or more) quantities: 3:5 means 3 parts to 5 parts',
      '🔑 Simplify ratios just like fractions: divide both sides by HCF',
      '📐 To divide in a ratio: find total parts, calculate one part, multiply for each share',
      '🗺️ Scale: map scale 1:50,000 means 1 cm on map = 50,000 cm in real life',
      '🍰 Proportion: if 3 items cost Rs 90, then 5 items cost (90÷3)×5 = Rs 150',
      '📏 Ratio and fractions: in ratio 3:5, the first part is 3/8 of the total',
    ]
  },

  length: {
    videoId: '9uwLgf84p5w',
    title:   'Introduction to Perimeter',
    channel: 'Khan Academy',
    bullets: [
      '📏 Perimeter = total distance around a shape (add all sides)',
      '🔷 Rectangle: P = 2 × (length + width)',
      '⬜ Square: P = 4 × side',
      '📐 L-shape: the perimeter of an L-shape equals that of the original rectangle it was cut from',
      '📐 Units: 10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km',
      '⚠️ Always convert to the same unit before calculating',
    ]
  },

  area: {
    videoId: 'xCdxURXMdFY',
    title:   'Area - Rectangles and Triangles',
    channel: 'Math Antics',
    bullets: [
      '▭ Rectangle area = length × width',
      '🔺 Triangle area = ½ × base × height (height must be perpendicular to base)',
      '📦 Compound shapes: split into simpler shapes, find each area, then add (or subtract)',
      '🔲 Square area = side²',
      '⚠️ Area is always in square units: cm², m², km²',
      '🧱 Number of tiles = total area ÷ area of one tile',
    ]
  },

  capacity: {
    videoId: 'LhMEqsL_M5o',
    title:   'Metric Units of Volume',
    channel: 'Khan Academy',
    bullets: [
      '🧪 Capacity = how much liquid a container holds',
      '📐 1 litre (L) = 1,000 millilitres (mL)',
      '🔢 1 m³ = 1,000 litres',
      '💧 Volume of a cuboid = length × width × height (in cm³ or m³)',
      '⚗️ To find how many times a small container fills a large one: divide large by small',
      '🔄 Converting: mL ÷ 1000 = L; L × 1000 = mL',
    ]
  },

  mass: {
    videoId: 'TD1zuENbEdk',
    title:   'Metric Units of Weight',
    channel: 'Khan Academy',
    bullets: [
      '⚖️ 1 kg = 1,000 g; 1 tonne = 1,000 kg',
      '🔢 To convert kg → g: multiply by 1,000',
      '🔢 To convert g → kg: divide by 1,000',
      '📝 Mixed units: 3 kg 450 g = 3,450 g = 3.45 kg',
      '🏋️ Average mass: total mass ÷ number of items',
      '⚠️ Always use the same unit when comparing or adding masses',
    ]
  },

  money: {
    videoId: 'aB_aXOWI_FI',
    title:   'Profit and Loss',
    channel: 'Khan Academy',
    bullets: [
      '💰 Profit = Selling Price − Cost Price (when SP > CP)',
      '📉 Loss = Cost Price − Selling Price (when CP > SP)',
      '% Profit = (Profit ÷ Cost Price) × 100',
      '🏷️ Discount = original price × discount%; Sale price = original − discount',
      '🔄 Finding original price: original = sale price ÷ (1 − discount%/100)',
      '📊 Value for money: compare cost per unit (cost ÷ quantity)',
    ]
  },

  time: {
    videoId: 'iK1CUKzKB3c',
    title:   '12-Hour & 24-Hour Clock - Grade 5',
    channel: 'Khan Academy',
    bullets: [
      '🕐 12-hour clock uses am (midnight→noon) and pm (noon→midnight)',
      '🕑 24-hour clock: add 12 to pm hours (3:00 pm = 15:00), midnight = 00:00',
      '⏱️ Elapsed time: count hours first, then minutes (or use number line)',
      '📅 Calendar: months 1,3,5,7,8,10,12 have 31 days; April/June/Sep/Nov have 30; Feb=28 (29 in leap year)',
      '📐 Speed = Distance ÷ Time; Distance = Speed × Time; Time = Distance ÷ Speed',
      '⏰ 60 seconds = 1 minute; 60 minutes = 1 hour; 24 hours = 1 day',
    ]
  },

  graphs: {
    videoId: 'hcgThf5mv38',
    title:   'Data and Graphs',
    channel: 'Math Antics',
    bullets: [
      '📊 Bar chart: the height (or length) of each bar shows frequency or amount',
      '📈 Line graph: shows how a value changes over time - look for trends',
      '🌟 Pictogram: each symbol represents a fixed number - check the key!',
      '📋 Frequency table: organises data into groups with tallies or counts',
      '📐 Mean from a chart: sum all values ÷ total number of data points',
      '🎯 Mode = most common; Median = middle value; Range = max − min',
    ]
  },

  conversions: {
    videoId: 'mI84WDfhuYA',
    title:   'Unit Conversions - Grade 5',
    channel: 'Khan Academy',
    bullets: [
      '📏 Length: 10 mm = 1 cm; 100 cm = 1 m; 1000 m = 1 km',
      '⚖️ Mass: 1000 g = 1 kg; 1000 kg = 1 tonne',
      '🧪 Capacity: 1000 mL = 1 L; 1000 L = 1 kL (kilolitre)',
      '⏰ Time: 60 s = 1 min; 60 min = 1 h; 24 h = 1 day; 7 days = 1 week',
      '💰 Money: 100 cents = Rs 1',
      '📐 Area: 10,000 cm² = 1 m²; 1,000,000 m² = 1 km²',
      '🔄 To convert a larger unit to a smaller: multiply. Smaller to larger: divide.',
    ]
  },

};

// Attach to the pack rather than relying on a CHAPTER_HELP global, so video
// help is per subject. This file loads after _manifest.js, hence extendSubject
// instead of passing `help:` into registerSubject().
extendSubject('grade5-maths', { help: CHAPTER_HELP });
