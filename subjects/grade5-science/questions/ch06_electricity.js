'use strict';
// Grade 5 Science — Chapter: Simple Electric Circuit
// IDs format: g5sci-el-NNN
// Circuit diagrams are embedded as inline SVG in the question field.

// ── SVG circuit templates ──────────────────────────────────────────────────
// Layout: rectangle of wires 240×120; battery on left, bulb on right, switch on top.

const _EL_CLOSED = `<svg viewBox="0 0 240 125" width="240" height="125" style="display:block;margin:8px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <line x1="38" y1="22" x2="202" y2="22" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="103" x2="202" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="22" x2="38" y2="50" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="74" x2="38" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="202" y1="22" x2="202" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="22" y1="50" x2="54" y2="50" stroke="#334155" stroke-width="3.5"/>
  <line x1="28" y1="62" x2="48" y2="62" stroke="#334155" stroke-width="2"/>
  <line x1="38" y1="62" x2="38" y2="74" stroke="#334155" stroke-width="2.5"/>
  <text x="58" y="55" font-size="7.5" fill="#475569">+ cell &#8722;</text>
  <circle cx="88" cy="22" r="3" fill="#334155"/>
  <circle cx="152" cy="22" r="3" fill="#334155"/>
  <line x1="88" y1="22" x2="152" y2="22" stroke="#16a34a" stroke-width="3"/>
  <text x="104" y="16" font-size="7" fill="#64748b">switch (closed)</text>
  <circle cx="202" cy="62" r="15" fill="#fef08a" stroke="#334155" stroke-width="2"/>
  <line x1="193" y1="53" x2="211" y2="71" stroke="#92400e" stroke-width="1.5"/>
  <line x1="211" y1="53" x2="193" y2="71" stroke="#92400e" stroke-width="1.5"/>
  <text x="220" y="58" font-size="7.5" fill="#64748b">bulb</text>
  <text x="220" y="69" font-size="7.5" fill="#ca8a04">&#9728; ON</text>
</svg>`;

const _EL_OPEN = `<svg viewBox="0 0 240 125" width="240" height="125" style="display:block;margin:8px auto;background:#fef2f2;border-radius:8px;border:1px solid #fca5a5">
  <line x1="38" y1="22" x2="202" y2="22" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="103" x2="202" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="22" x2="38" y2="50" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="74" x2="38" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="202" y1="22" x2="202" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="22" y1="50" x2="54" y2="50" stroke="#334155" stroke-width="3.5"/>
  <line x1="28" y1="62" x2="48" y2="62" stroke="#334155" stroke-width="2"/>
  <line x1="38" y1="62" x2="38" y2="74" stroke="#334155" stroke-width="2.5"/>
  <text x="58" y="55" font-size="7.5" fill="#475569">+ cell &#8722;</text>
  <circle cx="88" cy="22" r="3" fill="#334155"/>
  <circle cx="152" cy="22" r="3" fill="#334155"/>
  <line x1="88" y1="22" x2="150" y2="10" stroke="#dc2626" stroke-width="2.5"/>
  <text x="96" y="16" font-size="7" fill="#64748b">switch (open)</text>
  <text x="100" y="38" font-size="7" fill="#dc2626">&#10006; break</text>
  <circle cx="202" cy="62" r="15" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
  <line x1="193" y1="53" x2="211" y2="71" stroke="#cbd5e1" stroke-width="1.5"/>
  <line x1="211" y1="53" x2="193" y2="71" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="220" y="58" font-size="7.5" fill="#64748b">bulb</text>
  <text x="220" y="69" font-size="7.5" fill="#dc2626">OFF</text>
</svg>`;

const _EL_GAP = `<svg viewBox="0 0 240 125" width="240" height="125" style="display:block;margin:8px auto;background:#fefce8;border-radius:8px;border:1px solid #fde047">
  <line x1="38" y1="22" x2="202" y2="22" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="103" x2="90" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="150" y1="103" x2="202" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="22" x2="38" y2="50" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="74" x2="38" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="202" y1="22" x2="202" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="22" y1="50" x2="54" y2="50" stroke="#334155" stroke-width="3.5"/>
  <line x1="28" y1="62" x2="48" y2="62" stroke="#334155" stroke-width="2"/>
  <line x1="38" y1="62" x2="38" y2="74" stroke="#334155" stroke-width="2.5"/>
  <text x="58" y="55" font-size="7.5" fill="#475569">+ cell &#8722;</text>
  <circle cx="88" cy="22" r="3" fill="#334155"/>
  <circle cx="152" cy="22" r="3" fill="#334155"/>
  <line x1="88" y1="22" x2="152" y2="22" stroke="#16a34a" stroke-width="3"/>
  <text x="104" y="16" font-size="7" fill="#64748b">switch (closed)</text>
  <text x="95" y="97" font-size="10" fill="#d97706">? ? ?</text>
  <text x="84" y="116" font-size="6.5" fill="#d97706">gap in wire</text>
  <circle cx="202" cy="62" r="15" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
  <line x1="193" y1="53" x2="211" y2="71" stroke="#cbd5e1" stroke-width="1.5"/>
  <line x1="211" y1="53" x2="193" y2="71" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="220" y="58" font-size="7.5" fill="#64748b">bulb</text>
  <text x="220" y="69" font-size="7.5" fill="#dc2626">OFF</text>
</svg>`;

const _EL_TWO_BULBS = `<svg viewBox="0 0 260 125" width="260" height="125" style="display:block;margin:8px auto;background:#f5f3ff;border-radius:8px;border:1px solid #c4b5fd">
  <line x1="38" y1="22" x2="222" y2="22" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="103" x2="222" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="22" x2="38" y2="50" stroke="#334155" stroke-width="2.5"/>
  <line x1="38" y1="74" x2="38" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="222" y1="22" x2="222" y2="103" stroke="#334155" stroke-width="2.5"/>
  <line x1="22" y1="50" x2="54" y2="50" stroke="#334155" stroke-width="3.5"/>
  <line x1="28" y1="62" x2="48" y2="62" stroke="#334155" stroke-width="2"/>
  <line x1="38" y1="62" x2="38" y2="74" stroke="#334155" stroke-width="2.5"/>
  <text x="58" y="58" font-size="7.5" fill="#475569">cell</text>
  <circle cx="88" cy="22" r="3" fill="#334155"/>
  <circle cx="134" cy="22" r="3" fill="#334155"/>
  <line x1="88" y1="22" x2="134" y2="22" stroke="#16a34a" stroke-width="3"/>
  <text x="98" y="16" font-size="7" fill="#64748b">switch</text>
  <circle cx="162" cy="62" r="13" fill="#fef08a" stroke="#334155" stroke-width="2"/>
  <line x1="154" y1="54" x2="170" y2="70" stroke="#92400e" stroke-width="1.5"/>
  <line x1="170" y1="54" x2="154" y2="70" stroke="#92400e" stroke-width="1.5"/>
  <text x="152" y="80" font-size="6.5" fill="#64748b">bulb 1</text>
  <circle cx="222" cy="62" r="13" fill="#fef08a" stroke="#334155" stroke-width="2"/>
  <line x1="214" y1="54" x2="230" y2="70" stroke="#92400e" stroke-width="1.5"/>
  <line x1="230" y1="54" x2="214" y2="70" stroke="#92400e" stroke-width="1.5"/>
  <text x="212" y="80" font-size="6.5" fill="#64748b">bulb 2</text>
</svg>`;

// ── Questions ──────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-el-001', chapterId:'electricity', difficulty:1,
    question:'What components are needed to make a SIMPLE electric circuit?',
    options:[
      'A battery, wires, a bulb and a switch',
      'A battery, water, a bulb and a magnet',
      'A generator, motor, switch and fans',
      'Solar panels, wires, a bulb and a plug'
    ],
    answer:'A battery, wires, a bulb and a switch',
    hint:'A simple circuit has a source of electricity, a path for current to flow, and something that uses the electricity.',
    explanation:'A simple electric circuit needs: a <b>battery</b> (energy source), <b>wires</b> (path for electricity), a <b>bulb</b> (load/output) and a <b>switch</b> (to open or close the circuit).' }),

  makeMCQ({ id:'g5sci-el-002', chapterId:'electricity', difficulty:1,
    question:`${_EL_CLOSED}Look at the circuit diagram above. Will the bulb light up? Why?`,
    options:[
      'Yes — the switch is closed and the circuit is complete',
      'No — there is no battery in the circuit',
      'No — the switch is open, breaking the circuit',
      'Yes — but only for a few seconds'
    ],
    answer:'Yes — the switch is closed and the circuit is complete',
    hint:'Trace the path of electricity from the battery all the way around the circuit.',
    explanation:'The bulb lights up because the switch is <b>closed</b>, making the circuit <b>complete</b>. Electricity can flow from the battery, through the wires, through the bulb and back to the battery.' }),

  makeMCQ({ id:'g5sci-el-003', chapterId:'electricity', difficulty:1,
    question:`${_EL_OPEN}Look at the circuit diagram above. Will the bulb light up? Why?`,
    options:[
      'Yes — electricity always flows in a circuit',
      'No — the switch is open, breaking the circuit',
      'Yes — the battery provides enough power',
      'No — the battery is missing'
    ],
    answer:'No — the switch is open, breaking the circuit',
    hint:'Look at the switch — is it connected or is there a gap?',
    explanation:'The bulb does <b>not</b> light up because the switch is <b>open</b>. An open switch creates a break in the circuit, so electricity cannot flow around the loop.' }),

  makeMCQ({ id:'g5sci-el-004', chapterId:'electricity', difficulty:1,
    question:'What is the job of a SWITCH in an electric circuit?',
    options:[
      'It produces electricity for the circuit',
      'It makes the bulb brighter',
      'It opens or closes the circuit to control current flow',
      'It stores electricity for later use'
    ],
    answer:'It opens or closes the circuit to control current flow',
    hint:'Think about what happens when you flick a light switch on and off.',
    explanation:'A switch <b>opens</b> (breaks) or <b>closes</b> (completes) a circuit. When closed, electricity flows and the bulb lights. When open, the circuit is broken and the bulb goes off.' }),

  makeMCQ({ id:'g5sci-el-005', chapterId:'electricity', difficulty:2,
    question:`${_EL_GAP}Look at the circuit above. The switch is closed but the bulb does not light. What is the most likely reason?`,
    options:[
      'The battery is too strong',
      'There is a gap (break) in the wire',
      'The bulb is too bright',
      'The switch needs to be opened'
    ],
    answer:'There is a gap (break) in the wire',
    hint:'A complete circuit must have an unbroken path all the way around.',
    explanation:'Even with the switch closed and the battery present, a <b>gap in the wire</b> breaks the circuit. Electricity cannot jump across a gap, so the bulb stays off.' }),

  makeMCQ({ id:'g5sci-el-006', chapterId:'electricity', difficulty:2,
    question:'Which of the following materials is a good CONDUCTOR of electricity?',
    options:['Rubber','Plastic','Copper wire','Glass'],
    answer:'Copper wire',
    hint:'Metals are generally good conductors of electricity.',
    explanation:'<b>Copper</b> is an excellent conductor of electricity — electricity passes through it easily. This is why electrical wires are made of copper. Rubber, plastic and glass are insulators.' }),

  makeMCQ({ id:'g5sci-el-007', chapterId:'electricity', difficulty:2,
    question:'Which of the following materials is a good INSULATOR of electricity?',
    options:['Iron','Steel','Aluminium','Rubber'],
    answer:'Rubber',
    hint:'An insulator does NOT allow electricity to pass through it.',
    explanation:'<b>Rubber</b> is a good insulator — it does not allow electricity to flow through it. This is why electrical wires are coated in rubber or plastic, to protect us from electric shocks.' }),

  makeTF({ id:'g5sci-el-008', chapterId:'electricity', difficulty:1,
    question:'A circuit must be COMPLETE (no gaps) for electricity to flow and the bulb to light.',
    answer:true,
    hint:'Think about what "circuit" means — it comes from the word circle (a complete loop).',
    explanation:'True. For electricity to flow, there must be a <b>complete, unbroken path</b> from the battery through the wires and back. Any gap (open switch, broken wire) stops the current.' }),

  makeTF({ id:'g5sci-el-009', chapterId:'electricity', difficulty:1,
    question:'Rubber is a good conductor of electricity.',
    answer:false,
    hint:'This is why rubber is used to coat electrical wires.',
    explanation:'Rubber is a good <b>insulator</b>, not a conductor. It does not allow electricity to pass through it. Metals such as copper, iron and steel are good conductors.' }),

  makeMCQ({ id:'g5sci-el-010', chapterId:'electricity', difficulty:1,
    question:'What does the BATTERY (cell) do in an electric circuit?',
    options:[
      'It produces light energy directly',
      'It provides the electrical energy to drive current around the circuit',
      'It acts as a switch to control the current',
      'It stores heat energy'
    ],
    answer:'It provides the electrical energy to drive current around the circuit',
    hint:'Think of the battery as the "engine" or power source of the circuit.',
    explanation:'The <b>battery (cell)</b> is the energy source of the circuit. It converts stored chemical energy into electrical energy, pushing current around the circuit to power the bulb.' }),

  makeMCQ({ id:'g5sci-el-011', chapterId:'electricity', difficulty:2,
    question:`${_EL_TWO_BULBS}The circuit above shows TWO bulbs connected in series with one battery. Compared to a circuit with only ONE bulb, how will each bulb appear?`,
    options:[
      'Brighter, because there are two bulbs',
      'Dimmer, because the battery\'s energy is shared between two bulbs',
      'The same brightness — it makes no difference',
      'One bulb will be bright and the other dark'
    ],
    answer:'Dimmer, because the battery\'s energy is shared between two bulbs',
    hint:'The same battery now has to power two bulbs instead of one.',
    explanation:'When two bulbs are connected in series, the battery\'s energy is <b>shared</b> between them. Each bulb receives less energy, so they both glow <b>dimmer</b> than a single bulb would.' }),

  makeMatch({ id:'g5sci-el-012', chapterId:'electricity', difficulty:1,
    leftItem:'Copper',
    allRights:['Good conductor — electricity passes through it easily','Good insulator — stops electricity flowing','Provides energy for the circuit','Opens or closes the circuit'],
    correctRight:'Good conductor — electricity passes through it easily',
    hint:'Copper is the metal inside electrical wires.',
    explanation:'Copper is one of the best electrical conductors. It is used for wiring because electricity flows through it with very little resistance.' })

);
