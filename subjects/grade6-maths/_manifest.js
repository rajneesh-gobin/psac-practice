'use strict';

// Sub-topics for the Syllabus screen. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G6M_SYLLABUS = {
  'g6-numeration': { subsections: [
    { id:'powers',          name:'Powers & Indices' },  // 6
    { id:'primes',          name:'Prime & Composite Numbers' },  // 4
    { id:'rounding',        name:'Rounding' },  // 3
    { id:'expanded',        name:'Expanded Notation' },  // 8
    { id:'sequences',       name:'Sequences & Patterns' },  // 8
    { id:'words_digits',    name:'Numbers in Words & Figures' },  // 3
    { id:'place_value',     name:'Place Value' },  // 7
    { id:'compare_order',   name:'Comparing & Ordering' },  // 5
    { id:'word_probs',      name:'Word Problems' },  // 1
  ]},
  'g6-four-ops': { subsections: [
    { id:'mixed_ops',       name:'BODMAS & Mixed Operations' },  // 4
    { id:'word_probs',      name:'Word Problems' },  // 9
    { id:'division',        name:'Division' },  // 11
    { id:'multiplication',  name:'Multiplication' },  // 9
    { id:'add_sub',         name:'Addition & Subtraction' },  // 16
  ]},
  'g6-fractions': { subsections: [
    { id:'proper_improper', name:'Improper Fractions & Mixed Numbers' },  // 8
    { id:'equivalent',      name:'Equivalent Fractions' },  // 9
    { id:'comparing',       name:'Comparing Fractions' },  // 2
    { id:'multiply_divide', name:'Multiplying & Dividing Fractions' },  // 5
    { id:'word_probs',      name:'Word Problems' },  // 1
    { id:'fraction_of',     name:'Fraction of a Quantity' },  // 4
    { id:'add_sub',         name:'Addition & Subtraction' },  // 14
  ]},
  'g6-decimals': { subsections: [
    { id:'conversion',      name:'Unit Conversions' },  // 3
    { id:'ordering',        name:'Ordering' },  // 3
    { id:'place_value',     name:'Place Value' },  // 5
    { id:'word_probs',      name:'Word Problems' },  // 6
    { id:'operations',      name:'Calculations' },  // 14
  ]},
  'g6-factors-hcf': { subsections: [
    { id:'prime_factors',   name:'Prime Factorisation' },  // 2
    { id:'hcf',             name:'Highest Common Factor (HCF)' },  // 9
    { id:'lcm',             name:'Lowest Common Multiple (LCM)' },  // 7
    { id:'factors',         name:'Factors & Multiples' },  // 3
    { id:'primes',          name:'Prime & Composite Numbers' },  // 5
    { id:'word_probs',      name:'Word Problems' },  // 5
  ]},
  'g6-ratio-pct': { subsections: [
    { id:'average',         name:'Averages' },  // 4
    { id:'profit_loss',     name:'Profit & Loss' },  // 8
    { id:'discount',        name:'Discount' },  // 3
    { id:'increase',        name:'Increase & Decrease' },  // 4
    { id:'conversion',      name:'Unit Conversions' },  // 6
    { id:'ratio_divide',    name:'Dividing in a Ratio' },  // 4
    { id:'ratio_simplify',  name:'Simplifying Ratios' },  // 3
    { id:'percentage_of',   name:'Percentage of a Quantity' },  // 11
    { id:'word_probs',      name:'Word Problems' },  // 2
  ]},
  'g6-geometry': { subsections: [
    { id:'symmetry',        name:'Symmetry' },  // 3
    { id:'perimeter',       name:'Perimeter' },  // 3
    { id:'3d_shapes',       name:'3-D Shapes' },  // 3
    { id:'2d_shapes',       name:'2-D Shapes' },  // 15
    { id:'angles',          name:'Angles' },  // 18
  ]},
  'g6-measure': { subsections: [
    { id:'perimeter',       name:'Perimeter' },  // 3
    { id:'conversion',      name:'Unit Conversions' },  // 18
    { id:'capacity',        name:'Capacity' },  // 4
    { id:'mass',            name:'Mass' },  // 7
    { id:'length',          name:'Length' },  // 1
    { id:'word_probs',      name:'Word Problems' },  // 1
  ]},
  'g6-area-vol': { subsections: [
    { id:'surface_area',    name:'Surface Area' },  // 5
    { id:'volume',          name:'Volume' },  // 10
    { id:'area_triangle',   name:'Area of Triangles' },  // 5
    { id:'compound',        name:'Compound Shapes' },  // 3
    { id:'word_probs',      name:'Word Problems' },  // 2
    { id:'area_rect',       name:'Area of Rectangles' },  // 8
  ]},
  'g6-time-speed': { subsections: [
    { id:'timezones',       name:'Time Zones' },  // 3
    { id:'speed',           name:'Speed' },  // 22
    { id:'clock_formats',   name:'12-hour & 24-hour Clock' },  // 3
    { id:'conversion',      name:'Unit Conversions' },  // 3
    { id:'duration',        name:'Duration & Elapsed Time' },  // 12
  ]},
  'g6-graphs': { subsections: [
    { id:'averages',        name:'Mean, Median, Mode & Range' },  // 9
    { id:'pie_chart',       name:'Pie Charts' },  // 8
    { id:'line_graph',      name:'Line Graphs' },  // 4
    { id:'pictogram',       name:'Pictograms' },  // 2
    { id:'bar_chart',       name:'Bar Charts' },  // 13
  ]},
};

// Grade 6 Mathematics - MIE Mauritius Syllabus (Grades 1-6, 2015)
// Grade 6 adds: Prime/Composite, Fraction×Fraction, HCF/LCM, Percentage, 3D Surface Area, Speed, Pie Chart, Coordinates
registerSubject({
  id: 'grade6-maths', name: 'Mathematics', grade: 6, icon: '🔢', subject: 'Maths',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G6M_SYLLABUS,
  chapters: [
    { id: 'g6-numeration',   name: 'Numbers & Numeration',             icon: '🔢', examWeight: 3,
      syllabus: 'Read/write numbers to 1,000,000. Place value up to one million. Expanded notation. Ordering and comparing numbers. Prime and composite numbers. Number patterns with whole numbers, fractions and decimals.' },
    { id: 'g6-four-ops',     name: 'Four Operations',                  icon: '➕', examWeight: 5,
      syllabus: 'Addition/subtraction up to 6-digit numbers. Multiplication: 5-digit×1-digit, 4-digit×2-digit (product ≤1,000,000). Division: 6-digit÷1-digit and 6-digit÷2-digit, by 10/100/1000/10000. Multi-step word problems. Mental calculations.' },
    { id: 'g6-fractions',    name: 'Fractions',                        icon: '½',  examWeight: 4,
      syllabus: 'Add/subtract fractions and mixed numbers. Multiply a fraction by a fraction. Divide a fraction by a fraction. Convert between fractions, decimals and percentages. Word problems involving fractions.' },
    { id: 'g6-decimals',     name: 'Decimals',                         icon: '•',  examWeight: 3,
      syllabus: 'Add/subtract decimals in context. Multiply decimals by 1-digit and 2-digit numbers (up to 3 decimal places). Convert fractions↔decimals. Word problems involving decimals.' },
    { id: 'g6-factors-hcf',  name: 'Factors, Multiples, HCF & LCM',   icon: '🔣', examWeight: 3,
      syllabus: 'Find all factors of a number. Find multiples of a number. Highest Common Factor (HCF) of two numbers. Lowest Common Multiple (LCM) of two numbers. Use HCF/LCM in word problems.' },
    { id: 'g6-ratio-pct',    name: 'Ratio, Average & Percentage',      icon: '%',  examWeight: 4,
      syllabus: 'Ratio in simplest form. Ratio as a fraction. Equivalent ratios. Finding average. Percentage: convert fractions/decimals to percentage. Percentage of a quantity. Percentage profit and loss. Word problems on ratio, average and percentage.' },
    { id: 'g6-geometry',     name: 'Geometry: Shapes & Angles',        icon: '📐', examWeight: 4,
      syllabus: '2D shapes up to hexagon: names, properties, perimeter, area. 3D shapes: cube, cuboid, cylinder, prism, pyramid - faces/vertices/edges. Find unknown angles (on a line, in triangles, quadrilaterals). Symmetry: 1–2 lines. Scalene triangles. Types of angles: acute, obtuse, reflex, straight.' },
    { id: 'g6-measure',      name: 'Measurement & Conversions',        icon: '📏', examWeight: 3,
      syllabus: 'Length: km, m, cm, mm - convert and calculate. Mass: kg, g, tonnes - convert and calculate. Capacity: L, cL, mL - convert and calculate. Money: convert Mauritian rupees to euro, dollar, pound sterling. Percentage profit and loss in context.' },
    { id: 'g6-area-vol',     name: 'Area, Surface Area & Volume',      icon: '▭',  examWeight: 3,
      syllabus: 'Area and perimeter of 2D shapes (including hexagon, triangle). Total surface area of cube and cuboid. Volume of cube and cuboid. Word problems involving area, surface area and volume.' },
    { id: 'g6-time-speed',   name: 'Time & Speed',                     icon: '⏰', examWeight: 3,
      syllabus: 'Time: a.m. and p.m. notation. 12-hour and 24-hour clock. Add/subtract time (seconds, minutes, hours, days, years). GMT: international time zones. Speed: distance ÷ time. Calculate speed, distance or time. Word problems involving speed.' },
    { id: 'g6-graphs',       name: 'Graphs, Data & Coordinates',       icon: '📈', examWeight: 3,
      syllabus: 'Read/interpret pictograms, bar charts, pie charts (read angles), line graphs. Draw bar charts. Coordinates in the x-y plane (positive values). Solve word problems using graphs. Find mean/range from data.' },
  ],
});
