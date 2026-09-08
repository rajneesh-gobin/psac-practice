'use strict';
// Grade 5 Science - diagram-based questions, exam style.
// IDs format: g5sc-dia-NNN
//
// WHY THIS FILE EXISTS
// Measured against the MES Grade 5 Science papers: Questions 2-6 carry 45 of the
// paper's 50 marks and are built almost entirely on diagrams - "Diagram 6 shows
// a simple electric circuit… name the two components labelled A and B", "Diagram
// 5 shows a glass of water containing ice cubes… by which process are the
// droplets formed", "Diagram 8: Seed A and Seed B… which seed is likely to
// germinate". Only Question 1, worth 5 marks, is a plain multiple-choice block.
// Before this file the pack had 424 questions of which 32 carried any image at
// all, and 24 of those were remote photographs rather than drawn diagrams.
//
// ⚠ INLINE SVG, NOT <img>. A remote image can 404, fails offline, and its
//   contents are not known to this repo. Every drawing below is inline, carries
//   its own light background so it reads on either theme, and gives every shape
//   an explicit fill.
//
// ⚠ THE DIAGRAM MUST NOT LABEL ITS OWN ANSWER. Components are marked A, B and X
//   only. Writing "CELL" beside the cell would turn "name component A" into a
//   copying exercise - the same rule as alt text never revealing the answer.
//
// ⚠ Subsections used here (`diagrams` on electricity, water-matter and plants)
//   are already declared in _manifest.js. A tagged-but-undeclared subsection
//   hides its own questions from the Practise screen.

// ── shared drawings ────────────────────────────────────────────────────────
const _SVG = (w, h, body, bg) =>
  `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" ` +
  `style="display:block;margin:8px auto;max-width:100%;background:${bg || '#f8fafc'};` +
  `border:1px solid #cbd5e1;border-radius:8px">${body}</svg>`;

// A simple series circuit: cell (A), bulb (B), switch, connecting wires.
const _CIRCUIT = (closed) => _SVG(300, 150, `
  <rect x="40" y="30" width="220" height="90" fill="none" stroke="#334155" stroke-width="2.5"/>
  <rect x="120" y="18" width="46" height="24" fill="#f8fafc" stroke="#f8fafc"/>
  <line x1="132" y1="30" x2="132" y2="14" stroke="#334155" stroke-width="4"/>
  <line x1="144" y1="30" x2="144" y2="22" stroke="#334155" stroke-width="2"/>
  <line x1="156" y1="30" x2="156" y2="14" stroke="#334155" stroke-width="4"/>
  <line x1="168" y1="30" x2="168" y2="22" stroke="#334155" stroke-width="2"/>
  <text x="150" y="12" text-anchor="middle" font-size="13" font-weight="bold" fill="#b91c1c">A</text>
  <circle cx="150" cy="120" r="16" fill="${closed ? '#fde68a' : '#e2e8f0'}" stroke="#334155" stroke-width="2.5"/>
  <line x1="139" y1="109" x2="161" y2="131" stroke="#334155" stroke-width="2"/>
  <line x1="161" y1="109" x2="139" y2="131" stroke="#334155" stroke-width="2"/>
  <text x="150" y="146" text-anchor="middle" font-size="13" font-weight="bold" fill="#b91c1c">B</text>
  <rect x="228" y="60" width="34" height="30" fill="#f8fafc" stroke="#f8fafc"/>
  <circle cx="260" cy="62" r="3" fill="#334155"/>
  <circle cx="260" cy="88" r="3" fill="#334155"/>
  <line x1="260" y1="88" x2="${closed ? 260 : 244}" y2="${closed ? 62 : 48}" stroke="#334155" stroke-width="2.5"/>
`);

// A glass holding water and ice cubes, with droplets on the outside.
const _GLASS = _SVG(220, 170, `
  <path d="M60 30 L160 30 L150 150 L70 150 Z" fill="#e0f2fe" stroke="#334155" stroke-width="2.5"/>
  <path d="M64 62 L156 62 L150 150 L70 150 Z" fill="#bae6fd" stroke="none"/>
  <line x1="64" y1="62" x2="156" y2="62" stroke="#0ea5e9" stroke-width="2"/>
  <rect x="80" y="44" width="24" height="22" rx="3" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <rect x="112" y="40" width="24" height="22" rx="3" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <rect x="96" y="66" width="24" height="22" rx="3" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <circle cx="55" cy="86" r="4" fill="#7dd3fc" stroke="#0284c7" stroke-width="1"/>
  <circle cx="52" cy="104" r="3.5" fill="#7dd3fc" stroke="#0284c7" stroke-width="1"/>
  <circle cx="57" cy="122" r="4" fill="#7dd3fc" stroke="#0284c7" stroke-width="1"/>
  <circle cx="164" cy="92" r="4" fill="#7dd3fc" stroke="#0284c7" stroke-width="1"/>
  <circle cx="167" cy="112" r="3.5" fill="#7dd3fc" stroke="#0284c7" stroke-width="1"/>
  <text x="30" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#b91c1c">X</text>
  <line x1="38" y1="88" x2="49" y2="87" stroke="#b91c1c" stroke-width="1.5"/>
`);

// Cross-section of an electric wire: metal core, outer covering marked X.
const _WIRE = _SVG(240, 110, `
  <rect x="30" y="30" width="180" height="50" rx="25" fill="#fed7aa" stroke="#334155" stroke-width="2.5"/>
  <rect x="30" y="46" width="180" height="18" rx="9" fill="#f59e0b" stroke="#334155" stroke-width="2"/>
  <text x="120" y="59" text-anchor="middle" font-size="10" font-weight="bold" fill="#7c2d12">metal core</text>
  <line x1="120" y1="30" x2="120" y2="14" stroke="#b91c1c" stroke-width="1.5"/>
  <text x="120" y="11" text-anchor="middle" font-size="13" font-weight="bold" fill="#b91c1c">X</text>
`);

// Two seeds on cotton wool: A damp, B dry.
const _SEEDS = _SVG(300, 130, `
  <path d="M30 100 L50 45 L110 45 L130 100 Z" fill="#f1f5f9" stroke="#334155" stroke-width="2"/>
  <ellipse cx="80" cy="96" rx="42" ry="11" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5"/>
  <ellipse cx="80" cy="92" rx="9" ry="7" fill="#a16207" stroke="#713f12" stroke-width="1.5"/>
  <text x="80" y="122" text-anchor="middle" font-size="12" font-weight="bold" fill="#334155">Seed A</text>
  <text x="80" y="38" text-anchor="middle" font-size="9" fill="#1e40af">damp cotton wool</text>
  <path d="M180 100 L200 45 L260 45 L280 100 Z" fill="#f1f5f9" stroke="#334155" stroke-width="2"/>
  <ellipse cx="230" cy="96" rx="42" ry="11" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <ellipse cx="230" cy="92" rx="9" ry="7" fill="#a16207" stroke="#713f12" stroke-width="1.5"/>
  <text x="230" y="122" text-anchor="middle" font-size="12" font-weight="bold" fill="#334155">Seed B</text>
  <text x="230" y="38" text-anchor="middle" font-size="9" fill="#92400e">dry cotton wool</text>
`);

// A thermometer reading between marked divisions.
const _THERMO = _SVG(150, 210, `
  <rect x="62" y="18" width="26" height="150" rx="13" fill="#ffffff" stroke="#334155" stroke-width="2"/>
  <circle cx="75" cy="176" r="17" fill="#ef4444" stroke="#334155" stroke-width="2"/>
  <rect x="69" y="112" width="12" height="62" fill="#ef4444"/>
  ${[0, 1, 2, 3, 4, 5].map(i => {
    const y = 158 - i * 26, v = i * 20;
    return `<line x1="88" y1="${y}" x2="102" y2="${y}" stroke="#334155" stroke-width="1.5"/>` +
           `<text x="107" y="${y + 4}" font-size="11" fill="#334155">${v}</text>`;
  }).join('')}
  <text x="128" y="26" font-size="11" font-weight="bold" fill="#334155">°C</text>
`);

STATIC_QUESTIONS.push(

  // ══ electricity · diagrams ═══════════════════════════════════════════════
  makeMCQ({ id:'g5sc-dia-001', chapterId:'electricity', subsection:'diagrams', difficulty:2,
    question: _CIRCUIT(true) + '<p>The diagram shows a simple electric circuit. What is the component labelled <b>A</b>?</p>',
    options:['A cell', 'A switch', 'A bulb', 'A resistor'],
    answer:'A cell',
    hint:'It is drawn as two pairs of lines, one long and one short in each pair.',
    explanation:'<b>A</b> is a <b>cell</b>, drawn as a long line and a short line side by side. It supplies the electrical energy that pushes the current around the circuit. The bulb is the circle with the cross, and the switch is the small gap on the right.' }),

  makeMCQ({ id:'g5sc-dia-002', chapterId:'electricity', subsection:'diagrams', difficulty:2,
    question: _CIRCUIT(true) + '<p>What is the source of energy in the circuit shown?</p>',
    options:['The cell', 'The bulb', 'The switch', 'The connecting wires'],
    answer:'The cell',
    hint:'Which part gives out energy, and which parts only use or carry it?',
    explanation:'The <b>cell</b> is the source of energy. The bulb changes electrical energy into light and heat, the wires carry the current, and the switch only opens or closes the path.' }),

  makeMCQ({ id:'g5sc-dia-003', chapterId:'electricity', subsection:'diagrams', difficulty:3,
    question: _CIRCUIT(false) + '<p>In this circuit the bulb does <b>not</b> light. Why not?</p>',
    options:['The switch is open, so the circuit is not complete',
             'The cell has been connected the wrong way round',
             'The wires are made of the wrong material',
             'The bulb needs a second cell before it can light'],
    answer:'The switch is open, so the circuit is not complete',
    hint:'Follow the wire all the way round with your finger. Can you get back to where you started?',
    explanation:'The switch on the right is drawn <b>open</b>, leaving a gap. Current can only flow round a <b>complete</b> circuit, so the bulb stays off. Closing the switch would light it.' }),

  makeMCQ({ id:'g5sc-dia-004', chapterId:'electricity', subsection:'diagrams', difficulty:3,
    question: _CIRCUIT(true) + '<p>Which energy change happens at the component labelled <b>B</b>?</p>',
    options:['Electrical energy to light and heat energy',
             'Light energy to electrical energy',
             'Chemical energy to electrical energy',
             'Heat energy to movement energy'],
    answer:'Electrical energy to light and heat energy',
    hint:'What does B give out, and what did it receive?',
    explanation:'<b>B</b> is the bulb. It receives electrical energy and gives out <b>light and heat</b>. The change from chemical to electrical energy happens inside the cell, not the bulb.' }),

  makeMCQ({ id:'g5sc-dia-005', chapterId:'electricity', subsection:'diagrams', difficulty:3,
    question: _WIRE + '<p>The diagram shows an electric wire. Which material is the outer part <b>X</b> made of?</p>',
    options:['Plastic', 'Copper', 'Steel', 'Aluminium'],
    answer:'Plastic',
    hint:'The outer part is touched by hands. What must it not do?',
    explanation:'<b>X</b> is the outer covering and is made of <b>plastic</b>, an insulator, so that current cannot reach the person holding the wire. The core inside is metal because metals conduct.' }),

  makeMCQ({ id:'g5sc-dia-006', chapterId:'electricity', subsection:'diagrams', difficulty:4,
    question: _WIRE + '<p>Why is the core of the wire made of metal and the covering <b>X</b> made of a different material?</p>',
    options:['The metal lets current flow and the covering stops it escaping',
             'The metal is cheaper than the covering material',
             'The metal keeps the wire cool while it is being used',
             'The covering makes the wire easier to bend into shape'],
    answer:'The metal lets current flow and the covering stops it escaping',
    hint:'One material is chosen for what it does, the other for what it prevents.',
    explanation:'The two materials do opposite jobs. The metal core is a <b>conductor</b>, so current flows along it; the covering is an <b>insulator</b>, so current cannot pass out to whoever holds the wire.' }),

  // ══ water-matter · diagrams ══════════════════════════════════════════════
  makeMCQ({ id:'g5sc-dia-007', chapterId:'water-matter', subsection:'diagrams', difficulty:3,
    question: _GLASS + '<p>Droplets of water form on the outside of the glass at <b>X</b>. By which process are they formed?</p>',
    options:['Condensation', 'Evaporation', 'Melting', 'Freezing'],
    answer:'Condensation',
    hint:'The droplets are on the outside, where the air touches the cold glass.',
    explanation:'Water vapour in the air touches the cold surface of the glass, cools, and turns back into liquid. That change from gas to liquid is <b>condensation</b>. Evaporation is the opposite change.' }),

  makeMCQ({ id:'g5sc-dia-008', chapterId:'water-matter', subsection:'diagrams', difficulty:4,
    question: _GLASS + '<p>A pupil says the droplets at <b>X</b> have leaked out through the glass. Why is she wrong?</p>',
    options:['Glass has no holes, so the water must come from the air',
             'The glass is too cold for any water to pass through it',
             'The droplets are made of ice, not of water',
             'The water inside the glass has not melted yet'],
    answer:'Glass has no holes, so the water must come from the air',
    hint:'If water really leaked through, what would happen to the level inside?',
    explanation:'Glass is solid and has no holes, and the level inside does not drop. The droplets come from <b>water vapour already in the air</b>, which condenses on the cold surface.' }),

  makeMCQ({ id:'g5sc-dia-009', chapterId:'water-matter', subsection:'diagrams', difficulty:3,
    question: _GLASS + '<p>The ice cubes slowly disappear and the water level rises. Which change of state has taken place?</p>',
    options:['Solid to liquid', 'Liquid to gas', 'Gas to liquid', 'Liquid to solid'],
    answer:'Solid to liquid',
    hint:'What were the ice cubes, and what have they become?',
    explanation:'Ice is water in the <b>solid</b> state. As it takes in heat it melts into <b>liquid</b> water, which is why the level rises. Gas to liquid is the condensation happening on the outside.' }),

  makeMCQ({ id:'g5sc-dia-010', chapterId:'water-matter', subsection:'diagrams', difficulty:3,
    question: _THERMO + '<p>What temperature is the thermometer showing?</p>',
    options:['about 35 °C', 'about 20 °C', 'about 50 °C', 'about 65 °C'],
    answer:'about 35 °C',
    hint:'Work out what one division is worth before you read the top of the liquid.',
    explanation:'The marked divisions are 20 °C apart. The liquid stops a little below halfway between 20 and 40, so the reading is <b>about 35 °C</b>. Always check the size of one division before reading a scale.' }),

  // ══ plants · diagrams ════════════════════════════════════════════════════
  makeMCQ({ id:'g5sc-dia-011', chapterId:'plants', subsection:'diagrams', difficulty:3,
    question: _SEEDS + '<p>Two identical seeds are left at room temperature. Which seed is likely to germinate?</p>',
    options:['Seed A only', 'Seed B only', 'Both seeds', 'Neither seed'],
    answer:'Seed A only',
    hint:'Compare the cotton wool under each seed.',
    explanation:'<b>Seed A</b> is on damp cotton wool and B on dry. A seed needs <b>water</b>, warmth and air to germinate, so only A has everything it needs. Both are at the same temperature, so water is the only difference.' }),

  makeMCQ({ id:'g5sc-dia-012', chapterId:'plants', subsection:'diagrams', difficulty:4,
    question: _SEEDS + '<p>Why is it important that both seeds are kept at the same temperature?</p>',
    options:['So that water is the only difference being tested',
             'So that both seeds germinate at exactly the same time',
             'Because seeds cannot germinate in a cold room',
             'Because warmth is more important than water to a seed'],
    answer:'So that water is the only difference being tested',
    hint:'What would you be unable to say if one seed were also kept warmer?',
    explanation:'A fair test changes <b>one thing at a time</b>. Keeping the temperature the same means any difference must be caused by the water. If B were also colder, you could not tell which factor had stopped it.' })

);
