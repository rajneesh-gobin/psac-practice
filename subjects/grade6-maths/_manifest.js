'use strict';
// Grade 6 Mathematics — MIE Mauritius Syllabus (Grades 1-6, 2015)
// Grade 6 adds: Prime/Composite, Fraction×Fraction, HCF/LCM, Percentage, 3D Surface Area, Speed, Pie Chart, Coordinates
registerSubject({
  id: 'grade6-maths', name: 'Mathematics', grade: 6, icon: '🔢', subject: 'Maths',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false,
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
      syllabus: '2D shapes up to hexagon: names, properties, perimeter, area. 3D shapes: cube, cuboid, cylinder, prism, pyramid — faces/vertices/edges. Find unknown angles (on a line, in triangles, quadrilaterals). Symmetry: 1–2 lines. Scalene triangles. Types of angles: acute, obtuse, reflex, straight.' },
    { id: 'g6-measure',      name: 'Measurement & Conversions',        icon: '📏', examWeight: 3,
      syllabus: 'Length: km, m, cm, mm — convert and calculate. Mass: kg, g, tonnes — convert and calculate. Capacity: L, cL, mL — convert and calculate. Money: convert Mauritian rupees to euro, dollar, pound sterling. Percentage profit and loss in context.' },
    { id: 'g6-area-vol',     name: 'Area, Surface Area & Volume',      icon: '▭',  examWeight: 3,
      syllabus: 'Area and perimeter of 2D shapes (including hexagon, triangle). Total surface area of cube and cuboid. Volume of cube and cuboid. Word problems involving area, surface area and volume.' },
    { id: 'g6-time-speed',   name: 'Time & Speed',                     icon: '⏰', examWeight: 3,
      syllabus: 'Time: a.m. and p.m. notation. 12-hour and 24-hour clock. Add/subtract time (seconds, minutes, hours, days, years). GMT: international time zones. Speed: distance ÷ time. Calculate speed, distance or time. Word problems involving speed.' },
    { id: 'g6-graphs',       name: 'Graphs, Data & Coordinates',       icon: '📈', examWeight: 3,
      syllabus: 'Read/interpret pictograms, bar charts, pie charts (read angles), line graphs. Draw bar charts. Coordinates in the x-y plane (positive values). Solve word problems using graphs. Find mean/range from data.' },
  ],
});
