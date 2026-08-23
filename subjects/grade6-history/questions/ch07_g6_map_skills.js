'use strict';
// Grade 6 History & Geography — Chapter: Map Skills (contour lines, scale, grid references)
// IDs format: g6hg-ms-NNN  (Grade 6, extends Grade 5 lat/lon work)

// Contour map showing a hill
const _SVG_CONTOUR = `<svg viewBox="0 0 220 185" width="220" height="185" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <ellipse cx="110" cy="88" rx="100" ry="80" fill="none" stroke="#22c55e" stroke-width="1.8"/>
  <text x="12" y="92" font-size="7" fill="#15803d">100m</text>
  <ellipse cx="110" cy="88" rx="80" ry="63" fill="none" stroke="#16a34a" stroke-width="1.8"/>
  <text x="30" y="92" font-size="7" fill="#15803d">200m</text>
  <ellipse cx="110" cy="88" rx="60" ry="46" fill="none" stroke="#15803d" stroke-width="1.8"/>
  <text x="50" y="92" font-size="7" fill="#15803d">300m</text>
  <ellipse cx="110" cy="88" rx="40" ry="30" fill="none" stroke="#166534" stroke-width="1.8"/>
  <text x="70" y="92" font-size="7" fill="#166534">400m</text>
  <ellipse cx="110" cy="88" rx="20" ry="15" fill="#14532d" opacity="0.35" stroke="#14532d" stroke-width="1.8"/>
  <text x="110" y="91" text-anchor="middle" font-size="7" fill="#052e16" font-weight="bold">500m</text>
  <line x1="110" y1="8" x2="110" y2="165" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="3,3"/>
  <text x="110" y="6" text-anchor="middle" font-size="5.5" fill="#94a3b8">N</text>
  <text x="40" y="152" font-size="6.5" fill="#475569">Lines far apart =</text>
  <text x="40" y="161" font-size="6.5" fill="#475569">gentle slope</text>
  <text x="140" y="152" font-size="6.5" fill="#475569">Lines close =</text>
  <text x="140" y="161" font-size="6.5" fill="#475569">steep slope</text>
  <text x="110" y="178" text-anchor="middle" font-size="6" fill="#64748b">Contour map of a hill (each line = 100m height)</text>
</svg>`;

// Simple 4×4 grid for grid reference practice
const _SVG_GRID_REF = `<svg viewBox="0 0 180 180" width="180" height="180" style="display:block;margin:6px auto;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <line x1="30" y1="20" x2="30" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="75" y1="20" x2="75" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="120" y1="20" x2="120" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="165" y1="20" x2="165" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="15" y1="30" x2="170" y2="30" stroke="#94a3b8" stroke-width="1"/>
  <line x1="15" y1="75" x2="170" y2="75" stroke="#94a3b8" stroke-width="1"/>
  <line x1="15" y1="120" x2="170" y2="120" stroke="#94a3b8" stroke-width="1"/>
  <line x1="15" y1="160" x2="170" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="170" font-size="8" fill="#475569" text-anchor="middle">1</text>
  <text x="75" y="170" font-size="8" fill="#475569" text-anchor="middle">2</text>
  <text x="120" y="170" font-size="8" fill="#475569" text-anchor="middle">3</text>
  <text x="165" y="170" font-size="8" fill="#475569" text-anchor="middle">4</text>
  <text x="10" y="30" font-size="8" fill="#475569" text-anchor="middle">D</text>
  <text x="10" y="75" font-size="8" fill="#475569" text-anchor="middle">C</text>
  <text x="10" y="120" font-size="8" fill="#475569" text-anchor="middle">B</text>
  <text x="10" y="160" font-size="8" fill="#475569" text-anchor="middle">A</text>
  <text x="52" y="52" font-size="14" fill="#dc2626" text-anchor="middle">&#9733;</text>
  <text x="52" y="62" font-size="6.5" fill="#dc2626" text-anchor="middle">School</text>
  <circle cx="120" cy="95" r="6" fill="#2563eb"/>
  <text x="128" y="99" font-size="6.5" fill="#2563eb">Lake</text>
  <text x="90" y="178" font-size="6.5" fill="#64748b" text-anchor="middle">Grid reference: column letter first, then row (e.g. 1D, 3B)</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-ms-001', chapterId:'g6-map-skills', difficulty:1,
    question:`${_SVG_CONTOUR}What are CONTOUR LINES on a map?`,
    options:[
      'Lines that show the direction of rivers',
      'Lines connecting all points of equal altitude (height above sea level)',
      'Lines showing the boundaries between countries',
      'Lines connecting places with the same temperature'
    ],
    answer:'Lines connecting all points of equal altitude (height above sea level)',
    hint:'Each line in the diagram is labelled with a height in metres.',
    explanation:'<b>Contour lines</b> are lines on a map that connect all points at the same <b>altitude (height)</b> above sea level. By reading the contour lines, you can work out the shape and steepness of the land.' }),

  makeMCQ({ id:'g6hg-ms-002', chapterId:'g6-map-skills', difficulty:2,
    question:`${_SVG_CONTOUR}On the contour map above, what does it mean when contour lines are CLOSE TOGETHER?`,
    options:[
      'The land is very flat in that area',
      'The height difference is very small',
      'The slope is steep — the land rises sharply',
      'The area is below sea level'
    ],
    answer:'The slope is steep — the land rises sharply',
    hint:'If you have to gain a lot of height in a short horizontal distance, the slope is steep.',
    explanation:'<b>Closely spaced contour lines</b> show a <b>steep slope</b> — the land rises quickly over a short distance. <b>Widely spaced lines</b> show a gentle, gradual slope. This is shown in the note at the bottom of the diagram.' }),

  makeMCQ({ id:'g6hg-ms-003', chapterId:'g6-map-skills', difficulty:2,
    question:`${_SVG_CONTOUR}Using the contour map, what is the approximate height of the hill at its summit?`,
    options:['100 m','300 m','500 m','1000 m'],
    answer:'500 m',
    hint:'Look at the innermost (smallest) contour line — it is labelled.',
    explanation:'The summit (top) of the hill is shown by the innermost contour. The diagram labels it <b>500 m</b>. The contour lines at 100 m, 200 m, 300 m, 400 m and 500 m show the hill rising in stages.' }),

  makeMCQ({ id:'g6hg-ms-004', chapterId:'g6-map-skills', difficulty:2,
    question:`${_SVG_GRID_REF}Using the grid reference system in the diagram, what is the grid reference of the SCHOOL (star symbol)?`,
    options:['1C','2D','1D','2C'],
    answer:'1D',
    hint:'Read the column number FIRST (along the bottom), then the row letter (up the side). The star is in column 1, row D.',
    explanation:'Grid references are read by going <b>along the bottom first</b> (easting/column) <b>then up</b> (northing/row). The star (school) is in column <b>1</b>, row <b>D</b> — so the grid reference is <b>1D</b>.' }),

  makeMCQ({ id:'g6hg-ms-005', chapterId:'g6-map-skills', difficulty:2,
    question:`${_SVG_GRID_REF}What is the grid reference of the LAKE (blue circle)?`,
    options:['3A','3B','2C','3C'],
    answer:'3B',
    hint:'Count along the bottom to find the column, then up to find the row.',
    explanation:'The lake (blue circle) is in column <b>3</b> and row <b>B</b> — so its grid reference is <b>3B</b>. Always read the column (left-right/easting) BEFORE the row (up-down/northing).' }),

  makeMCQ({ id:'g6hg-ms-006', chapterId:'g6-map-skills', difficulty:2,
    question:'A map has a scale of 1:50,000. What does this mean?',
    options:[
      '1 cm on the map = 50,000 km in reality',
      '1 cm on the map = 500 m (0.5 km) in reality',
      '1 cm on the map = 50 cm in reality',
      '50,000 maps fit into 1 square km'
    ],
    answer:'1 cm on the map = 500 m (0.5 km) in reality',
    hint:'1:50,000 means 1 unit on the map = 50,000 of the same units in reality. Convert: 50,000 cm = 500 m.',
    explanation:'A scale of <b>1:50,000</b> means 1 cm on the map represents 50,000 cm (= 500 m = 0.5 km) in real life. To find a real distance: measure map distance in cm, then multiply by 500 m.' }),

  makeMCQ({ id:'g6hg-ms-007', chapterId:'g6-map-skills', difficulty:2,
    question:'On a map with scale 1:50,000, two towns are 6 cm apart. What is the real distance between them?',
    options:['6 km','3 km','30 km','300 m'],
    answer:'3 km',
    hint:'6 cm × 500 m per cm = ? m, then convert to km.',
    explanation:'Scale 1:50,000 → 1 cm = 500 m. Real distance = 6 × 500 m = 3,000 m = <b>3 km</b>.' }),

  makeMCQ({ id:'g6hg-ms-008', chapterId:'g6-map-skills', difficulty:1,
    question:'What is a map LEGEND (key)?',
    options:[
      'The title of the map',
      'A box explaining what each symbol and colour on the map means',
      'The grid reference system',
      'The name of the person who drew the map'
    ],
    answer:'A box explaining what each symbol and colour on the map means',
    hint:'Without this, you cannot understand what the symbols on the map represent.',
    explanation:'A map <b>legend (key)</b> is a box that explains the meaning of all symbols, colours and patterns used on the map. For example: blue = water, green = forest, dotted line = path, triangle = peak. It is essential for correctly reading a map.' }),

  makeTF({ id:'g6hg-ms-009', chapterId:'g6-map-skills', difficulty:1,
    question:'Contour lines on a map that are very far apart indicate very steep slopes.',
    answer:false,
    hint:'Think about the relationship between line spacing and steepness.',
    explanation:'Widely spaced contour lines indicate <b>gentle slopes</b>. Steeply sloped areas have <b>closely spaced</b> contour lines because the altitude changes rapidly over a short horizontal distance.' }),

  makeMCQ({ id:'g6hg-ms-010', chapterId:'g6-map-skills', difficulty:2,
    question:'A hill on a contour map shows all lines forming closed loops around a centre. What does the INNERMOST (smallest) loop represent?',
    options:['The lowest point of the hill (valley)','The steepest side of the hill','The highest point (summit) of the hill','The base of the hill at sea level'],
    answer:'The highest point (summit) of the hill',
    hint:'As you move inward on the loops, you are going uphill.',
    explanation:'On a contour map of a hill, the lines form concentric loops. The <b>innermost (smallest) loop</b> represents the <b>highest point — the summit</b>. Each outward loop shows a lower contour level going down towards the base of the hill.' })

);
